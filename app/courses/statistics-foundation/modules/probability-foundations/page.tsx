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
    title: "Probability Basics and Axioms",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/probability-basics-and-axioms",
    description:
      "Sample spaces, events, complements, unions, intersections, probability axioms and the addition rule.",
    status: "Ready",
  },
  {
    number: "3.2",
    title: "Conditional Probability and Bayes' Theorem",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/conditional-probability-and-bayes",
    description:
      "Conditional probability, independence, multiplication rule, Bayes' theorem and diagnostic testing.",
    status: "Ready",
  },
  {
    number: "3.3",
    title: "Random Variables and Expectation",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/random-variables-and-expectation",
    description:
      "Random variables, probability distributions, expectation, variance and indicator variables.",
    status: "Ready",
  },
  {
    number: "3.4",
    title: "Discrete Distributions",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/discrete-distributions",
    description:
      "Bernoulli, binomial, geometric and Poisson distributions with assumptions and interpretation.",
    status: "Ready",
  },
  {
    number: "3.5",
    title: "Normal Distribution and Central Limit Theorem",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/normal-distribution-and-clt",
    description:
      "Normal curves, z-scores, areas, standardisation, sampling distributions and the CLT.",
    status: "Ready",
  },
];

export default function ProbabilityFoundationsModulePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-950">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/statistics-foundation")}
          className="text-sm font-semibold text-blue-700 hover:text-blue-900"
        >
          ← Back to Statistics Foundation
        </a>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-8 p-8 md:p-10 lg:grid-cols-[1.35fr_0.75fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-700">
                Module 3
              </p>

              <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
                Probability Foundations
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                Probability is the mathematical language of uncertainty. This
                module moves from simple events to conditional probability,
                random variables, key distributions and the central limit
                theorem.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                The focus is theoretical and conceptual. Students learn not only
                formulas, but also the assumptions, interpretations and common
                mistakes behind each probability rule.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={withBasePath(
                    "/courses/statistics-foundation/modules/probability-foundations/lessons/probability-basics-and-axioms"
                  )}
                  className="rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                >
                  Start lesson 3.1
                </a>

                <a
                  href="#lessons"
                  className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-black text-slate-900 transition hover:bg-slate-100"
                >
                  View lessons
                </a>
              </div>
            </div>

            <aside className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-2xl font-black tracking-tight">
                What students will master
              </h2>

              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                <li>• Events, sample spaces and probability notation</li>
                <li>• Probability axioms and derived rules</li>
                <li>• Conditional probability and Bayes' theorem</li>
                <li>• Random variables, expectation and variance</li>
                <li>• Discrete and continuous distribution thinking</li>
                <li>• Central limit reasoning before inference</li>
              </ul>
            </aside>
          </div>
        </div>

        <section id="lessons" className="mt-12">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-700">
                Module lessons
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                Five lessons from uncertainty to distributions
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Work through the lessons in order. Each lesson contains a
              conversational lecture, detailed notes, interactive labs, worked
              examples, exercises and a quiz.
            </p>
          </div>

          <div className="grid gap-4">
            {lessons.map((lesson) => (
              <a
                key={lesson.number}
                href={withBasePath(lesson.href)}
                className="group grid gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:grid-cols-[auto_1fr_auto] md:items-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-xl font-black text-blue-800">
                  {lesson.number}
                </div>

                <div>
                  <h3 className="text-2xl font-black tracking-tight">
                    {lesson.title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                    {lesson.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-black text-emerald-800">
                    {lesson.status}
                  </span>
                  <span className="text-sm font-black text-blue-700">
                    Open →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-5 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
              Step 1
            </p>
            <h3 className="mt-3 text-2xl font-black">Reason with events</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Students first learn how to translate real situations into events,
              complements, unions and intersections.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
              Step 2
            </p>
            <h3 className="mt-3 text-2xl font-black">Build probability laws</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              The module develops probability rules from axioms rather than
              presenting formulas as isolated facts.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
              Step 3
            </p>
            <h3 className="mt-3 text-2xl font-black">Prepare for inference</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              By the end, students understand why sampling distributions and
              uncertainty statements appear in statistical inference.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}