// src/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from './types/supabase';

// Make sure you have these in your .env or Vite env variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Example helper functions for database operations
 */

// Fetch all rows from a table
export async function fetchAll<T extends keyof Database['public']['Tables']>(
  table: T
) {
  const { data, error } = await supabase.from(table).select('*');
  if (error) throw error;
  return data;
}

// Fetch one row by ID
export async function fetchById<
  T extends keyof Database['public']['Tables'],
  K extends keyof Database['public']['Tables'][T]['Row']
>(table: T, id: K) {
  const { data, error } = await supabase.from(table).select('*').eq(id as string, id);
  if (error) throw error;
  return data?.[0] ?? null;
}

// Insert a row
export async function insertRow<
  T extends keyof Database['public']['Tables']
>(table: T, row: Database['public']['Tables'][T]['Insert']) {
  const { data, error } = await supabase.from(table).insert(row);
  if (error) throw error;
  return data;
}

// Update a row by ID
export async function updateRow<
  T extends keyof Database['public']['Tables'],
  K extends keyof Database['public']['Tables'][T]['Row']
>(table: T, id: K, row: Partial<Database['public']['Tables'][T]['Update']>) {
  const { data, error } = await supabase.from(table).update(row).eq(id as string, id);
  if (error) throw error;
  return data;
}

// Delete a row by ID
export async function deleteRow<
  T extends keyof Database['public']['Tables'],
  K extends keyof Database['public']['Tables'][T]['Row']
>(table: T, id: K) {
  const { data, error } = await supabase.from(table).delete().eq(id as string, id);
  if (error) throw error;
  return data;
}

// Example usage:
// const products = await fetchAll('products');
// const product = await fetchById('products', 1);
// await insertRow('products', { name: 'New Product', price: 100 });
// await updateRow('products', 1, { price: 120 });
// await deleteRow('products', 1);
