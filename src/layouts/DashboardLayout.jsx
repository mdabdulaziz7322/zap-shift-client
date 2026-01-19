import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import ZapShiftLogo from '../pages/shared/ZapShiftLogo/ZapShiftLogo';
import { FaTachometerAlt, FaBoxOpen, FaStore, FaMoneyCheckAlt, FaBell, FaDoorOpen, FaArrowLeft } from "react-icons/fa";
import { FaUserCheck, FaUserTimes, FaTruckMoving, FaTruckLoading, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import PaymentModal from '../pages/Payment/PaymentModal';
import { FaUserShield } from "react-icons/fa";
import useUserRole from '../hooks/useUserRole';
import UseAuth from '../hooks/UseAuth';
import NotificationsDropdown from '../pages/NotificationsDropdown/NotificationsDropdown';




const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { user } = UseAuth();
    const navigate = useNavigate();




    const { role, roleLoading } = useUserRole();
    console.log(role)

    /* ================= LOAD NOTIFICATIONS ================= */

    const navLinkClass = ({ isActive }) =>
        `btn btn-ghost justify-start w-full gap-3 text-base ${isActive
            ? "bg-[#CAEB66] text-black "
            : "text-gray-600 hover:bg-[#CAEB66]"
        }`;

    return (
        <div className="min-h-screen bg-base-200 flex">
            {/* Sidebar */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-base-100 
          transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
        `}
            >
                {/* Logo */}
                <div className="h-16 flex items-center just  px-6 font-bold text-xl ">
                    <ZapShiftLogo></ZapShiftLogo>

                </div>


                {/* Menu */}
                <nav className="px-4 py-4 space-y-2">

                    {!roleLoading && role === 'user' &&
                        <>
                            <NavLink to="/dashboard/my-parcels" className={navLinkClass}>
                                <FaBoxOpen size={18} />
                                My Parcels
                            </NavLink>

                            <NavLink to="/dashboard/payment-history" className={navLinkClass}>
                                <MdPayment size={18} />
                                Payment History
                            </NavLink>

                            <NavLink to="/dashboard/track-parcel" className={navLinkClass}>
                                <FaStore size={18} />
                                Track Parcel
                            </NavLink>

                        </>
                    }

                    {/* Rider routes */}

                    {!roleLoading && role === 'rider' &&
                        <>
                            <NavLink to="/dashboard/pending-deliveries" className={navLinkClass}>
                                <FaTruckLoading size={18} />
                                <span>Pending Deliveries</span>
                            </NavLink>

                            <NavLink to="/dashboard/completed-deliveries" className={navLinkClass}>
                                <FaCheckCircle size={18} />
                                <span>Completed Deliveries</span>
                            </NavLink>

                            <NavLink to="/dashboard/rider-earnings" className={navLinkClass}>
                                <FaMoneyBillWave size={18} />
                                <span>My Earnings</span>
                            </NavLink>

                        </>


                    }

                    {/* Admin routes */}
                    {!roleLoading && role === 'admin' &&
                        <>
                            <NavLink
                                to="/dashboard/assign-rider"
                                className={navLinkClass}
                            >
                                <FaTruckMoving className="text-lg" />
                                <span>Assign Rider</span>
                            </NavLink>
                            <NavLink to="/dashboard/active-riders" className={navLinkClass}>
                                <FaUserCheck size={18} />
                                Active Riders
                            </NavLink>
                            <NavLink to="/dashboard/pending-riders" className={navLinkClass}>
                                <FaUserTimes size={18} />
                                Pending Riders
                            </NavLink>
                            <NavLink to="/dashboard/payouts" className={navLinkClass}>
                                <FaMoneyCheckAlt size={18} />
                                Payouts
                            </NavLink>
                            <NavLink
                                to="/dashboard/make-admin"
                                className={navLinkClass}
                            >
                                <FaUserShield className="text-lg" />
                                <span>Make Admin</span>
                            </NavLink>
                        </>
                    }
                </nav>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main section */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="h-16 w-full bg-base-100  flex items-center justify-between px-4">
                    {/* LEFT: Mobile menu button */}
                    <div className="flex items-center gap-2">
                        <button
                            className="btn btn-ghost lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            ☰
                        </button>

                    </div>

                    {/* RIGHT: User info */}
                    <div className="flex items-center gap-4">
                        <NotificationsDropdown />
                        <img
                            src={user?.photoURL}
                            className="w-8 h-8 rounded-full"
                            alt="User"
                        />
                        <span>{user?.displayName}</span>
                    </div>

                </header>

                {/* Page content */}
                <main className="p-4 md:p-6 overflow-x-auto">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#CAEB66] hover:bg-[#b6d84f] transition"
                        title="Back to Home"
                    >
                        <FaArrowLeft className="text-black" />
                    </button>
                    <Outlet />
                    <PaymentModal />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
