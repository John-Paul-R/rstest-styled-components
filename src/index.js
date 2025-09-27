const toHaveStyleRule = require("./toHaveStyleRule");
const styleSheetSerializer = require("./styleSheetSerializer");
const { resetStyleSheet } = require("./utils");

// Main setup function for rstest/Jest integration
function setupStyledComponentsMatchers() {
  // Setup beforeEach hook for styled-components
  if (typeof beforeEach === "function") {
    beforeEach(resetStyleSheet);
  } else if (typeof global !== "undefined" && global.beforeEach) {
    global.beforeEach(resetStyleSheet);
  }

  // Add snapshot serializer
  if (typeof expect !== "undefined" && expect.addSnapshotSerializer) {
    expect.addSnapshotSerializer(styleSheetSerializer);
  } else if (
    typeof global !== "undefined" &&
    global.expect &&
    global.expect.addSnapshotSerializer
  ) {
    global.expect.addSnapshotSerializer(styleSheetSerializer);
  }

  // Primary approach: extend expect for rstest/Jest compatibility
  if (typeof expect !== "undefined" && expect.extend) {
    expect.extend({ toHaveStyleRule });
    return "expect.extend";
  } else if (
    typeof global !== "undefined" &&
    global.expect &&
    global.expect.extend
  ) {
    global.expect.extend({ toHaveStyleRule });
    return "global.expect.extend";
  }

  return "none";
}

// Note: Auto-registration happens via rstest plugin system or setup files
// This module primarily exports utilities and Chai plugin functionality

// Try opportunistic registration if expect is available (for direct imports)
if (
  typeof expect !== "undefined" &&
  expect.extend &&
  !("toHaveStyleRule" in expect)
) {
  setupStyledComponentsMatchers();
}

// Export the plugin function and utilities
const styledComponentsPlugin = require("../plugin/index");

module.exports.styledComponentsPlugin = styledComponentsPlugin;
module.exports.toHaveStyleRule = toHaveStyleRule;
module.exports.styleSheetSerializer = styleSheetSerializer;
module.exports.setupStyledComponentsMatchers = setupStyledComponentsMatchers;
