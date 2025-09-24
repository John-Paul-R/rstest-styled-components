const toHaveStyleRule = require('./toHaveStyleRule');
const styleSheetSerializer = require('./styleSheetSerializer');
const { resetStyleSheet } = require('./utils');

// Setup for rstest
if (typeof beforeEach === 'function') {
  beforeEach(resetStyleSheet);
} else if (typeof global !== 'undefined' && global.beforeEach) {
  global.beforeEach(resetStyleSheet);
}

// Add snapshot serializer for rstest
if (typeof expect !== 'undefined' && expect.addSnapshotSerializer) {
  expect.addSnapshotSerializer(styleSheetSerializer);
} else if (typeof global !== 'undefined' && global.expect && global.expect.addSnapshotSerializer) {
  global.expect.addSnapshotSerializer(styleSheetSerializer);
}

// Extend expect with toHaveStyleRule matcher for rstest
if (typeof expect !== 'undefined' && expect.extend) {
  expect.extend({ toHaveStyleRule });
} else if (typeof global !== 'undefined' && global.expect && global.expect.extend) {
  global.expect.extend({ toHaveStyleRule });
}

module.exports = {
  toHaveStyleRule,
  styleSheetSerializer,
};
