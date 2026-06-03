const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const subjects = [
  {
    number: "01",
    title: "Statistics",
    description:
      "Support with probability, descriptive statistics, inference, regression, hypothesis testing, multivariate methods and statistical interpretation.",
    points: ["Probability", "Inference", "Regression"],
  },
  {
    number: "02",
    title: "Biostatistics & Medical Statistics",
    description:
      "Guidance across epidemiology, survival analysis, clinical trials, diagnostic testing, health data methods and medical research interpretation.",
    points: ["Epidemiology", "Survival analysis", "Clinical trials"],
  },
  {
    number: "03",
    title: "Programming & Software",
    description:
      "Academic support with R, Python, SPSS, SAS and Stata for data analysis, reproducible workflows, code review and results reporting.",
    points: ["R and Python", "SPSS, SAS and Stata", "Debugging support"],
  },
  {
    number: "04",
    title: "Data Science",
    description:
      "Help with data cleaning, visualisation, machine learning foundations, prediction modelling, validation and responsible interpretation.",
    points: ["Data cleaning", "Visualisation", "Prediction modelling"],
  },
  {
    number: "05",
    title: "Bioinformatics",
    description:
      "Support with omics concepts, gene expression analysis, RNA-seq foundations, workflow planning and biological interpretation.",
    points: ["Omics concepts", "RNA-seq foundations", "Interpretation"],
  },
  {
    number: "06",
    title: "Research & Dissertation Support",
    description:
      "Guidance for dissertation planning, analysis strategy, method selection, results interpretation, tables, figures and academic reporting structure.",
    points: ["Study planning", "Method selection", "Results reporting"],
  },
];

const supportModes = [
  "Concept explanation",
  "Method selection",
  "Software guidance",
  "Interpretation support",
  "Revision planning",
  "Research structure",
];

export default function SubjectAreas() {
  return (
    <section className="bg-[#f7f4ee] px-5 py-10 !text-[#111111] md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Subject areas
              </p>

              <h2 className="mt-4 max-w-4xl font-sans text-3xl font-black leading-tight tracking-[-0.04em] md:text-5xl">
                Specialist support for quantitative academic work.
              </h2>
            </div>

            <div>
              <p className="max-w-4xl text-base leading-8 text-neutral-700">
                Support is organised by subject area so students can find
                guidance that matches their academic level, software needs and
                research context. The focus is on explanation, method choice,
                interpretation and responsible academic development.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath("/contact")}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#8b1116] px-6 py-3 text-sm font-black !text-white transition hover:-translate-y-0.5 hover:bg-[#711014] sm:w-auto"
                >
                  Request support
                </a>

                <a
                  href={withBasePath("/services")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-black !text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
                >
                  View services
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <article
              key={subject.title}
              className="group rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="font-sans text-3xl font-black tracking-[-0.05em] text-[#8b1116]">
                  {subject.number}
                </p>

                <span className="rounded-full bg-[#f7f4ee] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-neutral-700">
                  Support
                </span>
              </div>

              <h3 className="mt-5 font-sans text-2xl font-black leading-tight tracking-[-0.04em]">
                {subject.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {subject.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {subject.points.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-neutral-200 bg-[#f7f4ee] px-3 py-1.5 text-xs font-bold text-neutral-700 transition group-hover:border-[#8b1116]/30 group-hover:text-[#8b1116]"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 !text-[#111111] shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] !text-neutral-700">
              Academic integrity first
            </p>

            <h3 className="mt-4 font-sans text-3xl font-black leading-tight tracking-[-0.04em] md:text-4xl">
              Support is designed to help students understand, not outsource.
            </h3>

            <p className="mt-5 text-base leading-8 !text-neutral-700">
              Sessions can support concept explanation, software guidance,
              analysis planning, interpretation and revision. They are not used
              for ghostwriting, impersonation, dishonest completion of assessed
              work or changing results to fit a preferred conclusion.
            </p>

            <a
              href={withBasePath("/academic-integrity")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black !text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Read academic integrity →
            </a>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Support modes
            </p>

            <h3 className="mt-4 font-sans text-3xl font-black leading-tight tracking-[-0.04em] md:text-4xl">
              Guidance can be adapted to your level and goal.
            </h3>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {supportModes.map((mode) => (
                <div
                  key={mode}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold leading-6 text-neutral-700"
                >
                  {mode}
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}