import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import AdminDashboardContent from "./AdminDashboardContent";

export default function Admin() {
  return (
    <ProtectedRoute allowedRoles={[Roles.ADMIN]}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}

