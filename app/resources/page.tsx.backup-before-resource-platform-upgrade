import { resourceGuides } from "@/lib/resources";

const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}`;
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

function getAreaCounts() {
  const counts = new Map<string, number>();

  resourceGuides.forEach((guide) => {
    counts.set(guide.area, (counts.get(guide.area) ?? 0) + 1);
  });

  return Array.from(counts.entries()).sort(([a], [b]) => a.localeCompare(b));
}

export default function ResourcesPage() {
  const areaCounts = getAreaCounts();

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-neutral-950">
      <section className="relative overflow-hidden border-b border-neutral-200 bg-white px-5 py-10 md:px-8 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f6d8d8,transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <a
            href={withBasePath("/")}
            className="text-sm font-semibold text-[#8b1116] transition hover:text-neutral-950"
          >
            ← Back to homepage
          </a>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1116]">
                Resources
              </p>

              <h1 className="font-serif-academic mt-5 max-w-5xl text-3xl font-medium leading-[1.08] tracking-[-0.035em] sm:text-4xl md:text-7xl">
                In-depth guides for quantitative learning.
              </h1>

              <p className="mt-6 max-w-4xl text-lg leading-9 text-neutral-700">
                Practical, student-friendly resources for statistics,
                biostatistics, data analysis, software, research methods and
                academic interpretation.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-600">
                Each guide is designed as a structured learning note. You move
                from the problem, to intuition, to method, to worked thinking,
                then into limitations and discussion. The aim is not just to
                memorise methods, but to understand when and why they should be
                used.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="#guide-library"
                  className="inline-flex w-full items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-neutral-800 sm:w-auto"
                >
                  Browse guides
                </a>

                <a
                  href={withBasePath("/learning-hub")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-bold text-neutral-950 transition hover:bg-neutral-50 sm:w-auto"
                >
                  Visit Learning Hub
                </a>

                <a
                  href={withBasePath("/contact")}
                  className="rounded-md border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:border-[#8b1116] hover:text-[#8b1116]"
                >
                  Ask for support
                </a>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-neutral-200 bg-white/90 p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">
                Resource library
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-neutral-200 bg-[#f8f6f1] p-4">
                  <p className="text-3xl font-semibold tracking-[-0.03em] text-neutral-950">
                    {resourceGuides.length}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Guides
                  </p>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-[#f8f6f1] p-4">
                  <p className="text-3xl font-semibold tracking-[-0.03em] text-neutral-950">
                    {areaCounts.length}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Areas
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-neutral-200 bg-[#f8f6f1] p-5">
                <p className="text-sm leading-7 text-neutral-600">
                  Search examples: regression, p-value, survival analysis,
                  missing data, dissertation, confidence interval, logistic
                  regression.
                </p>
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">
                Popular searches
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {popularSearches.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-neutral-950 px-5 py-10 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5"
            >
              <h2 className="text-lg font-semibold">{card.title}</h2>
              <p className="mt-2 text-sm leading-7 text-white/70">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-white px-5 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
                Resource format
              </p>

              <h2 className="font-serif-academic mt-3 text-4xl font-medium leading-tight tracking-[-0.025em] md:text-5xl">
                Every guide follows a clear learning structure.
              </h2>
            </div>

            <p className="max-w-3xl text-base leading-8 text-neutral-600">
              The resources are built like mini-lessons. Students can read them
              before a lecture, while preparing coursework, or when they need to
              understand why a method is appropriate.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {guideFormat.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.25rem] border border-neutral-200 bg-[#f8f6f1] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-sm"
              >
                <h3 className="font-serif-academic text-2xl font-medium tracking-[-0.015em]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-neutral-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="guide-library"
        className="mx-auto max-w-7xl px-5 py-14 md:px-8"
      >
        <div className="mb-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              Guide library
            </p>

            <h2 className="font-serif-academic mt-3 text-4xl font-medium leading-tight tracking-[-0.025em] md:text-5xl">
              Start with a practical guide.
            </h2>
          </div>

          <p className="max-w-3xl text-base leading-8 text-neutral-600">
            These resources help students ask better questions, understand
            analysis decisions and prepare for coursework, dissertations,
            tutoring or research support.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#8b1116] px-4 py-2 text-sm font-semibold text-white">
            All areas · {resourceGuides.length}
          </span>

          {areaCounts.map(([area, count]) => (
            <span
              key={area}
              className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-600"
            >
              {area} · {count}
            </span>
          ))}
        </div>

        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <p className="text-sm font-semibold text-neutral-600">
            Showing {resourceGuides.length} resources
          </p>

          <a
            href={withBasePath("/contact")}
            className="w-fit rounded-md bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8b1116]"
          >
            Submit requirement
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {resourceGuides.map((resource, index) => (
            <a
              key={resource.slug}
              href={withBasePath(`/resources/${resource.slug}`)}
              className="group flex min-h-full flex-col rounded-[1.35rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#d8b6b6] hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#f7f4ee] px-3 py-1 text-xs font-bold text-neutral-700">
                    {resource.area}
                  </span>

                  <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-bold text-neutral-500">
                    {resource.level}
                  </span>
                </div>

                <span className="text-xs font-bold text-neutral-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="font-serif-academic mt-5 text-2xl font-medium leading-tight tracking-[-0.015em] group-hover:text-[#8b1116]">
                {resource.title}
              </h3>

              <p className="mt-4 flex-1 text-sm leading-7 text-neutral-600">
                {resource.summary}
              </p>

              <div className="mt-6 rounded-xl border border-neutral-200 bg-[#f8f6f1] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
                  Guide format
                </p>

                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Problem · Intuition · Method · Working · Limitations ·
                  Discussion
                </p>
              </div>

              <p className="mt-6 text-sm font-semibold text-[#8b1116]">
                Read guide →
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white px-5 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl rounded-[1.5rem] border border-neutral-200 bg-neutral-950 p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">
                Need personalised guidance?
              </p>

              <h2 className="font-serif-academic mt-4 max-w-3xl text-4xl font-medium leading-tight tracking-[-0.025em] md:text-5xl">
                Use resources first, then ask better questions.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/70">
                Resources can help you understand the foundations. If you need
                help applying a method to your own course, dissertation or
                research project, you can submit a support enquiry.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href={withBasePath("/contact")}
                className="rounded-md bg-white px-6 py-4 text-center text-sm font-semibold text-neutral-950 transition hover:bg-[#f7f4ee]"
              >
                Submit support requirement
              </a>

              <a
                href={withBasePath("/courses")}
                className="rounded-md border border-white/15 bg-white/10 px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Explore structured courses
              </a>

              <a
                href={withBasePath("/learning-hub")}
                className="rounded-md border border-white/15 px-6 py-4 text-center text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Visit Learning Hub
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}