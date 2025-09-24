[![NPM version](https://img.shields.io/npm/v/rstest-styled-components.svg)](https://www.npmjs.com/package/rstest-styled-components)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# Rstest Styled Components
A set of utilities for testing [Styled Components](https://github.com/styled-components/styled-components) with [Rstest](https://rstest.rs).
This package provides a `toHaveStyleRule` matcher to make expectations on CSS style rules.

# Quick Start

## Installation

```sh
npm install --save-dev rstest-styled-components
```

## Usage

```js
import React from 'react'
import styled from 'styled-components'
import renderer from 'react-test-renderer'
import 'rstest-styled-components'

const Button = styled.button`
  color: red;
`

test('it works', () => {
  const tree = renderer.create(<Button />).toJSON()
  expect(tree).toHaveStyleRule('color', 'red')
})
```

If you don't want to import the library in every test file, it's recommended to use the [global installation](#global-installation) method.

Table of Contents
=================

   * [toHaveStyleRule](#tohavestylerule)
   * [Global installation](#global-installation)
   * [Contributing](#contributing)

# toHaveStyleRule

The `toHaveStyleRule` matcher is useful to test if a given CSS rule is applied to a component.
The first argument is the expected property, the second is the expected value which can be a String, RegExp, rstest asymmetric matcher or `undefined`.
When used with a negated ".not" modifier the second argument is optional and can be omitted.

```js
const Button = styled.button`
  color: red;
  border: 0.05em solid ${props => props.transparent ? 'transparent' : 'black'};
  cursor: ${props => !props.disabled && 'pointer'};
  opacity: ${props => props.disabled && '.65'};
`

test('it applies default styles', () => {
  const tree = renderer.create(<Button />).toJSON()
  expect(tree).toHaveStyleRule('color', 'red')
  expect(tree).toHaveStyleRule('border', '0.05em solid black')
  expect(tree).toHaveStyleRule('cursor', 'pointer')
  expect(tree).not.toHaveStyleRule('opacity') // equivalent of the following two
  expect(tree).not.toHaveStyleRule('opacity', expect.any(String))
  expect(tree).toHaveStyleRule('opacity', undefined)
})

test('it applies styles according to passed props', () => {
  const tree = renderer.create(<Button disabled transparent />).toJSON()
  expect(tree).toHaveStyleRule('border', expect.stringContaining('transparent'))
  expect(tree).toHaveStyleRule('cursor', undefined)
  expect(tree).toHaveStyleRule('opacity', '.65')
})
```

The matcher supports an optional third `options` parameter which makes it possible to search for rules nested within an [At-rule](https://developer.mozilla.org/en/docs/Web/CSS/At-rule) (see [media](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) and [supports](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports)) or to add modifiers to the class selector.

```js
const Button = styled.button`
  @media (max-width: 640px) {
    &:hover {
      color: red;
    }
  }
`

test('it works', () => {
  const tree = renderer.create(<Button />).toJSON()
  expect(tree).toHaveStyleRule('color', 'red', {
    media: '(max-width:640px)',
    modifier: ':hover',
  })
})
```

If a rule is nested within another styled-component, the `modifier` option can be used with the [`css`](https://www.styled-components.com/docs/api#css) helper to target the nested rule.

```js
const Button = styled.button`
  color: red;
`

const ButtonList = styled.div`
  display: flex;

  ${Button} {
    flex: 1 0 auto;
  }
`

import { css } from 'styled-components';

test('nested buttons are flexed', () => {
  const tree = renderer.create(<ButtonList><Button /></ButtonList>).toJSON()
  expect(tree).toHaveStyleRule('flex', '1 0 auto', {
    modifier: css`${Button}`,
  })
})
```

You can take a similar approach when you have classNames that override styles
```js
const Button = styled.button`
  background-color: red;
  
  &.override {
    background-color: blue;
  }
`
const wrapper = mount(<Button className="override">I am a button!</Button>);

expect(wrapper).toHaveStyleRule('background-color', 'blue', {
  modifier: '&.override',
});
```

This matcher works with trees serialized with `react-test-renderer`, `react-testing-library`, or those shallow rendered or mounted with Enzyme.
It checks the style rules applied to the root component it receives, therefore to make assertions on components further in the tree they must be provided separately (Enzyme's [find](http://airbnb.io/enzyme/docs/api/ShallowWrapper/find.html) might help).

> Note: for `react-testing-library`, you'll need to pass the first child to check the top-level component's style. To check the styles of deeper components, you can use one of the `getBy*` methods to find the element (e.g. `expect(getByTestId('styled-button')).toHaveStyleRule('color', 'blue')`)

# Global installation

It is possible to setup this package for all the tests. For example: import the library once in the `src/setupTests.js` as follows:

```js
import 'rstest-styled-components'
```

...then add the following to your rstest configuration:

```js
setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
```

# Contributing

Please [open an issue](https://github.com/John-Paul-R/rstest-styled-components/issues/new) and discuss with us before submitting a PR.