// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// import 'jest-expect-message';

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom';

// Modify expect() to accept a message.
//
// Pair with the following ESLint settings:
//
// "eslintConfig": {
//   "rules": {
//     "jest/valid-expect": {
//       "minArgs": 2,
//       "maxArgs": 2
//     }
//   }
// },
//
// Taken and modified from from:
//   https://github.com/mattphillips/jest-expect-message/blob/2efcc40/src/withMessage.js
// MIT Licensed

class JestAssertionError extends Error {
  constructor(result, callsite) {
    super(result.message());
    this.matcherResult = result;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, callsite);
    }
  }
}

const wrapMatcher = (matcher, customMessage) => {
  const newMatcher = (...args) => {
    try {
      return matcher(...args);
    } catch (error) {
      if (!error.matcherResult) {
        throw error;
      }
      const { matcherResult } = error;

      if (typeof customMessage !== 'string' || customMessage.length < 1) {
        throw new JestAssertionError(matcherResult, newMatcher);
      }

      const message = () => customMessage;

      throw new JestAssertionError({ ...matcherResult, message }, newMatcher);
    }
  };
  return newMatcher;
};

const wrapMatchers = (matchers, customMessage) => {
  return Object.keys(matchers).reduce((acc, name) => {
    const matcher = matchers[name];

    if (typeof matcher === 'function') {
      return {
        ...acc,
        [name]: wrapMatcher(matcher, customMessage)
      };
    }

    return {
      ...acc,
      [name]: wrapMatchers(matcher, customMessage) // recurse on .not/.resolves/.rejects
    };
  }, {});
};

const withMessage = (expect) => {
  // proxy the expect function
  let expectProxy = Object.assign(
    (actual, customMessage) => wrapMatchers(expect(actual), customMessage), // partially apply expect to get all matchers and chain them
    expect // clone additional properties on expect
  );

  expectProxy.extend = o => {
    expect.extend(o); // add new matchers to expect
    expectProxy = Object.assign(expectProxy, expect); // clone new asymmetric matchers
  };

  return expectProxy;
};

global.expect = withMessage(global.expect);

