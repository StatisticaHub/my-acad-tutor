const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}`;
}

const courses = [
  {
    title: "Statistics Foundation for University Students",
    tag: "Launching July 2026",
    href: "/courses/statistics-foundation",
    description:
      "A beginner-friendly, no-coding course for students who want to build strong foundations in statistical thinking, notation, probability, inference, regression and exam-style reasoning.",
    details: [
      ["Level", "Beginner to intermediate"],
      ["Format", "Lectures, detailed notes, interactive labs and quizzes"],
      ["Focus", "Theory, interpretation and mathematical understanding"],
    ],
  },
  {
    title: "Machine Learning in Biostatistics",
    tag: "Launching July 2026",
    href: "/courses/machine-learning-biostatistics",
    description:
      "A structured applied course connecting machine learning with medical statistics, clinical prediction modelling, validation, regularisation, survival analysis and biomedical data science.",
    details: [
      ["Level", "Intermediate to advanced"],
      ["Format", "Applied learning pathway with R-based examples"],
      ["Focus", "Prediction, validation and medical interpretation"],
    ],
  },
];

const upcoming = [
  {
    title: "R for Academic Data Analysis",
    description:
      "A practical pathway for students who need to clean, analyse, visualise and report academic data using R.",
  },
  {
    title: "Dissertation Data Analysis",
    description:
      "Guidance-focused support for planning analysis, choosing methods, interpreting results and structuring academic reports.",
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
    <section className="bg-[#f7f4ee] px-5 py-16 text-neutral-950 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              Learning Hub
            </p>

            <h2 className="font-serif-academic mt-3 text-4xl font-medium leading-tight tracking-[-0.025em] md:text-5xl">
              Structured courses for quantitative learning.
            </h2>
          </div>

          <p className="max-w-3xl text-base leading-8 text-neutral-600">
            My Academic Tutor is developing structured learning pathways for
            students who want clear explanations, strong foundations and
            applied quantitative understanding across statistics,
            biostatistics, data science and research methods.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.title}
              className="rounded-[1.25rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-8"
            >
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#8b1116]">
                {course.tag}
              </p>

              <h3 className="font-serif-academic mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em]">
                {course.title}
              </h3>

              <p className="mt-5 text-sm leading-7 text-neutral-600">
                {course.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={withBasePath(course.href)}
                  className="rounded-md bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Open course
                </a>

                <a
                  href={withBasePath("/contact")}
                  className="rounded-md border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:-translate-y-0.5"
                >
                  Register interest
                </a>
              </div>

              <dl className="mt-8 grid gap-3">
                {course.details.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-2 border-t border-neutral-200 pt-3 sm:grid-cols-[0.3fr_0.7fr]"
                  >
                    <dt className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                      {label}
                    </dt>

                    <dd className="text-sm leading-6 text-neutral-700">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[1.25rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#8b1116]">
                Upcoming pathways
              </p>

              <h3 className="font-serif-academic mt-3 text-3xl font-medium leading-tight tracking-[-0.02em]">
                More courses are being prepared.
              </h3>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600">
                Future pathways will support students who need structured
                learning in academic software, dissertation analysis and
                biomedical data analysis.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {upcoming.map((item) => (
                <div
                  key={item.title}
                  className="rounded-md border border-neutral-200 bg-[#f8f6f1] p-5"
                >
                  <p className="text-sm font-semibold text-neutral-950">
                    {item.title}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {item.description}
                  </p>

                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                    Planned
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[1.25rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-white/50">
                Platform approach
              </p>

              <h3 className="font-serif-academic mt-3 text-3xl font-medium leading-tight tracking-[-0.02em]">
                Built for clarity, interpretation and responsible learning.
              </h3>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75">
                The Learning Hub is designed to help students move from
                confusion to structure: first understanding the idea, then the
                notation, then the method, and finally the interpretation.
              </p>

              <a
                href={withBasePath("/learning-hub")}
                className="mt-6 inline-flex rounded-md bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:-translate-y-0.5"
              >
                Visit Learning Hub
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {platformPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-sm leading-6 text-white/80">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}