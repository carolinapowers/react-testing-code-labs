import { ast, includes } from "@phenomnomnominal/tsquery";
import { readFile } from "./helpers";

const file = readFile("src/__tests__/app.spec.tsx");
const astTs = ast(file, "tsx");

// npm run -s task -- src/tests/testing-library@1.test.tsx
describe("React Testing Library @3.1", () => {
  test("testing block should exist", () => {
    const hasTestFunction = includes(astTs, 'Identifier[name="test"]');
    const hasItFunction = includes(astTs, 'Identifier[name="it"]');

    const requiredFunction = hasTestFunction || hasItFunction;
    expect(requiredFunction, "You are missing a `test` block.").toBe(true);
  });

  test("render function should exist", () => {
    const hasTestFunction = includes(astTs, 'Identifier[name="render"]');
    expect(
      hasTestFunction,
      "It looks like you're forgetting to import the `render` function from React Testing Library"
    ).toBe(true);
  });

  test("render App should be used", () => {
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
      "Make sure you are rendering the <App/> component with `render(<App/>`"
    ).toBe(true);
  });

  test("screen.getByText is being used", () => {
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
      "Use React Testing Library `screen.getByText` to find the `link` element with a text of Learn React"
    ).toBe(true);
  });
});

// ./task-runner.sh src/tests/testing-library@1.test.tsx
