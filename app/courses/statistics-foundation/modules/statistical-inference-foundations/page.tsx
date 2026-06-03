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

const moduleStats = [
  ["6", "Lessons"],
  ["Zero", "Coding"],
  ["Foundation", "Level"],
  ["Inference", "Focus"],
];

const moduleFocus = [
  {
    title: "Sampling uncertainty",
    body: "Students learn how sample statistics vary from sample to sample and why standard error is central to inference.",
  },
  {
    title: "Estimation and testing",
    body: "The module connects confidence intervals, hypotheses, p-values, errors and power as one reasoning framework.",
  },
  {
    title: "Method choice",
    body: "Students learn to choose inference methods from the research question, outcome type, assumptions and study design.",
  },
];

const outcomes = [
  "Explain standard error and sampling variability.",
  "Interpret confidence intervals correctly.",
  "Set up null and alternative hypotheses.",
  "Interpret p-values without common mistakes.",
  "Explain Type I error, Type II error and power.",
  "Choose an inference method from outcome and design.",
];

export default function StatisticalInferenceFoundationsModulePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/statistics-foundation")}
          className="text-sm font-bold text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to Statistics Foundation
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Module 4
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] sm:text-5xl md:text-6xl">
                Statistical Inference Foundations
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                This module moves from probability models to statistical
                reasoning. Students learn how sample statistics vary, how
                uncertainty is measured, how confidence intervals and hypothesis
                tests are built, and how to choose an appropriate inference
                method for real research questions.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Module aim
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#111111]">
                Learn how sample evidence supports conclusions under uncertainty.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                The purpose of this module is to help students reason about
                estimates, uncertainty, testing, errors, power, study design and
                method choice rather than only memorising calculations.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {moduleStats.map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="text-2xl font-black tracking-[-0.04em] text-[#111111]">
                  {value}
                </p>

                <p className="mt-2 text-sm font-bold text-neutral-700">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/sampling-distributions-and-standard-error"
              )}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Start Lesson 4.1
            </a>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/regression-foundations"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Next module →
            </a>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/probability-foundations"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Previous module
            </a>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {moduleFocus.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-black tracking-[-0.03em] text-[#111111]">
                {item.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {item.body}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Module lessons
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl text-3xl font-black tracking-[-0.04em] text-[#111111] md:text-4xl">
              Learn inference step by step.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Lessons 4.1 to 4.5 form the core inference pathway. Lesson 4.6 is
              a bonus capstone that helps students choose the correct method in
              applied problems.
            </p>
          </div>

          <div className="mt-8 grid gap-5">
            {lessons.map((lesson) => (
              <a
                key={lesson.number}
                href={withBasePath(lesson.href)}
                className={`group rounded-[2rem] border p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:p-7 ${
                  lesson.status === "Bonus"
                    ? "border-[#ead8d8] bg-[#fff7ed]"
                    : "border-neutral-200 bg-[#f7f4ee]"
                }`}
              >
                <div className="grid gap-5 md:grid-cols-[0.18fr_1fr_auto] md:items-center">
                  <div>
                    <p className="text-3xl font-black tracking-[-0.05em] text-[#8b1116]">
                      {lesson.number}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-700">
                        Lesson {lesson.number}
                      </p>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${
                          lesson.status === "Bonus"
                            ? "bg-[#8b1116] text-white"
                            : "bg-white text-emerald-700"
                        }`}
                      >
                        {lesson.status}
                      </span>
                    </div>

                    <h3 className="mt-2 text-2xl font-black leading-tight tracking-[-0.04em] text-[#111111]">
                      {lesson.title}
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-700">
                      {lesson.description}
                    </p>
                  </div>

                  <p className="text-sm font-black text-[#8b1116] transition group-hover:translate-x-1">
                    Open lesson →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            End of module outcome
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="max-w-4xl text-3xl font-black tracking-[-0.04em] text-[#111111] md:text-4xl">
                Students should be able to reason, not just calculate.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-700">
                By the end of this module, students should understand how
                sampling variability, uncertainty, intervals, tests and design
                choices shape responsible statistical conclusions.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {outcomes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] p-4"
                >
                  <p className="text-sm font-bold leading-7 text-neutral-800">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Learning route
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Complete inference before moving into regression.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              Module 5 assumes that students understand sampling distributions,
              standard error, confidence intervals, hypothesis testing, p-values,
              errors, power and study design before moving into regression
              modelling.
            </p>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/regression-foundations"
              )}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Continue to Module 5 →
            </a>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Course pathway
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Return to the full Statistics Foundation course.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              Use the course homepage to move between all five modules, review
              the full structure and continue through the 26-lesson foundation
              pathway.
            </p>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Back to course →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}