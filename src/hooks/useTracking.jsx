import useAxiosSecure from "./useAxiosSecure";


const useTracking = () => {
  const axiosSecure = useAxiosSecure();

  const addTrackingStep = async ({
    tracking_id,
    status,
    label,
    updated_by
  }) => {
    try {
      await axiosSecure.post("/tracking", {
        tracking_id,
        status,
        label,
        updated_by
      });
    } catch (error) {
      console.error("Tracking error:", error);
    }
  };

  return { addTrackingStep };
};

export default useTracking;
