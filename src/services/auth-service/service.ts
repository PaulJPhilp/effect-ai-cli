import { FileSystem, Path } from "@effect/platform";
import { Effect, Option } from "effect";
import * as OS from "node:os";
import { AuthError } from "./errors.js";
import type { AuthConfig } from "./types.js";

export class AuthService extends Effect.Service<AuthService>()("AuthService", {
  accessors: true,
  effect: Effect.gen(function* () {
    const maskApiKey = (key: string): string => {
      if (key.length <= 8) {
        return "***";
      }
      return `${key.slice(0, 4)}***${key.slice(-4)}`;
    };

    const getAuthFilePath = Effect.gen(function* () {
      const pathService = yield* Path.Path;
      const authDir = pathService.join(OS.homedir(), ".config", "ai-cli");
      return pathService.join(authDir, "auth.json");
    });

    const readAuthFile = Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const authFile = yield* getAuthFilePath;

      const exists = yield* fs.exists(authFile);
      if (!exists) {
        return {};
      }
      return yield* fs.readFileString(authFile).pipe(
        Effect.mapError(
          (cause) =>
            new AuthError({ message: "Failed to read auth file", cause })
        ),
        Effect.flatMap((content) =>
          Effect.try({
            try: () => JSON.parse(content) as Record<string, AuthConfig>,
            catch: (cause) =>
              new AuthError({ message: "Failed to parse auth file", cause }),
          })
        )
      );
    });

    const writeAuthFile = (config: Record<string, AuthConfig>) =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const authFile = yield* getAuthFilePath;

        const authDir = path.dirname(authFile);
        const dirExists = yield* fs.exists(authDir);
        if (!dirExists) {
          yield* fs.makeDirectory(authDir, { recursive: true });
        }

        const fileExists = yield* fs.exists(authFile);
        if (!fileExists) {
          yield* fs.writeFile(authFile, Buffer.from("{}", "utf-8"));
        }

        yield* fs
          .writeFileString(authFile, JSON.stringify(config, null, 2))
          .pipe(
            Effect.mapError(
              (cause) =>
                new AuthError({ message: "Failed to write auth file", cause })
            )
          );
      });

    return {
      // Get API key for a specific provider
      getApiKey: (provider: string) =>
        readAuthFile.pipe(
          Effect.map((config) => Option.fromNullable(config[provider]?.apiKey))
        ),

      // Set API key for a provider
      setApiKey: (provider: string, apiKey: string) =>
        readAuthFile.pipe(
          Effect.flatMap((config: Record<string, AuthConfig>) => {
            const newConfig = {
              ...config,
              [provider]: {
                provider,
                apiKey,
                createdAt: new Date().toISOString(),
                lastUsed: new Date().toISOString(),
              },
            };
            return writeAuthFile(newConfig);
          })
        ),

      // Remove API key for a provider
      removeApiKey: (provider: string) =>
        readAuthFile.pipe(
          Effect.flatMap((config: Record<string, AuthConfig>) => {
            const { [provider]: _, ...rest } = config;
            return writeAuthFile(rest);
          })
        ),

      // List all configured providers
      listProviders: () =>
        readAuthFile.pipe(Effect.map((config) => Object.keys(config))),

      // Get all auth configuration (with masked keys)
      getAllConfig: () =>
        readAuthFile.pipe(
          Effect.map((config) =>
            Object.fromEntries(
              Object.entries(config).map(([provider, auth]) => [
                provider,
                {
                  ...auth,
                  apiKey: maskApiKey(auth.apiKey),
                },
              ])
            )
          )
        ),

      // Get provider configuration
      getProviderConfig: (provider: string) =>
        readAuthFile.pipe(
          Effect.map((config) => Option.fromNullable(config[provider]))
        ),

      // Update last used timestamp
      updateLastUsed: (provider: string) =>
        readAuthFile.pipe(
          Effect.flatMap((config: Record<string, AuthConfig>) => {
            if (config[provider]) {
              const newConfig = {
                ...config,
                [provider]: {
                  ...config[provider],
                  lastUsed: new Date().toISOString(),
                },
              };
              return writeAuthFile(newConfig);
            }
            return Effect.succeed(undefined);
          })
        ),

      // Check if provider is configured
      isProviderConfigured: (provider: string) =>
        readAuthFile.pipe(Effect.map((config) => Boolean(config[provider]))),

      // Get auth file path
      authFile: getAuthFilePath,
    };
  }),
  dependencies: [],
}) {}
