// src/pages/Dashboard/AdminDashboardContent.tsx
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Database } from "../../types/supabase";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";

type ExpiringGoods = Database["public"]["Views"]["expiring_goods_view"]["Row"];
type DamagedGoods = Database["public"]["Views"]["damaged_goods_view"]["Row"];

export default function AdminDashboardContent() {
  const [expiringGoods, setExpiringGoods] = useState<ExpiringGoods[]>([]);
  const [damagedGoods, setDamagedGoods] = useState<DamagedGoods[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const { data: expData } = await supabase
        .from<ExpiringGoods>("expiring_goods_view")
        .select("*");
      const { data: dmgData } = await supabase
        .from<DamagedGoods>("damaged_goods_view")
        .select("*");

      setExpiringGoods(expData || []);
      setDamagedGoods(dmgData || []);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <ProtectedRoute allowedRoles={[Roles.ADMIN]}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-lg font-bold mb-4">Expiring Goods</h2>
              <ul>
                {expiringGoods.map((item, idx) => (
                  <li key={idx}>
                    {item.product_name} — {item.days_to_expiry} days left
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-lg font-bold mb-4">Damaged Goods</h2>
              <ul>
                {damagedGoods.map((item, idx) => (
                  <li key={idx}>
                    {item.product_name} — Quantity: {item.quantity}
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
