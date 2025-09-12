import React, { useEffect, useState } from "react";
import { supabase } from "../../src/supabaseClient";

export default function CashierDashboardContent() {
  const [loading, setLoading] = useState(true);
  const [posData, setPosData] = useState([]);
  const [damaged, setDamaged] = useState([]);
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const { data: pos } = await supabase.from("sales_summary_view").select("*").limit(10);
      const { data: damagedGoods } = await supabase.from("damaged_goods_view").select("*").limit(10);
      const { data: returnData } = await supabase.from("returns_view").select("*").limit(10);
      setPosData(pos || []);
      setDamaged(damagedGoods || []);
      setReturns(returnData || []);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cashier Dashboard</h1>
      {loading && <p>Loading...</p>}
      <p>POS Transactions: {posData.length}</p>
      <p>Damaged Goods: {damaged.length}</p>
      <p>Returns: {returns.length}</p>
    </div>
  );
}
