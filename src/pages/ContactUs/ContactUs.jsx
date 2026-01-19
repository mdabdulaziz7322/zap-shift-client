import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const ContactUs = () => {
    return (
        <section className="min-h-screen bg-base-200  px-8 py-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left Content */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Contact <span className="text-[#8bb901]">Zapshift</span>
                    </h1>

                    <p className="text-slate-400 mb-8 max-w-xl">
                        Reach out to us for support, questions, or partnerships.
                        Our team will get back to you shortly.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-[#8bb901]/10 text-[#8bb901]">
                                <FaEnvelope />
                            </div>
                            <span>support@zapshift.com</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-[#8bb901]/10 text-[#8bb901]">
                                <FaPhoneAlt />
                            </div>
                            <span>+1 (555) 123-4567</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-[#8bb901]/10 text-[#8bb901]">
                                <FaMapMarkerAlt />
                            </div>
                            <span>Remote • Worldwide</span>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-slate-900 rounded-2xl p-6 md:p-8 shadow-xl">
                    <form className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full rounded-xl bg-slate-800 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8bb901]"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full rounded-xl bg-slate-800 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8bb901]"
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8bb901]"
                        />

                        <textarea
                            rows="5"
                            placeholder="Your message..."
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8bb901]"
                        />

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-[#8bb901] hover:bg-[#7aa100] transition rounded-xl px-6 py-3 font-semibold text-white"
                        >
                            Send Message
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default ContactUs;