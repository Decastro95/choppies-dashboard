import ProtectedRoute from "../../components/ProtectedRoute";
import { Role } from "../../roles"; // ✅ fixed
import CashierDashboardContent from "./CashierDashboardContent";


export default function Cashier() {
  return (
    <ProtectedRoute allowedRoles={[Roles.CASHIER]}>
      <CashierDashboardContent />
    </ProtectedRoute>
  );
}
