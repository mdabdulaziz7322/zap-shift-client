import ServiceCard from "./ServicesCard";
import {
    FaShippingFast,
    FaMapMarkedAlt,
    FaWarehouse,
    FaMoneyBillWave,
    FaBuilding,
    FaUndo,
} from "react-icons/fa";


const Services = () => {
    const servicesData = [
        {
            title: "Express & Standard Delivery",
            description:
                "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours.",
            icon: FaShippingFast,
        },
        {
            title: "Nationwide Delivery",
            description:
                "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
            icon: FaMapMarkedAlt,
        },
        {
            title: "Fulfillment Solution",
            description:
                "Customized service including inventory management, online order processing, packaging, and after-sales support.",
            icon: FaWarehouse,
        },
        {
            title: "Cash on Home Delivery",
            description:
                "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
            icon: FaMoneyBillWave,
        },
        {
            title: "Corporate Service / Contract In Logistics",
            description:
                "Customized corporate services including warehouse and inventory management support.",
            icon: FaBuilding,
        },
        {
            title: "Parcel Return",
            description:
                "Reverse logistics facility allowing customers to return or exchange products easily.",
            icon: FaUndo,
        },
    ];

    return (
        <section className="py-16 bg-base-200">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Our Services
                    </h2>
                    <p className="text-gray-600">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                        From personal packages to business shipments — we deliver on time, every time.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
                    {servicesData.map((service, index) => (
                        <ServiceCard
                            key={index}
                            service={service}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Services;
