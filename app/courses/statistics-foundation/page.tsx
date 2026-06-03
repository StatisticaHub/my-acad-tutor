import NormalDistributionExplorer from "@/components/interactive/NormalDistributionExplorer";
import ConfidenceIntervalSimulator from "@/components/interactive/ConfidenceIntervalSimulator";

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

const modules = [
  {
    number: "01",
    title: "Introduction to Statistical Thinking",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking",
    status: "Available",
    summary:
      "Build the language of statistics: populations, samples, variables, data types, tables, graphs and sampling methods.",
    lessons: "5 lessons",
  },
  {
    number: "02",
    title: "Descriptive Statistics",
    href: "/courses/statistics-foundation/modules/descriptive-statistics",
    status: "Available",
    summary:
      "Summarise data using measures of centre, spread, quartiles, skewness, standard deviation and visual interpretation.",
    lessons: "5 lessons",
  },
  {
    number: "03",
    title: "Probability Foundations",
    href: "/courses/statistics-foundation/modules/probability-foundations",
    status: "Available",
    summary:
      "Learn probability rules, conditional probability, Bayes’ theorem, random variables, expectation and core distributions.",
    lessons: "5 lessons",
  },
  {
    number: "04",
    title: "Statistical Inference Foundations",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations",
    status: "Available",
    summary:
      "Understand sampling distributions, standard error, confidence intervals, hypothesis testing, p-values, errors, power and study design.",
    lessons: "6 lessons",
  },
  {
    number: "05",
    title: "Regression Foundations",
    href: "/courses/statistics-foundation/modules/regression-foundations",
    status: "Available",
    summary:
      "Study simple linear regression, least squares, multiple regression, confounding, diagnostics and logistic regression.",
    lessons: "5 lessons",
  },
];

const courseSnapshot = [
  ["5", "Core modules"],
  ["26", "Structured lessons"],
  ["0", "Coding required"],
  ["100%", "Concept focused"],
];

const features = [
  {
    title: "Beginner-friendly theory",
    body: "The course explains statistics through concepts, notation, examples, derivations and interpretation without assuming coding knowledge.",
  },
  {
    title: "Zero coding required",
    body: "Students focus on statistical reasoning, mathematical meaning, visual interpretation and exam-style thinking rather than software.",
  },
  {
    title: "Interactive visual learning",
    body: "Selected demos help students see probability, uncertainty, distributions and confidence intervals before memorising formulas.",
  },
];

const coursePrinciples = [
  "Lecture-style explanations with recurring characters",
  "Detailed notes with notation and derivations",
  "Interactive labs for visual understanding",
  "Worked examples and exam-style exercises",
  "Short quizzes for checking understanding",
  "No R, Python or coding required",
];

export default function StatisticsFoundationCoursePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/learning-hub")}
          className="text-sm font-bold text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to Learning Hub
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Statistics Foundation
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] sm:text-5xl md:text-6xl">
                Statistics Foundation for University Students
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                A theoretical and beginner-friendly course for students who want
                to build a strong base in statistics before studying
                biostatistics, epidemiology, data science, machine learning,
                research methods or quantitative analysis.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                The course avoids coding and focuses on concepts, notation,
                mathematical reasoning, derivations, interpretation, interactive
                visual learning and exam-style thinking.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Course aim
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#111111]">
                Build statistical reasoning before advanced methods.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                The course is designed to help students understand data,
                uncertainty, inference and regression before moving into more
                advanced quantitative subjects.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/introduction-to-statistical-thinking"
              )}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Start learning
            </a>

            <a
              href="#modules"
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              View all modules
            </a>

            <a
              href={withBasePath("/interactive-demos")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Try demos
            </a>

            <a
              href={withBasePath("/pricing")}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#8b1116] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#6f0d12] sm:w-auto"
            >
              Pricing preview
            </a>
          </div>

          <div className="mt-10">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-neutral-700">
              Course snapshot
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {courseSnapshot.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
                >
                  <p className="text-3xl font-black tracking-[-0.04em] text-[#111111]">
                    {value}
                  </p>

                  <p className="mt-2 text-sm font-bold text-neutral-700">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-black tracking-[-0.03em] text-[#111111]">
                {feature.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {feature.body}
              </p>
            </article>
          ))}
        </section>

        <section
          id="modules"
          className="mt-10 scroll-mt-24 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10"
        >
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Course structure
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl text-3xl font-black tracking-[-0.04em] text-[#111111] md:text-5xl">
              Five modules from data foundations to regression.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Start with the language of data, then move through descriptive
              statistics, probability, statistical inference and regression
              foundations. The full course contains 26 structured lessons.
            </p>
          </div>

          <div className="mt-8 grid gap-5">
            {modules.map((module) => (
              <a
                key={module.number}
                href={withBasePath(module.href)}
                className="group rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:border-[#8b1116]/30 hover:bg-white hover:shadow-md md:p-7"
              >
                <div className="grid gap-5 lg:grid-cols-[0.16fr_1fr_auto] lg:items-start">
                  <div>
                    <p className="text-4xl font-black tracking-[-0.05em] text-[#8b1116]">
                      {module.number}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-emerald-700">
                        {module.status}
                      </span>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-neutral-700">
                        {module.lessons}
                      </span>
                    </div>

                    <h3 className="mt-4 max-w-3xl text-2xl font-black tracking-[-0.035em] text-[#111111] md:text-3xl">
                      {module.title}
                    </h3>

                    <p className="mt-4 max-w-4xl text-sm leading-7 text-neutral-700 md:text-base">
                      {module.summary}
                    </p>
                  </div>

                  <div className="lg:text-right">
                    <span className="inline-flex rounded-full bg-[#111111] px-5 py-3 text-sm font-black text-white transition group-hover:bg-[#8b1116]">
                      Open module →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Learning pattern
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl font-black tracking-[-0.04em] text-[#111111] md:text-5xl">
            Every lesson follows a clear teaching structure.
          </h2>

          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {coursePrinciples.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="text-sm font-bold leading-7 text-neutral-800">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Interactive learning preview
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl text-3xl font-black tracking-[-0.04em] text-[#111111] md:text-5xl">
              Learn probability and inference by seeing how they move.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              These demos connect directly to the Statistics Foundation course:
              distributions, uncertainty, sample size and confidence intervals.
              They help students understand the idea before memorising formulas.
            </p>
          </div>

          <div className="mt-8 grid gap-8">
            <NormalDistributionExplorer />
            <ConfidenceIntervalSimulator />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath("/interactive-demos")}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Open all interactive demos
            </a>

            <a
              href={withBasePath("/dashboard")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Preview learner dashboard
            </a>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] bg-[#111111] p-6 text-white shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
            Start the course
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="max-w-3xl text-3xl font-black tracking-[-0.04em] md:text-4xl">
                Begin with Module 1: Introduction to Statistical Thinking.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/90">
                Start with populations, samples, variables, data types, tables,
                graphs and sampling methods before moving into summaries,
                probability, inference and regression.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href={withBasePath(
                  "/courses/statistics-foundation/modules/introduction-to-statistical-thinking"
                )}
                className="rounded-full bg-white px-6 py-4 text-center text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
              >
                Open Module 1 →
              </a>

              <a
                href={withBasePath(
                  "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/what-is-statistics"
                )}
                className="rounded-full border border-white/25 bg-white/10 px-6 py-4 text-center text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                Start Lesson 1.1
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}