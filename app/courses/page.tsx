import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | My Academic Tutor",
  description:
    "Structured courses in statistics, biostatistics and health data science.",
};

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (
    href.startsWith("#") ||
    href.startsWith("http") ||
    href.startsWith("mailto:")
  ) {
    return href;
  }

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const courses = [
  {
    number: "01",
    title: "Statistics Foundation",
    status: "Available",
    level: "Beginner to intermediate",
    href: "/courses/statistics-foundation",
    summary:
      "A zero-coding course for statistical thinking, probability, inference, regression and uncertainty.",
    points: ["Theory first", "No coding", "Worked examples", "Quizzes"],
  },
  {
    number: "02",
    title: "Machine Learning in Biostatistics",
    status: "Module 1 available",
    level: "Intermediate",
    href: "/courses/machine-learning-biostatistics",
    summary:
      "A health-data course on prediction, validation, calibration and responsible model interpretation.",
    points: ["Clinical prediction", "Validation", "Calibration", "Case studies"],
  },
];

const principles = [
  "Clear explanations",
  "Structured progression",
  "Applied examples",
  "Responsible learning",
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-semibold text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2.5rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b1116]">
            Courses
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] md:text-7xl">
                Structured courses for quantitative understanding.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Learn through clear pathways designed for statistics,
                biostatistics, health data science and applied research.
              </p>
            </div>

            <div className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Course design
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {principles.map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {courses.map((course) => (
            <a
              key={course.title}
              href={withBasePath(course.href)}
              className="rounded-[2.5rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-[#111111] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  {course.number}
                </span>

                <span className="rounded-full border border-neutral-200 bg-[#f7f4ee] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-600">
                  {course.status}
                </span>
              </div>

              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
                {course.title}
              </h2>

              <p className="mt-2 text-sm font-semibold text-[#8b1116]">
                {course.level}
              </p>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                {course.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {course.points.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-neutral-200 bg-[#f7f4ee] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-600"
                  >
                    {point}
                  </span>
                ))}
              </div>

              <p className="mt-7 text-sm font-semibold text-[#8b1116]">
                Open course →
              </p>
            </a>
          ))}
        </section>

        <section className="mt-8 rounded-[2.5rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
                Need guidance?
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
                Ask for focused tutoring support.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base md:leading-8">
                Request help with concepts, methods, software, interpretation
                or research planning.
              </p>
            </div>

            <a
              href={withBasePath("/contact")}
              className="inline-flex rounded-full bg-white px-6 py-4 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f4ee]"
            >
              Contact us →
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
