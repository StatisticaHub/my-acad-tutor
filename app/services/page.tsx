const services = [
  {
    title: "Statistics support",
    description:
      "Guidance with probability, descriptive statistics, inference, hypothesis testing, regression, multivariate methods and interpretation.",
    examples: [
      "Understanding statistical concepts",
      "Choosing suitable methods",
      "Interpreting results and assumptions",
      "Preparing for exams and coursework topics",
    ],
  },
  {
    title: "Biostatistics & medical statistics",
    description:
      "Support for students and researchers working with health data, epidemiology, survival analysis, clinical trials and medical research methods.",
    examples: [
      "Survival analysis concepts",
      "Epidemiological measures",
      "Clinical trial methods",
      "Health data interpretation",
    ],
  },
  {
    title: "Programming & statistical software",
    description:
      "Guidance with R, Python, SPSS, SAS and Stata for academic analysis, reproducible workflows and statistical reporting.",
    examples: [
      "Code walkthroughs",
      "Debugging support",
      "Data cleaning logic",
      "Reproducible analysis structure",
    ],
  },
  {
    title: "Dissertation and research support",
    description:
      "Structured guidance for research questions, study design, variables, analysis plans, tables, figures and interpretation.",
    examples: [
      "Research question refinement",
      "Variable planning",
      "Analysis strategy",
      "Results interpretation",
    ],
  },
  {
    title: "Data science and machine learning",
    description:
      "Support with data preparation, visualisation, prediction modelling, validation, model evaluation and responsible interpretation.",
    examples: [
      "Prediction versus inference",
      "Model validation",
      "Performance metrics",
      "Machine learning foundations",
    ],
  },
  {
    title: "Bioinformatics and omics",
    description:
      "Guidance with biological data analysis concepts, omics workflows, gene expression analysis and computational interpretation.",
    examples: [
      "RNA-seq foundations",
      "Omics data interpretation",
      "Bioinformatics workflow planning",
      "Biological meaning of results",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-20">
      <section className="mx-auto max-w-7xl">
        <a href="/" className="text-sm font-semibold text-[#8b1116]">
          ← Back to homepage
        </a>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              Services
            </p>

            <h1 className="font-serif-academic mt-4 text-3xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-4xl md:text-7xl">
              Academic support for quantitative learning and research.
            </h1>
          </div>

          <p className="max-w-3xl text-base leading-8 text-neutral-600 md:text-lg">
            My Academic Tutor provides guidance-based academic support across
            statistics, biostatistics, programming, data science,
            bioinformatics and research methods. The focus is understanding,
            interpretation and responsible learning.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[1.25rem] border border-neutral-200 bg-neutral-200 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="bg-white p-6 md:p-7">
              <h2 className="font-serif-academic text-3xl font-semibold tracking-tight">
                {service.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-600">
                {service.description}
              </p>

              <ul className="mt-5 space-y-2 text-sm leading-6 text-neutral-700">
                {service.examples.map((item) => (
                  <li key={item} className="border-t border-neutral-200 pt-2">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[1.25rem] border border-neutral-200 bg-neutral-950 p-8 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">
            Academic integrity
          </p>

          <h2 className="font-serif-academic mt-3 text-4xl font-semibold tracking-tight">
            Support is guidance-based.
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-white/70">
            We help students understand concepts, software, methods and
            interpretation. We do not complete assessed work, write assignments,
            submit work, impersonate students or support academic misconduct.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-flex rounded-md bg-white px-6 py-3 text-sm font-semibold text-neutral-950"
          >
            Request support
          </a>
        </div>
      </section>
    </main>
  );
}
