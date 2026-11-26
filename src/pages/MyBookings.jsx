import { Link } from "react-router-dom";
import { sampleProperties } from "../data/properties";

const sampleBookings = [
  {
    id: 1,
    propertyId: 4,
    startDate: "2026-12-01",
    endDate: "2027-01-31",
    status: "Pending",
  },
  {
    id: 2,
    propertyId: 5,
    startDate: "2026-11-01",
    endDate: "2026-11-30",
    status: "Approved",
  },
  {
    id: 3,
    propertyId: 6,
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    status: "Rejected",
  },
  {
    id: 4,
    propertyId: 4,
    startDate: "2026-08-01",
    endDate: "2026-08-31",
    status: "Cancelled",
  },
  {
    id: 5,
    propertyId: 5,
    startDate: "2026-04-01",
    endDate: "2026-06-30",
    status: "Completed",
  },
];

const statusStyles = {
  Pending: "bg-amber-100 text-amber-800",
  Approved: "bg-emerald-100 text-emerald-800",
  Rejected: "bg-red-100 text-red-700",
  Cancelled: "bg-gray-100 text-gray-700",
  Completed: "bg-brand-light text-brand-dark",
};

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-LK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function MyBookings() {
  const summary = [
    { label: "Total Bookings", value: sampleBookings.length },
    ...["Pending", "Approved", "Rejected", "Cancelled", "Completed"].map(
      (status) => ({
        label: status,
        value: sampleBookings.filter((booking) => booking.status === status)
          .length,
      }),
    ),
  ];

  return (
    <div className="mx-auto max-w-7xl p-5 md:p-10">
      <header className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-brand">
          RENTAL ACTIVITY
        </p>
        <h2 className="mt-2 text-3xl font-bold text-brand-dark">My Bookings</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-ink/60">
          Bookings you have placed as a renter. Requests from tenants for your
          own properties are managed separately under Booking Requests.
        </p>
      </header>

      <div
        role="note"
        className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900"
      >
        <strong>Sample data only.</strong> These records are not loaded from
        your account. The booking API is not connected; production results
        must include only the signed-in renter&apos;s bookings. Incoming
        requests for properties you own are not part of this list.
      </div>

      <section
        aria-label="Booking summary"
        className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6"
      >
        {summary.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-brand/10 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-ink/60">{item.label}</p>
            <p className="mt-3 text-3xl font-bold text-brand-dark">
              {String(item.value).padStart(2, "0")}
            </p>
          </article>
        ))}
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-brand-dark">
              Bookings as a renter
            </h3>
            <p className="mt-1 text-sm text-ink/60">
              {sampleBookings.length} sample{" "}
              {sampleBookings.length === 1 ? "booking" : "bookings"}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {sampleBookings.map((booking) => {
            const property = sampleProperties.find(
              (item) => item.id === booking.propertyId,
            );

            if (!property) {
              throw new Error(
                `Sample booking ${booking.id} references an unknown property.`,
              );
            }

            return (
              <article
                key={booking.id}
                className="overflow-hidden rounded-2xl border border-brand/10 bg-white shadow-sm"
              >
                <div className="flex flex-col md:flex-row">
                  <img
                    src={property.image}
                    alt={property.title}
                    loading="lazy"
                    className="h-52 w-full object-cover md:h-auto md:w-64"
                  />

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 p-5 md:p-6">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="rounded-full bg-brand-light/70 px-3 py-1 text-xs font-semibold text-brand-dark">
                          {property.type}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[booking.status]}`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <h4 className="mt-4 text-lg font-bold text-brand-dark">
                        {property.title}
                      </h4>
                      <p className="mt-1 text-sm text-ink/60">
                        {property.location}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-medium text-ink/50">
                          Booking dates
                        </p>
                        <p className="mt-1 text-sm font-semibold text-ink">
                          {formatDate(booking.startDate)} –{" "}
                          {formatDate(booking.endDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-ink/50">
                          Monthly rent
                        </p>
                        <p className="mt-1 text-sm font-semibold text-brand">
                          Rs. {property.monthlyRent.toLocaleString("en-LK")} /
                          month
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Link
                        to={`/properties/${booking.propertyId}`}
                        className="inline-flex items-center rounded-lg border border-brand/20 px-4 py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-brand-light/60"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default MyBookings;
