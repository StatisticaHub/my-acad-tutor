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
    body: "Submit an enquiry when you need suitable academic support.",
  },
];

export default function Hero() {
  return (
    <section className="bg-[#F7F3EA] px-4 pb-5 pt-4 text-[#141210] sm:px-5 md:px-8 md:pb-8 md:pt-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-[0_24px_70px_rgba(20,18,16,0.07)] md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1fr_0.92fr]">
            <div className="p-5 sm:p-6 md:p-8 lg:p-10">
              <div className="inline-flex w-fit items-center rounded-full border border-[#7A0710]/20 bg-[#FFFCF6]/85 px-4 py-2 shadow-[0_24px_70px_rgba(20,18,16,0.07)] backdrop-blur">
            <span className="font-serif text-sm font-black uppercase tracking-[0.28em] text-[#7A0710] md:text-base">
              My Academic Tutor
            </span>
          </div>

              <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-[#141210] sm:text-5xl md:text-6xl">
                Deep Dive into Quantitative Learning.
              </h1>

              <div className="mt-5 rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-4 shadow-[0_24px_70px_rgba(20,18,16,0.07)] md:p-5">
                <p className="text-sm leading-7 text-[#525252] md:text-base md:leading-8">
                  A learning platform combining structured courses, interactive
                  statistical demos, in-depth resources and responsible academic
                  support for students learning statistics, mathematics,
                  biostatistics, health data science, bioinformatics and
                  research methods.
                </p>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={withBasePath("/learning-hub")}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#11100E] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_24px_70px_rgba(20,18,16,0.07)] transition hover:bg-[#741018] sm:w-auto"
                  >
                    Open Learning Hub
                  </a>

                  <a
                    href={withBasePath("/interactive-demos")}
                    className="inline-flex w-full items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-6 py-3.5 text-sm font-semibold text-[#141210] shadow-[0_24px_70px_rgba(20,18,16,0.07)] transition hover:bg-[#FFFCF6]/80 sm:w-auto"
                  >
                    Explore demos
                  </a>

                  <a
                    href={withBasePath("/resources")}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#741018] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_24px_70px_rgba(20,18,16,0.07)] transition hover:bg-[#11100E] sm:w-auto"
                  >
                    Resources →
                  </a>
                </div>
              </div>
            </div>

            <aside className="border-t border-[#E4DED2] bg-[#fdfbf7] p-4 sm:p-5 md:p-6 lg:border-l lg:border-t-0 lg:p-8">
              <div className="grid h-full gap-4">
                <section className="rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-[0_24px_70px_rgba(20,18,16,0.07)] md:rounded-[2rem] md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#741018]">
                        Since 2020
                      </p>

                      <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.05em] text-[#141210] md:text-4xl">
                        From structured support to a full quantitative learning platform.
                      </h2>
                    </div>

                    <span className="hidden rounded-full bg-[#F7F3EA] px-3 py-1 text-xs font-semibold text-[#741018] sm:inline-flex">
                      Academic support
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-[#525252]">
                    Start with structured learning, build intuition with visual
                    demos, and submit an enquiry when you need guided academic support.
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4">
                      <p className="text-3xl font-semibold tracking-[-0.06em] text-[#741018]">
                        2020
                      </p>

                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#7a7063]">
                        Supporting learners since
                      </p>
                    </div>

                    <a
                      href={`${withBasePath("/contact")}#support-form`}
                      className="group rounded-[1.25rem] border border-[#E4DED2] bg-[#11100E] p-4 text-white transition hover:bg-[#741018]"
                    >
                      <p className="text-3xl font-semibold tracking-[-0.06em]">
                        Academic support
                      </p>

                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                        Enquiry review
                      </p>

                      <p className="mt-3 text-xs font-semibold text-white/80 transition group-hover:text-white">
                        Request support →
                      </p>
                    </a>
                  </div>
                </section>

                <section className="grid gap-3 sm:grid-cols-3">
                  {routes.map((route, index) => (
                    <article
                      key={route.title}
                      className="rounded-[1.35rem] border border-[#E4DED2] bg-[#FFFCF6] p-4 shadow-[0_24px_70px_rgba(20,18,16,0.07)]"
                    >
                      <p className="text-xs font-semibold text-[#741018]">
                        {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="mt-2 text-lg font-semibold tracking-[-0.035em] text-[#141210]">
                        {route.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#5F5F5F]">
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
