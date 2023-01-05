# Issue reproduction for @tanstack/react-table

This repo is a reproduction of an issue encountered when using `@tanstack/react-table`.

## Bug Description

When using table that with filters built with a custom `<Combobox>` component implemented with [downshift](https://github.com/downshift-js/downshift), I see this React warning in the console:

```
react_devtools_backend.js:4012 Warning: Cannot update a component (`BrokenVersion`) while rendering a different component (`Combobox`). To locate the bad setState() call inside `Combobox`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
```

If I remove the custom `<Combobox>` component and use a `<datalist>` with an `<input>`, the warning does not appear.

I read through [the React issue](https://github.com/facebook/react/issues/18178#issuecomment-595846312) linked in the React warning, which describes how to expand the stack trace and look for the first line that is not inside React. When I do this, I see that the first line that is not inside React is within `node_modules/@tanstack/react-table/src/index.tsx:85`, which is a `setState()` call inside the `useReactTable` hook.

I tried solutions suggested in later comments in the React issue above, but was unable to prevent the warning.

## Link to minimal reproduction

[https://stackblitz.com/edit/node-twt1uh?file=README.md](https://stackblitz.com/edit/node-twt1uh?file=README.md)

## Steps to reproduce:

1. Install dependencies with yarn 1.x: `yarn`
2. Run the app locally with: `yarn dev`
3. Open the app by pointing your browser to the **Local** URL shown by Vite, which should be: http://127.0.0.1:5173/
4. The table labeled as "Broken Version" reproduces the issue. As noted in the text above the Broken Version table, the next steps to reproduce the issue are as follows:
5. Click on any of the First, Last, or Email filter inputs.
6. Click one of the options in the dropdown list to set it as the filter value.
7. Open the JavaScript console and notice a React warning.

## Expected behavior

I expect there to be no warnings when using the custom Combobox component as a filter input. Instead, I see a React warning in the JavaScript console.

## Screenshot

![Stack trace](/screenshots/stacktrace.png "stacktrace")

## Platform

OS: macOS Monterey Version 12.3

Browser: Google Chrome Version 108.0.5359.124 (Official Build) (arm64)

## react-table version

8.7.4

## TypeScript Version

4.9.4

## Debugging notes 1/5/23

I added whyDidYouRender to both the BrokenVersion and WorkingVersion to see if there are extra renders when using Combobox, but both of them were constantly re-rendered, so I added whyDidYouRender to WorkingVersion only to see if I could isolate the cause of the re-rendering. It looks like the cause of the re-rendering is within @tanstack/react-table - see src/components/WorkingVersion.tsx line 81.
