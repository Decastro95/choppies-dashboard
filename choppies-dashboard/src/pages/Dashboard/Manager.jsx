import Layout from "../../components/Layout";
import withRoleGuard from "../../components/withRoleGuard";

function Manager() {
  return <Layout><h1>Manager Dashboard</h1></Layout>;
}
export default withRoleGuard(Manager, "manager");
