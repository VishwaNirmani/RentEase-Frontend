import { Link } from "react-router-dom";

const audiences = [
  {
    icon: "⌕",
    title: "Tenants",
    description:
      "Explore rental options, compare details, and find a place that fits your needs.",
  },
  {
    icon: "⌂",
    title: "Property owners",
    description:
      "Apply to become an owner and manage property listings and booking requests.",
  },
  {
    icon: "✓",
    title: "A more connected process",
    description:
      "Bring property discovery and rental management together in one place.",
  },
];

function AboutUs() {
  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-br from-brand-dark via-brand to-[#0F766E] px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-accent">
            ABOUT RENTEASE
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Making it easier to find a place to call home.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
            RentEase brings property discovery and rental management into one
            straightforward experience for tenants and property owners.
          </p>
          <Link
            to="/properties"
            className="mt-9 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-brand-dark transition hover:bg-brand-light"
          >
            Explore Properties
          </Link>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <p className="text-sm font-semibold tracking-widest text-brand">
              OUR PURPOSE
            </p>
            <h2 className="mt-3 text-3xl font-bold text-brand-dark md:text-4xl">
              A clearer rental journey for everyone.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-ink/70">
            <p>
              Finding or managing a rental property can involve many separate
              steps. RentEase is designed to make those steps easier to
              navigate, from exploring available properties to handling
              property and booking activities.
            </p>
            <p>
              We bring tenants and property owners together through a
              role-based platform, with the goal of making rental tasks more
              accessible and organized.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold tracking-widest text-brand">
              THE RENTEASE EXPERIENCE
            </p>
            <h2 className="mt-3 text-3xl font-bold text-brand-dark md:text-4xl">
              Built around the people using it.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {audiences.map((audience) => (
              <article
                key={audience.title}
                className="rounded-2xl border border-brand/10 bg-cream p-7 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-2xl font-bold text-brand-dark">
                  {audience.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold text-brand-dark">
                  {audience.title}
                </h3>
                <p className="mt-3 leading-7 text-ink/65">
                  {audience.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl bg-brand-light/50 px-7 py-12 text-center md:px-12">
          <p className="text-sm font-semibold tracking-widest text-brand">
            YOUR NEXT STEP
          </p>
          <h2 className="mt-3 text-3xl font-bold text-brand-dark">
            Find your next place with RentEase.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-ink/65">
            Browse the available listings and discover the spaces that could
            suit your next chapter.
          </p>
          <Link
            to="/properties"
            className="mt-7 inline-flex rounded-xl bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-dark"
          >
            Browse Properties
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
