import { Command } from "@effect/cli";
import { FileSystem } from "@effect/platform";
import { Effect } from "effect";
import { RunService } from "../../services/run-service/service.js";
import type { RunInfo } from "../../services/run-service/types.js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - TS resolves .js to .ts in this repo config
import { optName } from "../_shared.js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - TS resolves .js to .ts in this repo config
import { ensureInsideRunsDir, readRunInfo, resolveRunDir } from "./utils.js";

export const runUse = Command.make(
  "use",
  { name: optName("Name of the run to activate") },
  ({ name }) =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const runService = yield* RunService;

      const runDir = yield* resolveRunDir(name);
      const ok = yield* ensureInsideRunsDir(runDir);
      if (!ok) {
        return;
      }

      const exists = yield* fs.exists(runDir);
      if (!exists) {
        // match original message
        yield* Effect.logError(`Run not found: ${name}`);
        return;
      }

      const info = yield* readRunInfo(runDir);
      if (!info) {
        return;
      }

      yield* runService.setCurrentRun(info as RunInfo);
      yield* Effect.log(`Now using run: ${name}`);
    })
).pipe(Command.withDescription("Switch the active run by name"));
