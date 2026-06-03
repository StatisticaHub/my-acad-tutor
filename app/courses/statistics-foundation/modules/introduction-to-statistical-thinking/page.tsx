const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
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
    number: "1.1",
    title: "What is statistics?",
    description:
      "Understand statistics as the science of learning from data under uncertainty.",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/what-is-statistics",
  },
  {
    number: "1.2",
    title: "Populations, samples and variables",
    description:
      "Learn how populations, samples, observational units, variables, parameters and statistics connect.",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/populations-samples-variables",
  },
  {
    number: "1.3",
    title: "Types of data",
    description:
      "Classify data as categorical, numerical, nominal, ordinal, discrete or continuous.",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/types-of-data",
  },
  {
    number: "1.4",
    title: "Tables and graphs",
    description:
      "Choose appropriate tables and graphs for different variable types and research questions.",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/tables-and-graphs",
  },
  {
    number: "1.5",
    title: "Sampling methods",
    description:
      "Compare simple random, systematic, stratified, cluster and convenience sampling.",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/sampling-methods",
  },
];

const moduleStats = [
  ["5", "Lessons"],
  ["0", "Coding"],
  ["Foundation", "Level"],
  ["Data", "Language"],
];

const moduleFocus = [
  {
    title: "Statistical language",
    body: "Learn the vocabulary of data, variables, populations, samples, parameters and statistics.",
  },
  {
    title: "Data structure",
    body: "Understand how variable types affect summaries, graphs and interpretation.",
  },
  {
    title: "Sampling thinking",
    body: "See why sampling methods matter before making conclusions about a population.",
  },
];

const outcomes = [
  "Explain what statistics is for",
  "Identify populations and samples",
  "Classify variable types correctly",
  "Choose basic tables and graphs",
  "Recognise sampling bias",
];

export default function IntroductionToStatisticalThinkingModulePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-4 py-8 text-[#111111] sm:px-5 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/statistics-foundation")}
          className="text-sm font-semibold text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to Statistics Foundation
        </a>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm md:mt-8 md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-6 md:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm md:tracking-[0.22em]">
                Module 1 · Statistics Foundation
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-6xl">
                Introduction to statistical thinking.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700 md:mt-6 md:text-lg md:leading-9">
                Start with the basic language of statistics: data, variables,
                populations, samples, graphs and sampling. This module builds
                the thinking needed before formulas and inference.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(
                    "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/what-is-statistics"
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8b1116] sm:w-auto md:py-4"
                >
                  Start Lesson 1.1 →
                </a>

                <a
                  href={withBasePath(
                    "/courses/statistics-foundation/modules/descriptive-statistics"
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
                >
                  Next module →
                </a>
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-[#fdfbf7] p-5 md:p-8 lg:border-l lg:border-t-0">
              <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2rem] md:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b1116] md:text-sm">
                  Module aim
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                  Build the language of statistics before formulas.
                </h2>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  You will learn what data represent, how variables are
                  classified, and why sampling shapes every conclusion.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {moduleStats.map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4"
                    >
                      <p className="text-2xl font-semibold tracking-[-0.05em]">
                        {value}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
              What this module builds
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              The foundation for every later topic.
            </h2>

            <div className="mt-6 grid gap-3">
              {moduleFocus.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] p-4"
                >
                  <h3 className="text-sm font-semibold text-neutral-950">
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55 md:text-sm">
              By the end
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              You should be able to describe data clearly.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {outcomes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white/85"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Module lessons
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
                Study the lessons in order.
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              Each lesson adds one part of the foundation: purpose, data
              structure, variable types, displays and sampling.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:mt-8">
            {lessons.map((lesson) => (
              <a
                key={lesson.number}
                href={withBasePath(lesson.href)}
                className="group rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:rounded-[2rem] md:p-6"
              >
                <div className="grid gap-4 md:grid-cols-[0.18fr_1fr_auto] md:items-center">
                  <p className="text-3xl font-semibold tracking-[-0.055em] text-[#8b1116]">
                    {lesson.number}
                  </p>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                      Lesson {lesson.number}
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.04em]">
                      {lesson.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-neutral-700">
                      {lesson.description}
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-[#8b1116]">
                    Open →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
