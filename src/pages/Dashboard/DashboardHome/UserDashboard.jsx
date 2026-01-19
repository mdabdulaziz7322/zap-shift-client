import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();

    // ✅ Fetch user parcels
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["userDashboard", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <p className="text-center py-10">Loading dashboard...</p>;
    }

    // ✅ Compute stats
    const totalParcels = parcels.length;
    const inTransit = parcels.filter(p => p.delivery_status === "In Transit").length;
    const delivered = parcels.filter(p => p.delivery_status === "Delivered").length;
    const totalCostPaid = parcels
        .filter(p => p.payment_status === "paid")
        .reduce((acc, p) => acc + (p.deliveryCost || 0), 0);

    // ✅ Prepare pie chart data
    const chartData = {
        labels: ["In Transit", "Delivered"],
        datasets: [
            {
                label: "Parcel Status",
                data: [inTransit, delivered],
                backgroundColor: ["#facc15", "#22c55e"], // yellow & green
                borderColor: ["#fbbf24", "#16a34a"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <section className="py-8 bg-base-200">
            <div className="max-w-6xl mx-auto px-4">

                <h1 className="text-3xl font-bold mb-6">Welcome, {user.displayName || user.email}</h1>

                {/* ================= CARDS ================= */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="card bg-white shadow p-6">
                        <p className="text-gray-500">Total Parcels Sent</p>
                        <p className="text-3xl font-bold">{totalParcels}</p>
                    </div>

                    <div className="card bg-white shadow p-6">
                        <p className="text-gray-500">In Transit</p>
                        <p className="text-3xl font-bold">{inTransit}</p>
                    </div>

                    <div className="card bg-white shadow p-6">
                        <p className="text-gray-500">Delivered</p>
                        <p className="text-3xl font-bold">{delivered}</p>
                    </div>

                    <div className="card bg-white shadow p-6">
                        <p className="text-gray-500">Total Cost Paid</p>
                        <p className="text-3xl font-bold">৳{totalCostPaid}</p>
                    </div>
                </div>

                {/* ================= PIE CHART ================= */}
                <div className="bg-white shadow p-6 rounded-xl">
                    <h2 className="text-xl font-semibold mb-4">Parcel Status Distribution</h2>
                    <Pie data={chartData} />
                </div>
            </div>
        </section>
    );
};

export default UserDashboard;
