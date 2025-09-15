import React from "react";
import CeoDashboardContent from "./CeoDashboardContent";
import Layout from "../../components/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function Ceo() {
  return (
    <ProtectedRoute allowedRoles={["ceo"]}>
      <Layout>
        <CeoDashboardContent />
      </Layout>
    </ProtectedRoute>
  );
}
