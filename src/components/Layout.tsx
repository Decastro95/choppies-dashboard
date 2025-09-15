import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Choppies Dashboard</h1>
      </header>
      <main className="p-4">{children}</main>
      <footer className="bg-gray-200 text-center p-2 mt-4">
        &copy; {new Date().getFullYear()} Choppies
      </footer>
    </div>
  );
}
