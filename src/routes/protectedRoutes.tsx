import { Navigate, Outlet } from "react-router-dom";
import { routeNames } from "./routes";

export const ProtectedRoutes = () => {
  const authToken = true;

  if (!authToken) {
    return <Navigate to={routeNames.loginPage} />;
  }

  return <Outlet />;
};
