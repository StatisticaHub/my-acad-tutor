import type { Metadata } from "next";
import NormalDistributionExplorer from "@/components/interactive/NormalDistributionExplorer";
import ConfidenceIntervalSimulator from "@/components/interactive/ConfidenceIntervalSimulator";

export const metadata: Metadata = {
  title: "Statistics Foundation",
  description:
    "A zero-coding statistics foundation course covering statistical thinking, descriptive statistics, probability, inference and regression.",
};

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
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

const modules = [
  {
    number: "01",
    title: "Statistical Thinking",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking",
    status: "Module open",
    summary:
      "Populations, samples, variables, data types, tables, graphs and the purpose of statistical reasoning.",
    lessons: "5 lessons",
    focus: ["Statistical questions", "Data types", "Sampling", "Tables and graphs"],
  },
  {
    number: "02",
    title: "Descriptive Statistics",
    href: "/courses/statistics-foundation/modules/descriptive-statistics",
    status: "Module open",
    summary:
      "Centre, spread, quartiles, percentiles, skewness, outliers and comparing groups descriptively.",
    lessons: "5 lessons",
    focus: ["Mean and median", "Spread", "Quartiles", "Group comparison"],
  },
  {
    number: "03",
    title: "Probability Foundations",
    href: "/courses/statistics-foundation/modules/probability-foundations",
    status: "Module open",
    summary:
      "Probability rules, sample spaces, conditional probability, independence, dependence and Bayes’ theorem.",
    lessons: "5 lessons",
    focus: ["Probability rules", "Conditional probability", "Independence", "Bayes"],
  },
  {
    number: "04",
    title: "Statistical Inference",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations",
    status: "Module open",
    summary:
      "Sampling distributions, standard error, confidence intervals, hypothesis testing, p-values, power and study design.",
    lessons: "6 lessons",
    focus: ["Standard error", "Confidence intervals", "Hypothesis tests", "Power"],
  },
  {
    number: "05",
    title: "Regression Foundations",
    href: "/courses/statistics-foundation/modules/regression-foundations",
    status: "Module open",
    summary:
      "Correlation, simple regression, least squares, residuals, multiple regression, confounding and logistic regression.",
    lessons: "5 lessons",
    focus: ["Correlation", "Linear regression", "Confounding", "Logistic regression"],
  },
];

const lessons = [
  {
    module: "Module 1",
    number: "1.1",
    title: "What is statistics?",
    status: "Open now",
    open: true,
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/what-is-statistics",
  },
  {
    module: "Module 1",
    number: "1.2",
    title: "Types of data",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 1",
    number: "1.3",
    title: "Populations, samples and variables",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 1",
    number: "1.4",
    title: "Tables and graphs",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 1",
    number: "1.5",
    title: "Sampling methods",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 2",
    number: "2.1",
    title: "Organising data",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 2",
    number: "2.2",
    title: "Measures of centre",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 2",
    number: "2.3",
    title: "Measures of spread",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 2",
    number: "2.4",
    title: "Quartiles and percentiles",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 2",
    number: "2.5",
    title: "Comparing groups descriptively",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 3",
    number: "3.1",
    title: "What is probability?",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 3",
    number: "3.2",
    title: "Events, sample spaces and probability rules",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 3",
    number: "3.3",
    title: "Conditional probability",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 3",
    number: "3.4",
    title: "Independence and dependence",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 3",
    number: "3.5",
    title: "Bayes’ theorem and diagnostic reasoning",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 4",
    number: "4.1",
    title: "Sampling distributions and standard error",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 4",
    number: "4.2",
    title: "Confidence intervals",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 4",
    number: "4.3",
    title: "Hypothesis testing framework",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 4",
    number: "4.4",
    title: "P-values, errors and power",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 4",
    number: "4.5",
    title: "Sample size and study design",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 4",
    number: "4.6",
    title: "Choosing the right inference method",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 5",
    number: "5.1",
    title: "Correlation and simple relationships",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 5",
    number: "5.2",
    title: "Simple linear regression",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 5",
    number: "5.3",
    title: "Least squares and residuals",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 5",
    number: "5.4",
    title: "Multiple regression and confounding",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 5",
    number: "5.5",
    title: "Logistic regression foundations",
    status: "Locked until July 2026",
    open: false,
  },
];

const snapshot = [
  ["5", "Modules open"],
  ["1", "Lesson open now"],
  ["25", "Lessons waitlisted"],
  ["July 2026", "Full release"],
];

const learningDesign = [
  "Conversational lectures with Mr. R, Amelia, Ben, Chloe and Daniel",
  "Detailed theoretical notes with equations and derivations",
  "Interactive labs for visual intuition",
  "Worked examples with careful interpretation",
  "Practice studios and quizzes",
  "No R, Python or coding required",
];

const outcomes = [
  "Explain what statistics is used for",
  "Summarise and compare data correctly",
  "Understand probability and uncertainty",
  "Interpret confidence intervals and p-values",
  "Understand regression and model interpretation",
  "Prepare for biostatistics, health data science and applied research methods",
];

export default function StatisticsFoundationCoursePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-4 py-8 text-[#111111] sm:px-5 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses")}
          className="text-sm font-black text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to courses
        </a>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm md:mt-8 md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-6 md:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm md:tracking-[0.22em]">
                Statistics Foundation
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-7xl">
                Learn statistics from ideas to inference and regression.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700 md:mt-6 md:text-lg md:leading-9">
                A zero-coding foundation course for students who want clear
                statistical reasoning before software. Module pages are open for
                preview. Lesson 1.1 is open now. All remaining lessons are
                waitlist-only until July 2026.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(
                    "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/what-is-statistics",
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#8b1116] sm:w-auto md:py-4"
                >
                  Open Lesson 1.1 →
                </a>

                <a
                  href={withBasePath("#join-waitlist")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-black text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
                >
                  Join waitlist
                </a>

                <a
                  href={withBasePath("#module-preview")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-black text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
                >
                  Preview modules
                </a>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-[#8b1116]/20 bg-[#fff7f7] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                  Current access policy
                </p>
                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  Module overview pages remain open so students can see the
                  full structure. Only Lesson 1.1 is open for full study. Locked
                  lessons currently point students to the waitlist until the
                  full course release in July 2026.
                </p>
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-neutral-950 p-5 text-white md:p-8 lg:border-l lg:border-t-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 md:text-sm">
                Course snapshot
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                A structured route through statistical thinking.
              </h2>

              <div className="mt-7 grid grid-cols-2 gap-3">
                {snapshot.map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[1.35rem] border border-white/10 bg-white/[0.07] p-4"
                  >
                    <p className="text-3xl font-black tracking-[-0.06em]">
                      {value}
                    </p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-white/50">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm leading-7 text-white/70">
                Best for beginners, undergraduate students, MSc students
                revising foundations, and learners preparing for applied
                biostatistics, epidemiology or health data science.
              </p>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
              Learning design
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Built for understanding, not memorisation.
            </h2>

            <div className="mt-6 grid gap-3">
              {learningDesign.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold text-neutral-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-neutral-200 bg-[#111111] p-5 text-white shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/55 md:text-sm">
              By the end
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Students should be able to reason statistically.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {outcomes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold text-white/85"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section
          id="module-preview"
          className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10"
        >
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Module pages
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.045em] md:text-5xl">
                All module pages are open for preview.
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              Students can explore the full course structure now. Each module
              page shows the learning pathway, formulas, lesson sequence and
              what will be covered when the lessons open fully.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:mt-8 lg:grid-cols-2">
            {modules.map((module) => (
              <a
                key={module.title}
                href={withBasePath(module.href)}
                className="group rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:rounded-[2rem] md:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-[#111111] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                    {module.number}
                  </span>

                  <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#8b1116]">
                    {module.status}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-black tracking-[-0.045em]">
                  {module.title}
                </h3>

                <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-[#8b1116]">
                  {module.lessons}
                </p>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {module.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {module.focus.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-bold text-neutral-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-sm font-black text-[#8b1116] transition group-hover:translate-x-1">
                  Open module →
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Lesson access
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Lesson 1.1 is open. All other lessons are locked until July 2026.
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              Locked lessons currently send students to the waitlist. This lets
              visitors see the full curriculum while keeping the full lesson
              release controlled.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson) => {
              const href = lesson.open ? lesson.href : "#join-waitlist";

              return (
                <a
                  key={`${lesson.module}-${lesson.number}`}
                  href={withBasePath(href ?? "/courses/statistics-foundation/waitlist")}
                  className={`group rounded-[1.5rem] border p-5 transition hover:-translate-y-1 hover:shadow-md ${
                    lesson.open
                      ? "border-neutral-200 bg-[#f7f4ee] hover:bg-white"
                      : "border-[#8b1116]/20 bg-[#fff7f7] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${
                        lesson.open
                          ? "bg-neutral-950 text-white"
                          : "bg-[#8b1116] text-white"
                      }`}
                    >
                      {lesson.number}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${
                        lesson.open
                          ? "border-neutral-200 bg-white text-neutral-600"
                          : "border-[#8b1116]/20 bg-white text-[#8b1116]"
                      }`}
                    >
                      {lesson.open ? "Open" : "Locked"}
                    </span>
                  </div>

                  <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-neutral-500">
                    {lesson.module}
                  </p>

                  <h3 className="mt-2 text-xl font-black tracking-[-0.04em]">
                    {lesson.title}
                  </h3>

                  <p className="mt-3 text-sm font-bold leading-7 text-neutral-700">
                    {lesson.status}
                  </p>

                  <p className="mt-4 text-sm font-black text-[#8b1116] transition group-hover:translate-x-1">
                    {lesson.open ? "Open lesson →" : "Join waitlist →"}
                  </p>
                </a>
              );
            })}
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
            Try the ideas visually
          </p>

          <h2 className="mt-3 max-w-4xl text-3xl font-black tracking-[-0.045em] md:text-5xl">
            Visual intuition before formulas.
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
            These demos remain open as previews. They help students see
            distribution shape and confidence interval behaviour before moving
            into formal notation.
          </p>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <NormalDistributionExplorer />
            <ConfidenceIntervalSimulator />
          </div>
        </section>

        <section
          id="join-waitlist"
          className="mt-6 overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-neutral-950 shadow-sm md:mt-8 md:rounded-[2.5rem]"
        >
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="p-5 text-white md:p-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 md:text-sm">
                Join the waitlist
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Get access updates when the full course opens in July 2026.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75 md:text-base md:leading-8">
                Use this waitlist block for locked lessons. On GitHub Pages,
                form submission needs your existing contact page, Formspree,
                Formsubmit, Google Forms or another external form endpoint.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  "Module pages stay open.",
                  "Lesson 1.1 stays open.",
                  "All other lessons are locked until July 2026.",
                  "Waitlist visitors can request early access or release updates.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-bold text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 bg-white p-5 md:p-8 lg:border-l lg:border-t-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Waitlist form
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                Request access.
              </h3>

              <form
                action={withBasePath("/contact")}
                method="get"
                className="mt-6 grid gap-4"
              >
                <label className="grid gap-2">
                  <span className="text-sm font-black text-neutral-700">
                    Name
                  </span>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold text-neutral-950 outline-none transition focus:border-[#8b1116] focus:bg-white"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-black text-neutral-700">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold text-neutral-950 outline-none transition focus:border-[#8b1116] focus:bg-white"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-black text-neutral-700">
                    Interest
                  </span>
                  <select
                    name="interest"
                    defaultValue="Statistics Foundation waitlist"
                    className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold text-neutral-950 outline-none transition focus:border-[#8b1116] focus:bg-white"
                  >
                    <option>Statistics Foundation waitlist</option>
                    <option>Early access</option>
                    <option>Private tutoring support</option>
                    <option>Full course release updates</option>
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-black text-neutral-700">
                    Message
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    defaultValue="I want to join the Statistics Foundation course waitlist."
                    className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold text-neutral-950 outline-none transition focus:border-[#8b1116] focus:bg-white"
                  />
                </label>

                <button
                  type="submit"
                  className="rounded-full bg-[#8b1116] px-6 py-4 text-sm font-black text-white transition hover:bg-[#5f0b0f]"
                >
                  Join waitlist →
                </button>

                <p className="text-xs leading-6 text-neutral-500">
                  This currently routes to the contact page. Later, connect this
                  form to Resend, Formspree, Google Forms or your preferred
                  mailing list system.
                </p>
              </form>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-[#8b1116]/20 bg-[#fff7f7] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Recommended start
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.045em] text-[#8b1116] md:text-5xl">
                Begin with the open foundation lesson.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
                Lesson 1.1 introduces the purpose of statistics, statistical
                questions, populations, samples, variables and why uncertainty
                matters.
              </p>
            </div>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/what-is-statistics",
              )}
              className="inline-flex w-full justify-center rounded-full bg-[#8b1116] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#5f0b0f] sm:w-auto md:py-4"
            >
              Open Lesson 1.1 →
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}