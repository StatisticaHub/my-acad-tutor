import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Learning Hub",
  description:
    "Explore structured courses in statistics, biostatistics, health data science, research methods and medical statistics with interactive learning support.",
  alternates: {
    canonical: "https://www.myacademictutor.com/learning-hub/",
  },
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

const mainRoutes = [
  {
    title: "Start a course",
    description:
      "Follow a structured pathway in statistics or health data science.",
    href: "/courses",
    label: "View courses",
  },
  {
    title: "Explore a demo",
    description:
      "Use interactive visuals to understand models, uncertainty and applied examples.",
    href: "/interactive-demos",
    label: "Open demos",
  },
  {
    title: "Read a guide",
    description:
      "Use focused resources for methods, interpretation and research planning.",
    href: "/resources",
    label: "Browse resources",
  },
];

const courses = [
  {
    title: "Statistics Foundation",
    description:
      "A zero-coding route through probability, inference, regression and uncertainty.",
    href: "/courses/statistics-foundation",
  },
  {
    title: "Machine Learning in Biostatistics",
    description:
      "Clinical prediction, validation, calibration and responsible health-data modelling.",
    href: "/courses/machine-learning-biostatistics",
  },
];

const studyFocus = [
  "Statistics",
  "Biostatistics",
  "Research methods",
  "Health data science",
  "Machine learning",
  "Bioinformatics",
];

export default function LearningHubPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">

      <section className="mx-auto mt-8 max-w-7xl rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#6f0d12]">
          Structured learning
        </p>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-950 md:text-3xl">
          Build a clear route through statistics, biostatistics and health data science.
        </h2>

        <p className="mt-4 max-w-4xl text-base leading-7 text-neutral-700">
          The Learning Hub brings together beginner-friendly statistics courses,
          biostatistics learning routes, interactive demos and detailed resources.
          It is designed for students who want to understand quantitative methods
          clearly, not just memorise formulas.
        </p>

        <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
          <a className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/resources/">
            Read Statistics Resources
          </a>
          <a className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/interactive-demos/">
            Try Interactive Demos
          </a>
          <a className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/contact/">
            Request Academic Support
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-semibold text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2.5rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b1116]">
            Learning Hub
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] md:text-7xl">
                Your starting point for structured quantitative learning.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Choose a course, explore an interactive demo or read a focused
                guide. Everything is organised to help you learn with clarity.
              </p>
            </div>

            <div className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Subjects covered
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {studyFocus.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {mainRoutes.map((route) => (
            <a
              key={route.title}
              href={withBasePath(route.href)}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-2xl font-semibold tracking-[-0.04em]">
                {route.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {route.description}
              </p>

              <p className="mt-6 text-sm font-semibold text-[#8b1116]">
                {route.label} →
              </p>
            </a>
          ))}
        </section>

        <section className="mt-8 rounded-[2.5rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b1116]">
                Course pathways
              </p>

              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">
                Learn in a clear sequence.
              </h2>
            </div>

            <p className="text-base leading-8 text-neutral-700">
              Start with foundations, then move into applied health data
              modelling when you are ready.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {courses.map((course) => (
              <a
                key={course.title}
                href={withBasePath(course.href)}
                className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
              >
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                  {course.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {course.description}
                </p>

                <p className="mt-6 text-sm font-semibold text-[#8b1116]">
                  Open pathway →
                </p>
              </a>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
