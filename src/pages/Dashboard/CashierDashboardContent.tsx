// src/pages/Dashboard/CashierDashboardContent.tsx
import { useEffect, useState } from "react";
import { Database } from "../../supabase";
import { supabase } from "../../supabaseClient";
import { AuthContext, useAuth } from "../../context/AuthContext";

type SalesSummary = Database["sales_summary_view"]["Row"];
type DamagedGoods = Database["damaged_goods_view"]["Row"];
type Returns = Database["returns_view"]["Row"];

export default function CashierDashboardContent() {
  const { user, loading } = useAuth();
  const [salesSummary, setSalesSummary] = useState<SalesSummary[]>([]);
  const [damagedGoods, setDamagedGoods] = useState<DamagedGoods[]>([]);
  const [returnsList, setReturnsList] = useState<Returns[]>([]);

  useEffect(() => {
    if (!loading) fetchData();
  }, [loading]);

  async function fetchData() {
    const { data: sales } = await supabase.from<SalesSummary>("sales_summary_view").select("*");
    const { data: dmg } = await supabase.from<DamagedGoods>("damaged_goods_view").select("*");
    const { data: ret } = await supabase.from<Returns>("returns_view").select("*");

    setSalesSummary(sales || []);
    setDamagedGoods(dmg || []);
    setReturnsList(ret || []);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <h3>Sales Summary</h3>
      <ul>{salesSummary.map(s => <li key={s.id}>{s.total}</li>)}</ul>

      <h3>Damaged Goods</h3>
      <ul>{damagedGoods.map(d => <li key={d.id}>{d.product_id}</li>)}</ul>

      <h3>Returns</h3>
      <ul>{returnsList.map(r => <li key={r.id}>{r.product_id}</li>)}</ul>
    </div>
  );
}
