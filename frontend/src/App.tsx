import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Button } from "./components/ui";
import { SignInForm, SignUpForm, ConfirmSignUpForm } from "./features/auth";
import { getPath } from "./utils";
import { CognitoProvider } from "./providers";

const router = createBrowserRouter([
  {
    element: (
      <CognitoProvider>
        <Outlet />
      </CognitoProvider>
    ),
    children: [
      {
        path: getPath.root(),
        element: (
          <>
            <Button variant="outline">Button</Button>
          </>
        ),
      },
      {
        path: getPath.signIn(),
        element: <SignInForm />,
      },
      {
        path: getPath.signUp(),
        element: <SignUpForm />,
      },
      {
        path: getPath.confirmSignUp(),
        element: <ConfirmSignUpForm />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
