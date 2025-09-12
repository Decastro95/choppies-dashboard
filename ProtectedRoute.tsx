import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !allowedRoles.includes(role))) {
      router.replace("/unauthorized");
    }
  }, [user, role, loading]);

  if (loading || !user) return <p>Loading...</p>;
  return children;
};

export default ProtectedRoute;
