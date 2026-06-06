import type { Metadata } from "next";

const modules = [
  {
    number: "Module 1",
    title: "Introduction to Statistical Thinking",
    description:
      "Learn what statistics is, how data becomes evidence, and how populations, samples, variables, tables and sampling methods fit together.",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking",
  },
  {
    number: "Module 2",
    title: "Descriptive Statistics",
    description:
      "Summarise data using measures of centre, spread, quartiles, percentiles, skewness, outliers and group comparisons.",
    href: "/courses/statistics-foundation/modules/descriptive-statistics",
  },
  {
    number: "Module 3",
    title: "Probability Foundations",
    description:
      "Build probability intuition through sample spaces, probability rules, conditional probability, independence, Bayes theorem and diagnostic reasoning.",
    href: "/courses/statistics-foundation/modules/probability-foundations",
  },
  {
    number: "Module 4",
    title: "Statistical Inference Foundations",
    description:
      "Understand sampling distributions, standard error, confidence intervals, hypothesis testing, p-values, power and study design.",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations",
  },
  {
    number: "Module 5",
    title: "Regression Foundations",
    description:
      "Move from correlation to simple regression, least squares, multiple regression, confounding and logistic regression foundations.",
    href: "/courses/statistics-foundation/modules/regression-foundations",
  },
];

export const metadata: Metadata = {
  title: "Statistics Foundation Modules | My Academic Tutor",
  description:
    "Explore all open modules in the Statistics Foundation course, covering statistical thinking, descriptive statistics, probability, inference and regression.",
};

export default function StatisticsFoundationModulesPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href="/courses/statistics-foundation"
          className="inline-flex rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-bold text-neutral-800 transition hover:border-[#6f0d12] hover:text-[#6f0d12]"
        >
          ← Back to Statistics Foundation
        </a>

        <div className="mt-8 rounded-[2.5rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#6f0d12]">
            Full course open now
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-neutral-950 md:text-6xl">
            Statistics Foundation Modules
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-700">
            All modules and lessons are now available for full study. Study the
            modules in order if you are building a complete foundation, or jump
            directly to the topic you want to revise.
          </p>
        </div>

        <div className="mt-8 grid gap-5">
          {modules.map((module) => (
            <a
              key={module.title}
              href={module.href}
              className="group rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#6f0d12] md:p-8"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6f0d12]">
                    {module.number}
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-neutral-950 md:text-3xl">
                    {module.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-neutral-700">
                    {module.description}
                  </p>
                </div>

                <span className="inline-flex w-fit rounded-full bg-neutral-950 px-5 py-3 text-sm font-black text-white transition group-hover:bg-[#6f0d12]">
                  Open module →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
