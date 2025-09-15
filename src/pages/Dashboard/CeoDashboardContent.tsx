// src/pages/Dashboard/CeoDashboardContent.tsx
import { useEffect, useState } from "react";
import { Database } from "../../supabase";
import { supabase } from "../../supabaseClient";
import { AuthContext, useAuth } from "../../context/AuthContext";

type SalesSummary = Database["sales_summary_view"]["Row"];
type DailySales = Database["daily_sales_view"]["Row"];

export default function CeoDashboardContent() {
  const { user, loading } = useAuth();
  const [salesSummary, setSalesSummary] = useState<SalesSummary[]>([]);
  const [dailySales, setDailySales] = useState<DailySales[]>([]);

  useEffect(() => {
    if (!loading) fetchData();
  }, [loading]);

  async function fetchData() {
    const { data: summary } = await supabase.from<SalesSummary>("sales_summary_view").select("*");
    const { data: daily } = await supabase.from<DailySales>("daily_sales_view").select("*");
    setSalesSummary(summary || []);
    setDailySales(daily || []);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <h3>Sales Summary</h3>
      <ul>{salesSummary.map(s => <li key={s.id}>{s.total}</li>)}</ul>

      <h3>Daily Sales</h3>
      <ul>{dailySales.map(d => <li key={d.id}>{d.total}</li>)}</ul>
    </div>
  );
}
