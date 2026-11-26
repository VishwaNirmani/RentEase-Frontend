
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../context/useAuth";

const initialProperties = [
  {
    id: 1,
    title: "Modern City Apartment",
    location: "Colombo 05",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    monthlyRent: 45000,
    status: "Available",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  },
  {
    id: 2,
    title: "Beautiful Family House",
    location: "Nugegoda",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    monthlyRent: 75000,
    status: "Rented",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: 3,
    title: "Luxury Villa",
    location: "Mount Lavinia",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 3,
    monthlyRent: 120000,
    status: "Available",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
  },
];

const initialRequests = [
  {
    id: 1,
    tenant: "Kasun Perera",
    property: "Modern City Apartment",
    location: "Colombo 05",
    startDate: "01 December 2026",
    endDate: "31 December 2026",
    rent: 45000,
    status: "Pending",
    initials: "KP",
  },
  {
    id: 2,
    tenant: "Nimali Fernando",
    property: "Beautiful Family House",
    location: "Nugegoda",
    startDate: "01 January 2027",
    endDate: "31 January 2027",
    rent: 75000,
    status: "Pending",
    initials: "NF",
  },
  {
    id: 3,
    tenant: "Amal Silva",
    property: "Luxury Villa",
    location: "Mount Lavinia",
    startDate: "01 November 2026",
    endDate: "30 November 2026",
    rent: 120000,
    status: "Approved",
    initials: "AS",
  },
];

const navigation = [
  { label: "Overview", path: "/owner/dashboard", icon: "▦", end: true },
  { label: "My Properties", path: "/owner/properties", icon: "⌂" },
  { label: "Booking Requests", path: "/owner/booking-requests", icon: "▤" },
  { label: "Add Property", path: "/owner/add-property", icon: "+" },
];

function OwnerDashboardLayout() {
  const { user } = useAuth();
  const [properties, setProperties] = useState(initialProperties);
  const [requests, setRequests] = useState(initialRequests);

  const handleRequestStatus = (requestId, newStatus) => {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === requestId
          ? { ...request, status: newStatus }
          : request
      )
    );
  };

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  return (
    <div className="min-h-screen bg-cream flex md:h-screen md:overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-30 md:flex md:h-screen w-64 shrink-0 bg-brand-dark text-white flex-col">
        <div className="px-7 py-8 border-b border-white/10">
          <Link to="/" className="text-2xl font-bold">
            RentEase<span className="text-accent">.</span>
          </Link>
          <p className="text-white/50 text-xs mt-2">Owner Dashboard</p>
        </div>

        <nav className="flex-1 px-4 py-7 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-white/10 text-white font-semibold"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}

              {item.label === "Booking Requests" && pendingCount > 0 && (
                <span className="ml-auto bg-accent text-brand-dark text-xs font-bold px-2 py-1 rounded-full">
                  {pendingCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto p-5 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-3 text-white/70 hover:text-white transition px-3 py-2"
          >
            <span>←</span>
            Back to Home
          </Link>
        </div>
      </aside>

      {/* Dashboard Content */}
      <main className="flex-1 min-w-0 md:ml-64 md:h-screen md:overflow-y-auto">
        <header className="bg-white border-b border-brand/10 px-5 md:px-10 py-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-brand font-semibold tracking-wider">
              OWNER PORTAL
            </p>
            <h1 className="text-xl md:text-2xl font-bold text-brand-dark mt-1">
              Owner Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-brand-dark">
                {user.email}
              </p>
              <p className="text-xs text-ink/50">Property Owner Account</p>
            </div>

            <div className="w-11 h-11 rounded-full bg-brand-light flex items-center justify-center text-brand-dark font-bold">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <LogoutButton className="rounded-xl border border-brand/20 px-3 py-2 text-xs font-semibold text-brand-dark transition hover:bg-brand-light sm:px-4 sm:text-sm" />
          </div>
        </header>

        <Outlet
          context={{
            properties,
            setProperties,
            requests,
            handleRequestStatus,
          }}
        />
      </main>
    </div>
  );
}

export default OwnerDashboardLayout;
