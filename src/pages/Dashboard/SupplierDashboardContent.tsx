// src/pages/Dashboard/SupplierDashboardContent.tsx
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Database } from "../../supabase";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import { AuthContext } from "../../context/AuthContext"; // fixed path

type PurchaseOrders = Database["public"]["Tables"]["purchase_orders"]["Row"];

export default function SupplierDashboardContent() {
  const [orders, setOrders] = useState<PurchaseOrders[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadOrders() {
      setLoading(true);
      const { data } = await supabase
        .from<PurchaseOrders>("purchase_orders")
        .select("*");
      setOrders(data || []);
      setLoading(false);
    }
    loadOrders();
  }, []);

  return (
    <ProtectedRoute allowedRoles={[Roles.SUPPLIER]}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Supplier Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-lg font-bold mb-4">Purchase Orders</h2>
            <ul>
              {orders.map((o, idx) => (
                <li key={idx}>
                  {o.order_number} — {o.status}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
