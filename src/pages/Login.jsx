import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setError(error.message);
    const role = data.user.user_metadata.role;
    window.location.href = `/dashboard/${role}`;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full mb-2 p-2 border rounded" />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full mb-2 p-2 border rounded" />
        <button type="submit" className="w-full bg-green-700 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
