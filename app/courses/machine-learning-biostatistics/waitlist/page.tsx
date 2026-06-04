const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
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

export default function MachineLearningBiostatisticsWaitlistPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-5xl">
        <a
          href={withBasePath("/courses/machine-learning-biostatistics")}
          className="text-sm font-black text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to ML in Biostatistics course
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10 lg:p-12">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Machine Learning in Biostatistics · Waitlist
              </p>

              <h1 className="mt-5 text-4xl font-black leading-[1.03] tracking-[-0.055em] md:text-6xl">
                Join the waitlist for the full ML course.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                The full Machine Learning in Biostatistics course is being
                redesigned with advanced R labs, downloadable scripts, clinical
                prediction examples, visual outputs, interpretation reports and
                responsible reporting guidance.
              </p>

              <div className="mt-8 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5 md:p-6">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-neutral-500">
                  Waitlist form
                </p>

                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  Add your waitlist form embed or link here. For now, this page
                  works as the central destination for locked ML lessons.
                </p>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={withBasePath("/contact")}
                    className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#8b1116]"
                  >
                    Contact to join →
                  </a>

                  <a
                    href={withBasePath(
                      "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics"
                    )}
                    className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-black text-neutral-950 transition hover:-translate-y-0.5 hover:border-neutral-950"
                  >
                    Preview Lesson 1.1
                  </a>
                </div>
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-8 lg:border-l lg:border-t-0">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Planned release
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                July 2026
              </h2>

              <div className="mt-6 grid gap-3">
                {[
                  "Module 1 open preview",
                  "Advanced R workflow lessons",
                  "Clinical prediction examples",
                  "Downloadable scripts",
                  "Output-driven reports",
                  "Interactive interpretation labs",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 text-sm font-bold leading-6 text-white/75"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </section>
    </main>
  );
}
