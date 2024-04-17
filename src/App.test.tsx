import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link @1-1', () => {
  render(<App />);
  const linkElement = screen.queryByText(/learn react/i);
  expect(linkElement, "My great message").not.toBeInTheDocument();
});
