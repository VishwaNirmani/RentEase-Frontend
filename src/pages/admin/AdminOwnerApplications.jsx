import { useEffect, useRef, useState } from "react";
import apiClient from "../../api/apiClient";
import { getApiErrorMessage } from "../../api/apiErrorMessage";

function formatDate(value) {
  return new Date(value).toLocaleString();
}

function AdminOwnerApplications() {
  const [applications, setApplications] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [adminRemarks, setAdminRemarks] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [error, setError] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const detailRequestId = useRef(0);

  useEffect(() => {
    let isCurrent = true;

    apiClient
      .get("/owner-applications/admin/pending")
      .then(({ data }) => {
        if (isCurrent) {
          setApplications(data);
        }
      })
      .catch((requestError) => {
        if (isCurrent) {
          setError(getApiErrorMessage(requestError));
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const selectApplication = async (id) => {
    const requestId = detailRequestId.current + 1;
    detailRequestId.current = requestId;

    setSelectedId(id);
    setSelectedApplication(null);
    setAdminRemarks("");
    setDetailsError("");
    setSuccessMessage("");
    setIsLoadingDetails(true);

    try {
      const { data } = await apiClient.get(
        `/owner-applications/admin/${id}`,
      );

      if (detailRequestId.current === requestId) {
        setSelectedApplication(data);
        setAdminRemarks(data.adminRemarks ?? "");
      }
    } catch (requestError) {
      if (detailRequestId.current === requestId) {
        setDetailsError(getApiErrorMessage(requestError));
      }
    } finally {
      if (detailRequestId.current === requestId) {
        setIsLoadingDetails(false);
      }
    }
  };

  const reviewApplication = async (decision) => {
    if (!selectedApplication) {
      return;
    }

    setIsReviewing(true);
    setDetailsError("");
    setSuccessMessage("");

    try {
      const { data } = await apiClient.post(
        `/owner-applications/admin/${selectedApplication.id}/${decision}`,
        { adminRemarks: adminRemarks.trim() || null },
      );

      setSelectedApplication(data);
      setApplications((currentApplications) =>
        currentApplications.filter(
          (application) => application.id !== data.id,
        ),
      );
      setSuccessMessage(
        `Application ${decision === "approve" ? "approved" : "rejected"}.`,
      );
    } catch (requestError) {
      setDetailsError(getApiErrorMessage(requestError));
    } finally {
      setIsReviewing(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-5 md:p-10">
      <div className="mb-7">
        <p className="text-xs font-semibold tracking-widest text-brand">
          ADMIN REVIEW
        </p>
        <h2 className="mt-2 text-3xl font-bold text-brand-dark">
          Owner applications
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/60">
          Review each applicant’s reason and decide whether to approve or
          reject their request.
        </p>
      </div>

      {error && (
        <p
          className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      )}

      <div className="grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="overflow-hidden rounded-2xl border border-brand/10 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-brand/10 px-5 py-4">
            <h3 className="font-bold text-brand-dark">Pending review</h3>
            <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-bold text-brand-dark">
              {applications.length}
            </span>
          </div>

          {isLoading ? (
            <p className="p-6 text-sm text-ink/60">
              Loading applications...
            </p>
          ) : applications.length === 0 ? (
            <div className="p-6">
              <p className="font-semibold text-brand-dark">
                No pending applications
              </p>
              <p className="mt-2 text-sm leading-6 text-ink/60">
                New tenant applications will appear here.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {applications.map((application) => (
                <li key={application.id}>
                  <button
                    type="button"
                    aria-pressed={selectedId === application.id}
                    onClick={() => selectApplication(application.id)}
                    className={`w-full px-5 py-4 text-left transition hover:bg-cream ${
                      selectedId === application.id ? "bg-brand-light/50" : ""
                    }`}
                  >
                    <span className="block font-semibold text-brand-dark">
                      {application.applicantFirstName}{" "}
                      {application.applicantLastName}
                    </span>
                    <span className="mt-1 block text-sm text-ink/60">
                      {application.applicantEmail}
                    </span>
                    <span className="mt-2 block text-xs text-ink/50">
                      Submitted {formatDate(application.submittedAt)}
                    </span>
                    <span className="mt-3 block line-clamp-2 text-sm leading-5 text-ink/70">
                      {application.reason}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="min-h-72 rounded-2xl border border-brand/10 bg-white p-5 shadow-sm sm:p-7">
          {!selectedId ? (
            <div className="flex min-h-60 flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-2xl">
                ✓
              </div>
              <h3 className="mt-4 font-bold text-brand-dark">
                Select an application
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-ink/60">
                Applicant details and review actions will appear here.
              </p>
            </div>
          ) : isLoadingDetails ? (
            <p className="py-12 text-center text-sm text-ink/60">
              Loading application details...
            </p>
          ) : detailsError && !selectedApplication ? (
            <p
              className="rounded-xl bg-red-50 p-4 text-sm text-red-700"
              role="alert"
            >
              {detailsError}
            </p>
          ) : selectedApplication ? (
            <>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-brand">
                    APPLICATION #{selectedApplication.id}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-brand-dark">
                    {selectedApplication.applicantFirstName}{" "}
                    {selectedApplication.applicantLastName}
                  </h3>
                  <p className="mt-1 text-sm text-ink/60">
                    {selectedApplication.applicantEmail}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    selectedApplication.status === "Pending"
                      ? "bg-amber-100 text-amber-800"
                      : selectedApplication.status === "Approved"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedApplication.status}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                  Applicant's reason
                </p>
                <p className="mt-2 whitespace-pre-wrap rounded-xl bg-cream p-4 text-sm leading-6 text-ink">
                  {selectedApplication.reason}
                </p>
              </div>

              <p className="mt-4 text-xs text-ink/50">
                Submitted {formatDate(selectedApplication.submittedAt)}
              </p>

              {selectedApplication.status === "Pending" ? (
                <div className="mt-6 border-t border-brand/10 pt-5">
                  <label
                    htmlFor="adminRemarks"
                    className="mb-2 block text-sm font-semibold text-brand-dark"
                  >
                    Admin remarks <span className="font-normal text-ink/50">(optional)</span>
                  </label>
                  <textarea
                    id="adminRemarks"
                    maxLength={2000}
                    rows={4}
                    value={adminRemarks}
                    onChange={(event) => setAdminRemarks(event.target.value)}
                    placeholder="Add feedback for the applicant..."
                    className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
                  />
                  <p className="mt-1 text-right text-xs text-ink/50">
                    {adminRemarks.length}/2000
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      disabled={isReviewing}
                      onClick={() => reviewApplication("approve")}
                      className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isReviewing ? "Saving..." : "Approve application"}
                    </button>
                    <button
                      type="button"
                      disabled={isReviewing}
                      onClick={() => reviewApplication("reject")}
                      className="rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Reject application
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-xl bg-cream p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                    Review details
                  </p>
                  <p className="mt-2 text-sm text-ink/70">
                    Reviewed{" "}
                    {selectedApplication.reviewedAt
                      ? formatDate(selectedApplication.reviewedAt)
                      : "—"}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink/70">
                    {selectedApplication.adminRemarks || "No remarks provided."}
                  </p>
                </div>
              )}

              {(detailsError || successMessage) && (
                <p
                  className={`mt-4 rounded-xl p-3 text-sm ${
                    detailsError
                      ? "bg-red-50 text-red-700"
                      : "bg-emerald-50 text-emerald-800"
                  }`}
                  role={detailsError ? "alert" : "status"}
                >
                  {detailsError || successMessage}
                </p>
              )}
            </>
          ) : null}
        </section>
      </div>
    </div>
  );
}

export default AdminOwnerApplications;
