const resources = [
  {
    title: "Statistics study guides",
    status: "Preparing",
    description:
      "Short guides on statistical concepts, notation, inference, regression and interpretation.",
  },
  {
    title: "Biostatistics notes",
    status: "Preparing",
    description:
      "Learning notes for medical statistics, survival analysis, epidemiology and clinical research methods.",
  },
  {
    title: "Research planning checklists",
    status: "Preparing",
    description:
      "Practical checklists for research questions, variables, methods, tables, figures and interpretation.",
  },
  {
    title: "Software learning notes",
    status: "Preparing",
    description:
      "Guides for R, Python, SPSS, SAS and Stata workflows used in academic analysis.",
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-16 text-neutral-950 md:px-8 md:py-20">
      <section className="mx-auto max-w-7xl">
        <a href="/" className="text-sm font-semibold text-[#8b1116]">
          ← Back to homepage
        </a>

        <div className="mt-10 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
            Resources
          </p>

          <h1 className="font-serif-academic mt-4 text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
            Study resources for quantitative subjects.
          </h1>

          <p className="mt-6 text-base leading-8 text-neutral-600 md:text-lg">
            This section will contain short guides, learning notes, checklists
            and interpretation resources for statistics, biostatistics, data
            science, programming and research methods.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[1.25rem] border border-neutral-200 bg-neutral-200 md:grid-cols-2">
          {resources.map((resource) => (
            <article key={resource.title} className="bg-white p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8b1116]">
                {resource.status}
              </p>

              <h2 className="font-serif-academic mt-3 text-3xl font-semibold tracking-tight">
                {resource.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-600">
                {resource.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
