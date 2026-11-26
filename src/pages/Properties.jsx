
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import { sampleProperties } from "../data/properties";

function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const selectedType = searchParams.get("type") || "All";
  const [maxRent, setMaxRent] = useState("");

  const updateSearchParam = (name, value, defaultValue = "") => {
    const nextParams = new URLSearchParams(searchParams);
    const normalizedValue = value.trim();

    if (!normalizedValue || normalizedValue === defaultValue) {
      nextParams.delete(name);
    } else {
      nextParams.set(name, normalizedValue);
    }

    setSearchParams(nextParams, { replace: true });
  };

  // Filter properties
  const filteredProperties = sampleProperties.filter((property) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      property.title.toLowerCase().includes(search) ||
      property.location.toLowerCase().includes(search);

    const matchesType =
      selectedType === "All" || property.type === selectedType;

    const matchesRent =
      maxRent === "" || property.monthlyRent <= Number(maxRent);

    return matchesSearch && matchesType && matchesRent;
  });

  const handleResetFilters = () => {
    setSearchParams({}, { replace: true });
    setMaxRent("");
  };

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Page Heading */}
        <div className="mb-10">
          <span className="text-brand font-semibold text-sm tracking-wider">
            FIND YOUR SPACE
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mt-3">
            Explore Properties
          </h1>

          <p className="text-ink/70 mt-3">
            Discover comfortable places that match your lifestyle.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand/10 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-2">
                Search
              </label>

              <input
                type="text"
                placeholder="Search by title or location..."
                value={searchTerm}
                onChange={(e) => updateSearchParam("search", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
              />
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-2">
                Property Type
              </label>

              <select
                value={selectedType}
                onChange={(e) =>
                  updateSearchParam("type", e.target.value, "All")
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
              >
                <option value="All">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Studio">Studio</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
              </select>
            </div>

            {/* Maximum Rent */}
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-2">
                Maximum Monthly Rent (Rs.)
              </label>

              <input
                type="number"
                min="0"
                placeholder="Enter maximum rent"
                value={maxRent}
                onChange={(e) => setMaxRent(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
              />
            </div>
          </div>

          <div className="flex justify-end mt-5">
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-brand font-semibold text-sm hover:text-brand-dark transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-ink/60">
            Showing{" "}
            <span className="font-semibold text-brand-dark">
              {filteredProperties.length}
            </span>{" "}
            of {sampleProperties.length} properties
          </p>
        </div>

        {/* Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-brand/10 text-center py-16 px-6">
            <div className="text-5xl mb-4">🏠</div>

            <h3 className="text-xl font-bold text-brand-dark">
              No properties found
            </h3>

            <p className="text-ink/60 mt-2">
              Try changing your search or filters.
            </p>

            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-6 bg-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Properties;
