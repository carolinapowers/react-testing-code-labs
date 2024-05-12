import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "../app";

it("matches name pattern correctly", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
