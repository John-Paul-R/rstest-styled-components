// Example: Basic usage with different setup methods

// Method 1: Direct import (current approach)
import 'rstest-styled-components';

// Method 2: Plugin approach (future)
// Configuration handled in rstest.config.js

// Method 3: Setup file approach
// Configuration handled in rstest.config.js

import React from 'react';
import styled from 'styled-components';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

const Button = styled.button`
  color: red;
  background: blue;
  border: 1px solid black;
  
  &:hover {
    color: white;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

describe('Styled Components Testing', () => {
  test('snapshot testing with enhanced CSS output', () => {
    const tree = renderer.create(<Button>Click me</Button>).toJSON();
    
    // This snapshot will include:
    // - Actual CSS rules
    // - Stable class names (c0, c1, etc.)
    // - Clean, readable output
    expect(tree).toMatchSnapshot();
  });

  test('style rule testing with toHaveStyleRule', () => {
    const tree = renderer.create(<Button>Click me</Button>).toJSON();
    
    // Test basic styles
    expect(tree).toHaveStyleRule('color', 'red');
    expect(tree).toHaveStyleRule('background', 'blue');
    expect(tree).toHaveStyleRule('border', '1px solid black');
    
    // Test hover state
    expect(tree).toHaveStyleRule('color', 'white', {
      modifier: ':hover'
    });
    
    // Test media queries
    expect(tree).toHaveStyleRule('font-size', '14px', {
      media: '(max-width: 768px)'
    });
  });

  test('works with React Testing Library', () => {
    const { container } = render(<Button>Click me</Button>);
    
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toHaveStyleRule('color', 'red');
  });
});

// Example with custom configuration
describe('Custom Configuration', () => {
  beforeAll(() => {
    // Override serializer options for this test suite
    const { setStyleSheetSerializerOptions } = require('rstest-styled-components/serializer');
    
    setStyleSheetSerializerOptions({
      addStyles: false, // Disable CSS in snapshots
      classNameFormatter: (index) => `btn-${index}`
    });
  });

  test('snapshot without CSS styles', () => {
    const tree = renderer.create(<Button>No CSS</Button>).toJSON();
    
    // This snapshot will only show HTML structure
    // with custom class names like "btn-0"
    expect(tree).toMatchSnapshot();
  });
});