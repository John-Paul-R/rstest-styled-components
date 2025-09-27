import React from "react";
import styled from "styled-components";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import { test, expect } from "@rstest/core";
import "../";
// import "../typings";

const Button = styled.button`
  color: red;
  border: 0.05em solid black;
`;

const ConditionalButton = styled.button<{ transparent?: boolean }>`
  color: red;
  border: 0.05em solid
    ${(props) => ("transparent" in props ? "transparent" : "black")};
  cursor: ${(props) => !props.disabled && "pointer"};
  opacity: ${(props) => props.disabled && ".65"};
`;

test("should work with renderer", () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toHaveStyleRule("color", "red");
  expect(tree).toHaveStyleRule("border", "0.05em solid black");
});

test("should work with react-testing-library", () => {
  const { container } = render(<Button />);
  expect(container.firstChild).toHaveStyleRule("color", "red");
  expect(container.firstChild).toHaveStyleRule("border", "0.05em solid black");
});

test("should handle conditional styles", () => {
  const tree = renderer.create(<ConditionalButton />).toJSON();
  expect(tree).toHaveStyleRule("color", "red");
  expect(tree).toHaveStyleRule("border", "0.05em solid black");
  expect(tree).toHaveStyleRule("cursor", "pointer");
  expect(tree).not.toHaveStyleRule("opacity");
});

test("should handle conditional styles with props", () => {
  const tree = renderer
    .create(<ConditionalButton disabled transparent />)
    .toJSON();
  expect(tree).toHaveStyleRule(
    "border",
    expect.stringContaining("transparent")
  );
  expect(tree).toHaveStyleRule("cursor", undefined);
  expect(tree).toHaveStyleRule("opacity", ".65");
});

test("should handle non-styled components", () => {
  const tree = renderer.create(<div />).toJSON();
  expect(tree).not.toHaveStyleRule("color", "red");
});

test("should handle null components", () => {
  expect(null).not.toHaveStyleRule("color", "red");
});

// Test with media queries and modifiers
const ResponsiveButton = styled.button`
  @media (max-width: 640px) {
    &:hover {
      color: blue;
    }
  }
`;

test("should work with media queries and modifiers", () => {
  const tree = renderer.create(<ResponsiveButton />).toJSON();
  expect(tree).toHaveStyleRule("color", "blue", {
    media: "(max-width:640px)",
    modifier: ":hover",
  });
});
