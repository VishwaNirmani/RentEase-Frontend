
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import EditPropertyModal from "../../components/EditPropertyModal";

function OwnerProperties() {
  const { properties, setProperties } = useOutletContext();

  const [selectedProperty, setSelectedProperty] = useState(null);

  const getStatusStyle = (status) =>
    status === "Available"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-gray-100 text-gray-600";

  // Open edit popup
  const handleEdit = (property) => {
    setSelectedProperty(property);
  };

  // Close edit popup
  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  // Save updated property
  const handleSaveProperty = (updatedProperty) => {
    setProperties((previousProperties) =>
      previousProperties.map((property) =>
        property.id === updatedProperty.id
          ? updatedProperty
          : property
      )
    );

    setSelectedProperty(null);
  };

  return (
    <div className="p-5 md:p-10 max-w-7xl mx-auto">
      {/* Page Heading */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark">
            My Properties
          </h2>

          <p className="text-ink/60 mt-2">
            View and manage all your rental property listings.
          </p>
        </div>

        <Link
          to="/owner/add-property"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand text-white font-semibold hover:bg-brand-dark transition"
        >
          <span className="text-xl">+</span>
          Add Property
        </Link>
      </section>

      {/* Property Summary */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white border border-brand/10 rounded-2xl p-5">
          <p className="text-sm text-ink/60">Total Properties</p>

          <h3 className="text-3xl font-bold text-brand-dark mt-2">
            {properties.length}
          </h3>
        </div>

        <div className="bg-white border border-brand/10 rounded-2xl p-5">
          <p className="text-sm text-ink/60">Available</p>

          <h3 className="text-3xl font-bold text-emerald-700 mt-2">
            {properties.filter((p) => p.status === "Available").length}
          </h3>
        </div>

        <div className="bg-white border border-brand/10 rounded-2xl p-5">
          <p className="text-sm text-ink/60">Rented</p>

          <h3 className="text-3xl font-bold text-brand-dark mt-2">
            {properties.filter((p) => p.status === "Rented").length}
          </h3>
        </div>
      </section>

      {/* Property List */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-brand-dark">
            Your Listings
          </h3>

          <span className="text-sm text-ink/50">
            {properties.length} properties
          </span>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map((property) => (
              <article
                key={property.id}
                className="bg-white rounded-2xl border border-brand/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-52 object-cover"
                  />

                  <span
                    className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full ${getStatusStyle(property.status)}`}
                  >
                    {property.status}
                  </span>
                </div>

                <div className="p-5">
                  <p className="text-xs text-brand font-semibold uppercase tracking-wide">
                    {property.type}
                  </p>

                  <h3 className="text-lg font-bold text-brand-dark mt-1">
                    {property.title}
                  </h3>

                  <p className="text-sm text-ink/60 mt-2">
                    📍 {property.location}
                  </p>

                  <div className="flex gap-5 text-sm text-ink/60 mt-4">
                    <span>{property.bedrooms} Bedrooms</span>
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>

                  <div className="border-t border-gray-100 mt-5 pt-4">
                    <p className="text-xs text-ink/50">Monthly Rent</p>

                    <p className="text-xl font-bold text-brand mt-1">
                      Rs. {property.monthlyRent.toLocaleString("en-LK")}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <Link
                      to={`/properties/${property.id}`}
                      className="text-center px-3 py-2.5 rounded-lg border border-brand/20 text-brand text-sm font-semibold hover:bg-brand-light/40 transition"
                    >
                      View Details
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleEdit(property)}
                      className="px-3 py-2.5 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-brand/10 p-12 text-center">
            <div className="text-4xl mb-4">🏠</div>

            <h3 className="text-lg font-bold text-brand-dark">
              No properties listed yet
            </h3>

            <p className="text-sm text-ink/60 mt-2">
              Add your first property to start receiving booking requests.
            </p>
          </div>
        )}
      </section>

      {/* Edit Property Popup */}
      {selectedProperty && (
        <EditPropertyModal
          property={selectedProperty}
          onClose={handleCloseModal}
          onSave={handleSaveProperty}
        />
      )}
    </div>
  );
}

export default OwnerProperties;
