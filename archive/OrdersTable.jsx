import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase.from("orders").select(`
        id,
        total,
        created_at,
        users ( email )
      `);
      if (error) console.error("❌ Error fetching orders:", error.message);
      else setOrders(data || []);
    }
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Orders</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Customer</th>
            <th className="border px-2 py-1">Total</th>
            <th className="border px-2 py-1">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td className="border px-2 py-1">{o.id}</td>
              <td className="border px-2 py-1">{o.users?.email}</td>
              <td className="border px-2 py-1">N${o.total}</td>
              <td className="border px-2 py-1">{o.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
