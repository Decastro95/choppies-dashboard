import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Admin from "./pages/Dashboard/Admin";
import Cashier from "./pages/Dashboard/Cashier";
import Manager from "./pages/Dashboard/Manager";
import Supplier from "./pages/Dashboard/Supplier";
import Ceo from "./pages/Dashboard/Ceo";
import useAuth from "../hooks/useAuth";
import Unauthorized from "./components/Unauthorized";
import Login from "./pages/login";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Dashboard Routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/cashier" element={<Cashier />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/ceo" element={<Ceo />} />

        {/* Redirect root */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate
                to={
                  user.role === "admin"
                    ? "/admin"
                    : user.role === "cashier"
                      ? "/cashier"
                      : user.role === "manager"
                        ? "/manager"
                        : user.role === "supplier"
                          ? "/supplier"
                          : user.role === "ceo"
                            ? "/ceo"
                            : "/unauthorized"
                }
                replace
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
