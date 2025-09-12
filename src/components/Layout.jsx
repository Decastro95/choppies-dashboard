import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { user, signOut } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-xl font-bold">Choppies Dashboard</div>
        <nav className="mt-4 flex flex-col space-y-2 px-4">
          <Link to="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/products" className="hover:text-blue-600">
            Products
          </Link>
          <Link to="/orders" className="hover:text-blue-600">
            Orders
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
          <span className="text-gray-600">
            {user ? `Welcome, ${user.email}` : "Not logged in"}
          </span>
          {user && (
            <button
              onClick={signOut}
              className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
