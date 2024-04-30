
import { ast, includes } from '@phenomnomnominal/tsquery';
import { readFile } from "./helpers";

describe("Task 1 Tests", () => {
  const file = readFile("src/__tests__/app.spec.tsx"); 
  const astTs = ast(file, "tsx");

  test('testing block should exist - task @1.1', () => {
    const hasTestFunction = includes(astTs, 'Identifier[name="test"]');
    expect(hasTestFunction, "You are missing a `test` block. React Test Library also allows `it` blocks however the instruction given asks for a `test` block").toBe(true);
  });

  test('render function should exist - task @1.2', () => {
    const hasTestFunction = includes(astTs, 'Identifier[name="render"]');
    expect(hasTestFunction, "It looks like you're forgetting to import the `render` function from React Testing Library").toBe(true);
  });

  test('render App should be used - task @1.3', () => {
    const includesRender = includes(astTs, 'Block CallExpression Identifier[name="render"]');
    const includesApp= includes(astTs, 'Block CallExpression Identifier[name="App"]');
    
    const result = includesRender && includesApp;
    expect(result, "Make sure you are rendering the <App/> component with `render(<App/>`").toBe(true);
  });

  test('screen.getByText is being used - task 1.4', () => {
    const includesScreen = includes(astTs, 'Block CallExpression Identifier[name="screen"]');
    const includesGetByText= includes(astTs, 'Block CallExpression Identifier[name="getByText"]');
    
    const result = includesScreen && includesGetByText;
    expect(result, "Use React Testing Library `screen.getByText` to find the `link` element with a text of Learn React").toBe(true);
  });
});

