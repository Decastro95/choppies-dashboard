// src/pages/Dashboard/SupplierDashboardContent.tsx
import { useEffect, useState } from "react";
import { Database } from "../../supabase";
import { supabase } from "../../supabaseClient";
import { AuthContext, useAuth } from "../../context/AuthContext";

type PurchaseOrders = Database["purchase_orders"]["Row"];

export default function SupplierDashboardContent() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<PurchaseOrders[]>([]);

  useEffect(() => {
    if (!loading) fetchOrders();
  }, [loading]);

  async function fetchOrders() {
    const { data } = await supabase.from<PurchaseOrders>("purchase_orders").select("*");
    setOrders(data || []);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <h3>Purchase Orders</h3>
      <ul>{orders.map(o => <li key={o.id}>{o.id} – {o.product_id}</li>)}</ul>
    </div>
  );
}
