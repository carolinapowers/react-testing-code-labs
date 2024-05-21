import { ast, includes } from "@phenomnomnominal/tsquery";
import { readFile } from "./helpers";

const file = readFile("src/__tests__/app.spec.tsx");
const astTs = ast(file, "tsx");

// npm run -s task -- src/tests/testing-library@5.1.test.tsx
describe("Queries", () => {
  test("testing block should exist @5.1", () => {
    const hasTestFunction = includes(astTs, 'Identifier[name="test"]');
    const hasItFunction = includes(astTs, 'Identifier[name="it"]');

    const requiredFunction = hasTestFunction || hasItFunction;
    expect(requiredFunction, "You are missing a test block.").toBe(true);
  });

  test("render function should exist @5.1", () => {
    const hasTestFunction = includes(astTs, 'Identifier[name="render"]');
    expect(
      hasTestFunction,
      "It looks like you're forgetting to import the render function from React Testing Library"
    ).toBe(true);
  });

  test("render App should be used @5.1", () => {
    const includesRender = includes(
      astTs,
      'Block CallExpression Identifier[name="render"]'
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

  test("screen.queryByText is being used @5.2", () => {
    const includesScreen = includes(
      astTs,
      'Block CallExpression Identifier[name="screen"]'
    );
    const includesGetByText = includes(
      astTs,
      'Block CallExpression Identifier[name="queryByText"]'
    );

    const result = includesScreen && includesGetByText;
    expect(
      result,
      'Use React Testing Library screen.queryByText() to find the h2 element with a text of "React Testing Library Best Practices"'
    ).toBe(true);
  });

  test("screen.queryByText is assigned to const h2Element @5.2", () => {
    const includesScreen = includes(
      astTs,
      'Block CallExpression Identifier[name="screen"]'
    );
    const includesQueryByText = includes(
      astTs,
      'Block CallExpression Identifier[name="queryByText"]'
    );
    const includesH2Element = includes(
      astTs,
      'Block VariableStatement VariableDeclarationList Identifier[name="h2Element"]'
    );

    const result = includesScreen && includesQueryByText && includesH2Element;
    expect(
      result,
      "Assign the result of screen.queryByText() to a constant named h2Element"
    ).toBe(true);
  });

  test("Jest expect should be used @5.2", () => {
    const includesExpect = includes(
      astTs,
      'Block CallExpression Identifier[name="expect"]'
    );

    expect(
      includesExpect,
      "Make sure you are using Jest's expect function to make an assertion"
    ).toBe(true);
  });

  test("Jest expect should be used with h2Element @5.2", () => {
    const includesExpect = includes(
      astTs,
      'Block CallExpression Identifier[name="expect"] '
    );

    const includesH2Element = includes(
      astTs,
      'Block CallExpression Identifier[name="h2Element"]'
    );

    const result = includesExpect && includesH2Element;

    expect(
      result,
      "Make sure you are passing h2Element as an argument to Jest's expect function to make an assertion"
    ).toBe(true);
  });

  test("toBeInTheDocument() should be called @5.2", () => {
    const includesToBeInTheDocument = includes(
      astTs,
      'Block CallExpression Identifier[name="toBeInTheDocument"]'
    );
    expect(
      includesToBeInTheDocument,
      "Make sure you are calling toBeInTheDocument() to assert that an element is in the document"
    ).toBe(true);
  });

  test("Jest expect should be used with h2Element and not toBeInTheDocument @5.2", () => {
    const includesExpect = includes(
      astTs,
      'Block PropertyAccessExpression CallExpression Identifier[name="expect"] '
    );
    const includesH2Element = includes(
      astTs,
      'Block PropertyAccessExpression CallExpression Identifier[name="h2Element"]'
    );

    const includesNot = includes(
      astTs,
      'Block CallExpression PropertyAccessExpression PropertyAccessExpression Identifier[name="not"]'
    );

    const result = includesExpect && includesH2Element && includesNot;

    expect(
      result,
      "Make sure you are asserting that the h2Element is NOT in the document with expect(h2Element).not.toBeInTheDocument();"
    ).toBe(true);
  });

  test("Jest expect should be used with h2Element and toBeInTheDocument @5.2", () => {
    const includesExpect = includes(
      astTs,
      'Block PropertyAccessExpression CallExpression Identifier[name="expect"] '
    );

    const includesH2Element = includes(
      astTs,
      'Block PropertyAccessExpression CallExpression Identifier[name="h2Element"]'
    );

    const includesToBeInTheDocument = includes(
      astTs,
      'Block CallExpression Identifier[name="toBeInTheDocument"]'
    );

    const result =
      includesExpect && includesH2Element && includesToBeInTheDocument;

    expect(
      result,
      "This is what your assertion should look like: expect(h2Element).not.toBeInTheDocument();"
    ).toBe(true);
  });
});

// add test to check Jest expect should be used with h2Element and not toBeInTheDocument @5.2

// ./task-runner.sh src/tests/testing-library@5.1.test.tsx

// ./task-runner.sh src/tests/testing-library@5.1.test.tsx @5.1
// ./task-runner.sh src/tests/testing-library@5.1.test.tsx @5.2
