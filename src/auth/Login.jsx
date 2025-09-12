- import { createClient } from "@supabase/supabase-js";
- const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
+ import { supabase } from "../supabaseClient";
