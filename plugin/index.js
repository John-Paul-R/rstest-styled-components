const {
  styleSheetSerializer,
  setStyleSheetSerializerOptions,
} = require("../src/styleSheetSerializer");
const toHaveStyleRule = require("../src/toHaveStyleRule");
const { resetStyleSheet } = require("../src/utils");

/**
 * Rstest Styled Components Plugin
 *
 * This plugin automatically configures styled-components testing utilities
 * for rstest without requiring manual imports in test files.
 */
function styledComponentsPlugin(options = {}) {
  console.log(
    "[rstest-styled-components] Plugin constructor called with options:",
    options
  );
  const {
    addStyles = true,
    classNameFormatter = (index) => `c${index}`,
    autoSetup = true,
  } = options;

  // Configure serializer options
  if (addStyles !== undefined || classNameFormatter !== undefined) {
    setStyleSheetSerializerOptions({
      addStyles,
      classNameFormatter,
    });
  }

  return {
    name: "rstest-styled-components",

    // Plugin setup hook (if rstest supports this pattern)
    setup(api) {
      console.log("[rstest-styled-components] Plugin setup() called");

      api.modifyRsbuildConfig(/*register setupFiles*/);
      // Setup test environment
      // if (autoSetup) {
      //   // Register beforeEach hook for cleanup
      //   if (api.beforeEach) {
      //     api.beforeEach(resetStyleSheet);
      //   }

      //   // Add snapshot serializer
      //   if (api.addSnapshotSerializer) {
      //     api.addSnapshotSerializer(styleSheetSerializer);
      //   }

      //   // Extend expect with custom matcher
      //   if (api.extend) {
      //     api.extend({ toHaveStyleRule });
      //     console.log(
      //       "[rstest-styled-components] ✅ Registration via api.extend"
      //     );
      //   } else if (api.expect && api.expect.extend) {
      //     api.expect.extend({ toHaveStyleRule });
      //     console.log(
      //       "[rstest-styled-components] ✅ Registration via api.expect.extend"
      //     );
      //   } else {
      //     console.log("[rstest-styled-components] ❌ No extend method found");
      //   }
      // }
    },

    // Alternative: configuration-based setup
    configure(config) {
      if (!config.setupFiles) {
        config.setupFiles = [];
      }
      console.log("adding setupfiles", require.resolve("./setup/index.js"));
      config.setupFiles.push(require.resolve("./setup/index.js"));
      return config;
    },
  };
}

// Export both function and direct plugin
module.exports = styledComponentsPlugin;
module.exports.styledComponentsPlugin = styledComponentsPlugin;
module.exports.default = styledComponentsPlugin;

// For ES modules
module.exports.__esModule = true;
