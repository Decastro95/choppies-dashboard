import { supabase } from "../src/supabaseClient";

export async function seedExpiry() {
  try {
    const { error } = await supabase.from("expiring_goods").insert([
      { product_id: 1, expiry_date: "2025-09-30" },
      { product_id: 2, expiry_date: "2025-09-25" },
    ]);

    if (error) throw error;
    console.log("✅ Expiring goods seeded successfully");
  } catch (error: any) {
    console.error("❌ Error seeding expiry:", error.message);
    throw error;
  }
}
