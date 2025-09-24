# Publishing Guide

This package uses pnpm and GitHub Actions for publishing to npm.

## Manual Publishing via GitHub Actions

1. Navigate to the [Actions tab](../../actions/workflows/publish.yml) in GitHub
2. Click "Run workflow" 
3. Select the version bump type:
   - **patch** - Bug fixes (1.0.0 → 1.0.1)
   - **minor** - New features (1.0.0 → 1.1.0) 
   - **major** - Breaking changes (1.0.0 → 2.0.0)
   - **prerelease** - Beta releases (1.0.0 → 1.0.1-beta.0)
4. Optionally specify a dist-tag (default: `latest`)
   - `latest` - Main release channel
   - `beta` - Beta releases
   - `alpha` - Alpha releases
5. Click "Run workflow"

The workflow will:
- ✅ Run tests to ensure quality
- 🏷️ Bump the version in package.json
- 📦 Publish to npm with the specified tag
- 🏷️ Create a git tag and push to repository
- 📋 Create a GitHub release

## Local Development

### Setup
```bash
pnpm install
```

### Testing
```bash
pnpm test
pnpm test:watch
```

### Manual Publishing (if needed)
```bash
pnpm publish:manual
```

## Requirements

- Node.js 16+ 
- pnpm 10.17.1+
- NPM_TOKEN secret configured in GitHub repository settings

## CI/CD

The repository has two workflows:
- **CI** - Runs on every push/PR to test the code
- **Publish** - Manual workflow for publishing releases

Both workflows use pnpm for fast, efficient dependency management.