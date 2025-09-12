import { supabase } from "../src/supabaseClient";

export async function seedLowStock() {
  try {
    const { error } = await supabase.from("low_stock").insert([
      { product_id: 1, threshold: 10 },
      { product_id: 3, threshold: 20 },
    ]);

    if (error) throw error;
    console.log("✅ Low stock seeded successfully");
  } catch (error: any) {
    console.error("❌ Error seeding low stock:", error.message);
    throw error;
  }
}
