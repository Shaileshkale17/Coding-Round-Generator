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
import ProtectedRoute from "./util/Auth_tocken";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
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
        element: (
          <ProtectedRoute>
            <TestFromPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile-page",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routers} />
  </StrictMode>
);
