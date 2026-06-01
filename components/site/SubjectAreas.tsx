const subjects = [
  {
    title: "Statistics",
    description:
      "Probability, inference, regression, hypothesis testing, multivariate methods and applied statistical analysis.",
  },
  {
    title: "Biostatistics & Medical Statistics",
    description:
      "Medical statistics, epidemiology, survival analysis, clinical trials, diagnostic testing and health data methods.",
  },
  {
    title: "Programming & software",
    description:
      "R, Python, SPSS, SAS and Stata for academic analysis, coursework, projects and reproducible reporting.",
  },
  {
    title: "Data science",
    description:
      "Data cleaning, visualisation, machine learning foundations, prediction modelling and interpretation.",
  },
  {
    title: "Bioinformatics",
    description:
      "Omics concepts, gene expression analysis, RNA-seq foundations, Bioconductor workflows and biological interpretation.",
  },
  {
    title: "Research support",
    description:
      "Dissertation planning, analysis strategy, results interpretation, tables, figures and academic reporting.",
  },
];

export default function SubjectAreas() {
  return (
    <section className="bg-white px-5 py-16 text-neutral-950 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              Subject areas
            </p>

            <h2 className="font-serif-academic mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              Focused academic support, matched by subject.
            </h2>
          </div>

          <div>
            <p className="max-w-2xl text-sm leading-7 text-neutral-600">
              Our support is organised by subject area, so students receive
              guidance from tutors with relevant academic and technical
              experience.
            </p>

            <a
              href="/contact"
              className="mt-5 inline-flex rounded-md bg-[#8b1116] px-5 py-3 text-sm font-semibold text-white"
            >
              Request support
            </a>
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[1.25rem] border border-neutral-200 bg-neutral-200 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <article key={subject.title} className="bg-white p-6 md:p-7">
              <h3 className="font-serif-academic text-2xl font-semibold tracking-tight">
                {subject.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-neutral-600">
                {subject.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}