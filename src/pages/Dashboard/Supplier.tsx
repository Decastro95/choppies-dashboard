// src/pages/Dashboard/Supplier.tsx
import ProtectedRoute from "../../components/ProtectedRoute";
import SupplierDashboardContent from "./SupplierDashboardContent";
import { Roles } from "../../roles";

export default function Supplier() {
  return (
    <ProtectedRoute allowedRoles={[Roles.SUPPLIER]}>
      <SupplierDashboardContent />
    </ProtectedRoute>
  );
}

