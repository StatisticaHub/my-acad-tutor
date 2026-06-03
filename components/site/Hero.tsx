import HeroInteractiveVisual from "./HeroInteractiveVisual";
import HeroLiveTitle from "./HeroLiveTitle";

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

const subjectAreas = [
  {
    title: "Statistics",
    body: "Probability, inference, regression and uncertainty.",
  },
  {
    title: "Mathematics",
    body: "Algebra, calculus, probability and quantitative reasoning.",
  },
  {
    title: "Biostatistics",
    body: "Clinical data, study design and medical interpretation.",
  },
  {
    title: "Health Data Science",
    body: "Prediction, validation and responsible modelling.",
  },
  {
    title: "Machine Learning",
    body: "Applied models for health and biomedical data.",
  },
  {
    title: "Bioinformatics",
    body: "Biomedical data, omics thinking and computational analysis.",
  },
  {
    title: "Research Methods",
    body: "Study planning, analysis thinking and reporting.",
  },
  {
    title: "Programming",
    body: "R workflows, reproducible analysis and data handling.",
  },
];

const platformStats = [
  ["8+", "Subject areas"],
  ["2", "Course pathways"],
  ["20+", "Resource guides"],
  ["Live", "Visual demos"],
];

export default function Hero() {
  return (
    <section className="bg-[#f7f4ee] px-4 pb-6 pt-4 text-[#111111] sm:px-5 md:px-8 md:pb-10 md:pt-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm md:rounded-[2.5rem]">
          <div className="grid lg:min-h-[520px] lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-col justify-between p-5 sm:p-6 md:p-7 lg:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm md:tracking-[0.22em]">
                  My Academic Tutor
                </p>

                <HeroLiveTitle />

                <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-700 md:text-lg md:leading-8">
                  A learning platform combining structured courses,
                  interactive statistical demos, in-depth resources and
                  responsible academic support for students learning statistics,
                  mathematics, biostatistics, health data science,
                  bioinformatics and research methods.
                </p>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <a
                    href={withBasePath("/learning-hub")}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8b1116] sm:w-auto md:py-4"
                  >
                    Open Learning Hub
                  </a>

                  <a
                    href={withBasePath("/interactive-demos")}
                    className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] shadow-sm transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
                  >
                    Explore demos
                  </a>
                </div>

                <div className="mt-6 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
                  {subjectAreas.map((item, index) => (
                    <article
                      key={item.title}
                      className="group rounded-[1.15rem] border border-neutral-200 bg-[#f7f4ee] p-3.5 transition duration-300 hover:-translate-y-1 hover:border-[#8b1116]/25 hover:bg-white hover:shadow-sm"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-[#8b1116] transition group-hover:bg-[#8b1116] group-hover:text-white">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <p className="text-sm font-semibold tracking-[-0.02em] text-neutral-950">
                          {item.title}
                        </p>
                      </div>

                      <p className="mt-2 text-xs leading-5 text-neutral-600">
                        {item.body}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {platformStats.map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[1.25rem] border border-neutral-200 bg-white p-4"
                  >
                    <p className="text-2xl font-semibold tracking-[-0.06em] text-[#8b1116]">
                      {value}
                    </p>

                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-[#fdfbf7] p-4 sm:p-5 md:p-5 lg:border-l lg:border-t-0">
              <HeroInteractiveVisual />
            </aside>
          </div>
        </section>
      </div>
    </section>
  );
}
