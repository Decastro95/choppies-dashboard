import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import { Package, AlertTriangle, Calendar } from "lucide-react";

function Table({ title, columns, data, emptyMessage }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-xs text-slate-500 uppercase">
              {columns.map((col, i) => (
                <th key={i} className="py-2 pr-4">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              data.map((row, i) => (
                <tr key={i} className="border-t">
                  {columns.map((col, j) => (
                    <td key={j} className="py-3 pr-4">
                      {row[col.toLowerCase().replace(/\s+/g, "_")] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-6 text-slate-400">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ManagerDashboard() {
  const [loading, setLoading] = useState(true);
  const [dailySales, setDailySales] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [expiringGoods, setExpiringGoods] = useState([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const { data: salesData, error: salesErr } = await supabase
        .from("daily_sales_view")
        .select("day, transactions, total_sales, items_sold")
        .order("day", { ascending: false })
        .limit(7);
      if (salesErr) console.error("Error loading daily sales:", salesErr);

      const { data: stockData, error: stockErr } = await supabase
        .from("low_stock_view")
        .select("product_name, current_quantity, reorder_level")
        .limit(10);
      if (stockErr) console.error("Error loading low stock:", stockErr);

      const { data: expData, error: expErr } = await supabase
        .from("expiring_goods_view")
        .select("product_name, quantity, expiry_date, days_to_expiry")
        .order("days_to_expiry", { ascending: true })
        .limit(10);
      if (expErr) console.error("Error loading expiring goods:", expErr);

      setDailySales(salesData || []);
      setLowStock(stockData || []);
      setExpiringGoods(expData || []);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="p-6 max-w-full">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">Manager Dashboard</h1>
            <p className="text-sm opacity-80">Sales, Inventory & Expiry Monitoring</p>
          </div>
          <div className="text-sm font-medium">Updated: {new Date().toLocaleDateString()}</div>
        </div>
      </header>

      {loading ? (
        <div className="text-slate-400 text-center py-10">Loading...</div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Daily Sales */}
          <Table
            title="Daily Sales (Last 7 Days)"
            columns={["Day", "Transactions", "Total_Sales", "Items_Sold"]}
            data={dailySales.map((d) => ({
              day: new Date(d.day).toLocaleDateString(),
              transactions: d.transactions,
              total_sales: `N$${Number(d.total_sales || 0).toLocaleString()}`,
              items_sold: d.items_sold,
            }))}
            emptyMessage="No sales data available."
          />

          {/* Low Stock */}
          <Table
            title="Low Stock Alerts"
            columns={["Product_Name", "Current_Quantity", "Reorder_Level"]}
            data={lowStock}
            emptyMessage="No low stock alerts."
          />

          {/* Expiring Goods */}
          <Table
            title="Expiring Goods"
            columns={["Product_Name", "Quantity", "Expiry_Date", "Days_To_Expiry"]}
            data={expiringGoods.map((e) => ({
              product_name: e.product_name,
              quantity: e.quantity,
              expiry_date: new Date(e.expiry_date).toLocaleDateString(),
              days_to_expiry: e.days_to_expiry,
            }))}
            emptyMessage="No expiring goods at this time."
          />
        </motion.div>
      )}
    </div>
  );
}