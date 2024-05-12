import React from "react";

export const BestPractices: React.FC = () => {
  return (
    <div className="app-main">
      <h2>React Testing Library Best Practices</h2>
      <h3>Queries:</h3>
      <ul>
        <li>
          Use <code>getbyRole()</code> if your component doesn't need to wait on
          anything to be loaded. Also, <code>getByRole()</code> throws helpful
          errors that you might not see with the other options.
        </li>
        <li>
          Use <code>queryByRole()</code> when testing some element that is not
          in the document as <code>queryByRole()</code> won't error if the
          element isn't found.
        </li>
        <li>
          Use await <code>findByRole()</code> when waiting for an element to be
          found, when possible.
        </li>
      </ul>
      <h3>Async Testing:</h3>
      <ul>
        <li>
          Use <code>waitFor()</code> method to wait for your component to be
          rendered when mocking an API call and not testing any side effect.
        </li>
        <li>
          Understand the library's async Methods - <code>findBy</code>,{" "}
          <code>waitFor</code> and
          <code>waitForElementToBeRemoved</code> in the library{" "}
          <a href="https://testing-library.com/docs/dom-testing-library/api-async">
            here
          </a>
          .
        </li>
      </ul>
      <h3>User Events:</h3>
      <ul>
        <li>
          Use <code>@testing-library/user-event</code> over{" "}
          <code>fireEvent</code> <strong>when possible.</strong>
        </li>
      </ul>
      <h3>Debugging:</h3>
      <ul>
        <li>
          Use <code>screen.logTestingPlaygroundURL()</code> or{" "}
          <code>screen.debug()</code> to check that your component is truly
          being rendered.
        </li>
        <li>
          Be aware that <code>logTestingPlaygroundURL()</code> might output an
          URL that doesn't render anything if your component is too big. Keeping
          your components small not also helps with the readability but it helps
          when debugging your tests.
        </li>
        <li>
          When using <code>screen.debug()</code>, the DOM tree returned by the
          function limits the number of characters to render and it might not
          show the entire component. If you need to check things out further in
          the tree you can use something like{" "}
          <code>screen.debug(undefined, 30000)</code>.
        </li>
      </ul>
      <h3>Act and waitFor:</h3>
      <ul>
        <li>
          Do <strong>not</strong> use <code>act()</code> and{" "}
          <code>waitFor()</code> for the sake of getting rid of the{" "}
          <code>act()</code> warnings thrown by the library as the poor usage of
          both can cause false positives. Read more on when to use what in the
          resources below.
        </li>
        <li>
          Read more about when to use act() in the library{" "}
          <a href="https://plainenglish.io/blog/you-probably-dont-need-act-in-your-react-tests-2a0bcd2ad65c">
            here
          </a>
          .
        </li>

        <li>
          More on the <code>act()</code> and <code>waitFor()</code> methods in
          the library in{" "}
          <a href="https://medium.com/@AbbasPlusPlus/act-and-waitfor-react-testing-library-dba78bb57e30">
            here
          </a>
          .
        </li>
        <li>
          For more on cases of manually calling <code>act()</code> and when to
          use it in{" "}
          <a href="https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning#other-use-cases-for-manually-calling-act()">
            this
          </a>{" "}
          article, by Kent Dodds, the creator of React Testing Library.
        </li>
      </ul>
    </div>
  );
};
