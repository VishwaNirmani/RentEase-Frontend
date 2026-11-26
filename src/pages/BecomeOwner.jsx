import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { getApiErrorMessage } from "../api/apiErrorMessage";
import { useAuth } from "../context/useAuth";

const benefits = [
  {
    title: "Reach more renters",
    description:
      "Showcase your property to people searching for their next home.",
  },
  {
    title: "Manage your listings",
    description:
      "Keep your properties and rental enquiries together in one place.",
  },
  {
    title: "Stay in control",
    description:
      "Review booking requests and manage your rental activity.",
  },
];

function OwnerApplicationForm({
  reason,
  onReasonChange,
  isSubmitting,
  submitError,
  successMessage,
  onSubmit,
}) {
  return (
    <>
      <p className="mt-3 text-sm leading-6 text-ink/60">
        Tell us a little about your plans for renting property. Applications
        are reviewed by the RentEase admin team.
      </p>

      <form onSubmit={onSubmit} className="mt-6">
        <label
          htmlFor="ownerReason"
          className="mb-2 block text-sm font-semibold text-brand-dark"
        >
          Why would you like to become a property owner?
        </label>
        <textarea
          id="ownerReason"
          name="reason"
          required
          maxLength={2000}
          rows={7}
          value={reason}
          onChange={onReasonChange}
          placeholder="Share your rental plans and how you would use RentEase..."
          className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
        />
        <div className="mt-2 flex justify-between text-xs text-ink/50">
          <span>Up to 2,000 characters</span>
          <span>{reason.length}/2000</span>
        </div>

        {(submitError || successMessage) && (
          <p
            className={`mt-4 rounded-xl p-3 text-sm ${
              submitError
                ? "bg-red-50 text-red-700"
                : "bg-emerald-50 text-emerald-800"
            }`}
            role={submitError ? "alert" : "status"}
          >
            {submitError || successMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !reason.trim()}
          className="mt-5 w-full rounded-xl bg-brand px-5 py-3.5 font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Submit application"}
        </button>
      </form>
    </>
  );
}

function BecomeOwner() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let isCurrent = true;

    apiClient
      .get("/owner-applications/my-application")
      .then(({ data }) => {
        if (isCurrent) {
          setApplication(data);
        }
      })
      .catch((error) => {
        if (!isCurrent) {
          return;
        }

        if (error.response?.status !== 404) {
          setLoadError(getApiErrorMessage(error));
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!reason.trim()) {
      setSubmitError("Please tell us why you want to become a property owner.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSuccessMessage("");

    try {
      const { data } = await apiClient.post("/owner-applications", {
        reason: reason.trim(),
      });

      setApplication(data);
      setReason("");
      setSuccessMessage("Your owner application has been submitted.");
    } catch (error) {
      setSubmitError(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isApproved = application?.status === "Approved";
  const isPending = application?.status === "Pending";

  return (
    <main className="min-h-screen bg-cream px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              to="/"
              className="text-sm font-semibold text-brand hover:text-brand-dark sm:text-2xl"
            >
              ← Back to RentEase
            </Link>
            <p className="mt-4 text-xs font-semibold tracking-widest text-brand">
              RENT EASE OWNER PROGRAM
            </p>
            <h1 className="mt-2 text-3xl font-bold text-brand-dark sm:text-4xl">
              Become a Property Owner
            </h1>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-3xl bg-brand-dark p-7 text-white shadow-sm sm:p-10">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/85">
              Your next step with RentEase
            </span>
            <h2 className="mt-6 max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
              Turn your property into an opportunity.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-white/75">
              Apply to manage rental properties on RentEase. An administrator
              will review your request before owner tools become available.
            </p>

            <div className="mt-8 space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent font-bold text-brand-dark">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{benefit.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/70">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-brand/10 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold tracking-wider text-brand">
              APPLICATION
            </p>
            <h2 className="mt-2 text-2xl font-bold text-brand-dark">
              Your application
            </h2>

            {isLoading ? (
              <p className="mt-6 text-sm text-ink/60">
                Checking your application status...
              </p>
            ) : loadError ? (
              <p
                className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700"
                role="alert"
              >
                {loadError}
              </p>
            ) : application ? (
              <div className="mt-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      isApproved
                        ? "bg-emerald-100 text-emerald-800"
                        : isPending
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {application.status}
                  </span>
                  <span className="text-xs text-ink/50">
                    Submitted{" "}
                    {new Date(application.submittedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-5 rounded-2xl bg-cream p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                    Your reason
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-ink">
                    {application.reason}
                  </p>
                </div>

                {application.adminRemarks && (
                  <div className="mt-4 rounded-2xl border border-brand/10 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                      Administrator remarks
                    </p>
                    <p className="mt-2 text-sm leading-6 text-ink/80">
                      {application.adminRemarks}
                    </p>
                  </div>
                )}

                {isPending && (
                  <>
                    {successMessage && (
                      <p
                        className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800"
                        role="status"
                      >
                        {successMessage}
                      </p>
                    )}
                    <p className="mt-5 text-sm leading-6 text-ink/60">
                      Your request is being reviewed. You can check back here
                      for an update.
                    </p>
                  </>
                )}

                {isApproved && (
                  <div className="mt-5 rounded-2xl bg-brand-light/60 p-5">
                    <p className="text-sm leading-6 text-brand-dark">
                      Your application is approved. Sign in again to receive a
                      fresh Owner access token.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        navigate("/login", { replace: true });
                      }}
                      className="mt-4 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
                    >
                      Sign in again
                    </button>
                  </div>
                )}

                {application.status === "Rejected" && (
                  <div className="mt-6 border-t border-brand/10 pt-5">
                    <p className="text-sm leading-6 text-ink/60">
                      You may submit a new application with updated
                      information.
                    </p>
                    <OwnerApplicationForm
                      reason={reason}
                      onReasonChange={(event) =>
                        setReason(event.target.value)
                      }
                      isSubmitting={isSubmitting}
                      submitError={submitError}
                      successMessage={successMessage}
                      onSubmit={handleSubmit}
                    />
                  </div>
                )}
              </div>
            ) : (
              <OwnerApplicationForm
                reason={reason}
                onReasonChange={(event) => setReason(event.target.value)}
                isSubmitting={isSubmitting}
                submitError={submitError}
                successMessage={successMessage}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default BecomeOwner;
