import ProtectedRoute from "../../components/ProtectedRoute";
import { Role } from "../../roles"; // ✅ fixed
import AdminDashboardContent from "./AdminDashboardContent";

export default function Admin() {
  return (
    <ProtectedRoute allowedRoles={[Roles.ADMIN]}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}

