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
    // Products
    await supabase.from("products").insert([
      { name: "Choppies Bread", price: 10.5, stock: 100 },
      { name: "Cooking Oil 2L", price: 45.0, stock: 50 },
    ]);

    // Sales
    await supabase.from("sales").insert([
      {
        product_id: 1,
        quantity: 2,
        total_amount: 21,
        sale_date: new Date().toISOString(),
      },
    ]);

    // Damaged Goods
    await supabase.from("damaged_goods").insert([
      {
        product_name: "Cooking Oil 2L",
        quantity: 2,
        reason: "Leaking bottle",
      },
    ]);

    // Expiry
    await supabase
      .from("expiry")
      .insert([{ product_name: "Milk 1L", expiry_date: "2025-09-30" }]);

    // Low Stock
    await supabase
      .from("low_stock")
      .insert([{ product_name: "Sugar 2kg", current_stock: 2 }]);

    return res.status(200).json({ message: "All demo data seeded!" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
