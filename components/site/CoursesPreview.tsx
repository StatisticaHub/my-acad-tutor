const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const courses = [
  {
    title: "Statistics Foundation for University Students",
    tag: "Available",
    status: "5 modules · 26 lessons",
    href: "/courses/statistics-foundation",
    description:
      "A beginner-friendly, zero-coding course for students who want strong foundations in statistical thinking, notation, probability, inference, regression and exam-style reasoning.",
    details: [
      ["Level", "Beginner to intermediate"],
      ["Format", "Lectures, notes, visual labs and quizzes"],
      ["Focus", "Theory, interpretation and mathematical understanding"],
    ],
    cta: "Open Statistics Foundation",
    dark: false,
  },
  {
    title: "Machine Learning in Biostatistics",
    tag: "Module 1 available",
    status: "Health data · prediction modelling",
    href: "/courses/machine-learning-biostatistics",
    description:
      "A structured applied course connecting machine learning with medical statistics, clinical prediction modelling, validation, overfitting, leakage and biomedical interpretation.",
    details: [
      ["Level", "Intermediate"],
      ["Format", "Conversational lessons, notes, labs and quizzes"],
      ["Focus", "Prediction, validation and responsible reporting"],
    ],
    cta: "Open ML course",
    dark: true,
  },
];

const platformCards = [
  {
    title: "Interactive demos",
    label: "Visual learning",
    href: "/interactive-demos",
    description:
      "Try demos for normal distributions, regression lines and confidence intervals.",
  },
  {
    title: "Dashboard preview",
    label: "Coming soon",
    href: "/dashboard",
    description:
      "Preview the future student dashboard with progress, saved lessons and certificate placeholders.",
  },
  {
    title: "Pricing preview",
    label: "No Stripe yet",
    href: "/pricing",
    description:
      "View the planned free, premium course, 1-to-1 support and institution support structure.",
  },
];

const upcoming = [
  {
    title: "R for Academic Data Analysis",
    description:
      "A practical pathway for cleaning, analysing, visualising and reporting academic data using R.",
  },
  {
    title: "Dissertation Data Analysis",
    description:
      "Guidance for planning analysis, choosing methods, interpreting results and structuring academic reports.",
  },
  {
    title: "Bioinformatics and Omics Data Analysis",
    description:
      "A future pathway covering omics concepts, expression analysis, workflows and biological interpretation.",
  },
];

const platformPoints = [
  "Clear explanations before technical detail",
  "Guidance-based support, not assignment completion",
  "Structured lessons with visual and interactive learning",
  "Focused on statistics, biostatistics, data science and research methods",
];

export default function CoursesPreview() {
  return (
    <section className="bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Courses and platform preview
              </p>

              <h2 className="mt-4 max-w-4xl text-balance font-sans text-3xl font-black leading-tight tracking-[-0.04em] md:text-5xl">
                Structured courses for quantitative learning.
              </h2>
            </div>

            <p className="max-w-4xl text-pretty text-base leading-8 text-neutral-700">
              My Academic Tutor is developing structured learning pathways for
              students who want clear explanations, strong foundations and
              applied quantitative understanding across statistics,
              biostatistics, data science and research methods.
            </p>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.title}
              className={`rounded-[2rem] border p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:p-8 ${
                course.dark
                  ? "border-[#111111] bg-[#111111] text-white"
                  : "border-neutral-200 bg-white text-[#111111]"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.18em] ${
                    course.dark
                      ? "bg-white text-[#8b1116]"
                      : "bg-[#f7f4ee] text-[#8b1116]"
                  }`}
                >
                  {course.tag}
                </span>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-black ${
                    course.dark
                      ? "border-white/15 text-white/90"
                      : "border-neutral-200 text-neutral-500"
                  }`}
                >
                  {course.status}
                </span>
              </div>

              <h3 className="mt-6 max-w-2xl text-balance font-sans text-3xl font-black leading-tight tracking-[-0.04em] md:text-4xl">
                {course.title}
              </h3>

              <p
                className={`mt-5 text-pretty text-base leading-8 ${
                  course.dark ? "text-white/90" : "text-neutral-700"
                }`}
              >
                {course.description}
              </p>

              <div className="mt-6 grid gap-3">
                {course.details.map(([label, value]) => (
                  <div
                    key={label}
                    className={`rounded-2xl border px-4 py-3 ${
                      course.dark
                        ? "border-white/10 bg-white/5"
                        : "border-neutral-200 bg-[#f7f4ee]"
                    }`}
                  >
                    <p
                      className={`text-xs font-black uppercase tracking-[0.18em] ${
                        course.dark ? "text-white/75" : "text-neutral-500"
                      }`}
                    >
                      {label}
                    </p>

                    <p
                      className={`mt-1 text-sm font-bold leading-6 ${
                        course.dark ? "text-white/80" : "text-neutral-700"
                      }`}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href={withBasePath(course.href)}
                className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-black transition hover:-translate-y-0.5 ${
                  course.dark
                    ? "bg-white text-[#111111] hover:bg-[#f7f4ee]"
                    : "bg-[#8b1116] text-white hover:bg-[#711014]"
                }`}
              >
                {course.cta} →
              </a>
            </article>
          ))}
        </div>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Platform features
            </p>

            <h2 className="mt-4 text-balance font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              More than a course list.
            </h2>

            <p className="mt-5 text-pretty text-base leading-8 text-neutral-700">
              The platform is being built as a learning ecosystem with public
              guides, structured courses, visual demos, dashboard previews and
              responsible academic support.
            </p>

            <div className="mt-6 grid gap-3">
              {platformPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold leading-6 text-neutral-700"
                >
                  {point}
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-4">
            {platformCards.map((card) => (
              <a
                key={card.href}
                href={withBasePath(card.href)}
                className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-balance font-sans text-2xl font-black tracking-[-0.04em]">
                    {card.title}
                  </h3>

                  <span className="rounded-full bg-[#f7f4ee] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#8b1116]">
                    {card.label}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {card.description}
                </p>

                <p className="mt-5 text-sm font-black text-[#8b1116]">
                  Open →
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Upcoming pathways
              </p>

              <h2 className="mt-4 text-balance font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
                More subject routes can be added after launch.
              </h2>

              <p className="mt-5 text-pretty text-base leading-8 text-neutral-700">
                The current priority is to polish the public platform,
                Statistics Foundation, Machine Learning in Biostatistics,
                resources and interactive demos.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {upcoming.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.75rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                >
                  <h3 className="text-balance font-sans text-xl font-black tracking-[-0.03em]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-neutral-700">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath("/courses")}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-black sm:w-auto"
            >
              View all courses
            </a>

            <a
              href={withBasePath("/learning-hub")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 hover:border-[#8b1116] hover:text-[#8b1116] sm:w-auto"
            >
              Open Learning Hub
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}