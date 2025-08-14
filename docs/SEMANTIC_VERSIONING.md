# Semantic Versioning Strategy

This document outlines our semantic versioning approach for the Effect AI CLI package.

## Overview

We follow [Semantic Versioning 2.0.0](https://semver.org/) (SemVer) as defined by the specification:

**Given a version number MAJOR.MINOR.PATCH, increment the:**

1. **MAJOR** version when you make incompatible API changes
2. **MINOR** version when you add functionality in a backward-compatible manner  
3. **PATCH** version when you make backward-compatible bug fixes

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

## Version Format

```
MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]
```

Examples:
- `0.1.0` - Initial alpha release
- `0.1.1` - Patch release (bug fixes)
- `0.2.0` - Minor release (new features)
- `0.2.0-alpha.1` - Alpha pre-release
- `0.2.0-beta.1` - Beta pre-release
- `0.2.0-rc.1` - Release candidate
- `1.0.0` - First stable release

## Current Status: Alpha Phase (0.x.x)

We are currently in the **alpha phase** of development, which means:

- **Breaking changes are expected** between minor versions
- **API is not stable** and may change significantly
- **Not recommended for production use**
- **Testing and feedback phase**

## Version Increment Rules

### PATCH (0.0.X → 0.0.X+1)

**When to increment:**
- Bug fixes that don't change public API
- Documentation updates
- Internal refactoring
- Performance improvements
- Dependency updates (non-breaking)

**Examples:**
- Fix CLI command parsing bug
- Update error messages
- Improve build performance
- Fix TypeScript compilation issues

### MINOR (0.X.0 → 0.X+1.0)

**When to increment:**
- New features added in backward-compatible manner
- New CLI commands
- New configuration options
- New AI provider integrations
- Breaking changes to internal APIs (not public)

**Examples:**
- Add new `analyze` command
- Support for new AI model
- Add new configuration options
- New output formats

### MAJOR (X.0.0 → X+1.0.0)

**When to increment:**
- Breaking changes to public API
- CLI command signature changes
- Configuration format changes
- Removal of deprecated features
- Major architectural changes

**Examples:**
- Change command line argument format
- Remove deprecated commands
- Change configuration file format
- Major refactoring of public interfaces

## Pre-release Versions

### Alpha (0.1.0-alpha.X)

**Purpose:** Early development, breaking changes expected
**Use case:** Development and testing
**Stability:** Very unstable
**Publishing:** `npm publish --tag alpha`

**When to use:**
- Initial feature development
- Major refactoring
- Breaking changes
- Experimental features

### Beta (0.1.0-beta.X)

**Purpose:** Feature complete, testing phase
**Use case:** User testing and feedback
**Stability:** Mostly stable, some bugs expected
**Publishing:** `npm publish --tag beta`

**When to use:**
- Features are complete
- API is mostly stable
- Ready for user testing
- Bug fixes and refinements

### Release Candidate (0.1.0-rc.X)

**Purpose:** Final testing before stable release
**Use case:** Production testing
**Stability:** Production ready
**Publishing:** `npm publish --tag rc`

**When to use:**
- All features complete
- API is frozen
- Ready for production
- Final bug fixes only

## Version Lifecycle

### Development Phase (0.1.0 - 0.4.0)

```
0.1.0-alpha.1 → 0.1.0-alpha.2 → ... → 0.1.0
0.2.0-alpha.1 → 0.2.0-beta.1 → 0.2.0-rc.1 → 0.2.0
0.3.0-alpha.1 → 0.3.0-beta.1 → 0.3.0-rc.1 → 0.3.0
0.4.0-alpha.1 → 0.4.0-beta.1 → 0.4.0-rc.1 → 0.4.0
```

### Stabilization Phase (0.5.0 - 0.9.0)

```
0.5.0-beta.1 → 0.5.0-rc.1 → 0.5.0
0.6.0-beta.1 → 0.6.0-rc.1 → 0.6.0
...
0.9.0-beta.1 → 0.9.0-rc.1 → 0.9.0
```

### Production Phase (1.0.0+)

```
1.0.0-rc.1 → 1.0.0
1.0.1 (patch)
1.1.0 (minor)
2.0.0 (major)
```

## Breaking Change Policy

### During Alpha Phase (0.x.x)

**Breaking changes are allowed** between minor versions:
- `0.1.0` → `0.2.0`: Breaking changes expected
- `0.2.0` → `0.3.0`: Breaking changes expected
- `0.3.0` → `0.4.0`: Breaking changes expected

### During Beta Phase (0.5.x - 0.9.x)

**Limited breaking changes** allowed:
- API should be mostly stable
- Breaking changes require strong justification
- Deprecation warnings for planned changes

### During Production Phase (1.0.0+)

**No breaking changes** without major version bump:
- `1.0.0` → `1.1.0`: No breaking changes
- `1.1.0` → `2.0.0`: Breaking changes allowed

## Deprecation Policy

### Deprecation Timeline

1. **Announcement**: Mark feature as deprecated in documentation
2. **Warning**: Add deprecation warnings in code
3. **Removal**: Remove in next major version

### Example Deprecation

```typescript
/**
 * @deprecated Use `newCommand` instead. This will be removed in v2.0.0
 */
export function oldCommand() {
  console.warn('DEPRECATED: Use newCommand instead');
  // ... implementation
}
```

## Version Management Commands

We provide convenient commands for version management:

```bash
# Patch release (bug fixes)
bun run version:patch

# Minor release (new features)
bun run version:minor

# Major release (breaking changes)
bun run version:major
```

These commands:
1. Clean the build directory
2. Build the project
3. Update the version in package.json
4. Create a git commit with the version change

## Release Frequency

### Alpha Releases
- **Frequency**: As needed during development
- **Trigger**: New features or major changes
- **Audience**: Developers and early adopters

### Beta Releases
- **Frequency**: Every 2-4 weeks
- **Trigger**: Feature completion
- **Audience**: Testing community

### Release Candidates
- **Frequency**: 1-2 weeks before stable
- **Trigger**: Feature freeze
- **Audience**: Production testing

### Stable Releases
- **Frequency**: Every 4-8 weeks
- **Trigger**: Testing completion
- **Audience**: Production users

## Version Compatibility Matrix

| CLI Version | Node.js | Effect-TS | Status |
|-------------|---------|-----------|---------|
| 0.1.0       | ≥20     | ≥3.17     | Alpha   |
| 0.2.0       | ≥20     | ≥3.17     | Alpha   |
| 0.3.0       | ≥20     | ≥3.17     | Alpha   |
| 0.4.0       | ≥20     | ≥3.17     | Alpha   |
| 0.5.0       | ≥20     | ≥3.17     | Beta    |
| 1.0.0       | ≥20     | ≥3.17     | Stable  |

## Migration Guides

For each breaking change, we provide migration guides:

1. **What Changed**: Clear description of the change
2. **Why Changed**: Justification for the breaking change
3. **Migration Steps**: Step-by-step migration instructions
4. **Examples**: Before and after code examples
5. **Timeline**: When the change takes effect

## Version Announcements

When releasing new versions:

1. **GitHub Release**: Create detailed release notes
2. **CHANGELOG.md**: Update with all changes
3. **Documentation**: Update README and API docs
4. **Community**: Announce in relevant channels
5. **Migration**: Provide migration guides if needed
