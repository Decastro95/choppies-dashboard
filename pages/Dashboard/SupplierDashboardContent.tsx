import React, { useState } from "react";

export default function SupplierDashboardContent() {
  const [orders, setOrders] = useState([]);
  const [documents, setDocuments] = useState([]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Supplier Dashboard</h1>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">Purchase Orders</h2>
        <p>Placeholder for orders table or form</p>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Upload/Download Documents</h2>
        <p>Placeholder for document upload/download</p>
      </section>
    </div>
  );
}
