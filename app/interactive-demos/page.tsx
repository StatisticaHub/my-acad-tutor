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

const upcomingDemos = [
  {
    title: "Normal distribution explorer",
    area: "Statistics",
    body: "Change the mean and standard deviation to understand location, spread and probability.",
  },
  {
    title: "Regression line playground",
    area: "Regression",
    body: "Move points and see how slope, residuals and fitted lines respond.",
  },
  {
    title: "Prediction threshold lab",
    area: "Machine Learning",
    body: "Adjust a classification threshold and interpret sensitivity, specificity and false positives.",
  },
];

export default function InteractiveDemosPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-4 py-8 text-neutral-950 sm:px-5 md:px-8 md:py-14">
      <section className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 md:p-10">
              <a
                href={withBasePath("/learning-hub")}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm"
              >
                ← Learning Hub
              </a>

              <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-5xl md:text-6xl">
                Interactive statistical calculators and visual demos.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Use live calculators and visual explanations to understand
                formulas, uncertainty, models and interpretation.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#confidence-interval-mean"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8b1116] sm:w-auto"
                >
                  Open CI calculator →
                </a>

                <a
                  href={withBasePath("/courses")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950 transition hover:bg-[#f7f4ee] sm:w-auto"
                >
                  View courses →
                </a>
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-[#111111] p-5 text-white md:p-8 lg:border-l lg:border-t-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55 md:text-sm">
                Featured demo
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
                Confidence interval for a mean.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/70">
                Calculate z and t intervals using raw data or summary
                statistics, with live graphs and interpretation.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {["Raw data", "Summary input", "Z interval", "T interval"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4 text-sm font-semibold text-white/80"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </aside>
          </div>
        </section>

        <section id="confidence-interval-mean" className="mt-8 scroll-mt-28">
          <ConfidenceIntervalMeanExplorer />
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
            More demos coming
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
            Build intuition before memorising formulas.
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {upcomingDemos.map((demo) => (
              <article
                key={demo.title}
                className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b1116]">
                  {demo.area}
                </p>

                <h3 className="mt-3 text-xl font-semibold tracking-[-0.035em] text-neutral-950">
                  {demo.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  {demo.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
