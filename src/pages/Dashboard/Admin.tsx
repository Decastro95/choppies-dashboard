import React from "react";
import AdminDashboardContent from "./AdminDashboardContent";
import Layout from "../../components/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function Admin() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Layout>
        <AdminDashboardContent />
      </Layout>
    </ProtectedRoute>
  );
}
