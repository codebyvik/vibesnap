import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoutes } from "./protectedRoutes";

import Loader from "../components/shared/loader/loader";
import Login from "../pages/auth/login";
import { routeNames } from "./routes";
const NewPost = lazy(() => import("../pages/new-post/newPost"));
const EditProfile = lazy(() => import("../pages/profile/editProfile"));
const Profile = lazy(() => import("../pages/profile/profile"));
const HomePage = lazy(() => import("../pages/home/homePage"));

const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh", // 100% of the viewport height
    }}
  >
    <Loader />
  </div>
);

const routes = createBrowserRouter([
  {
    path: routeNames.loginPage,
    element: <Login />,
  },

  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: routeNames.homePage,
        element: <HomePage />,
      },
      {
        path: routeNames.newPost,
        element: <NewPost />,
      },
      {
        path: routeNames.userProfile,
        element: <Profile />,
      },
      {
        path: routeNames.editProfile,
        element: <EditProfile />,
      },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
]);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RouterProvider router={routes} />
    </Suspense>
  );
};

export default AppRoutes;
