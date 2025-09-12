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
    const { data, error } = await supabase
      .from("low_stock")
      .insert([
        { product_name: "Rice 5kg", current_stock: 3 },
        { product_name: "Sugar 2kg", current_stock: 2 },
      ])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({ message: "Low stock seeded", data });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
