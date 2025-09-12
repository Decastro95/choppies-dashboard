import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import CashierDashboardContent from "./CashierDashboardContent";

export default function Cashier() {
  return (
    <ProtectedRoute allowedRoles={[Roles.CASHIER]}>
      <CashierDashboardContent />
    </ProtectedRoute>
  );
}
