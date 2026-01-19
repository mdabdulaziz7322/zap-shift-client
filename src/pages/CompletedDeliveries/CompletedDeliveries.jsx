
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UseAuth from "../../hooks/UseAuth";


const CompletedDeliveries = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();



    const {
        data: completedParcels = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["completedDeliveries", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get("/rider/completed-parcels");
            return res.data.data;
        },
    });

    // 🧮 Earning logic
    const calculateEarning = (parcel) => {
        if (parcel.senderDistrict === parcel.receiverDistrict) {
            return Math.round(parcel.deliveryCost * 0.4); // same district
        }
        if (parcel.senderRegion === parcel.receiverRegion) {
            return Math.round(parcel.deliveryCost * 0.3); // same region
        }
        return Math.round(parcel.deliveryCost * 0.25);
    };

    // 💰 Cash out handler
    const handleCashOut = async (parcelId, amount) => {
        const result = await Swal.fire({
            title: "Cash Out?",
            text: `You will receive ৳${amount}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Cash Out",
        });

        if (!result.isConfirmed) return;

        try {
            await axiosSecure.patch(`/parcels/${parcelId}/cash-out`);

            Swal.fire({
                icon: "success",
                title: "Your cash-out request has been sent",
                timer: 1500,
                showConfirmButton: false,
            });

            refetch();
        } catch (error) {
            Swal.fire(
                "Error",
                error?.response?.data?.message || "Cashout failed",
                "error"
            );
        }
    };

    if (isLoading) {
        return <p className="text-center py-20">Loading completed deliveries...</p>;
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Completed Deliveries</h1>

            {/* ===================== TABLE (DESKTOP) ===================== */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Tracking ID</th>
                            <th>Route</th>
                            <th>Picked At</th>
                            <th>Delivered At</th>
                            <th>Cost</th>
                            <th>Your Earning</th>
                            <th>Cashout</th>
                        </tr>
                    </thead>

                    <tbody>
                        {completedParcels.map((parcel) => {
                            const earning = calculateEarning(parcel);

                            return (
                                <tr key={parcel._id}>
                                    <td>{parcel.tracking_id}</td>
                                    <td>
                                        {parcel.senderDistrict} → {parcel.receiverDistrict}
                                    </td>
                                    <td>
                                        {parcel.pickup_at
                                            ? new Date(parcel.pickup_at).toLocaleString()
                                            : "-"}
                                    </td>
                                    <td>
                                        {parcel.delivered_at
                                            ? new Date(parcel.delivered_at).toLocaleString()
                                            : "-"}
                                    </td>
                                    <td>৳{parcel.deliveryCost}</td>
                                    <td className="font-semibold">৳{earning}</td>
                                    <td>
                                        {parcel.cashout_status === "pending" ? (
                                            <button className="btn btn-xs btn-warning btn-disabled">Pending</button>
                                        ) : parcel.cashout_status === "cashed_out" ? (
                                            <button className="btn btn-xs btn-success btn-disabled">Paid Out</button>
                                        ) : (
                                            <button
                                                className="btn btn-xs btn-primary"
                                                onClick={() => handleCashOut(parcel._id, earning)}
                                            >
                                                Cash Out
                                            </button>
                                        )}

                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* ===================== CARDS (MOBILE) ===================== */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {completedParcels.map((parcel) => {
                    const earning = calculateEarning(parcel);

                    return (
                        <div key={parcel._id} className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title">{parcel.tracking_id}</h2>

                                <p>
                                    <b>Route:</b>{" "}
                                    {parcel.senderDistrict} → {parcel.receiverDistrict}
                                </p>
                                <p>
                                    <b>Picked At:</b>{" "}
                                    {parcel.pickup_at
                                        ? new Date(parcel.pickup_at).toLocaleString()
                                        : "-"}
                                </p>
                                <p>
                                    <b>Delivered At:</b>{" "}
                                    {parcel.delivered_at
                                        ? new Date(parcel.delivered_at).toLocaleString()
                                        : "-"}
                                </p>
                                <p>
                                    <b>Cost:</b> ৳{parcel.deliveryCost}
                                </p>
                                <p className="font-semibold">
                                    <b>Your Earning:</b> ৳{earning}
                                </p>

                                {parcel.cashout_status === "pending" ? (
                                    <button className="btn btn-xs btn-warning btn-disabled">Pending</button>
                                ) : parcel.cashout_status === "cashed_out" ? (
                                    <button className="btn btn-xs btn-success btn-disabled">Paid Out</button>
                                ) : (
                                    <button
                                        className="btn btn-xs btn-primary"
                                        onClick={() => handleCashOut(parcel._id, earning)}
                                    >
                                        Cash Out
                                    </button>
                                )}

                            </div>
                        </div>
                    );
                })}
            </div>

            {completedParcels.length === 0 && (
                <p className="text-center text-gray-500 mt-10">
                    No completed deliveries yet 🚚
                </p>
            )}
        </section>
    );
};

export default CompletedDeliveries;
