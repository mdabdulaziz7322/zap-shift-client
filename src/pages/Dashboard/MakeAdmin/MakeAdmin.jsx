import { useState } from "react";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [emailQuery, setEmailQuery] = useState("");

    const {
        data: users = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["searchUsers", emailQuery],
        enabled: !!emailQuery, // 🚫 do not auto fetch
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/users/search?email=${emailQuery}`
            );
            return res.data; // backend already returns array
        },
    });

    // 🔍 TRIGGER SEARCH
    const handleSearch = () => {
        if (!emailQuery) {
            Swal.fire("Type an email to search");
            return;
        }
        refetch();
    };

    // 🔄 ROLE UPDATE
    const handleRoleChange = async (user, role) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: `Change role to ${role}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
        });

        if (!confirm.isConfirmed) return;

        await axiosSecure.patch(`/users/${user._id}/role`, { role });

        Swal.fire("Success", "Role updated successfully", "success");

        // 🔁 refresh results
        refetch();
    };

    return (
        <section className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Make Admin</h1>

            {/* SEARCH BAR */}
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Search by email (partial allowed)"
                    className="input input-bordered w-full"
                    value={emailQuery}
                    onChange={(e) => setEmailQuery(e.target.value)}
                />
                <button className="btn bg-[#CAEB66]" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {isLoading && <p>Loading...</p>}

            {/* RESULTS */}
            <div className="space-y-4">
                {users.map((user) => (
                    <div
                        key={user._id}
                        className="card bg-base-100 shadow-md"
                    >
                        <div className="card-body flex-row items-center gap-4">
                            <img
                                src={user.profilePic}
                                alt="profile"
                                className="w-14 h-14 rounded-full"
                            />

                            <div className="flex-1">
                                <h2 className="font-semibold">{user.name}</h2>
                                <p className="text-sm">{user.email}</p>
                                <p className="text-sm">
                                    Role: <strong>{user.role}</strong>
                                </p>
                            </div>

                            {user.role !== "admin" ? (
                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={() =>
                                        handleRoleChange(user, "admin")
                                    }
                                >
                                    Make Admin
                                </button>
                            ) : (
                                <button
                                    className="btn btn-error btn-sm"
                                    onClick={() =>
                                        handleRoleChange(user, "user")
                                    }
                                >
                                    Remove Admin
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {users.length === 0 && !isLoading && (
                    <p className="text-center text-gray-500">
                        No users found
                    </p>
                )}
            </div>
        </section>
    );
};

export default MakeAdmin;
