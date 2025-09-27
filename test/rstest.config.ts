// Example rstest configuration with styled-components plugin
import { defineConfig } from "@rstest/core";

// Option 1: Using the plugin (when rstest supports plugins)
// import { styledComponentsPlugin } from "../";

console.log("rstest config!");

export default defineConfig({
  // testEnvironment: "jsdom", // for some reason setting testEnvironment breaks things
  // plugins: [
  //   styledComponentsPlugin({
  //     addStyles: true,
  //     classNameFormatter: (index) => `styled-${index}`,
  //     autoSetup: true,
  //   }),
  // ],
  // setupFiles: ["./setup/index.js"],
});

// Option 2: Using setup files (more likely current approach)
/*
export default {
  setupFilesAfterEnv: [
    'rstest-styled-components/setup'
  ]
};
*/

// Option 3: Manual configuration with serializer options
/*
import { setStyleSheetSerializerOptions } from 'rstest-styled-components/serializer';

// Configure before tests
setStyleSheetSerializerOptions({
  addStyles: true,
  classNameFormatter: (index) => `component-${index}`
});

export default {
  setupFilesAfterEnv: [
    'rstest-styled-components/setup'
  ]
};
*/
