import { supabase } from "../src/supabaseClient";
import { seedDamagedGoods } from "./seedDamagedGoods";
import { seedDemoData } from "./seedDemoData";
import { seedExpiry } from "./seedExpiry";
import { seedLowStock } from "./seedLowStock";

export async function seedAllDemo() {
  try {
    await seedDemoData();
    await seedDamagedGoods();
    await seedExpiry();
    await seedLowStock();

    console.log("✅ All demo data seeded successfully");
  } catch (error: any) {
    console.error("❌ Error seeding demo data:", error.message);
    throw error;
  }
}
