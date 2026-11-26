
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import heroImage from "../assets/heroo.png";

const propertyCategories = [
  {
    id: 1,
    name: "Apartments",
    filterType: "Apartment",
    description: "Modern spaces for city living.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  },
  {
    id: 2,
    name: "Houses",
    filterType: "House",
    description: "Comfortable spaces to call home.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: 3,
    name: "Villas",
    filterType: "Villa",
    description: "Discover a little extra luxury.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
  },
  {
    id: 4,
    name: "Studios",
    filterType: "Studio",
    description: "Smart and stylish compact living.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  },
  {
    id: 5,
    name: "Commercial",
    filterType: "Commercial",
    description: "Find spaces for your business.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
  },
  {
    id: 6,
    name: "Land",
    filterType: "Land",
    description: "Explore land for future possibilities.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  },
];

function Home() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    const searchParams = new URLSearchParams();

    if (location.trim()) {
      searchParams.set("search", location.trim());
    }

    if (propertyType) {
      searchParams.set("type", propertyType);
    }

    const query = searchParams.toString();
    navigate(query ? `/properties?${query}` : "/properties");
  };

  return (
    <div className="bg-cream">

      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden flex items-center">

        {/* Background Image */}
        <div
          className="hero-image absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-20">
          <div className="max-w-2xl">

            {/* Eyebrow */}
            <div
              className="flex items-center gap-3 mb-7 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="w-10 h-[2px] bg-accent"></span>

              <span className="text-accent uppercase tracking-[0.25em] text-sm font-bold">
                Welcome to RentEase
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className="text-5xl md:text-7xl font-bold text-white leading-[1.12] tracking-tight animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              More than a place to stay.

              <span className="block text-[#E7C999] mt-2">
                A place to belong.
              </span>
            </h1>

            {/* Description */}
            <p
              className="text-white/85 text-base md:text-lg mt-7 leading-8 max-w-xl animate-fade-up"
              style={{ animationDelay: "0.6s" }}
            >
              Explore a diverse range of properties, from modern apartments
              and beautiful villas to commercial spaces and land. Find the
              right property for your needs, lifestyle and ambitions.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="bg-white p-2 rounded-2xl shadow-lg mt-10 flex flex-col md:flex-row gap-4 animate-fade-up"
              style={{ animationDelay: "0.8s" }}
            >
              <input
                type="text"
                placeholder="Enter city or location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="flex-1 px-4 py-3 border border-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-brand-light"
              />

              <select
                value={propertyType}
                onChange={(event) => setPropertyType(event.target.value)}
                className="px-4 py-3 border border-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-brand-light"
              >
                <option value="">Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Studio">Studio</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
              </select>

              <button
                type="submit"
                className="button-hover bg-brand text-white px-7 py-3 rounded-lg font-semibold hover:bg-brand-dark"
              >
                Search Properties
              </button>
            </form>

          </div>
        </div>
      </section>



      {/* Explore Property Categories */}
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12 animate-fade-up">
            <span className="text-brand font-semibold text-sm">
              EXPLORE PROPERTIES
            </span>

            <h2 className="text-3xl font-bold text-brand-dark mt-3">
              Find the Right Space for You
            </h2>

            <p className="text-ink/70 mt-3">
              From comfortable homes to commercial spaces,
              explore different property categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

            {propertyCategories.map((category, index) => (
              <div
                key={category.id}
                className="group hover-lift animate-card bg-white rounded-2xl overflow-hidden shadow-sm"
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-brand-dark">
                    {category.name}
                  </h3>

                  <p className="text-ink/70 text-sm mt-2">
                    {category.description}
                  </p>

                  <Link
                    to={`/properties?type=${encodeURIComponent(category.filterType)}`}
                    className="mt-5 inline-block text-brand font-semibold text-sm hover:text-brand-dark transition-colors"
                  >
                    Explore Properties →
                  </Link>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
      {/* Why RentEase Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12 animate-fade-up">
            <span className="text-brand font-semibold text-sm">
              WHY RENTEASE
            </span>

            <h2 className="text-3xl font-bold text-brand-dark mt-3">
              Making Renting Easier
            </h2>

            <p className="text-ink/70 mt-3">
              Everything you need for a smoother rental experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div
              className="hover-lift animate-card p-8 rounded-2xl border border-gray-100 shadow-sm"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="text-4xl mb-5">🏡</div>

              <h3 className="text-xl font-semibold text-brand-dark mb-3">
                Find Your Home
              </h3>

              <p className="text-ink/70 leading-7">
                Explore different rental properties and find a place
                that suits your needs.
              </p>
            </div>

            <div
              className="hover-lift animate-card p-8 rounded-2xl border border-gray-100 shadow-sm"
              style={{ animationDelay: "0.25s" }}
            >
              <div className="text-4xl mb-5">📅</div>

              <h3 className="text-xl font-semibold text-brand-dark mb-3">
                Easy Booking
              </h3>

              <p className="text-ink/70 leading-7">
                Request property bookings and manage your rental
                process conveniently.
              </p>
            </div>

            <div
              className="hover-lift animate-card p-8 rounded-2xl border border-gray-100 shadow-sm"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-4xl mb-5">🔒</div>

              <h3 className="text-xl font-semibold text-brand-dark mb-3">
                Secure Experience
              </h3>

              <p className="text-ink/70 leading-7">
                Manage your account and rental activities through
                a centralized platform.
              </p>
            </div>

          </div>
        </div>
      </section>



      {/* How It Works */}


      <section className="bg-brand-light/20 py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14 animate-fade-up">
            <span className="text-brand font-semibold text-sm tracking-wider">
              SIMPLE PROCESS
            </span>

            <h2 className="text-3xl font-bold text-brand-dark mt-3">
              How RentEase Works
            </h2>

            <p className="text-ink/70 mt-3">
              Find and book your next property in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Step 1 */}
            <div
              className="group relative overflow-hidden bg-white border border-brand/20  rounded-2xl text-center p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-3 animate-card"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-brand-light/70 flex items-center justify-center text-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-brand">
                <span className="transition-transform duration-500 group-hover:scale-110 group-hover:grayscale">
                  🔍
                </span>
              </div>

              <span className="block text-accent text-sm font-bold mt-6 tracking-widest">
                STEP 01
              </span>

              <h3 className="text-xl font-bold text-brand-dark mt-2">
                Find a Property
              </h3>

              <p className="text-ink/70 mt-4 leading-7">
                Browse available properties and explore their details to find the right match.
              </p>

              <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent transition-all duration-500 group-hover:w-full" />
            </div>

            {/* Step 2 */}
            <div
              className="group relative overflow-hidden bg-white border border-brand/20  rounded-2xl text-center p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-3 animate-card"
              style={{ animationDelay: "0.25s" }}
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-brand-light/70 flex items-center justify-center text-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-brand">
                <span className="transition-transform duration-500 group-hover:scale-110">
                  📝
                </span>
              </div>

              <span className="block text-accent text-sm font-bold mt-6 tracking-widest">
                STEP 02
              </span>

              <h3 className="text-xl font-bold text-brand-dark mt-2">
                Request a Booking
              </h3>

              <p className="text-ink/70 mt-4 leading-7">
                Select your rental dates and submit a booking request to the property owner.
              </p>

              <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent transition-all duration-500 group-hover:w-full" />
            </div>

            {/* Step 3 */}
            <div
              className="group relative overflow-hidden bg-white border border-brand/20  rounded-2xl text-center p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-3 animate-card"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-brand-light/70 flex items-center justify-center text-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-brand">
                <span className="transition-transform duration-500 group-hover:scale-110">
                  ✓
                </span>
              </div>

              <span className="block text-accent text-sm font-bold mt-6 tracking-widest">
                STEP 03
              </span>

              <h3 className="text-xl font-bold text-brand-dark mt-2">
                Get Confirmation
              </h3>

              <p className="text-ink/70 mt-4 leading-7">
                The property owner reviews your request and approves or rejects the booking.
              </p>

              <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent transition-all duration-500 group-hover:w-full" />
            </div>

          </div>
        </div>
      </section>


      {/* Call To Action */}
      <section className="bg-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center animate-fade-up">

          <p className="text-brand font-semibold text-sm tracking-widest uppercase">
            Your next chapter starts here
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mt-4">
            Find a place that feels right.
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-7">
            Explore properties, discover new possibilities, and
            make your next move with RentEase.
          </p>

          <Link
            to="/register"
            className="button-hover inline-block mt-8 bg-brand text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-dark"
          >
            Create an Account
          </Link>

        </div>
      </section>

    </div>
  );
}

export default Home;
