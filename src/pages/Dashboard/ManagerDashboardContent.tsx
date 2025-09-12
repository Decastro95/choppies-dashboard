import React, { useEffect, useState } from "react";
import { supabase } from "../../src/supabaseClient";

export default function ManagerDashboardContent() {
  const [loading, setLoading] = useState(true);
  const [lowStock, setLowStock] = useState([]);
  const [expiring, setExpiring] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const { data: salesData } = await supabase.from("sales_summary_view").select("*").limit(10);
      const { data: lowStockData } = await supabase.from("low_stock_view").select("*").limit(10);
      const { data: expiringData } = await supabase.from("expiring_goods_view").select("*").limit(10);
      setSales(salesData || []);
      setLowStock(lowStockData || []);
      setExpiring(expiringData || []);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>
      {loading && <p>Loading...</p>}
      {/* Replace below with actual UI */}
      <p>Sales: {sales.length}</p>
      <p>Low Stock: {lowStock.length}</p>
      <p>Expiring Goods: {expiring.length}</p>
    </div>
  );
}
