import { supabase } from "../src/supabaseClient";

export async function seedDamagedGoods() {
  try {
    const { error } = await supabase.from("damaged_goods").insert([
      { product_id: 1, quantity: 3 },
      { product_id: 2, quantity: 1 },
    ]);

    if (error) throw error;
    console.log("✅ Damaged goods seeded successfully");
  } catch (error: any) {
    console.error("❌ Error seeding damaged goods:", error.message);
    throw error;
  }
}
