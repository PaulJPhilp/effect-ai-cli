# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- N/A

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A

## [0.1.2] - 2025-08-14

### Changed
- **Health Command Runtime**: Moved health command from minimal to production runtime
  - Health command now has access to AI services for proper provider connectivity checks
  - Ensures health checks can verify API keys and model availability

### Added
- N/A

## [0.1.1] - 2025-08-14

### Fixed
- **CLI Execution Bug**: Fixed CLI not executing when invoked via binary
  - The CLI was only running when `process.argv[1]` ended with `main.js`
  - Now properly detects execution via binary files (`effect-ai-cli.js`, `effect-ai`)
  - Users can now successfully run `effect-ai-cli --help` and other commands

### Changed
- N/A

### Added
- N/A

## [0.1.0] - 2025-01-14

### Added
- Initial release of Effect AI CLI
- Core CLI framework with Effect-TS service architecture
- AI provider integrations (OpenAI, Anthropic, Google)
- Run management system
- Metrics collection and reporting
- OpenTelemetry tracing
- Configuration management
- Authentication system
- Command suite for AI operations
- Testing framework with Vitest
- Build system with TypeScript
- Development tooling (Biome, ESLint)

---

## Versioning Strategy

This project follows [Semantic Versioning](https://semver.org/) (SemVer):

- **MAJOR** version (X.0.0): Incompatible API changes
- **MINOR** version (0.X.0): New functionality in a backward-compatible manner
- **PATCH** version (0.0.X): Backward-compatible bug fixes

### Pre-release Versions

- **Alpha** (0.1.0-alpha.1): Early development, breaking changes expected
- **Beta** (0.1.0-beta.1): Feature complete, testing phase
- **Release Candidate** (0.1.0-rc.1): Final testing before stable release

### Current Status: Alpha (0.1.0)

We are currently in the alpha phase, which means:
- Core functionality is implemented
- API may change between minor versions
- Breaking changes are expected
- Not recommended for production use yet

### Next Milestones

- **0.2.0**: API stabilization and bug fixes
- **0.3.0**: Performance improvements and additional features
- **0.4.0**: Final API refinements
- **0.5.0**: Beta release candidate
- **1.0.0**: Stable production release
