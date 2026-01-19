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

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const RiderDashboard = () => {
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["riderDashboard"],
        queryFn: async () => {
            const res = await axiosSecure.get("/rider/dashboard");
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center py-10">Loading...</p>;

    // Prepare charts
    const barData = {
        labels: data.statusAggregation.map(item => item._id),
        datasets: [
            {
                label: "Parcels",
                data: data.statusAggregation.map(item => item.count),
                backgroundColor: ["#22c55e", "#f59e0b"]
            }
        ]
    };

    const pieData = {
        labels: data.cashOutAggregation.map(item => item._id),
        datasets: [
            {
                label: "Cash-out Status",
                data: data.cashOutAggregation.map(item => item.count),
                backgroundColor: ["#3b82f6", "#ef4444"]
            }
        ]
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">OverView</h1>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="card bg-white p-4 shadow rounded">
                    <h2>Total Assigned Parcels</h2>
                    <p className="text-xl font-bold">{data.totalParcels}</p>
                </div>
                <div className="card bg-white p-4 shadow rounded">
                    <h2>In Transit</h2>
                    <p className="text-xl font-bold">{data.inTransit}</p>
                </div>
                <div className="card bg-white p-4 shadow rounded">
                    <h2>Delivered</h2>
                    <p className="text-xl font-bold">{data.delivered}</p>
                </div>
                <div className="card bg-white p-4 shadow rounded">
                    <h2>Pending Cash-outs</h2>
                    <p className="text-xl font-bold">{data.pendingCashOut}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="card p-4 bg-white shadow rounded">
                    <h2 className="font-semibold mb-2">Parcel Status</h2>
                    <Bar data={barData} />
                </div>

                <div className="card p-4 bg-white shadow rounded">
                    <h2 className="font-semibold mb-2">Cash-out Status</h2>
                    <Pie data={pieData} />
                </div>
            </div>
        </div>
    );
};

export default RiderDashboard;
