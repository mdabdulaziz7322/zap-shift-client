import Marquee from "react-fast-marquee";
import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/amazon_vector.png";
import logo3 from "../../../assets/brands/casio.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/star.png";
import logo7 from "../../../assets/brands/start_people.png";
import React from "react";

const ClientsSlider = () => {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Clients
          </h2>
          <p className="text-gray-600 mt-2 text-xs md:text-sm">
            Trusted by leading companies across Bangladesh
          </p>
        </div>

        {/* Marquee */}
        <Marquee
          speed={50}
          pauseOnHover={true}
          gradient={false}
          direction="left"
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              className=" mx-10 flex items-center justify-center"
            >
              <img
                src={logo}
                alt="Client Logo"
                className=" object-contain  hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </Marquee>

      </div>
    </section>
  );
};

export default ClientsSlider;
