import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Academic support services for statistics, biostatistics, programming, data science, research methods, dissertation planning and bioinformatics.",
};

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const services = [
  {
    number: "01",
    title: "Statistics support",
    description:
      "Guidance with probability, descriptive statistics, inference, hypothesis testing, regression, assumptions and interpretation.",
    examples: [
      "Statistical concepts",
      "Method choice",
      "Assumptions",
      "Exam revision",
    ],
  },
  {
    number: "02",
    title: "Biostatistics & medical statistics",
    description:
      "Support for students and researchers working with health data, epidemiology, survival analysis and clinical research methods.",
    examples: [
      "Survival analysis",
      "Epidemiological measures",
      "Clinical trials",
      "Health data",
    ],
  },
  {
    number: "03",
    title: "Programming & statistical software",
    description:
      "Guidance with R, Python, SPSS, SAS and Stata for academic analysis, debugging and reproducible workflows.",
    examples: [
      "Code walkthroughs",
      "Debugging",
      "Data cleaning",
      "Reproducible structure",
    ],
  },
  {
    number: "04",
    title: "Dissertation and research support",
    description:
      "Structured guidance for research questions, study design, variables, analysis strategy, interpretation and limitations.",
    examples: [
      "Research questions",
      "Variable planning",
      "Analysis strategy",
      "Reporting",
    ],
  },
  {
    number: "05",
    title: "Data science and machine learning",
    description:
      "Support with data preparation, visualisation, prediction modelling, validation, performance metrics and responsible reporting.",
    examples: [
      "Prediction vs inference",
      "Validation",
      "Performance metrics",
      "ML foundations",
    ],
  },
  {
    number: "06",
    title: "Bioinformatics and omics",
    description:
      "Guidance with biological data analysis concepts, omics workflows, gene expression and interpretation of results.",
    examples: [
      "RNA-seq foundations",
      "Omics interpretation",
      "Workflow planning",
      "Biological meaning",
    ],
  },
];

const supportTypes = [
  "Concept explanation",
  "Method selection",
  "Software walkthroughs",
  "Interpretation support",
  "Revision planning",
  "Research project guidance",
  "Tables and figures",
  "Academic reporting",
];

const processSteps = [
  {
    number: "01",
    title: "Explain your situation",
    text: "Share your subject, academic level, topic, software, deadline and what you are trying to understand.",
  },
  {
    number: "02",
    title: "Choose the right support route",
    text: "The support route may be a course pathway, guided session, resource guide, software walkthrough or research planning discussion.",
  },
  {
    number: "03",
    title: "Build independent understanding",
    text: "The aim is to help you reason through the topic, interpret methods and continue your work responsibly.",
  },
];

const boundaries = [
  "No ghostwriting",
  "No exam completion",
  "No impersonation",
  "No dishonest coursework completion",
  "No result manipulation",
  "No confidential data sharing",
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-20">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-bold text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Services
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl md:text-7xl">
                Academic support for quantitative learning and research.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Guidance-based support across statistics, biostatistics,
                programming, data science, bioinformatics and research methods.
                The focus is understanding, interpretation and responsible
                academic development.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                What support means
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                Guidance, explanation and academic confidence.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Support helps you understand concepts, plan analysis, review
                assumptions, interpret results and develop a clearer academic
                workflow.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath("/contact")}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Request support →
            </a>

            <a
              href={withBasePath("/start-here")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 hover:shadow-sm sm:w-auto"
            >
              Find your route
            </a>

            <a
              href={withBasePath("/learning-hub")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-200 bg-[#f7f4ee] px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 hover:shadow-sm sm:w-auto"
            >
              Explore Learning Hub
            </a>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Support areas
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-5xl">
              Choose the area closest to your academic need.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Each service area is designed to support learning, analysis
              planning, software confidence and interpretation rather than
              shortcut-based completion.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-sans text-4xl font-black tracking-[-0.05em] text-[#8b1116]">
                    {service.number}
                  </p>

                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-neutral-700">
                    Support
                  </span>
                </div>

                <h3 className="mt-5 font-sans text-2xl font-black leading-tight tracking-[-0.04em]">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {service.description}
                </p>

                <div className="mt-5 grid gap-2">
                  {service.examples.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-neutral-800"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {processSteps.map((step) => (
            <article
              key={step.number}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <p className="font-sans text-3xl font-black tracking-[-0.05em] text-[#8b1116]">
                {step.number}
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                {step.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {step.text}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Academic integrity
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Support is guidance-based.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              We help students understand concepts, software, methods and
              interpretation. We do not complete assessed work or support
              academic misconduct.
            </p>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {boundaries.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white"
                >
                  {item}
                </div>
              ))}
            </div>

            <a
              href={withBasePath("/academic-integrity")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Read academic integrity policy →
            </a>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Types of help
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              What a support request can include.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {supportTypes.map((type) => (
                <div
                  key={type}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold leading-6 text-neutral-800"
                >
                  {type}
                </div>
              ))}
            </div>

            <a
              href={withBasePath("/contact")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#2a2a2a]"
            >
              Send support request →
            </a>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Course-first support
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-5xl">
                Some support questions are best answered through a learning
                route.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-700">
                If you need foundations, start with the Statistics Foundation
                course. If you are working with prediction models in health
                data, use the Machine Learning in Biostatistics route.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href={withBasePath("/courses/statistics-foundation")}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#2a2a2a]"
              >
                Open Statistics Foundation →
              </a>

              <a
                href={withBasePath("/courses/machine-learning-biostatistics")}
                className="inline-flex w-full items-center justify-center rounded-full border border-neutral-200 bg-[#f7f4ee] px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                Open ML in Biostatistics →
              </a>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/90">
            Request support
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="max-w-3xl font-sans text-3xl font-black tracking-[-0.04em] md:text-5xl">
                Send your subject, topic and learning goal.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/90">
                Include your academic level, topic, software if relevant,
                deadline and what you need help understanding.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href={withBasePath("/contact")}
                className="rounded-full bg-white px-6 py-4 text-center text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
              >
                Submit an enquiry →
              </a>

              <a
                href={withBasePath("/courses")}
                className="rounded-full border border-white/25 bg-white/10 px-6 py-4 text-center text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                View courses
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}