import HeroInteractiveVisual from "./HeroInteractiveVisual";

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

const subjects = [
  "Statistics",
  "Biostatistics",
  "Health Data Science",
  "Research Methods",
  "Machine Learning",
  "Programming",
];

const platformStats = [
  ["5+", "Study areas"],
  ["2", "Course pathways"],
  ["20+", "Resource guides"],
  ["Live", "Visual demos"],
];

export default function Hero() {
  return (
    <section className="bg-[#f7f4ee] px-4 pb-6 pt-4 text-[#111111] sm:px-5 md:px-8 md:pb-12 md:pt-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm md:rounded-[2.5rem]">
          <div className="grid lg:min-h-[520px] lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-col justify-between p-5 sm:p-6 md:p-7 lg:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm md:tracking-[0.22em]">
                  My Academic Tutor
                </p>

                <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-[#111111] sm:text-5xl md:mt-6 md:text-5xl xl:text-6xl">
                  Build confidence in statistics, biostatistics and health data
                  science.
                </h1>

                <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-700 md:mt-6 md:text-lg md:leading-9">
                  Structured courses, visual demos and focused academic
                  guidance for students learning quantitative subjects.
                </p>

                <div className="mt-5 flex flex-wrap gap-2 md:mt-7">
                  {subjects.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-neutral-200 bg-[#f7f4ee] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-700 md:px-4 md:py-2 md:text-xs md:tracking-[0.14em]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-8">
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
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {platformStats.map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4"
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

            <aside className="border-t border-neutral-200 bg-[#fdfbf7] p-4 sm:p-5 md:p-7 lg:border-l lg:border-t-0 lg:p-8">
              <HeroInteractiveVisual />
            </aside>
          </div>
        </section>
      </div>
    </section>
  );
}
