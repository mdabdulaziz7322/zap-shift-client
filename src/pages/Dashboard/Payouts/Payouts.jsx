import React from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const Payouts = () => {
    const axiosSecure = useAxiosSecure();

    // 🔹 Fetch pending cashouts
    const {
        data: pendingCashouts = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["pendingCashouts"],
        queryFn: async () => {
           const res = await axiosSecure.get("/admin/payouts?cashout_status=pending");
            return res.data.data;
        },
    });

    // 🔹 Calculate rider earning
    const calculateEarning = (parcel) => {
        if (parcel.senderDistrict === parcel.receiverDistrict) {
            return Math.round(parcel.deliveryCost * 0.4); // same district
        }
        if (parcel.senderRegion === parcel.receiverRegion) {
            return Math.round(parcel.deliveryCost * 0.3); // same region
        }
        return Math.round(parcel.deliveryCost * 0.25);
    };

    // 🔹 Approve cashout
    const handleApprove = async (parcelId) => {
        const result = await Swal.fire({
            title: "Approve Cashout?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Approve",
        });

        if (!result.isConfirmed) return;

        try {
            await axiosSecure.patch(`/parcels/${parcelId}/approve-cashout`);

            Swal.fire({
                icon: "success",
                title: "Cashout approved!",
                timer: 1500,
                showConfirmButton: false,
            });

            refetch();
        } catch (error) {
            Swal.fire(
                "Error",
                error?.response?.data?.message || "Approval failed",
                "error"
            );
        }
    };

    if (isLoading) {
        return <p className="text-center py-20">Loading pending payouts...</p>;
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Pending Payouts</h1>

            {/* ================= TABLE (DESKTOP) ================= */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Tracking ID</th>
                            <th>Rider Name</th>
                            <th>Parcel Cost</th>
                            <th>Rider Earning</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingCashouts.map((parcel) => {
                            const earning = calculateEarning(parcel);

                            return (
                                <tr key={parcel._id}>
                                    <td>{parcel.tracking_id}</td>
                                    <td>{parcel.assigned_rider_name}</td>
                                    <td>৳{parcel.deliveryCost}</td>
                                    <td>৳{earning}</td>
                                    <td>
                                        <button
                                            className="btn btn-xs btn-success"
                                            onClick={() => handleApprove(parcel._id)}
                                        >
                                            Approve
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* ================= CARDS (MOBILE) ================= */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {pendingCashouts.map((parcel) => {
                    const earning = calculateEarning(parcel);

                    return (
                        <div key={parcel._id} className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title">{parcel.tracking_id}</h2>
                                <p>
                                    <b>Rider:</b> {parcel.assigned_rider_name}
                                </p>
                                <p>
                                    <b>Parcel Cost:</b> ৳{parcel.deliveryCost}
                                </p>
                                <p className="font-semibold">
                                    <b>Rider Earning:</b> ৳{earning}
                                </p>
                                <button
                                    className="btn btn-sm btn-success mt-3 w-full"
                                    onClick={() => handleApprove(parcel._id)}
                                >
                                    Approve
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {pendingCashouts.length === 0 && (
                <p className="text-center text-gray-500 mt-10">
                    No pending payouts 🎉
                </p>
            )}
        </section>
    );
};

export default Payouts;
