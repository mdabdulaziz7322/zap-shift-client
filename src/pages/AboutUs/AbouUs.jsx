import React from "react";
import { FaTruck, FaUsers, FaShieldAlt, FaClock } from "react-icons/fa";


const AboutUs = () => {
    return (
        <section className="bg-base-200 py-12">
            <div className="max-w-7xl mx-auto px-4">

                {/* ================= HERO ================= */}
                <div className="text-center mb-12">     
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        About ZapShift
                    </h1>
                    <p className="max-w-3xl mx-auto text-gray-600 text-lg">
                        ZapShift is a fast, reliable, and technology-driven parcel delivery platform
                        designed to connect senders, riders, and administrators in one seamless system.
                        We simplify logistics so you can focus on what matters most.
                    </p>
                </div>

                {/* ================= MISSION & VISION ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="card bg-white shadow">
                        <div className="card-body">
                            <h2 className="card-title text-xl">🎯 Our Mission</h2>
                            <p className="text-gray-600">
                                Our mission is to make parcel delivery fast, transparent, and affordable
                                for everyone. We empower riders with fair earnings and provide users with
                                real-time tracking and reliable service.
                            </p>
                        </div>
                    </div>

                    <div className="card bg-white shadow">
                        <div className="card-body">
                            <h2 className="card-title text-xl">🚀 Our Vision</h2>
                            <p className="text-gray-600">
                                We envision a future where logistics is fully digital, accessible,
                                and efficient—connecting cities, businesses, and individuals
                                with just a few clicks.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ================= CORE VALUES ================= */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-center mb-8">
                        Our Core Values
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="card bg-white shadow text-center">
                            <div className="card-body items-center">
                                <FaTruck className="text-4xl text-[#8bb901] mb-3" />
                                <h3 className="font-semibold text-lg">Reliability</h3>
                                <p className="text-gray-600 text-sm">
                                    Delivering parcels safely and on time, every time.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-white shadow text-center">
                            <div className="card-body items-center">
                                <FaClock className="text-4xl text-[#8bb901] mb-3" />
                                <h3 className="font-semibold text-lg">Speed</h3>
                                <p className="text-gray-600 text-sm">
                                    Optimized routes and fast processing for quick delivery.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-white shadow text-center">
                            <div className="card-body items-center">
                                <FaShieldAlt className="text-4xl text-[#8bb901] mb-3" />
                                <h3 className="font-semibold text-lg">Security</h3>
                                <p className="text-gray-600 text-sm">
                                    Secure payments, verified riders, and parcel safety.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-white shadow text-center">
                            <div className="card-body items-center">
                                <FaUsers className="text-4xl text-[#8bb901] mb-3" />
                                <h3 className="font-semibold text-lg">Community</h3>
                                <p className="text-gray-600 text-sm">
                                    Supporting riders, businesses, and customers together.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= HOW IT WORKS ================= */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-center mb-8">
                        How ZapShift Works
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="card bg-white shadow">
                            <div className="card-body">
                                <h3 className="font-semibold text-lg">1️⃣ Book a Parcel</h3>
                                <p className="text-gray-600">
                                    Users submit parcel details, choose pickup and delivery locations,
                                    and complete payment online.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-white shadow">
                            <div className="card-body">
                                <h3 className="font-semibold text-lg">2️⃣ Assign & Pickup</h3>
                                <p className="text-gray-600">
                                    Admin assigns a verified rider. The rider picks up the parcel
                                    and updates the delivery status in real time.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-white shadow">
                            <div className="card-body">
                                <h3 className="font-semibold text-lg">3️⃣ Track & Deliver</h3>
                                <p className="text-gray-600">
                                    Users track their parcel through every step until successful delivery.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= CTA ================= */}
                <div className="text-center bg-white shadow rounded-xl p-8">
                    <h2 className="text-2xl font-bold mb-4">
                        Ready to Deliver with ZapShift?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Whether you want to send a parcel or earn as a rider,
                        ZapShift is here to move things forward.
                    </p>
                    <div className="flex justify-center gap-4">
                        <a href="/send-parcel" className="btn bg-[#CAEB66] px-6">
                            Send a Parcel
                        </a>
                        <a href="/rider" className="btn btn-outline border-[#8bb901] px-6">
                            Become a Rider
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutUs;
