// src/pages/Dashboard/CashierDashboardContent.tsx
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Database } from "../../types/supabase";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import { AuthContext } from "../../context/AuthContext"; // fixed path


type SalesSummary = Database["public"]["Views"]["sales_summary_view"]["Row"];
type DamagedGoods = Database["public"]["Views"]["damaged_goods_view"]["Row"];
type Returns = Database["public"]["Views"]["returns_view"]["Row"];

export default function CashierDashboardContent() {
  const [summary, setSummary] = useState<SalesSummary | null>(null);
  const [damaged, setDamaged] = useState<DamagedGoods[]>([]);
  const [returns, setReturns] = useState<Returns[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const { data: sumData } = await supabase
        .from<SalesSummary>("sales_summary_view")
        .select("*")
        .maybeSingle();
      const { data: dmgData } = await supabase
        .from<DamagedGoods>("damaged_goods_view")
        .select("*");
      const { data: returnData } = await supabase
        .from<Returns>("returns_view")
        .select("*");

      setSummary(sumData || null);
      setDamaged(dmgData || []);
      setReturns(returnData || []);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <ProtectedRoute allowedRoles={[Roles.CASHIER]}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Cashier Dashboard</h1>
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
                Total Customers:{" "}
                {summary?.total_customers?.toLocaleString() || 0}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-lg font-bold mb-4">Damaged Goods</h2>
              <ul>
                {damaged.map((d, idx) => (
                  <li key={idx}>
                    {d.product_name} — Qty: {d.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-lg font-bold mb-4">Returns</h2>
              <ul>
                {returns.map((r, idx) => (
                  <li key={idx}>
                    {r.product_name} — Qty: {r.quantity}
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
