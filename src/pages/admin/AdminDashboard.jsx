import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { getApiErrorMessage } from "../../api/apiErrorMessage";

function AdminDashboard() {
  const [pendingCount, setPendingCount] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    apiClient
      .get("/owner-applications/admin/pending")
      .then(({ data }) => {
        if (isCurrent) {
          setPendingCount(data.length);
        }
      })
      .catch((requestError) => {
        if (isCurrent) {
          setError(getApiErrorMessage(requestError));
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl p-5 md:p-10">
      <section className="rounded-3xl bg-brand-dark p-7 text-white shadow-sm sm:p-10">
        <p className="text-sm font-semibold tracking-widest text-accent">
          ADMIN OVERVIEW
        </p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Manage RentEase applications
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-white/75">
          Review tenant requests to become property owners. Approvals update
          the applicant’s role, while rejected applicants remain tenants.
        </p>
      </section>

      {error && (
        <p
          className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      )}

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border border-brand/10 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-ink/60">
            Pending owner applications
          </p>
          <p className="mt-3 text-4xl font-bold text-brand-dark">
            {pendingCount === null ? "—" : pendingCount}
          </p>
          <Link
            to="/admin/owner-applications"
            className="mt-5 inline-flex font-semibold text-brand hover:text-brand-dark"
          >
            Review applications <span aria-hidden="true">→</span>
          </Link>
        </article>

        <article className="rounded-2xl border border-brand/10 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-ink/60">Admin access</p>
          <h3 className="mt-3 text-xl font-bold text-brand-dark">
            Role-protected tools
          </h3>
          <p className="mt-2 text-sm leading-6 text-ink/60">
            Administrative endpoints require an Admin JWT role. Frontend
            navigation does not grant API permissions.
          </p>
        </article>
      </section>
    </div>
  );
}

export default AdminDashboard;
