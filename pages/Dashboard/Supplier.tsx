import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import SupplierDashboardContent from "./SupplierDashboardContent"; // Your existing Supplier JSX

export default function SupplierDashboard() {
  return (
    <ProtectedRoute allowedRoles={[Roles.SUPPLIER]}>
      <SupplierDashboardContent />
    </ProtectedRoute>
  );
}

