
import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Shared data from OwnerDashboardLayout
  const { properties, setProperties } = useOutletContext();

  const property = properties.find((item) => item.id === Number(id));

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    propertyType: "",
    bedrooms: "0",
    bathrooms: "0",
    monthlyRent: "",
    securityDeposit: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load existing property information
  useEffect(() => {
    if (!property) return;

    setFormData({
      title: property.title || "",
      description: property.description || "",
      address: property.address || "",
      city: property.location || "",
      propertyType: String(
        property.propertyType ?? property.type ?? ""
      ),
      bedrooms: String(property.bedrooms ?? 0),
      bathrooms: String(property.bathrooms ?? 0),
      monthlyRent: String(property.monthlyRent ?? ""),
      securityDeposit: String(property.securityDeposit ?? ""),
    });

    setImagePreview(property.image || "");
  }, [property]);

  // Create and clean up image preview URL
  useEffect(() => {
    if (!image) return;

    const objectUrl = URL.createObjectURL(image);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      return;
    }

    setImage(selectedFile);
    setError("");
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!property) return;

    if (!formData.propertyType) {
      setError("Please select a property type.");
      return;
    }

    const updatedProperty = {
      ...property,
      title: formData.title,
      description: formData.description,
      address: formData.address,
      location: formData.city,
      type: {
        1: "Apartment",
        2: "House",
        3: "Villa",
        4: "Studio",
        5: "Commercial",
        6: "Land",
      }[formData.propertyType],
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      monthlyRent: Number(formData.monthlyRent),
      securityDeposit: Number(formData.securityDeposit || 0),
      image: imagePreview,
    };

    // Update the shared owner dashboard property list
    setProperties((previousProperties) =>
      previousProperties.map((item) =>
        item.id === Number(id) ? updatedProperty : item
      )
    );

    navigate("/owner/properties");
  };

  if (!property) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-5">
          <span className="text-3xl text-red-500">!</span>
        </div>

        <h2 className="text-2xl font-bold text-ink mb-2">
          Property Not Found
        </h2>

        <p className="text-gray-500 mb-6">
          The property you are trying to edit does not exist.
        </p>

        <Link
          to="/owner/properties"
          className="bg-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark transition"
        >
          Back to My Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm text-brand font-semibold mb-2">
            PROPERTY MANAGEMENT
          </p>

          <h1 className="text-3xl font-bold text-ink">
            Edit Property
          </h1>

          <p className="text-gray-500 mt-2">
            Update your property information and rental details.
          </p>
        </div>

        <Link
          to="/owner/properties"
          className="text-gray-600 hover:text-brand font-medium"
        >
          ← Back to My Properties
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">

        {/* Basic Information */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-ink mb-6">
            Basic Information
          </h2>

          <div className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Title *
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                minLength={3}
                maxLength={150}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                placeholder="Enter property title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none"
                placeholder="Describe your property..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                  placeholder="Enter address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                  placeholder="Enter city"
                />
              </div>

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type *
              </label>

              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
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
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-ink mb-6">
            Property Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>

              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                min="0"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bathrooms
              </label>

              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                min="0"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              />
            </div>

          </div>
        </section>

        {/* Rental Information */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-ink mb-6">
            Rental Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Rent (LKR) *
              </label>

              <input
                type="number"
                name="monthlyRent"
                value={formData.monthlyRent}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                placeholder="Enter monthly rent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Security Deposit (LKR)
              </label>

              <input
                type="number"
                name="securityDeposit"
                value={formData.securityDeposit}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                placeholder="Enter security deposit"
              />
            </div>

          </div>
        </section>

        {/* Property Image */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-ink mb-2">
            Property Image
          </h2>

          <p className="text-sm text-gray-500 mb-5">
            Your current image is shown below. You can upload a new image if needed.
          </p>

          {imagePreview && (
            <div className="mb-5">
              <img
                src={imagePreview}
                alt="Property preview"
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
          )}

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose New Image
          </label>

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-light file:text-brand file:font-semibold"
          />

          <p className="text-xs text-gray-500 mt-2">
            PNG, JPG or WEBP. Maximum file size: 5 MB.
          </p>
        </section>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm">
            {message}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pb-8">

          <Link
            to="/owner/properties"
            className="px-6 py-3 text-center border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="px-7 py-3 bg-brand text-white rounded-lg font-semibold hover:bg-brand-dark transition"
          >
            Save Changes
          </button>

        </div>

      </form>
    </div>
  );
}

export default EditProperty;
