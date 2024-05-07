import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../app';

// run `npm run -s task -- src/tests/task-1.test.tsx`
// to see the custom output of the test
// test('failure example @1-1', () => {
//   render(<App/>);
//   const linkElement = screen.queryByText(/learn react/i);
//   expect(linkElement).not.toBeInTheDocument();
// });

test('learn react link should render correctly', () => {
  render(<App/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

