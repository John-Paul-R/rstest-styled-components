import React from 'react';
import styled from 'styled-components';
import renderer from 'react-test-renderer';
import { setStyleSheetSerializerOptions } from '../src/styleSheetSerializer';

const Button = styled.button`
  color: red;
  background: blue;
  border: 1px solid black;
`;

describe('Serializer Options', () => {
  afterEach(() => {
    // Reset to default options after each test
    setStyleSheetSerializerOptions({
      addStyles: true,
      classNameFormatter: (index) => `c${index}`,
    });
  });

  test('should disable styles in snapshots when addStyles is false', () => {
    setStyleSheetSerializerOptions({ addStyles: false });
    
    const tree = renderer.create(<Button>No Styles</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should use custom class name formatter', () => {
    setStyleSheetSerializerOptions({
      classNameFormatter: (index) => `styled-${index}`,
    });
    
    const tree = renderer.create(<Button>Custom Classes</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should use descriptive class names', () => {
    setStyleSheetSerializerOptions({
      classNameFormatter: (index) => `component-${index}`,
    });
    
    const PrimaryButton = styled.button`
      color: white;
      background: #007bff;
    `;

    const SecondaryButton = styled.button`
      color: #007bff;
      background: transparent;
      border: 1px solid #007bff;
    `;
    
    const tree = renderer.create(
      <div>
        <PrimaryButton>Primary</PrimaryButton>
        <SecondaryButton>Secondary</SecondaryButton>
      </div>
    ).toJSON();
    
    expect(tree).toMatchSnapshot();
  });

  test('should combine custom formatter with disabled styles', () => {
    setStyleSheetSerializerOptions({
      addStyles: false,
      classNameFormatter: (index) => `btn-${index}`,
    });
    
    const tree = renderer.create(<Button>Combined Options</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});