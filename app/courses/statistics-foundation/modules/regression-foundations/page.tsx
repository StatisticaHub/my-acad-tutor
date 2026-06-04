const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
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

const lessons = [
  {
    number: "5.1",
    title: "Correlation and simple relationships",
    duration: "145 min",
    status: "Expanded",
    theme: "Association",
    description:
      "Understand association, scatterplots, correlation and the difference between relationship strength and causal explanation.",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/correlation-and-simple-relationships",
    skills: ["Scatterplots", "Correlation", "Association vs causation"],
  },
  {
    number: "5.2",
    title: "Simple linear regression",
    duration: "150 min",
    status: "Expanded",
    theme: "Prediction line",
    description:
      "Learn slope, intercept, prediction, residuals and the interpretation of a fitted regression line.",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/simple-linear-regression",
    skills: ["Slope", "Intercept", "Prediction"],
  },
  {
    number: "5.3",
    title: "Least squares and residuals",
    duration: "160 min",
    status: "Advanced",
    theme: "Model fit",
    description:
      "Study how least squares chooses a line and how residuals reveal model fit, unusual observations and limitations.",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/least-squares-and-residuals",
    skills: ["Least squares", "Residuals", "Diagnostics"],
  },
  {
    number: "5.4",
    title: "Multiple regression and confounding",
    duration: "170 min",
    status: "Advanced",
    theme: "Adjustment",
    description:
      "Understand adjustment, confounding, interpretation of coefficients and why model choice matters.",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/multiple-regression-and-confounding",
    skills: ["Adjusted coefficients", "Confounding", "Model choice"],
  },
  {
    number: "5.5",
    title: "Logistic regression foundations",
    duration: "200 min",
    status: "Capstone",
    theme: "Binary outcomes",
    description:
      "Learn why binary outcomes need a different regression framework and how probabilities, odds and log-odds connect.",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/logistic-regression-foundations",
    skills: ["Odds ratios", "Logit link", "Classification"],
  },
];

const moduleStats = [
  ["5", "Lessons"],
  ["14 hrs", "Study time"],
  ["0", "Coding"],
  ["Foundation → Advanced", "Level"],
];

const moduleFocus = [
  {
    title: "Association before modelling",
    body:
      "Regression begins with relationship thinking. Students first learn how scatterplots, direction, strength and correlation describe patterns between variables.",
  },
  {
    title: "Linear prediction",
    body:
      "Simple linear regression turns a relationship into an equation, giving fitted values, predictions, residuals, slope and intercept interpretations.",
  },
  {
    title: "Least-squares reasoning",
    body:
      "Students study how the fitted line is chosen by minimising squared residuals, and why residuals reveal what the model has failed to capture.",
  },
  {
    title: "Adjustment and confounding",
    body:
      "Multiple regression changes the comparison being made. Students learn adjusted coefficients, confounding, overadjustment and model-choice caution.",
  },
  {
    title: "Binary outcome modelling",
    body:
      "Logistic regression shows why probabilities, odds, log-odds and classification thresholds are needed when the outcome is yes/no.",
  },
  {
    title: "Responsible interpretation",
    body:
      "Throughout the module, regression is treated as a structured statistical argument, not an automatic causal machine.",
  },
];

const outcomes = [
  "Read scatterplots for form, direction, strength, clusters and outliers.",
  "Define and interpret Pearson correlation.",
  "Explain why correlation does not prove causation.",
  "Write and interpret a simple linear regression equation.",
  "Interpret slope, intercept, fitted values and residuals.",
  "Explain how least squares chooses a fitted line.",
  "Use residual plots to identify model limitations.",
  "Interpret adjusted coefficients in multiple regression.",
  "Explain confounding, overadjustment and model-choice risks.",
  "Convert between probability, odds and log-odds.",
  "Interpret logistic regression coefficients and odds ratios.",
  "Separate predicted probabilities from classification decisions.",
];

const regressionWorkflow = [
  {
    step: "1",
    title: "Visualise",
    body: "Start with a scatterplot or relationship display before summarising the association numerically.",
  },
  {
    step: "2",
    title: "Summarise",
    body: "Use correlation or simple regression to describe the basic relationship.",
  },
  {
    step: "3",
    title: "Fit",
    body: "Estimate the regression equation and interpret slope, intercept and fitted values.",
  },
  {
    step: "4",
    title: "Diagnose",
    body: "Use residuals, outliers and patterns to check whether the model is suitable.",
  },
  {
    step: "5",
    title: "Adjust",
    body: "Include additional predictors when the research question requires adjusted comparisons.",
  },
  {
    step: "6",
    title: "Report",
    body: "State the model goal, coefficient meaning, limitations and whether causal claims are justified.",
  },
];

const formulaCards = [
  {
    label: "Pearson correlation",
    formula: "r = Σzₓzᵧ / (n − 1)",
    note:
      "Measures direction and strength of linear association between two quantitative variables.",
  },
  {
    label: "Simple regression",
    formula: "Y = β₀ + β₁X + ε",
    note:
      "Models a continuous outcome using one explanatory variable and random error.",
  },
  {
    label: "Fitted line",
    formula: "ŷ = b₀ + b₁x",
    note:
      "Gives the predicted average outcome at a chosen value of x.",
  },
  {
    label: "Residual",
    formula: "eᵢ = yᵢ − ŷᵢ",
    note:
      "Measures the vertical prediction error for observation i.",
  },
  {
    label: "Least squares",
    formula: "minimise Σeᵢ²",
    note:
      "Chooses the fitted line with the smallest total squared residuals.",
  },
  {
    label: "Multiple regression",
    formula: "Y = β₀ + β₁X₁ + β₂X₂ + ... + ε",
    note:
      "Models adjusted associations using more than one predictor.",
  },
  {
    label: "Logit model",
    formula: "log[p/(1 − p)] = β₀ + β₁X",
    note:
      "Models binary outcomes by making log-odds linear in predictors.",
  },
  {
    label: "Odds ratio",
    formula: "OR = eβ",
    note:
      "Exponentiated logistic coefficient; multiplicative change in odds.",
  },
];

const interpretationQuestions = [
  {
    title: "What is the outcome?",
    body:
      "Regression interpretation begins by identifying the response variable and whether it is continuous or binary.",
  },
  {
    title: "What is the predictor?",
    body:
      "The explanatory variable determines the comparison being made and the unit attached to the slope.",
  },
  {
    title: "What scale is the coefficient on?",
    body:
      "Linear regression coefficients are on the outcome scale; logistic coefficients are on the log-odds scale.",
  },
  {
    title: "What is being held constant?",
    body:
      "In multiple regression, each coefficient is interpreted conditional on the other variables in the model.",
  },
  {
    title: "What do residuals show?",
    body:
      "Residuals reveal missed structure, unusual observations, nonlinearity and changing spread.",
  },
  {
    title: "Is causation justified?",
    body:
      "Regression can describe associations. Causal claims require study design, timing, theory and assumptions.",
  },
];

const warnings = [
  {
    title: "Correlation is not causation",
    body:
      "A strong association may be due to confounding, reverse causation, selection or shared context.",
  },
  {
    title: "A line can hide curvature",
    body:
      "A straight-line model may fit poorly if the true relationship is curved or has clusters.",
  },
  {
    title: "Outliers can move the model",
    body:
      "Large residuals and high-leverage points can strongly affect slope and interpretation.",
  },
  {
    title: "Adjustment can create bias",
    body:
      "Adjusting for mediators or colliders can distort the relationship being studied.",
  },
  {
    title: "Odds ratios are not risk ratios",
    body:
      "When outcomes are common, odds ratios can look more extreme than probability ratios.",
  },
  {
    title: "Prediction is not explanation",
    body:
      "A model that predicts well is not automatically a model that explains causally.",
  },
];

export default function RegressionFoundationsModulePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-4 py-8 text-[#111111] sm:px-5 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/statistics-foundation")}
          className="text-sm font-black text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to Statistics Foundation
        </a>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm md:mt-8 md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-6 md:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm md:tracking-[0.22em]">
                Module 5 · Statistics Foundation
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-7xl">
                Regression foundations.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700 md:mt-6 md:text-lg md:leading-9">
                This module develops regression as a framework for describing,
                modelling and interpreting relationships. Students move from
                scatterplots and correlation to fitted lines, residuals,
                least-squares logic, adjusted regression, confounding and
                logistic regression for binary outcomes.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(lessons[0].href)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#8b1116] sm:w-auto md:py-4"
                >
                  Start Lesson 5.1 →
                </a>

                <a
                  href={withBasePath("#module-lessons")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-black text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
                >
                  View all lessons
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {moduleStats.map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4"
                  >
                    <p className="text-2xl font-black tracking-[-0.05em]">
                      {value}
                    </p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-neutral-500">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-neutral-950 p-5 text-white md:p-8 lg:border-l lg:border-t-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 md:text-sm">
                Module visual map
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                From association to adjusted and probability-based modelling.
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/70 md:text-base md:leading-8">
                Regression is a modelling language. It asks what outcome is
                being predicted, which predictors are used, what comparison is
                being made and what assumptions are needed.
              </p>

              <div className="mt-7 grid gap-3">
                {regressionWorkflow.map((item) => (
                  <div
                    key={item.step}
                    className="flex items-start gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-neutral-950">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-sm font-black text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-white/65">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
              What this module builds
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Regression thinking beyond mechanical line fitting.
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              The module treats regression as a conceptual framework. Students
              learn how models summarise relationships, how coefficients depend
              on the chosen variables, and why diagnostics and context matter.
            </p>

            <div className="mt-6 grid gap-3">
              {moduleFocus.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] p-4"
                >
                  <h3 className="text-sm font-black text-neutral-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-neutral-700">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-neutral-200 bg-[#111111] p-5 text-white shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/55 md:text-sm">
              By the end
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Students should interpret regression with precision and caution.
            </h2>

            <div className="mt-6 grid gap-3">
              {outcomes.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-neutral-950">
                    {index + 1}
                  </span>
                  <p className="text-sm font-semibold leading-7 text-white/85">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-8">
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Interpretation workflow
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Ask six questions before interpreting any coefficient.
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              Regression coefficients are not self-explanatory. Their meaning
              depends on the outcome, predictor scale, included variables, model
              form, assumptions and research goal.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {interpretationQuestions.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <h3 className="text-lg font-black tracking-[-0.035em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-neutral-950 p-5 text-white shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-8">
          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 md:text-sm">
                Formula map
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Regression formulae are connected by prediction error and coefficient interpretation.
              </h2>
            </div>

            <p className="text-sm leading-7 text-white/70 md:text-base md:leading-8">
              Students see how the regression line, residuals, least squares,
              adjusted regression and logistic regression build one connected
              modelling story.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {formulaCards.map((item) => (
              <article
                key={item.label}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5"
              >
                <p className="text-xs font-black uppercase tracking-[0.16em] text-white/45">
                  {item.label}
                </p>
                <h3 className="mt-3 text-lg font-black leading-7 text-white">
                  {item.formula}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  {item.note}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-[#8b1116]/20 bg-[#fff7f7] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-8">
          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Common regression traps
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-[#8b1116] md:text-5xl">
                This module teaches careful modelling judgement.
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              Regression is powerful, but it is also easy to overinterpret.
              Students learn to avoid common mistakes before moving into more
              applied modelling.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {warnings.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-[#8b1116]/20 bg-white p-5"
              >
                <h3 className="text-lg font-black tracking-[-0.035em] text-[#8b1116]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="module-lessons"
          className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10"
        >
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Module lessons
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Study the lessons in order.
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              The lessons move from association to simple regression, least
              squares, multiple regression, diagnostics and logistic regression.
              Each lesson contains lecture, detailed notes, interactive labs,
              worked examples, practice, reflection and quiz.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:mt-8">
            {lessons.map((lesson) => (
              <a
                key={lesson.number}
                href={withBasePath(lesson.href)}
                className="group overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:rounded-[2rem]"
              >
                <div className="grid gap-0 lg:grid-cols-[0.22fr_1fr_0.34fr]">
                  <div className="flex items-center justify-between border-b border-neutral-200 bg-white p-5 lg:block lg:border-b-0 lg:border-r lg:p-6">
                    <p className="text-4xl font-black tracking-[-0.06em] text-[#8b1116] md:text-5xl">
                      {lesson.number}
                    </p>
                    <span className="rounded-full bg-[#f7f4ee] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-neutral-600 lg:mt-4 lg:inline-block">
                      {lesson.duration}
                    </span>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-neutral-950 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
                        {lesson.status}
                      </span>
                      <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#8b1116]">
                        {lesson.theme}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-black leading-tight tracking-[-0.04em] md:text-3xl">
                      {lesson.title}
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
                      {lesson.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {lesson.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-bold text-neutral-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-neutral-200 bg-white p-5 lg:block lg:border-l lg:border-t-0 lg:p-6">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
                      Open lesson
                    </p>
                    <p className="mt-0 text-sm font-black text-[#8b1116] transition group-hover:translate-x-1 lg:mt-4">
                      Start →
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116]">
              How to study this module
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
              Do not memorise coefficients. Interpret the comparison.
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-700">
              For every regression output, ask what outcome is being modelled,
              what one-unit change means, what variables are adjusted for, what
              residuals show and whether the model supports only association or
              a stronger explanation.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-[#8b1116]/20 bg-[#fff7f7] p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116]">
              Course completion
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-[#8b1116]">
              Ready to move into applied modelling and real study questions.
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-700">
              After this module, students should understand regression as a
              careful modelling framework. They can now approach applied
              statistical modelling with stronger foundations in association,
              uncertainty, adjustment and binary outcomes.
            </p>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="mt-6 inline-flex rounded-full bg-[#8b1116] px-5 py-3 text-sm font-black text-white transition hover:bg-[#5f0b0f]"
            >
              Back to course →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}