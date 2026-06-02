const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}`;
}

const lessons = [
  {
    number: "5.1",
    title: "Simple Linear Regression",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/simple-linear-regression",
    description:
      "Regression as conditional mean modelling: slope, intercept, fitted values, residuals, least-squares intuition and careful interpretation.",
    status: "Ready",
  },
  {
    number: "5.2",
    title: "Least Squares Derivation",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/least-squares-derivation",
    description:
      "Derive the regression line from first principles using squared residuals, partial derivatives, normal equations and covariance-style reasoning.",
    status: "Ready",
  },
  {
    number: "5.3",
    title: "Multiple Regression and Confounding",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/multiple-regression-confounding",
    description:
      "Adjusted coefficients, confounding, omitted-variable bias, categorical predictors, multicollinearity and scientific model interpretation.",
    status: "Ready",
  },
  {
    number: "5.4",
    title: "Model Assessment and Diagnostics",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/model-assessment-diagnostics",
    description:
      "Residual diagnostics, linearity, constant variance, R-squared, adjusted R-squared, residual standard error, leverage, outliers and influence.",
    status: "Ready",
  },
  {
    number: "5.5",
    title: "Logistic Regression Introduction",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/logistic-regression-intro",
    description:
      "Binary outcomes, probability, odds, log-odds, logistic curves, odds ratios, likelihood, thresholds and classification decisions.",
    status: "Ready",
  },
];

const moduleHighlights = [
  "Model conditional means and probabilities",
  "Interpret slopes, residuals and fitted values",
  "Derive least-squares estimates mathematically",
  "Understand adjustment, confounding and bias",
  "Diagnose regression model problems",
  "Introduce logistic regression for binary outcomes",
];

export default function RegressionFoundationsModulePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-950">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/statistics-foundation")}
          className="text-sm font-bold text-blue-700 hover:text-blue-900"
        >
          ← Back to Statistics Foundation
        </a>

        <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-blue-700">
          Module 5
        </p>

        <div className="mt-4 grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-3xl font-black tracking-tight sm:text-4xl md:text-6xl">
              Regression Foundations
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              This module introduces regression as a way of modelling
              relationships between variables. Students begin with simple linear
              regression, derive the least-squares line, move into multiple
              regression and confounding, learn model diagnostics, and finish
              with logistic regression for binary outcomes.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-black text-blue-800">
                5 lessons
              </span>
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-800">
                Full interactive pages
              </span>
              <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-black text-violet-800">
                Theory + derivations
              </span>
              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-black text-amber-800">
                Zero coding
              </span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
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
      </section>

      <section className="mx-auto mt-12 max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
              Module lessons
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              From straight-line models to binary-outcome regression
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-slate-600">
            Each lesson includes a conversational lecture, detailed theoretical
            notes, interactive visual labs, worked examples, exercises and a
            quiz.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {lessons.map((lesson) => (
            <a
              key={lesson.number}
              href={withBasePath(lesson.href)}
              className="group rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
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

              <p className="mt-5 text-sm font-black text-blue-700">
                Open lesson →
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}