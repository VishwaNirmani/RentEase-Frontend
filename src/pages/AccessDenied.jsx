import { Link } from "react-router-dom";
import { getDashboardPathForRole } from "../auth/roleRoutes";
import { useAuth } from "../context/useAuth";

function AccessDenied() {
  const { isAuthenticated, user } = useAuth();
  const dashboardPath = isAuthenticated
    ? getDashboardPathForRole(user.role)
    : "/";
  const hasDashboard = isAuthenticated && user.role !== "Tenant";

  return (
    <section className="min-h-[65vh] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-brand/10 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-light text-3xl">
          🔒
        </div>
        <p className="mt-6 text-sm font-semibold tracking-widest text-brand">
          ACCESS RESTRICTED
        </p>
        <h1 className="mt-3 text-3xl font-bold text-brand-dark">
          You don't have access to this page
        </h1>
        <p className="mt-4 leading-7 text-ink/60">
          This area is available to a different account role. If you believe
          you should have access, sign in with the appropriate account.
        </p>
        <Link
          to={dashboardPath}
          className="mt-8 inline-flex rounded-xl bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-dark"
        >
          {hasDashboard ? "Return to your dashboard" : "Return home"}
        </Link>
      </div>
    </section>
  );
}

export default AccessDenied;
