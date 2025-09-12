import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import ManagerDashboardContent from "./ManagerDashboardContent"; // Your current Manager JSX

export default function ManagerDashboard() {
  return (
    <ProtectedRoute allowedRoles={[Roles.MANAGER]}>
      <ManagerDashboardContent />
    </ProtectedRoute>
  );
}

