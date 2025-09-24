# Rstest Styled Components

This package provides `toHaveStyleRule` matcher support for testing [Styled Components](https://github.com/styled-components/styled-components) with [Rstest](https://rstest.rs).

## Installation

```sh
npm install --save-dev jest-styled-components
```

## Usage

### Setup

Import the rstest module in your test setup:

```js
import 'jest-styled-components/rstest'
```

Or import it directly in your test files:

```js
import React from 'react'
import styled from 'styled-components'
import renderer from 'react-test-renderer'
import 'jest-styled-components/rstest'

const Button = styled.button`
  color: red;
`

test('it works', () => {
  const tree = renderer.create(<Button />).toJSON()
  expect(tree).toHaveStyleRule('color', 'red')
})
```

### Global Setup

You can setup this package globally for all rstest tests by importing it in your test setup file:

```js
// setup.js
import 'jest-styled-components/rstest'
```

Then configure rstest to use this setup file in your test configuration.

## toHaveStyleRule Matcher

The `toHaveStyleRule` matcher is useful to test if a given CSS rule is applied to a component.

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
  expect(tree).not.toHaveStyleRule('opacity')
})

test('it applies styles according to props', () => {
  const tree = renderer.create(<Button disabled transparent />).toJSON()
  expect(tree).toHaveStyleRule('border', expect.stringContaining('transparent'))
  expect(tree).toHaveStyleRule('cursor', undefined)
  expect(tree).toHaveStyleRule('opacity', '.65')
})
```

### Options

The matcher supports an optional third parameter for advanced use cases:

```js
const Button = styled.button`
  @media (max-width: 640px) {
    &:hover {
      color: red;
    }
  }
`

test('it works with media queries and modifiers', () => {
  const tree = renderer.create(<Button />).toJSON()
  expect(tree).toHaveStyleRule('color', 'red', {
    media: '(max-width:640px)',
    modifier: ':hover',
  })
})
```

## Compatibility

This rstest plugin maintains compatibility with the original jest-styled-components API while working with rstest's expect system. It supports:

- React Test Renderer
- React Testing Library
- Enzyme (shallow and mount)
- Media queries
- CSS modifiers
- RegExp and string matching
- Negated assertions