import * as dotenv from "dotenv";
dotenv.config();

// Version - update this when publishing new versions
const version = "0.1.2";

import { applyPromptToDir } from "./commands/apply-prompt-to-dir.js";
import { authCommand } from "./commands/auth.js";
import { configCommand } from "./commands/config.js";
import { dryRun } from "./commands/dry-run.js";
import { echoCommand } from "./commands/echo.js";
import {
  effectPatternsGen,
  effectPatternsGenerate,
  effectPatternsProcessPromptLegacy,
} from "./commands/generate.js";
import { health } from "./commands/health.js";
import { effectPatternsList } from "./commands/list.js";
import { metricsCommand } from "./commands/metrics.js";
import { planCommand } from "./commands/plan.js";
import { run as runGroup } from "./commands/run.js";
import { systemPromptCommand } from "./commands/system-prompt.js";
import { testCommand } from "./commands/test.js";
import { traceCommand } from "./commands/trace.js";
import { createCli, runCli } from "./core/index.js";

// Compose CLI via core factory
export const rootCli = createCli({
  name: "effect-ai",
  version,
  commands: [
    effectPatternsList,
    dryRun,
    configCommand,
    health,
    runGroup,
    metricsCommand,
    planCommand,
    effectPatternsGenerate,
    effectPatternsGen,
    effectPatternsProcessPromptLegacy,
    authCommand,
    traceCommand,
    testCommand,
    applyPromptToDir,
    systemPromptCommand,
    echoCommand,
  ],
});

// Export the CLI runner for programmatic usage
export { runCli };

// Export individual commands for modular usage
export {
  applyPromptToDir,
  authCommand,
  configCommand,
  dryRun,
  echoCommand,
  effectPatternsGen,
  effectPatternsGenerate,
  effectPatternsList,
  effectPatternsProcessPromptLegacy,
  health,
  metricsCommand,
  planCommand,
  runGroup,
  systemPromptCommand,
  testCommand,
  traceCommand,
};

// Only run CLI if this file is executed directly
// Check if this module is being run directly by checking the script name
const isMainModule =
  process.argv[1] &&
  (process.argv[1].endsWith("main.js") ||
    process.argv[1].endsWith("effect-ai-cli.js") ||
    process.argv[1].endsWith("effect-ai"));
if (isMainModule) {
  runCli(rootCli);
}
