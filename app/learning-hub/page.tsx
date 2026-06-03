import NormalDistributionExplorer from "@/components/interactive/NormalDistributionExplorer";
import RegressionLineExplorer from "@/components/interactive/RegressionLineExplorer";
import ConfidenceIntervalSimulator from "@/components/interactive/ConfidenceIntervalSimulator";
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
  ["Continue", "Statistics Foundation", "Start with Module 1 or continue to descriptive statistics."],
  ["Review", "ML foundations", "Revisit prediction thinking, validation and leakage prevention."],
  ["Explore", "Interactive demos", "Use visual tools to understand distributions, regression and confidence intervals."],
];

export default function LearningHubPage() {
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
            Learning Hub
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl md:text-6xl">
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

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em]">
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
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {dashboardCards.map(([label, title, body]) => (
            <article
              key={title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#8b1116]">
                {label}
              </p>

              <h2 className="mt-3 text-xl font-black tracking-[-0.03em]">
                {title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">{body}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Featured pathways
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl text-3xl font-black tracking-[-0.04em] md:text-5xl">
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
                  <p className="text-4xl font-black tracking-[-0.05em] text-[#8b1116]">
                    {pathway.number}
                  </p>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-emerald-700">
                        {pathway.tag}
                      </span>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-neutral-700">
                        {pathway.level}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-black tracking-[-0.035em] md:text-3xl">
                      {pathway.title}
                    </h3>

                    <p className="mt-4 max-w-4xl text-sm leading-7 text-neutral-700 md:text-base">
                      {pathway.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {pathway.details.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-black text-neutral-700"
                        >
                          {item}
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

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Interactive demo preview
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl font-black tracking-[-0.04em] md:text-5xl">
            Visual tools for probability, regression and inference.
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700">
            These demos support the flagship courses by helping students see how
            statistical ideas behave before memorising formulas.
          </p>

          <div className="mt-8 grid gap-8">
            <NormalDistributionExplorer />
            <RegressionLineExplorer />
            <ConfidenceIntervalSimulator />
          </div>
        </section>
      </section>
    </main>
  );
}
