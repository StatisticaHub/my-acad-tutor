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

const courses = [
  {
    number: "01",
    title: "Statistics Foundation",
    status: "Available",
    level: "Beginner → intermediate",
    href: "/courses/statistics-foundation",
    summary:
      "A zero-coding, theory-first course covering statistical thinking, descriptive statistics, probability, inference and regression.",
    points: ["5 modules", "26 lessons", "Zero coding", "Theory first"],
  },
  {
    number: "02",
    title: "Machine Learning in Biostatistics",
    status: "Module 1 available",
    level: "Intermediate",
    href: "/courses/machine-learning-biostatistics",
    summary:
      "A health-data machine learning course focused on prediction, validation, overfitting, leakage, calibration and responsible reporting.",
    points: ["5 modules", "25 planned lessons", "R labs", "Case studies"],
  },
  {
    number: "03",
    title: "Research Methods & Data Analysis",
    status: "Preparing",
    level: "Project support",
    href: "/resources",
    summary:
      "A future pathway for dissertation planning, variables, analysis strategy, interpretation and reporting limitations.",
    points: ["Study design", "Variables", "Analysis planning", "Reporting"],
  },
  {
    number: "04",
    title: "R, Python and Software Support",
    status: "Preparing",
    level: "Applied skills",
    href: "/resources",
    summary:
      "A planned practical pathway for academic data analysis using R, Python, SPSS, SAS, Stata and reproducible workflows.",
    points: ["R basics", "Python basics", "Software choice", "Reproducibility"],
  },
  {
    number: "05",
    title: "Biostatistics and Medical Statistics",
    status: "Preparing",
    level: "Health research",
    href: "/resources",
    summary:
      "A planned pathway covering clinical research, epidemiology, survival analysis, regression modelling and interpretation for health data.",
    points: ["Clinical data", "Survival analysis", "Epidemiology", "Medical interpretation"],
  },
];

const highlights = [
  {
    title: "Structured pathways",
    body: "Courses are organised into modules and lessons so students can move from foundations to interpretation step by step.",
  },
  {
    title: "Theory with application",
    body: "The platform combines mathematical reasoning, examples, interactive demos and applied academic interpretation.",
  },
  {
    title: "Responsible support",
    body: "Courses support learning, confidence and understanding while maintaining academic integrity.",
  },
];

export default function CoursesPage() {
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
            Course catalogue
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl md:text-6xl">
                Structured quantitative courses for university students.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Explore guided courses in statistics, biostatistics, machine
                learning, software support and academic data analysis. The first
                two flagship courses are being built as full learning pathways.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Current priority
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em]">
                Statistics Foundation and ML in Biostatistics.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                These two courses form the core launch pathway: one builds the
                statistical foundation, and the other applies prediction
                modelling to health-data questions.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath("/learning-hub")}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Open Learning Hub
            </a>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Start Statistics Foundation
            </a>

            <a
              href={withBasePath("/courses/machine-learning-biostatistics")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Open ML course
            </a>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-black tracking-[-0.03em]">
                {item.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {item.body}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Available and planned courses
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl text-3xl font-black tracking-[-0.04em] md:text-5xl">
              Start with the flagship learning pathways.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Courses are being developed in phases. Available pages open
              directly. Preparing pathways currently link to resources and
              previews until full course pages are released.
            </p>
          </div>

          <div className="mt-8 grid gap-5">
            {courses.map((course) => (
              <a
                key={course.number}
                href={withBasePath(course.href)}
                className="group rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:border-[#8b1116]/30 hover:bg-white hover:shadow-md md:p-7"
              >
                <div className="grid gap-5 lg:grid-cols-[0.16fr_1fr_auto] lg:items-start">
                  <p className="text-4xl font-black tracking-[-0.05em] text-[#8b1116]">
                    {course.number}
                  </p>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-emerald-700">
                        {course.status}
                      </span>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-neutral-700">
                        {course.level}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-black tracking-[-0.035em] md:text-3xl">
                      {course.title}
                    </h3>

                    <p className="mt-4 max-w-4xl text-sm leading-7 text-neutral-700 md:text-base">
                      {course.summary}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {course.points.map((point) => (
                        <span
                          key={point}
                          className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-black text-neutral-700"
                        >
                          {point}
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
      </section>
    </main>
  );
}
