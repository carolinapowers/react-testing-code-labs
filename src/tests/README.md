# Client Tests Guide

For an overview on how to test React 18 applications with Jest and React Testing Library check out this [Pluralsight Course](https://app.pluralsight.com/library/courses/react-18-testing/table-of-contents).

## Avoid Memory Leaks

### Possible Memory Leak Causes

- Global Variables - global mocks, global objects.

- Timeouts - not accounting for `setTimeout()` application code in tests.

- Reference to the same object without clearing it - not clearing and reseting mocks and Jest timers.

## React Testing Library on Timers

- According to the React Testing Library documents, in some cases, when application code uses timers (setTimeout, setInterval, clearTimeout, clearInterval), tests may become unpredictable, slow and flaky. So, it might be a good a idea to use fake timers.

- Read more on using fake timers to avoid this issue [here](https://testing-library.com/docs/using-fake-timers/).

## React Testing Library Guiding Principles

Quick read on [React Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles/).

## Common Mistakes with React Testing Library

[This article](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) is an **important** read on common mistakes with React Testing Library, written by its creator, Kent Dodds.

## React Testing Library Best Practices

- Check that your component is truly being rendered with `logTestingPlaygroundURL()` or `screen.debug()`.

- Be aware that `logTestingPlaygroundURL()` might output an URL that doesn't render anything if your component is too big, like the `ListPage` component when rendering the three modals with it. You can comment out the modals and you should be able to get a good URL.

- When using `screen.debug()`, the DOM tree returned by the function is limited and it might not show the entire component. If you need to check things out further in the tree you can use something like `screen.debug(undefined, 30000)`.

- Use `@testing-library/user-event` over `fireEvent` where possible. We have some good use cases for using this library that are explained later in this document.

- Use `getbyRole()` if your component doesn't need to wait on anything to be loaded. Also, `getByRole()` throws helpful errors that you migt not see if the other options.

- Use `queryByRole()` when testing if some element is not in the document as `queryByRole()` won't error if element isn't found.

- Use await `findByRole()` when waiting for an element to be found, when possible.

- Use `waitFor()` to wait for your component to be rendered when mocking an API call and not testing any side effect.

- If side effect events will be tested, use the `waitLoadingToFinish()` custom helper, added to our render.tsx file, to wait for component to finish loading.

- Do **not** use `act()` and `waitFor()` for the sake of getting rid of the `act()` warnings thrown by the library as the poor usage of both can cause false positives. Read more on when to use what in the resources below.

- Understand [when to use act() on your tests](https://plainenglish.io/blog/you-probably-dont-need-act-in-your-react-tests-2a0bcd2ad65c).

- Understand the library's [async Methods - `findBy`, `waitFor` and `waitForElementToBeRemoved`](https://testing-library.com/docs/dom-testing-library/api-async).

- More on [Act and waitFor - React Testing Library](https://medium.com/@AbbasPlusPlus/act-and-waitfor-react-testing-library-dba78bb57e30).

- We have cases when the use of `act()` is inevitable, to understand what those cases are and what to do to, read more on it [here](https://plainenglish.io/blog/you-probably-dont-need-act-in-your-react-tests-2a0bcd2ad65c#are-there-cases-when-using-act-is-inevitable).

- For more on [Cases of manually calling act()](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning#other-use-cases-for-manually-calling-act), by Kent Dodds, the creator of React Testing Library.

## Testing Library User Event

- It is recommended by React Testing Library to use [Testing Library User Event](https://testing-library.com/docs/user-event/intro) whenever possible.

- `userEvent()` allows you to describe a user interaction instead of the concrete event. It allows you to check for more things beyond `fireEvent()` allows you to do. An example would be the user's interaction with a `<select>` HTML element where the user has to click on it first and then click on a `<option>` elemement to select an option.

- This library allows you the `setup()` your instance of "user-event" to adapt to the different user interactions with the browser. Read more about it [here](https://testing-library.com/docs/user-event/setup).

- We are currently using the `setup()` method in a very helpful way in our `AuthorFilterDialog` componen, where a user will enter characters into an `input` box that will call our API after a `setTimeout`. Since our `setTimeout` will generate an update to the component that is outside of the React Testing Library render lifecycle, we need to make sure to run `jest.faketimers`. In our test we could have the user clicking and then running `jest.runAllTimers()` after the `fireEvent.click()` or `userEvent.click()`, but we can also do the following at the top of the file:

```
const user = userEvent.setup({
    advanceTimers: jest.runAllTimersAsync,
});
```

- Then, we can use our `user` instance like this:

```
await act(async () => {
    await user.type(searchbox, "doe");
});
```

- Another helpful way to `setup()` our `userEvent()` is by using the `delay` option.

- Between some subsequent inputs like typing a series of characters
  the code execution is delayed per `setTimeout` for (at least) `delay` seconds.
  This moves the next changes at least to next macro task
  and allows other (asynchronous) code to run between events. When `delay` has a value of `null`, it prevents `setTimeout` from being called.

- So, in our `AuthorFilterDialog` component, we are leveraging that option to make sure to prevent the `setTimeout` from being fired when we are inputing characters in the `input` box, so we can test that the API is being called on `enter`.

- This is how we do it:

```
   const userSkipTimeOut = userEvent.setup({ delay: null });

   const user = userEvent.setup({
     advanceTimers: jest.runAllTimersAsync,
   });

   ...

   userSkipTimeOut.type(searchbox, "doe");

   // Note that only the call that will make an update to the
   // component needs to be wrapped with the `act()` call.

   await act(async () => {
     await user.keyboard("{Enter}");
   });

   expect(queryForAuthors).toHaveBeenCalledWith(
     expect.objectContaining({
       variables: { searchValue: "doe" },
     }),
   );
```

## Jest

- Do **NOT** `jest.mock()` at the top of the file when possible as it permanently overwrites the originial implementation across the test suite, instead of it, use `jest.spyOn()`.

- Here is an article on [When to use jest.spyOn() vs jest.mock](https://medium.com/@eklavya_/jest-spy-vs-mock-when-to-use-what-60b8720f3ed0#:~:text=The%20main%20difference%20in%20spying,are%20just%20returning%20the%20value.).

- Make sure to clear mocks and spys and restore them after tests.

- Remember that `jest.restoreAllMocks()` only works for mocks made with `jest.spyOn()`. We need to manually restore the others.

- Failing to follow this best practice or using the incorrect method to do so, can contribute to memory leaks in tests. For more understanding on Jest mocks `reset`, `restore` and `clear`, read [this article](https://marek-rozmus.medium.com/jest-mock-and-spy-mockclear-vs-mockreset-vs-mockrestore-f52395581950).

- Based on my research and experimentation so far, it looks like we want to `jest.clearAllAllMocks()` after each test - you can use a `afterEach` hook for that, and then `jest.restoreAllMocks` after all of them. Of course, this rule might vary from case to case, so make sure to implement what's appropriate to your test.

- Here is another helpful [article](https://making.close.com/posts/finding-the-cause-of-a-memory-leak-in-jest) about finding the cause of memory leak in Jest that is related to not wrapping up Jest mocks appropriately.

- When/if testing a debounce function, tell Jest to mock all timeout functions with `jest.useFakeTimers()` then fast-forward with the appropriate Jest timer helper function. Some common ones are: `jest.advanceTimersByTime(1000);` , `jest.runAllTimers()`, `jest.runAllTimersAsync();` and `jest.runOnlyPendingTimersAsync()`.

- When using a `Jest` timer that triggers an update in the component, this will be a case in which we should use the React Testing Library `act()` method because the `Jest` timer will fast foward our component's time and try to update it. Since the update is made outside of the React lifecycle, we need to account for it and manually use `act()`.

- Read more on Jest Timers [here](https://jestjs.io/docs/timer-mocks).

## Troubleshooting Client Tests Memory Leak

- [Jest tests-are-extremely-slow-on-docker-andor-continuous-integration-ci-server](https://jestjs.io/docs/troubleshooting#tests-are-extremely-slow-on-docker-andor-continuous-integration-ci-server)

- Add a debugger; to client code.

- From root of project run: `node --inspect-brk ./node_modules/.bin/jest --rootDir apps/client --runInBand`, or `yarn g:test:client:debug`.

- When you see the log 'Debugger attached' in the terminal, go to your browser and start recording a memory snapshot while tests are running.

- Record a second snapshot and under the 'All Objects' tab above the results, go to objects allocated between snapshot 1 and snapshot 2 to compare them as recurring instances are usually more related to what we are looking for.

- We should be able to see test files under the Object constructor if they are part of the snapshots.

- Read on [this article](https://chanind.github.io/javascript/2019/10/12/jest-tests-memory-leak.html) for more information on how to locate the leak.

## Jest Snapshot Tests

- We are starting to add snapshots tests across the client, so if you touch a file, add snapshot tests to it if/when it makes sense.

- We decided to print our snapshots to `.snap` files by using the `toMatchSnapshot()` function.

- `toMatchInlineSnapshot()` can be used when testing that a component is loading.

- Use our helper `waitForLoadingToFinish()` when a component needs to load the data before it's rendered, otherwise your snapshot will only print the `Loading` element.

- Check the size of your snapshot and if it's too long, it might make sense to make the component smaller.

- We want to leverage the [snapshot-diff](https://classic.yarnpkg.com/en/package/snapshot-diff) package to take snapshots before and after user interaction/state update.

### Snapshot don'ts

- If tests error due to a snapshot being changed, **DO NOT** update it until you have reviewed the snapshot diff and decide if it's an intentional change or an accident.

- Don’t use it with factory data as it will change every time.

- Avoid snapshotting file paths: they'll fail on other platforms because of different delimiters (\ vs /).

- Avoid snapshotting dates and times: even if the date depends only on the input, it may be different in another time zone, and your tests will fail.

