/**
 * Rstest Styled Components Setup File
 * 
 * This file automatically configures styled-components testing utilities
 * when included in rstest's setupFilesAfterEnv configuration.
 * 
 * Usage in rstest.config.js:
 * {
 *   setupFilesAfterEnv: ['rstest-styled-components/setup']
 * }
 */

// Import and automatically initialize all utilities
require('../src/index');

// Export utilities for direct access if needed
const toHaveStyleRule = require('../src/toHaveStyleRule');
const { styleSheetSerializer, setStyleSheetSerializerOptions } = require('../src/styleSheetSerializer');
const { resetStyleSheet } = require('../src/utils');

module.exports = {
  toHaveStyleRule,
  styleSheetSerializer,
  setStyleSheetSerializerOptions,
  resetStyleSheet
};