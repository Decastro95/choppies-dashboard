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
      .from("damaged_goods")
      .insert([
        {
          product_name: "Cooking Oil 2L",
          quantity: 2,
          reason: "Leaking bottle",
        },
        { product_name: "Bread", quantity: 5, reason: "Moldy stock" },
      ])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({ message: "Damaged goods seeded", data });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
