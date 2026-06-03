import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "View free access, planned premium course access and 1-to-1 academic support options for My Academic Tutor.",
};

const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const tiers = [
  {
    name: "Free",
    badge: "Start learning",
    price: "£0",
    period: "public access",
    summary:
      "Public learning materials for students exploring statistics, biostatistics, data science and research methods.",
    features: [
      "Learning Hub access",
      "Selected course previews",
      "Free resource guides",
      "Interactive demo previews",
      "Pathway guidance",
      "Academic integrity guidance",
    ],
    cta: "Start free",
    href: "/learning-hub",
    highlighted: false,
  },
  {
    name: "Premium Courses",
    badge: "Planned",
    price: "Coming soon",
    period: "course access",
    summary:
      "Structured course access for students who want complete learning pathways with lessons, labs, worked examples and quizzes.",
    features: [
      "Full course access",
      "Detailed notes",
      "Worked examples",
      "Interactive labs",
      "Downloadable materials",
      "Certificate pathway",
    ],
    cta: "Register interest",
    href: "/contact",
    highlighted: true,
  },
  {
    name: "1-to-1 Academic Support",
    badge: "Guidance-based",
    price: "Request quote",
    period: "personal support",
    summary:
      "Personal academic support for statistics, biostatistics, programming, research methods and interpretation.",
    features: [
      "Tutoring",
      "Research guidance",
      "Software support",
      "Method support",
      "Revision help",
      "Responsible guidance",
    ],
    cta: "Request support",
    href: "/contact",
    highlighted: false,
  },
];

const notes = [
  "Payments are not live yet.",
  "Final premium course pricing will be announced before paid access opens.",
  "1-to-1 academic support is quoted individually based on topic, level and support type.",
  "Free resources and public course previews will remain available.",
  "Academic integrity comes first in every support route.",
  "Stripe or another secure payment flow can be connected later when paid access is ready.",
];

const comparison = [
  {
    feature: "Public website and Learning Hub",
    free: "Included",
    premium: "Included",
    support: "Included",
  },
  {
    feature: "Free resource guides",
    free: "Included",
    premium: "Included",
    support: "Included",
  },
  {
    feature: "Full structured courses",
    free: "Preview access",
    premium: "Planned full access",
    support: "Not the main route",
  },
  {
    feature: "Interactive labs and quizzes",
    free: "Limited previews",
    premium: "Planned full access",
    support: "Used when relevant",
  },
  {
    feature: "Personal academic guidance",
    free: "Not included",
    premium: "Not the main route",
    support: "Included by request",
  },
  {
    feature: "Research or dissertation support",
    free: "General resources",
    premium: "Course-based support",
    support: "Personal guidance",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-bold text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Pricing
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl md:text-6xl">
                Flexible learning access for courses and academic support.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Start with free public learning materials, then register
                interest for premium courses or request personalised academic
                support when you need guidance.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Pricing preview
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em]">
                Final paid pricing will be announced before launch.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Payments are not live yet. This page explains the planned access
                model for free learning, premium courses and 1-to-1 academic
                support.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`rounded-[2rem] border p-6 shadow-sm md:p-8 ${
                tier.highlighted
                  ? "border-[#8b1116] bg-[#111111] text-white"
                  : "border-neutral-200 bg-white text-[#111111]"
              }`}
            >
              <p
                className={`text-sm font-black uppercase tracking-[0.18em] ${
                  tier.highlighted ? "text-white/85" : "text-[#8b1116]"
                }`}
              >
                {tier.badge}
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em]">
                {tier.name}
              </h2>

              <div className="mt-6">
                <p className="text-4xl font-black tracking-[-0.05em]">
                  {tier.price}
                </p>

                <p
                  className={`mt-2 text-sm font-bold ${
                    tier.highlighted ? "text-white/85" : "text-neutral-700"
                  }`}
                >
                  {tier.period}
                </p>
              </div>

              <p
                className={`mt-5 text-sm leading-7 ${
                  tier.highlighted ? "text-white/90" : "text-neutral-700"
                }`}
              >
                {tier.summary}
              </p>

              <div className="mt-6 grid gap-3">
                {tier.features.map((feature) => (
                  <div
                    key={feature}
                    className={`rounded-2xl border px-4 py-3 text-sm font-bold ${
                      tier.highlighted
                        ? "border-white/15 bg-white/10 text-white"
                        : "border-neutral-200 bg-[#f7f4ee] text-neutral-800"
                    }`}
                  >
                    {feature}
                  </div>
                ))}
              </div>

              <a
                href={withBasePath(tier.href)}
                className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-sm font-black transition hover:-translate-y-0.5 ${
                  tier.highlighted
                    ? "bg-white text-[#111111]"
                    : "bg-[#111111] text-white hover:bg-[#8b1116]"
                }`}
              >
                {tier.cta}
              </a>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Compare access
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl font-black tracking-[-0.04em] md:text-5xl">
            Choose the route that matches your learning need.
          </h2>

          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-neutral-200">
            <div className="grid grid-cols-4 bg-[#111111] text-white">
              <div className="p-4 text-sm font-black">Feature</div>
              <div className="p-4 text-sm font-black">Free</div>
              <div className="p-4 text-sm font-black">Premium</div>
              <div className="p-4 text-sm font-black">1-to-1 support</div>
            </div>

            {comparison.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-4 border-t border-neutral-200 bg-[#f7f4ee]"
              >
                <div className="p-4 text-sm font-black text-[#111111]">
                  {row.feature}
                </div>
                <div className="p-4 text-sm leading-6 text-neutral-700">
                  {row.free}
                </div>
                <div className="p-4 text-sm leading-6 text-neutral-700">
                  {row.premium}
                </div>
                <div className="p-4 text-sm leading-6 text-neutral-700">
                  {row.support}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Important notes
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl font-black tracking-[-0.04em] md:text-5xl">
            Transparent pricing before paid access goes live.
          </h2>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {notes.map((note) => (
              <div
                key={note}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="text-sm font-bold leading-7 text-neutral-800">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Academic integrity
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Support is guidance-based, not replacement work.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              My Academic Tutor supports learning, interpretation, planning and
              responsible academic development. It does not provide dishonest
              coursework completion, exam help, impersonation or ghostwriting.
            </p>

            <a
              href={withBasePath("/academic-integrity")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Read academic integrity policy →
            </a>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/90">
              Register interest
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Want access when premium courses open?
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              Send a request to join the interest list for premium course
              access, tutoring support or future dashboard features.
            </p>

            <a
              href={withBasePath("/contact")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Contact My Academic Tutor →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}