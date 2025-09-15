// src/supabase.ts
import { Database } from "./types/supabase";  // already imported
export { Database };
export { Database };                           // <-- ADD THIS

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
