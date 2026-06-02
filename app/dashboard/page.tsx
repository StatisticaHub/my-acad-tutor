const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;
  return `${basePath}${href}/`;
}

const progressCards = [
  ["Statistics Foundation", "Module 2", "42%", "Continue descriptive statistics"],
  ["ML in Biostatistics", "Module 1 complete", "100%", "Review workflow lesson"],
  ["Resources", "5 flagship guides", "Preparing", "Study public guides"],
];

const savedLessons = [
  "What is statistics?",
  "Training, testing, overfitting and generalisation",
  "Biostatistical ML workflow",
];

const recommendedCourses = [
  {
    title: "Statistics Foundation",
    body: "Zero-coding theoretical statistics pathway for university students.",
    href: "/courses/statistics-foundation",
  },
  {
    title: "Machine Learning in Biostatistics",
    body: "Health-data prediction, validation, thresholds and reporting discipline.",
    href: "/courses/machine-learning-biostatistics",
  },
  {
    title: "R and Python for Academic Data Analysis",
    body: "Planned practical coding pathway for quantitative research workflows.",
    href: "/courses",
  },
];

export default function DashboardPreviewPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-slate-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-black text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to home
        </a>

        <section className="mt-8 rounded-[2rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8b1116]">
            Student dashboard preview
          </p>

          <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-[-0.04em] md:text-6xl">
            A preview of the future student learning dashboard.
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
            This is a static preview for the July 2026 platform direction. Login,
            progress tracking, certificates and paid course access will be
            connected later. For launch, the goal is to show how the platform
            experience will feel.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Preview", "Coming soon", "July 2026", "Login not active yet"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full bg-[#f8e9ea] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#8b1116]"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Welcome back
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.035em]">
              Continue your quantitative learning pathway.
            </h2>
            <p className="mt-4 text-base leading-8 text-neutral-700">
              Your dashboard will bring together enrolled courses, saved lessons,
              resource guides, coding labs, quizzes and certificates.
            </p>

            <div className="mt-6 rounded-[1.5rem] border border-[#ded9cf] bg-[#fbfaf7] p-5">
              <p className="text-sm font-black text-neutral-500">
                Continue learning
              </p>
              <h3 className="mt-2 text-2xl font-black">
                Machine Learning in Biostatistics · Module 1
              </h3>
              <p className="mt-3 text-sm leading-7 text-neutral-700">
                Foundations are complete. Next recommended step: supervised
                learning for clinical and health data.
              </p>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-neutral-200">
                <div className="h-full w-full rounded-full bg-[#8b1116]" />
              </div>
              <a
                href={withBasePath(
                  "/courses/machine-learning-biostatistics/modules/foundations"
                )}
                className="mt-5 inline-flex rounded-full bg-[#111111] px-5 py-3 text-sm font-black text-white"
              >
                Review module
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#050505] p-6 text-white shadow-sm md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9fd0ff]">
              Coding lab preview
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.035em]">
              R and Python labs will appear here.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Future dashboard versions can show WebR labs, Pyodide Python
              exercises, saved code, output panels and downloadable scripts.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 font-mono text-xs leading-6 text-white/70">
              {`# Coming soon
run_lesson_lab("logistic-regression")
view_progress()
download_notes()`}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {progressCards.map(([title, module, progress, action]) => (
            <article
              key={title}
              className="rounded-[1.75rem] border border-[#ded9cf] bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-500">
                {module}
              </p>
              <h3 className="mt-3 text-xl font-black">{title}</h3>
              <p className="mt-3 text-3xl font-black text-[#8b1116]">
                {progress}
              </p>
              <p className="mt-3 text-sm leading-6 text-neutral-700">
                {action}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-black tracking-[-0.03em]">
              Saved lessons
            </h2>
            <div className="mt-5 space-y-3">
              {savedLessons.map((lesson) => (
                <div
                  key={lesson}
                  className="rounded-2xl border border-[#ded9cf] bg-[#fbfaf7] p-4"
                >
                  <p className="font-black">{lesson}</p>
                  <p className="mt-1 text-sm text-neutral-600">
                    Saved lesson preview
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-black tracking-[-0.03em]">
              Certificate placeholder
            </h2>
            <p className="mt-4 text-base leading-8 text-neutral-700">
              Certificates will be used only for course completion records, not
              as university credit or professional accreditation. The final
              policy page should remain visible before launch.
            </p>
            <div className="mt-6 rounded-[1.5rem] border border-dashed border-[#8b1116]/40 bg-[#f8e9ea] p-6 text-center">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Certificate preview
              </p>
              <p className="mt-3 text-2xl font-black">
                Statistics Foundation
              </p>
              <p className="mt-2 text-sm text-neutral-700">
                Completion record · Coming soon
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-black tracking-[-0.03em]">
            Recommended next courses
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {recommendedCourses.map((course) => (
              <a
                key={course.title}
                href={withBasePath(course.href)}
                className="rounded-[1.5rem] border border-[#ded9cf] bg-[#fbfaf7] p-5 transition hover:-translate-y-1 hover:bg-white"
              >
                <h3 className="text-xl font-black">{course.title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  {course.body}
                </p>
                <p className="mt-4 text-sm font-black text-[#8b1116]">
                  Open pathway →
                </p>
              </a>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
