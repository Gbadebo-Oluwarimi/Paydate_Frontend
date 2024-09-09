import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loginform from "./pages/Login";
import { Dashboard } from "./pages/AuthPages/Dashboard";
import SignUpform from "./pages/SignUp";
import PrivateRoute from "./pages/AuthComponents/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import { checkSession } from "./Features/Auth/AuthSlice";
import { Progress } from "./components/ui/progress";
import { SpinnerInfinity } from "spinners-react";

function App() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const sessionId = cookies.get("connect.sid");
  console.log(sessionId);
  useEffect(() => {
    dispatch(checkSession());
    if (sessionId) {
      console.log("Session ID found:", sessionId);
      dispatch(checkSession()); // Dispatch a thunk to verify the session
    }
  }, [dispatch]);
  if (loading) {
    // Optionally render a loading spinner or placeholder while checking auth
    return (
      <SpinnerInfinity
        size={50}
        thickness={100}
        speed={100}
        color="#36ad47"
        secondaryColor="rgba(0, 0, 0, 0.44)"
        className="m-auto mt-72"
      />
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <SignUpform />
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Loginform />
            }
          />
          {/* Redirect to login if the path doesn't match */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
