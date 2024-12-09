import { Navigate, Outlet } from "react-router-dom";
import { routeNames } from "./routes";

import Layout from "@/layout/layout";
import { getLocalStorageItem } from "@/utils/localstorage";

export const ProtectedRoutes = () => {
  const signedIn = getLocalStorageItem("signedIn");

  if (!signedIn) {
    return <Navigate to={routeNames.loginPage} />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
