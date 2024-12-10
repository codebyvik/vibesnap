import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "./redux/auth.redux";
import AppRoutes from "./routes";
import { Toaster } from "./components/ui/toaster";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
}

export default App;
