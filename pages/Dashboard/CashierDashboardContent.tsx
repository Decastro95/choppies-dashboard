import React, { useState } from "react";

export default function CashierDashboardContent() {
  const [cart, setCart] = useState([]);
  const [damagedGoods, setDamagedGoods] = useState([]);
  const [returns, setReturns] = useState([]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cashier Dashboard</h1>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">POS</h2>
        <p>Point-of-sale functionality placeholder</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">Returns</h2>
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(returns, null, 2)}</pre>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Damaged Goods</h2>
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(damagedGoods, null, 2)}</pre>
      </section>
    </div>
  );
}
