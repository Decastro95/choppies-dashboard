// src/pages/Dashboard/Cashier.tsx
import ProtectedRoute from "../../components/ProtectedRoute";
import CashierDashboardContent from "./CashierDashboardContent";
import { Roles } from "../../roles";

export default function Cashier() {
  return (
    <ProtectedRoute allowedRoles={[Roles.CASHIER]}>
      <CashierDashboardContent />
    </ProtectedRoute>
  );
}

