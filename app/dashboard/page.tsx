const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const progressCards = [
  {
    title: "Statistics Foundation",
    module: "Module 2",
    progress: "42%",
    action: "Continue descriptive statistics",
    href: "/courses/statistics-foundation",
  },
  {
    title: "ML in Biostatistics",
    module: "Module 1 complete",
    progress: "100%",
    action: "Review workflow lesson",
    href: "/courses/machine-learning-biostatistics/modules/foundations",
  },
  {
    title: "Resources",
    module: "5 flagship guides",
    progress: "Preparing",
    action: "Study public guides",
    href: "/resources",
  },
];

const savedLessons = [
  {
    title: "What is statistics?",
    course: "Statistics Foundation",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/what-is-statistics",
  },
  {
    title: "Training, testing, overfitting and generalisation",
    course: "Machine Learning in Biostatistics",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/training-testing-overfitting-generalisation",
  },
  {
    title: "Biostatistical ML workflow",
    course: "Machine Learning in Biostatistics",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/biostatistical-ml-workflow",
  },
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

const dashboardFeatures = [
  {
    title: "Course progress",
    text: "Future students will see module progress, lesson completion and recommended next steps.",
  },
  {
    title: "Saved learning",
    text: "Important lessons, guides and resources can be saved for quick review.",
  },
  {
    title: "Practice labs",
    text: "Coding and visual labs can be connected later for R, Python and interactive statistics.",
  },
  {
    title: "Certificates",
    text: "Completion records can be shown for courses once the certificate policy is finalised.",
  },
];

export default function DashboardPreviewPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-bold text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Student dashboard preview
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.05em] md:text-6xl">
                A preview of the future student learning dashboard.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                This is a static preview of the future My Academic Tutor student
                area. Login, progress tracking, course enrolment, certificates
                and paid access can be connected later.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                The purpose of this page is to show how the platform experience
                could feel once structured courses, saved lessons, interactive
                labs and completion records are connected.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Current status
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                Preview only. Login is not active yet.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                This dashboard is a design preview for the platform direction.
                It does not currently store student data, payments, progress or
                certificates.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath("/learning-hub")}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 sm:w-auto"
            >
              Open Learning Hub
            </a>

            <a
              href={withBasePath("/courses")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              View courses
            </a>

            <a
              href={withBasePath("/pricing")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-[#f7f4ee] px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              View pricing preview
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Preview", "Static dashboard"],
              ["Coming soon", "Login and progress"],
              ["Courses", "Learning pathways"],
              ["Certificates", "Policy-based records"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="font-sans text-2xl font-black tracking-[-0.04em] text-[#111111]">
                  {value}
                </p>
                <p className="mt-2 text-sm font-bold text-neutral-600">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dashboardFeatures.map((feature) => (
            <article
              key={feature.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h2 className="font-sans text-xl font-black tracking-[-0.035em]">
                {feature.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {feature.text}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Welcome back
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Continue your quantitative learning pathway.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              The future dashboard will bring together enrolled courses, saved
              lessons, resource guides, coding labs, quizzes and certificates.
            </p>

            <div className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-[#f7f4ee] p-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-neutral-500">
                Continue learning
              </p>

              <h3 className="mt-3 font-sans text-2xl font-black tracking-[-0.04em]">
                Machine Learning in Biostatistics · Module 1
              </h3>

              <p className="mt-3 text-sm leading-7 text-neutral-700">
                Foundations are complete. Next recommended step: supervised
                learning for clinical and health data.
              </p>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-neutral-200">
                <div className="h-full w-full rounded-full bg-[#8b1116]" />
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(
                    "/courses/machine-learning-biostatistics/modules/foundations"
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 sm:w-auto"
                >
                  Review module →
                </a>

                <a
                  href={withBasePath("/courses/machine-learning-biostatistics")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
                >
                  Open course
                </a>
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
              Coding lab preview
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              R and Python labs will appear here.
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/70">
              Future dashboard versions can show WebR labs, Pyodide Python
              exercises, saved code, output panels and downloadable scripts.
            </p>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 font-mono text-xs leading-7 text-white/70">
              {`# Coming soon
run_lesson_lab("logistic-regression")
view_progress()
download_notes()`}
            </div>

            <a
              href={withBasePath("/interactive-demos")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Try interactive demos →
            </a>
          </article>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {progressCards.map((card) => (
            <a
              key={card.title}
              href={withBasePath(card.href)}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
                {card.module}
              </p>

              <h3 className="mt-3 font-sans text-xl font-black tracking-[-0.035em]">
                {card.title}
              </h3>

              <p className="mt-4 font-sans text-3xl font-black tracking-[-0.05em] text-[#8b1116]">
                {card.progress}
              </p>

              <p className="mt-3 text-sm leading-6 text-neutral-700">
                {card.action}
              </p>

              <p className="mt-5 text-sm font-black text-[#8b1116]">
                Open →
              </p>
            </a>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Saved lessons
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em]">
              Continue from saved learning.
            </h2>

            <div className="mt-6 grid gap-3">
              {savedLessons.map((lesson) => (
                <a
                  key={lesson.title}
                  href={withBasePath(lesson.href)}
                  className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:bg-white"
                >
                  <h3 className="font-sans text-lg font-black tracking-[-0.03em]">
                    {lesson.title}
                  </h3>

                  <p className="mt-2 text-sm font-bold text-neutral-500">
                    {lesson.course}
                  </p>

                  <p className="mt-4 text-sm font-black text-[#8b1116]">
                    Open saved lesson →
                  </p>
                </a>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Certificate placeholder
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em]">
              Completion records can appear here.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              Certificates will be used only for course completion records, not
              as university credit or professional accreditation. The final
              policy page should remain visible before launch.
            </p>

            <div className="mt-6 rounded-[1.75rem] border border-dashed border-[#8b1116]/40 bg-[#f8e9ea] p-6 text-center">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Certificate preview
              </p>

              <p className="mt-4 font-sans text-3xl font-black tracking-[-0.04em]">
                Statistics Foundation
              </p>

              <p className="mt-2 text-sm font-bold text-neutral-700">
                Completion record · Coming soon
              </p>
            </div>

            <a
              href={withBasePath("/certificate-policy")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 sm:w-auto"
            >
              Read certificate policy →
            </a>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Recommended next courses
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Continue with a structured pathway.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              These course cards show how recommendations may appear once the
              future dashboard is connected to enrolment and progress data.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {recommendedCourses.map((course) => (
              <a
                key={course.title}
                href={withBasePath(course.href)}
                className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-sm"
              >
                <h3 className="font-sans text-2xl font-black tracking-[-0.04em]">
                  {course.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {course.body}
                </p>

                <p className="mt-5 text-sm font-black text-[#8b1116]">
                  Open pathway →
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/60">
            Platform direction
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="max-w-3xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
                The dashboard will support structured learning, not replace
                guidance.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/75">
                The full version can later include student accounts, enrolled
                courses, progress analytics, saved notes, course certificates
                and premium access once payments and authentication are ready.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href={withBasePath("/contact")}
                className="rounded-full bg-white px-6 py-4 text-center text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
              >
                Register interest
              </a>

              <a
                href={withBasePath("/pricing")}
                className="rounded-full border border-white/25 bg-white/10 px-6 py-4 text-center text-sm font-black text-white transition hover:-translate-y-0.5"
              >
                View pricing preview
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}