import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/sections/SectionHeading";
import LessonUnitCard from "@/components/course/LessonUnitCard";

const modules = [
  {
    number: "01",
    title: "Probability Foundations",
    description:
      "Students begin with the language of uncertainty: events, sample spaces, probability rules, conditional probability, independence and Bayes theorem.",
    lessons: [
      {
        title: "What is probability?",
        description:
          "A conceptual introduction to uncertainty, events, sample spaces and probability as a way of measuring uncertainty.",
        href: "/courses/statistics-foundation/modules/probability-foundations/lessons/what-is-probability",
      },
      {
        title: "Conditional probability and independence",
        description:
          "Learn how probability changes when information is given, and why independence is a strong mathematical condition.",
        href: "/courses/statistics-foundation/modules/probability-foundations/lessons/conditional-probability-independence",
      },
      {
        title: "Bayes theorem",
        description:
          "Understand Bayes theorem as a way of updating beliefs using evidence, with medical and academic examples.",
        href: "/courses/statistics-foundation/modules/probability-foundations/lessons/bayes-theorem",
      },
    ],
  },
  {
    number: "02",
    title: "Random Variables and Distributions",
    description:
      "This module explains how uncertain outcomes become mathematical objects, and how distributions describe their behaviour.",
    lessons: [
      {
        title: "What is a random variable?",
        description:
          "Understand random variables, notation, discrete and continuous cases, expectation and variance.",
        href: "/courses/statistics-foundation/modules/random-variables-distributions/lessons/random-variable",
      },
      {
        title: "Expected value and variance",
        description:
          "Learn how expectation measures the centre of a random variable and variance measures spread around that centre.",
        href: "/courses/statistics-foundation/modules/random-variables-distributions/lessons/expectation-variance",
      },
      {
        title: "Common probability distributions",
        description:
          "Explore Bernoulli, Binomial, Poisson, Normal and other common distributions used in statistics.",
        href: "/courses/statistics-foundation/modules/random-variables-distributions/lessons/common-distributions",
      },
    ],
  },
  {
    number: "03",
    title: "Sampling and Estimation",
    description:
      "Students learn how samples connect to populations, why estimators vary, and how uncertainty is measured.",
    lessons: [
      {
        title: "Samples, populations and estimators",
        description:
          "Understand the difference between a population quantity and a sample-based estimate.",
        href: "/courses/statistics-foundation/modules/sampling-estimation/lessons/samples-populations-estimators",
      },
      {
        title: "Sampling distributions",
        description:
          "Learn why an estimator has its own distribution and why this idea is central to inference.",
        href: "/courses/statistics-foundation/modules/sampling-estimation/lessons/sampling-distributions",
      },
      {
        title: "Confidence intervals",
        description:
          "Understand confidence intervals as a way of expressing uncertainty around an estimate.",
        href: "/courses/statistics-foundation/modules/sampling-estimation/lessons/confidence-intervals",
      },
    ],
  },
  {
    number: "04",
    title: "Hypothesis Testing",
    description:
      "This module introduces null hypotheses, test statistics, p-values, statistical significance and interpretation.",
    lessons: [
      {
        title: "What is a hypothesis test?",
        description:
          "Learn the logic of testing a claim using data, null hypotheses and alternative hypotheses.",
        href: "/courses/statistics-foundation/modules/hypothesis-testing/lessons/what-is-hypothesis-test",
      },
      {
        title: "p-values and significance",
        description:
          "Understand what a p-value does and does not mean, with careful interpretation.",
        href: "/courses/statistics-foundation/modules/hypothesis-testing/lessons/p-values-significance",
      },
      {
        title: "Power and errors",
        description:
          "Learn Type I error, Type II error, statistical power and why sample size matters.",
        href: "/courses/statistics-foundation/modules/hypothesis-testing/lessons/power-errors",
      },
    ],
  },
  {
    number: "05",
    title: "Regression Foundations",
    description:
      "Students move from comparing groups to modelling relationships between variables.",
    lessons: [
      {
        title: "Simple linear regression",
        description:
          "Understand the regression line, slope, intercept, residuals and interpretation.",
        href: "/courses/statistics-foundation/modules/regression-foundations/lessons/simple-linear-regression",
      },
      {
        title: "Multiple regression",
        description:
          "Learn how regression adjusts for several predictors and how coefficients are interpreted.",
        href: "/courses/statistics-foundation/modules/regression-foundations/lessons/multiple-regression",
      },
      {
        title: "Regression assumptions and diagnostics",
        description:
          "Understand residuals, linearity, constant variance, normality assumptions and model checking.",
        href: "/courses/statistics-foundation/modules/regression-foundations/lessons/regression-assumptions-diagnostics",
      },
    ],
  },
];

const lessonParts = [
  "Lecture: conversational explanation using recurring characters, examples and guided intuition.",
  "Detailed notes: complete theory, notation, derivations, worked examples and interpretation.",
  "Interactive components: visual demonstrations where useful.",
  "Coding practice: included only when a lesson needs computation or data analysis.",
  "Quiz: checkpoint questions to test conceptual understanding.",
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
            A structured foundation course with 5 modules. Each lesson contains a
            conversational lecture, detailed theoretical notes, worked examples,
            interactive components where useful, coding practice if needed, and a quiz.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/courses/statistics-foundation/modules/random-variables-distributions/lessons/random-variable"
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
            <p className="text-sm font-semibold text-slate-500">Modules</p>
            <p className="mt-2 text-lg font-bold text-slate-950">5</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Lesson format</p>
            <p className="mt-2 text-lg font-bold text-slate-950">
              Lecture, Notes, Quiz
            </p>
          </div>

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
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Lesson structure"
            title="Every lesson follows a complete learning format."
            description="The course is designed so students first understand the concept conversationally, then study the full theory, then practise and test themselves."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lessonParts.map((part) => (
              <div
                key={part}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm"
              >
                {part}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Course modules"
            title="Five modules from probability to regression."
            description="Each module contains structured lessons with lecture, notes, interactive learning support and quiz checkpoints."
          />

          <div className="mt-12 space-y-8">
            {modules.map((module) => (
              <div
                key={module.number}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="grid gap-6 md:grid-cols-[80px_1fr]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {module.number}
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                      {module.title}
                    </h2>

                    <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
                      {module.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-3">
                  {module.lessons.map((lesson) => (
                    <LessonUnitCard
                      key={lesson.title}
                      title={lesson.title}
                      description={lesson.description}
                      href={lesson.href}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}