import { FaBell, FaTimes } from "react-icons/fa";
import useNotifications from "../../hooks/useNotifications";


const NotificationsDropdown = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    deleteNotification,
  } = useNotifications();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle relative">
        <FaBell />
        {unreadCount > 0 && (
          <span className="badge badge-error absolute -top-1 -right-1">
            {unreadCount}
          </span>
        )}
      </label>

      <ul className="dropdown-content menu shadow bg-base-100 rounded-box w-80 max-h-96 overflow-y-auto">
        <li className="font-semibold text-center py-2">Notifications</li>

        {notifications.length === 0 && (
          <li className="text-center py-4 text-gray-500">
            No notifications
          </li>
        )}

        {notifications.map((n) => (
          <li
            key={n._id}
            className={`cursor-pointer hover:bg-base-200 flex justify-between items-center p-2 ${
              !n.is_read ? "bg-gray-100" : ""
            }`}
          >
            <div
              onClick={() => {
                markAsRead(n._id);
                // You can navigate to relevant page if needed
              }}
            >
              <p className="text-sm">{n.message}</p>
              <p className="text-xs text-gray-400">
                {new Date(n.created_at).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => deleteNotification(n._id)}
              className="btn btn-xs btn-ghost text-red-500"
            >
              <FaTimes />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsDropdown;
