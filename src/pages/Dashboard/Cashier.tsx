import React from "react";
import CashierDashboardContent from "./CashierDashboardContent";
import Layout from "../../components/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function Cashier() {
  return (
    <ProtectedRoute allowedRoles={["cashier"]}>
      <Layout>
        <CashierDashboardContent />
      </Layout>
    </ProtectedRoute>
  );
}
