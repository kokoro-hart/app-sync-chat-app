import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <>TOP</>,
      },
      {
        path: "/chat",
        element: <>Chat</>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
