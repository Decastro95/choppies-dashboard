import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cashier"); // default role, can adjust
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    // 1️⃣ Create user in Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role }, // store role in metadata
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // 2️⃣ Insert user into profiles table
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([{ id: data.user.id, email, role }]);

    if (profileError) {
      setError(profileError.message);
      return;
    }

    // 3️⃣ Redirect based on role
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
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>

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

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mb-3 w-full rounded border px-3 py-2"
        >
          <option value="ceo">CEO</option>
          <option value="manager">Manager</option>
          <option value="cashier">Cashier</option>
          <option value="supplier">Supplier</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
