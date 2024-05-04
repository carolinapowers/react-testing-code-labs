import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../app';

// run `npm run -s task -- src/tests/task-1.test.tsx`
// to see the custom output of the test
// it('failure example @1-1', () => {
//   render(<App/>);
//   const linkElement = screen.queryByText(/learn react/i);
//   expect(linkElement).not.toBeInTheDocument();
// });

test('successful example @1-2', () => {
  render(<App/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

