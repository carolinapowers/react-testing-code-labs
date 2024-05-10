import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../app";

// run `npm run -s task -- src/tests/task-1.test.tsx`
// to see the custom output of the test
// test('failure example @1-1', () => {
//   render(<App/>);
//   const linkElement = screen.queryByText(/learn react/i);
//   expect(linkElement).not.toBeInTheDocument();
// });

// test("learn react link should render correctly", () => {
//   render(<App />);
//   const linkElement = screen.getByLabel("Learn Best Practices");
//   expect(linkElement).toBeInTheDocument();
// });

test("hello world", function () {
  render(<App />);
  const linkElement = screen.getByRole("link", {
    name: "Learn Best Practices",
  });
  expect(linkElement).toBeInTheDocument();
});

test("h2 element should not be in the document", () => {
  render(<App />);
  const h2Element = screen.queryByText("React Testing Library Best Practices");
  expect(h2Element).not.toBeInTheDocument();
});
