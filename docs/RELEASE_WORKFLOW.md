# Release Workflow

This document outlines the process for releasing new versions of the Effect AI CLI package to NPM.

## Pre-release Checklist

Before creating a release, ensure the following:

### Code Quality ✅
- [ ] All tests pass (`bun run test`)
- [ ] TypeScript compilation succeeds (`bun run type-check`)
- [ ] Linting passes (`bun run lint`)
- [ ] Code formatting is correct (`bun run format`)
- [ ] No TypeScript errors (`bun run type-check`)

### Build Verification ✅
- [ ] Clean build directory (`bun run clean`)
- [ ] Build succeeds (`bun run build`)
- [ ] CLI binary is executable and functional
- [ ] All necessary files are included in `dist/`
- [ ] TypeScript declarations are complete

### Documentation ✅
- [ ] README.md is up to date
- [ ] CHANGELOG.md reflects all changes
- [ ] API documentation is current
- [ ] Examples are working

## Release Process

### 1. Version Update

Update the version in `package.json` according to semantic versioning:

```bash
# For patch releases (bug fixes)
bun run version:patch

# For minor releases (new features)
bun run version:minor

# For major releases (breaking changes)
bun run version:major
```

**Note**: We'll add these version scripts to package.json.

### 2. Update CHANGELOG.md

1. Move items from `[Unreleased]` to the new version section
2. Add release date
3. Update version number in the header
4. Ensure all changes are properly categorized

### 3. Build and Test

```bash
# Clean and build
bun run clean
bun run build

# Run full test suite
bun run test
bun run test:coverage

# Test CLI functionality
bun run start --help
```

### 4. Local Package Testing

```bash
# Create local package
bun run pack

# Install locally to test
npm install -g ./effect-ai-cli-*.tgz

# Test CLI commands
effect-ai-cli --help
effect-ai-cli health

# Uninstall local version
npm uninstall -g effect-ai-cli
```

### 5. Git Operations

```bash
# Stage all changes
git add .

# Commit with conventional commit message
git commit -m "chore: release v0.1.1"

# Create and push tag
git tag v0.1.1
git push origin v0.1.1

# Push changes
git push origin main
```

### 6. NPM Publishing

```bash
# Login to NPM (if not already logged in)
npm login

# Publish package
npm publish

# Verify publication
npm view effect-ai-cli
```

## Version Scripts

We'll add these scripts to `package.json`:

```json
{
  "scripts": {
    "version:patch": "bun run clean && bun run build && npm version patch",
    "version:minor": "bun run clean && bun run build && npm version minor", 
    "version:major": "bun run clean && bun run build && npm version major",
    "prepack": "bun run clean && bun run build",
    "postpack": "bun run clean"
  }
}
```

## Release Types

### Alpha Releases (0.1.0-alpha.X)
- Early development versions
- Breaking changes expected
- Not for production use
- Use `npm publish --tag alpha`

### Beta Releases (0.1.0-beta.X)  
- Feature complete, testing phase
- API mostly stable
- Limited production use
- Use `npm publish --tag beta`

### Release Candidates (0.1.0-rc.X)
- Final testing before stable
- API frozen
- Production ready
- Use `npm publish --tag rc`

### Stable Releases (0.1.0, 0.2.0, etc.)
- Production ready
- API stable
- Use `npm publish` (latest tag)

## Rollback Process

If a release has issues:

1. **Unpublish** (within 72 hours):
   ```bash
   npm unpublish effect-ai-cli@0.1.1
   ```

2. **Deprecate** (after 72 hours):
   ```bash
   npm deprecate effect-ai-cli@0.1.1 "This version has known issues"
   ```

3. **Patch Release**: Create a new patch version with fixes

## Post-release Tasks

1. **Verify Installation**: Test fresh installation from NPM
2. **Update Documentation**: Ensure all examples work with new version
3. **Monitor Issues**: Watch for any reported problems
4. **Plan Next Release**: Update roadmap and milestone planning

## Emergency Releases

For critical security fixes:

1. Create immediate patch release
2. Skip some pre-release checks if necessary
3. Focus on security fix only
4. Follow up with comprehensive release

## Release Notes Template

When announcing releases, use this template:

```markdown
## Effect AI CLI v0.1.1 Released! 🚀

### What's New
- [Feature 1]
- [Feature 2]

### Bug Fixes
- [Fix 1]
- [Fix 2]

### Breaking Changes
- None (or list if any)

### Installation
```bash
npm install -g effect-ai-cli
```

### Documentation
- [README](link)
- [CHANGELOG](link)

### Feedback
Please report issues on GitHub or reach out to the team!
```
