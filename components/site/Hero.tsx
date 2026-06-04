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

const routes = [
  {
    title: "Learn",
    body: "Follow structured courses and guided explanations.",
  },
  {
    title: "Explore",
    body: "Use visual demos to understand statistical ideas.",
  },
  {
    title: "Ask",
    body: "Request book customised tutoring when you need focused support.",
  },
];

export default function Hero() {
  return (
    <section className="bg-[#f7f4ee] px-4 pb-5 pt-4 text-[#111111] sm:px-5 md:px-8 md:pb-8 md:pt-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1fr_0.92fr]">
            <div className="p-5 sm:p-6 md:p-8 lg:p-10">
              <div className="inline-flex w-fit items-center rounded-full border border-[#6f0d12]/20 bg-white/85 px-4 py-2 shadow-sm backdrop-blur">
            <span className="font-serif text-sm font-black uppercase tracking-[0.28em] text-[#6f0d12] md:text-base">
              My Academic Tutor
            </span>
          </div>

              <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-[#111111] sm:text-5xl md:text-6xl">
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
                    href={`${withBasePath("/contact")}#support-form`}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#8b1116] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#111111] sm:w-auto"
                  >
                    Resources →
                  </a>
                </div>
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-[#fdfbf7] p-4 sm:p-5 md:p-6 lg:border-l lg:border-t-0 lg:p-8">
              <div className="grid h-full gap-4">
                <section className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2rem] md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b1116]">
                        Since 2020
                      </p>

                      <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.05em] text-neutral-950 md:text-4xl">
                        Book customised tutoring, now built into a learning platform.
                      </h2>
                    </div>

                    <span className="hidden rounded-full bg-[#f7f4ee] px-3 py-1 text-xs font-semibold text-[#8b1116] sm:inline-flex">
                      Premium
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-neutral-700">
                    Start with structured learning, build intuition with visual
                    demos, and request focused support when you need guidance.
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4">
                      <p className="text-3xl font-semibold tracking-[-0.06em] text-[#8b1116]">
                        2020
                      </p>

                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        Tutoring since
                      </p>
                    </div>

                    <a
                      href={`${withBasePath("/contact")}#support-form`}
                      className="group rounded-[1.25rem] border border-neutral-200 bg-[#111111] p-4 text-white transition hover:bg-[#8b1116]"
                    >
                      <p className="text-3xl font-semibold tracking-[-0.06em]">
                        Premium
                      </p>

                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                        Tutoring support
                      </p>

                      <p className="mt-3 text-xs font-semibold text-white/80 transition group-hover:text-white">
                        Open form →
                      </p>
                    </a>
                  </div>
                </section>

                <section className="grid gap-3 sm:grid-cols-3">
                  {routes.map((route, index) => (
                    <article
                      key={route.title}
                      className="rounded-[1.35rem] border border-neutral-200 bg-white p-4 shadow-sm"
                    >
                      <p className="text-xs font-semibold text-[#8b1116]">
                        {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="mt-2 text-lg font-semibold tracking-[-0.035em] text-neutral-950">
                        {route.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-neutral-600">
                        {route.body}
                      </p>
                    </article>
                  ))}
                </section>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </section>
  );
}
