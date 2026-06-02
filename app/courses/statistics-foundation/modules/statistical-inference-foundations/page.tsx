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
    number: "4.1",
    title: "Sampling Distributions and Standard Error",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/sampling-distributions-and-standard-error",
    description:
      "How sample statistics vary from sample to sample, why standard error matters, and how probability becomes statistical inference.",
    status: "Ready",
  },
  {
    number: "4.2",
    title: "Confidence Intervals",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/confidence-intervals",
    description:
      "Interval estimation, margin of error, confidence level, long-run coverage, interpretation and common mistakes.",
    status: "Ready",
  },
  {
    number: "4.3",
    title: "Hypothesis Testing Framework",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/hypothesis-testing-framework",
    description:
      "Null and alternative hypotheses, test statistics, null distributions, p-values, rejection rules and statistical decisions.",
    status: "Ready",
  },
  {
    number: "4.4",
    title: "P-values, Errors and Power",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/p-values-errors-and-power",
    description:
      "Advanced interpretation of p-values, Type I error, Type II error, significance level, power, effect size and practical importance.",
    status: "Ready",
  },
  {
    number: "4.5",
    title: "Sample Size and Study Design",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/sample-size-and-study-design",
    description:
      "How sample size, variability, effect size, power, allocation, precision and study design influence the quality of statistical evidence.",
    status: "Ready",
  },
  {
    number: "4.6",
    title: "Choosing the Right Inference Method",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/choosing-the-right-inference-method",
    description:
      "A bonus capstone lesson on choosing between t-tests, proportion methods, chi-square tests, rank-based methods and correct reporting.",
    status: "Bonus",
  },
];

export default function StatisticalInferenceFoundationsModulePage() {
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
          Module 4
        </p>

        <div className="mt-4 grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-3xl font-black tracking-tight sm:text-4xl md:text-6xl">
              Statistical Inference Foundations
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              This module moves from probability models to statistical
              reasoning. Students learn how sample statistics vary, how
              uncertainty is measured, how confidence intervals and hypothesis
              tests are built, and how to choose an appropriate inference method
              for real research questions.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
              Module focus
            </p>

            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <li>Sampling distributions and standard error</li>
              <li>Confidence intervals and long-run coverage</li>
              <li>Hypothesis testing and null distributions</li>
              <li>P-values, Type I error, Type II error and power</li>
              <li>Sample size, precision and study design</li>
              <li>Choosing and reporting inference methods</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">
              Core idea
            </p>
            <p className="mt-3 text-sm leading-7 text-blue-950">
              Inference begins when a statistic from one sample is used to learn
              about an unknown population parameter.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-5">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-700">
              Mathematical thread
            </p>
            <p className="mt-3 text-sm leading-7 text-emerald-950">
              Estimate, standard error, sampling distribution, critical value,
              interval, p-value and power are connected ideas.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-amber-100 bg-amber-50 p-5">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-700">
              Practical outcome
            </p>
            <p className="mt-3 text-sm leading-7 text-amber-950">
              Students learn not only how to calculate inference, but also how
              to interpret and report it responsibly.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
              Module lessons
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Learn inference step by step
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            Lessons 4.1 to 4.5 form the core inference pathway. Lesson 4.6 is a
            bonus capstone that helps students choose the correct method in
            applied problems.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {lessons.map((lesson) => (
            <a
              key={lesson.number}
              href={withBasePath(lesson.href)}
              className={`rounded-[1.7rem] border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                lesson.status === "Bonus"
                  ? "border-blue-200 bg-blue-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    {lesson.status === "Bonus"
                      ? `Bonus Lesson ${lesson.number}`
                      : `Lesson ${lesson.number}`}
                  </p>

                  <h3 className="mt-3 text-2xl font-black tracking-tight">
                    {lesson.title}
                  </h3>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-black ${
                    lesson.status === "Bonus"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {lesson.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {lesson.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl rounded-[2rem] bg-slate-950 p-8 text-white">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-300">
              End of module outcome
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              Students should be able to reason, not just calculate.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Explain standard error and sampling variability.",
              "Interpret confidence intervals correctly.",
              "Set up null and alternative hypotheses.",
              "Interpret p-values without common mistakes.",
              "Explain Type I error, Type II error and power.",
              "Choose an inference method from outcome and design.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm leading-7 text-white/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}