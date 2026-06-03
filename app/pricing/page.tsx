const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
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
      "Public website and Learning Hub",
      "Selected course previews",
      "Free resource guides",
      "Interactive demo previews",
      "Course pathway guidance",
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
      "Structured course access for students who want complete learning pathways with lessons, notes, labs and quizzes.",
    features: [
      "Full course access when released",
      "Detailed theoretical notes",
      "Worked examples and quizzes",
      "Interactive learning labs",
      "Downloadable learning materials",
      "Completion certificate pathway",
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
      "Personal academic support for statistics, biostatistics, programming, research planning and interpretation.",
    features: [
      "Statistics and biostatistics tutoring",
      "Research project guidance",
      "R, Python, SPSS, SAS and Stata support",
      "Method and interpretation support",
      "Revision and topic explanation",
      "Responsible academic guidance",
    ],
    cta: "Request support",
    href: "/contact",
    highlighted: false,
  },
];

const comparison = [
  {
    feature: "Public resource guides",
    free: "Included",
    premium: "Included",
    support: "Included",
  },
  {
    feature: "Structured course lessons",
    free: "Selected previews",
    premium: "Full access",
    support: "As needed",
  },
  {
    feature: "Interactive labs and quizzes",
    free: "Selected demos",
    premium: "Included",
    support: "Discussed in sessions",
  },
  {
    feature: "Personal academic guidance",
    free: "Not included",
    premium: "Not included",
    support: "Included",
  },
  {
    feature: "Dissertation or project planning",
    free: "Not included",
    premium: "General learning only",
    support: "Available",
  },
  {
    feature: "Certificate pathway",
    free: "Not included",
    premium: "Planned",
    support: "Not applicable",
  },
];

const notes = [
  {
    title: "Payments are not live yet",
    text: "This page is a pricing preview. Course payments and paid access can be connected later when the platform is ready.",
  },
  {
    title: "Support is quoted individually",
    text: "1-to-1 support depends on subject, level, topic, software, urgency and the type of guidance required.",
  },
  {
    title: "Academic integrity comes first",
    text: "Support is for explanation, planning, interpretation and independent learning. It is not for completing assessed work on behalf of students.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-bold text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Pricing
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.05em] md:text-6xl">
                Simple pricing preview for courses and academic support.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                My Academic Tutor is being built with free learning resources,
                premium structured courses and guidance-based academic support.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                Payments are not live yet. This page shows the planned structure
                so students can understand the difference between free access,
                course access and personal support.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Current status
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                Pricing is currently a preview.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Course access, subscriptions and payment links can be added
                later. For now, students can use free resources and enquire
                about support through the contact page.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Free", "Public resources"],
              ["Planned", "Premium courses"],
              ["Quoted", "1-to-1 support"],
              ["Responsible", "Academic guidance"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="font-sans text-2xl font-black tracking-[-0.04em] text-[#111111]">
                  {value}
                </p>
                <p className="mt-2 text-sm font-bold text-neutral-600">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`rounded-[2rem] border p-6 shadow-sm md:p-7 ${
                tier.highlighted
                  ? "border-[#8b1116] bg-[#111111] text-white"
                  : "border-neutral-200 bg-white text-[#111111]"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${
                    tier.highlighted
                      ? "bg-white text-[#111111]"
                      : "bg-[#f7f4ee] text-[#8b1116]"
                  }`}
                >
                  {tier.badge}
                </span>
              </div>

              <h2 className="mt-5 font-sans text-3xl font-black tracking-[-0.04em]">
                {tier.name}
              </h2>

              <p
                className={`mt-5 font-sans text-4xl font-black tracking-[-0.05em] ${
                  tier.highlighted ? "text-white" : "text-[#111111]"
                }`}
              >
                {tier.price}
              </p>

              <p
                className={`mt-2 text-sm font-bold ${
                  tier.highlighted ? "text-white/80" : "text-neutral-500"
                }`}
              >
                {tier.period}
              </p>

              <p
                className={`mt-5 text-sm leading-7 ${
                  tier.highlighted ? "text-white/90" : "text-neutral-700"
                }`}
              >
                {tier.summary}
              </p>

              <div className="mt-6 grid gap-2">
                {tier.features.map((feature) => (
                  <div
                    key={feature}
                    className={`rounded-2xl border px-4 py-3 text-sm font-bold leading-6 ${
                      tier.highlighted
                        ? "border-white/10 bg-white/5 text-white/80"
                        : "border-neutral-200 bg-[#f7f4ee] text-neutral-700"
                    }`}
                  >
                    {feature}
                  </div>
                ))}
              </div>

              <a
                href={withBasePath(tier.href)}
                className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-black transition hover:-translate-y-0.5 ${
                  tier.highlighted
                    ? "bg-white text-[#111111]"
                    : "bg-[#111111] text-white"
                }`}
              >
                {tier.cta} →
              </a>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Compare options
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Choose based on whether you need resources, a course or personal
              guidance.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Free resources are useful for self-study. Premium courses are for
              structured learning. 1-to-1 support is for personalised academic
              explanation and research guidance.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-neutral-200">
            <div className="grid grid-cols-4 bg-[#111111] text-xs font-black uppercase tracking-[0.16em] text-white">
              <div className="p-4">Feature</div>
              <div className="p-4">Free</div>
              <div className="p-4">Premium</div>
              <div className="p-4">Support</div>
            </div>

            {comparison.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-4 border-t border-neutral-200 bg-[#f7f4ee] text-sm leading-6 text-neutral-700"
              >
                <div className="bg-white p-4 font-black text-[#111111]">
                  {row.feature}
                </div>
                <div className="p-4">{row.free}</div>
                <div className="p-4">{row.premium}</div>
                <div className="p-4">{row.support}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {notes.map((note) => (
            <article
              key={note.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h2 className="font-sans text-2xl font-black tracking-[-0.04em]">
                {note.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {note.text}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/80">
              Want course access later?
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Register interest for premium course release.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              Premium course access can be launched later with full lessons,
              labs, quizzes, downloadable materials and certificate policies.
            </p>

            <a
              href={withBasePath("/contact")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Register interest →
            </a>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Need personal support?
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Request a support quote.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/75">
              Send your subject, academic level, topic, software, deadline and
              the type of support you need.
            </p>

            <a
              href={withBasePath("/contact")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Request support →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}