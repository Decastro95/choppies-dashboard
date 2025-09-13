import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Database } from "../../types/supabase";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import { AuthContext } from "../../context/AuthContext"; // fixed path


type SalesSummary = Database["public"]["Views"]["sales_summary_view"]["Row"];
type LowStock = Database["public"]["Views"]["low_stock_view"]["Row"];
type ExpiringGoods = Database["public"]["Views"]["expiring_goods_view"]["Row"];

export default function ManagerDashboardContent() {
  const [summary, setSummary] = useState<SalesSummary | null>(null);
  const [lowStock, setLowStock] = useState<LowStock[]>([]);
  const [expiring, setExpiring] = useState<ExpiringGoods[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const { data: sumData } = await supabase
        .from<SalesSummary>("sales_summary_view")
        .select("*")
        .maybeSingle();
      const { data: lowData } = await supabase
        .from<LowStock>("low_stock_view")
        .select("*");
      const { data: expData } = await supabase
        .from<ExpiringGoods>("expiring_goods_view")
        .select("*");

      setSummary(sumData || null);
      setLowStock(lowData || []);
      setExpiring(expData || []);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <ProtectedRoute allowedRoles={[Roles.MANAGER]}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-lg font-bold mb-4">Sales Summary</h2>
              <p>
                Total Revenue: N${summary?.total_revenue?.toLocaleString() || 0}
              </p>
              <p>Active Shops: {summary?.active_shops || 0}</p>
              <p>Product Categories: {summary?.product_categories || 0}</p>
              <p>
                Total Customers: {summary?.total_customers?.toLocaleString() || 0}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-lg font-bold mb-4">Low Stock</h2>
              <ul>
                {lowStock.map((item, idx) => (
                  <li key={idx}>
                    {item.product_name} — Qty: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-lg font-bold mb-4">Expiring Goods</h2>
              <ul>
                {expiring.map((item, idx) => (
                  <li key={idx}>
                    {item.product_name} — {item.days_to_expiry} days left
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
