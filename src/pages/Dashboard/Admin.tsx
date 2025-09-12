import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProtectedRoute from "./ProtectedRoute";
import { Roles } from "../../roles";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import AdminDashboardContent from "./AdminDashboardContent"; // Your existing Admin JSX

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={[Roles.ADMIN]}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [expiry, setExpiry] = useState([]);
  const [damaged, setDamaged] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const { data: expiryData } = await supabase.from("expiring_goods_view").select("*");
      const { data: damagedData } = await supabase.from("damaged_goods_view").select("*");
      const { data: usersData } = await supabase.from("profiles").select("*");

      setExpiry(expiryData || []);
      setDamaged(damagedData || []);
      setUsers(usersData || []);
      setLoading(false);
    }

    loadData();
  }, []);

  return (
    <ProtectedRoute allowedRoles={[Roles.Admin]}>
      <div className="p-6 max-w-full">
        <h1 className="text-2xl font-extrabold mb-4">Admin Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Expiring Goods</h2>
              <pre>{JSON.stringify(expiry, null, 2)}</pre>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Damaged Goods</h2>
              <pre>{JSON.stringify(damaged, null, 2)}</pre>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Users / Roles</h2>
              <pre>{JSON.stringify(users, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
