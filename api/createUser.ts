import { supabase } from "../src/supabaseClient";

export async function createUser(
  email: string,
  password: string,
  role: string
) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role },
      },
    });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Error creating user:", error.message);
    throw error;
  }
}
