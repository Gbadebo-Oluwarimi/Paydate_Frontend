import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// This component will only allow unauthenticated users to access the route
const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/dashboard" />
        )
      }
    />
  );
};

export default PublicRoute;
