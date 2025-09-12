import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      const { data, error } = await supabase.from("orders").select("*");
      if (error) console.error("❌ Error loading orders:", error.message);
      else setOrders(data);
    }
    loadOrders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.customer_name}</td>
              <td>{o.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
