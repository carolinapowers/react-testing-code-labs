
import * as espree from "espree";

import { readFile } from "../test-utils/helpers";



test('task @1.1.1', () => {
  const file = readFile("src/App.test.tsx"); 

  const ast = espree.parse(file, {sourceType: "module", ecmaVersion: 2015, ecmaFeatures: {jsx: true}});

  console.log(ast);
  // render(<App />);
  // const linkElement = screen.queryByText(/learn react/i);
  // expect(linkElement, "My great message").not.toBeInTheDocument();
});

