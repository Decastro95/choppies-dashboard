import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-red-600 text-white p-4 flex justify-between">
        <h1 className="font-bold text-lg">Choppies Dashboard</h1>
        <nav className="space-x-4">
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/login" className="hover:underline">
            Logout
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-6">{children}</main>
      <footer className="bg-gray-200 text-center text-sm py-2">
        © {new Date().getFullYear()} Choppies Dashboard
      </footer>
    </div>
  );
}
