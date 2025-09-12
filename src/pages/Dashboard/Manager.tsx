import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import ProtectedRoute from "./ProtectedRoute";
import { Roles } from "../../roles";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import ManagerDashboardContent from "./ManagerDashboardContent"; // Your current Manager JSX

export default function ManagerDashboard() {
  return (
    <ProtectedRoute allowedRoles={[Roles.MANAGER]}>
      <ManagerDashboardContent />
    </ProtectedRoute>
  );
}

export default function ManagerDashboard() {
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [expiring, setExpiring] = useState([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const { data: salesData } = await supabase
        .from("sales_summary_view")
        .select("*");
      const { data: lowStockData } = await supabase
        .from("low_stock_view")
        .select("*");
      const { data: expiringData } = await supabase
        .from("expiring_goods_view")
        .select("*");

      setSales(salesData || []);
      setLowStock(lowStockData || []);
      setExpiring(expiringData || []);
      setLoading(false);
    }

    loadData();
  }, []);

  return (
    <ProtectedRoute allowedRoles={[Roles.Manager]}>
      <div className="p-6 max-w-full">
        <h1 className="text-2xl font-extrabold mb-4">Manager Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Sales</h2>
              <pre>{JSON.stringify(sales, null, 2)}</pre>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Low Stock</h2>
              <pre>{JSON.stringify(lowStock, null, 2)}</pre>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Expiring Goods</h2>
              <pre>{JSON.stringify(expiring, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
