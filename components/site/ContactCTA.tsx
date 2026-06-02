const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  return `${basePath}${href}/`;
}

export default function ContactCTA() {
  return (
    <section className="bg-[#f7f4ee] px-5 py-16 text-neutral-950 md:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-neutral-950 text-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 md:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">
              Start here
            </p>

            <h2 className="font-serif-academic mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              Tell us what you want to understand, improve or analyse.
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-white/70">
              Share your subject, academic level, software requirements,
              deadline and the type of support you need. We will suggest the
              most suitable route, whether that is structured learning, subject
              tutoring, software guidance or research analysis support.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">
                  Subject guidance
                </p>
                <p className="mt-2 text-xs leading-6 text-white/60">
                  Statistics, biostatistics, data science and research methods.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">
                  Software support
                </p>
                <p className="mt-2 text-xs leading-6 text-white/60">
                  R, Python, SPSS, SAS, Stata and reproducible workflows.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">
                  Research planning
                </p>
                <p className="mt-2 text-xs leading-6 text-white/60">
                  Method choice, interpretation, tables, figures and reporting.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/5 p-8 md:p-12 lg:border-l lg:border-t-0">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">
              Choose an action
            </p>

            <div className="mt-6 grid gap-3">
              <a
                href={withBasePath("/contact")}
                className="rounded-md bg-white px-6 py-4 text-center text-sm font-semibold text-neutral-950 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Submit requirement
              </a>

              <a
                href="mailto:contact@myacademictutor.com"
                className="rounded-md border border-white/15 bg-white/10 px-6 py-4 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                Email directly
              </a>

              <a
                href={withBasePath("/academic-integrity")}
                className="rounded-md border border-white/15 px-6 py-4 text-center text-sm font-semibold text-white/80 transition hover:bg-white/5 hover:text-white"
              >
                Read academic integrity policy
              </a>
            </div>

            <div className="mt-6 rounded-xl border border-[#ead8d8]/20 bg-[#fff8f6]/10 p-5">
              <p className="text-sm font-semibold text-white">
                Responsible support only
              </p>

              <p className="mt-2 text-sm leading-7 text-white/65">
                Support is designed to explain, guide and build confidence. It
                is not used for ghostwriting, impersonation or dishonest
                completion of assessed work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}