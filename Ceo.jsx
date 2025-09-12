import React from "react";
import Layout from "../components/Layout";
import ExpiringGoods from "../components/ExpiringGoods";
import OrdersTable from "../components/OrdersTable";

export default function Ceo() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">CEO Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpiringGoods />
        <OrdersTable />
      </div>
    </Layout>
  );
}
