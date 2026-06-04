import type { Metadata } from "next";
import { resourceGuides } from "@/lib/resources";
export const metadata: Metadata = {
  title: "Statistics and Biostatistics Resources",
  description:
    "Read detailed guides on p-values, confidence intervals, regression, probability, study design, data interpretation, biostatistics and research methods.",
  alternates: {
    canonical: "https://www.myacademictutor.com/resources/",
  },
};

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
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

const featuredSlugs = [
  "how-to-choose-the-correct-statistical-test",
  "understanding-p-values-confidence-intervals-and-effect-sizes",
  "linear-regression-assumptions-and-diagnostics",
  "survival-analysis-kaplan-meier-curves-and-cox-regression",
];

const featuredGuides = featuredSlugs
  .map((slug) => resourceGuides.find((guide) => guide.slug === slug))
  .filter((guide): guide is (typeof resourceGuides)[number] => Boolean(guide));

const areas = Array.from(new Set(resourceGuides.map((guide) => guide.area)));

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">

      <section className="mx-auto mt-8 max-w-7xl rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#6f0d12]">
          Study guides
        </p>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-950 md:text-3xl">
          Learn the core ideas behind statistics, biostatistics and research methods.
        </h2>

        <p className="mt-4 max-w-4xl text-base leading-7 text-neutral-700">
          These guides explain important quantitative concepts such as p-values,
          confidence intervals, regression, probability, study design, medical
          statistics and data interpretation. Each guide is written to help
          students understand the idea, avoid common mistakes and connect the
          method to real academic or health data problems.
        </p>

        <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
          <a className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/learning-hub/">
            Explore the Learning Hub
          </a>
          <a className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/interactive-demos/">
            Try Interactive Demos
          </a>
          <a className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/contact/">
            Request Academic Support
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-semibold text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2.5rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b1116]">
            Resources
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] md:text-7xl">
                Focused guides for quantitative study.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Read clear guides on statistical methods, interpretation,
                research planning and applied data analysis.
              </p>
            </div>

            <div className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Guide areas
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {areas.slice(0, 8).map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {featuredGuides.length > 0 && (
          <section className="mt-8 rounded-[2.5rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b1116]">
                  Start with these
                </p>

                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">
                  Essential study guides.
                </h2>
              </div>

              <p className="text-base leading-8 text-neutral-700">
                These guides cover the ideas students commonly need when
                learning statistics and research methods.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {featuredGuides.map((guide) => (
                <a
                  key={guide.slug}
                  href={withBasePath(`/resources/${guide.slug}`)}
                  className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b1116]">
                    {guide.area} · {guide.level}
                  </p>

                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
                    {guide.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-neutral-700">
                    {guide.summary}
                  </p>

                  <p className="mt-6 text-sm font-semibold text-[#8b1116]">
                    Read guide →
                  </p>
                </a>
              ))}
            </div>
          </section>
        )}

        <section className="mt-8 rounded-[2.5rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b1116]">
            All guides
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resourceGuides.map((guide) => (
              <a
                key={guide.slug}
                href={withBasePath(`/resources/${guide.slug}`)}
                className="rounded-[1.75rem] border border-neutral-200 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {guide.area}
                </p>

                <h2 className="mt-3 text-xl font-semibold tracking-[-0.04em]">
                  {guide.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-7 text-neutral-700">
                  {guide.summary}
                </p>
              </a>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
