import ConfidenceIntervalMeanExplorer from "@/components/interactive/ConfidenceIntervalMeanExplorer";

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

export default function InteractiveDemosPreview() {
  return (
    <section className="bg-[#F7F3EA] px-4 py-5 text-[#141210] sm:px-5 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-5 overflow-hidden rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1fr_0.9fr]">
            <div className="p-5 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#741018] md:text-sm">
                Interactive calculator
              </p>

              <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">
                Calculate confidence intervals for a mean.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#525252] md:text-base md:leading-8">
                Enter raw data or summary statistics, choose a Z or T interval,
                and see the confidence interval, graph and
                interpretation update instantly.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath("/interactive-demos#confidence-interval-mean")}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#11100E] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#741018] sm:w-auto"
                >
                  Open full calculator →
                </a>

                <a
                  href={withBasePath("/courses/statistics-foundation")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-6 py-3.5 text-sm font-semibold text-[#141210] transition hover:bg-[#F7F3EA] sm:w-auto"
                >
                  Learn inference →
                </a>
              </div>
            </div>

            <aside className="border-t border-[#E4DED2] bg-[#11100E] p-5 text-white md:p-8 lg:border-l lg:border-t-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55 md:text-sm">
                What it calculates
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Raw data input",
                  "Summary statistics",
                  "Z interval",
                  "T interval",
                  "Margin of error",
                  "Basic interpretation",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-4 text-sm font-semibold text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <ConfidenceIntervalMeanExplorer />
      </div>
    </section>
  );
}
