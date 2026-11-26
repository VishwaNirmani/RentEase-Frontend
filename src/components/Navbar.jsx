
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { getDashboardPathForRole } from "../auth/roleRoutes";
import { useAuth } from "../context/useAuth";

function MenuIcon({ name, className = "h-5 w-5" }) {
  const sharedProps = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (name) {
    case "bookings":
      return (
        <svg {...sharedProps}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 11h18" />
        </svg>
      );
    case "owner":
      return (
        <svg {...sharedProps}>
          <path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-6h6v6" />
        </svg>
      );
    case "dashboard":
      return (
        <svg {...sharedProps}>
          <rect x="3" y="3" width="8" height="8" rx="1.5" />
          <rect x="13" y="3" width="8" height="8" rx="1.5" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" />
          <rect x="13" y="13" width="8" height="8" rx="1.5" />
        </svg>
      );
    case "profile":
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 21a7 7 0 0 1 14 0" />
        </svg>
      );
    case "logout":
      return (
        <svg {...sharedProps}>
          <path d="M10 17l5-5-5-5M15 12H3M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
        </svg>
      );
    default:
      return null;
  }
}

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const isProfileMenuUser =
    isAuthenticated && ["Tenant", "Owner"].includes(user.role);
  const profileName =
    user?.name ||
    user?.fullName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.email ||
    "My Account";
  const profileMenuItems =
    user?.role === "Tenant"
      ? [
          { label: "My Bookings", to: "/my-bookings", icon: "bookings" },
          {
            label: "Become a Property Owner",
            to: "/tenant/become-owner",
            icon: "owner",
          },
          { label: "My Profile", to: "/profile", icon: "profile" },
        ]
      : [
          {
            label: "My Bookings",
            to: "/my-bookings",
            icon: "bookings",
          },
          { label: "Dashboard", to: "/owner/dashboard", icon: "dashboard" },
          { label: "My Profile", to: "/profile", icon: "profile" },
        ];

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-brand font-semibold"
        : "text-ink hover:text-brand"
    }`;

  useEffect(() => {
    if (!isProfileMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileMenuOpen]);

  const handleProfileLogout = () => {
    setIsProfileMenuOpen(false);
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">

        {/* Logo */}
        <Link to="/" className="shrink-0 text-2xl font-bold text-brand-dark">
          RentEase<span className="text-accent">.</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 sm:gap-x-7">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/properties" className={navLinkClass}>
            Properties
          </NavLink>

          <NavLink to="/about-us" className={navLinkClass}>
            About Us
          </NavLink>

          {isProfileMenuUser ? (
            <div ref={profileMenuRef} className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isProfileMenuOpen}
                aria-controls="profile-menu"
                onClick={() =>
                  setIsProfileMenuOpen((isOpen) => !isOpen)
                }
                className="flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-xl border border-brand/15 px-3 py-2 text-sm font-medium text-brand-dark transition hover:border-brand/30 hover:bg-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand/30"
              >
                <MenuIcon name="profile" className="h-5 w-5 shrink-0" />
                <span className="max-w-28 truncate sm:max-w-40">
                  {profileName}
                </span>
                <svg
                  className={`h-4 w-4 shrink-0 transition-transform ${
                    isProfileMenuOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.092 1.03l-4.25 4.51a.75.75 0 0 1-1.096 0l-4.25-4.51a.75.75 0 0 1 .024-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isProfileMenuOpen && (
                <div
                  id="profile-menu"
                  role="menu"
                  className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-brand/10 bg-white py-2 shadow-xl"
                >
                  {profileMenuItems.map((item) => (
                    <Link
                      key={item.to}
                      role="menuitem"
                      to={item.to}
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-ink transition hover:bg-brand-light/60 hover:text-brand-dark focus:bg-brand-light/60 focus:outline-none"
                    >
                      <MenuIcon
                        name={item.icon}
                        className="h-5 w-5 text-brand"
                      />
                      {item.label}
                    </Link>
                  ))}
                  <div className="my-2 border-t border-brand/10" />
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleProfileLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-700 transition hover:bg-red-50 focus:bg-red-50 focus:outline-none"
                  >
                    <MenuIcon name="logout" className="h-5 w-5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : isAuthenticated ? (
            <>
              <Link
                to={getDashboardPathForRole(user.role)}
                className={navLinkClass({ isActive: false })}
              >
                Dashboard
              </Link>
              <LogoutButton className="rounded-lg border border-brand/20 px-4 py-2 text-sm font-semibold text-brand-dark transition hover:bg-brand-light" />
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <Link
                to="/register"
                className="rounded-lg bg-brand px-5 py-2 text-white transition hover:bg-brand-dark"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

      </nav>
    </header>
  );
}

export default Navbar;
