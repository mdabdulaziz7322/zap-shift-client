import React from 'react';
import { FaLock } from "react-icons/fa";
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="max-w-md w-full bg-base-100 shadow-xl rounded-xl p-8 text-center">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center">
                        <FaLock className="text-error text-3xl" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold mb-3">
                    Unauthorized Access
                </h1>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                    You do not have permission to access this page.
                    Please contact the administrator if you think this is a mistake.
                </p>

                {/* Actions */}
                <div className="flex gap-3 justify-center">
                    <Link to="/" className="btn btn-primary">
                        Go Home
                    </Link>

                    <Link to="/dashboard" className="btn btn-outline">
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;