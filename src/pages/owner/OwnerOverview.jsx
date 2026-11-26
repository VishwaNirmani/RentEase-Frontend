
import { Link, useOutletContext } from "react-router-dom";

function OwnerOverview() {
  const { properties, requests } = useOutletContext();

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const approvedCount = requests.filter(
    (request) => request.status === "Approved"
  ).length;

  const availableCount = properties.filter(
    (property) => property.status === "Available"
  ).length;

  const summaryCards = [
    {
      title: "Total Properties",
      value: properties.length,
      description: "Properties in your account",
      icon: "⌂",
      style: "bg-brand-light/60 text-brand-dark",
    },
    {
      title: "Available Listings",
      value: availableCount,
      description: "Currently available for rent",
      icon: "✓",
      style: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Booking Requests",
      value: requests.length,
      description: "Total requests received",
      icon: "▤",
      style: "bg-blue-50 text-blue-700",
    },
    {
      title: "Pending Requests",
      value: pendingCount,
      description: "Waiting for your decision",
      icon: "◷",
      style: "bg-amber-50 text-amber-700",
    },
  ];

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
      {/* Welcome */}
      <section className="mb-9">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-dark">
          Welcome back! 👋
        </h2>
        <p className="text-ink/60 mt-2">
          Here's an overview of your properties and rental activities.
        </p>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {summaryCards.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl border border-brand/10 p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ink/60 font-medium">
                  {item.title}
                </p>
                <h3 className="text-3xl font-bold text-brand-dark mt-3">
                  {String(item.value).padStart(2, "0")}
                </h3>
              </div>

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${item.style}`}
              >
                {item.icon}
              </div>
            </div>

            <p className="text-xs text-ink/50 mt-4">{item.description}</p>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-brand-dark">Quick Actions</h2>
        <p className="text-sm text-ink/60 mt-1 mb-5">
          Manage your rental properties easily.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Link
            to="/owner/properties"
            className="group bg-brand rounded-2xl p-6 text-white flex items-center justify-between hover:bg-brand-dark transition"
          >
            <div>
              <p className="text-white/70 text-sm">Manage your listings</p>
              <h3 className="text-xl font-bold mt-2">My Properties</h3>
              <p className="text-white/70 text-sm mt-3">
                View and manage your properties
              </p>
            </div>
            <span className="text-3xl group-hover:scale-110 transition">
              🏠
            </span>
          </Link>

          <Link
            to="/owner/booking-requests"
            className="group bg-white border border-brand/10 rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition"
          >
            <div>
              <p className="text-ink/50 text-sm">Respond to tenants</p>
              <h3 className="text-xl font-bold text-brand-dark mt-2">
                Booking Requests
              </h3>
              <p className="text-ink/60 text-sm mt-3">
                {pendingCount} request(s) waiting for your response
              </p>
            </div>
            <span className="text-3xl group-hover:scale-110 transition">
              📅
            </span>
          </Link>
        </div>
      </section>

      {/* Recent Booking Requests */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-brand-dark">
              Recent Booking Requests
            </h2>
            <p className="text-sm text-ink/60 mt-1">
              Latest requests from tenants.
            </p>
          </div>

          <Link
            to="/owner/booking-requests"
            className="text-sm font-semibold text-brand hover:text-brand-dark"
          >
            View All →
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-brand/10 shadow-sm overflow-hidden">
          {requests.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {requests.slice(0, 3).map((request) => (
                <div
                  key={request.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-full bg-brand-light flex items-center justify-center text-brand-dark font-bold shrink-0">
                    {request.initials}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-brand-dark">
                      {request.tenant}
                    </h3>
                    <p className="text-sm text-ink/60 mt-1">
                      {request.property} · {request.location}
                    </p>
                  </div>

                  <span
                    className={`self-start sm:self-center text-xs font-semibold px-3 py-2 rounded-full ${getStatusStyle(request.status)}`}
                  >
                    {request.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="p-8 text-center text-ink/60">
              No booking requests yet.
            </p>
          )}
        </div>
      </section>

      {/* Additional Information */}
      <section className="mt-10 bg-brand-light/40 border border-brand/10 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-brand-dark">
          Property management made easier
        </h2>
        <p className="text-sm text-ink/60 mt-2">
          Keep your property details, rental prices and availability up to date
          to help tenants find their next home.
        </p>
      </section>
    </div>
  );
}

export default OwnerOverview;
