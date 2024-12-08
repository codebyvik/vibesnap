import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "./redux/auth.redux";
import AppRoutes from "./routes";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;
