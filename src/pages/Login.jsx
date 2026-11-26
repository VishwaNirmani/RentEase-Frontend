
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "../api/apiErrorMessage";
import { useAuth } from "../context/useAuth";

function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
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

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters.";
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
      await login({
        ...formData,
        email: formData.email.trim(),
      });
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
        <div className="hidden lg:block relative min-h-[650px]">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
            alt="Beautiful modern home"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-brand-dark/75" />

          <div className="relative z-10 h-full flex flex-col justify-between p-12 text-white">

            <Link to="/" className="text-3xl font-bold">
              RentEase<span className="text-accent">.</span>
            </Link>

            <div>
              <span className="text-accent font-semibold text-sm tracking-widest">
                WELCOME HOME
              </span>

              <h2 className="text-4xl font-bold leading-tight mt-4">
                Find a place where life feels right.
              </h2>

              <p className="text-white/80 mt-5 leading-7 max-w-md">
                Discover comfortable spaces, connect with property owners,
                and make your next move with confidence.
              </p>
            </div>

            <p className="text-white/60 text-sm">
              Your next chapter starts with RentEase.
            </p>

          </div>
        </div>

        {/* Right Login Form */}
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
                WELCOME BACK
              </span>

              <h1 className="text-3xl font-bold text-brand-dark mt-3">
                Sign in to your account
              </h1>

              <p className="text-ink/60 mt-3">
                Enter your details to access your RentEase account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-9 space-y-6">

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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3.5 rounded-xl border outline-none transition ${
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
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3.5 pr-20 rounded-xl border outline-none transition ${
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

              {/* Submit Message */}
              {message && (
                <p
                  className="bg-red-50 text-red-700 text-sm p-3 rounded-lg"
                  role="alert"
                >
                  {message}
                </p>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand text-white py-3.5 rounded-xl font-semibold hover:bg-brand-dark transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>

            </form>

            <p className="text-center text-sm text-ink/60 mt-8">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-brand font-bold hover:text-brand-dark"
              >
                Create an account
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
