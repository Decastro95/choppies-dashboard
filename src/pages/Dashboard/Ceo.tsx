// src/pages/Dashboard/Ceo.tsx
import ProtectedRoute from "../../components/ProtectedRoute";
import CeoDashboardContent from "./CeoDashboardContent";
import { Roles } from "../../roles";

export default function Ceo() {
  return (
    <ProtectedRoute allowedRoles={[Roles.CEO]}>
      <CeoDashboardContent />
    </ProtectedRoute>
  );
}
