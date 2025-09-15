import React from "react";
import Layout from "../components/Layout";
import OrdersTable from "../components/OrdersTable";

export default function Cashier() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Cashier Dashboard</h1>
      <OrdersTable />
    </Layout>
  );
}
