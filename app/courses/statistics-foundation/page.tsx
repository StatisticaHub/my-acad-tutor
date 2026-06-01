import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/sections/SectionHeading";

const modules = [
  {
    number: "01",
    title: "Probability Foundations",
    lessons:
      "Events, probability rules, conditional probability, independence and Bayes theorem.",
  },
  {
    number: "02",
    title: "Random Variables and Distributions",
    lessons:
      "Discrete and continuous random variables, expectation, variance and common distributions.",
  },
  {
    number: "03",
    title: "Sampling and Estimation",
    lessons:
      "Samples, estimators, sampling distributions, standard errors and confidence intervals.",
  },
  {
    number: "04",
    title: "Hypothesis Testing",
    lessons:
      "Null hypotheses, test statistics, p-values, significance, power and interpretation.",
  },
  {
    number: "05",
    title: "Regression Foundations",
    lessons:
      "Simple linear regression, multiple regression, assumptions, diagnostics and interpretation.",
  },
];

const features = [
  "Clear theory-first explanations",
  "Mathematical notation and derivations",
  "Worked examples",
  "Practice exercises",
  "Interpretation-focused lessons",
  "Interactive demos during launch sprint",
];

export default function StatisticsFoundationCoursePage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="bg-slate-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-3">
            <Badge variant="blue">Statistics</Badge>
            <Badge variant="green">Free launch course</Badge>
          </div>

          <h1 className="mt-6 max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
            Statistics Foundation for University Students.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            A structured foundation course for students who want to understand
            probability, random variables, estimation, hypothesis testing and regression
            from first principles.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/courses/statistics-foundation/lessons/random-variable"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Open sample lesson
            </a>

            <a
              href="/pathways/statistics"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              View statistics pathway
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Level</p>
            <p className="mt-2 text-lg font-bold text-slate-950">
              Beginner to Intermediate
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Launch</p>
            <p className="mt-2 text-lg font-bold text-slate-950">July 2026</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Access</p>
            <p className="mt-2 text-lg font-bold text-slate-950">Free preview</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Best for</p>
            <p className="mt-2 text-lg font-bold text-slate-950">
              University students
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Course structure"
            title="A complete foundation before advanced statistics."
            description="The course is organised so each module builds naturally from probability to statistical inference and regression."
          />

          <div className="mt-12 grid gap-6">
            {modules.map((module) => (
              <div
                key={module.number}
                className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[80px_1fr]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {module.number}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-950">
                    {module.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {module.lessons}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="What makes it different"
              title="Theory, equations and interpretation together."
              description="The course is not designed as a collection of formula sheets. It explains why methods work, how notation connects to intuition and how results should be interpreted."
            />
          </div>

          <div className="grid gap-4">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-800"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-blue-600 p-8 text-white md:p-12">
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
            Start with the free sample lesson.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50">
            The first sample lesson introduces random variables using notation,
            examples and careful interpretation.
          </p>

          <div className="mt-8">
            <a
              href="/courses/statistics-foundation/lessons/random-variable"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              Open sample lesson
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}