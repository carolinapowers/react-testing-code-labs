import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link with mint @1-2', () => {
  render(<App />);
  const linkElement = screen.queryByText(/learn react/i);
  expect(linkElement, "My not so great message").not.toBeInTheDocument();
});


// import { fireEvent, render, waitFor } from '@testing-library/react';
// import React from 'react';
// import { Images } from '../components/Images';
// import css from '../components/Images.module.css';

// describe('Task 1', () => {
//   it('should render something @1-1', () => {
//     try {
//       render(<Images images={ ['example.jpg'] } />);
//     } catch (error) {
//       // eslint-disable-next-line jest/no-conditional-expect
//       expect(false, 'The Images component should return JSX to render').toBe(true);
//     }
//   });

//   it('should render a div @1-2', () => {
//     const result = render(<Images images={ ['example.jpg'] } />);

//     expect(
//       result.container.firstChild.nodeName.toLowerCase(),
//       'The outer element rendered by the Images component should be a `div`'
//     ).toBe('div');
//   });

//   it('should render an img @1-3', () => {
//     const result = render(<Images images={ ['example.jpg'] } />);

//     expect(
//       result.container.querySelectorAll('img').length > 0,
//       'An inner element rendered by the Images component should be an `img`'
//     ).toBe(true);
//   });

//   it('should render with the first image `src` @1-4', () => {
//     const result = render(<Images images={ ['example.jpg'] } />);
//     expect(
//       result.container.querySelectorAll('img[src="example.jpg"]').length > 0,
//       'On first render, the component should use the first `images` element as the image source, check your `src` attribute'
//     ).toBe(true);
//   });

//   it('should provide an `alt` attribute @1-5', () => {
//     const result = render(<Images images={ ['example.jpg'] } />);
//     const image = result.container.querySelector('img[src="example.jpg"]');

//     expect(
//       image !== null,
//       'On first render, the component should use the first `images` element as the image source'
//     ).toBe(true);

//     expect(
//       image.getAttribute('alt').toLowerCase() === 'product 1',
//       'On first render, the image should have an `alt` attribute "Product 1"'
//     ).toBe(true);
//   });

//   it('should have the right CSS class @1-6', () => {
//     const result = render(<Images images={ ['example.jpg'] } />);

//     expect(
//       result.container.firstChild.getAttribute('class') === css.images,
//       'Style the container `div` using the `images` class from the imported CSS'
//     ).toBe(true);
//   });
// });

// describe('Task 2', () => {
//   let result;

//   beforeEach(() => {
//     result = render(<Images images={ ['1.jpg', '2.jpg', '3.jpg'] } />)
//   });

//   it('should render with the first image `src` @2-1', () => {
//     expect(
//       result.container.querySelectorAll('img[src="1.jpg"]').length > 0,
//       'On first render, the component should use the first `images` element as the image source'
//     ).toBe(true);
//   });

//   it('should render a next button @2-2', () => {
//     const buttons = result.container.querySelectorAll('button');

//     expect(
//       buttons.length > 0,
//       'On first render, a single button (Next) should be visible'
//     ).toBe(true);
//   });
 
//   it('should not render a previous button @2-3', () => {
//     const buttons = result.container.querySelectorAll('button');

//     expect(
//       buttons.length < 2,
//       'On first render, the Previous button should not be visible'
//     ).toBe(true);
//   });

//   it('should proceed to the next image @2-4', async () => {
//     const nextButton = result.container.querySelector('button');

//     fireEvent.click(nextButton);

//     await waitFor(() => expect(
//       result.container.querySelectorAll('img[src="2.jpg"]').length > 0,
//       'After pressing the Next button, the second image source should be rendered'
//     ).toBe(true));
//   });

//   it('should render both buttons @2-5', async () => {
//     const nextButton = result.container.querySelector('button');

//     fireEvent.click(nextButton);

//     await waitFor(() => expect(
//       result.container.querySelectorAll('button').length === 2,
//       'After pressing the Next button, the Previous button should appear'
//     ).toBe(true));
//   });

//   it('should hide the next button @2-6', async () => {
//     const nextButton = result.container.querySelector('button');

//     fireEvent.click(nextButton);
//     fireEvent.click(nextButton);

//     await waitFor(() => expect(
//       result.container.querySelectorAll('button').length === 1,
//       'When viewing the final image, the Next button should disappear'
//     ).toBe(true));
//   });

//   it('should regress to the previous image @2-7', async () => {
//     const nextButton = result.container.querySelector('button');

//     fireEvent.click(nextButton);
//     fireEvent.click(nextButton);

//     await waitFor(() => result.container.querySelectorAll('button').length === 1);
//     const previousButton = result.container.querySelector('button');

//     fireEvent.click(previousButton);

//     await waitFor(() => expect(
//       result.container.querySelectorAll('img[src="2.jpg"]').length > 0,
//       'After pressing the Previous button, the previous image source\nshould be rendered'
//     ).toBe(true));
//   });

//   it('should have the right CSS class on the next button @2-8', () => {
//     const nextButton = result.container.querySelector('button');

//     expect(
//       nextButton.getAttribute('class') === css.nextButton,
//       'Style the Next button using the `nextButton` class\nfrom the imported CSS'
//     ).toBe(true);
//   });

//   it('should have the right CSS class for the previous button @2-9', async () => {
//     const nextButton = result.container.querySelector('button');

//     fireEvent.click(nextButton);
//     await waitFor(() => result.container.querySelectorAll('button').length === 2);

//     await waitFor(() => expect(
//       result.container.querySelectorAll(`button[class="${css.previousButton}"]`).length > 0,
//       'Style the Previous button using the `previousButton` class\nfrom the imported CSS'
//     ).toBe(true));
//   });
// });

// describe('Task 3', () => {
//   let result;
//   let spy = jest.fn();

//   beforeEach(() => {
//     // Taken from https://stackoverflow.com/a/49204336/4250566.
//     Object.defineProperty(global.Image.prototype, 'src', {
//       set(src) {
//         setTimeout(() => spy(src));
//       },
//     });

//     result = render(<Images images={ ['1.jpg', '2.jpg', '3.jpg'] } />)
//   });

//   it('should preload the second image immediately @3-1', async () => {
//     await waitFor(() => expect(
//       spy.mock.calls.filter((call) => call.length > 0 && call[0] === '2.jpg').length > 0,
//       'On first render, the effect should preload the second image'
//     ).toBe(true));
//   });

//   it('should preload the third image on click @3-2', async () => {
//     const nextButton = result.container.querySelector('button');

//     fireEvent.click(nextButton);

//     await waitFor(() => expect(
//       spy.mock.calls.filter((call) => call.length > 0 && call[0] === '3.jpg').length > 0,
//       'When viewing the second image, the effect should preload the third image'
//     ).toBe(true));
//   });
// });
