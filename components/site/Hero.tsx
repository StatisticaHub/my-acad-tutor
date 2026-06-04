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
  "Statistics",
  "Mathematics",
  "Biostatistics",
  "Health Data Science",
  "Machine Learning",
  "Bioinformatics",
  "Research Methods",
  "Programming",
];

const platformStats = [
  ["2020", "Tutoring since"],
  ["8+", "Subject areas"],
  ["20+", "Resource guides"],
  ["Live", "Visual demos"],
];

const updatePills = ["Courses", "Demos", "Resources", "1:1 Support"];

export default function Hero() {
  return (
    <section className="bg-[#f7f4ee] px-4 pb-6 pt-4 text-[#111111] sm:px-5 md:px-8 md:pb-10 md:pt-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.03fr_0.97fr]">
            <div className="p-5 sm:p-6 md:p-7 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm md:tracking-[0.22em]">
                My Academic Tutor
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-[#111111] sm:text-5xl md:text-5xl xl:text-6xl">
                Dive into Quantitative Learning.
              </h1>

              <div className="mt-5 rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-4 shadow-sm md:p-5">
                <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
                  A learning platform combining structured courses, interactive
                  statistical demos, in-depth resources and responsible academic
                  support for students learning statistics, mathematics,
                  biostatistics, health data science, bioinformatics and
                  research methods.
                </p>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={withBasePath("/learning-hub")}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8b1116] sm:w-auto"
                  >
                    Open Learning Hub
                  </a>

                  <a
                    href={withBasePath("/interactive-demos")}
                    className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] shadow-sm transition hover:bg-white/80 sm:w-auto"
                  >
                    Explore demos
                  </a>

                  <a
                    href={withBasePath("/contact")}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#8b1116] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#111111] sm:w-auto"
                  >
                    1:1 Tutoring →
                  </a>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {subjectAreas.map((item, index) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-800 shadow-sm transition hover:border-[#8b1116]/25 hover:bg-[#f7f4ee]"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f7f4ee] text-[10px] font-semibold text-[#8b1116]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </span>
                ))}
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

            <aside className="border-t border-neutral-200 bg-[#fdfbf7] p-4 sm:p-5 md:p-6 lg:border-l lg:border-t-0 lg:p-8">
              <div className="grid h-full content-start gap-4">
                <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2rem] md:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                    Since 2020
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.05em] text-neutral-950 md:text-5xl">
                    Tutoring, learning support and quantitative guidance.
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
                    My Academic Tutor began with focused tutoring support and is
                    now developing into a structured learning platform for
                    quantitative subjects.
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4">
                      <p className="text-3xl font-semibold tracking-[-0.06em] text-[#8b1116]">
                        2020
                      </p>

                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        Started tutoring
                      </p>
                    </div>

                    <div className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4">
                      <p className="text-3xl font-semibold tracking-[-0.06em] text-[#8b1116]">
                        1:1
                      </p>

                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        Focused support
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2rem] md:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b1116]">
                    Platform updates
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-neutral-950">
                    Courses, demos and guides are being added gradually.
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    Follow a structured route, explore visual explanations or
                    request support when you need focused academic guidance.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {updatePills.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-neutral-200 bg-[#f7f4ee] px-3 py-1.5 text-xs font-semibold text-neutral-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[1.25rem] border border-neutral-200 bg-[#111111] p-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                      Responsible support
                    </p>

                    <p className="mt-2 text-sm leading-6 text-white/75">
                      Guidance supports learning, planning and interpretation.
                      It does not replace independent academic work.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </section>
  );
}
