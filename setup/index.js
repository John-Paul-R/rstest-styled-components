/**
 * Rstest Styled Components Setup File
 *
 * This file automatically configures styled-components testing utilities
 * when included in rstest's setupFilesAfterEnv configuration.
 *
 * Usage in rstest.config.js:
 * {
 *   setupFiles: ['rstest-styled-components/setup']
 * }
 */

const toHaveStyleRule = require("../src/toHaveStyleRule");
const styleSheetSerializer = require("../src/styleSheetSerializer");
const { resetStyleSheet } = require("../src/utils");

// Setup DOM environment
console.log("[rstest-styled-components] Setup file is being executed!");

// Register with rstest's expect using RSTEST_API
if (typeof global !== "undefined" && global.RSTEST_API) {
  const api = global.RSTEST_API;

  // Try to extend expect through the rstest API
  if (api.extend) {
    api.extend({ toHaveStyleRule });
  } else if (api.expect && api.expect.extend) {
    api.expect.extend({ toHaveStyleRule });
  }
} else {
  // Fallback to trying expect directly (for non-rstest environments)
  if (typeof expect !== "undefined" && expect.extend) {
    expect.extend({ toHaveStyleRule });
  }
}

// Add snapshot serializer
if (typeof expect !== "undefined" && expect.addSnapshotSerializer) {
  expect.addSnapshotSerializer(styleSheetSerializer);
}

// Setup beforeEach hook for cleanup
if (typeof beforeEach === "function") {
  beforeEach(resetStyleSheet);
}

// Export utilities for direct access if needed
const {
  setStyleSheetSerializerOptions,
} = require("../src/styleSheetSerializer");

module.exports = {
  toHaveStyleRule,
  styleSheetSerializer,
  setStyleSheetSerializerOptions,
  resetStyleSheet,
};
