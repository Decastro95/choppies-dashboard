import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import CashierDashboardContent from "./CashierDashboardContent"; // Your existing Cashier JSX

export default function CashierDashboard() {
  return (
    <ProtectedRoute allowedRoles={[Roles.CASHIER]}>
      <CashierDashboardContent />
    </ProtectedRoute>
  );
}
}
