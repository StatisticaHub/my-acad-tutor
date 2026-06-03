import { resourceGuides } from "@/lib/resources";

const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const popularSearches = [
  "regression",
  "p-value",
  "confidence interval",
  "missing data",
  "survival analysis",
  "logistic regression",
  "dissertation analysis",
  "SPSS",
];

const guideFormat = [
  {
    title: "Problem",
    description:
      "Understand the difficulty, misconception or decision that makes the topic important.",
  },
  {
    title: "Intuition",
    description:
      "Build the idea in plain language before moving into formal methods.",
  },
  {
    title: "Method",
    description:
      "Learn the statistical logic, assumptions, workflow and decision steps.",
  },
  {
    title: "Working",
    description:
      "See how the method behaves in realistic student, dissertation or research settings.",
  },
  {
    title: "Limitations",
    description:
      "Recognise when the method can mislead, fail or require extra care.",
  },
  {
    title: "Discussion",
    description:
      "Learn how to interpret, report and explain the result responsibly.",
  },
];

const featureCards = [
  {
    title: "Study guides",
    description:
      "Structured explanations for statistical, analytical and research-method topics.",
  },
  {
    title: "Checklists",
    description:
      "Practical prompts for method choice, data preparation, interpretation and reporting.",
  },
  {
    title: "Interpretation support",
    description:
      "Guidance for understanding assumptions, uncertainty, limitations and conclusions.",
  },
];

const flagshipSlugs = [
  "how-to-choose-the-correct-statistical-test",
  "understanding-p-values-confidence-intervals-and-effect-sizes",
  "linear-regression-assumptions-and-diagnostics",
  "survival-analysis-kaplan-meier-curves-and-cox-regression",
  "r-python-spss-sas-stata-which-should-i-use",
];

const flagshipGuides = flagshipSlugs
  .map((slug) => resourceGuides.find((guide) => guide.slug === slug))
  .filter(Boolean);

const guidesByArea = resourceGuides.reduce<Record<string, typeof resourceGuides>>(
  (groups, guide) => {
    if (!groups[guide.area]) {
      groups[guide.area] = [];
    }

    groups[guide.area].push(guide);
    return groups;
  },
  {},
);

const areaEntries = Object.entries(guidesByArea);

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-bold text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Resources
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.05em] md:text-6xl">
                Study resources for quantitative subjects.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                Explore structured guides for statistics, biostatistics, data
                science, programming, software, dissertation planning and
                quantitative research methods.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                Each guide is designed to help students move beyond memorising
                definitions. The focus is method choice, assumptions,
                interpretation, limitations and responsible academic reporting.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Resource library
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                Guides built for study, coursework and research planning.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Use these resources when you need a careful explanation of what
                a method does, when it is appropriate, how to interpret it and
                what mistakes to avoid.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#all-guides"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 sm:w-auto"
            >
              View all guides
            </a>

            <a
              href="#flagship-guides"
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Start with flagship guides
            </a>

            <a
              href={withBasePath("/learning-hub")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-[#f7f4ee] px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Open Learning Hub
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [String(resourceGuides.length), "Resource guides"],
              [String(areaEntries.length), "Subject areas"],
              ["Structured", "Guide format"],
              ["Free", "Study support"],
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
          {featureCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h2 className="font-sans text-2xl font-black tracking-[-0.04em]">
                {card.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {card.description}
              </p>
            </article>
          ))}
        </section>

        <section
          id="flagship-guides"
          className="mt-8 scroll-mt-24 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
        >
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Flagship guides
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Start with the most useful resources.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              These guides are useful starting points for students who need help
              with method choice, statistical evidence, regression, survival
              analysis and software selection.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {flagshipGuides.map((guide, index) => {
              if (!guide) return null;

              return (
                <a
                  key={guide.slug}
                  href={withBasePath(`/resources/${guide.slug}`)}
                  className="group rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:bg-white"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#111111] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                      Guide {index + 1}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#8b1116]">
                      {guide.area}
                    </span>
                  </div>

                  <h3 className="mt-5 font-sans text-2xl font-black leading-tight tracking-[-0.04em] group-hover:text-[#8b1116] md:text-3xl">
                    {guide.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-neutral-700">
                    {guide.summary}
                  </p>

                  <p className="mt-5 text-sm font-black text-[#8b1116]">
                    Open guide →
                  </p>
                </a>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Guide structure
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <h2 className="font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
                Each guide follows a clear learning format.
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                The guide pages are written to move from the practical problem
                to intuition, method, working, limitations and academic
                discussion.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {guideFormat.map((section) => (
                <article
                  key={section.title}
                  className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
                >
                  <h3 className="font-sans text-xl font-black tracking-[-0.03em]">
                    {section.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    {section.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Popular topics
          </p>

          <h2 className="mt-4 max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
            Common searches students usually start with.
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {popularSearches.map((term) => (
              <span
                key={term}
                className="rounded-full border border-neutral-200 bg-[#f7f4ee] px-4 py-2 text-sm font-black text-neutral-700"
              >
                {term}
              </span>
            ))}
          </div>
        </section>

        <section
          id="all-guides"
          className="mt-8 scroll-mt-24 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
        >
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            All resource guides
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Browse by subject area.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              The resource library is organised by area so you can find guides
              for statistics, biostatistics, programming, software and research
              support.
            </p>
          </div>

          <div className="mt-8 grid gap-8">
            {areaEntries.map(([area, guides]) => (
              <section
                key={area}
                className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5 md:p-6"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                      {area}
                    </p>

                    <h3 className="mt-2 font-sans text-2xl font-black tracking-[-0.04em] md:text-3xl">
                      {guides.length} guide{guides.length === 1 ? "" : "s"}
                    </h3>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {guides.map((guide) => (
                    <a
                      key={guide.slug}
                      href={withBasePath(`/resources/${guide.slug}`)}
                      className="group rounded-[1.5rem] border border-neutral-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-sm"
                    >
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#f7f4ee] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#8b1116]">
                          {guide.level}
                        </span>
                      </div>

                      <h4 className="mt-4 font-sans text-xl font-black leading-tight tracking-[-0.03em] group-hover:text-[#8b1116]">
                        {guide.title}
                      </h4>

                      <p className="mt-3 text-sm leading-7 text-neutral-700">
                        {guide.summary}
                      </p>

                      <p className="mt-5 text-sm font-black text-[#8b1116]">
                        Read guide →
                      </p>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/80">
              Need a full pathway?
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Use resources with structured courses.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              Guides are useful for focused revision and interpretation. For a
              full sequence, start with Statistics Foundation or Machine
              Learning in Biostatistics from the Learning Hub.
            </p>

            <a
              href={withBasePath("/learning-hub")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Open Learning Hub →
            </a>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Need live support?
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Send your subject, topic and academic goal.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/75">
              If a guide is not enough, send an enquiry with your subject,
              academic level, topic, software and deadline.
            </p>

            <a
              href={withBasePath("/contact")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Request support →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}