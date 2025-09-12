import Layout from "../../components/Layout";
import withRoleGuard from "../../components/withRoleGuard";

function Ceo() {
  return (
    <Layout>
      <h1>CEO Dashboard</h1>
    </Layout>
  );
}
export default withRoleGuard(Ceo, "ceo");
