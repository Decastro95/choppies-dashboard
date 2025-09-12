import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function AdminDashboardContent() {
  const [users, setUsers] = useState([]);
  const [expiry, setExpiry] = useState([]);
  const [damagedGoods, setDamagedGoods] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data: userData, error: userErr } = await supabase
        .from("profiles")
        .select("*");
      if (userErr) console.error("Error loading users:", userErr);
      setUsers(userData || []);

      const { data: expiryData, error: expErr } = await supabase
        .from("expiring_goods_view")
        .select("*");
      if (expErr) console.error("Error loading expiry:", expErr);
      setExpiry(expiryData || []);

      const { data: damagedData, error: damErr } = await supabase
        .from("damaged_goods_summary_view")
        .select("*");
      if (damErr) console.error("Error loading damaged goods:", damErr);
      setDamagedGoods(damagedData || []);
    }
    loadData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">User & Role Management</h2>
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(users, null, 2)}</pre>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">Expiry Overview</h2>
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(expiry, null, 2)}</pre>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Damaged Goods Management</h2>
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(damagedGoods, null, 2)}</pre>
      </section>
    </div>
  );
}