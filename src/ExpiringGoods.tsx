import React from 'react';
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function ExpiringGoods() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadExpiringGoods() {
      const { data, error } = await supabase
        .from("inventory")
        .select("*")
        .lt("expiry_date", new Date().toISOString()); // items expiring today or earlier
      if (error)
        console.error("❌ Error loading expiring goods:", error.message);
      else setItems(data);
    }
    loadExpiringGoods();
  }, []);

  return (
    <div>
      <h2>Expiring Goods</h2>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            {i.name} – Expires {new Date(i.expiry_date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
