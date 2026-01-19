import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";



const useUserRole = () => {
    const { user, loading } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["userRole", user?.email],
        enabled: !loading && !!user?.email, // wait until auth is ready
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/users/role?email=${user.email}`
            );
            return res.data.role;
        },
    });

    return {
        role: data || "user",
        roleLoading: isLoading,
        refetchRole: refetch,
    };
};

export default useUserRole;
