
import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const initialFormData = {
  title: "",
  description: "",
  address: "",
  city: "",
  propertyType: "",
  bedrooms: "0",
  bathrooms: "0",
  monthlyRent: "",
  securityDeposit: "",
};

const propertyTypes = {
  1: "Apartment",
  2: "House",
  3: "Villa",
  4: "Studio",
  5: "Commercial",
  6: "Land",
};

function AddProperty() {
  const navigate = useNavigate();

  // Get shared properties and setter from OwnerDashboardLayout
  const { properties, setProperties } = useOutletContext();

  const [formData, setFormData] = useState(initialFormData);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");

  // Generate image preview
  useEffect(() => {
    if (!image) {
      setImagePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(image);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [image]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files?.[0];

    setError("");

    if (!selectedImage) {
      setImage(null);
      return;
    }

    if (!selectedImage.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (selectedImage.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    setImage(selectedImage);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!formData.propertyType) {
      setError("Please select a property type.");
      return;
    }

    // Generate a new property ID
    const newPropertyId =
      properties.length > 0
        ? Math.max(...properties.map((property) => property.id)) + 1
        : 1;

    // Create new property object
    const newProperty = {
      id: newPropertyId,
      title: formData.title.trim(),
      description: formData.description.trim(),
      address: formData.address.trim(),
      location: formData.city.trim(),
      type: propertyTypes[formData.propertyType],
      propertyType: Number(formData.propertyType),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      monthlyRent: Number(formData.monthlyRent),
      securityDeposit: Number(formData.securityDeposit),
      image: imagePreview || null,
      status: "Available",
    };

    // Add the property to shared dashboard state
    setProperties((currentProperties) => [
      ...currentProperties,
      newProperty,
    ]);

    // Return to My Properties
    navigate("/owner/properties");
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setImage(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-10 md:py-12">

        {/* Page Heading */}
        <div className="mb-8">
          <Link
            to="/owner/properties"
            className="inline-flex items-center gap-2 text-sm text-brand font-semibold hover:text-brand-dark transition mb-5"
          >
            ← Back to My Properties
          </Link>

          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark">
            Add New Property
          </h2>

          <p className="text-ink/60 mt-2">
            Enter your property details to create a new rental listing.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-7">

          {/* Basic Information */}
          <section className="bg-white rounded-2xl border border-brand/10 p-6 md:p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-brand-dark">
                Basic Information
              </h3>
              <p className="text-sm text-ink/50 mt-1">
                Provide the main details about your property.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-brand-dark mb-2">
                  Property Title <span className="text-red-500">*</span>
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  minLength={3}
                  maxLength={150}
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Modern City Apartment"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-brand-dark mb-2">
                  Property Description <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your property, its features and nearby facilities..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none resize-y focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-brand-dark mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. Park Road"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-brand-dark mb-2">
                    City <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Colombo"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="propertyType" className="block text-sm font-semibold text-brand-dark mb-2">
                  Property Type <span className="text-red-500">*</span>
                </label>

                <select
                  id="propertyType"
                  name="propertyType"
                  required
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                >
                  <option value="">Select property type</option>
                  <option value="1">Apartment</option>
                  <option value="2">House</option>
                  <option value="3">Villa</option>
                  <option value="4">Studio</option>
                  <option value="5">Commercial</option>
                  <option value="6">Land</option>
                </select>
              </div>
            </div>
          </section>

          {/* Property Features */}
          <section className="bg-white rounded-2xl border border-brand/10 p-6 md:p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-brand-dark">
                Property Features
              </h3>
              <p className="text-sm text-ink/50 mt-1">
                Add the number of bedrooms and bathrooms.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="bedrooms" className="block text-sm font-semibold text-brand-dark mb-2">
                  Bedrooms
                </label>

                <input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  min="0"
                  step="1"
                  required
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                />
              </div>

              <div>
                <label htmlFor="bathrooms" className="block text-sm font-semibold text-brand-dark mb-2">
                  Bathrooms
                </label>

                <input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  min="0"
                  step="1"
                  required
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                />
              </div>
            </div>
          </section>

          {/* Rental Information */}
          <section className="bg-white rounded-2xl border border-brand/10 p-6 md:p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-brand-dark">
                Rental Information
              </h3>
              <p className="text-sm text-ink/50 mt-1">
                Set the monthly rental price and security deposit.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="monthlyRent" className="block text-sm font-semibold text-brand-dark mb-2">
                  Monthly Rent (LKR) <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/50 text-sm">
                    Rs.
                  </span>

                  <input
                    id="monthlyRent"
                    name="monthlyRent"
                    type="number"
                    min="0.01"
                    step="0.01"
                    required
                    value={formData.monthlyRent}
                    onChange={handleChange}
                    placeholder="45000"
                    className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="securityDeposit" className="block text-sm font-semibold text-brand-dark mb-2">
                  Security Deposit (LKR) <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/50 text-sm">
                    Rs.
                  </span>

                  <input
                    id="securityDeposit"
                    name="securityDeposit"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={formData.securityDeposit}
                    onChange={handleChange}
                    placeholder="50000"
                    className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Property Image */}
          <section className="bg-white rounded-2xl border border-brand/10 p-6 md:p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-brand-dark">
                Property Image
              </h3>
              <p className="text-sm text-ink/50 mt-1">
                Upload a clear image to showcase your property.
              </p>
            </div>

            <label
              htmlFor="propertyImage"
              className="block border-2 border-dashed border-brand/30 rounded-2xl p-6 text-center cursor-pointer hover:border-brand hover:bg-brand-light/20 transition"
            >
              {imagePreview ? (
                <div>
                  <img
                    src={imagePreview}
                    alt="Property preview"
                    className="w-full max-h-72 object-cover rounded-xl mb-4"
                  />

                  <p className="text-sm font-semibold text-brand">
                    {image?.name}
                  </p>

                  <p className="text-xs text-ink/50 mt-1">
                    Click to choose a different image
                  </p>
                </div>
              ) : (
                <div className="py-8">
                  <div className="text-4xl mb-3">📷</div>

                  <p className="font-semibold text-brand-dark">
                    Click to upload a property image
                  </p>

                  <p className="text-sm text-ink/50 mt-2">
                    PNG, JPG or WEBP · Maximum 5 MB
                  </p>
                </div>
              )}

              <input
                id="propertyImage"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </section>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
              {error}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pb-8">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 rounded-xl border border-gray-300 text-ink/70 font-semibold hover:bg-gray-100 transition"
            >
              Clear Form
            </button>

            <button
              type="submit"
              className="px-7 py-3 rounded-xl bg-brand text-white font-semibold hover:bg-brand-dark transition"
            >
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProperty;
