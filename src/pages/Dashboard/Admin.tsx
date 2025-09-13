// src/pages/Dashboard/Admin.tsx
import ProtectedRoute from "../../components/ProtectedRoute";
import AdminDashboardContent from "./AdminDashboardContent";
import { Roles } from "../../roles";

export default function Admin() {
  return (
    <ProtectedRoute allowedRoles={[Roles.ADMIN]}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}

