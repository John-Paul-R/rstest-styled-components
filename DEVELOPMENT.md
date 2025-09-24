# Development Notes

## Current Status

This package is ready for rstest but currently uses placeholder test commands since rstest from web-infra-dev is still in development (expected stable release late 2025).

## When rstest is available

Update `package.json` scripts:
```json
{
  "scripts": {
    "test": "rstest",
    "test:watch": "rstest --watch",
    "prepublishOnly": "pnpm test"
  },
  "devDependencies": {
    "rstest": "^0.2.1"
  }
}
```

## Alternative Testing (Temporary)

For now, you can test this package with Jest since the APIs are compatible:

```bash
pnpm add -D jest @jest/globals
```

Update scripts:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

The code is designed to be compatible with both Jest and rstest expect APIs.

## Package Manager

This project uses **pnpm** for dependency management:
- Fast, efficient, and space-saving
- Strict dependency resolution
- Better monorepo support

### Commands
```bash
# Install dependencies
pnpm install

# Run tests (when rstest is available)
pnpm test

# Watch mode
pnpm test:watch

# Publish (manual)
pnpm publish:manual
```

## Publishing

Publishing is handled via GitHub Actions workflow. See [PUBLISHING.md](./PUBLISHING.md) for details.