const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}`;
}

const modules = [
  {
    number: "01",
    title: "Introduction to Statistical Thinking",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking",
    description:
      "Build the language of statistics: populations, samples, variables, data types, tables, graphs and sampling methods.",
    lessons: "5 lessons",
    status: "Available",
  },
  {
    number: "02",
    title: "Descriptive Statistics",
    href: "/courses/statistics-foundation/modules/descriptive-statistics",
    description:
      "Summarise data using measures of centre, spread, quartiles, skewness, standard deviation and visual interpretation.",
    lessons: "5 lessons",
    status: "Available",
  },
  {
    number: "03",
    title: "Probability Foundations",
    href: "/courses/statistics-foundation/modules/probability-foundations",
    description:
      "Learn probability rules, conditional probability, Bayes’ theorem, random variables, expectation and core distributions.",
    lessons: "5 lessons",
    status: "Available",
  },
  {
    number: "04",
    title: "Statistical Inference Foundations",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations",
    description:
      "Understand sampling distributions, standard error, confidence intervals, hypothesis testing, p-values, errors, power and study design.",
    lessons: "6 lessons",
    status: "Available",
  },
  {
    number: "05",
    title: "Regression Foundations",
    href: "/courses/statistics-foundation/modules/regression-foundations",
    description:
      "Study simple linear regression, least squares, multiple regression, confounding, diagnostics and logistic regression.",
    lessons: "5 lessons",
    status: "Available",
  },
];

const features = [
  "Beginner-friendly theoretical explanations",
  "No coding required",
  "Mathematical notation and derivations",
  "Interactive visual labs",
  "Worked examples and quizzes",
  "Exam-style reasoning",
];

export default function StatisticsFoundationCoursePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#dbeafe,transparent_35%),radial-gradient(circle_at_bottom_left,#fef3c7,transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl">
          <a
            href={withBasePath("/learning-hub")}
            className="text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            ← Back to Learning Hub
          </a>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
            Statistics Foundation
          </p>

          <div className="mt-4 grid gap-10 lg:grid-cols-[1.35fr_0.75fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl md:text-6xl">
                Statistics Foundation for University Students
              </h1>

              <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-600">
                A theoretical and beginner-friendly course for students who want
                to build a strong base in statistics before studying
                biostatistics, epidemiology, data science, machine learning,
                research methods or quantitative analysis.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600">
                The course avoids coding and focuses on concepts, notation,
                mathematical reasoning, derivations, interpretation, interactive
                visual learning and exam-style thinking.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={withBasePath(
                    "/courses/statistics-foundation/modules/introduction-to-statistical-thinking"
                  )}
                  className="rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  Start learning
                </a>

                <a
                  href="#modules"
                  className="rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-700 transition hover:-translate-y-1 hover:shadow-md"
                >
                  View all modules
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Course snapshot
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-3xl font-semibold text-slate-950">5</p>
                  <p className="mt-1 text-sm text-slate-600">Core modules</p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="text-3xl font-semibold text-slate-950">26</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Structured lessons
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="text-3xl font-semibold text-slate-950">0</p>
                  <p className="mt-1 text-sm text-slate-600">Coding required</p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="text-3xl font-semibold text-slate-950">100%</p>
                  <p className="mt-1 text-sm text-slate-600">Concept focused</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold">Lecture-style explanations</h2>
            <p className="mt-2 text-sm leading-7 text-white/70">
              Lessons use recurring characters and conversational teaching to
              make abstract ideas easier to follow.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold">Detailed theoretical notes</h2>
            <p className="mt-2 text-sm leading-7 text-white/70">
              Notes include notation, definitions, derivations, interpretation
              and exam-style reasoning.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold">Interactive visual learning</h2>
            <p className="mt-2 text-sm leading-7 text-white/70">
              Visual labs, worked examples and quizzes help students test their
              understanding as they progress.
            </p>
          </div>
        </div>
      </section>

      <section id="modules" className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Course structure
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.025em] md:text-4xl">
              Five modules from foundations to regression
            </h2>
          </div>

          <p className="max-w-3xl text-sm leading-7 text-slate-600">
            Start with the language of data, then move through descriptive
            statistics, probability, statistical inference and regression
            foundations.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {modules.map((module) => (
            <a
              key={module.number}
              href={withBasePath(module.href)}
              className="group rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                    Module {module.number}
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.015em] group-hover:text-blue-800">
                    {module.title}
                  </h3>
                </div>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  {module.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {module.description}
              </p>

              <div className="mt-5 flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-slate-500">
                  {module.lessons}
                </span>

                <span className="text-sm font-semibold text-blue-700">
                  Open module →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            What makes this course different
          </p>

          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.025em] md:text-4xl">
            Designed for understanding, not shortcuts
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
              >
                <p className="text-sm leading-7 text-slate-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}