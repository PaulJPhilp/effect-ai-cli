# Release Quick Reference

Quick checklist for releasing new versions of Effect AI CLI.

## Pre-release Checklist

```bash
# 1. Code Quality
bun run test              # All tests pass
bun run type-check        # No TypeScript errors
bun run lint              # Linting passes
bun run format            # Code is formatted

# 2. Build Verification
bun run clean             # Clean build directory
bun run build             # Build succeeds
bun run start --help      # CLI works

# 3. Documentation
# - README.md is current
# - CHANGELOG.md reflects changes
# - API docs are updated
```

## Release Commands

```bash
# Patch release (bug fixes)
bun run version:patch

# Minor release (new features)
bun run version:minor

# Major release (breaking changes)
bun run version:major
```

## Local Testing

```bash
# Create local package
bun run pack

# Install locally
npm install -g ./effect-ai-cli-*.tgz

# Test CLI
effect-ai-cli --help
effect-ai-cli health

# Uninstall
npm uninstall -g effect-ai-cli
```

## Git Operations

```bash
# Commit changes
git add .
git commit -m "chore: release v0.1.1"

# Create and push tag
git tag v0.1.1
git push origin v0.1.1

# Push changes
git push origin main
```

## NPM Publishing

```bash
# Login (if needed)
npm login

# Publish
npm publish

# Verify
npm view effect-ai-cli
```

## Version Tags

```bash
# Alpha release
npm publish --tag alpha

# Beta release
npm publish --tag beta

# Release candidate
npm publish --tag rc

# Stable release
npm publish
```

## Emergency Rollback

```bash
# Unpublish (within 72 hours)
npm unpublish effect-ai-cli@0.1.1

# Deprecate (after 72 hours)
npm deprecate effect-ai-cli@0.1.1 "Known issues"
```

## Post-release

- [ ] Verify installation from NPM
- [ ] Update documentation if needed
- [ ] Monitor for issues
- [ ] Plan next release
