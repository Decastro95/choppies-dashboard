// src/pages/Dashboard/AdminDashboardContent.tsx
import { useEffect, useState } from "react";
import { Database } from "../../supabase";
import { supabase } from "../../supabaseClient";
import { AuthContext, useAuth } from "../../context/AuthContext";

type ExpiringGoods = Database["expiring_goods_view"]["Row"];
type DamagedGoods = Database["damaged_goods_view"]["Row"];
type LowStock = Database["low_stock_view"]["Row"];

export default function AdminDashboardContent() {
  const { user, loading } = useAuth();
  const [expiringGoods, setExpiringGoods] = useState<ExpiringGoods[]>([]);
  const [damagedGoods, setDamagedGoods] = useState<DamagedGoods[]>([]);
  const [lowStock, setLowStock] = useState<LowStock[]>([]);

  useEffect(() => {
    if (!loading) fetchData();
  }, [loading]);

  async function fetchData() {
    const { data: exp } = await supabase.from("expiring_goods_view").select("*");
    const { data: dmg } = await supabase.from("damaged_goods_view").select("*");
    const { data: low } = await supabase.from("low_stock_view").select("*");

    setExpiringGoods(exp || []);
    setDamagedGoods(dmg || []);
    setLowStock(low || []);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <h3>Expiring Goods</h3>
      <ul>{expiringGoods.map(i => <li key={i.id}>{i.name}</li>)}</ul>

      <h3>Damaged Goods</h3>
      <ul>{damagedGoods.map(i => <li key={i.id}>{i.product_id}</li>)}</ul>

      <h3>Low Stock</h3>
      <ul>{lowStock.map(i => <li key={i.id}>{i.product_id}</li>)}</ul>
    </div>
  );
}
