const ServiceCard = ({ service }) => {
    const { icon: Icon, title, description } = service;
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300">
      <div className="card-body items-center text-center">
        <div className="text-primary text-4xl mb-4">
          <Icon />
        </div>
        <h3 className="card-title text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
