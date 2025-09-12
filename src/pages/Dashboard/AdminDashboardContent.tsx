import React, { useEffect, useState } from "react";
import { supabase } from "../../src/supabaseClient";

export default function AdminDashboardContent() {
  const [loading, setLoading] = useState(true);
  const [expiry, setExpiry] = useState([]);
  const [damaged, setDamaged] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const { data: exp } = await supabase.from("expiring_goods_view").select("*").limit(10);
      const { data: dmg } = await supabase.from("damaged_goods_view").select("*").limit(10);
      const { data: u } = await supabase.from("profiles").select("*").limit(10);
      setExpiry(exp || []);
      setDamaged(dmg || []);
      setUsers(u || []);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {loading && <p>Loading...</p>}
      <p>Expiring Goods: {expiry.length}</p>
      <p>Damaged Goods: {damaged.length}</p>
      <p>User/Roles: {users.length}</p>
    </div>
  );
}
