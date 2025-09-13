import ProtectedRoute from "../../components/ProtectedRoute";
import { Role } from "../../roles"; // ✅ fixed
import ManagerDashboardContent from "./ManagerDashboardContent";

export default function Manager() {
  return (
    <ProtectedRoute allowedRoles={[Roles.MANAGER]}>
      <ManagerDashboardContent />
    </ProtectedRoute>
  );
}

