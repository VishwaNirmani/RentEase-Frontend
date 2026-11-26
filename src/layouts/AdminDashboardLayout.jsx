import { Link, NavLink, Outlet } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../context/useAuth";

const navigation = [
  { label: "Overview", path: "/admin/dashboard", end: true },
  { label: "Owner Applications", path: "/admin/owner-applications" },
];

function AdminDashboardLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-cream md:flex">
      <aside className="hidden w-64 shrink-0 flex-col bg-brand-dark text-white md:flex">
        <div className="border-b border-white/10 px-7 py-8">
          <Link to="/" className="text-2xl font-bold">
            RentEase<span className="text-accent">.</span>
          </Link>
          <p className="mt-2 text-xs text-white/50">Admin Dashboard</p>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-7">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-white/10 font-semibold text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-5">
          <Link
            to="/"
            className="block px-3 py-2 text-white/70 transition hover:text-white"
          >
            ← Back to website
          </Link>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-brand/10 bg-white px-5 py-5 md:px-10">
          <div>
            <p className="text-xs font-semibold tracking-wider text-brand">
              ADMIN PORTAL
            </p>
            <h1 className="mt-1 text-xl font-bold text-brand-dark md:text-2xl">
              RentEase Administration
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-brand-dark">
                {user.email}
              </p>
              <p className="text-xs text-ink/50">Administrator</p>
            </div>
            <LogoutButton className="rounded-xl border border-brand/20 px-4 py-2 text-sm font-semibold text-brand-dark transition hover:bg-brand-light" />
          </div>
        </header>
        <nav className="flex gap-2 overflow-x-auto border-b border-brand/10 bg-white px-4 py-3 md:hidden">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `shrink-0 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-brand-light text-brand-dark"
                    : "text-ink/60 hover:bg-cream"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboardLayout;
