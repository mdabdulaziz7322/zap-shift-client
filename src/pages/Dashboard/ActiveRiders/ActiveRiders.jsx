import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const ActiveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");

    // Fetch active riders
    const { data: riders = [], isLoading, refetch } = useQuery({
        queryKey: ["activeRiders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/active");
            return res.data; // array directly
        },
    });

    // Filter by search input
    const filteredRiders = search
        ? riders.filter((rider) =>
            rider.name.toLowerCase().includes(search.toLowerCase())
        )
        : riders;

    const handleDeactivate = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You want to deactivate this rider?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, deactivate",
        });

        if (!result.isConfirmed) return;

        try {
            await axiosSecure.patch(`/riders/${id}/status`, { status: "deactivated" });

            Swal.fire({
                icon: "success",
                title: "Rider deactivated!",
                timer: 1500,
                showConfirmButton: false,
            });

            refetch(); // refresh the list
        } catch (error) {
            Swal.fire("Error", "Something went wrong", error);
        }
    };

    if (isLoading) {
        return <p className="text-center py-20">Loading active riders...</p>;
    }

    return (
        <section className="py-10 max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">Active Riders</h1>

            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="input input-bordered w-full md:w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* ================= TABLE (DESKTOP) ================= */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRiders.map((rider) => (
                            <tr key={rider._id}>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.region}</td>
                                <td>{rider.district}</td>
                                <td>{rider.phone}</td>
                                <td>
                                    <button
                                        className={`btn btn-xs ${rider.status === "deactivated" ? "btn-error" : "btn-success"
                                            }`}
                                        disabled={rider.status === "deactivated"}
                                    >
                                        {rider.status === "deactivated" ? "Deactivated" : "Active"}
                                    </button>
                                </td>
                                <td>
                                    {rider.status !== "deactivated" && (
                                        <button
                                            className="btn btn-xs btn-warning"
                                            onClick={() => handleDeactivate(rider._id)}
                                        >
                                            Deactivate
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= CARDS (MOBILE) ================= */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {filteredRiders.map((rider) => (
                    <div key={rider._id} className="card bg-base-100 shadow-md">
                        <div className="card-body">
                            <h2 className="card-title">{rider.name}</h2>
                            <p>Email: {rider.email}</p>
                            <p>Phone: {rider.phone}</p>
                            <p>Region: {rider.region}</p>
                            <p>District: {rider.district}</p>

                            <div className="flex gap-2 mt-4">
                                <button
                                    className={`btn btn-sm ${rider.status === "deactivated" ? "btn-error" : "btn-success"
                                        } flex-1`}
                                    disabled={rider.status === "deactivated"}
                                >
                                    {rider.status === "deactivated" ? "Deactivated" : "Active"}
                                </button>

                                {rider.status !== "deactivated" && (
                                    <button
                                        className="btn btn-sm btn-warning flex-1"
                                        onClick={() => handleDeactivate(rider._id)}
                                    >
                                        Deactivate
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredRiders.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No active riders found.</p>
            )}
        </section>
    );
};

export default ActiveRiders;
