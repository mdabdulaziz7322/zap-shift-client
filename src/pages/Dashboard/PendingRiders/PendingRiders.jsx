import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  const riders = data?.data || [];

  const handleAction = async (id, action, email) => {
    const status = action === "approve" ? "active" : "rejected";

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${action} this rider`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/riders/${id}/status`, { status, email });

      Swal.fire({
        icon: "success",
        title: `Rider ${action}d successfully`,
        timer: 1500,
        showConfirmButton: false,
      });

      refetch(); // reload updated list
    } catch (error) {
      Swal.fire("Error", "Something went wrong", error);
    }
  };

  const handleView = (rider) => {
    Swal.fire({
      title: `<strong>${rider.name}</strong>`,
      html: `
        <div style="text-align:left; line-height:1.5">
          <p><b>Email:</b> ${rider.email}</p>
          <p><b>Phone:</b> ${rider.phone}</p>
          <p><b>Age:</b> ${rider.age}</p>
          <p><b>Region:</b> ${rider.region}</p>
          <p><b>District:</b> ${rider.district}</p>
          <p><b>Bike Brand:</b> ${rider.bikeBrand}</p>
          <p><b>Bike Registration:</b> ${rider.bikeRegistration}</p>
          <p><b>National ID:</b> ${rider.nationalId}</p>
          <p><b>About:</b> ${rider.about}</p>
          <p><b>Status:</b> ${rider.status}</p>
        </div>
      `,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: "Close",
    });
  };

  if (isLoading) {
    return <p className="text-center py-20">Loading pending riders...</p>;
  }

  return (
    <section className="py-10 max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Pending Riders</h1>

      {/* Table for Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>{rider.phone}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => handleAction(rider._id, "approve", rider.email)}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => handleView(rider)}
                  >
                    View
                  </button>

                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleAction(rider._id, "reject", rider.email)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for Mobile */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {riders.map((rider) => (
          <div key={rider._id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">{rider.name}</h2>
              <p>Email: {rider.email}</p>
              <p>Phone: {rider.phone}</p>
              <p>Region: {rider.region}</p>
              <p>District: {rider.district}</p>

              <div className="flex gap-2 mt-4">
                <button
                  className="btn btn-sm btn-success flex-1"
                  onClick={() => handleAction(rider._id, "approve")}
                >
                  Approve
                </button>

                <button
                  className="btn btn-sm btn-info flex-1"
                  onClick={() => handleView(rider)}
                >
                  View
                </button>

                <button
                  className="btn btn-sm btn-error flex-1"
                  onClick={() => handleAction(rider._id, "reject")}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {riders.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No pending riders 🎉</p>
      )}
    </section>
  );
};

export default PendingRiders;
