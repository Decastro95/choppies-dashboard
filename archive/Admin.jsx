import React from "react";
import Layout from "../components/Layout";
import OrdersTable from "../components/OrdersTable";
import ProductList from "../components/ProductList";

export default function Admin() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrdersTable />
        <ProductList />
      </div>
    </Layout>
  );
}
