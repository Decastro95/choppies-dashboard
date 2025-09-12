import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    if (data?.user) {
      // Fetch user role from Supabase metadata
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();

      if (profileError) {
        setError("Failed to fetch user role");
        return;
      }

      const role = profile?.role || data.user.user_metadata?.role;

      // Redirect based on role
      switch (role) {
        case "ceo":
          router.push("/dashboard/Ceo");
          break;
        case "manager":
          router.push("/dashboard/Manager");
          break;
        case "cashier":
          router.push("/dashboard/Cashier");
          break;
        case "supplier":
          router.push("/dashboard/Supplier");
          break;
        case "admin":
          router.push("/dashboard/Admin");
          break;
        default:
          router.push("/unauthorized");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 className="mb-4 text-2xl font-bold">Login</h2>

        {error && (
          <p className="mb-2 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

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
