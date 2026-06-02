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
    title: "What is a random variable?",
    description:
      "Understand how random outcomes can be represented numerically, and distinguish between discrete and continuous random variables.",
    href: "/courses/statistics-foundation/modules/random-variables-distributions/lessons/what-is-a-random-variable",
  },
  {
    number: "4.2",
    title: "Expected value",
    description:
      "Learn expected value as the long-run average of a random variable, including weighted averages and interpretation.",
    href: "/courses/statistics-foundation/modules/random-variables-distributions/lessons/expected-value",
  },
  {
    number: "4.3",
    title: "Variance and standard deviation of random variables",
    description:
      "Study how variability is measured for random variables using variance, standard deviation and squared deviations from expectation.",
    href: "/courses/statistics-foundation/modules/random-variables-distributions/lessons/variance-standard-deviation",
  },
  {
    number: "4.4",
    title: "Discrete distributions: Binomial and Poisson",
    description:
      "Understand two major discrete probability models: the Binomial distribution for counts of successes and the Poisson distribution for event counts.",
    href: "/courses/statistics-foundation/modules/random-variables-distributions/lessons/binomial-poisson",
  },
  {
    number: "4.5",
    title: "The Normal distribution",
    description:
      "Study the bell-shaped Normal distribution, standardisation, the standard Normal curve and why it appears throughout statistics.",
    href: "/courses/statistics-foundation/modules/random-variables-distributions/lessons/normal-distribution",
  },
];

const moduleStats = [
  { label: "Lessons", value: "5" },
  { label: "Interactive labs", value: "5" },
  { label: "Coding required", value: "0" },
  { label: "Focus", value: "Distributions" },
];

const learningFlow = [
  {
    title: "Turn outcomes into numbers",
    body: "Begin by understanding how random variables assign numerical values to uncertain outcomes.",
  },
  {
    title: "Find the long-run centre",
    body: "Use expected value to describe the theoretical average of a random variable.",
  },
  {
    title: "Measure theoretical spread",
    body: "Study variance and standard deviation as measures of uncertainty around expectation.",
  },
  {
    title: "Model discrete counts",
    body: "Use Binomial and Poisson distributions for common count-based probability problems.",
  },
  {
    title: "Model continuous variation",
    body: "Finish with the Normal distribution, standardisation and the foundation for inference.",
  },
];

export default function RandomVariablesDistributionsModulePage() {
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
                "/courses/statistics-foundation/modules/probability-foundations"
              )}
              className="rounded-full border border-[#ded9cf] bg-white/80 px-4 py-2 text-sm font-bold text-neutral-700 hover:bg-white"
            >
              ← Module 3
            </a>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/statistical-inference-foundations"
              )}
              className="rounded-full border border-[#ded9cf] bg-white/80 px-4 py-2 text-sm font-bold text-neutral-700 hover:bg-white"
            >
              Module 5 →
            </a>
          </nav>
        </header>

        <section className="overflow-hidden rounded-[2.2rem] border border-[#ded9cf] bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.75fr] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-800">
                  Module 4
                </span>
                <span className="rounded-full bg-violet-100 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-violet-800">
                  Random Variables
                </span>
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-emerald-800">
                  Zero coding
                </span>
              </div>

              <h1 className="max-w-5xl text-4xl font-black tracking-[-0.055em] md:text-6xl">
                Random Variables and Distributions
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-600">
                This module connects probability to statistical modelling. A
                random variable allows us to represent uncertain outcomes
                numerically, and a probability distribution tells us how
                probability is assigned across those possible values.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-600">
                Students learn expected value, variance, standard deviation and
                key probability distributions such as Binomial, Poisson and
                Normal. These ideas prepare the ground for sampling
                distributions, confidence intervals and hypothesis testing in
                Module 5.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={withBasePath(
                    "/courses/statistics-foundation/modules/random-variables-distributions/lessons/what-is-a-random-variable"
                  )}
                  className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-black text-white transition hover:bg-neutral-800"
                >
                  Start Lesson 4.1
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
                  <li>Defining discrete and continuous random variables.</li>
                  <li>Interpreting probability distributions.</li>
                  <li>Calculating expected value and variance.</li>
                  <li>Recognising Binomial and Poisson settings.</li>
                  <li>Using the Normal distribution and z-standardisation.</li>
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
                Five lessons from random variables to the Normal curve
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
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-lg font-black text-violet-800">
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
              How random variables connect probability to inference
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
                Why random variables are numerical descriptions of uncertain
                outcomes.
              </li>
              <li>
                How probability distributions describe all possible values of a
                random variable.
              </li>
              <li>
                How expected value, variance and standard deviation summarise a
                distribution.
              </li>
              <li>
                When Binomial and Poisson models are appropriate for discrete
                data.
              </li>
              <li>
                Why the Normal distribution is central to standardisation and
                inference.
              </li>
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-[#ded9cf] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black tracking-tight">
              Preparation for Module 5
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-600">
              Random variables and distributions prepare students for
              statistical inference. Once we understand theoretical
              distributions, we can study sampling distributions, standard
              errors, confidence intervals, hypothesis tests and p-values.
            </p>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/statistical-inference-foundations"
              )}
              className="mt-6 inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm font-black text-white"
            >
              Continue to Module 5 →
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}