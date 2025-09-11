import { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Example demo data
    const products = [
      { name: "Choppies Bread", price: 10.5, stock: 100 },
      { name: "Cooking Oil 2L", price: 45.0, stock: 50 },
      { name: "Maize Meal 10kg", price: 120.0, stock: 25 },
    ];

    // Insert into products
    const { data: productData, error: productError } = await supabase
      .from("products")
      .insert(products)
      .select();

    if (productError) {
      return res.status(400).json({ error: productError.message });
    }

    // Example sales entry linked to first product
    const { data: salesData, error: salesError } = await supabase
      .from("sales")
      .insert([
        {
          product_id: productData[0].id,
          quantity: 2,
          total_amount: productData[0].price * 2,
          sale_date: new Date().toISOString(),
        },
      ])
      .select();

    if (salesError) {
      return res.status(400).json({ error: salesError.message });
    }

    return res.status(200).json({
      message: "Demo data seeded successfully",
      products: productData,
      sales: salesData,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
