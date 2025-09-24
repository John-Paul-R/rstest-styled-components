const { styleSheetSerializer, setStyleSheetSerializerOptions } = require('../src/styleSheetSerializer');
const toHaveStyleRule = require('../src/toHaveStyleRule');
const { resetStyleSheet } = require('../src/utils');

/**
 * Rstest Styled Components Plugin
 * 
 * This plugin automatically configures styled-components testing utilities
 * for rstest without requiring manual imports in test files.
 */
function styledComponentsPlugin(options = {}) {
  const {
    addStyles = true,
    classNameFormatter = (index) => `c${index}`,
    autoSetup = true
  } = options;

  // Configure serializer options
  if (addStyles !== undefined || classNameFormatter !== undefined) {
    setStyleSheetSerializerOptions({
      addStyles,
      classNameFormatter
    });
  }

  return {
    name: 'rstest-styled-components',
    
    // Plugin setup hook (if rstest supports this pattern)
    setup(api) {
      // Setup test environment
      if (autoSetup) {
        // Register beforeEach hook for cleanup
        if (api.beforeEach) {
          api.beforeEach(resetStyleSheet);
        }
        
        // Add snapshot serializer
        if (api.addSnapshotSerializer) {
          api.addSnapshotSerializer(styleSheetSerializer);
        }
        
        // Extend expect with custom matcher
        if (api.extend) {
          api.extend({ toHaveStyleRule });
        }
      }
    },

    // Alternative: configuration-based setup
    configure(config) {
      if (!config.setupFilesAfterEnv) {
        config.setupFilesAfterEnv = [];
      }
      config.setupFilesAfterEnv.push(require.resolve('../setup'));
      return config;
    }
  };
}

// Export both function and direct plugin
module.exports = styledComponentsPlugin;
module.exports.styledComponentsPlugin = styledComponentsPlugin;
module.exports.default = styledComponentsPlugin;

// For ES modules
module.exports.__esModule = true;