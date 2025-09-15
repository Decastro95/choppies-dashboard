import { supabase } from "../supabaseClient";

type ExpiringItem = {
  id: number;
  name: string;
  expiry_date: string;
};

export default function ExpiringGoods({ items }: { items: ExpiringItem[] }) {
  return (
    <ul>
      {items.map(i => (
        <li key={i.id}>
          {i.name} – Expires {new Date(i.expiry_date).toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
}
