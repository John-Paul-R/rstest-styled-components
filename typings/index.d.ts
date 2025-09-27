import { css } from "styled-components";

// Type definitions for styled-components matchers
type StyledComponentsValue = string | number | RegExp | undefined;

interface StyledComponentsOptions {
  media?: string;
  modifier?: string | ReturnType<typeof css>;
  supports?: string;
}

// // Extend rstest's Assertion interface
// declare module "@rstest/core" {
//   interface Assertion<T = any> {
//     toHaveStyleRule: (
//       property: string,
//       value?: StyledComponentsValue,
//       options?: StyledComponentsOptions
//     ) => void;
//   }
// }

declare global {
  namespace Chai {
    interface Assertion {
      toHaveStyleRule: (
        property: string,
        value?: StyledComponentsValue,
        options?: StyledComponentsOptions
      ) => void;
    }
  }
}

export interface StyledComponentsSerializerOptions {
  addStyles?: boolean;
  classNameFormatter?: (index: number) => string;
}

export interface SnapshotSerializer {
  test: (val: any) => boolean;
  serialize: (
    val: any,
    config: any,
    indentation: string,
    depth: number,
    refs: any,
    printer: any
  ) => string;
}

// export declare const toHaveStyleRule: Matcher;
export declare const styleSheetSerializer: SnapshotSerializer & {
  setStyleSheetSerializerOptions: (
    options?: StyledComponentsSerializerOptions
  ) => void;
};
export declare const setStyleSheetSerializerOptions: (
  options?: StyledComponentsSerializerOptions
) => void;

// Plugin interface
export interface PluginOptions extends StyledComponentsSerializerOptions {
  autoSetup?: boolean;
}

export interface RstestPlugin {
  name: string;
  setup?: (api: any) => void;
  configure?: (config: any) => any;
}

export declare function styledComponentsPlugin(
  options?: PluginOptions
): RstestPlugin;
