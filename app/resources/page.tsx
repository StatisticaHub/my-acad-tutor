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

const categories = [
  "Statistics",
  "Regression",
  "Biostatistics",
  "Research methods",
  "Data analysis",
  "Software",
  "Bioinformatics",
];

const guideFormat = [
  {
    title: "Problem",
    description: "What difficulty does the topic solve?",
  },
  {
    title: "Intuition",
    description: "What is the idea in simple language?",
  },
  {
    title: "Method",
    description: "What steps or theory are used?",
  },
  {
    title: "Working",
    description: "How does it work in practice?",
  },
  {
    title: "Limitations",
    description: "When can the method mislead?",
  },
  {
    title: "Discussion",
    description: "How should students interpret and report it?",
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-neutral-950">
      <section className="relative overflow-hidden border-b border-neutral-200 bg-white px-5 py-16 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f6d8d8,transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <a
            href={withBasePath("/")}
            className="text-sm font-semibold text-[#8b1116] hover:text-neutral-950"
          >
            ← Back to homepage
          </a>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1116]">
                Resources
              </p>

              <h1 className="font-serif-academic mt-5 max-w-5xl text-5xl font-medium leading-tight tracking-[-0.03em] md:text-6xl">
                In-depth guides for quantitative learning.
              </h1>

              <p className="mt-6 max-w-4xl text-lg leading-9 text-neutral-700">
                Practical, student-friendly resources for statistics,
                biostatistics, data analysis, software, research methods and
                academic interpretation.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-600">
                Each guide is written like a structured learning note, not a
                short blog post. The aim is to help students understand the
                problem, build intuition, learn the method, see how it works,
                recognise limitations and discuss results responsibly.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#guide-library"
                  className="rounded-md bg-neutral-950 px-6 py-3 text-sm font-semibold text-white"
                >
                  Browse guides
                </a>

                <a
                  href={withBasePath("/learning-hub")}
                  className="rounded-md border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800"
                >
                  Visit Learning Hub
                </a>

                <a
                  href={withBasePath("/contact")}
                  className="rounded-md border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800"
                >
                  Ask for support
                </a>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-neutral-200 bg-white/90 p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">
                Search resources
              </p>

              <div className="mt-5 rounded-xl border border-neutral-200 bg-[#f8f6f1] p-5">
                <p className="text-sm leading-7 text-neutral-600">
                  Search examples: regression, p-value, survival analysis,
                  missing data, SPSS, dissertation, confidence interval,
                  logistic regression.
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
          <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold">Study guides</h2>
            <p className="mt-2 text-sm leading-7 text-white/70">
              Structured explanations for common statistical, analytical and
              research-method topics.
            </p>
          </div>

          <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold">Checklists</h2>
            <p className="mt-2 text-sm leading-7 text-white/70">
              Practical prompts for data preparation, method choice,
              interpretation and reporting.
            </p>
          </div>

          <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold">Interpretation support</h2>
            <p className="mt-2 text-sm leading-7 text-white/70">
              Guidance for understanding assumptions, results, uncertainty and
              limitations.
            </p>
          </div>
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
              The resources are designed to feel like mini-lessons. Students
              can read them before a lecture, while preparing for coursework, or
              when they need to understand why a method is used.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {guideFormat.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.25rem] border border-neutral-200 bg-[#f8f6f1] p-5"
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
            common analysis decisions and prepare for coursework,
            dissertations, tutoring or research support.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#8b1116] px-4 py-2 text-sm font-semibold text-white">
            All areas
          </span>

          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-600"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <p className="text-sm font-semibold text-neutral-600">
            Showing {resourceGuides.length} resources
          </p>

          <a
            href={withBasePath("/contact")}
            className="w-fit rounded-md bg-neutral-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Submit requirement
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {resourceGuides.map((resource) => (
            <a
              key={resource.slug}
              href={withBasePath(`/resources/${resource.slug}`)}
              className="group rounded-[1.35rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#f7f4ee] px-3 py-1 text-xs font-bold text-neutral-700">
                  {resource.area}
                </span>

                <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-bold text-neutral-500">
                  {resource.level}
                </span>
              </div>

              <h3 className="font-serif-academic mt-5 text-2xl font-medium tracking-[-0.015em] group-hover:text-[#8b1116]">
                {resource.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-neutral-600">
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

      <section className="border-t border-neutral-200 bg-white px-5 py-16 md:px-8">
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
                Resources can help you understand the basics. If you need help
                applying a method to your own course, dissertation or research
                project, you can submit a support enquiry.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href={withBasePath("/contact")}
                className="rounded-md bg-white px-6 py-4 text-center text-sm font-semibold text-neutral-950"
              >
                Submit support requirement
              </a>

              <a
                href={withBasePath("/courses")}
                className="rounded-md border border-white/15 bg-white/10 px-6 py-4 text-center text-sm font-semibold text-white"
              >
                Explore structured courses
              </a>

              <a
                href={withBasePath("/learning-hub")}
                className="rounded-md border border-white/15 px-6 py-4 text-center text-sm font-semibold text-white/80"
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