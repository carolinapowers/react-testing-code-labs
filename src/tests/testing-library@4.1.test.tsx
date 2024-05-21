import { ast, includes } from "@phenomnomnominal/tsquery";
import { readFile } from "./helpers";

const file = readFile("src/__tests__/app.spec.tsx");
const astTs = ast(file, "tsx");

// npm run -s task -- src/tests/testing-library@4.1.test.tsx
describe("Guiding Principles", () => {
  test("screen.getByText is not present @4.1", () => {
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
      "Make sure you are replacing screen.getByText() with screen.getByRole()"
    ).toBe(false);
  });

  test("screen.getByRole is present @4.1", () => {
    const includesScreen = includes(
      astTs,
      'Block CallExpression Identifier[name="screen"]'
    );
    const includesGetByRole = includes(
      astTs,
      'Block CallExpression Identifier[name="getByRole"]'
    );

    const result = includesScreen && includesGetByRole;
    expect(
      result,
      "Make sure you are replacing screen.getByText() with screen.getByRole()"
    ).toBe(true);
  });

  test("screen.getByRole has a link argument @4.1", () => {
    const includesScreen = includes(
      astTs,
      'Block CallExpression Identifier[name="screen"]'
    );
    const includesGetByRole = includes(
      astTs,
      'Block CallExpression Identifier[name="getByRole"]'
    );

    const includesLink = includes(
      astTs,
      'Block CallExpression StringLiteral[value="link"]'
    );

    const result = includesScreen && includesGetByRole && includesLink;
    expect(
      result,
      'Make sure you are passing "link" as the first argument of the screen.getByRole() function'
    ).toBe(true);
  });

  test("screen.getByRole has an object as the second argument @4.1", () => {
    const includesScreen = includes(
      astTs,
      'Block CallExpression Identifier[name="screen"]'
    );
    const includesGetByRole = includes(
      astTs,
      'Block CallExpression Identifier[name="getByRole"]'
    );

    const includesObjectLiteral = includes(
      astTs,
      "Block CallExpression ObjectLiteralExpression"
    );

    const result = includesScreen && includesGetByRole && includesObjectLiteral;
    expect(
      result,
      "Make sure you are passing an object as the second argument of the screen.getByRole() function"
    ).toBe(true);
  });

  test("screen.getByRole has an object as the second argument with a name key @4.1", () => {
    const includesScreen = includes(
      astTs,
      'Block CallExpression Identifier[name="screen"]'
    );
    const includesGetByRole = includes(
      astTs,
      'Block CallExpression Identifier[name="getByRole"]'
    );

    const includesObjectLiteralWithName = includes(
      astTs,
      "Block CallExpression ObjectLiteralExpression  Identifier[name='name']"
    );

    const result =
      includesScreen && includesGetByRole && includesObjectLiteralWithName;
    expect(
      result,
      "Make sure you are passing an object with a name key as the second argument of the screen.getByRole() function"
    ).toBe(true);
  });

  test("screen.getByRole has an object as the second argument with a name key with Learn Best Practices as its value @4.1", () => {
    const includesScreen = includes(
      astTs,
      'Block CallExpression Identifier[name="screen"]'
    );
    const includesGetByRole = includes(
      astTs,
      'Block CallExpression Identifier[name="getByRole"]'
    );

    const includesObjectLiteralWithName = includes(
      astTs,
      "Block CallExpression ObjectLiteralExpression StringLiteral[value='Learn Best Practices']"
    );

    const result =
      includesScreen && includesGetByRole && includesObjectLiteralWithName;
    expect(
      result,
      'Make sure you are passing "Learn Best Practices" as the value of the name key in the second argument of the screen.getByRole() function'
    ).toBe(true);
  });

  test("screen.getByText is assigned to const linkElement @4.1", () => {
    const includesScreen = includes(
      astTs,
      'Block CallExpression Identifier[name="screen"]'
    );
    const includesGetByText = includes(
      astTs,
      'Block CallExpression Identifier[name="getByRole"]'
    );
    const includesLinkElement = includes(
      astTs,
      'Block VariableStatement VariableDeclarationList Identifier[name="linkElement"]'
    );

    const result = includesScreen && includesGetByText && includesLinkElement;
    expect(
      result,
      "Assign the result of screen.getByRole() to a constant named linkElement"
    ).toBe(true);
  });
});

// ./task-runner.sh src/tests/testing-library@4.1.test.tsx
