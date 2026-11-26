
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "../api/apiErrorMessage";
import { useAuth } from "../context/useAuth";

function Register() {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    } else if (formData.firstName.trim().length > 100) {
      newErrors.firstName = "First name cannot exceed 100 characters.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    } else if (formData.lastName.trim().length > 100) {
      newErrors.lastName = "Last name cannot exceed 100 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    } else if (formData.email.trim().length > 255) {
      newErrors.email = "Email address cannot exceed 255 characters.";
    }

    if (!/^(?:\+94|0)7\d{8}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber =
        "Enter a valid Sri Lankan mobile number, such as 0771234567.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters.";
    } else if (formData.password.length > 128) {
      newErrors.password = "Password cannot exceed 128 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      await register({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phoneNumber: formData.phoneNumber.trim(),
      });
      navigate("/login", { replace: true });
    } catch (error) {
      setMessage(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* Left Visual Section */}
        <div className="hidden lg:block relative min-h-[750px]">
          <img
            src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea"
            alt="Beautiful modern residential interior"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-brand-dark/75" />

          <div className="relative z-10 h-full flex flex-col justify-between p-12 text-white">

            <Link to="/" className="text-3xl font-bold">
              RentEase<span className="text-accent">.</span>
            </Link>

            <div>
              <span className="text-accent font-semibold text-sm tracking-widest">
                START YOUR JOURNEY
              </span>

              <h2 className="text-4xl font-bold leading-tight mt-4">
                Your perfect place is waiting for you.
              </h2>

              <p className="text-white/80 mt-5 leading-7 max-w-md">
                Join RentEase and explore properties that fit your lifestyle.
                Make finding your next home a simpler experience.
              </p>
            </div>

            <p className="text-white/60 text-sm">
              A better way to find your next home.
            </p>

          </div>
        </div>

        {/* Right Registration Form */}
        <div className="flex items-center justify-center p-7 sm:p-12 lg:p-14">

          <div className="w-full max-w-md">

            <Link
              to="/"
              className="lg:hidden text-2xl font-bold text-brand-dark"
            >
              RentEase<span className="text-accent">.</span>
            </Link>

            <div className="mt-8 lg:mt-0">
              <span className="text-brand font-semibold text-sm tracking-wider">
                JOIN RENT EASE
              </span>

              <h1 className="text-3xl font-bold text-brand-dark mt-3">
                Create your account
              </h1>

              <p className="text-ink/60 mt-3">
                Sign up to discover your next place to call home.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold text-brand-dark mb-2"
                  >
                    First Name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                      errors.firstName
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-brand focus:ring-2 focus:ring-brand/10"
                    }`}
                  />

                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-brand-dark mb-2"
                  >
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                      errors.lastName
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-brand focus:ring-2 focus:ring-brand/10"
                    }`}
                  />

                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-brand-dark mb-2"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                    errors.email
                      ? "border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:border-brand focus:ring-2 focus:ring-brand/10"
                  }`}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-semibold text-brand-dark mb-2"
                >
                  Mobile Number
                </label>

                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="0771234567 or +94771234567"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                    errors.phoneNumber
                      ? "border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:border-brand focus:ring-2 focus:ring-brand/10"
                  }`}
                />

                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-brand-dark mb-2"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className={`w-full px-4 py-3 pr-20 rounded-xl border outline-none transition ${
                      errors.password
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-brand focus:ring-2 focus:ring-brand/10"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-brand hover:text-brand-dark"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-brand-dark mb-2"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={`w-full px-4 py-3 pr-20 rounded-xl border outline-none transition ${
                      errors.confirmPassword
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-brand focus:ring-2 focus:ring-brand/10"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-brand hover:text-brand-dark"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Message */}
              {message && (
                <p
                  className="bg-red-50 text-red-700 text-sm p-3 rounded-lg"
                  role="alert"
                >
                  {message}
                </p>
              )}

              {/* Register Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand text-white py-3.5 rounded-xl font-semibold hover:bg-brand-dark transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>

            </form>

            <p className="text-center text-sm text-ink/60 mt-7">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-brand font-bold hover:text-brand-dark"
              >
                Sign In
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;
