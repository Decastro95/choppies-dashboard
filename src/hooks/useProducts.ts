import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from<Product>("products")
        .select("*");

      if (error) setError(error.message);
      else if (data) setProducts(data);

      setLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
