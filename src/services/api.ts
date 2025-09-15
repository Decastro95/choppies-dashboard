// src/services/api.ts
import { supabase } from "../supabaseClient";

export async function fetchProducts() {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  return data;
}

// Add other API functions from your original api.js here
