
import { useOutletContext } from "react-router-dom";

function OwnerBookingRequests() {
  const { requests, handleRequestStatus } = useOutletContext();

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-100 text-emerald-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  return (
    <div className="p-5 md:p-10 max-w-7xl mx-auto">
      {/* Page Heading */}
      <section className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-dark">
          Booking Requests
        </h2>
        <p className="text-ink/60 mt-2">
          Review tenant requests and decide whether to approve or reject them.
        </p>
      </section>

      {/* Summary */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white border border-brand/10 rounded-2xl p-5">
          <p className="text-sm text-ink/60">Total Requests</p>
          <h3 className="text-3xl font-bold text-brand-dark mt-2">
            {requests.length}
          </h3>
        </div>

        <div className="bg-white border border-brand/10 rounded-2xl p-5">
          <p className="text-sm text-ink/60">Pending Requests</p>
          <h3 className="text-3xl font-bold text-amber-600 mt-2">
            {pendingCount}
          </h3>
        </div>

        <div className="bg-white border border-brand/10 rounded-2xl p-5">
          <p className="text-sm text-ink/60">Approved Requests</p>
          <h3 className="text-3xl font-bold text-emerald-700 mt-2">
            {requests.filter((request) => request.status === "Approved").length}
          </h3>
        </div>
      </section>

      {/* Requests */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-brand-dark">
            All Requests
          </h3>
          <span className="text-sm text-ink/50">
            {requests.length} requests
          </span>
        </div>

        <div className="space-y-4">
          {requests.length > 0 ? (
            requests.map((request) => (
              <article
                key={request.id}
                className="bg-white rounded-2xl border border-brand/10 p-5 md:p-6 shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                  {/* Tenant */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center text-brand-dark font-bold shrink-0">
                      {request.initials}
                    </div>

                    <div>
                      <h3 className="font-bold text-brand-dark">
                        {request.tenant}
                      </h3>
                      <p className="text-sm text-ink/50 mt-1">
                        Booking request #{request.id}
                      </p>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-brand-dark">
                      {request.property}
                    </p>
                    <p className="text-sm text-ink/60 mt-1">
                      📍 {request.location}
                    </p>
                    <p className="text-sm text-ink/60 mt-2">
                      {request.startDate} – {request.endDate}
                    </p>
                    <p className="text-sm font-semibold text-brand mt-2">
                      Rs. {request.rent.toLocaleString("en-LK")} / month
                    </p>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex flex-col gap-3 lg:items-end">
                    <span
                      className={`self-start lg:self-end text-xs font-semibold px-3 py-2 rounded-full ${getStatusStyle(request.status)}`}
                    >
                      {request.status}
                    </span>

                    {request.status === "Pending" ? (
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            handleRequestStatus(request.id, "Approved")
                          }
                          className="px-4 py-2.5 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition"
                        >
                          Approve
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleRequestStatus(request.id, "Rejected")
                          }
                          className="px-4 py-2.5 rounded-lg border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-ink/40">
                        No action required
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-brand/10 p-12 text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="font-bold text-brand-dark">
                No booking requests yet
              </h3>
              <p className="text-sm text-ink/60 mt-2">
                New tenant requests will appear here.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default OwnerBookingRequests;
