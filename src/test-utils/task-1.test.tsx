
import { ast, includes } from '@phenomnomnominal/tsquery';
import { readFile } from "../test-utils/helpers";


test('task @1.1.1', () => {
  const file = readFile("src/App.test.tsx"); 

  const astTs = ast(file, "tsx");

  const hasItFunction = includes(astTs, 'Identifier[name="it"]');
  expect(hasItFunction, "React Test Library also allows for `it` blocks however the instruction given asks for a `test` block").toBe(true);

  // const hasTestFunction = includes(astTs, 'Identifier[name="test"]');
  // expect(hasTestFunction).toBe(true);

  // const nodes = query(astTs, 'Identifier[name="test"]');
  // expect(nodes.length).toBe(1);
  // console.log('Nodes:', nodes);
});

