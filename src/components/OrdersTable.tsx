import { supabase } from "../supabaseClient";

type Order = {
  id: number;
  customer_name: string;
  total: number;
};

export default function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <table>
      <tbody>
        {orders.map(o => (
          <tr key={o.id}>
            <td>{o.id}</td>
            <td>{o.customer_name}</td>
            <td>{o.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
