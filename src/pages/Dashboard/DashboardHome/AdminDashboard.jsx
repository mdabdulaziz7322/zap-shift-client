import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from "chart.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["adminDashboard"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/dashboard");
            return res.data;
        }
    });

    if (isLoading) {
        return <p className="text-center py-10">Loading dashboard...</p>;
    }

    // 📊 Chart 1: Parcels by Status
    const statusChart = {
        labels: stats.parcelsByStatus?.map(s => s._id),
        datasets: [
            {
                label: "Parcels",
                data: stats.parcelsByStatus?.map(s => s.count),
                backgroundColor: ["#22c55e", "#f97316", "#3b82f6"]
            }
        ]
    };

    // 📊 Chart 2: Parcels per Rider
    const riderChart = {
        labels: stats.parcelsPerRider?.map(r => r._id),
        datasets: [
            {
                label: "Parcels",
                data: stats.parcelsPerRider?.map(r => r.count),
                backgroundColor: "#6366f1"
            }
        ]
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Overview</h1>

            {/* ===== STAT CARDS ===== */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Parcels" value={stats.totalParcels?.[0]?.count || 0} />
                <StatCard title="In Transit" value={stats.inTransit?.[0]?.count || 0} />
                <StatCard title="Delivered" value={stats.delivered?.[0]?.count || 0} />
                <StatCard title="Pending Payment" value={stats.pendingPayment?.[0]?.count || 0} />
                <StatCard title="Total Revenue" value={`৳${stats.totalRevenue?.[0]?.total || 0}`} />
                <StatCard title="Total Users" value={stats.totalUsers || 0} />
                <StatCard title="Total Riders" value={stats.totalRiders || 0} />
            </div>

            {/* ===== CHARTS ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold mb-4">Parcels by Status</h3>
                    <Pie data={statusChart} />
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold mb-4">Parcels per Rider</h3>
                    <Bar data={riderChart} />
                </div>
            </div>
        </section>
    );
};

const StatCard = ({ title, value }) => (
    <div className="bg-white p-4 rounded shadow text-center">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

export default AdminDashboard;
