import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function ManagerDashboardContent() {
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [expiringGoods, setExpiringGoods] = useState([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const { data: salesData, error: salesErr } = await supabase
        .from("sales_summary_view")
        .select("*");
      if (salesErr) console.error("Error loading sales:", salesErr);
      setSales(salesData || []);

      const { data: lowStockData, error: lowErr } = await supabase
        .from("low_stock_view")
        .select("*");
      if (lowErr) console.error("Error loading low stock:", lowErr);
      setLowStock(lowStockData || []);

      const { data: expiringData, error: expErr } = await supabase
        .from("expiring_goods_view")
        .select("*");
      if (expErr) console.error("Error loading expiring goods:", expErr);
      setExpiringGoods(expiringData || []);

      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>

      {loading ? (
        <div>Loading data...</div>
      ) : (
        <div className="space-y-6">
          <section>
            <h2 className="font-semibold mb-2">Sales Summary</h2>
            <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(sales, null, 2)}</pre>
          </section>

          <section>
            <h2 className="font-semibold mb-2">Low Stock</h2>
            <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(lowStock, null, 2)}</pre>
          </section>

          <section>
            <h2 className="font-semibold mb-2">Expiring Goods</h2>
            <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(expiringGoods, null, 2)}</pre>
          </section>
        </div>
      )}
    </div>
  );
}
