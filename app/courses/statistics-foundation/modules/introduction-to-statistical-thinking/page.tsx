const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${cleanHref}${hasFileExtension ? "" : "/"}`;
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
  ["Zero", "Coding"],
  ["Foundation", "Level"],
  ["Data language", "Focus"],
];

const moduleFocus = [
  {
    title: "Statistical language",
    body: "Students learn the basic vocabulary of statistics: data, variables, populations, samples, parameters and statistics.",
  },
  {
    title: "Data structure",
    body: "The module explains how different variable types shape the way data should be described, displayed and interpreted.",
  },
  {
    title: "Sampling thinking",
    body: "Students learn why sampling methods matter before making conclusions about a wider population.",
  },
];

export default function IntroductionToStatisticalThinkingModulePage() {
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
            Module 1
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] sm:text-5xl md:text-6xl">
                Introduction to Statistical Thinking
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                This module introduces the purpose of statistics, the structure
                of statistical data, the difference between populations and
                samples, types of variables, graphical summaries and sampling
                methods.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Module aim
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#111111]">
                Build the language of statistics before formulas.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Students begin by learning what data represent, how variables
                are classified, why samples differ from populations and how
                early statistical thinking supports every later module.
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
                "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/what-is-statistics"
              )}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Start Lesson 1.1
            </a>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/descriptive-statistics"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Next module →
            </a>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Back to course
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
              Study the lessons in order.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Each lesson builds one part of the foundation: what statistics
              means, how populations and samples are connected, how data are
              classified, how tables and graphs communicate information and how
              sampling methods shape conclusions.
            </p>
          </div>

          <div className="mt-8 grid gap-5">
            {lessons.map((lesson) => (
              <a
                key={lesson.number}
                href={withBasePath(lesson.href)}
                className="group rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:p-7"
              >
                <div className="grid gap-5 md:grid-cols-[0.18fr_1fr_auto] md:items-center">
                  <div>
                    <p className="text-3xl font-black tracking-[-0.05em] text-[#8b1116]">
                      {lesson.number}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-700">
                      Lesson {lesson.number}
                    </p>

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

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Learning route
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Complete this module before descriptive statistics.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              Module 2 assumes that students already understand populations,
              samples, variables, data types, tables, graphs and basic sampling
              methods.
            </p>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/descriptive-statistics"
              )}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Continue to Module 2 →
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