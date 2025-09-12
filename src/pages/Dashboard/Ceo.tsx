import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import CeoDashboardContent from "./CeoDashboardContent";

export default function Ceo() {
  return (
    <ProtectedRoute allowedRoles={[Roles.CEO]}>
      <CeoDashboardContent />
    </ProtectedRoute>
  );
}
