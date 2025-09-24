import { Plugin } from 'styled-components';

declare global {
  namespace rstest {
    interface Matchers<R = void> {
      toHaveStyleRule(property: string, expected?: Value, options?: Options): R;
    }
  }
}

export interface Options {
  media?: string;
  modifier?: string | string[];
  supports?: string;
}

export type Value = string | RegExp | undefined;

export interface Matcher {
  (component: any, property: string, expected?: Value, options?: Options): { pass: boolean; message(): string };
}

export declare const toHaveStyleRule: Matcher;