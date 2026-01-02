import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import ZapShiftLogo from '../pages/shared/ZapShiftLogo/ZapShiftLogo';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
                <div className="h-16 flex items-center px-6 font-bold text-xl ">
                    <ZapShiftLogo></ZapShiftLogo>
                </div>

                {/* Menu */}
                <nav className="px-4 py-4 space-y-2">
                    <NavLink
                        to="/dashboard"
                        className="btn btn-ghost justify-start w-full"
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/dashboard/my-parcels"
                        className="btn btn-ghost justify-start w-full"
                    >
                        My Parcels
                    </NavLink>

                    <NavLink
                        to="/dashboard/invoices"
                        className="btn btn-ghost justify-start w-full"
                    >
                        Invoices
                    </NavLink>

                    <NavLink
                        to="/dashboard/stores"
                        className="btn btn-ghost justify-start w-full"
                    >
                        Stores
                    </NavLink>
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
                    <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-8 h-8 flex items-center justify-center">
                                <span>ZH</span>
                            </div>
                        </div>
                        <span className="font-medium hidden sm:block">Zahid Hossain</span>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 md:p-6 overflow-x-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
