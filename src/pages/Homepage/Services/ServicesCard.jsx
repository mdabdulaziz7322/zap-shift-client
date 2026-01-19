const ServiceCard = ({ service, isActive, onClick }) => {
  const { icon: Icon, title, description } = service;
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-6 flex flex-col items-center  transition-all duration-300 border
        ${isActive
          ? "bg-[#8bb901] text-slate-900 border-[#8bb901] scale-[1.02]"
          : "bg-white text-slate-800 border-transparent hover:scale-[1.02]"
        }
      `}
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4
          ${isActive
            ? "bg-white text-[#8bb901]"
            : "bg-[#8bb901]/10 text-[#8bb901]"
          }
        `}
      >
        <Icon size={22} />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2 text-center">
        {title}
      </h3>

      {/* Description */}
      <p
        className={`text-sm text-center leading-relaxed ${isActive ? "text-slate-800" : "text-slate-600"
          }`}
      >
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
