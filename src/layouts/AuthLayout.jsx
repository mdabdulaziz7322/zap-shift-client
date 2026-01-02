import React from 'react';
import { Outlet } from 'react-router';
import authImage1 from '../assets/authImage.png';
import ZapShiftLogo from '../pages/shared/ZapShiftLogo/ZapShiftLogo';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-base-100 flex flex-col">

            {/* Logo */}
            <div className="p-6">
                <ZapShiftLogo />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex  items-center justify-center px-4 lg:px-12">
                <div className="w-full max-w-7xl flex flex-col lg:flex-row-reverse rounded-lg overflow-hidden">

                    {/* RIGHT SIDE IMAGE */}
                    <div className="hidden lg:flex flex-1 bg-[#FAFDF0] items-center justify-center p-10">
                        <img
                            src={authImage1}
                            alt="Authentication"
                            className="w-full max-w-md object-contain"
                        />
                    </div>

                    {/* LEFT SIDE FORM (Outlet) */}
                    <div className="flex-1 flex items-center justify-center bg-white p-6 sm:p-10">
                        <Outlet />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AuthLayout;