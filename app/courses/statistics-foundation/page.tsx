const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  return `${basePath}${href}/`;
}

const lessons = [
  {
    number: "5.1",
    title: "Simple Linear Regression",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/simple-linear-regression",
    description:
      "Regression as conditional mean modelling: intercepts, slopes, fitted values, residuals, least-squares intuition and careful statistical interpretation.",
    topics: [
      "Conditional means",
      "Slope and intercept",
      "Residuals and fitted values",
    ],
    status: "Ready",
  },
  {
    number: "5.2",
    title: "Least Squares Derivation",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/least-squares-derivation",
    description:
      "Derive the regression line from first principles using residual sums of squares, partial derivatives, normal equations, covariance and variance.",
    topics: [
      "SSE minimisation",
      "Normal equations",
      "Slope and intercept formulas",
    ],
    status: "Ready",
  },
  {
    number: "5.3",
    title: "Multiple Regression and Confounding",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/multiple-regression-confounding",
    description:
      "Move from one predictor to several predictors. Learn adjusted coefficients, confounding, omitted-variable bias, categorical predictors and multicollinearity.",
    topics: [
      "Adjusted coefficients",
      "Confounding",
      "Omitted-variable bias",
    ],
    status: "Ready",
  },
  {
    number: "5.4",
    title: "Model Assessment and Diagnostics",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/model-assessment-diagnostics",
    description:
      "Assess whether a regression model is trustworthy using residuals, R-squared, adjusted R-squared, residual standard error, assumptions, outliers, leverage and influence.",
    topics: [
      "Residual diagnostics",
      "R-squared and adjusted R-squared",
      "Outliers and influence",
    ],
    status: "Ready",
  },
  {
    number: "5.5",
    title: "Logistic Regression Introduction",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/logistic-regression-intro",
    description:
      "Introduce regression for binary outcomes using probability, odds, log-odds, logistic curves, odds ratios, likelihood, predicted probabilities and thresholds.",
    topics: [
      "Binary outcomes",
      "Odds and log-odds",
      "Odds ratios and thresholds",
    ],
    status: "Ready",
  },
];

const moduleHighlights = [
  "Model relationships between variables using regression",
  "Understand slopes, intercepts, fitted values and residuals",
  "Derive least-squares estimates mathematically",
  "Interpret adjusted regression coefficients carefully",
  "Recognise confounding and omitted-variable bias",
  "Assess regression models using diagnostics",
  "Introduce logistic regression for binary outcomes",
];

const learningOutcomes = [
  "Explain regression as conditional mean modelling rather than simply drawing a line.",
  "Interpret simple and multiple regression coefficients using careful statistical language.",
  "Derive the ordinary least-squares slope and intercept from the SSE objective.",
  "Distinguish crude associations from adjusted associations.",
  "Explain how confounding can distort regression coefficients.",
  "Use residual diagnostics to identify non-linearity, non-constant variance and influential observations.",
  "Explain logistic regression using probability, odds, log-odds and odds ratios.",
];

const moduleFeatures = [
  {
    title: "Conversational lectures",
    description:
      "Each lesson uses Mr. R, Emma, Oliver, James and Sophia to explain difficult regression ideas step by step.",
  },
  {
    title: "Mathematical derivations",
    description:
      "The module develops formulas carefully, including least squares, normal equations, R-squared and logistic transformations.",
  },
  {
    title: "Interactive visual labs",
    description:
      "Students can explore residuals, SSE, confounding, diagnostics and logistic probability curves visually.",
  },
  {
    title: "Exam-style practice",
    description:
      "Worked examples, exercises and quizzes strengthen interpretation, calculation and reasoning.",
  },
];

export default function RegressionFoundationsModulePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#dbeafe,transparent_34%),radial-gradient(circle_at_bottom_left,#ecfeff,transparent_32%)]" />

        <div className="relative mx-auto max-w-7xl">
          <a
            href={withBasePath("/courses/statistics-foundation")}
            className="text-sm font-bold text-blue-700 hover:text-blue-900"
          >
            ← Back to Statistics Foundation
          </a>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_0.75fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-700">
                Module 5
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
                Regression Foundations
              </h1>

              <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-600">
                This module introduces regression as a theoretical framework for
                modelling relationships between variables. Students begin with
                simple linear regression, derive the least-squares line, move
                into multiple regression and confounding, learn how to assess
                model assumptions, and finish with logistic regression for
                binary outcomes.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-black text-blue-800">
                  5 lessons
                </span>
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-800">
                  Fully available
                </span>
                <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-black text-violet-800">
                  Theory + derivations
                </span>
                <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-black text-amber-800">
                  Interactive labs
                </span>
                <span className="rounded-full bg-slate-900 px-4 py-2 text-sm font-black text-white">
                  Zero coding
                </span>
              </div>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href={withBasePath(
                    "/courses/statistics-foundation/modules/regression-foundations/lessons/simple-linear-regression"
                  )}
                  className="rounded-full bg-slate-950 px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  Start Module 5
                </a>

                <a
                  href="#lessons"
                  className="rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-black text-slate-700 transition hover:-translate-y-1 hover:shadow-md"
                >
                  View lessons
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
                Module focus
              </p>

              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {moduleHighlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-3xl font-black">5</p>
            <p className="mt-2 text-sm font-bold text-white/70">
              Complete lessons
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-3xl font-black">0</p>
            <p className="mt-2 text-sm font-bold text-white/70">
              Coding required
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-3xl font-black">5</p>
            <p className="mt-2 text-sm font-bold text-white/70">
              Interactive labs
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-3xl font-black">100%</p>
            <p className="mt-2 text-sm font-bold text-white/70">
              Concept focused
            </p>
          </div>
        </div>
      </section>

      <section id="lessons" className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
              Module lessons
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight md:text-4xl">
              From straight-line models to binary-outcome regression
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-slate-600">
            Each lesson includes a character-led lecture, detailed theoretical
            notes, interactive visual learning, worked examples, exercises and a
            quiz.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {lessons.map((lesson) => (
            <a
              key={lesson.number}
              href={withBasePath(lesson.href)}
              className="group rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    Lesson {lesson.number}
                  </p>

                  <h3 className="mt-3 text-2xl font-black tracking-tight group-hover:text-blue-800">
                    {lesson.title}
                  </h3>
                </div>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                  {lesson.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {lesson.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {lesson.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-sm font-black text-blue-700">
                Open lesson →
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
            What students will learn
          </p>

          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight md:text-4xl">
            Regression as theory, interpretation and model checking
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {learningOutcomes.map((outcome, index) => (
              <div
                key={outcome}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
              >
                <p className="text-sm font-black text-blue-700">
                  Outcome {index + 1}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {moduleFeatures.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-black tracking-tight">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-blue-200 bg-blue-50 p-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
            Suggested path
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight">
            Complete lessons 5.1 to 5.5 in order
          </h2>

          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">
            This module is designed as a sequence. Simple regression introduces
            the language of fitted values and residuals. Least squares explains
            where the fitted line comes from. Multiple regression then adds
            adjustment and confounding. Diagnostics teach students how to check
            the model. Logistic regression finishes the course by extending
            regression thinking to binary outcomes.
          </p>

          <a
            href={withBasePath(
              "/courses/statistics-foundation/modules/regression-foundations/lessons/simple-linear-regression"
            )}
            className="mt-6 inline-flex rounded-full bg-blue-700 px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-blue-800 hover:shadow-lg"
          >
            Begin with Lesson 5.1 →
          </a>
        </div>
      </section>
    </main>
  );
}