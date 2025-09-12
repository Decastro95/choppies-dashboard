import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import AdminDashboardContent from "./AdminDashboardContent"; // Your existing Admin JSX

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={[Roles.ADMIN]}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}

