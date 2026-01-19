import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import TrackingTimeline from "./TrackingTimeline";


const TrackParcel = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();
    const [activeTrackingId, setActiveTrackingId] = useState(null);

    // ✅ YOUR EXISTING API
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["my-parcels", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/parcels?email=${user.email}`
            );
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6">Track Your Parcels</h2>

            {parcels.length === 0 && (
                <p className="text-gray-500">No parcels found</p>
            )}

            {parcels.map(parcel => (
                <div
                    key={parcel._id}
                    className="bg-white shadow-sm rounded-lg p-4 mb-3"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold">
                                parcel Name: {parcel.parcelName}
                            </p>
                            <p className="font-semibold">
                                Tracking ID: {parcel.tracking_id}
                            </p>
                            <p className="text-sm text-gray-600">
                                Status: {parcel.delivery_status}
                            </p>
                        </div>

                        <button
                            className="btn btn-sm bg-[#CAEB66]"
                            onClick={() =>
                                setActiveTrackingId(parcel.tracking_id)
                            }
                        >
                            Track
                        </button>
                    </div>

                    {/* Timeline */}
                    {activeTrackingId === parcel.tracking_id && (
                        <TrackingTimeline
                            trackingId={parcel.tracking_id}
                            onBack={() => setActiveTrackingId(null)}
                        />
                    )}

                </div>
            ))}
        </div>
    );
};

export default TrackParcel;
