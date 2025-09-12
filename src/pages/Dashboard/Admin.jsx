import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import { AlertTriangle, Users, Package } from "lucide-react";

function DataTable({ title, columns, data, emptyMessage }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-xs text-slate-500 uppercase">
              {columns.map((col, i) => (
                <th key={i} className="py-2 pr-4">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              data.map((row, i) => (
                <tr key={i} className="border-t">
                  {columns.map((col, j) => (
                    <td key={j} className="py-3 pr-4">
                      {row[col.toLowerCase().replace(/\s+/g, "_")] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-6 text-slate-400">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [expiringGoods, setExpiringGoods] = useState([]);
  const [damagedGoods, setDamagedGoods] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const { data: expData, error: expErr } = await supabase
        .from("expiring_goods_view")
        .select("product_name, quantity, expiry_date, days_to_expiry")
        .order("days_to_expiry", { ascending: true })
        .limit(10);
      if (expErr) console.error("Error loading expiring goods:", expErr);

      const { data: dmgData, error: dmgErr } = await supabase
        .from("damaged_goods_view")
        .select("product_name, quantity, reason, reported_by, reported_at")
        .order("reported_at", { ascending: false })
        .limit(10);
      if (dmgErr) console.error("Error loading damaged goods:", dmgErr);

      const { data: userData, error: userErr } = await supabase
        .from("users_roles_view")
        .select("id, email, role, created_at")
        .limit(10);
      if (userErr) console.error("Error loading users:", userErr);

      setExpiringGoods(expData || []);
      setDamagedGoods(dmgData || []);
      setUsers(userData || []);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="p-6 max-w-full">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-2xl p-6 mb-6 shadow-lg">
        <h1 className="text-2xl font-extrabold">Admin Dashboard</h1>
        <p className="text-sm opacity-80">System monitoring & user management</p>
      </header>

      {loading ? (
        <div className="text-slate-400 text-center py-10">Loading...</div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Expiring Goods */}
          <DataTable
            title="Expiring Goods Overview"
            columns={["Product_Name", "Quantity", "Expiry_Date", "Days_To_Expiry"]}
            data={expiringGoods.map((e) => ({
              product_name: e.product_name,
              quantity: e.quantity,
              expiry_date: new Date(e.expiry_date).toLocaleDateString(),
              days_to_expiry: e.days_to_expiry,
            }))}
            emptyMessage="No expiring goods."
          />

          {/* Damaged Goods */}
          <DataTable
            title="Damaged Goods Report"
            columns={["Product_Name", "Quantity", "Reason", "Reported_By", "Reported_At"]}
            data={damagedGoods.map((d) => ({
              product_name: d.product_name,
              quantity: d.quantity,
              reason: d.reason,
              reported_by: d.reported_by,
              reported_at: new Date(d.reported_at).toLocaleString(),
            }))}
            emptyMessage="No damaged goods reported."
          />

          {/* User & Role Management */}
          <DataTable
            title="User & Role Management"
            columns={["ID", "Email", "Role", "Created_At"]}
            data={users.map((u) => ({
              id: u.id,
              email: u.email,
              role: u.role,
              created_at: new Date(u.created_at).toLocaleDateString(),
            }))}
            emptyMessage="No users available."
          />
        </motion.div>
      )}
    </div>
  );
}
