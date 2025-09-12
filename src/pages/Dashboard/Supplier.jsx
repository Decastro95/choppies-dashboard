import Layout from "../../components/Layout";
import withRoleGuard from "../../components/withRoleGuard";

function Supplier() {
  return (
    <Layout>
      <h1>Supplier Dashboard</h1>
    </Layout>
  );
}
export default withRoleGuard(Supplier, "supplier");
