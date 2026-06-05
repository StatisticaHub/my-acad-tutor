const basePath = "";

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
    number: "4.1",
    title: "Sampling distributions and standard error",
    duration: "135 min",
    status: "Expanded",
    theme: "Sampling variability",
    description:
      "How sample statistics vary from sample to sample, why standard error matters, and how probability becomes statistical inference.",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/sampling-distributions-and-standard-error",
    skills: ["Sampling distributions", "Standard error", "Repeated samples"],
  },
  {
    number: "4.2",
    title: "Confidence intervals",
    duration: "135 min",
    status: "Expanded",
    theme: "Interval estimation",
    description:
      "Interval estimation, margin of error, confidence level, long-run coverage, interpretation and common mistakes.",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/confidence-intervals",
    skills: ["Margin of error", "Coverage", "Interval interpretation"],
  },
  {
    number: "4.3",
    title: "Hypothesis testing framework",
    duration: "140 min",
    status: "Expanded",
    theme: "Testing logic",
    description:
      "Null and alternative hypotheses, test statistics, null distributions, p-values, rejection rules and statistical decisions.",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/hypothesis-testing-framework",
    skills: ["Null model", "Test statistics", "Decision rules"],
  },
  {
    number: "4.4",
    title: "P-values, errors and power",
    duration: "150 min",
    status: "Advanced",
    theme: "Evidence quality",
    description:
      "Advanced interpretation of p-values, Type I error, Type II error, significance level, power, effect size and practical importance.",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/p-values-errors-and-power",
    skills: ["Type I/II errors", "Power", "Effect size"],
  },
  {
    number: "4.5",
    title: "Sample size and study design",
    duration: "155 min",
    status: "Advanced",
    theme: "Study planning",
    description:
      "How sample size, variability, effect size, power, allocation, precision and study design influence the quality of statistical evidence.",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/sample-size-and-study-design",
    skills: ["Sample size", "Power planning", "Study design"],
  },
  {
    number: "4.6",
    title: "Choosing the right inference method",
    duration: "150 min",
    status: "Capstone",
    theme: "Method selection",
    description:
      "A capstone lesson on choosing between t-tests, proportion methods, chi-square tests, rank-based methods and correct reporting.",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/choosing-the-right-inference-method",
    skills: ["Method choice", "Assumptions", "Reporting"],
  },
];

const moduleStats = [
  ["6", "Lessons"],
  ["14–15 hrs", "Study time"],
  ["0", "Coding"],
  ["Foundation → Advanced", "Level"],
];

const moduleFocus = [
  {
    title: "Sampling variability",
    body:
      "Inference begins with the idea that different samples produce different estimates, even from the same population.",
  },
  {
    title: "Uncertainty around estimates",
    body:
      "Standard error and confidence intervals show how much uncertainty surrounds a sample statistic.",
  },
  {
    title: "Evidence against a model",
    body:
      "Hypothesis tests compare observed data with what would be expected if a null model were true.",
  },
  {
    title: "Decision errors",
    body:
      "Statistical decisions can be wrong. Students learn Type I error, Type II error, power and their design implications.",
  },
  {
    title: "Study design",
    body:
      "Sample size, variability, allocation, dropout and bias control shape the strength of statistical evidence.",
  },
  {
    title: "Method choice",
    body:
      "The final lesson brings the module together by matching research questions, data types and assumptions to suitable inference methods.",
  },
];

const outcomes = [
  "Explain why sample statistics vary from sample to sample.",
  "Define and interpret standard error.",
  "Construct and interpret confidence intervals correctly.",
  "Explain confidence level using long-run coverage.",
  "State null and alternative hypotheses clearly.",
  "Calculate and interpret test statistics and p-values.",
  "Distinguish Type I error, Type II error and power.",
  "Explain why statistical significance is not practical importance.",
  "Plan sample size using precision and power logic.",
  "Choose appropriate inference methods for common study questions.",
];

const inferenceWorkflow = [
  {
    step: "1",
    title: "Question",
    body: "What population parameter or comparison is being studied?",
  },
  {
    step: "2",
    title: "Estimate",
    body: "What statistic summarises the sample evidence?",
  },
  {
    step: "3",
    title: "Uncertainty",
    body: "How variable is the statistic across repeated samples?",
  },
  {
    step: "4",
    title: "Interval",
    body: "What range of parameter values is compatible with the data?",
  },
  {
    step: "5",
    title: "Test",
    body: "Are the data surprising under a clear null model?",
  },
  {
    step: "6",
    title: "Decision",
    body: "What conclusion is justified, and what uncertainty remains?",
  },
];

const formulaCards = [
  {
    label: "Standard error",
    formula: "SE(x̄) = σ / √n",
    note:
      "Measures how much sample means vary across repeated samples.",
  },
  {
    label: "Confidence interval",
    formula: "estimate ± critical value × SE",
    note:
      "Turns a point estimate into a range of plausible parameter values.",
  },
  {
    label: "Test statistic",
    formula: "z = (estimate − null value) / SE",
    note:
      "Measures distance from the null in standard-error units.",
  },
  {
    label: "Power",
    formula: "Power = 1 − β",
    note:
      "Probability of detecting a specified real effect.",
  },
  {
    label: "Mean sample size",
    formula: "n = (z*σ / ME)²",
    note:
      "Used when planning precision for a confidence interval around a mean.",
  },
  {
    label: "Two-group SE",
    formula: "SE = σ√(1/n₁ + 1/n₂)",
    note:
      "Shows why balanced group allocation is often efficient.",
  },
];

const reasoningQuestions = [
  {
    title: "What is the target parameter?",
    body:
      "Inference must begin with the population quantity being estimated or tested.",
  },
  {
    title: "What is the estimator?",
    body:
      "Identify the statistic calculated from the sample, such as a mean, proportion or difference.",
  },
  {
    title: "What assumptions are being made?",
    body:
      "Independence, sample size, distribution shape and measurement quality affect validity.",
  },
  {
    title: "How much uncertainty remains?",
    body:
      "Use standard error, confidence intervals and design context to judge precision.",
  },
  {
    title: "What decision is justified?",
    body:
      "Hypothesis tests support reject or fail-to-reject decisions, but not absolute proof.",
  },
  {
    title: "Does the result matter?",
    body:
      "Statistical significance should be interpreted with effect size and practical importance.",
  },
];

const designWarnings = [
  {
    title: "Large n does not remove bias",
    body:
      "A large biased sample can produce a very precise but misleading estimate.",
  },
  {
    title: "Small p-values are not effect sizes",
    body:
      "A tiny p-value can occur for a tiny effect if the sample size is very large.",
  },
  {
    title: "Non-significant is not no effect",
    body:
      "A study may fail to reject H₀ because it is underpowered or too variable.",
  },
  {
    title: "Confidence is not certainty",
    body:
      "A 95% confidence interval is about long-run method performance, not guaranteed truth.",
  },
];

export default function StatisticalInferenceModulePage() {
  return (
    <main className="min-h-screen bg-[#F7F3EA] px-4 py-8 text-[#141210] sm:px-5 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/statistics-foundation")}
          className="text-sm font-black text-[#741018] transition hover:text-[#4d080e]"
        >
          ← Back to Statistics Foundation
        </a>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm md:mt-8 md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-6 md:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm md:tracking-[0.22em]">
                Module 4 · Statistics Foundation
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-7xl">
                Statistical inference.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252] md:mt-6 md:text-lg md:leading-9">
                This module explains how statisticians move from sample data to
                population conclusions. Students learn sampling distributions,
                standard error, confidence intervals, hypothesis tests, p-values,
                power, sample size and method selection. The emphasis is on
                careful reasoning, not mechanical testing.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(lessons[0].href)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#11100E] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#741018] sm:w-auto md:py-4"
                >
                  Start Lesson 4.1 →
                </a>

                <a
                  href={withBasePath("#module-lessons")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-6 py-3.5 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA] sm:w-auto md:py-4"
                >
                  View all lessons
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {moduleStats.map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4"
                  >
                    <p className="text-2xl font-black tracking-[-0.05em]">
                      {value}
                    </p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-[#7a7063]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-t border-[#E4DED2] bg-[#11100E] p-5 text-white md:p-8 lg:border-l lg:border-t-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 md:text-sm">
                Module visual map
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                From sample variation to evidence-based decisions.
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/70 md:text-base md:leading-8">
                Inference begins with sampling variability, then builds
                uncertainty intervals, testing rules, error awareness, power
                planning and method selection.
              </p>

              <div className="mt-7 grid gap-3">
                {inferenceWorkflow.map((item) => (
                  <div
                    key={item.step}
                    className="flex items-start gap-4 rounded-[1.25rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFFCF6] text-sm font-black text-[#141210]">
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
          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
              What this module builds
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              The reasoning system behind statistical evidence.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#525252] md:text-base md:leading-8">
              Descriptive statistics summarise what was observed. Probability
              describes uncertainty. Statistical inference combines both: it
              uses probability models to decide what sample evidence says about
              a wider population.
            </p>

            <div className="mt-6 grid gap-3">
              {moduleFocus.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] p-4"
                >
                  <h3 className="text-sm font-black text-[#141210]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#525252]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#11100E] p-5 text-white shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/55 md:text-sm">
              By the end
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Students should be able to interpret evidence responsibly.
            </h2>

            <div className="mt-6 grid gap-3">
              {outcomes.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-[#FFFCF6]/[0.06] px-4 py-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFFCF6] text-xs font-black text-[#141210]">
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

        <section className="mt-6 rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-8">
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
                Inference reasoning workflow
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Ask six questions before reporting evidence.
              </h2>
            </div>

            <p className="text-sm leading-7 text-[#525252] md:text-base md:leading-8">
              Good inference is not just formula selection. Students must define
              the parameter, understand the estimator, check assumptions,
              quantify uncertainty, make careful decisions and judge practical
              meaning.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {reasoningQuestions.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
              >
                <h3 className="text-lg font-black tracking-[-0.035em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-[#E4DED2] bg-[#11100E] p-5 text-white shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-8">
          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 md:text-sm">
                Formula map
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Inference formulae all come from sampling variability.
              </h2>
            </div>

            <p className="text-sm leading-7 text-white/70 md:text-base md:leading-8">
              Confidence intervals, hypothesis tests, power and sample size
              calculations are connected by one central idea: how much a sample
              statistic varies from sample to sample.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {formulaCards.map((item) => (
              <article
                key={item.label}
                className="rounded-[1.5rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5"
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

        <section className="mt-6 rounded-[1.75rem] border border-[#741018]/20 bg-[#fff4ef] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-8">
          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
                Common inference traps
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-[#741018] md:text-5xl">
                This module teaches careful interpretation.
              </h2>
            </div>

            <p className="text-sm leading-7 text-[#525252] md:text-base md:leading-8">
              Many statistical mistakes come from overinterpreting p-values,
              ignoring uncertainty or assuming large datasets automatically
              produce valid conclusions.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {designWarnings.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-[#741018]/20 bg-[#FFFCF6] p-5"
              >
                <h3 className="text-lg font-black tracking-[-0.035em] text-[#741018]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="module-lessons"
          className="mt-6 rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10"
        >
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
                Module lessons
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Study the lessons in order.
              </h2>
            </div>

            <p className="text-sm leading-7 text-[#525252] md:text-base md:leading-8">
              The lessons build from sampling variability to intervals, tests,
              p-values, power, design and method selection. Each lesson contains
              lecture, detailed notes, interactive labs, worked examples,
              practice, reflection and quiz.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:mt-8">
            {lessons.map((lesson) => (
              <a
                key={lesson.number}
                href={withBasePath(lesson.href)}
                className="group overflow-hidden rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] transition hover:-translate-y-1 hover:bg-[#FFFCF6] hover:shadow-md md:rounded-[2rem]"
              >
                <div className="grid gap-0 lg:grid-cols-[0.22fr_1fr_0.34fr]">
                  <div className="flex items-center justify-between border-b border-[#E4DED2] bg-[#FFFCF6] p-5 lg:block lg:border-b-0 lg:border-r lg:p-6">
                    <p className="text-4xl font-black tracking-[-0.06em] text-[#741018] md:text-5xl">
                      {lesson.number}
                    </p>
                    <span className="rounded-full bg-[#F7F3EA] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#5F5F5F] lg:mt-4 lg:inline-block">
                      {lesson.duration}
                    </span>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#11100E] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
                        {lesson.status}
                      </span>
                      <span className="rounded-full border border-[#E4DED2] bg-[#FFFCF6] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#741018]">
                        {lesson.theme}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-black leading-tight tracking-[-0.04em] md:text-3xl">
                      {lesson.title}
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-[#525252] md:text-base md:leading-8">
                      {lesson.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {lesson.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-[#E4DED2] bg-[#FFFCF6] px-3 py-1.5 text-xs font-bold text-[#5F5F5F]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#E4DED2] bg-[#FFFCF6] p-5 lg:block lg:border-l lg:border-t-0 lg:p-6">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7a7063]">
                      Open lesson
                    </p>
                    <p className="mt-0 text-sm font-black text-[#741018] transition group-hover:translate-x-1 lg:mt-4">
                      Start →
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018]">
              How to study this module
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
              Always connect the formula to the research question.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#525252]">
              Inference is not about memorising procedures. Before applying a
              method, identify the parameter, estimator, sampling assumption,
              standard error, uncertainty statement and practical meaning. This
              habit prevents mechanical and misleading interpretation.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-[#741018]/20 bg-[#fff4ef] p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018]">
              Module completion
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-[#741018]">
              Ready for modelling and applied statistical decisions.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#525252]">
              After this module, students should understand how sample evidence
              becomes statistical evidence. They will be ready to study
              relationships, regression, model assumptions and applied
              reporting with a stronger inference foundation.
            </p>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="mt-6 inline-flex rounded-full bg-[#741018] px-5 py-3 text-sm font-black text-white transition hover:bg-[#4d080e]"
            >
              Back to course →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}