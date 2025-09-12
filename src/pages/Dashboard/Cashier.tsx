import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProtectedRoute from "./ProtectedRoute";
import { Roles } from "../../roles";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Roles } from "../../roles";
import CashierDashboardContent from "./CashierDashboardContent"; // Your existing Cashier JSX

export default function CashierDashboard() {
  return (
    <ProtectedRoute allowedRoles={[Roles.CASHIER]}>
      <CashierDashboardContent />
    </ProtectedRoute>
  );
}

export default function CashierDashboard() {
  const [loading, setLoading] = useState(true);
  const [posData, setPosData] = useState([]);
  const [returns, setReturns] = useState([]);
  const [damaged, setDamaged] = useState([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const { data: pos } = await supabase.from("sales_summary_view").select("*");
      const { data: returnsData } = await supabase.from("returns_view").select("*");
      const { data: damagedData } = await supabase.from("damaged_goods_view").select("*");

      setPosData(pos || []);
      setReturns(returnsData || []);
      setDamaged(damagedData || []);
      setLoading(false);
    }

    loadData();
  }, []);

  return (
    <ProtectedRoute allowedRoles={[Roles.Cashier]}>
      <div className="p-6 max-w-full">
        <h1 className="text-2xl font-extrabold mb-4">Cashier Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">POS</h2>
              <pre>{JSON.stringify(posData, null, 2)}</pre>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Returns</h2>
              <pre>{JSON.stringify(returns, null, 2)}</pre>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Damaged Goods</h2>
              <pre>{JSON.stringify(damaged, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
