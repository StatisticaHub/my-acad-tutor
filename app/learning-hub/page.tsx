const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const mainRoutes = [
  {
    label: "Courses",
    title: "Structured course pathways",
    description:
      "Explore Statistics Foundation and Machine Learning in Biostatistics. Full lesson content opens with the July 2026 release.",
    href: "/courses",
    cta: "View courses",
  },
  {
    label: "Resources",
    title: "Focused study guides",
    description:
      "Use short guides for statistics, biostatistics, research planning, software learning and interpretation support.",
    href: "/resources",
    cta: "Browse resources",
  },
  {
    label: "Interactive demos",
    title: "Visual learning tools",
    description:
      "Try selected interactive demonstrations for key statistical ideas and model-based thinking.",
    href: "/interactive-demos",
    cta: "Open demos",
  },
];

const courseRoutes = [
  {
    title: "Statistics Foundation",
    description:
      "A zero-coding theoretical course for statistical thinking, probability, inference and regression foundations.",
    href: "/courses/statistics-foundation",
    status: "Preview open",
  },
  {
    title: "Machine Learning in Biostatistics",
    description:
      "A structured pathway for prediction modelling, validation, calibration and responsible health-data machine learning.",
    href: "/courses/machine-learning-biostatistics",
    status: "Preview open",
  },
];

export default function LearningHubPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Learning Hub
          </p>

          <h1 className="mt-5 max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl md:text-7xl">
            Start with the right learning route.
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
            The Learning Hub brings together course previews, study resources and
            interactive demos for statistics, biostatistics, data science, programming,
            research methods and quantitative academic development.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath("/courses")}
              className="inline-flex items-center justify-center rounded-full bg-[#8b1116] px-6 py-4 text-sm font-black text-white transition hover:bg-[#6f0d12]"
            >
              View courses →
            </a>

            <a
              href={withBasePath("/resources")}
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-neutral-950 transition hover:bg-neutral-50"
            >
              Browse resources →
            </a>

            <a
              href={withBasePath("/contact")}
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-neutral-950 transition hover:bg-neutral-50"
            >
              Request support →
            </a>
          </div>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          {mainRoutes.map((route) => (
            <a
              key={route.title}
              href={withBasePath(route.href)}
              className="group rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-8"
            >
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                {route.label}
              </p>

              <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em]">
                {route.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {route.description}
              </p>

              <p className="mt-6 text-sm font-black text-[#8b1116]">
                {route.cta} →
              </p>
            </a>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Course previews
          </p>

          <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
            Two structured pathways are open for preview.
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
            Course homepages, module outlines and lesson pathways are public now.
            Full lessons, notes, labs, worked examples and quizzes open in July 2026.
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {courseRoutes.map((course) => (
              <a
                key={course.title}
                href={withBasePath(course.href)}
                className="rounded-[1.75rem] border border-neutral-200 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:p-6"
              >
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#8b1116]">
                  {course.status}
                </span>

                <h3 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                  {course.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  {course.description}
                </p>

                <p className="mt-5 text-sm font-black text-[#8b1116]">
                  Open course preview →
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/60">
              July 2026 release
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Full course content is currently hidden.
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/75 md:text-base md:leading-8">
              This soft-launch version shows the structure of the platform without
              releasing the full lesson materials. Premium access details will be added
              closer to release.
            </p>

            <a
              href={withBasePath("/pricing")}
              className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-neutral-950 transition hover:bg-[#f7f4ee]"
            >
              View access status →
            </a>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Need guidance?
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Send a focused support request.
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              If you are unsure which route fits your topic, send your subject area,
              academic level, method, software and deadline.
            </p>

            <a
              href={withBasePath("/contact")}
              className="mt-7 inline-flex items-center justify-center rounded-full bg-[#8b1116] px-6 py-4 text-sm font-black text-white transition hover:bg-[#6f0d12]"
            >
              Request support →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}
