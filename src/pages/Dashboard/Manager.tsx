import React from "react";
import ManagerDashboardContent from "./ManagerDashboardContent";
import Layout from "../../components/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function Manager() {
  return (
    <ProtectedRoute allowedRoles={["manager"]}>
      <Layout>
        <ManagerDashboardContent />
      </Layout>
    </ProtectedRoute>
  );
}
