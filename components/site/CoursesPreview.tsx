const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

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
    <section className="bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              Courses and platform preview
            </p>

            <h2 className="font-serif-academic mt-3 text-4xl font-medium leading-tight tracking-[-0.025em] md:text-5xl">
              Structured courses for quantitative learning.
            </h2>
          </div>

          <p className="max-w-3xl text-base leading-8 text-neutral-600">
            My Academic Tutor is developing structured learning pathways for
            students who want clear explanations, strong foundations and applied
            quantitative understanding across statistics, biostatistics, data
            science and research methods.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.title}
              className={`rounded-[1.75rem] border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-8 ${
                course.dark
                  ? "border-neutral-950 bg-neutral-950 text-white"
                  : "border-neutral-200 bg-white text-neutral-950"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${
                    course.dark
                      ? "bg-white text-[#8b1116]"
                      : "bg-[#f8e9ea] text-[#8b1116]"
                  }`}
                >
                  {course.tag}
                </span>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-bold ${
                    course.dark
                      ? "border-white/15 text-white/65"
                      : "border-neutral-200 text-neutral-500"
                  }`}
                >
                  {course.status}
                </span>
              </div>

              <h3 className="font-serif-academic mt-5 text-3xl font-medium leading-tight tracking-[-0.03em] md:text-4xl">
                {course.title}
              </h3>

              <p
                className={`mt-5 text-sm leading-7 ${
                  course.dark ? "text-white/70" : "text-neutral-600"
                }`}
              >
                {course.description}
              </p>

              <div className="mt-6 grid gap-3">
                {course.details.map(([label, value]) => (
                  <div
                    key={label}
                    className={`rounded-2xl border p-4 ${
                      course.dark
                        ? "border-white/10 bg-white/5"
                        : "border-neutral-200 bg-[#f8f6f1]"
                    }`}
                  >
                    <p
                      className={`text-xs font-black uppercase tracking-[0.18em] ${
                        course.dark ? "text-white/45" : "text-neutral-500"
                      }`}
                    >
                      {label}
                    </p>
                    <p
                      className={`mt-2 text-sm font-semibold leading-6 ${
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
                className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-black transition hover:-translate-y-0.5 sm:w-auto ${
                  course.dark
                    ? "bg-white text-neutral-950"
                    : "bg-[#8b1116] text-white"
                }`}
              >
                {course.cta} →
              </a>
            </article>
          ))}
        </div>

        <section className="mt-8 rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
                Platform proof
              </p>

              <h3 className="font-serif-academic mt-3 text-3xl font-medium leading-tight tracking-[-0.025em] md:text-4xl">
                More than course pages.
              </h3>

              <p className="mt-4 text-sm leading-7 text-neutral-600">
                The platform now includes preview routes for demos, pricing and
                the future student dashboard. These pages help visitors see the
                direction of the learning experience before login and payments
                are added.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {platformCards.map((card) => (
                <a
                  key={card.href}
                  href={withBasePath(card.href)}
                  className="rounded-[1.35rem] border border-neutral-200 bg-[#f8f6f1] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-sm"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b1116]">
                    {card.label}
                  </p>

                  <h4 className="mt-3 text-xl font-black tracking-[-0.03em]">
                    {card.title}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-neutral-600">
                    {card.description}
                  </p>

                  <p className="mt-5 text-sm font-black text-[#8b1116]">
                    Open →
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              Preparing next
            </p>

            <h3 className="font-serif-academic mt-3 text-3xl font-medium leading-tight tracking-[-0.025em] md:text-4xl">
              Future learning pathways.
            </h3>

            <div className="mt-6 grid gap-4">
              {upcoming.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.25rem] border border-neutral-200 bg-[#f8f6f1] p-5"
                >
                  <h4 className="text-lg font-black tracking-[-0.02em]">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-sm leading-7 text-neutral-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-neutral-950 p-6 text-white shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#9fd0ff]">
              Learning principles
            </p>

            <h3 className="font-serif-academic mt-3 text-3xl font-medium leading-tight tracking-[-0.025em] md:text-4xl">
              Built around responsible academic support.
            </h3>

            <div className="mt-6 grid gap-3">
              {platformPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-sm font-semibold leading-6 text-white/75">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <a
                href={withBasePath("/learning-hub")}
                className="rounded-full bg-white px-5 py-3 text-center text-sm font-black text-neutral-950 transition hover:-translate-y-0.5"
              >
                Open Learning Hub
              </a>

              <a
                href={withBasePath("/contact")}
                className="rounded-full border border-white/15 px-5 py-3 text-center text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Request support
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
