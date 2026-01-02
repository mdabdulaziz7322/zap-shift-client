import React, { useEffect, useState } from 'react';
import { Controller, useForm, Watch } from 'react-hook-form';
import Swal from 'sweetalert2';
import UseAuth from '../../hooks/UseAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const generateTrackingId = () => {
    // Example: "PK-20260101-5G7H8K"
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // 6 random chars
    return `PK-${datePart}-${randomPart}`;
};

const SendParcel = () => {
    const [serviceCenters, setServiceCenters] = useState([]);
    const [loading, setLoading] = useState(true);


    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetch("/serviceCenter.json")
            .then(res => res.json())
            .then(data => {
                setServiceCenters(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Fetch error:", error);
                setLoading(false);
            });
    }, []);


    const { register, handleSubmit, control, watch, reset } = useForm({
        defaultValues: {
            parcelType: "document",
            parcelWeight: "",
            pickupTime: "",
            senderRegion: "",
            senderDistrict: "",
            receiverRegion: "",
            receiverDistrict: "",
        },
    });

    const senderRegion = watch("senderRegion");
    const receiverRegion = watch("receiverRegion");


    if (loading) {
        return <p className="text-center py-20">Loading service centers...</p>;
    }

    // 🟢 UNIQUE REGIONS
    const regions = [...new Set(serviceCenters.map(item => item.region))];

    // 🟢 DISTRICTS BY REGION
    const senderDistricts = serviceCenters.filter(
        item => item.region === senderRegion
    );

    const receiverDistricts = serviceCenters.filter(
        item => item.region === receiverRegion
    );

    const parcelType = watch("parcelType");
    const weight = watch("parcelWeight");
    const district = watch("receiverDistrict");


    // COST CALCULATION FUNCTION
    const calculateCost = () => {
        const w = Number(weight || 0);
        const isOutsideCity = district?.toLowerCase() !== "dhaka";

        let cost = 0;

        if (parcelType === "document") {
            cost = isOutsideCity ? 80 : 60;

        } else {
            if (w <= 3) {
                cost = isOutsideCity ? 150 : 110;
            } else {
                cost = isOutsideCity ? 150 : 110;

                const extraKg = w - 3;
                cost += extraKg * 40;

                if (isOutsideCity) {
                    cost += 40;
                }
            }
        }

        return cost;
    };


    // 📨 FORM SUBMIT
    const onSubmit = (data) => {

        const totalCost = calculateCost();

        const w = Number(data.parcelWeight || 0);
        const isOutsideCity = data.receiverDistrict?.toLowerCase() !== "dhaka";
        let baseCost = 0;
        let extraWeightCost = 0;
        let outsideCityCost = 0;

        if (data.parcelType === "document") {
            baseCost = isOutsideCity ? 80 : 60;
        } else {
            // Non-document
            baseCost = isOutsideCity ? 150 : 110;

            if (w > 3) {
                extraWeightCost = (w - 3) * 40;
                if (isOutsideCity) {
                    outsideCityCost += 40;
                }
            }
        }

        // 3️⃣ Store the parcel data in state
        const parcelData = {
            ...data,
            created_by: user?.email,
            delivery_status: "not collected",
            deliveryCost: totalCost,
            payment_status: "pending",
            creation_date: new Date().toISOString(),
            tracking_id: generateTrackingId(),
        };

        // 4️⃣ Show SweetAlert2 modal with cost breakdown
        Swal.fire({
            title: 'Confirm Parcel Booking',
            html: `
      <div style="text-align:left; font-size:16px; line-height:1.6;">
        <p><strong>Parcel Type:</strong> ${data.parcelType}</p>
        <p><strong>Parcel Weight:</strong> ${data.parcelType === "document" ? 'N/A' : w + ' kg'}</p>
        <hr style="margin:8px 0;">
        <p><strong>Base Cost:</strong> ৳${baseCost}</p>
        ${extraWeightCost ? `<p><strong>Extra Weight Charge:</strong> ৳${extraWeightCost}</p>` : ''}
        ${outsideCityCost ? `<p><strong>Outside City Surcharge:</strong> ৳${outsideCityCost}</p>` : ''}
        <hr style="margin:8px 0;">
        <p><strong>Total Delivery Cost:</strong> ৳${totalCost}</p>
      </div>
    `,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Confirm Booking',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#22c55e',
            cancelButtonColor: '#ef4444',
            reverseButtons: true,
            focusConfirm: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                handleConfirm(parcelData);
            }
        });
    };


    // 💾 SAVE TO DATABASE (mock)
    const handleConfirm = (parcelData) => {
        console.log("Saving to database:", parcelData);

        axiosSecure.post('/parcels', parcelData)
            .then(response => {
                console.log("Saved successfully:", response.data);
                if (response.data.insertedId) {
                    //redirect to payment page with parcelData

                    Swal.fire({
                        icon: 'success',
                        title: 'Redirecting...',
                        text: 'proceed to payment to complete your booking.',
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
            })
            .catch(error => {
                console.error("Error saving parcel:", error);
            });





        reset();
    };

    return (
        <section className="py-16 bg-base-200">
            <div className="max-w-6xl mx-auto shadow-sm rounded-4xl px-4 py-10 bg-white">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Send a Parcel
                    </h1>
                    <p className="text-gray-600">
                        Fill in the details below to book your parcel delivery
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                    {/* Parcel Type (Controller) */}
                    <div className="flex justify-center gap-8">
                        <Controller
                            name="parcelType"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="document"
                                            checked={field.value === "document"}
                                            onChange={field.onChange}
                                            className="radio "
                                        />
                                        Document
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="non-document"
                                            checked={field.value === "non-document"}
                                            onChange={field.onChange}
                                            className="radio"
                                        />
                                        Non Document
                                    </label>
                                </>
                            )}
                        />
                    </div>

                    {/* Watch Example */}
                    <p className="text-center text-sm text-[#03373D]">
                        Selected Parcel Type: <strong>{parcelType}</strong>
                    </p>

                    {/* Parcel Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            {...register("parcelName")}
                            placeholder="Parcel Name"
                            className="input input-bordered border-[#03373D] w-full"
                        />

                        <input
                            type="number"
                            {...register("parcelWeight")}
                            value={watch("parcelWeight") || ""}
                            disabled={parcelType === "document"}
                            placeholder="Parcel Weight (kg)"
                            className={`input input-bordered w-full ${parcelType === "document" ? "bg-gray-100 cursor-not-allowed" : ""
                                }`}
                        />

                    </div>

                    {/* Sender & Receiver */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Sender */}
                        <div className="p-6 border rounded-xl">
                            <h3 className="font-semibold mb-4">Sender Details</h3>
                            <input {...register("senderName")} placeholder="Name" className="input input-bordered w-full mb-3" />
                            <input {...register("senderAddress")} placeholder="Address" className="input input-bordered w-full mb-3" />
                            <input {...register("senderPhone")} placeholder="Phone" className="input input-bordered w-full mb-3" />
                            <label className="label"></label>
                            <select
                                {...register("senderRegion", { required: true })}
                                className="select select-bordered w-full mb-3"
                            >
                                <option value="">Select Region</option>
                                {regions.map((region, index) => (
                                    <option key={index} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>

                            <label className="label"></label>
                            <select
                                {...register("senderDistrict", { required: true })}
                                className="select select-bordered w-full mb-3"
                                disabled={!senderRegion}
                            >
                                <option value="">Select District</option>
                                {senderDistricts.map((item, index) => (
                                    <option key={index} value={item.district}>
                                        {item.district}
                                    </option>
                                ))}
                            </select>

                            <textarea {...register("senderInstruction")} placeholder="Pickup Instruction" className="textarea textarea-bordered w-full" />
                        </div>

                        {/* Receiver */}
                        <div className="p-6 border rounded-xl">
                            <h3 className="font-semibold mb-4">Receiver Details</h3>
                            <input {...register("receiverName")} placeholder="Name" className="input input-bordered w-full mb-3" />
                            <input {...register("receiverAddress")} placeholder="Address" className="input input-bordered w-full mb-3" />
                            <input {...register("receiverPhone")} placeholder="Phone" className="input input-bordered w-full mb-3" />
                            <label className="label"></label>
                            <select
                                {...register("receiverRegion", { required: true })}
                                className="select select-bordered w-full mb-3"
                            >
                                <option value="">Select Region</option>
                                {regions.map((region, index) => (
                                    <option key={index} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>

                            <label className="label"></label>
                            <select
                                {...register("receiverDistrict", { required: true })}
                                className="select select-bordered w-full mb-3"
                                disabled={!receiverRegion}
                            >
                                <option value="">Select District</option>
                                {receiverDistricts.map((item, index) => (
                                    <option key={index} value={item.district}>
                                        {item.district}
                                    </option>
                                ))}
                            </select>

                            <textarea {...register("receiverInstruction")} placeholder="Delivery Instruction" className="textarea textarea-bordered w-full" />
                        </div>

                    </div>

                    {/* Pickup Time (Controller) */}
                    <div className="max-w-md mx-auto">
                        <label className="label"></label>
                        <Controller
                            name="pickupTime"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="datetime-local"
                                    {...field}
                                    className="input input-bordered w-full"
                                />
                            )}
                        />
                    </div>

                    {/* Submit */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn bg-[#CAEB66] px-10"
                        >
                            Proceed to Confirm Booking
                        </button>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default SendParcel;