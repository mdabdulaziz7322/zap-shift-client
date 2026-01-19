import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaMotorcycle } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTracking from "../../../hooks/useTracking";
import UseAuth from "../../../hooks/UseAuth";


const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [riders, setRiders] = useState([]);
  const { addTrackingStep } = useTracking();
  const {user} = UseAuth();

  // ✅ Fetch assignable parcels
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels?type=assignable");
      console.log(res.data)
      return res.data;
    },
  });

  // ✅ Load riders by district
  const loadRiders = async (district) => {
    const res = await axiosSecure.get(
      `/riders/active?district=${district}`
    );
    setRiders(res.data);
  };

  // ✅ Assign rider
  const handleAssign = async (rider) => {
    const result = await Swal.fire({
      title: "Confirm Assignment?",
      text: `Assign ${rider.name} to this parcel?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Assign",
    });

    if (!result.isConfirmed) return;

    await axiosSecure.patch(
      `/parcels/${selectedParcel._id}/assign-rider`,
      {
        riderId: rider._id,
        riderName: rider.name,
        riderEmail: rider.email
      }
    );

    await addTrackingStep({
      tracking_id: selectedParcel.tracking_id,
      status: "Rider Assigned",
      label: `Rider ${rider.name} assigned`,
      updated_by: user.email
    });

    Swal.fire("Assigned!", "Rider assigned successfully", "success");
    setSelectedParcel(null);
    setRiders([]);
    refetch();
  };

  if (isLoading) {
    return <p className="text-center py-10">Loading parcels...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Assign Rider to Parcels
      </h1>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <h3>pending parcels</h3>
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Sender</th>
              <th>District</th>
              <th>Cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td>{parcel.tracking_id}</td>
                <td>{parcel.senderName}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.deliveryCost}৳</td>
                <td>
                  <button
                    className="btn btn-sm bg-[#CAEB66]"
                    onClick={() => {
                      setSelectedParcel(parcel);
                      loadRiders(parcel.senderDistrict);
                    }}
                  >
                    <FaMotorcycle /> Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden grid gap-4">
        {parcels.map((parcel) => (
          <div key={parcel._id} className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="font-bold">
                {parcel.tracking_id}
              </h2>
              <p>Sender: {parcel.senderName}</p>
              <p>District: {parcel.senderDistrict}</p>
              <p>Cost: {parcel.deliveryCost}৳</p>

              <button
                className="btn bg-[#CAEB66] mt-2"
                onClick={() => {
                  setSelectedParcel(parcel);
                  loadRiders(parcel.senderDistrict);
                }}
              >
                <FaMotorcycle /> Assign Rider
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {selectedParcel && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Available Riders ({selectedParcel.senderDistrict})
            </h3>

            {riders.length === 0 ? (
              <p>No riders found in this district</p>
            ) : (
              riders.map((rider) => (
                <div
                  key={rider._id}
                  className="flex justify-between items-center border p-2 mb-2 rounded"
                >
                  <div>
                    <p className="font-semibold">{rider.name}</p>
                    <p className="text-sm">{rider.phone}</p>
                  </div>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleAssign(rider)}
                  >
                    Assign
                  </button>
                </div>
              ))
            )}

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setSelectedParcel(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
};

export default AssignRider;
