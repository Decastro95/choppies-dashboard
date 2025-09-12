import { supabase } from "../src/supabaseClient";

export async function seedDemoData() {
  try {
    const { error } = await supabase.from("products").insert([
      { name: "Milk", price: 15, stock: 50 },
      { name: "Bread", price: 10, stock: 80 },
      { name: "Eggs", price: 5, stock: 200 },
    ]);

    if (error) throw error;
    console.log("✅ Demo data seeded successfully");
  } catch (error: any) {
    console.error("❌ Error seeding demo data:", error.message);
    throw error;
  }
}
