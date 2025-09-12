import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import ManagerDashboardContent from "./ManagerDashboardContent";

export default function Manager() {
  return (
    <ProtectedRoute allowedRoles={[Roles.MANAGER]}>
      <ManagerDashboardContent />
    </ProtectedRoute>
  );
}

