import { Navigate } from "react-router";
import UseAuth from "../hooks/UseAuth";
import useUserRole from "../hooks/useUserRole";


const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/forbidden" />;
};

export default AdminRoute;
