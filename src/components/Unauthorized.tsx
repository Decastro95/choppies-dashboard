import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold mb-4">Unauthorized</h1>
      <p className="mb-4">You do not have permission to view this page.</p>
      <Link to="/login" className="text-blue-600 underline">
        Go to Login
      </Link>
    </div>
  );
}
