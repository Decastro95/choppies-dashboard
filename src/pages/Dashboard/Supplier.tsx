import ProtectedRoute from "../../components/ProtectedRoute";
import { Role } from "../../roles"; // ✅ fixed
import SupplierDashboardContent from "./SupplierDashboardContent";

export default function Supplier() {
  return (
    <ProtectedRoute allowedRoles={[Roles.SUPPLIER]}>
      <SupplierDashboardContent />
    </ProtectedRoute>
  );
}

