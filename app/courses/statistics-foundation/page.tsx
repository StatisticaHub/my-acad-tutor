const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  return `${basePath}${href}/`;
}

const modules = [
  {
    number: "01",
    title: "Introduction to Statistical Thinking",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking",
    description:
      "Build the language of data, variables, populations, samples, graphs and sampling methods.",
    lessons: [
      "What statistics means",
      "Populations and samples",
      "Data types and graphs",
    ],
    status: "Available",
    tone: "blue",
  },
  {
    number: "02",
    title: "Descriptive Statistics",
    href: "/courses/statistics-foundation/modules/descriptive-statistics",
    description:
      "Learn how to summarise datasets using centre, spread, quartiles, skewness, outliers and comparisons.",
    lessons: [
      "Mean, median and mode",
      "Variance and standard deviation",
      "Boxplots and outliers",
    ],
    status: "Available",
    tone: "green",
  },
  {
    number: "03",
    title: "Probability Foundations",
    href: "/courses/statistics-foundation/modules/probability-foundations",
    description:
      "Develop probability reasoning before moving into random variables, inference and uncertainty.",
    lessons: [
      "Events and sample spaces",
      "Probability rules",
      "Conditional probability",
    ],
    status: "Available",
    tone: "amber",
  },
  {
    number: "04",
    title: "Random Variables and Distributions",
    href: "/courses/statistics-foundation/modules/random-variables-distributions",
    description:
      "Understand how uncertain outcomes become mathematical objects with expectation, variance and distributions.",
    lessons: [
      "Random variables",
      "Expected value and variance",
      "Common distributions",
    ],
    status: "Available",
    tone: "purple",
  },
  {
    number: "05",
    title: "Statistical Inference Foundations",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations",
    description:
      "Learn sampling distributions, standard errors, confidence intervals, hypothesis testing and power.",
    lessons: [
      "Sampling distributions",
      "Confidence intervals",
      "Hypothesis testing",
    ],
    status: "Available",
    tone: "red",
  },
];

const toneClasses: Record<string, string> = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-emerald-100 text-emerald-800",
  amber: "bg-amber-100 text-amber-800",
  purple: "bg-violet-100 text-violet-800",
  red: "bg-red-100 text-red-800",
};

export default function StatisticsFoundationCoursePage() {
  return (
    <main className="min-h-screen bg-[#f2efe7] text-neutral-950">
      <div className="mx-auto max-w-7xl px-5 py-7 md:px-8 md:py-10">
        <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <a href={withBasePath("/")} className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ded9cf] bg-white text-lg font-black shadow-sm">
              MAT
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">
                My Academic Tutor
              </p>
              <p className="text-xl font-extrabold tracking-tight">
                Statistics Foundation
              </p>
            </div>
          </a>

          <nav className="flex flex-wrap gap-2">
            <a
              href={withBasePath("/learning-hub")}
              className="rounded-full border border-[#ded9cf] bg-white/70 px-4 py-2 text-sm font-semibold text-neutral-600 transition hover:bg-white hover:text-neutral-950"
            >
              Learning Hub
            </a>
            <a
              href={withBasePath("/pathways/statistics")}
              className="rounded-full border border-[#ded9cf] bg-white/70 px-4 py-2 text-sm font-semibold text-neutral-600 transition hover:bg-white hover:text-neutral-950"
            >
              Statistics Pathway
            </a>
            <a
              href={withBasePath("/courses")}
              className="rounded-full border border-[#ded9cf] bg-white/70 px-4 py-2 text-sm font-semibold text-neutral-600 transition hover:bg-white hover:text-neutral-950"
            >
              All Courses
            </a>
          </nav>
        </header>

        <section className="overflow-hidden rounded-[2.1rem] border border-[#ded9cf] bg-gradient-to-br from-white via-[#fbfaf6] to-blue-50 p-7 shadow-[0_22px_70px_rgba(31,29,23,0.10)] md:p-11">
          <div className="grid gap-9 lg:grid-cols-[1.45fr_0.75fr] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-extrabold text-blue-800">
                  Beginner-friendly
                </span>
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-extrabold text-emerald-800">
                  Theoretical
                </span>
                <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-extrabold text-blue-800">
                  Zero coding
                </span>
              </div>

              <h1 className="max-w-5xl text-4xl font-black tracking-[-0.06em] md:text-6xl lg:text-7xl">
                Statistics Foundation for University Students
              </h1>

              <p className="mt-6 text-base font-bold text-neutral-950">
                Course developed by My Academic Tutor.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-600">
                A theoretical and beginner-friendly course for students who want
                to build a strong base in statistics before studying
                biostatistics, epidemiology, data science, machine learning,
                research methods or quantitative analysis.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-600">
                The course avoids coding and focuses on concepts, notation,
                mathematical reasoning, derivations, interpretation, interactive
                visual learning and exam-style thinking.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={withBasePath(
                    "/courses/statistics-foundation/modules/introduction-to-statistical-thinking"
                  )}
                  className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Start learning
                </a>

                <a
                  href="#course-modules"
                  className="rounded-full border border-[#ded9cf] bg-white px-6 py-3 text-sm font-extrabold text-neutral-950 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  View all modules
                </a>
              </div>
            </div>

            <aside className="rounded-[1.6rem] border border-[#ded9cf] bg-white/80 p-5 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">
                Course snapshot
              </h2>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#ded9cf] bg-[#f8f6f1] p-4">
                  <strong className="block text-3xl font-black tracking-tight">
                    5
                  </strong>
                  <span className="text-xs font-medium text-neutral-500">
                    Core modules
                  </span>
                </div>

                <div className="rounded-2xl border border-[#ded9cf] bg-[#f8f6f1] p-4">
                  <strong className="block text-3xl font-black tracking-tight">
                    25
                  </strong>
                  <span className="text-xs font-medium text-neutral-500">
                    Structured lessons
                  </span>
                </div>

                <div className="rounded-2xl border border-[#ded9cf] bg-[#f8f6f1] p-4">
                  <strong className="block text-3xl font-black tracking-tight">
                    0
                  </strong>
                  <span className="text-xs font-medium text-neutral-500">
                    Coding required
                  </span>
                </div>

                <div className="rounded-2xl border border-[#ded9cf] bg-[#f8f6f1] p-4">
                  <strong className="block text-3xl font-black tracking-tight">
                    100%
                  </strong>
                  <span className="text-xs font-medium text-neutral-500">
                    Concept focused
                  </span>
                </div>
              </div>

              <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-600">
                <li>Lecture-style explanations with recurring characters.</li>
                <li>Detailed notes with notation and derivations.</li>
                <li>Interactive labs, worked examples and quizzes.</li>
              </ul>
            </aside>
          </div>
        </section>

        <section id="course-modules" className="mt-12">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                Course structure
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                Five modules from foundations to inference
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-neutral-600">
              Start with the language of data, then move through descriptive
              statistics, probability, random variables and statistical
              inference.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-5">
            {modules.map((module) => (
              <a
                key={module.number}
                href={withBasePath(module.href)}
                className="group flex min-h-[270px] flex-col rounded-[1.35rem] border border-[#ded9cf] bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-base font-black ${
                    toneClasses[module.tone]
                  }`}
                >
                  {module.number}
                </div>

                <h3 className="text-lg font-black leading-tight tracking-tight">
                  {module.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {module.description}
                </p>

                <ul className="mt-4 list-disc space-y-1 pl-5 text-xs leading-5 text-neutral-600">
                  {module.lessons.map((lesson) => (
                    <li key={lesson}>{lesson}</li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs">
                  <span className="text-neutral-400">5 lessons</span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 font-extrabold text-emerald-800">
                    {module.status}
                  </span>
                </div>

                <p className="mt-4 text-sm font-extrabold text-blue-700 opacity-0 transition group-hover:opacity-100">
                  Open module →
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                Learning approach
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                Built for understanding, not memorisation
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-neutral-600">
              Every lesson follows the same premium structure so students know
              exactly how to learn, practise and test themselves.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.35rem] border border-[#ded9cf] bg-white p-6 shadow-sm">
              <span className="rounded-full bg-blue-100 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-blue-800">
                Step 1
              </span>
              <h3 className="mt-5 text-xl font-black tracking-tight">
                Understand the idea
              </h3>
              <p className="mt-3 text-sm leading-7 text-neutral-600">
                Each lesson begins with a conversational lecture using Mr. R,
                Emma, Oliver, James and Sophia.
              </p>
            </div>

            <div className="rounded-[1.35rem] border border-[#ded9cf] bg-white p-6 shadow-sm">
              <span className="rounded-full bg-blue-100 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-blue-800">
                Step 2
              </span>
              <h3 className="mt-5 text-xl font-black tracking-tight">
                Study the theory
              </h3>
              <p className="mt-3 text-sm leading-7 text-neutral-600">
                Detailed notes explain notation, definitions, assumptions,
                derivations and interpretation mistakes.
              </p>
            </div>

            <div className="rounded-[1.35rem] border border-[#ded9cf] bg-white p-6 shadow-sm">
              <span className="rounded-full bg-blue-100 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-blue-800">
                Step 3
              </span>
              <h3 className="mt-5 text-xl font-black tracking-tight">
                Practise and check
              </h3>
              <p className="mt-3 text-sm leading-7 text-neutral-600">
                Interactive labs, worked examples and quizzes help students test
                understanding before moving ahead.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.35rem] border border-[#ded9cf] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black tracking-tight">Designed for</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-600">
              <li>University students beginning statistics for the first time.</li>
              <li>
                Students preparing for biostatistics, epidemiology, data science
                or research methods.
              </li>
              <li>
                Learners who want mathematical notation explained clearly before
                moving to software.
              </li>
              <li>
                Students who prefer conceptual, theoretical and exam-style
                learning without coding.
              </li>
            </ul>
          </div>

          <div className="rounded-[1.35rem] border border-[#ded9cf] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black tracking-tight">
              What makes it different
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-600">
              <li>No programming distractions in the foundation stage.</li>
              <li>Clear movement from definitions to interpretation.</li>
              <li>Mathematical reasoning explained gradually.</li>
              <li>Consistent structure across every lesson.</li>
              <li>Useful preparation for applied quantitative subjects.</li>
            </ul>
          </div>
        </section>

        <section className="mt-8 flex flex-col gap-5 rounded-[1.7rem] bg-neutral-950 p-7 text-white shadow-xl md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight">
              Ready to start?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
              Begin with Module 1 and build the statistical language needed for
              later biostatistics, epidemiology, data science and research
              methods.
            </p>
          </div>

          <a
            href={withBasePath(
              "/courses/statistics-foundation/modules/introduction-to-statistical-thinking"
            )}
            className="rounded-full bg-white px-6 py-3 text-sm font-black text-neutral-950 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Start Module 1
          </a>
        </section>

        <footer className="mt-10 border-t border-[#ded9cf] pt-6 text-sm leading-7 text-neutral-600">
          <p>
            <strong className="text-neutral-950">
              Statistics Foundation for University Students
            </strong>
          </p>
          <p>
            Course developed by{" "}
            <strong className="text-neutral-950">My Academic Tutor</strong>.
          </p>
          <p>© 2026 My Academic Tutor. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}