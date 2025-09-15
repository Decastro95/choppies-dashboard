import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function ExpiringGoods() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchExpiring() {
      const { data, error } = await supabase.from("expiring_goods").select(`
        id,
        expiry_date,
        products ( name )
      `);
      if (error)
        console.error("❌ Error fetching expiring goods:", error.message);
      else setItems(data || []);
    }
    fetchExpiring();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Expiring Goods</h2>
      <ul className="divide-y">
        {items.map((item) => (
          <li key={item.id} className="py-2 flex justify-between">
            <span>{item.products?.name}</span>
            <span className="text-red-500">{item.expiry_date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
