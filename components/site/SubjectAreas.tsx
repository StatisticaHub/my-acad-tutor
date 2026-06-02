const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}`;
}

const subjects = [
  {
    title: "Statistics",
    description:
      "Support with probability, descriptive statistics, inference, regression, hypothesis testing, multivariate methods and statistical interpretation.",
    points: ["Probability", "Inference", "Regression"],
  },
  {
    title: "Biostatistics & Medical Statistics",
    description:
      "Guidance across epidemiology, survival analysis, clinical trials, diagnostic testing, health data methods and medical research interpretation.",
    points: ["Epidemiology", "Survival analysis", "Clinical trials"],
  },
  {
    title: "Programming & Software",
    description:
      "Academic support with R, Python, SPSS, SAS and Stata for data analysis, reproducible workflows, code review and results reporting.",
    points: ["R and Python", "SPSS, SAS and Stata", "Debugging support"],
  },
  {
    title: "Data Science",
    description:
      "Help with data cleaning, visualisation, machine learning foundations, prediction modelling, validation and responsible interpretation.",
    points: ["Data cleaning", "Visualisation", "Prediction modelling"],
  },
  {
    title: "Bioinformatics",
    description:
      "Support with omics concepts, gene expression analysis, RNA-seq foundations, workflow planning and biological interpretation.",
    points: ["Omics concepts", "RNA-seq foundations", "Interpretation"],
  },
  {
    title: "Research & Dissertation Support",
    description:
      "Guidance for dissertation planning, analysis strategy, method selection, results interpretation, tables, figures and academic reporting structure.",
    points: ["Study planning", "Method selection", "Results reporting"],
  },
];

export default function SubjectAreas() {
  return (
    <section className="bg-white px-5 py-16 text-neutral-950 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              Subject areas
            </p>

            <h2 className="font-serif-academic mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              Specialist support for quantitative academic work.
            </h2>
          </div>

          <div>
            <p className="max-w-3xl text-sm leading-7 text-neutral-600">
              Support is organised by subject area so students can find guidance
              that matches their academic level, software needs and research
              context. The focus is on explanation, method choice,
              interpretation and responsible academic development.
            </p>

            <a
              href={withBasePath("/contact")}
              className="mt-5 inline-flex rounded-md bg-[#8b1116] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Request support
            </a>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <article
              key={subject.title}
              className="rounded-[1.25rem] border border-neutral-200 bg-[#f8f6f1] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-sm md:p-7"
            >
              <h3 className="font-serif-academic text-2xl font-medium tracking-[-0.015em]">
                {subject.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-neutral-600">
                {subject.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {subject.points.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-600"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[1.25rem] border border-neutral-200 bg-neutral-950 p-6 text-white md:p-8">
          <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-white/50">
                Academic integrity first
              </p>

              <h3 className="font-serif-academic mt-3 text-3xl font-medium leading-tight tracking-[-0.02em]">
                Support is designed to help students understand, not outsource.
              </h3>
            </div>

            <p className="text-sm leading-7 text-white/75">
              Sessions can support concept explanation, software guidance,
              analysis planning, interpretation and revision. They are not used
              for ghostwriting, impersonation, dishonest completion of assessed
              work or changing results to fit a preferred conclusion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}