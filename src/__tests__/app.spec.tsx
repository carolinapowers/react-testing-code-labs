import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../app";
import { SeeMoreButton } from "../button";

test("renders link with learn best practices text - tasks @3.1 and @3.2", () => {
  render(<App />);

  const linkElement = screen.getByText("Learn Best Practices");

  expect(linkElement).toBeInTheDocument();
});

test("gets link by Role - task @4.1", function () {
  render(<App />);

  const linkElement = screen.getByRole("link", {
    name: "Learn Best Practices",
  });

  expect(linkElement).toBeInTheDocument();
});

test("h2 element should not be in the document - task @5.1", () => {
  render(<App />);

  const h2Element = screen.queryByText("React Testing Library Best Practices");

  expect(h2Element).not.toBeInTheDocument();
});

test("h2 element should be in the document - task @6.1", async () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: "See more" }));

  const h2Element = await screen.findByText(
    "React Testing Library Best Practices"
  );

  expect(h2Element).toBeInTheDocument();
});

test("calls handleClick when 'See more' button is clicked - tasks @6.2 and @6.3", () => {
  const handleClick = jest.fn();

  render(<SeeMoreButton handleClick={handleClick} />);

  userEvent.click(screen.getByRole("button", { name: "See more" }));

  expect(handleClick).toHaveBeenCalledTimes(1);

  handleClick.mockRestore();
});
