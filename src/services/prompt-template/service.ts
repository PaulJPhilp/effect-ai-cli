import { FileSystem } from "@effect/platform";
import { Effect } from "effect";
import { Liquid } from "liquidjs";
import { MdxService } from "../mdx-service/service.js";
import {
  InvalidParameterTypeError,
  MissingParametersError,
  TemplateRenderError,
  UnknownParametersError,
  UnsupportedTemplateFileError,
} from "./errors.js";

export interface PromptTemplate {
  readonly content: string;
  readonly parameters: Record<string, ParameterDefinition>;
  readonly metadata: Record<string, unknown>;
}

export interface ParameterDefinition {
  readonly type: "string" | "number" | "boolean" | "array" | "object";
  readonly description?: string;
  readonly required?: boolean;
  readonly default?: unknown;
}

const liquid = new Liquid();

// Type guard to validate parameter definitions
function isValidParameterDefinition(
  definition: unknown
): definition is ParameterDefinition {
  return (
    definition !== null &&
    typeof definition === "object" &&
    "type" in definition &&
    typeof (definition as Record<string, unknown>).type === "string" &&
    ["string", "number", "boolean", "array", "object"].includes(
      (definition as Record<string, unknown>).type as string
    )
  );
}

export class TemplateService extends Effect.Service<TemplateService>()(
  "TemplateService",
  {
    effect: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const mdxService = yield* MdxService;

      // Tagged errors are imported from ./errors

      const loadTemplate = (
        filePath: string
      ): Effect.Effect<PromptTemplate, Error> =>
        Effect.gen(function* () {
          // Check file extension first
          if (!filePath.endsWith(".mdx")) {
            return yield* Effect.fail(
              new UnsupportedTemplateFileError({
                reason: "Only .mdx files are supported",
              })
            );
          }

          const content = yield* fs.readFileString(filePath);

          // Parse MDX file using MDX service
          const parsed = yield* mdxService.parseMdxFile(content);

          // Extract parameters using MDX service
          const parameters = mdxService.extractParameters(parsed.attributes);

          return {
            content: parsed.body.trim(),
            parameters,
            metadata: parsed.attributes,
          };
        });

      const validateParameterType = (
        value: unknown,
        expectedType: string
      ): Effect.Effect<void, Error> => {
        switch (expectedType) {
          case "string":
            return typeof value === "string"
              ? Effect.void
              : Effect.fail(
                  new InvalidParameterTypeError({
                    expected: "string",
                    got: typeof value,
                  })
                );
          case "number":
            return typeof value === "number"
              ? Effect.void
              : Effect.fail(
                  new InvalidParameterTypeError({
                    expected: "number",
                    got: typeof value,
                  })
                );
          case "boolean":
            return typeof value === "boolean"
              ? Effect.void
              : Effect.fail(
                  new InvalidParameterTypeError({
                    expected: "boolean",
                    got: typeof value,
                  })
                );
          case "array":
            return Array.isArray(value)
              ? Effect.void
              : Effect.fail(
                  new InvalidParameterTypeError({
                    expected: "array",
                    got: typeof value,
                  })
                );
          case "object":
            return typeof value === "object" &&
              value !== null &&
              !Array.isArray(value)
              ? Effect.void
              : Effect.fail(
                  new InvalidParameterTypeError({
                    expected: "object",
                    got: typeof value,
                  })
                );
          default:
            return Effect.void;
        }
      };

      const validateParameters = (
        template: PromptTemplate,
        parameters: Record<string, unknown>
      ): Effect.Effect<void, Error> =>
        Effect.gen(function* () {
          const templateParams = template.parameters;
          const providedParams = new Set(Object.keys(parameters));
          const requiredParams = Object.entries(templateParams)
            .filter(([, def]) => def.required !== false)
            .map(([name]) => name);

          // Check for missing required parameters
          const missingParams = requiredParams.filter(
            (param) => !providedParams.has(param)
          );

          if (missingParams.length > 0) {
            return yield* Effect.fail(
              new MissingParametersError({ params: missingParams })
            );
          }

          // Check for unknown parameters
          const unknownParams = Array.from(providedParams).filter(
            (param) => !(param in templateParams)
          );

          if (unknownParams.length > 0) {
            return yield* Effect.fail(
              new UnknownParametersError({ params: unknownParams })
            );
          }

          // Validate parameter types
          for (const [name, value] of Object.entries(parameters)) {
            const definition = templateParams[name];
            if (!isValidParameterDefinition(definition)) {
              continue;
            }

            yield* validateParameterType(value, definition.type);
          }
        });

      const renderTemplate = (
        template: PromptTemplate,
        parameters: Record<string, unknown>
      ): Effect.Effect<string, Error> =>
        Effect.gen(function* () {
          // Validate parameters first
          yield* validateParameters(template, parameters);

          // Merge parameters with default values
          const mergedParams: Record<string, unknown> = {};
          // Add default values
          for (const [name, definition] of Object.entries(
            template.parameters
          )) {
            if ("default" in definition && definition.default !== undefined) {
              mergedParams[name] = definition.default;
            }
          }
          // Override with provided values
          for (const [name, value] of Object.entries(parameters)) {
            mergedParams[name] = value;
          }

          // Render template with Liquid using Effect.tryPromise
          const rendered: string = yield* Effect.tryPromise({
            try: () => liquid.parseAndRender(template.content, mergedParams),
            catch: (error) =>
              new TemplateRenderError({
                reason: `Template rendering failed: ${String(error)}`,
              }),
          });
          return rendered;
        });

      return {
        loadTemplate,
        renderTemplate,
        validateParameters,
      } as const;
    }),
    dependencies: [MdxService.Default],
  }
) {}

// Helper function to load and render a template in one step
export const renderPromptTemplate = (
  templatePath: string,
  parameters: Record<string, unknown>
) =>
  Effect.gen(function* () {
    const templateService = yield* TemplateService;
    const template = yield* templateService.loadTemplate(templatePath);
    const rendered = yield* templateService.renderTemplate(
      template,
      parameters
    );
    return rendered;
  });
