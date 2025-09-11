import Layout from "../../components/Layout";
import withRoleGuard from "../../components/withRoleGuard";

function Admin() {
  return <Layout><h1>Admin Dashboard</h1></Layout>;
}
export default withRoleGuard(Admin, "admin");
