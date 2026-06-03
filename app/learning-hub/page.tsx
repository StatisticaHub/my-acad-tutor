import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Hub",
  description:
    "Explore structured learning pathways, course modules, interactive demos and study resources for statistics, biostatistics, machine learning and academic data analysis.",
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

const pathways = [
  {
    number: "01",
    title: "Statistics Foundation",
    tag: "Available",
    level: "Beginner → intermediate",
    href: "/courses/statistics-foundation",
    description:
      "A theory-first, zero-coding pathway covering statistical thinking, descriptive statistics, probability, inference and regression.",
    details: ["5 modules", "26 structured lessons", "No coding required"],
  },
  {
    number: "02",
    title: "Machine Learning in Biostatistics",
    tag: "Module 1 available",
    level: "Intermediate",
    href: "/courses/machine-learning-biostatistics",
    description:
      "A health-data ML pathway focused on prediction, validation, leakage, calibration, thresholds and responsible reporting.",
    details: ["5 modules", "25 planned lessons", "R labs and case studies"],
  },
  {
    number: "03",
    title: "Resources and study guides",
    tag: "Growing library",
    level: "Reference support",
    href: "/resources",
    description:
      "In-depth guides for statistical tests, p-values, regression, survival analysis, software choice and analysis planning.",
    details: ["Guide library", "Checklists", "Interpretation support"],
  },
];

const dashboardCards = [
  {
    label: "Continue",
    title: "Statistics Foundation",
    body: "Start with Module 1 or continue through descriptive statistics, probability, inference and regression.",
    href: "/courses/statistics-foundation",
  },
  {
    label: "Review",
    title: "ML foundations",
    body: "Revisit prediction thinking, validation, leakage prevention and responsible reporting for health data.",
    href: "/courses/machine-learning-biostatistics/modules/foundations",
  },
  {
    label: "Explore",
    title: "Interactive demos",
    body: "Use visual tools to understand distributions, regression and confidence intervals.",
    href: "/interactive-demos",
  },
];

const studyRoutes = [
  {
    title: "New to statistics",
    route: "Start with Statistics Foundation",
    href: "/courses/statistics-foundation",
    text: "Best if you need a careful conceptual base before biostatistics, machine learning or research methods.",
  },
  {
    title: "Ready for health-data ML",
    route: "Open ML in Biostatistics",
    href: "/courses/machine-learning-biostatistics",
    text: "Best if you already know some statistics and want prediction, validation and interpretation for medical data.",
  },
  {
    title: "Need a short guide",
    route: "Use Resources",
    href: "/resources",
    text: "Best if you need a focused explanation, checklist or interpretation guide before studying a full course.",
  },
  {
    title: "Need personal guidance",
    route: "Contact support",
    href: "/contact",
    text: "Best if you are unsure what to study or need guidance with a specific topic, method or research question.",
  },
];

const demos = [
  {
    title: "Normal Distribution Explorer",
    text: "Adjust the mean and spread to see how a distribution changes.",
    href: "/interactive-demos#normal-distribution",
  },
  {
    title: "Regression Line Explorer",
    text: "Explore slope, intercept and residual variation visually.",
    href: "/interactive-demos#regression",
  },
  {
    title: "Confidence Interval Simulator",
    text: "Use repeated samples to understand interval behaviour.",
    href: "/interactive-demos#confidence-intervals",
  },
];

const hubStats = [
  ["2", "Flagship courses"],
  ["51", "Course lessons"],
  ["3", "Interactive demos"],
  ["July 2026", "Course release"],
];

export default function LearningHubPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-20">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-bold text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Learning Hub
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl md:text-7xl">
                Learn quantitative subjects through structured pathways.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                The Learning Hub brings together courses, modules, lessons,
                resources and interactive demos for statistics, biostatistics,
                machine learning and academic data analysis.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Platform preview
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                Courses, demos and study guides in one place.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                This hub is designed to feel like a student dashboard while
                still working as a public static learning platform.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Start Statistics Foundation
            </a>

            <a
              href={withBasePath("/courses/machine-learning-biostatistics")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Open ML in Biostatistics
            </a>

            <a
              href={withBasePath("/dashboard")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Preview dashboard
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {hubStats.map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="font-sans text-3xl font-black tracking-[-0.05em] text-[#111111]">
                  {value}
                </p>

                <p className="mt-2 text-sm font-bold text-neutral-700">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {dashboardCards.map((card) => (
            <a
              key={card.title}
              href={withBasePath(card.href)}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#8b1116]">
                {card.label}
              </p>

              <h2 className="mt-3 font-sans text-xl font-black tracking-[-0.03em]">
                {card.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {card.body}
              </p>

              <p className="mt-5 text-sm font-black text-[#8b1116]">Open →</p>
            </a>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Featured pathways
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-5xl">
              Choose a pathway and study in order.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Start with Statistics Foundation if you need a base. Move into ML
              in Biostatistics when you are ready for health-data prediction,
              validation and applied modelling.
            </p>
          </div>

          <div className="mt-8 grid gap-5">
            {pathways.map((pathway) => (
              <a
                key={pathway.number}
                href={withBasePath(pathway.href)}
                className="group rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:p-7"
              >
                <div className="grid gap-5 lg:grid-cols-[0.16fr_1fr_auto] lg:items-start">
                  <p className="font-sans text-4xl font-black tracking-[-0.05em] text-[#8b1116]">
                    {pathway.number}
                  </p>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full bg-white px-3 py-1 text-xs font-black ${
                          pathway.tag.includes("Available") ||
                          pathway.tag.includes("available")
                            ? "text-emerald-700"
                            : "text-neutral-700"
                        }`}
                      >
                        {pathway.tag}
                      </span>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-neutral-700">
                        {pathway.level}
                      </span>
                    </div>

                    <h3 className="mt-4 font-sans text-2xl font-black tracking-[-0.035em] md:text-3xl">
                      {pathway.title}
                    </h3>

                    <p className="mt-4 max-w-4xl text-sm leading-7 text-neutral-700 md:text-base">
                      {pathway.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {pathway.details.map((detail) => (
                        <span
                          key={detail}
                          className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-black text-neutral-700"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="inline-flex rounded-full bg-[#111111] px-5 py-3 text-sm font-black text-white transition group-hover:bg-[#8b1116]">
                    Open →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Study route selector
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-5xl">
              Not sure where to begin?
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Choose the option that matches your current situation. You can
              move between courses, resources and support at any time.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {studyRoutes.map((route) => (
              <a
                key={route.title}
                href={withBasePath(route.href)}
                className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
              >
                <h3 className="font-sans text-2xl font-black tracking-[-0.04em]">
                  {route.title}
                </h3>

                <p className="mt-3 text-sm font-black uppercase tracking-[0.16em] text-[#8b1116]">
                  {route.route}
                </p>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {route.text}
                </p>

                <p className="mt-5 text-sm font-black text-[#8b1116]">
                  Continue →
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Interactive demos
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-5xl">
              Learn visually before moving into deeper lessons.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              These demos help students see ideas such as distribution shape,
              regression lines and confidence interval behaviour.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {demos.map((demo) => (
              <a
                key={demo.title}
                href={withBasePath(demo.href)}
                className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
              >
                <h3 className="font-sans text-2xl font-black tracking-[-0.04em]">
                  {demo.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {demo.text}
                </p>

                <p className="mt-5 text-sm font-black text-[#8b1116]">
                  Open demo →
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Dashboard preview
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Future login, progress and enrolment features can connect later.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              The current site is a public static platform. Later, the dashboard
              can connect accounts, progress tracking, course enrolment and paid
              access.
            </p>

            <a
              href={withBasePath("/dashboard")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Preview dashboard →
            </a>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/90">
              Need guidance?
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Ask which route fits your current goal.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              If you are not sure whether to use a course, resource guide,
              interactive demo or support request, start with the route selector
              or contact page.
            </p>

            <a
              href={withBasePath("/contact")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Contact support →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}