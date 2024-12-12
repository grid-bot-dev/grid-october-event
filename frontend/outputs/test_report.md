# Functional Tests Report

# Functional Test for `App.test.jsx`

## Test Case 1: `renders without crashing`
- **Description**: Tests if the `App` component renders without crashing.
- **Input**: N/A
- **Expected Output**: `RouterProvider` is called.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The `RouterProvider` was successfully called when rendering the `App` component.

## Test Case 2: `creates correct route configuration`
- **Description**: Tests if the `App` component creates the correct route configuration.
- **Input**: N/A
- **Expected Output**: Routes configuration contains five paths: `/`, `/login`, `/dashboard`, and `/userflow`.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The `createBrowserRouter` was called with the correct route configuration, which contained the expected five paths.

## Test Case 3: `root path redirects to login`
- **Description**: Tests if the root path (`/`) redirects to the login page.
- **Input**: N/A
- **Expected Output**: Root path redirects to `/login`.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The root path was correctly configured to redirect to the login page using the `Navigate` component.

## Test Case 4: `correct components are used for each route`
- **Description**: Tests if the correct components are rendered for each route.
- **Input**: N/A
- **Expected Output**: The following components are used:
  - `/login` -> `Auth`
  - `/dashboard` -> `Dashboard`
  - `/userflow` -> `UserFlow`
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The `App` component was correctly using the expected components for each route.

## Test Case 5: `RouterProvider is called with correct router`
- **Description**: Tests if `RouterProvider` is called with the correct router configuration.
- **Input**: N/A
- **Expected Output**: `RouterProvider` is called with the router returned by `createBrowserRouter`.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The `RouterProvider` was successfully called with the correct router configuration returned by `createBrowserRouter`.

## Test Case 6: `createBrowserRouter is called with correct routes`
- **Description**: Tests if `createBrowserRouter` is called with the correct routes configuration.
- **Input**: N/A
- **Expected Output**: `createBrowserRouter` is called with routes containing paths: `/`, `/login`, `/dashboard` and `/userflow`.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The `createBrowserRouter` function was correctly called with the expected route paths.

============================================================

# Functional Test for `main.test.jsx`

## Test Case 1: `should render App component wrapped in StrictMode`
- **Description**: Tests if the `main.jsx` file renders the `App` component wrapped in `StrictMode`.
- **Input**: N/A
- **Expected Output**: `App` component is rendered within `StrictMode`.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The test successfully verified that the `App` component is wrapped in `StrictMode` and rendered correctly.

============================================================

# Functional Test for `UserFlow.test.jsx`

## Test Case 1: `renders without crashing`
- **Description**: Tests if the `UserFlow` component renders without crashing.
- **Input**: N/A
- **Expected Output**: The component renders without errors.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The test successfully verified that the `UserFlow` component is rendered and contains the `sider` element.

## Test Case 2: `renders the correct title`
- **Description**: Tests if the correct title "Website Flow" is rendered in the `UserFlow` component.
- **Input**: N/A
- **Expected Output**: The title "Website Flow" should be present.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The test confirmed that at least one title element contains the correct text.

## Test Case 3: `renders the menu items`
- **Description**: Tests if the menu items in the `UserFlow` component are rendered correctly.
- **Input**: N/A
- **Expected Output**: Menu items "Dashboard," "Analytics," and "User Flow" should be present.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The test verified that all specified menu items are rendered in the document.

## Test Case 4: `renders the MermaidDiagram component`
- **Description**: Tests if the `MermaidDiagram` component is rendered within the `UserFlow`.
- **Input**: N/A
- **Expected Output**: The `MermaidDiagram` component should be present.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The test confirmed that the `card` element associated with the `MermaidDiagram` component is present.

============================================================

# Functional Test for `Dashboard.test.jsx`

## Test Case 1: `renders without crashing`
- **Description**: Tests if the `Dashboard` component renders without crashing.
- **Input**: N/A
- **Expected Output**: The component renders without errors.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The test successfully verified that the `Dashboard` component is rendered and contains the `layout` element.

## Test Case 2: `fetches data on mount`
- **Description**: Tests if the component fetches data when it mounts.
- **Input**: N/A
- **Expected Output**: The `fetch` function should be called 8 times.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The test confirmed that the `fetch` function was called the expected number of times (8).

## Test Case 3: `handles fetch error`
- **Description**: Tests if the component handles fetch errors gracefully.
- **Input**: Mock fetch rejection with an error.
- **Expected Output**: Console should log the error message.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The test verified that the correct error message was logged to the console upon fetch failure.

## Test Case 4: `creates charts after data is loaded`
- **Description**: Tests if charts are created after the data is successfully fetched.
- **Input**: Mock data for chart creation.
- **Expected Output**: The `newPlot` function from the Plotly module should be called 6 times.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The test confirmed that the `newPlot` function was called the expected number of times (6) after data loading.

## Test Case 5: `renders KPI cards`
- **Description**: Tests if the KPI cards are rendered correctly.
- **Input**: Mock KPI data.
- **Expected Output**: KPI values should be displayed correctly.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The test successfully verified that the KPI values were rendered in the document.

## Test Case 6: `renders top customers table`
- **Description**: Tests if the top customers table is rendered correctly.
- **Input**: Mock top customers data.
- **Expected Output**: The table element should be present in the document.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The test confirmed that the table was rendered correctly after fetching the top customers' data.

============================================================

# Functional Test for `Auth.test.jsx`

## Test Case 1: `renders login form correctly`
- **Description**: Tests if the login form renders correctly with all necessary elements.
- **Input**: N/A
- **Expected Output**: The form should display input fields for email and password, a login button, a title "Customer 360," a message about account creation, and a Google Sign-In button.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: All required elements were found in the document, indicating the form renders as intended.

## Test Case 2: `handles form submission with valid inputs`
- **Description**: Tests the form submission process when valid inputs are provided.
- **Input**: Email: `test@example.com`, Password: `password123`
- **Expected Output**: The login button should be disabled, a success message should be displayed, and navigation should occur to the `/dashboard` route after a 2-second delay.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The test confirmed that the success message was called and the navigation function was executed as expected.

## Test Case 3: `handles form submission with missing inputs`
- **Description**: Tests the form submission process when inputs are missing.
- **Input**: N/A (No email or password entered)
- **Expected Output**: An error message should indicate that all fields must be filled.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The error message was called as expected, indicating the validation for empty fields works correctly.

## Test Case 4: `handles Google Sign-In success`
- **Description**: Tests the behavior when Google Sign-In is successful.
- **Input**: N/A (Triggered by clicking the Google Sign-In button)
- **Expected Output**: A success message should be displayed indicating a successful login with Google.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The success message for Google login was triggered correctly, confirming the success handling works.

## Test Case 5: `handles Google Sign-In error`
- **Description**: Tests the behavior when Google Sign-In fails.
- **Input**: N/A (Triggered by clicking the error button for Google Sign-In)
- **Expected Output**: An error message should indicate that Google Sign-In failed.
- **Actual Output**: Test passed as expected.
- **Status**: Passed
- **Error**: None
- **Reason**: The error message was called as expected, confirming that the error handling works correctly for Google Sign-In.

============================================================

# Overall Report
- **Total test cases**: 22
- **Passed test cases**: 22
- **Failed test cases**: 0
- **Functional test pass rate**: 100%

# Coverage Summary
- **Statements**: 88%
- **Branches**: 90%
- **Functions**: 98%
- **Lines**: 80%