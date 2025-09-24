const toHaveStyleRule = require('./toHaveStyleRule');
const { resetStyleSheet } = require('../src/utils');

// Setup for rstest - similar to Jest but adapted for rstest's expect system
if (typeof beforeEach === 'function') {
  beforeEach(resetStyleSheet);
} else if (typeof global !== 'undefined' && global.beforeEach) {
  global.beforeEach(resetStyleSheet);
}

// Extend expect with toHaveStyleRule matcher for rstest
if (typeof expect !== 'undefined' && expect.extend) {
  expect.extend({ toHaveStyleRule });
} else if (typeof global !== 'undefined' && global.expect && global.expect.extend) {
  global.expect.extend({ toHaveStyleRule });
}

module.exports = {
  toHaveStyleRule,
};