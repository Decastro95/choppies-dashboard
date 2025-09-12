import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import { Upload, Download, FileText, ClipboardList } from "lucide-react";

export default function SupplierDashboard() {
  const [orders, setOrders] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Load purchase orders for supplier
  useEffect(() => {
    async function loadOrders() {
      const { data, error } = await supabase
        .from("supplier_orders_view") // assumes view/table exists
        .select("id, order_number, status, created_at, file_url")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data || []);
      }
    }
    loadOrders();
  }, []);

  // Upload invoice/delivery note
  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const filePath = `supplier_uploads/${Date.now()}_${file.name}`;
      const { error: uploadErr } = await supabase.storage
        .from("supplier-docs") // bucket name
        .upload(filePath, file);

      if (uploadErr) throw uploadErr;

      // Save record in DB
      const { error: insertErr } = await supabase.from("supplier_documents").insert([
        {
          file_name: file.name,
          file_url: filePath,
          supplier_id: "supplier-123", // replace with auth user later
        },
      ]);
      if (insertErr) throw insertErr;

      setMessage("Document uploaded successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error uploading document.");
    } finally {
      setUploading(false);
    }
  }

  // Download purchase order
  async function handleDownload(order) {
    try {
      const { data, error } = await supabase.storage
        .from("purchase-orders") // bucket name
        .download(order.file_url);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = order.order_number + ".pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setMessage("Downloaded " + order.order_number);
    } catch (err) {
      console.error(err);
      setMessage("Error downloading file.");
    }
  }

  return (
    <div className="p-6 max-w-full">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-6 mb-6 shadow-lg">
        <h1 className="text-2xl font-extrabold">Supplier Portal</h1>
        <p className="text-sm opacity-80">Upload documents & track purchase orders</p>
      </header>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-2xl shadow p-6 mb-6"
      >
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Upload size={20} /> Upload Invoice / Delivery Note
        </h2>
        <input
          type="file"
          accept=".csv,.xlsx,.xls,.pdf"
          onChange={handleUpload}
          disabled={uploading}
          className="block w-full text-sm text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700"
        />
        {uploading && <p className="text-slate-400 mt-2">Uploading...</p>}
      </motion.div>

      {/* Purchase Orders Section */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <ClipboardList size={20} /> Purchase Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-xs text-slate-500 uppercase">
                <th className="py-2 pr-4">Order #</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">File</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length ? (
                orders.map((o) => (
                  <tr key={o.id} className="border-t">
                    <td className="py-3 pr-4">{o.order_number}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          o.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : o.status === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      {new Date(o.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 pr-4 flex items-center gap-2">
                      <FileText size={16} /> {o.file_url || "N/A"}
                    </td>
                    <td className="py-3 pr-4">
                      {o.file_url ? (
                        <button
                          onClick={() => handleDownload(o)}
                          className="px-3 py-1 text-sm rounded-lg bg-red-600 text-white flex items-center gap-1"
                        >
                          <Download size={14} /> Download
                        </button>
                      ) : (
                        <span className="text-slate-400 text-sm">No file</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-6 text-slate-400">
                    No purchase orders available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm text-slate-700">
          {message}
        </div>
      )}
    </div>
  );
}