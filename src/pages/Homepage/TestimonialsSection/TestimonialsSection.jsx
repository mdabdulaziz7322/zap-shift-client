import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import userImg from "../../../assets/customer-top.png"; // small/medium image on top

const TestimonialsSection = () => {
    const testimonials = [
        {
            quote:
                "Their delivery service is incredibly fast and reliable. I always know exactly where my parcel is.",
            name: "Rahim Uddin",
            role: "E-commerce Seller",
        },
        {
            quote:
                "Cash on delivery support helped my business grow rapidly. Customers trust the process.",
            name: "Nusrat Jahan",
            role: "Online Store Owner",
        },
        {
            quote:
                "Excellent customer support. They solved my issue within minutes, even late at night.",
            name: "Fahim Ahmed",
            role: "Corporate Client",
        },
        {
            quote:
                "Nationwide delivery coverage is a big plus. My products reach customers safely every time.",
            name: "Shakib Hasan",
            role: "SME Entrepreneur",
        },
        {
            quote:
                "Live parcel tracking gives peace of mind. My customers love the transparency.",
            name: "Mahi Akter",
            role: "Fashion Brand Owner",
        },
        {
            quote:
                "Professional handling and on-time delivery. Highly recommended logistics partner.",
            name: "Imran Hossain",
            role: "Retail Manager",
        },
        {
            quote:
                "Their fulfillment solution saved us time and operational cost.",
            name: "Tania Rahman",
            role: "Operations Lead",
        },
        {
            quote:
                "Reliable, secure, and efficient — exactly what a growing business needs.",
            name: "Arif Mahmud",
            role: "Startup Founder",
        },
        {
            quote:
                "Parcel return process is smooth and hassle-free.",
            name: "Sadia Islam",
            role: "Online Merchant",
        },
        {
            quote:
                "Best logistics experience I’ve had in Bangladesh.",
            name: "Mahmudul Hasan",
            role: "Wholesale Distributor",
        },
    ];

    return (
        <section className="py-20 bg-base-200 max-w-6xl mx-auto">
            <div className="container mx-auto px-4">

                {/* Top Content */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <img
                        src={userImg}
                        alt="Customers"
                        className="mx-auto mb-6 w-80 h-30 object-contain"
                    />
                    <h2 className="text-3xl md:text-4xl px-6 text-[#03373D]   font-bold mb-4">
                        What our customers are sayings
                    </h2>
                    <p className="text-gray-600 px-7">
                        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
                        Achieve proper alignment, reduce pain, and strengthen your body with ease!
                    </p>
                </div>

                {/* Slider */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    centeredSlides={true}
                    slidesPerView={1.2}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2.3,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="pb-14"
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index}>
                            {({ isActive }) => (
                                <div
                                    className={`transition-all duration-300 p-8 px-5 mb-10 rounded-xl bg-base-100 shadow-md
                    ${isActive ? "opacity-100 scale-100" : "opacity-40 scale-95"}
                  `}
                                >
                                    {/* Quote */}
                                    <FaQuoteLeft className=" text-[#03373D] text-3xl mb-4" />
                                    <p className="text-gray-600 mb-6">
                                        {item.quote}
                                    </p>

                                    {/* Divider */}
                                    <div className="flex items-center mb-4">
                                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                                        <span className="w-full h-px bg-primary/30 ml-2"></span>
                                    </div>

                                    {/* User Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#03373D]"></div>
                                        <div>
                                            <h4 className="font-semibold">{item.name}</h4>
                                            <p className="text-sm text-gray-500">{item.role}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    );
};

export default TestimonialsSection;
