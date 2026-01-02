import React, { useState } from 'react';
import CoverageMap from './CoverageMap';
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const serviceCenters = useLoaderData();
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <section className="py-16 bg-base-100">
            <div className="max-w-7xl mx-auto px-4">

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
                    We are available in 64 districts
                </h1>

                {/* Description */}
                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
                    Search and explore our nationwide parcel delivery coverage across Bangladesh.
                </p>

                {/* Search box (logic later) */}
                <div className="max-w-md mx-auto mb-10">
                    <input
                        type="text"
                        placeholder="Search district name..."
                        className="input input-bordered w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Map */}
                <CoverageMap serviceCenters={serviceCenters} searchTerm={searchTerm} />

            </div>
        </section>
    );
};

export default Coverage;