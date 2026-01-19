import { useState, useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";
import UseAuth from "./UseAuth";

const useNotifications = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();
    const [notifications, setNotifications] = useState([]);

    // 🔹 Fetch notifications from backend
    const fetchNotifications = async () => {
        if (!user?.email) return; // wait until user email is available

        try {
            const res = await axiosSecure.get("/notifications", {
                params: { email: user.email }, // backend will resolve role
            });
            setNotifications(res.data.data);
        } catch (err) {
            console.error("Failed to fetch notifications:", err);
        }
    };

    // 🔹 Mark notification as read
    const markAsRead = async (id) => {
        try {
            await axiosSecure.patch(`/notifications/${id}/read`);
            setNotifications((prev) =>
                prev.map((n) => (n._id === id ? { ...n, is_read: true } : n))
            );
        } catch (err) {
            console.error("Failed to mark as read:", err);
        }
    };

    // 🔹 Delete notification
    const deleteNotification = async (id) => {
        try {
            await axiosSecure.delete(`/notifications/${id}`);
            setNotifications((prev) => prev.filter((n) => n._id !== id));
        } catch (err) {
            console.error("Failed to delete notification:", err);
        }
    };

    const unreadCount = notifications.filter((n) => !n.is_read).length;

    // 🔹 Load notifications once the user email is available
    useEffect(() => {
        fetchNotifications();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.email]); // run only when email is set

    return {
        notifications,
        unreadCount,
        fetchNotifications,
        markAsRead,
        deleteNotification,
    };
};

export default useNotifications;
