// Example rstest configuration with styled-components plugin

// Option 1: Using the plugin (when rstest supports plugins)
import { styledComponentsPlugin } from "../";

export default {
  // Plugin-based configuration (future rstest feature)
  plugins: [
    styledComponentsPlugin({
      addStyles: true,
      classNameFormatter: (index) => `styled-${index}`,
      autoSetup: true,
    }),
  ],
};

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
