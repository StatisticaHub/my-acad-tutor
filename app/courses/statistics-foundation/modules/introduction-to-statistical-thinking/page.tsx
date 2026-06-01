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

export default function IntroductionToStatisticalThinkingModulePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-950">
      <section className="mx-auto max-w-6xl">
        <a
          href="/courses/statistics-foundation"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to Statistics Foundation
        </a>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Module 1
        </p>

        <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
          Introduction to Statistical Thinking
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          This module introduces the purpose of statistics, the structure of
          statistical data, the difference between populations and samples,
          types of variables, graphical summaries and sampling methods.
        </p>

        <div className="mt-12 grid gap-5">
          {lessons.map((lesson) => (
            <a
              key={lesson.number}
              href={lesson.href}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm font-semibold text-blue-600">
                Lesson {lesson.number}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">
                {lesson.title}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                {lesson.description}
              </p>
              <p className="mt-5 text-sm font-semibold text-slate-950">
                Open lesson →
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}