import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import WalletDashboard from "../pages/WalletDashboard";
import Layout from "../utils/Layout";
import RequireAuth from "../utils/RequireAuth";
import UserLogged from "../utils/UserLogged";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route element={<UserLogged />}>
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/" element={<RequireAuth />}>
          {/* Redirect the user if is logged from route "/" to "/dashboard" */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Route /dashboard showing WalletDashboard page */}
          <Route path="dashboard" element={<WalletDashboard />} />

          {/*Catch invalid routes and redirect the user if is logged from route "/{invalid-route}" to "/dashboard" */}
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default AppRoutes;
