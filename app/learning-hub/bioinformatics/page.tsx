import type { Metadata } from "next";
import { resourceGuides } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Bioinformatics Learning Pathway",
  description:
    "A structured bioinformatics learning pathway covering biological data, omics concepts, computational analysis, interpretation and responsible reporting.",
  alternates: {
    canonical: "https://www.myacademictutor.com/learning-hub/bioinformatics/",
  },
};

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const pathway = [
  {
    step: "01",
    title: "Biological question",
    body:
      "Start by defining the biological question, organism, sample type, measurement platform and outcome of interest.",
  },
  {
    step: "02",
    title: "Data type",
    body:
      "Understand common omics and biological data types, such as sequence, expression, methylation, protein or spatial data.",
  },
  {
    step: "03",
    title: "Processing ideas",
    body:
      "Build intuition for quality control, normalisation, alignment, feature extraction and data structure.",
  },
  {
    step: "04",
    title: "Analysis and statistics",
    body:
      "Connect biological data analysis with statistical reasoning, multiple testing, modelling and uncertainty.",
  },
  {
    step: "05",
    title: "Biological interpretation",
    body:
      "Interpret outputs carefully in biological context, considering limitations, reproducibility and evidence strength.",
  },
];

const resourceMatches = resourceGuides
  .filter((guide) =>
    [
      "How to prepare your data before analysis",
      "Missing data: deletion, imputation and reporting",
      "Multiple testing and false discovery rate",
      "Understanding p-values, confidence intervals and effect sizes",
      "Common mistakes in dissertation data analysis",
      "How to report regression results in a dissertation",
    ].includes(guide.title)
  )
  .slice(0, 6);

export default function BioinformaticsPathwayPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-10 text-[#141210] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a href={withBasePath("/learning-hub")} className="text-sm font-semibold text-[#741018] hover:text-[#4d080e]">
          ← Back to Learning Hub
        </a>

        <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
            Bioinformatics pathway
          </p>

          <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:text-6xl">
            Learn bioinformatics through biological data and interpretation.
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
            This pathway helps learners connect biological questions with computational
            data structures, statistical reasoning and careful interpretation of omics
            and biomedical data.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={withBasePath("/resources")} className="rounded-full bg-[#141210] px-5 py-3 text-sm font-black text-white transition hover:bg-[#741018]">
              Browse resources
            </a>
            <a href={withBasePath("/interactive-demos")} className="rounded-full border border-[#D8CDBB] px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA]">
              Try demos
            </a>
            <a href={`${withBasePath("/contact")}#support-form`} className="rounded-full border border-[#D8CDBB] px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA]">
              Submit enquiry
            </a>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
            Suggested route
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {pathway.map((item) => (
              <article key={item.step} className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">{item.step}</p>
                <h2 className="mt-4 text-lg font-black tracking-[-0.035em]">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#525252]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
            Recommended resources
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.045em] md:text-4xl">
            Read these guides alongside the pathway.
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resourceMatches.map((guide) => (
              <a key={guide.slug} href={withBasePath(`/resources/${guide.slug}`)} className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5 transition hover:-translate-y-1 hover:bg-[#FFFCF6] hover:shadow-md">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#741018]">
                  {guide.area} · {guide.level}
                </p>
                <h3 className="mt-3 text-lg font-black tracking-[-0.035em]">{guide.title}</h3>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-[#741018]">
                  {guide.readingTime} · Updated {guide.updated}
                </p>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#525252]">{guide.summary}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#141210] p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/70">
            Need guidance?
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.045em] md:text-4xl">
            Submit enquiry → review → match.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75">
            If you are unsure how to connect the biological question, data type and analysis strategy, submit an enquiry.
          </p>
          <a href={`${withBasePath("/contact")}#support-form`} className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA]">
            Submit enquiry
          </a>
        </section>
      </section>
    </main>
  );
}
