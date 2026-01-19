import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTracking from "../../../hooks/useTracking";


const PendingDeliveries = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const { addTrackingStep } = useTracking();

  // 🔹 Fetch rider parcels
  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ["riderParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/parcels?email=${user.email}`
      );
      return res.data;
    },
  });

  // 🔹 Handle status update
  const handleStatusUpdate = async (parcel, newStatus) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Mark parcel as ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/parcels/${parcel._id}/delivery-status`, {
        delivery_status: newStatus,
      });

      Swal.fire({
        icon: "success",
        title: "Status updated",
        timer: 1200,
        showConfirmButton: false,
      });

      if (newStatus === 'In Transit') {
        await addTrackingStep({
          tracking_id: parcel.tracking_id,
          status: "picked_up",
          label: `Parcel picked up by ${user.displayName}`,
          updated_by: user.email
        });
      }
      if (newStatus === 'Delivered') {
        await addTrackingStep({
          tracking_id: parcel.tracking_id,
          status: "Delivered",
          label: `Parcel delivered by ${user.displayName}`,
          updated_by: user.email
        });
      }
      

      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to update status", error);
    }
  };

  if (isLoading) {
    return <p className="text-center py-20">Loading deliveries...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Pending Deliveries</h1>

      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map(parcel => (
              <tr key={parcel._id}>
                <td>{parcel.tracking_id}</td>
                <td>
                  {parcel.senderName} <br />
                  <span className="text-xs text-gray-500">
                    {parcel.senderDistrict}
                  </span>
                </td>
                <td>
                  {parcel.receiverName} <br />
                  <span className="text-xs text-gray-500">
                    {parcel.receiverDistrict}
                  </span>
                </td>
                <td>
                  <span className="badge badge-info">
                    {parcel.delivery_status}
                  </span>
                </td>
                <td>
                  {parcel.delivery_status === "Rider Assigned" && (
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={() =>
                        handleStatusUpdate(parcel, "In Transit")
                      }
                    >
                      Mark Picked Up
                    </button>
                  )}

                  {parcel.delivery_status === "In Transit" && (
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() =>
                        handleStatusUpdate(parcel, "Delivered")
                      }
                    >
                      Mark Delivered
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
        {data.map(parcel => (
          <div key={parcel._id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="font-semibold">
                Tracking: {parcel.tracking_id}
              </h2>

              <p>
                <b>Sender:</b> {parcel.senderName} (
                {parcel.senderDistrict})
              </p>

              <p>
                <b>Receiver:</b> {parcel.receiverName} (
                {parcel.receiverDistrict})
              </p>

              <span className="badge badge-info w-fit">
                {parcel.delivery_status}
              </span>

              {parcel.delivery_status === "Rider Assigned" && (
                <button
                  className="btn btn-sm btn-primary mt-3"
                  onClick={() =>
                    handleStatusUpdate(parcel._id, "In Transit")
                  }
                >
                  Picked Up
                </button>
              )}

              {parcel.delivery_status === "In Transit" && (
                <button
                  className="btn btn-sm btn-success mt-3"
                  onClick={() =>
                    handleStatusUpdate(parcel._id, "Delivered")
                  }
                >
                  Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No pending deliveries 🚚
        </p>
      )}
    </section>
  );
};

export default PendingDeliveries;
