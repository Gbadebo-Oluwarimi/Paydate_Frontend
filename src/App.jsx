import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginform from "./pages/Login";
import { Dashboard } from "./pages/AuthPages/Dashboard";
import SignUpform from "./pages/SignUp";
import RootLayout from "./components/Rootlayout";
import PrivateRoute from "./pages/AuthComponents/PrivateRoute"; // Import the PrivateRoute component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/signup" element={<SignUpform />} />
          <Route path="/login" element={<Loginform />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
