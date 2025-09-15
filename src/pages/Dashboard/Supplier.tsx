import React from "react";
import SupplierDashboardContent from "./SupplierDashboardContent";
import Layout from "../../components/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function Supplier() {
  return (
    <ProtectedRoute allowedRoles={["supplier"]}>
      <Layout>
        <SupplierDashboardContent />
      </Layout>
    </ProtectedRoute>
  );
}
