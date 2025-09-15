import { createClient } from "@supabase/supabase-js";

// ------------------------------
// TEMPORARY FOR DEMO/PRESENTATION
// ------------------------------
// Hardcode your Supabase credentials here to bypass Vercel env variable issues

const SUPABASE_URL = "https://rvtievlyzwyogfzvixxv.supabase.co"; // <-- replace with your project URL
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2dGlldmx5end5b2dmenZpeHh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyMDUwNTMsImV4cCI6MjA3Mjc4MTA1M30.YJEitBlUKc5acIKmllu1sAII-Npod3FFN3c13irnhCs"; // <-- replace with your anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
