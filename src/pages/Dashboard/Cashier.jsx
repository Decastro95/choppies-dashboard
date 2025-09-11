import Layout from "../../components/Layout";
import withRoleGuard from "../../components/withRoleGuard";

function Cashier() {
  return <Layout><h1>Cashier Dashboard</h1></Layout>;
}
export default withRoleGuard(Cashier, "cashier");
