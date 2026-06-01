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
    title: "Sampling distributions",
    description:
      "Understand how statistics vary from sample to sample, and why sampling distributions are the bridge between probability and inference.",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/sampling-distributions",
  },
  {
    number: "5.2",
    title: "Standard errors",
    description:
      "Learn the standard error as the standard deviation of a statistic across repeated samples, and understand how it measures uncertainty.",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/standard-errors",
  },
  {
    number: "5.3",
    title: "Confidence intervals",
    description:
      "Study confidence intervals as ranges of plausible parameter values, including interpretation, margin of error and common misconceptions.",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/confidence-intervals",
  },
  {
    number: "5.4",
    title: "Hypothesis testing and p-values",
    description:
      "Understand null hypotheses, alternative hypotheses, test statistics, p-values and the logic of evidence against a null model.",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/hypothesis-testing-p-values",
  },
  {
    number: "5.5",
    title: "Errors, power and sample size",
    description:
      "Learn Type I error, Type II error, statistical power, effect size, sample size and why study design affects inferential conclusions.",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/errors-power-sample-size",
  },
];

const moduleStats = [
  { label: "Lessons", value: "5" },
  { label: "Interactive labs", value: "5" },
  { label: "Coding required", value: "0" },
  { label: "Focus", value: "Inference" },
];

const learningFlow = [
  {
    title: "Recognise sampling variation",
    body: "Start by understanding that different samples produce different statistics.",
  },
  {
    title: "Measure uncertainty",
    body: "Use standard errors to describe how much a statistic varies across repeated samples.",
  },
  {
    title: "Estimate parameters",
    body: "Construct confidence intervals to express plausible values for unknown population quantities.",
  },
  {
    title: "Test claims",
    body: "Use hypothesis tests and p-values to assess evidence against a null model.",
  },
  {
    title: "Plan studies",
    body: "Finish by studying errors, power and sample size as design-level ideas.",
  },
];

export default function StatisticalInferenceFoundationsModulePage() {
  return (
    <main className="min-h-screen bg-[#f2efe7] text-neutral-950">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
        <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <a
            href={withBasePath("/courses/statistics-foundation")}
            className="inline-flex items-center gap-2 text-sm font-black text-blue-700 hover:text-blue-800"
          >
            ← Back to Statistics Foundation
          </a>

          <nav className="flex flex-wrap gap-2">
            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/random-variables-distributions"
              )}
              className="rounded-full border border-[#ded9cf] bg-white/80 px-4 py-2 text-sm font-bold text-neutral-700 hover:bg-white"
            >
              ← Module 4
            </a>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="rounded-full border border-[#ded9cf] bg-white/80 px-4 py-2 text-sm font-bold text-neutral-700 hover:bg-white"
            >
              Finish course
            </a>
          </nav>
        </header>

        <section className="overflow-hidden rounded-[2.2rem] border border-[#ded9cf] bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.75fr] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-800">
                  Module 5
                </span>
                <span className="rounded-full bg-red-100 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-red-800">
                  Statistical Inference
                </span>
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-emerald-800">
                  Zero coding
                </span>
              </div>

              <h1 className="max-w-5xl text-4xl font-black tracking-[-0.055em] md:text-6xl">
                Statistical Inference Foundations
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-600">
                This module explains how statistics move from describing a
                sample to making careful statements about a wider population.
                Students learn why sample results vary, how uncertainty is
                measured, and how inference uses probability to support
                estimation and decision-making.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-600">
                The focus is on reasoning, not memorising formulas. By the end
                of the module, students should understand sampling
                distributions, standard errors, confidence intervals, hypothesis
                tests, p-values, statistical errors, power and sample size.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={withBasePath(
                    "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/sampling-distributions"
                  )}
                  className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-black text-white transition hover:bg-neutral-800"
                >
                  Start Lesson 5.1
                </a>

                <a
                  href="#module-lessons"
                  className="rounded-full border border-[#ded9cf] bg-white px-6 py-3 text-sm font-black text-neutral-950 transition hover:bg-[#f8f6f1]"
                >
                  View lessons
                </a>
              </div>
            </div>

            <aside className="rounded-[1.7rem] border border-[#ded9cf] bg-[#fbfaf6] p-5">
              <h2 className="text-lg font-black tracking-tight">
                Module snapshot
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {moduleStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[#ded9cf] bg-white p-4"
                  >
                    <strong className="block text-2xl font-black tracking-tight">
                      {item.value}
                    </strong>
                    <span className="mt-1 block text-xs font-bold text-neutral-500">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[#ded9cf] bg-white p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">
                  Skills developed
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-600">
                  <li>Understanding sample-to-sample variation.</li>
                  <li>Interpreting standard errors correctly.</li>
                  <li>Explaining confidence intervals without overclaiming.</li>
                  <li>Understanding p-values as evidence under a null model.</li>
                  <li>Connecting errors, power and sample size to study design.</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section id="module-lessons" className="mt-12">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                Module lessons
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                Five lessons from sampling variation to power
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-neutral-600">
              Each lesson contains a character-based lecture, detailed notes,
              an interactive lab, worked examples and a quiz.
            </p>
          </div>

          <div className="grid gap-4">
            {lessons.map((lesson) => (
              <a
                key={lesson.number}
                href={withBasePath(lesson.href)}
                className="group rounded-[1.5rem] border border-[#ded9cf] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-lg font-black text-red-800">
                      {lesson.number}
                    </div>

                    <div>
                      <h3 className="text-2xl font-black tracking-tight">
                        {lesson.title}
                      </h3>

                      <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
                        {lesson.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#f8f6f1] px-3 py-2 text-xs font-black text-neutral-600">
                          Lecture
                        </span>
                        <span className="rounded-full bg-[#f8f6f1] px-3 py-2 text-xs font-black text-neutral-600">
                          Detailed notes
                        </span>
                        <span className="rounded-full bg-[#f8f6f1] px-3 py-2 text-xs font-black text-neutral-600">
                          Interactive lab
                        </span>
                        <span className="rounded-full bg-[#f8f6f1] px-3 py-2 text-xs font-black text-neutral-600">
                          Quiz
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="shrink-0 text-sm font-black text-blue-700 transition group-hover:translate-x-1">
                    Open lesson →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
              Learning flow
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              How inference turns samples into careful conclusions
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {learningFlow.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[1.35rem] border border-[#ded9cf] bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-950 text-sm font-black text-white">
                  {index + 1}
                </div>

                <h3 className="mt-5 text-lg font-black tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-neutral-600">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-[#ded9cf] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black tracking-tight">
              What students should understand by the end
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-600">
              <li>
                Why a statistic varies from sample to sample even when the
                population is unchanged.
              </li>
              <li>
                How standard errors quantify uncertainty in estimates.
              </li>
              <li>
                Why confidence intervals describe estimation uncertainty, not
                certainty that a single interval contains the parameter.
              </li>
              <li>
                How hypothesis tests and p-values work under a null model.
              </li>
              <li>
                Why Type I error, Type II error, power and sample size are
                central to study design.
              </li>
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-[#ded9cf] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black tracking-tight">
              Course completion
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-600">
              This final module completes the Statistics Foundation pathway.
              Students should now have a strong conceptual base in statistical
              thinking, descriptive statistics, probability, random variables,
              distributions and introductory inference.
            </p>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="mt-6 inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm font-black text-white"
            >
              Return to course overview
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}