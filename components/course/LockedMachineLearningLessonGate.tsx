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

type LockedMachineLearningLessonGateProps = {
  lessonCode: string;
  lessonTitle: string;
  moduleTitle: string;
};

export default function LockedMachineLearningLessonGate({
  lessonCode,
  lessonTitle,
  moduleTitle,
}: LockedMachineLearningLessonGateProps) {
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
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 md:p-10 lg:p-12">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Machine Learning in Biostatistics · Lesson {lessonCode}
              </p>

              <h1 className="mt-5 text-4xl font-black leading-[1.03] tracking-[-0.055em] md:text-6xl">
                {lessonTitle}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                This lesson is part of <strong>{moduleTitle}</strong>. It is
                currently locked while the full advanced version is being
                redesigned with R scripts, browser-based coding, visual outputs,
                interpretation reports and applied biostatistical examples.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(
                    "/courses/machine-learning-biostatistics/waitlist"
                  )}
                  className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#8b1116]"
                >
                  Join the waitlist →
                </a>

                <a
                  href={withBasePath(
                    "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics"
                  )}
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-black text-neutral-950 transition hover:-translate-y-0.5 hover:border-neutral-950"
                >
                  Open Lesson 1.1
                </a>
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-8 lg:border-l lg:border-t-0">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Coming July 2026
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Full advanced lesson release.
              </h2>

              <div className="mt-6 grid gap-3">
                {[
                  "Expanded lecture and detailed notes",
                  "Browser R coding lab",
                  "Downloadable R script",
                  "Script output interpretation",
                  "Clinical prediction report",
                  "Interactive visual explanation",
                  "Quiz and applied checks",
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
