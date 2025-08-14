# Effect AI CLI

A comprehensive TypeScript CLI application built with Effect-TS for managing AI-powered pattern processing, run management, and observability.

## Overview

The Effect AI CLI is a production-ready command-line interface that demonstrates advanced Effect-TS patterns including service composition, resource management, observability, and AI integration. It provides tools for managing AI workflows, tracking metrics, and maintaining run history.

Execution Plans:
- By default, LLM calls use an ExecutionPlan with sensible retries and provider fallbacks.
- You can override attempts and timing and also customize fallback provider/model order with the `plan` command.

## Features

### Core Capabilities
- **AI Integration**: Seamless integration with multiple AI providers (OpenAI, Anthropic, Google)
- **Run Management**: Complete lifecycle management for AI processing runs
- **Metrics Tracking**: Comprehensive metrics collection and reporting
- **Observability**: Full OpenTelemetry integration for tracing and monitoring
- **Configuration Management**: Flexible configuration with environment variables
- **Authentication**: Secure API key management
- **Extensibility**: Plugin system to add custom commands via `CliPlugin`

## Development Setup

### Prerequisites
- Node.js 20+ 
- Bun (recommended package manager)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd effect-ai-cli

# Install dependencies
bun install

# Build the project
bun run build

# Run tests
bun run test

# Start development mode
bun run dev
```

### Available Scripts
- `bun run build` - Build the project
- `bun run build:watch` - Build with watch mode
- `bun run dev` - Start development mode with watch
- `bun run start` - Run the CLI directly
- `bun run test` - Run tests
- `bun run test:watch` - Run tests in watch mode
- `bun run test:coverage` - Run tests with coverage
- `bun run test:ui` - Run tests with UI
- `bun run lint` - Run linter
- `bun run lint:fix` - Fix linting issues
- `bun run format` - Format code
- `bun run type-check` - Type check without building

### Quick Start

```bash
# Generate (streams by default)
effect-ai-cli generate "Write a haiku about Effect"

# Configure execution plan overrides
effect-ai-cli plan create --retries 2 --retry-ms 1200 \
  --fallbacks openai:gpt-4o-mini,anthropic:claude-3-5-haiku
effect-ai-cli plan list

# View metrics for recent runs
effect-ai-cli metrics last
effect-ai-cli metrics report --format console
```

### Commands

#### Core Commands
- `effect-ai-cli list` - List available patterns
- `effect-ai-cli generate` (alias `gen`) - Generate with AI
  - Input forms: inline text, file path, or stdin (`--stdin`)
  - Streaming by default for text format; buffer with `--no-stream`
  - `-o, --output <path>` write full output to file (tee when streaming)
  - `-p, --provider <openai|anthropic|google>` select provider
  - `-m, --model <name>` select model
  - `-f, --format <text|json>` select output format (default: text)
  - `--json` convenience for `--format=json`
  - `-s, --schema-prompt <file>` required when `--format=json`
  - `--quiet` suppress stdout (useful with `--output`)
  - Generation params: `--temperature`, `--max-tokens`, `--top-p`, `--seed`
- `effect-ai-cli health` - Check system health
- `effect-ai-cli config` - Manage configuration
- `effect-ai-cli auth` - Manage authentication
- `effect-ai-cli model` - Manage AI models
- `effect-ai-cli trace` - View traces
- `effect-ai-cli dry-run` - Test without execution

#### Execution Plan Management
- `effect-ai-cli plan create` — Set plan overrides
  - `--retries <n>` number of retries for the primary provider (attempts = retries + 1). Default: 1 retry
  - `--retry-ms <ms>` delay between attempts for the primary. Default: 1000
  - `--fallbacks <list>` comma-separated `provider:model` fallbacks, e.g. `openai:gpt-4o-mini,anthropic:claude-3-5-haiku`
- `effect-ai-cli plan list` — Show the current plan (effective defaults if unset)
- `effect-ai-cli plan clear` — Remove overrides
- `effect-ai-cli plan reset` — Reset to defaults

Defaults
- Primary: 2 attempts (1 retry) with 1000ms spacing
- Fallbacks: `openai:gpt-4o-mini` then `anthropic:claude-3-5-haiku`, each 1 attempt with 1500ms spacing

Note: `process-prompt` remains available as a legacy alias for backward compatibility.

#### Run Management
- `effect-ai-cli runs list` - List all runs
- `effect-ai-cli runs create` - Create a new run
- `effect-ai-cli runs update` - Update run information
- `effect-ai-cli runs delete` - Delete a run

#### Metrics
- `effect-ai-cli metrics report` — Report metrics
  - `--format <console|json|jsonl>` (default: console)
  - `-o, --output <path>` when `json` or `jsonl`, write to file
- `effect-ai-cli metrics last` — Pretty table for the most recent run
- `effect-ai-cli metrics clear` — Clear metrics history

## Architecture

### Service Architecture
The CLI uses a modern Effect-TS service architecture with:

- **Effect.Service Pattern**: All services use the modern Effect.Service pattern
- **Layer Composition**: Proper service layer composition with dependency injection
- **Resource Management**: Scoped resource management with automatic cleanup
- **Error Handling**: Comprehensive error handling with typed errors
- **Testing**: Full test coverage with real services (no mocks)

### Project Structure
```
src/
├── bin/           # CLI entry points
├── commands/      # CLI command implementations
├── config/        # Configuration constants
├── core/          # Core CLI framework
├── runtime/       # Runtime configurations
├── services/      # Business logic services
└── __tests__/     # Test files
```

## Contributing

See [CONTRIBUTING.md](Contributing.md) for development guidelines.

## Release Process

- [CHANGELOG.md](CHANGELOG.md) - Version history and changes
- [docs/SEMANTIC_VERSIONING.md](docs/SEMANTIC_VERSIONING.md) - Versioning strategy and policies
- [docs/RELEASE_WORKFLOW.md](docs/RELEASE_WORKFLOW.md) - Release process and workflow

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
