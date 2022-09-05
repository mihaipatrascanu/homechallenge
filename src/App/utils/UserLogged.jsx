import { Navigate, Outlet, useLocation } from "react-router-dom";
import useToken from "../hooks/useToken";

function UserLogged() {
  const location = useLocation();
  const { access_token, email } = useToken();

  return !access_token || !email ? (
    <Outlet />
  ) : (
    // Navigate the user to /dashboard route if login is successful
    <Navigate to="/dashboard" state={{ from: location }} replace />
  );
}

export default UserLogged;
