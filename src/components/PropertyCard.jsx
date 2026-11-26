
import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-brand/10 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300">

      {/* Property Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />

        <span className="absolute top-4 left-4 bg-brand text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          {property.type}
        </span>
      </div>

      {/* Property Details */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-brand-dark">
          {property.title}
        </h3>

        <p className="text-sm text-ink/60 mt-2">
          📍 {property.location}
        </p>

        <div className="flex items-center gap-4 mt-4 text-sm text-ink/70">
          <span>🛏 {property.bedrooms} Beds</span>
          <span>🚿 {property.bathrooms} Baths</span>
        </div>

        {/* Rent and Details Button */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-ink/60">
              Monthly Rent
            </p>

            <p className="text-lg font-bold text-brand">
              Rs. {property.monthlyRent.toLocaleString("en-LK")}
            </p>
          </div>

          <Link
            to={`/properties/${property.id}`}
            className="bg-brand text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-dark transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
