
import { Link, useParams } from "react-router-dom";
import { sampleProperties } from "../data/properties";

function PropertyDetails() {
  const { id } = useParams();

  // Find the selected property
  const property = sampleProperties.find(
    (item) => item.id === Number(id)
  );

  // Property not found
  if (!property) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>

          <h1 className="text-2xl font-bold text-brand-dark">
            Property Not Found
          </h1>

          <p className="text-ink/60 mt-3">
            Sorry, we couldn't find the property you're looking for.
          </p>

          <Link
            to="/properties"
            className="inline-block mt-6 bg-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark transition"
          >
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Back Button */}
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 text-brand font-semibold hover:text-brand-dark mb-8"
        >
          ← Back to Properties
        </Link>

        {/* Property Image */}
        <div className="relative h-72 md:h-[450px] rounded-2xl overflow-hidden shadow-sm">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />

          <span className="absolute top-5 left-5 bg-brand text-white px-4 py-2 rounded-full text-sm font-semibold">
            {property.type}
          </span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

          {/* Property Information */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-2xl p-6 md:p-8 border border-brand/10">

              <p className="text-brand font-semibold text-sm">
                {property.location}
              </p>

              <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mt-2">
                {property.title}
              </h1>

              <p className="text-ink/60 mt-3">
                📍 {property.address}
              </p>

              {/* Property Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

                <div className="bg-cream rounded-xl p-4 text-center">
                  <p className="text-2xl">🛏</p>
                  <p className="font-bold text-brand-dark mt-2">
                    {property.bedrooms}
                  </p>
                  <p className="text-sm text-ink/60">
                    Bedrooms
                  </p>
                </div>

                <div className="bg-cream rounded-xl p-4 text-center">
                  <p className="text-2xl">🚿</p>
                  <p className="font-bold text-brand-dark mt-2">
                    {property.bathrooms}
                  </p>
                  <p className="text-sm text-ink/60">
                    Bathrooms
                  </p>
                </div>

                <div className="bg-cream rounded-xl p-4 text-center">
                  <p className="text-2xl">📐</p>
                  <p className="font-bold text-brand-dark mt-2">
                    {property.area}
                  </p>
                  <p className="text-sm text-ink/60">
                    Sq. Ft.
                  </p>
                </div>

                <div className="bg-cream rounded-xl p-4 text-center">
                  <p className="text-2xl">🏠</p>
                  <p className="font-bold text-brand-dark mt-2">
                    {property.type}
                  </p>
                  <p className="text-sm text-ink/60">
                    Property Type
                  </p>
                </div>

              </div>

              {/* Description */}
              <div className="mt-10">
                <h2 className="text-xl font-bold text-brand-dark">
                  About This Property
                </h2>

                <p className="text-ink/70 leading-8 mt-4">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="mt-10">
                <h2 className="text-xl font-bold text-brand-dark">
                  Property Amenities
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 text-ink/70"
                    >
                      <span className="text-brand">✓</span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Rent and Booking Card */}
          <div>
            <div className="bg-white rounded-2xl p-6 border border-brand/10 shadow-sm lg:sticky lg:top-24">

              <p className="text-sm text-ink/60">
                Monthly Rental Price
              </p>

              <h2 className="text-3xl font-bold text-brand mt-2">
                Rs. {property.monthlyRent.toLocaleString("en-LK")}
              </h2>

              <p className="text-sm text-ink/60 mt-1">
                Per month
              </p>

              <div className="border-t border-gray-100 my-6" />

              <div className="space-y-3 text-sm text-ink/70">
                <div className="flex justify-between">
                  <span>Property Type</span>
                  <span className="font-semibold text-brand-dark">
                    {property.type}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Bedrooms</span>
                  <span className="font-semibold text-brand-dark">
                    {property.bedrooms}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Bathrooms</span>
                  <span className="font-semibold text-brand-dark">
                    {property.bathrooms}
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled
                className="w-full mt-8 bg-brand/60 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
              >
                Booking Coming Soon
              </button>

              <p className="text-xs text-ink/50 text-center mt-3">
                Booking requests will be available soon.
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
