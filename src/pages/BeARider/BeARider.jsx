import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const BeARider = () => {
    const { user } = UseAuth();

    const [serviceCenters, setServiceCenters] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("");
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset } = useForm();

    // Fetch service center data
    useEffect(() => {
        fetch("/serviceCenter.json")
            .then((res) => res.json())
            .then((data) => setServiceCenters(data));
    }, []);

    // Unique regions
    const regions = [...new Set(serviceCenters.map(item => item.region))];

    // Districts based on selected region
    const districts = serviceCenters.filter(
        item => item.region === selectedRegion
    );

    // Submit handler
    const onSubmit = (data) => {
        const riderApplication = {
            ...data,
            name: user?.displayName || "",
            email: user?.email || "",
            status: "pending",
            created_at: new Date().toISOString(),
        };

        console.log("Rider Application:", riderApplication);

        axiosSecure.post("/riders", riderApplication)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Application Submitted!",
                        text: "Your rider application is under review.",
                        confirmButtonColor: "#22c55e",
                    });
                    reset();
                }
            })
            .catch(err => {
                if (err.response?.status === 409) {
                    Swal.fire({
                        icon: "error",
                        title: "Already Applied",
                        text: "A rider with this email already exists.",
                        confirmButtonColor: "#ef4444",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Something went wrong",
                        text: "Please try again later",
                    });
                }
            });

    };

    return (
        <section className="py-5 bg-base-200">
            <div className="max-w-6xl mx-auto shadow-sm rounded-4xl px-4 py-10 bg-white">

                {/* Header */}
                <div className="mb-10 text-left">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        Be a Rider
                    </h1>
                    <p className="text-gray-600 max-w-2xl">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                        From personal packages to business shipments — we deliver on time, every time.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            defaultValue={user?.displayName || ''}
                            readOnly
                            className="input input-bordered w-full bg-gray-100"

                        />

                        <input
                            defaultValue={user?.email || ''}
                            readOnly
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>

                    {/* Age & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="number"
                            placeholder="Age"
                            className="input input-bordered w-full"
                            {...register("age", { required: true })}
                        />

                        <input
                            placeholder="Phone Number"
                            className="input input-bordered w-full"
                            {...register("phone", { required: true })}
                        />
                    </div>

                    {/* Region & District */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <select
                            className="select select-bordered w-full"
                            {...register("region", { required: true })}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                        >
                            <option value="">Select Region</option>
                            {regions.map((region, index) => (
                                <option key={index} value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>

                        <select
                            className="select select-bordered w-full"
                            {...register("district", { required: true })}
                            disabled={!selectedRegion}
                        >
                            <option value="">Select District</option>
                            {districts.map((item, index) => (
                                <option key={index} value={item.district}>
                                    {item.district}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* NID */}
                    <input
                        placeholder="National ID Card Number"
                        className="input input-bordered w-full"
                        {...register("nid", { required: true })}
                    />

                    {/* Bike Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            placeholder="Bike Brand"
                            className="input input-bordered w-full"
                            {...register("bikeBrand", { required: true })}
                        />

                        <input
                            placeholder="Bike Registration Number"
                            className="input input-bordered w-full"
                            {...register("bikeRegistration", { required: true })}
                        />
                    </div>

                    {/* About */}
                    <textarea
                        placeholder="Tell us about yourself"
                        className="textarea textarea-bordered w-full"
                        rows="4"
                        {...register("about")}
                    />

                    {/* Submit */}
                    <div>
                        <button type="submit" className="btn bg-[#CAEB66] px-10">
                            Submit Application
                        </button>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default BeARider;
