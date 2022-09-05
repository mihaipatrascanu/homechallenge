import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useToken from "../hooks/useToken";
import { useVerifyMutation } from "../store/features/auth/loginAPI";

function RequireAuth() {
  const location = useLocation();
  const { access_token, email, refresh_token } = useToken();
  const [triggerVerifyToken] = useVerifyMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await triggerVerifyToken(refresh_token)
          .unwrap()
          .then((res) => console.log(res));
      } catch {
        // handle err
      }
    };

    verifyRefreshToken();
  }, [triggerVerifyToken, refresh_token]);

  // check if token exist if not redirect the user to the login page
  return access_token && email ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
