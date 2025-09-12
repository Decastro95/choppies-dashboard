import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProtectedRoute from "./ProtectedRoute";
import { Roles } from "../../roles";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import SupplierDashboardContent from "./SupplierDashboardContent"; // Your existing Supplier JSX

export default function SupplierDashboard() {
  return (
    <ProtectedRoute allowedRoles={[Roles.SUPPLIER]}>
      <SupplierDashboardContent />
    </ProtectedRoute>
  );
}

export default function SupplierDashboard() {
  const [orders, setOrders] = useState([]);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const { data: ordersData } = await supabase.from("purchase_orders").select("*");
      const { data: docsData } = await supabase.from("documents").select("*");

      setOrders(ordersData || []);
      setDocs(docsData || []);
      setLoading(false);
    }

    loadData();
  }, []);

  return (
    <ProtectedRoute allowedRoles={[Roles.Supplier]}>
      <div className="p-6 max-w-full">
        <h1 className="text-2xl font-extrabold mb-4">Supplier Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Orders</h2>
              <pre>{JSON.stringify(orders, null, 2)}</pre>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Uploaded/Downloaded Documents</h2>
              <pre>{JSON.stringify(docs, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
