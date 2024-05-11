import { ast, includes } from "@phenomnomnominal/tsquery";
import { readFile } from "./helpers";

const file = readFile("src/__tests__/app.spec.tsx");
const astTs = ast(file, "tsx");

// npm run -s task -- src/tests/testing-library@3.2.test.tsx
describe("React Testing Library", () => {
  test("screen.getByText is being used @3.2", () => {
    const includesScreen = includes(
      astTs,
      'Block CallExpression Identifier[name="screen"]'
    );
    const includesGetByText = includes(
      astTs,
      'Block CallExpression Identifier[name="getByText"]'
    );

    const result = includesScreen && includesGetByText;
    expect(
      result,
      'Use React Testing Library screen.getByText() to find the link element with a text of "Learn Best Practices"'
    ).toBe(true);
  });

  test("screen.getByText is being called with 'Learn best practices' @3.2", () => {
    const includesScreen = includes(
      astTs,
      'Block CallExpression Identifier[name="screen"]'
    );
    const includesGetByText = includes(
      astTs,
      'Block CallExpression Identifier[name="getByText"]'
    );
    const includesString = includes(
      astTs,
      'Block CallExpression StringLiteral[value="Learn Best Practices"]'
    );
    const result = includesScreen && includesGetByText && includesString;
    expect(
      result,
      'Make sure you are calling screen.getByText() with the string "Learn Best Practices"'
    ).toBe(true);
  });

  test("screen.getByText is assigned to const linkElement @3.2", () => {
    const includesScreen = includes(
      astTs,
      'Block CallExpression Identifier[name="screen"]'
    );
    const includesGetByText = includes(
      astTs,
      'Block CallExpression Identifier[name="getByText"]'
    );
    const includesLinkElement = includes(
      astTs,
      'Block VariableStatement VariableDeclarationList Identifier[name="linkElement"]'
    );

    const result = includesScreen && includesGetByText && includesLinkElement;
    expect(
      result,
      "Assign the result of screen.getByText() to a constant named linkElement"
    ).toBe(true);
  });

  test("Jest expect should be used @3.2", () => {
    const includesExpect = includes(
      astTs,
      'Block CallExpression Identifier[name="expect"]'
    );

    expect(
      includesExpect,
      "Make sure you are using Jest's expect function to make an assertion"
    ).toBe(true);
  });

  test("Jest expect should be used with linkElement @3.2", () => {
    const includesExpect = includes(
      astTs,
      'Block CallExpression Identifier[name="expect"] '
    );

    const includesLinkElement = includes(
      astTs,
      'Block CallExpression Identifier[name="linkElement"]'
    );

    const result = includesExpect && includesLinkElement;

    expect(
      result,
      "Make sure you are passing linkElement as an argument to Jest's expect function to make an assertion"
    ).toBe(true);
  });

  test("toBeInTheDocument() should be called @3.2", () => {
    const includesToBeInTheDocument = includes(
      astTs,
      'Block CallExpression Identifier[name="toBeInTheDocument"]'
    );
    expect(
      includesToBeInTheDocument,
      "Make sure you are calling toBeInTheDocument() to assert that an element is in the document"
    ).toBe(true);
  });
});

test("Jest expect should be used with linkElement and toBeInTheDocument @3.2", () => {
  const includesExpect = includes(
    astTs,
    'Block PropertyAccessExpression CallExpression Identifier[name="expect"] '
  );

  const includesLinkElement = includes(
    astTs,
    'Block PropertyAccessExpression CallExpression Identifier[name="linkElement"]'
  );

  const includesToBeInTheDocument = includes(
    astTs,
    'Block CallExpression Identifier[name="toBeInTheDocument"]'
  );

  const result =
    includesExpect && includesLinkElement && includesToBeInTheDocument;

  expect(
    result,
    "This is what your assertion should look like: expect(linkElement).toBeInTheDocument();"
  ).toBe(true);
});

// ./task-runner.sh src/tests/testing-library@3.2.test.tsx
