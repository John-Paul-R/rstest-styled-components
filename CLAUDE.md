# CLAUDE.md - Project Context & Development Guide

## Project Overview

**rstest-styled-components** is a testing utility library that provides `toHaveStyleRule` matcher and enhanced snapshot testing for styled-components when using rstest (the testing framework by web-infra-dev).

### Origin Story
- **Forked from**: `jest-styled-components` v7.2.0
- **Migration goal**: Port Jest utilities to work with rstest
- **Key simplification**: Focused on `toHaveStyleRule` matcher + snapshot serialization
- **Status**: Production-ready, waiting for rstest stable release

## Package Structure

```
rstest-styled-components/
├── src/
│   ├── index.js              # Main entry point with auto-initialization
│   ├── toHaveStyleRule.js    # Core matcher implementation
│   ├── styleSheetSerializer.js # Snapshot serializer
│   └── utils.js              # CSS parsing utilities
├── plugin/
│   └── index.js              # Future rstest plugin implementation
├── setup/
│   └── index.js              # Setup file for rstest config
├── serializer/
│   └── index.js              # Standalone serializer export
├── typings/
│   ├── index.d.ts            # Main TypeScript definitions
│   ├── rstest.d.ts           # rstest-specific types
│   └── global.d.ts           # Universal framework types
├── test/
│   ├── toHaveStyleRule.test.js    # Core matcher tests
│   ├── styleSheetSerializer.test.js # Snapshot tests
│   └── serializerOptions.test.js   # Configuration tests
└── examples/
    ├── typescript-usage.ts    # TypeScript examples
    ├── rstest.config.js       # Configuration examples
    └── basic-usage.js         # Basic usage patterns
```

## Key Dependencies

### Runtime Dependencies
- `@adobe/css-tools` - CSS parsing and stringification
- `styled-components` (peer) - Target library being tested

### Dev Dependencies  
- `pnpm` v10.17.1 - Package manager
- `typescript` - TypeScript support
- `react` + related packages - For testing examples
- `styled-components` - For development/testing

## Development Workflow

### Package Manager
- **Uses pnpm** (not npm/yarn)
- **Lock file**: `pnpm-lock.yaml`
- **Commands**: `pnpm install`, `pnpm test`, etc.

### Scripts
```json
{
  "test": "echo 'Tests will run with rstest when available'",
  "test:watch": "echo 'Tests will run with rstest when available'", 
  "build": "echo 'No build step required'",
  "prepublishOnly": "echo 'Skipping tests until rstest is available'",
  "publish:manual": "pnpm publish --access public"
}
```

### Testing Status
- **Current**: Placeholder test commands (rstest not yet published)
- **Future**: Will use `rstest` when available from web-infra-dev
- **Alternative**: Can temporarily test with Jest (API compatible)

## Core Implementation Details

### Auto-Initialization Pattern
When imported, the package automatically:
1. **Registers `beforeEach` hook** → Resets styled-components styles between tests
2. **Adds snapshot serializer** → Enhances snapshots with CSS rules  
3. **Extends expect** → Adds `toHaveStyleRule` matcher

```js
// src/index.js - Self-executing setup
if (typeof expect !== 'undefined' && expect.extend) {
  expect.extend({ toHaveStyleRule });
}
```

### Plugin Architecture (Future-Ready)
Three setup approaches designed:
1. **Plugin** (future): `plugins: [styledComponentsPlugin()]`
2. **Setup files** (current): `setupFilesAfterEnv: ['rstest-styled-components/setup']`  
3. **Direct import** (manual): `import 'rstest-styled-components'`

### CSS Processing Flow
1. **Extract styles**: `utils.js` → Gets CSS from styled-components internals
2. **Parse CSS**: `@adobe/css-tools` → Converts to AST for manipulation
3. **Match selectors**: `toHaveStyleRule.js` → Finds rules for specific components
4. **Format output**: `styleSheetSerializer.js` → Creates clean snapshots

## TypeScript Integration

### Type Definition Strategy
- **Multiple namespace support**: `jest`, `Vi`, `rstest`, `@rstest/expect`
- **Declaration merging**: Extends existing `Matchers<R>` interfaces
- **Universal compatibility**: Works with any expect-based framework

### Key Type Files
- `typings/index.d.ts` - Main definitions with global declarations
- `typings/rstest.d.ts` - rstest-specific module declaration
- `typings/global.d.ts` - Cross-framework universal types

## Publishing & CI/CD

### GitHub Actions Workflows
1. **CI** (`.github/workflows/ci.yml`)
   - Runs on push/PR to main
   - Tests across Node 16, 18, 20
   - Uses pnpm with caching

2. **Publish** (`.github/workflows/publish.yml`)
   - Manual trigger only
   - Version bump options: patch/minor/major/prerelease
   - Custom dist-tags: latest/beta/alpha
   - Automated: test → bump → publish → tag → release

### Publishing Requirements
- `NPM_TOKEN` secret in GitHub repo
- Tests passing (currently placeholder)
- Manual approval via GitHub Actions UI

## Architecture Decisions

### Why Not Rsbuild Plugin?
- **Rsbuild plugins** = Build-time modifications
- **This package** = Test-time utilities  
- **Different scope**: Testing vs bundling

### Why pnpm?
- **Performance**: Faster installs, less disk usage
- **Strict resolution**: Prevents phantom dependencies
- **Modern**: Better workspace support, cleaner lockfiles

### Why Multi-Framework Types?
- **rstest compatibility**: Unknown final API shape
- **Migration ease**: Smooth transition from Jest
- **Future-proofing**: Works with emerging test frameworks

## Common Tasks

### Adding New Matcher
1. Create matcher in `src/` 
2. Export in `src/index.js`
3. Add to `expect.extend({})`
4. Add TypeScript definitions to `typings/index.d.ts`
5. Create tests in `test/`

### Updating Types
1. Modify `typings/index.d.ts` for main definitions
2. Update framework-specific files if needed  
3. Test with TypeScript examples
4. Update `TYPESCRIPT.md` documentation

### Publishing Release
1. Go to GitHub Actions → "Publish to NPM"
2. Choose version bump type
3. Select dist-tag if not `latest`
4. Click "Run workflow"
5. Workflow handles: test → version → publish → tag → release

## Known Issues & Future Work

### Current Limitations
- **rstest not published**: Using placeholder test commands
- **No integration testing**: Waiting for rstest availability
- **Jest dependency**: Some dev dependencies still reference Jest patterns

### Future Enhancements
- **rstest plugin system**: Implement when rstest adds plugin support
- **Native rstest APIs**: Migrate from Jest-compatible APIs to rstest-native
- **Performance optimization**: Potential CSS parsing optimizations
- **Additional matchers**: Consider adding more styled-components-specific matchers

## Debugging Tips

### Common Issues
1. **Types not working**: Check import, restart TypeScript server
2. **Matcher not found**: Ensure package is imported before tests
3. **CSS not extracted**: styled-components version compatibility
4. **Snapshot differences**: Check serializer configuration

### Development Commands
```bash
# Install dependencies
pnpm install

# Run type checking
npx tsc --noEmit

# Test TypeScript integration  
cd examples && npx tsc --noEmit typescript-usage.ts

# Validate package structure
node -e "console.log(require('./package.json').files)"
```

### Key Files to Monitor
- `src/utils.js` - styled-components internals usage
- `typings/index.d.ts` - TypeScript compatibility 
- `package.json` - Dependencies and exports
- GitHub Actions workflows - CI/CD pipeline

---

**Last Updated**: When rstest becomes available, update test commands and add real integration tests.