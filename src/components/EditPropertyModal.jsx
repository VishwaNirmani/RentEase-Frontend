
import { useEffect, useState } from "react";

function EditPropertyModal({ property, onClose, onSave }) {
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
  const [error, setError] = useState("");

  // Load existing property details
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
    setImage(null);
    setError("");
  }, [property]);

  // Create image preview
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.propertyType) {
      setError("Please select a property type.");
      return;
    }

    const propertyTypes = {
      1: "Apartment",
      2: "House",
      3: "Villa",
      4: "Studio",
      5: "Commercial",
      6: "Land",
    };

    const updatedProperty = {
      ...property,
      title: formData.title.trim(),
      description: formData.description,
      address: formData.address.trim(),
      location: formData.city.trim(),
      type: propertyTypes[formData.propertyType],
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      monthlyRent: Number(formData.monthlyRent),
      securityDeposit: Number(formData.securityDeposit || 0),
      image: imagePreview,
    };

    onSave(updatedProperty);
  };

  // Close when clicking the background
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onMouseDown={handleBackdropClick}
    >
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">

        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-brand-dark">
              Edit Property
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Update your property information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition text-xl"
            aria-label="Close edit property popup"
          >
            ×
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Basic Information */}
          <section>
            <h3 className="font-semibold text-brand-dark mb-4">
              Basic Information
            </h3>

            <div className="space-y-4">

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
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none"
                  placeholder="Describe your property..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

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

          <div className="border-t border-gray-100" />

          {/* Property Features */}
          <section>
            <h3 className="font-semibold text-brand-dark mb-4">
              Property Features
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

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

          <div className="border-t border-gray-100" />

          {/* Rental Information */}
          <section>
            <h3 className="font-semibold text-brand-dark mb-4">
              Rental Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

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
                />
              </div>

            </div>
          </section>

          <div className="border-t border-gray-100" />

          {/* Property Image */}
          <section>
            <h3 className="font-semibold text-brand-dark mb-2">
              Property Image
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              Upload a new image to replace the current one.
            </p>

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Property preview"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            )}

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
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
              {error}
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-7 py-3 bg-brand text-white rounded-lg font-semibold hover:bg-brand-dark transition"
            >
              Save Changes
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default EditPropertyModal;
