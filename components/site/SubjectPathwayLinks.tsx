const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const pathways = [
  {
    title: "Statistics",
    href: "/learning-hub/statistics",
    body: "Statistical thinking, descriptive statistics, probability, inference and regression foundations.",
  },
  {
    title: "Mathematics",
    href: "/learning-hub/mathematics",
    body: "Algebra, calculus, linear algebra, probability and applied quantitative reasoning.",
  },
  {
    title: "Data Science",
    href: "/learning-hub/data-science",
    body: "Data preparation, exploratory analysis, modelling, validation, interpretation and reporting.",
  },
  {
    title: "Biostatistics",
    href: "/learning-hub/biostatistics",
    body: "Health data, study design, medical statistics, regression, diagnostics and clinical interpretation.",
  },
  {
    title: "Bioinformatics",
    href: "/learning-hub/bioinformatics",
    body: "Biological data, omics concepts, processing ideas, statistical analysis and interpretation.",
  },
  {
    title: "Research Methods",
    href: "/learning-hub/research-methods",
    body: "Research questions, study design, variable planning, analysis strategy and responsible reporting.",
  },
];

export default function SubjectPathwayLinks() {
  return (
    <section className="bg-[#F7F3EA] px-5 py-12 text-[#141210] md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
          Subject pathways
        </p>

        <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h2 className="max-w-3xl text-3xl font-black leading-[1.05] tracking-[-0.05em] md:text-5xl">
              Choose a structured route through your subject.
            </h2>
          </div>

          <p className="max-w-3xl text-base leading-8 text-[#525252]">
            Each pathway gives students a clearer starting point, suggested order
            and related resources. These are flexible routes, not fixed limits.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pathways.map((pathway) => (
            <a
              key={pathway.title}
              href={withBasePath(pathway.href)}
              className="group rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5 transition hover:-translate-y-1 hover:bg-[#FFFCF6] hover:shadow-md"
            >
              <h3 className="text-xl font-black tracking-[-0.035em]">
                {pathway.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#525252]">
                {pathway.body}
              </p>

              <p className="mt-5 text-sm font-black text-[#741018]">
                Open pathway →
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
