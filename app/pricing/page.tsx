const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;
  return `${basePath}${href}/`;
}

const tiers = [
  {
    name: "Free",
    badge: "Start learning",
    price: "£0",
    period: "public access",
    summary:
      "Structured course previews, selected lessons and public resources for students exploring statistics, biostatistics and data science.",
    features: [
      "Public website and learning hub",
      "Selected free course lessons",
      "Statistics and biostatistics resources",
      "Interactive demo previews",
      "Course pathway guidance",
      "Academic integrity and study support guidance",
    ],
    cta: "Start free",
    href: "/learning-hub",
    highlighted: false,
  },
  {
    name: "Premium Courses",
    badge: "Planned July 2026",
    price: "Join waitlist",
    period: "course access",
    summary:
      "Full structured courses with detailed notes, quizzes, coding labs, certificates and downloadable materials.",
    features: [
      "Full course access when released",
      "Detailed theoretical notes and worked examples",
      "Interactive labs and quizzes",
      "R and Python coding lab access where available",
      "Downloadable notes and learning materials",
      "Completion certificate pathway with clear certificate policy",
    ],
    cta: "Join premium waitlist",
    href: "/contact",
    highlighted: true,
  },
  {
    name: "1-to-1 Academic Support",
    badge: "Tutoring and projects",
    price: "Request quote",
    period: "personal support",
    summary:
      "Personal academic support for statistics, dissertation planning, R/Python, biostatistics and quantitative research methods.",
    features: [
      "Statistics and biostatistics tutoring",
      "Dissertation and project planning support",
      "R, Python, SPSS, SAS or Stata guidance",
      "Regression, survival analysis and ML support",
      "Research interpretation and reporting help",
      "Responsible learning support only — no dishonest completion",
    ],
    cta: "Request support",
    href: "/contact",
    highlighted: false,
  },
  {
    name: "Institution / Research Support",
    badge: "Coming later",
    price: "Custom",
    period: "team support",
    summary:
      "Custom learning, statistical training and applied data support for small research teams, student groups and academic projects.",
    features: [
      "Small-group training sessions",
      "Custom quantitative learning pathways",
      "Research methods workshops",
      "Biostatistics and health-data support",
      "Reproducible analysis workflow guidance",
      "Future institutional course access options",
    ],
    cta: "Discuss a plan",
    href: "/contact",
    highlighted: false,
  },
];

const comparisonRows = [
  ["Public pages and resources", "Yes", "Yes", "Yes", "Yes"],
  ["Structured course previews", "Yes", "Yes", "Yes", "Custom"],
  ["Full course access", "Selected only", "Yes", "Support-based", "Custom"],
  ["Interactive demos", "Limited", "Full", "As needed", "Custom"],
  ["R/Python coding labs", "Preview only", "Included where available", "Guided support", "Custom"],
  ["Quizzes and progress pathway", "Limited", "Yes", "Session-based", "Custom"],
  ["Certificates", "No", "Planned", "No", "Custom"],
  ["Downloadable materials", "Limited", "Yes", "Where relevant", "Custom"],
  ["Direct support", "No", "Course support later", "Yes", "Yes"],
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-slate-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-black text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to home
        </a>

        <section className="mt-8 rounded-[2rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8b1116]">
            Pricing preview
          </p>

          <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-[-0.04em] md:text-6xl">
            Choose how you want to learn with My Academic Tutor.
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
            The platform is currently being prepared for a July 2026 course
            release. Live Stripe payments are not connected yet. For now, use
            the free resources, explore course previews, or request access and
            academic support.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              ["Status", "Preview"],
              ["Payments", "Not live yet"],
              ["Courses", "July 2026"],
              ["Support", "Request access"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-[#ded9cf] bg-[#fbfaf7] p-4"
              >
                <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-500">
                  {label}
                </p>
                <p className="mt-2 text-xl font-black text-[#111111]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-4">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`flex flex-col rounded-[2rem] border p-6 shadow-sm ${
                tier.highlighted
                  ? "border-[#8b1116] bg-[#111111] text-white"
                  : "border-[#ded9cf] bg-white text-[#111111]"
              }`}
            >
              <p
                className={`w-fit rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.16em] ${
                  tier.highlighted
                    ? "bg-white text-[#8b1116]"
                    : "bg-[#f8e9ea] text-[#8b1116]"
                }`}
              >
                {tier.badge}
              </p>

              <h2 className="mt-5 text-2xl font-black tracking-[-0.03em]">
                {tier.name}
              </h2>

              <p
                className={`mt-4 text-3xl font-black ${
                  tier.highlighted ? "text-white" : "text-[#111111]"
                }`}
              >
                {tier.price}
              </p>

              <p
                className={`mt-1 text-sm font-semibold ${
                  tier.highlighted ? "text-white/60" : "text-neutral-500"
                }`}
              >
                {tier.period}
              </p>

              <p
                className={`mt-5 text-sm leading-7 ${
                  tier.highlighted ? "text-white/70" : "text-neutral-700"
                }`}
              >
                {tier.summary}
              </p>

              <ul className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className={`text-sm leading-6 ${
                      tier.highlighted ? "text-white/80" : "text-neutral-700"
                    }`}
                  >
                    <span className="font-black">✓</span> {feature}
                  </li>
                ))}
              </ul>

              <a
                href={withBasePath(tier.href)}
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-black transition hover:-translate-y-0.5 ${
                  tier.highlighted
                    ? "bg-white text-[#111111]"
                    : "bg-[#8b1116] text-white"
                }`}
              >
                {tier.cta}
              </a>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8b1116]">
            Feature comparison
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] md:text-4xl">
            Free, premium and support options.
          </h2>

          <div className="mt-8 overflow-x-auto rounded-3xl border border-[#ded9cf]">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead className="bg-[#111111] text-white">
                <tr>
                  <th className="p-4">Feature</th>
                  <th className="p-4">Free</th>
                  <th className="p-4">Premium Courses</th>
                  <th className="p-4">1-to-1 Support</th>
                  <th className="p-4">Institution</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row[0]} className="border-t border-[#ded9cf]">
                    {row.map((cell, index) => (
                      <td
                        key={cell}
                        className={`p-4 ${
                          index === 0
                            ? "font-black text-[#111111]"
                            : "text-neutral-700"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] bg-[#050505] p-6 text-white shadow-sm md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#9fd0ff]">
            Not connected to Stripe yet
          </p>

          <h2 className="mt-4 max-w-4xl text-2xl font-black tracking-[-0.035em] md:text-4xl">
            For now, pricing is a preview. Use contact forms to request access.
          </h2>

          <p className="mt-5 max-w-4xl text-sm leading-7 text-white/70 md:text-base md:leading-8">
            The live payment system can be added later after the platform
            structure, course pages and access model are stable.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={withBasePath("/contact")}
              className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-[#111111]"
            >
              Request access
            </a>
            <a
              href={withBasePath("/learning-hub")}
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-black text-white"
            >
              Explore Learning Hub
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
