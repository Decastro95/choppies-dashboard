// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types/database.types'

// ✅ Vite exposes env vars prefixed with VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Missing Supabase environment variables. ' +
    'Check your .env file or Codesandbox environment settings.'
  )
}

// Typed Supabase client with your Database schema
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
