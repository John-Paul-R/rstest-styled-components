import "../";

// Setup DOM environment if not already present (for styled-components)
function setupDOMEnvironment() {
  if (
    typeof global.window === "undefined" ||
    typeof global.document === "undefined"
  ) {
    try {
      // Try happy-dom first (faster)
      const { GlobalWindow } = require("happy-dom");
      const window = new GlobalWindow();
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;
      return "happy-dom";
    } catch (e) {
      try {
        // Fallback to jsdom
        const { JSDOM } = require("jsdom");
        const dom = new JSDOM("<!doctype html><html><body></body></html>");
        global.window = dom.window;
        global.document = dom.window.document;
        global.navigator = dom.window.navigator;
        return "jsdom";
      } catch (e) {
        // // Final fallback: minimal DOM mock
        // global.window = {
        //   document: {
        //     head: { appendChild: () => {}, removeChild: () => {} },
        //     createElement: () => ({
        //       setAttribute: () => {},
        //       appendChild: () => {},
        //       sheet: {
        //         cssRules: [],
        //         insertRule: () => {},
        //         deleteRule: () => {},
        //       },
        //     }),
        //     querySelectorAll: () => [],
        //     querySelector: () => null,
        //   },
        // };
        // global.document = global.window.document;
        // global.navigator = { userAgent: "test" };
        // return "mock";
      }
    }
  }
  return "existing";
}

// Auto-setup DOM environment
setupDOMEnvironment();
