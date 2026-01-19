import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";


const MyEarnings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["myEarnings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/rider/completed-parcels");
      return res.data.data;
    },
  });

  // 🧮 Earning calculation
  const calculateEarning = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return Math.round(parcel.deliveryCost * 0.4);
    }
    if (parcel.senderRegion === parcel.receiverRegion) {
      return Math.round(parcel.deliveryCost * 0.3);
    }
    return Math.round(parcel.deliveryCost * 0.25);
  };

  // 🕒 Date helpers
  const now = new Date();

  const isToday = (date) => {
    const d = new Date(date);
    return d.toDateString() === now.toDateString();
  };

  const isThisWeek = (date) => {
    const d = new Date(date);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    return d >= startOfWeek;
  };

  const isThisMonth = (date) => {
    const d = new Date(date);
    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  };

  // 📊 Calculations
  let totalEarning = 0;
  let totalCashedOut = 0;
  let totalPending = 0;

  let todayEarning = 0;
  let weekEarning = 0;
  let monthEarning = 0;

  parcels.forEach((parcel) => {
    const earning = calculateEarning(parcel);
    totalEarning += earning;

    if (parcel.cashout_status === "cashed_out") {
      totalCashedOut += earning;
    } else {
      totalPending += earning;
    }

    if (isToday(parcel.delivered_at)) todayEarning += earning;
    if (isThisWeek(parcel.delivered_at)) weekEarning += earning;
    if (isThisMonth(parcel.delivered_at)) monthEarning += earning;
  });

  if (isLoading) {
    return <p className="text-center py-20">Loading earnings...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Earnings</h1>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body text-center">
            <h3 className="text-lg font-semibold">Total Earnings</h3>
            <p className="text-3xl font-bold text-primary">৳{totalEarning}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body text-center">
            <h3 className="text-lg font-semibold">Cashed Out</h3>
            <p className="text-3xl font-bold text-success">
              ৳{totalCashedOut}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body text-center">
            <h3 className="text-lg font-semibold">Pending</h3>
            <p className="text-3xl font-bold text-warning">
              ৳{totalPending}
            </p>
          </div>
        </div>
      </div>

      {/* ================= ANALYTICS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow">
          <div className="card-body text-center">
            <p className="text-sm text-gray-500">Today</p>
            <p className="text-2xl font-bold">৳{todayEarning}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body text-center">
            <p className="text-sm text-gray-500">This Week</p>
            <p className="text-2xl font-bold">৳{weekEarning}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body text-center">
            <p className="text-sm text-gray-500">This Month</p>
            <p className="text-2xl font-bold">৳{monthEarning}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body text-center">
            <p className="text-sm text-gray-500">Overall</p>
            <p className="text-2xl font-bold">৳{totalEarning}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyEarnings;
