import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../app";
import { SeeMoreButton } from "../button";

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

// test("hello world", function () {
//   render(<App />);
//   const linkElement = screen.getByRole("link", {
//     name: "Learn Best Practices",
//   });
//   expect(linkElement).toBeInTheDocument();
// });

test("h2 element should not be in the document", () => {
  render(<App />);
  const h2Element = screen.queryByText("React Testing Library Best Practices");
  expect(h2Element).not.toBeInTheDocument();
});

//switch to the test below to adhere to best practices
// test("h2 element should not be in the document", () => {
//   render(<App />);
//   const h2Element = screen.queryByRole("heading", {
//     name: "React Testing Library Best Practices",
//   });
//   expect(h2Element).not.toBeInTheDocument();
// });

test("calls onClick prop when clicked", async () => {
  const handleClick = jest.fn();

  render(<SeeMoreButton handleClick={handleClick} />);

  userEvent.click(screen.getByRole("button", { name: "See more" }));

  expect(handleClick).toHaveBeenCalledTimes(1);

  handleClick.mockRestore();
});

test("h2 element should be in the document", async () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: "See more" }));

  const h2Element = await screen.findByText(
    "React Testing Library Best Practices"
  );

  expect(h2Element).toBeInTheDocument();
});
