import React from 'react';
import styled from 'styled-components';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import '../src';

const Button = styled.button`
  color: red;
  background: blue;
`;

const ConditionalButton = styled.button`
  color: ${props => props.primary ? 'white' : 'black'};
  background: ${props => props.primary ? 'blue' : 'white'};
  border: 1px solid ${props => props.primary ? 'blue' : 'black'};
`;

const MediaQueryButton = styled.button`
  color: red;
  
  @media (max-width: 768px) {
    color: blue;
    font-size: 14px;
  }
`;

const NestedButton = styled.button`
  color: red;
  
  &:hover {
    color: blue;
  }
  
  &.active {
    background: yellow;
  }
`;

describe('Snapshot Serializer', () => {
  test('should serialize styled components with React Test Renderer', () => {
    const tree = renderer.create(<Button>Click me</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should serialize styled components with React Testing Library', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should serialize styled components with Enzyme shallow', () => {
    const wrapper = shallow(<Button>Click me</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  test('should serialize styled components with Enzyme mount', () => {
    const wrapper = mount(<Button>Click me</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  test('should serialize conditional styled components', () => {
    const primaryTree = renderer.create(<ConditionalButton primary>Primary</ConditionalButton>).toJSON();
    const secondaryTree = renderer.create(<ConditionalButton>Secondary</ConditionalButton>).toJSON();
    
    expect(primaryTree).toMatchSnapshot();
    expect(secondaryTree).toMatchSnapshot();
  });

  test('should serialize components with media queries', () => {
    const tree = renderer.create(<MediaQueryButton>Responsive</MediaQueryButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should serialize components with nested selectors', () => {
    const tree = renderer.create(<NestedButton className="active">Hover me</NestedButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should serialize multiple styled components', () => {
    const Container = styled.div`
      display: flex;
      gap: 10px;
    `;
    
    const tree = renderer.create(
      <Container>
        <Button>First</Button>
        <ConditionalButton primary>Second</ConditionalButton>
      </Container>
    ).toJSON();
    
    expect(tree).toMatchSnapshot();
  });

  test('should handle components without styles', () => {
    const tree = renderer.create(<div>Plain div</div>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should handle null components', () => {
    expect(null).toMatchSnapshot();
  });

  test('should serialize components with custom props', () => {
    const CustomButton = styled.button.attrs(props => ({
      type: props.type || 'button',
      'data-testid': props.testId
    }))`
      color: ${props => props.variant === 'danger' ? 'red' : 'blue'};
      padding: ${props => props.size === 'large' ? '12px 24px' : '8px 16px'};
    `;

    const tree = renderer.create(
      <CustomButton variant="danger" size="large" testId="custom-btn">
        Custom Button
      </CustomButton>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});