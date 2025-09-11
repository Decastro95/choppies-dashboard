// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// ✅ Vite requires env vars prefixed with VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Missing Supabase environment variables. ' +
    'Check your .env file or Codesandbox environment settings.'
  )
}

// Create and export a single Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

