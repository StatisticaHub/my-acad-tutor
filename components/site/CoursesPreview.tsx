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

const availableCourses = [
  {
    title: "Interactive Statistics Demos",
    area: "Statistics",
    body: "Use visual tools and calculators to explore confidence intervals, uncertainty, regression and statistical interpretation.",
    href: "/interactive-demos",
    cta: "Try demos",
  },
  {
    title: "Statistics and Biostatistics Resources",
    area: "Study guides",
    body: "Read detailed guides on p-values, confidence intervals, regression, probability, study design and data interpretation.",
    href: "/resources",
    cta: "Read resources",
  },
];

const upcomingCourses = [
  {
    title: "Statistics Foundation",
    area: "Statistics",
    status: "Full course open now",
    body: "5 modules and 26 theoretical lessons covering statistical thinking, probability, inference and regression. All modules and lessons are available for full study.",
    href: "/courses/statistics-foundation",
  },
  {
    title: "Biostatistics Foundation",
    area: "Biostatistics",
    status: "From September 2026",
    body: "A guided route through health data, study design, clinical interpretation and biomedical evidence. Releases from September 2026.",
  },
  {
    title: "Epidemiology and Study Designs",
    area: "Epidemiology",
    status: "From September 2026",
    body: "A structured pathway on cohort studies, case-control studies, bias, confounding and population evidence. Releases from September 2026.",
  },
  {
    title: "Regression Analysis",
    area: "Regression",
    status: "From September 2026",
    body: "A focused route through linear regression, logistic regression, assumptions, model checking and applied interpretation. Releases from September 2026.",
  },
  {
    title: "Survival Analysis",
    area: "Survival analysis",
    status: "From September 2026",
    body: "A clinical statistics route through time-to-event data, Kaplan-Meier curves, Cox models, hazards and censoring. Releases from September 2026.",
  },
  {
    title: "Machine Learning in Biostatistics",
    area: "Machine learning",
    status: "Preview open now",
    body: "A medical machine-learning pathway for prediction modelling, validation, calibration, interpretation and responsible clinical use. Lesson 1.1 is available now as a preview. The full pathway opens later.",
  },
];

export default function CoursesPreview() {
  return (
    <section className="bg-[#F7F3EA] px-5 py-10 text-[#141210] md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
              Courses
            </p>

            <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-6xl">
              Courses and upcoming learning routes.
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
              Statistics Foundation is fully open now. Machine Learning in
              Biostatistics has Lesson 1.1 available as a preview, with the
              full pathway opening in July 2026.
            </p>
          </div>

          <a
            href={withBasePath("/courses")}
            className="inline-flex w-fit items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#11100E] hover:text-white"
          >
            View all courses →
          </a>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018]">
                Available now
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] md:text-3xl">
                Start learning today.
              </h3>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {availableCourses.map((course) => (
              <article
                key={course.title}
                className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5 transition hover:-translate-y-1 hover:bg-[#FFFCF6]"
              >
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#741018]">
                  {course.area}
                </p>

                <h4 className="mt-3 text-2xl font-black tracking-[-0.04em]">
                  {course.title}
                </h4>

                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  {course.body}
                </p>

                <a
                  href={withBasePath(course.href)}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-[#11100E] px-5 py-3 text-sm font-black text-white transition hover:bg-[#741018]"
                >
                  {course.cta} →
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018]">
                Upcoming courses
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] md:text-3xl">
                Start learning for the next course releases.
              </h3>
            </div>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="inline-flex w-fit items-center justify-center rounded-full bg-[#11100E] px-5 py-3 text-sm font-black text-white transition hover:bg-[#741018]"
            >
              Start learning →
            </a>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingCourses.map((course) => (
              <article
                key={course.title}
                className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5 transition hover:-translate-y-1 hover:bg-[#FFFCF6]"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#741018]">
                    {course.area}
                  </p>

                  <span className="rounded-full border border-[#741018]/20 bg-[#FFFCF6] px-3 py-1 text-[0.7rem] font-black uppercase tracking-[0.14em] text-[#741018]">
                    {course.status}
                  </span>
                </div>

                <h4 className="mt-3 text-xl font-black tracking-[-0.04em]">
                  {course.title}
                </h4>

                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  {course.body}
                </p>

                <a
                  href={withBasePath(course.href ?? "/courses")}
                  className="mt-5 inline-flex items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#11100E] hover:text-white"
                >
                  Start learning →
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
