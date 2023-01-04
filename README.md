# Issue reproduction for @tanstack/react-table

This repo is a reproduction of an issue encountered when using @tanstack/react-table.

## Steps to reproduce:

1. Install dependencies with yarn 1.x: `yarn`
2. Run the app locally with: `yarn dev`
3. Open the app by pointing your browser to the **Local** URL shown by Vite, which should be: http://127.0.0.1:5173/
4. The table shown on the left, labeled as "Working Version," does not reproduce the issue. The table shown on the right, labeled as "Broken Version," does reproduce the issue. As noted in the text above the right-hand table, if you use any of the combobox inputs below "First," "Last" or "Email" to set a filter value, then look in the JavaScript console, you'll see this React warning:
   ```
   react_devtools_backend.js:4012 Warning: Cannot update a component (`BrokenVersion`) while rendering a different component (`Combobox`). To locate the bad setState() call inside `Combobox`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
   ```

## Expected behavior

I expect there to be no warning when using my Combobox component as a filter input.
