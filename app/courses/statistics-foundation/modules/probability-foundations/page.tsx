const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  return `${basePath}${href}/`;
}

const lessons = [
  {
    number: "3.1",
    title: "Randomness, outcomes and sample spaces",
    description:
      "Understand probability as a mathematical language for uncertainty, beginning with random experiments, outcomes, events and sample spaces.",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/randomness-sample-spaces",
  },
  {
    number: "3.2",
    title: "Probability rules",
    description:
      "Learn the addition rule, complement rule, mutually exclusive events and how probability laws prevent common reasoning mistakes.",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/probability-rules",
  },
  {
    number: "3.3",
    title: "Conditional probability",
    description:
      "Study how probabilities change when new information is known, using notation, tables, trees and real-world examples.",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/conditional-probability",
  },
  {
    number: "3.4",
    title: "Independence",
    description:
      "Understand the difference between independent events, dependent events and mutually exclusive events using equations and interpretation.",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/independence",
  },
  {
    number: "3.5",
    title: "Bayes’ theorem",
    description:
      "Use Bayes’ theorem to reverse conditional probabilities and interpret evidence, diagnostic tests and updated beliefs.",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/bayes-theorem",
  },
];

const moduleStats = [
  { label: "Lessons", value: "5" },
  { label: "Interactive labs", value: "5" },
  { label: "Coding required", value: "0" },
  { label: "Focus", value: "Uncertainty" },
];

const learningFlow = [
  {
    title: "Define uncertainty",
    body: "Start with random experiments, outcomes, events and sample spaces.",
  },
  {
    title: "Use probability laws",
    body: "Apply addition, complement and general probability rules correctly.",
  },
  {
    title: "Update with information",
    body: "Learn how probabilities change when conditions are introduced.",
  },
  {
    title: "Separate dependence",
    body: "Distinguish independence from mutually exclusive events.",
  },
  {
    title: "Reverse conditions",
    body: "Use Bayes’ theorem to move from evidence to updated probability.",
  },
];

export default function ProbabilityFoundationsModulePage() {
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
                "/courses/statistics-foundation/modules/descriptive-statistics"
              )}
              className="rounded-full border border-[#ded9cf] bg-white/80 px-4 py-2 text-sm font-bold text-neutral-700 hover:bg-white"
            >
              ← Module 2
            </a>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/random-variables-distributions"
              )}
              className="rounded-full border border-[#ded9cf] bg-white/80 px-4 py-2 text-sm font-bold text-neutral-700 hover:bg-white"
            >
              Module 4 →
            </a>
          </nav>
        </header>

        <section className="overflow-hidden rounded-[2.2rem] border border-[#ded9cf] bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.75fr] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-800">
                  Module 3
                </span>
                <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-amber-800">
                  Probability Foundations
                </span>
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-emerald-800">
                  Zero coding
                </span>
              </div>

              <h1 className="max-w-5xl text-4xl font-black tracking-[-0.055em] md:text-6xl">
                Probability Foundations
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-600">
                This module introduces the mathematical language of uncertainty.
                Students learn how to describe random experiments, define
                events, construct sample spaces, apply probability rules and
                reason with conditional information.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-600">
                The goal is not just to calculate probabilities. The goal is to
                understand how uncertainty behaves, how information changes
                probability, and why probability theory is the foundation for
                random variables, distributions and statistical inference.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={withBasePath(
                    "/courses/statistics-foundation/modules/probability-foundations/lessons/randomness-sample-spaces"
                  )}
                  className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-black text-white transition hover:bg-neutral-800"
                >
                  Start Lesson 3.1
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
                  <li>Writing sample spaces and events clearly.</li>
                  <li>Using probability rules without double counting.</li>
                  <li>Interpreting conditional probability notation.</li>
                  <li>Testing whether events are independent.</li>
                  <li>Applying Bayes’ theorem to update probabilities.</li>
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
                Five lessons from randomness to Bayes’ theorem
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
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-lg font-black text-amber-800">
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
              How probability thinking becomes more advanced
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
              <li>How to define outcomes, events and sample spaces.</li>
              <li>Why probabilities must follow mathematical rules.</li>
              <li>How conditional probability changes the denominator.</li>
              <li>
                Why independence is not the same as mutual exclusivity.
              </li>
              <li>
                How Bayes’ theorem updates probability when evidence is
                observed.
              </li>
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-[#ded9cf] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black tracking-tight">
              Preparation for Module 4
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-600">
              Probability foundations prepare students for random variables and
              distributions. Once we can describe random events, we can attach
              numerical values to outcomes and study their expected value,
              variance and distributional behaviour.
            </p>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/random-variables-distributions"
              )}
              className="mt-6 inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm font-black text-white"
            >
              Continue to Module 4 →
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}