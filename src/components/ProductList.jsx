import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase.from("products").select("*");
      if (error) console.error("❌ Error loading products:", error.message);
      else setProducts(data);
    }
    loadProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} – {p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
