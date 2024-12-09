import { Navigate, Outlet } from "react-router-dom";
import { routeNames } from "./routes";
import { useSelector } from "react-redux";
import Layout from "@/layout/layout";

export const ProtectedRoutes = () => {
  const { userDetails } = useSelector((state: any) => state?.auth?.user);

  if (!userDetails?.name) {
    return <Navigate to={routeNames.loginPage} />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
