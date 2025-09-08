import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

export default function Layout({ children }) {
  const { user, role } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen">
      <aside className="w-60 bg-green-700 text-white p-4">
        <h1 className="text-xl font-bold">Choppies</h1>
        <p className="mt-2">Role: <span className="bg-red-600 px-2 py-1 rounded">{role}</span></p>
        <button onClick={handleLogout} className="mt-4 bg-red-500 px-4 py-2 rounded">Logout</button>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
