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

const supportAreas = [
  "Statistics",
  "Mathematics",
  "Biostatistics",
  "Health Data Science",
  "Machine Learning",
  "Bioinformatics",
  "Programming",
  "Research Methods",
  "Dissertation Planning",
  "Data Analysis",
  "R Support",
];

const supportSteps = [
  {
    title: "Share the context",
    body: "Send your topic, level, software, deadline and the exact point where you need clarity.",
  },
  {
    title: "Get focused explanation",
    body: "Support is built around understanding concepts, planning analysis and interpreting results responsibly.",
  },
  {
    title: "Keep ownership",
    body: "Guidance helps you learn and improve your work. It does not replace your independent academic submission.",
  },
];

export default function ContactCTA() {
  return (
    <section className="bg-[#F7F3EA] px-4 py-5 text-[#141210] sm:px-5 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="bg-[#11100E] p-5 text-white md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55 md:text-sm md:tracking-[0.22em]">
                Academic support
              </p>

              <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">
                Get clearer guidance for quantitative work.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75 md:text-base md:leading-8">
                Send your topic, level, software and the type of explanation
                you need. Support is focused on learning, planning,
                interpretation and responsible academic progress.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath("/contact")}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#FFFCF6] px-6 py-3.5 text-sm font-semibold text-[#141210] transition hover:bg-[#F7F3EA] sm:w-auto md:py-4"
                >
                  Request support →
                </a>

                <a
                  href="mailto:contact@myacademictutor.com"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#FFFCF6]/10 sm:w-auto md:py-4"
                >
                  Email directly
                </a>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[#FFFCF6]/[0.06] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                  Academic integrity
                </p>

                <p className="mt-2 text-sm leading-7 text-white/70">
                  Guidance supports learning, interpretation and planning. It
                  does not replace independent academic work.
                </p>
              </div>
            </div>

            <aside className="bg-[#fdfbf7] p-5 md:p-8">
              <div className="rounded-[1.5rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 md:rounded-[2rem] md:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#741018] md:text-sm">
                  How support works
                </p>

                <div className="mt-5 grid gap-3">
                  {supportSteps.map((step, index) => (
                    <article
                      key={step.title}
                      className="grid grid-cols-[auto_1fr] gap-3 rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#11100E] text-xs font-semibold text-white">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-[#141210]">
                          {step.title}
                        </h3>

                        <p className="mt-1.5 text-sm leading-6 text-[#525252]">
                          {step.body}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-[1.5rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 md:rounded-[2rem] md:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#741018] md:text-sm">
                  Subjects covered
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {supportAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-[#E4DED2] bg-[#F7F3EA] px-3 py-1.5 text-xs font-semibold text-[#525252]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </section>
  );
}
