
import React from "react";
import img1 from "../../../assets/live-tracking.png";
import img2 from "../../../assets/safe-delivery.png";



const FeaturesSection = () => {
    const features = [
        {
            title: "Live Parcel Tracking",
            description:
                "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
            image: img1,
        },
        {
            title: "100% Safe Delivery",
            description:
                "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
            image: img2,
        },
        {
            title: "24/7 Call Center Support",
            description:
                "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
            image: img2,
        },
    ];

    return (
        <section className="py-20 bg-base-200">
            <div className="container mx-auto px-4 space-y-10">

                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="max-w-6xl mx-auto bg-base-100 rounded-xl shadow-md p-5 flex flex-col md:flex-row items-center gap-8"
                    >
                        {/* Left: Animated Image */}
                        <div className=" flex justify-center">
                            <img
                                src={feature.image}
                                alt={feature.title}
                                className=""
                            />
                        </div>

                        {/* Divider */}
                        <div className="hidden md:flex flex-col items-center">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            <span className="w-px h-16 bg-primary my-2"></span>
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                        </div>

                        {/* Right: Text */}
                        <div className="w-full md:flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-bold mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed ">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default FeaturesSection;
