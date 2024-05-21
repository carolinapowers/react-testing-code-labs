import { ast, includes } from "@phenomnomnominal/tsquery";
import { readFile } from "./helpers";

const file = readFile("src/__tests__/app.spec.tsx");
const astTs = ast(file, "tsx");

// npm run -s task -- src/tests/testing-library@6.1.test.tsx
describe("User Interaction", () => {
  test("testing block should exist @6.1", () => {
    const hasTestFunction = includes(astTs, 'Identifier[name="test"]');
    const hasItFunction = includes(astTs, 'Identifier[name="it"]');
    const hasAsyncFunction = includes(astTs, "CallExpression AsyncKeyword");

    const requiredFunction = hasTestFunction || hasItFunction;
    expect(
      requiredFunction && hasAsyncFunction,
      "Add a test block that takes an async function as the second argument"
    ).toBe(true);
  });

  test("async call expression exist @6.1", () => {
    const hasAsyncFunction = includes(astTs, "CallExpression AsyncKeyword");

    expect(
      hasAsyncFunction,
      "Make sure you are using async/await to handle asynchronous code"
    ).toBe(true);
  });

  test("render App should be used @6.1", () => {
    const includesRender = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression Identifier[name="render"]'
    );
    const includesApp = includes(
      astTs,
      'Block CallExpression Identifier[name="App"]'
    );

    const result = includesRender && includesApp;
    expect(
      result,
      "Make sure you are rendering the <App/> component with render(<App/>);"
    ).toBe(true);
  });

  test("fireEvent should be used @6.1", () => {
    const includesFireEvent = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression Identifier[name="fireEvent"]'
    );

    expect(
      includesFireEvent,
      "Make sure you are using fireEvent.click() to simulate user interactions"
    ).toBe(true);
  });

  test("fireEvent.click should be used @6.1", () => {
    const includesFireEventClick = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression PropertyAccessExpression Identifier[name="click"]'
    );

    expect(
      includesFireEventClick,
      "Make sure you are using fireEvent.click to simulate a user clicking on an element"
    ).toBe(true);
  });

  test("fireEvent.click should be used with screen.getByRole @6.1", () => {
    const includesFireEventClick = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression PropertyAccessExpression Identifier[name="click"]'
    );

    const includesGetByRole = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression Identifier[name="getByRole"]'
    );

    const result = includesFireEventClick && includesGetByRole;

    expect(
      result,
      "Make sure you are using fireEvent.click with screen.getByRole to simulate a user clicking on a button"
    ).toBe(true);
  });

  test("fireEvent.click should be used with screen.getByRole and 'button' @6.1", () => {
    const includesFireEventClick = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression PropertyAccessExpression Identifier[name="click"]'
    );

    const includesGetByRole = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression Identifier[name="getByRole"]'
    );

    const includesButton = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block StringLiteral[value="button"]'
    );

    const result =
      includesFireEventClick && includesGetByRole && includesButton;

    expect(
      result,
      'Make sure you are passing "button" as the first argument to screen.getByRole to find the button element'
    ).toBe(true);
  });

  test("screen.getByRole should have an object as the second argument that has a name key @6.1", () => {
    const includesFireEventClick = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression PropertyAccessExpression Identifier[name="click"]'
    );

    const includesGetByRole = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression Identifier[name="getByRole"]'
    );

    const hasNameKey = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block PropertyAssignment Identifier[name="name"]'
    );

    const result = includesFireEventClick && includesGetByRole && hasNameKey;

    expect(
      result,
      'Make sure you are passing an object with a key called name with the value of "See more" as the second argument to screen.getByRole to find the button element'
    ).toBe(true);
  });

  test("fireEvent.click should be used with screen.getByRole and See more button @6.1", () => {
    const includesFireEventClick = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression PropertyAccessExpression Identifier[name="click"]'
    );

    const includesGetByRole = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression Identifier[name="getByRole"]'
    );

    const includesButtonName = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block StringLiteral[value="See more"]'
    );

    const result =
      includesFireEventClick && includesGetByRole && includesButtonName;

    expect(
      result,
      'Make sure you are passing an object with a key called name with the value of "See more" as the second argument to screen.getByRole to find the button element'
    ).toBe(true);
  });

  test("create const h2Element @6.1", () => {
    const includesH2Element = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block VariableStatement VariableDeclarationList Identifier[name="h2Element"]'
    );

    expect(
      includesH2Element,
      "Make sure you're creating a constant named h2Element"
    ).toBe(true);
  });

  test("screen.findByText is being used @6.1", () => {
    const includesScreen = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression Identifier[name="screen"]'
    );
    const includesGetByText = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression Identifier[name="findByText"]'
    );

    const result = includesScreen && includesGetByText;
    expect(
      result,
      'Use React Testing Library screen.findByText() to find the h2 element with a text of "React Testing Library Best Practices"'
    ).toBe(true);
  });

  test("await exist @6.1", () => {
    const includesAwait = includes(
      astTs,
      "ArrowFunction:has(AsyncKeyword) Block AwaitExpression"
    );

    expect(
      includesAwait,
      "Make sure you are using await before the screen.findByText query to handle asynchronous code"
    ).toBe(true);
  });

  test("screen.findByText is assigned to const h2Element @6.1", () => {
    const includesScreen = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression Identifier[name="screen"]'
    );
    const includesFindByText = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression Identifier[name="findByText"]'
    );
    const includesH2Element = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block VariableStatement VariableDeclarationList Identifier[name="h2Element"]'
    );

    const result = includesScreen && includesFindByText && includesH2Element;
    expect(
      result,
      "Assign the result of screen.findByText() to a constant named h2Element"
    ).toBe(true);
  });

  test("Jest expect should be used @6.1", () => {
    const includesExpect = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression Identifier[name="expect"]'
    );

    expect(
      includesExpect,
      "Make sure you are using Jest's expect function to make an assertion"
    ).toBe(true);
  });

  test("Jest expect should be used with h2Element @6.1", () => {
    const includesExpect = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression Identifier[name="expect"] '
    );

    const includesH2Element = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression Identifier[name="h2Element"]'
    );

    const result = includesExpect && includesH2Element;

    expect(
      result,
      "Make sure you are passing h2Element as an argument to Jest's expect function to make an assertion"
    ).toBe(true);
  });

  test("toBeInTheDocument() should be called @6.1", () => {
    const includesToBeInTheDocument = includes(
      astTs,
      'ArrowFunction:has(AsyncKeyword) Block CallExpression Identifier[name="toBeInTheDocument"]'
    );
    expect(
      includesToBeInTheDocument,
      "Make sure you are calling toBeInTheDocument() to assert that an element is in the document"
    ).toBe(true);
  });
});

test("Jest expect should be used with h2Element and toBeInTheDocument @6.1", () => {
  const includesExpect = includes(
    astTs,
    'ArrowFunction:has(AsyncKeyword) Block PropertyAccessExpression CallExpression Identifier[name="expect"] '
  );

  const includesH2Element = includes(
    astTs,
    'ArrowFunction:has(AsyncKeyword) Block PropertyAccessExpression CallExpression Identifier[name="h2Element"]'
  );

  const includesToBeInTheDocument = includes(
    astTs,
    'ArrowFunction:has(AsyncKeyword) Block CallExpression Identifier[name="toBeInTheDocument"]'
  );

  const result =
    includesExpect && includesH2Element && includesToBeInTheDocument;

  expect(
    result,
    "This is what your assertion should look like: expect(h2Element).toBeInTheDocument();"
  ).toBe(true);
});

// ./task-runner.sh src/tests/testing-library@6.1.test.tsx
