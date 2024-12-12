import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import TestFromPage from "./pages/TestFromPage";
import ProfilePage from "./pages/profilePage";
import NotFoundPage from "./pages/NotFoundPage";
const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Singup />,
      },
      {
        path: "/test-from-page",
        element: <TestFromPage />,
      },
      {
        path: "/profile-page",
        element: <ProfilePage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routers} />
  </StrictMode>
);
