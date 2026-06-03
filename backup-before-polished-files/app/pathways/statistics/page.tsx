import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/sections/SectionHeading";
import CourseCard from "@/components/course/CourseCard";

const pathwayCourses = [
  {
    title: "Statistics Foundation",
    description:
      "Start with probability, random variables, expectation, variance, estimation, hypothesis testing and regression foundations.",
    href: "/courses/statistics-foundation",
    subject: "Statistics",
    level: "Beginner to Intermediate",
    duration: "July 2026 launch",
    status: "Free" as const,
  },
  {
    title: "Statistical Inference",
    description:
      "Understand estimators, sampling distributions, confidence intervals, hypothesis tests and interpretation from first principles.",
    href: "/courses/statistical-inference",
    subject: "Statistics",
    level: "Intermediate",
    duration: "Coming soon",
    status: "Coming Soon" as const,
  },
  {
    title: "Regression Modelling",
    description:
      "Learn simple linear regression, multiple regression, assumptions, diagnostics, interpretation and model comparison.",
    href: "/courses/regression-modelling",
    subject: "Statistics",
    level: "Intermediate",
    duration: "Coming soon",
    status: "Coming Soon" as const,
  },
];

const roadmap = [
  {
    step: "01",
    title: "Probability foundations",
    description:
      "Understand events, probability rules, conditional probability, independence and Bayes theorem.",
  },
  {
    step: "02",
    title: "Random variables and distributions",
    description:
      "Learn discrete and continuous random variables, expectation, variance and common distributions.",
  },
  {
    step: "03",
    title: "Estimation and uncertainty",
    description:
      "Study samples, estimators, standard errors, confidence intervals and sampling variability.",
  },
  {
    step: "04",
    title: "Hypothesis testing",
    description:
      "Understand null hypotheses, test statistics, p-values, significance and practical interpretation.",
  },
  {
    step: "05",
    title: "Regression and modelling",
    description:
      "Move into regression models, assumptions, diagnostics and communication of statistical results.",
  },
];

export default function StatisticsPathwayPage() {
  return (
    <main className="bg-[#f7f4ee] text-[#111111]">
      <section className="bg-[#111111] px-5 py-12 text-white md:px-6 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Badge variant="blue">Statistics Pathway</Badge>

          <h1 className="mt-6 max-w-5xl text-3xl font-bold tracking-tight sm:text-4xl md:text-7xl">
            Build your statistical foundation from first principles.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70">
            This pathway is for students who want to understand probability,
            statistical inference, hypothesis testing, regression and interpretation
            properly, instead of memorising formulas.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/courses/statistics-foundation"
              className="rounded-full bg-[#8b1116] px-6 py-3 text-sm font-semibold text-white hover:bg-[#5f0b0f]"
            >
              Start Statistics Foundation
            </a>

            <a
              href="/learning-hub"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Back to Learning Hub
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-white px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-[#f7f4ee] p-5">
            <p className="text-sm font-semibold text-neutral-700">Level</p>
            <p className="mt-2 text-lg font-bold text-[#111111]">
              Beginner to Advanced
            </p>
          </div>

          <div className="rounded-2xl bg-[#f7f4ee] p-5">
            <p className="text-sm font-semibold text-neutral-700">Best for</p>
            <p className="mt-2 text-lg font-bold text-[#111111]">
              University and MSc students
            </p>
          </div>

          <div className="rounded-2xl bg-[#f7f4ee] p-5">
            <p className="text-sm font-semibold text-neutral-700">Focus</p>
            <p className="mt-2 text-lg font-bold text-[#111111]">
              Theory, examples and interpretation
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Pathway roadmap"
            title="Learn statistics in the correct order."
            description="The pathway moves from probability foundations to inference and regression, so each topic builds on the previous one."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {roadmap.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8b1116] text-sm font-bold text-white">
                  {item.step}
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#111111]">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-neutral-700">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-10 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Recommended courses"
            title="Courses in this pathway."
            description="Start with the foundation course, then move into inference and regression as your confidence grows."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pathwayCourses.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#ded9cf] bg-white p-8 text-[#111111] shadow-sm md:p-12">
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
            Start with the Statistics Foundation course.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
            The first full pathway course will focus on building strong conceptual
            understanding with equations, examples, exercises and interpretation.
          </p>

          <div className="mt-8">
            <a
              href="/courses/statistics-foundation"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#8b1116] hover:bg-[#fff8f5]"
            >
              View Statistics Foundation
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}