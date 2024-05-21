import { ast, includes } from "@phenomnomnominal/tsquery";
import { readFile } from "./helpers";

const file = readFile("src/__tests__/app.spec.tsx");
const astTs = ast(file, "tsx");

// npm run -s task -- src/tests/testing-library@6.2.test.tsx

describe("Mocking", () => {
  // ./task-runner.sh src/tests/testing-library@6.2.test.tsx @6.2
  test("testing block should exist @6.2", () => {
    const hasTestFunction = includes(astTs, 'Identifier[name="test"]');
    const hasItFunction = includes(astTs, 'Identifier[name="it"]');

    const requiredFunction = hasTestFunction || hasItFunction;
    expect(requiredFunction, "You are missing a test block.").toBe(true);
  });

  test("const handleClick should be declared @6.2", () => {
    const includesHandleClick = includes(
      astTs,
      'ArrowFunction Block VariableDeclaration Identifier[name="handleClick"]'
    );

    expect(
      includesHandleClick,
      "Make sure you are declaring a const called handleClick in the first line of your test block"
    ).toBe(true);
  });

  test("const handleClick should be assigned to jest.fn() @6.2", () => {
    const includesHandleClick = includes(
      astTs,
      'ArrowFunction Block VariableDeclaration Identifier[name="handleClick"]'
    );

    const includesJest = includes(
      astTs,
      'ArrowFunction Block CallExpression Identifier[name="jest"]'
    );

    const includesFn = includes(
      astTs,
      'ArrowFunction Block CallExpression Identifier[name="fn"]'
    );

    const result = includesHandleClick && includesJest && includesFn;

    expect(result, "Make sure you are assigning handleClick to jest.fn()").toBe(
      true
    );
  });

  test("render SeeMoreButton should be used @6.2", () => {
    const includesRender = includes(
      astTs,
      'ArrowFunction Block CallExpression Identifier[name="render"]'
    );
    const includesApp = includes(
      astTs,
      'ArrowFunction Block CallExpression Identifier[name="SeeMoreButton"]'
    );

    const result = includesRender && includesApp;
    expect(
      result,
      "Make sure you are rendering the SeeMoreButton component that takes a handleClick prop with render(<SeeMoreButton handleClick={handleClick}/>);"
    ).toBe(true);
  });

  test("handleClick should be passed to SeeMoreButton as a prop @6.2", () => {
    const includesSeeMoreButton = includes(
      astTs,
      'ArrowFunction Block CallExpression Identifier[name="SeeMoreButton"]'
    );

    const includesHandleClick = includes(
      astTs,
      'ArrowFunction Block CallExpression:has(Identifier[name="handleClick"]) '
    );

    const result = includesSeeMoreButton && includesHandleClick;

    expect(
      result,
      "Make sure you are passing the handleClick function to the SeeMoreButton component as a prop"
    ).toBe(true);
  });

  test("userEvent should be used @6.2", () => {
    const includesUserEvent = includes(
      astTs,
      'ArrowFunction Block CallExpression Identifier[name="userEvent"]'
    );

    expect(
      includesUserEvent,
      "Make sure you are using userEvent to simulate user interactions"
    ).toBe(true);
  });

  test("userEvent.click should be used @6.2", () => {
    const includesUserEventClick = includes(
      astTs,
      'ArrowFunction Block CallExpression PropertyAccessExpression Identifier[name="click"]'
    );

    expect(
      includesUserEventClick,
      "Make sure you are using userEvent.click to simulate a user clicking on an element"
    ).toBe(true);
  });

  test("userEvent.click should be used with screen.getByRole @6.2", () => {
    const includesUserEventClick = includes(
      astTs,
      'ArrowFunction Block CallExpression PropertyAccessExpression Identifier[name="click"]'
    );

    const includesGetByRole = includes(
      astTs,
      'ArrowFunction Block CallExpression Identifier[name="getByRole"]'
    );

    const result = includesUserEventClick && includesGetByRole;

    expect(
      result,
      "Make sure you are using userEvent.click with screen.getByRole to simulate a user clicking on a button"
    ).toBe(true);
  });

  test("userEvent.click should be used with screen.getByRole and 'button' @6.2", () => {
    const includesUserEventClick = includes(
      astTs,
      'ArrowFunction Block CallExpression PropertyAccessExpression Identifier[name="click"]'
    );

    const includesGetByRole = includes(
      astTs,
      'ArrowFunction Block CallExpression Identifier[name="getByRole"]'
    );

    const includesButton = includes(
      astTs,
      'Block StringLiteral[value="button"]'
    );

    const result =
      includesUserEventClick && includesGetByRole && includesButton;

    expect(
      result,
      'Make sure you are passing "button" as an argument to screen.getByRole to find the button element'
    ).toBe(true);
  });

  test("userEvent.click should be used with screen.getByRole and the button name @6.2", () => {
    const includesUserEventClick = includes(
      astTs,
      'ArrowFunction Block CallExpression PropertyAccessExpression Identifier[name="click"]'
    );

    const includesGetByRole = includes(
      astTs,
      'ArrowFunction Block CallExpression Identifier[name="getByRole"]'
    );

    const includesButtonName = includes(
      astTs,
      'ArrowFunction Block StringLiteral[value="See more"]'
    );

    const result =
      includesUserEventClick && includesGetByRole && includesButtonName;

    expect(
      result,
      'Make sure you are passing an object with a key called name with the value of "See more" as the second argument to screen.getByRole to find the button element'
    ).toBe(true);
  });

  test("Jest expect should be used @6.2", () => {
    const includesExpect = includes(
      astTs,
      'ArrowFunction Block CallExpression Identifier[name="expect"]'
    );

    expect(
      includesExpect,
      "Make sure you are using Jest's expect function to make an assertion"
    ).toBe(true);
  });

  test("Jest expect should be used with handleClick @6.2", () => {
    const includesExpect = includes(
      astTs,
      'ArrowFunction Block CallExpression Identifier[name="expect"] '
    );

    const includesHandleClick = includes(
      astTs,
      'ArrowFunction CallExpression PropertyAccessExpression CallExpression Identifier[name="handleClick"]'
    );

    const result = includesExpect && includesHandleClick;

    expect(
      result,
      "Make sure you are passing handleClick as an argument to Jest's expect function to make an assertion"
    ).toBe(true);
  });

  test("handleClick toHaveBeenCalledTimes should be called @6.2", () => {
    const includesHandleClick = includes(
      astTs,
      'ArrowFunction CallExpression PropertyAccessExpression CallExpression Identifier[name="handleClick"]'
    );

    const includesToHaveBeenCalledTimes = includes(
      astTs,
      'ArrowFunction Block CallExpression PropertyAccessExpression Identifier[name="toHaveBeenCalledTimes"]'
    );

    const result = includesHandleClick && includesToHaveBeenCalledTimes;

    expect(
      result,
      "Make sure you are calling toHaveBeenCalledTimes on handleClick to assert that the function was called"
    ).toBe(true);
  });

  test("handleClick toHaveBeenCalledTimes should be called with 1 @6.2", () => {
    const includesHandleClick = includes(
      astTs,
      'ArrowFunction CallExpression PropertyAccessExpression CallExpression Identifier[name="handleClick"]'
    );

    const includesToHaveBeenCalledTimes = includes(
      astTs,
      'ArrowFunction Block CallExpression PropertyAccessExpression Identifier[name="toHaveBeenCalledTimes"]'
    );

    const includesOne = includes(astTs, 'Block NumericLiteral[value="1"]');

    const result =
      includesHandleClick && includesToHaveBeenCalledTimes && includesOne;

    expect(
      result,
      "Make sure you are passing 1 as an argument to toHaveBeenCalledTimes to assert that handleClick was called once"
    ).toBe(true);
  });

  // ./task-runner.sh src/tests/testing-library@6.2.test.tsx
  test("handleClick.mockRestore should be called @6.3", () => {
    const includesHandleClick = includes(
      astTs,
      'ArrowFunction CallExpression PropertyAccessExpression CallExpression Identifier[name="handleClick"]'
    );

    const includesMockRestore = includes(
      astTs,
      'ArrowFunction CallExpression PropertyAccessExpression Identifier[name="mockRestore"]'
    );

    const result = includesHandleClick && includesMockRestore;

    expect(
      result,
      "Make sure you are calling handleClick.mockRestore() to restore the function in the end of your test block"
    ).toBe(true);
  });
});
