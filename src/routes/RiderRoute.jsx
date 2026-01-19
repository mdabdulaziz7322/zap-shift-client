import { Navigate } from "react-router";
import UseAuth from "../hooks/UseAuth";
import useUserRole from "../hooks/useUserRole";

const RiderRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) return <p>Loading...</p>;

    if (user && role === "rider") return children;

    return <Navigate to="/forbidden" />;
};


export default RiderRoute;