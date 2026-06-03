import NormalDistributionExplorer from "@/components/interactive/NormalDistributionExplorer";
import RegressionLineExplorer from "@/components/interactive/RegressionLineExplorer";
import ConfidenceIntervalSimulator from "@/components/interactive/ConfidenceIntervalSimulator";

const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const demos = [
  {
    title: "Normal distribution explorer",
    description:
      "Move the mean and spread to see how a bell-shaped distribution changes, and connect the visual shape to probability and variation.",
  },
  {
    title: "Regression line explorer",
    description:
      "Explore how the fitted line changes with the data and learn how regression connects trend, prediction and residuals.",
  },
  {
    title: "Confidence interval simulator",
    description:
      "See why confidence intervals vary from sample to sample and how repeated sampling explains uncertainty.",
  },
];

const learningGoals = [
  {
    title: "See the concept",
    text: "Interactive movement helps students connect formulas to visual behaviour.",
  },
  {
    title: "Interpret carefully",
    text: "Each demo supports statistical thinking rather than memorising definitions.",
  },
  {
    title: "Prepare for lessons",
    text: "The demos can be used before or after course lessons to strengthen intuition.",
  },
];

export default function InteractiveDemosPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/learning-hub")}
          className="text-sm font-bold text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to Learning Hub
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Interactive demos
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.05em] md:text-6xl">
                Visual statistics demos for active learning.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                These demos show the platform direction: not only written notes,
                but interactive learning tools for statistics, regression and
                inference.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                Use them to build intuition before studying formal notation,
                derivations, assumptions and interpretation inside the course
                lessons.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Why interactive?
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                Statistics becomes clearer when students can move the idea.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Visual demos help students see how distributions, lines,
                samples and uncertainty behave, rather than treating statistics
                as only a set of formulas.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#demos"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 sm:w-auto"
            >
              Start demos
            </a>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Open Statistics Foundation
            </a>

            <a
              href={withBasePath("/resources")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-[#f7f4ee] px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Browse resources
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["3", "Interactive demos"],
              ["Visual", "Concept learning"],
              ["Statistics", "Core focus"],
              ["Free", "Public preview"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="font-sans text-2xl font-black tracking-[-0.04em] text-[#111111]">
                  {value}
                </p>

                <p className="mt-2 text-sm font-bold text-neutral-600">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {learningGoals.map((goal, index) => (
            <article
              key={goal.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <p className="font-sans text-3xl font-black tracking-[-0.05em] text-[#8b1116]">
                {String(index + 1).padStart(2, "0")}
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                {goal.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {goal.text}
              </p>
            </article>
          ))}
        </section>

        <section
          id="demos"
          className="mt-8 scroll-mt-24 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
        >
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Demo library
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Explore the three core visual learning tools.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              These demos support the Statistics Foundation pathway and can be
              used alongside lessons on distributions, regression and inference.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {demos.map((demo, index) => (
              <article
                key={demo.title}
                className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116]">
                  Demo {index + 1}
                </p>

                <h3 className="mt-3 font-sans text-2xl font-black tracking-[-0.04em]">
                  {demo.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {demo.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-8">
          <NormalDistributionExplorer />
          <RegressionLineExplorer />
          <ConfidenceIntervalSimulator />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/80">
              Use with courses
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Pair demos with the full Statistics Foundation course.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              Interactive tools are strongest when combined with lecture
              explanations, detailed notes, worked examples and quizzes.
            </p>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Open Statistics Foundation →
            </a>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Need help interpreting?
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Use resources or request support.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/75">
              If a concept still feels unclear, use the resource guides or send
              a support enquiry with your topic and academic level.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={withBasePath("/resources")}
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
              >
                Browse resources
              </a>

              <a
                href={withBasePath("/contact")}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
              >
                Request support
              </a>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}