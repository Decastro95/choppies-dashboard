export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold text-red-600">Unauthorized Access</h1>
      <p className="mb-4">You do not have permission to view this page.</p>
      <button
        onClick={() => (window.location.href = "/login")}
        className="bg-green-700 text-white px-4 py-2 rounded"
      >
        Back to Login
      </button>
    </div>
  );
}
