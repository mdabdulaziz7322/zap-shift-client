import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const TrackingTimeline = ({ trackingId, onBack }) => {
    const axiosSecure = useAxiosSecure();

    const { data = [], isLoading } = useQuery({
        queryKey: ["tracking", trackingId],
        enabled: !!trackingId,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/tracking/${trackingId}`
            );
            return res.data.timeline;
        },
    });

    if (isLoading) return <p className="mt-3">Loading tracking...</p>;

    return (
        <div className="mt-4 border-t pt-4">

            {/* 🔙 BACK BUTTON */}
            <button
                onClick={onBack}
                className="btn btn-sm btn-ghost mb-4"
            >
                ← Back to My Parcels
            </button>

            {data.length === 0 ? (
                <p className="text-gray-500">No tracking updates yet</p>
            ) : (
                <ul className="timeline timeline-vertical">
                    {data.map((step, index) => (
                        <li key={index}>
                            <div className="timeline-start text-xs">
                                {new Date(step.updated_at).toLocaleString()}
                            </div>
                            <div className="timeline-middle">✔</div>
                            <div className="timeline-end">
                                <p className="font-medium">{step.label}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TrackingTimeline;
