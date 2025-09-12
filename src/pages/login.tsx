import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../supabaseClient";
import { roleDashboardMap } from "../roles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      return;
    }

    if (!data.user) {
      setError("User not found.");
      return;
    }

    // Fetch role from Supabase
    const { data: profile, error: roleError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (roleError || !profile?.role) {
      setError("Unable to determine user role.");
      return;
    }

    const dashboard = roleDashboardMap[profile.role as keyof typeof roleDashboardMap];
    if (dashboard) router.push(dashboard);
    else setError("No dashboard assigned for your role.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 className="mb-4 text-2xl font-bold">Login</h2>

        {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="mb-3 w-full rounded border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-3 w-full rounded border px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
