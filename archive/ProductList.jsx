import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("products").select("*");
      if (error) console.error("❌ Error fetching products:", error.message);
      else setProducts(data || []);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Products</h2>
      <ul className="divide-y">
        {products.map((p) => (
          <li key={p.id} className="py-2 flex justify-between">
            <span>{p.name}</span>
            <span className="text-gray-600">
              N${p.price} • {p.stock} in stock
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
