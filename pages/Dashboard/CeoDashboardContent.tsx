import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { motion } from "framer-motion";
import { TrendingUp, Users, Store, Package } from "lucide-react";

function KPICard({ icon: Icon, title, value, delta }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
          <Icon size={20} />
        </div>
        <h3 className="text-sm font-semibold text-slate-500">{title}</h3>
      </div>
      <div className="mt-3 text-2xl font-extrabold text-slate-900">{value}</div>
      {delta && (
        <div className="mt-1 text-xs text-green-600 font-medium">{delta}</div>
      )}
    </div>
  );
}

export default function CeoDashboardContent() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const { data: summaryData, error: sumErr } = await supabase
        .from("sales_summary_view")
        .select("*")
        .maybeSingle();
      if (sumErr) console.error("Error loading summary:", sumErr);

      const { data: regionalData, error: regErr } = await supabase
        .from("daily_sales_view")
        .select("region, total_sales, transactions")
        .limit(10);
      if (regErr) console.error("Error loading regions:", regErr);

      setSummary(summaryData);
      setRegions(regionalData || []);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="p-6 max-w-full">
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">CEO Dashboard</h1>
            <p className="text-sm opacity-80">Choppies Namibia — Company Overview</p>
          </div>
          <div className="text-sm font-medium">
            Generated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
      >
        <KPICard
          icon={TrendingUp}
          title="Total Revenue"
          value={`N$${summary?.total_revenue?.toLocaleString() || "0"}`}
          delta="+12% vs last month"
        />
        <KPICard
          icon={Store}
          title="Active Shops"
          value={summary?.active_shops || 0}
        />
        <KPICard
          icon={Package}
          title="Product Categories"
          value={summary?.product_categories || 0}
        />
        <KPICard
          icon={Users}
          title="Total Customers"
          value={summary?.total_customers?.toLocaleString() || 0}
          delta="+5% new"
        />
      </motion.section>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-bold mb-4">Regional Sales Overview</h2>
        {loading ? (
          <div className="text-slate-400">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-xs text-slate-500 uppercase">
                  <th className="py-2 pr-4">Region</th>
                  <th className="py-2 pr-4">Revenue</th>
                  <th className="py-2 pr-4">Transactions</th>
                </tr>
              </thead>
              <tbody>
                {regions.length ? (
                  regions.map((r, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="py-3 pr-4">{r.region || "Unknown"}</td>
                      <td className="py-3 pr-4 font-semibold">
                        N${Number(r.total_sales || 0).toLocaleString()}
                      </td>
                      <td className="py-3 pr-4">{r.transactions || 0}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-6 text-slate-400">
                      No regional data yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
