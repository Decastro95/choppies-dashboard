#!/bin/bash

mkdir -p pages/Dashboard

# Wrapper files
cat <<EOL > pages/Dashboard/Ceo.tsx
import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import CeoDashboardContent from "./CeoDashboardContent";

export default function CeoDashboard() {
  return (
    <ProtectedRoute allowedRoles={[Roles.CEO]}>
      <CeoDashboardContent />
    </ProtectedRoute>
  );
}
EOL

cat <<EOL > pages/Dashboard/Manager.tsx
import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import ManagerDashboardContent from "./ManagerDashboardContent";

export default function ManagerDashboard() {
  return (
    <ProtectedRoute allowedRoles={[Roles.MANAGER]}>
      <ManagerDashboardContent />
    </ProtectedRoute>
  );
}
EOL

cat <<EOL > pages/Dashboard/Cashier.tsx
import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import CashierDashboardContent from "./CashierDashboardContent";

export default function CashierDashboard() {
  return (
    <ProtectedRoute allowedRoles={[Roles.CASHIER]}>
      <CashierDashboardContent />
    </ProtectedRoute>
  );
}
EOL

cat <<EOL > pages/Dashboard/Supplier.tsx
import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import SupplierDashboardContent from "./SupplierDashboardContent";

export default function SupplierDashboard() {
  return (
    <ProtectedRoute allowedRoles={[Roles.SUPPLIER]}>
      <SupplierDashboardContent />
    </ProtectedRoute>
  );
}
EOL

cat <<EOL > pages/Dashboard/Admin.tsx
import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import AdminDashboardContent from "./AdminDashboardContent";

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={[Roles.ADMIN]}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
EOL

# Content files (empty templates to paste your current JSX/design)
for role in Ceo Manager Cashier Supplier Admin; do
cat <<EOL > pages/Dashboard/${role}DashboardContent.tsx
import React from "react";

export default function ${role}DashboardContent() {
  return (
    <div>
      {/* Paste your existing ${role} dashboard JSX/design here */}
      <h1>${role} Dashboard Content</h1>
    </div>
  );
}
EOL
done

echo "All 10 dashboard files created under pages/Dashboard/"
