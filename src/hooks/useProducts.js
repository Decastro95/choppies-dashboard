import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase.from("products").select("*");
      if (error) console.error("❌ Error fetching products:", error.message);
      else setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  return { products, loading };
}
