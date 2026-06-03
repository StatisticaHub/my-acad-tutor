import type { Metadata } from "next";
import NormalDistributionExplorer from "@/components/interactive/NormalDistributionExplorer";
import ConfidenceIntervalSimulator from "@/components/interactive/ConfidenceIntervalSimulator";

export const metadata: Metadata = {
  title: "Statistics Foundation",
  description:
    "A zero-coding statistics foundation course covering statistical thinking, descriptive statistics, probability, inference and regression.",
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

const modules = [
  {
    number: "01",
    title: "Statistical Thinking",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking",
    status: "Available",
    summary:
      "Populations, samples, variables, data types, sampling, bias and the purpose of statistics.",
    lessons: "5 lessons",
  },
  {
    number: "02",
    title: "Descriptive Statistics",
    href: "/courses/statistics-foundation/modules/descriptive-statistics",
    status: "Available",
    summary:
      "Tables, graphs, centre, spread, quartiles, skewness, standard deviation and interpretation.",
    lessons: "5 lessons",
  },
  {
    number: "03",
    title: "Probability Foundations",
    href: "/courses/statistics-foundation/modules/probability-foundations",
    status: "Available",
    summary:
      "Probability rules, conditional probability, Bayes’ theorem, random variables and distributions.",
    lessons: "5 lessons",
  },
  {
    number: "04",
    title: "Statistical Inference",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations",
    status: "Available",
    summary:
      "Sampling distributions, standard error, confidence intervals, p-values, errors and power.",
    lessons: "6 lessons",
  },
  {
    number: "05",
    title: "Regression Foundations",
    href: "/courses/statistics-foundation/modules/regression-foundations",
    status: "Available",
    summary:
      "Simple regression, least squares, multiple regression, confounding, diagnostics and logistic regression.",
    lessons: "5 lessons",
  },
];

const snapshot = [
  ["5", "Modules"],
  ["26", "Lessons"],
  ["0", "Coding required"],
  ["100%", "Concept focused"],
];

const learningDesign = [
  "Conversational lectures with recurring characters",
  "Detailed notes with equations and interpretation",
  "Interactive labs for visual intuition",
  "Worked examples and exam-style exercises",
  "Short quizzes to check understanding",
  "No R, Python or coding required",
];

const outcomes = [
  "Explain what statistics is used for",
  "Summarise and compare data correctly",
  "Understand probability and uncertainty",
  "Interpret confidence intervals and p-values",
  "Recognise assumptions behind methods",
  "Build a foundation for regression and biostatistics",
];

export default function StatisticsFoundationCoursePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-4 py-8 text-[#111111] sm:px-5 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses")}
          className="text-sm font-semibold text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to courses
        </a>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm md:mt-8 md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-6 md:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm md:tracking-[0.22em]">
                Statistics Foundation
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-6xl">
                Learn statistics from ideas to inference.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700 md:mt-6 md:text-lg md:leading-9">
                A zero-coding course for students who want clear statistical
                reasoning before software. Learn concepts, notation, examples,
                interpretation and mathematical foundations step by step.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(
                    "/courses/statistics-foundation/modules/introduction-to-statistical-thinking"
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8b1116] sm:w-auto md:py-4"
                >
                  Start Module 1 →
                </a>

                <a
                  href={withBasePath(
                    "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/what-is-statistics"
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
                >
                  Open Lesson 1.1
                </a>
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-[#fdfbf7] p-5 md:p-8 lg:border-l lg:border-t-0">
              <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2rem] md:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b1116] md:text-sm">
                  Course snapshot
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {snapshot.map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-[1.35rem] border border-neutral-200 bg-[#f7f4ee] p-4"
                    >
                      <p className="text-3xl font-semibold tracking-[-0.06em]">
                        {value}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-7 text-neutral-700">
                  Best for beginners, undergraduate students, MSc students
                  revising foundations, and learners preparing for applied
                  biostatistics or data science.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
              Learning design
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              Built for understanding, not memorisation.
            </h2>

            <div className="mt-6 grid gap-3">
              {learningDesign.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-semibold text-neutral-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-neutral-200 bg-[#111111] p-5 text-white shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55 md:text-sm">
              By the end
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              You should be able to reason statistically.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {outcomes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white/85"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Modules
              </p>

              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">
                Follow a clear five-module pathway.
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              Each module builds the language and reasoning needed for the next:
              from describing data, to probability, to inference, then
              regression.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:mt-8 lg:grid-cols-2">
            {modules.map((module) => (
              <a
                key={module.title}
                href={withBasePath(module.href)}
                className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:rounded-[2rem] md:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-[#111111] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                    {module.number}
                  </span>

                  <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    {module.status}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.045em]">
                  {module.title}
                </h3>

                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8b1116]">
                  {module.lessons}
                </p>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {module.summary}
                </p>

                <p className="mt-5 text-sm font-semibold text-[#8b1116]">
                  Open module →
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
            Try the ideas visually
          </p>

          <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
            Visual intuition before formulas.
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
            Use these small demos to see distribution shape and confidence
            interval behaviour before moving into formal notation.
          </p>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <NormalDistributionExplorer />
            <ConfidenceIntervalSimulator />
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-[#8b1116] p-5 text-white shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 md:text-sm">
                Recommended start
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
                Begin with statistical thinking.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 md:text-base md:leading-8">
                Start with populations, samples, variables and data types. These
                ideas make every later module easier to understand.
              </p>
            </div>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/introduction-to-statistical-thinking"
              )}
              className="inline-flex w-full justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
            >
              Start Module 1 →
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
