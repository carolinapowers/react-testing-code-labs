import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../app';

test('renders learn react link with mint @1-2', () => {
  render(<App />);
  const linkElement = screen.queryByText(/learn react/i);
  expect(linkElement, "My not so great message").not.toBeInTheDocument();
});

