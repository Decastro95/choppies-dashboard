// src/pages/Dashboard/ManagerDashboardContent.tsx
import { useEffect, useState } from "react";
import { Database } from "../../supabase";
import { supabase } from "../../supabaseClient";
import { AuthContext, useAuth } from "../../context/AuthContext";

type SalesSummary = Database["sales_summary_view"]["Row"];
type LowStock = Database["low_stock_view"]["Row"];
type ExpiringGoods = Database["expiring_goods_view"]["Row"];

export default function ManagerDashboardContent() {
  const { user, loading } = useAuth();
  const [salesSummary, setSalesSummary] = useState<SalesSummary[]>([]);
  const [lowStock, setLowStock] = useState<LowStock[]>([]);
  const [expiringGoods, setExpiringGoods] = useState<ExpiringGoods[]>([]);

  useEffect(() => {
    if (!loading) fetchData();
  }, [loading]);

  async function fetchData() {
    const { data: sales } = await supabase.from<SalesSummary>("sales_summary_view").select("*");
    const { data: low } = await supabase.from<LowStock>("low_stock_view").select("*");
    const { data: exp } = await supabase.from<ExpiringGoods>("expiring_goods_view").select("*");

    setSalesSummary(sales || []);
    setLowStock(low || []);
    setExpiringGoods(exp || []);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <h3>Sales Summary</h3>
      <ul>{salesSummary.map(s => <li key={s.id}>{s.total}</li>)}</ul>

      <h3>Low Stock</h3>
      <ul>{lowStock.map(l => <li key={l.id}>{l.product_id}</li>)}</ul>

      <h3>Expiring Goods</h3>
      <ul>{expiringGoods.map(e => <li key={e.id}>{e.name}</li>)}</ul>
    </div>
  );
}
