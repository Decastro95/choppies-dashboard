import ProtectedRoute from "../../components/ProtectedRoute";
import { Role } from "../../roles"; // ✅ fixed
import CeoDashboardContent from "./CeoDashboardContent";

export default function Ceo() {
  return (
    <ProtectedRoute allowedRoles={[Roles.CEO]}>
      <CeoDashboardContent />
    </ProtectedRoute>
  );
}
