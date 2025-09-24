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

export declare const toHaveStyleRule: Matcher;