import { css } from 'styled-components'

declare global {
  namespace rstest {
    interface AsymmetricMatcher {
      $$typeof: Symbol;
      sample?: string | RegExp | object | Array<any> | Function;
    }

    type Value = string | number | RegExp | AsymmetricMatcher | undefined;

    interface Options {
      media?: string;
      modifier?: string | ReturnType<typeof css>;
      supports?: string;
    }

    interface Matchers<R, T> {
      toHaveStyleRule(property: string, value?: Value, options?: Options): R;
    }
  }
}

export interface Matcher {
  (component: any, property: string, expected?: Value, options?: Options): { pass: boolean; message(): string };
}

export interface StyledComponentsSerializerOptions { 
  addStyles?: boolean, 
  classNameFormatter?: (index: number) => string 
} 

export interface SnapshotSerializer {
  test: (val: any) => boolean;
  serialize: (val: any, config: any, indentation: string, depth: number, refs: any, printer: any) => string;
}

export declare const toHaveStyleRule: Matcher;
export declare const styleSheetSerializer: SnapshotSerializer & {
  setStyleSheetSerializerOptions: (options?: StyledComponentsSerializerOptions) => void 
};
export declare const setStyleSheetSerializerOptions: (options?: StyledComponentsSerializerOptions) => void;