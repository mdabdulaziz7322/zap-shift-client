import {
  FaBoxOpen,
  FaMoneyBillWave,
  FaWarehouse,
  FaBuilding,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: FaBoxOpen,
    },
    {
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: FaMoneyBillWave,
    },
    {
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: FaWarehouse,
    },
    {
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: FaBuilding,
    },
  ];

  return (
    <section className="py-10 bg-base-200 ">
      {/* Narrow container */}
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How it Works
          </h2>
          <p className="text-gray-600">
            Simple, fast, and reliable delivery process
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="bg-base-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full  flex items-center justify-center bg-[#8bb901]/10 text-[#8bb901] text-xl">
                    <Icon />
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
