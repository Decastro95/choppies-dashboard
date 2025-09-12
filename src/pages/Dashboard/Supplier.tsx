import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import SupplierDashboardContent from "./SupplierDashboardContent";

export default function Supplier() {
  return (
    <ProtectedRoute allowedRoles={[Roles.SUPPLIER]}>
      <SupplierDashboardContent />
    </ProtectedRoute>
  );
}

