import React from 'react';
import { supabase } from "../supabaseClient";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  return data;
}
