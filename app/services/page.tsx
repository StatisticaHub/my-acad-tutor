const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const services = [
  {
    number: "01",
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
    number: "02",
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
    number: "03",
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
    number: "04",
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
    number: "05",
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
    number: "06",
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

const processSteps = [
  {
    title: "Share your topic",
    text: "Send the subject, academic level, module area, deadline and what you are struggling to understand.",
  },
  {
    title: "Clarify the goal",
    text: "The support is shaped around explanation, method understanding, interpretation, software logic or research planning.",
  },
  {
    title: "Learn responsibly",
    text: "Sessions focus on helping you understand and work independently while respecting academic integrity.",
  },
];

const supportTypes = [
  "Concept explanation",
  "Method selection guidance",
  "Software walkthroughs",
  "Interpretation support",
  "Revision planning",
  "Research project guidance",
  "Tables and figures discussion",
  "Academic reporting structure",
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-bold text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Services
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.05em] md:text-6xl">
                Academic support for quantitative learning and research.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                My Academic Tutor provides guidance-based academic support
                across statistics, biostatistics, programming, data science,
                bioinformatics and research methods.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                The focus is understanding, interpretation, structured
                reasoning and responsible learning — not shortcuts or
                replacement of student effort.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                What support means
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                Guidance, explanation and academic confidence.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Support can help you understand concepts, plan analysis, review
                assumptions, interpret results and develop a clearer academic
                workflow.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["6", "Support areas"],
              ["Live", "Subject guidance"],
              ["Responsible", "Academic approach"],
              ["Structured", "Learning support"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="font-sans text-2xl font-black tracking-[-0.04em] text-[#111111]">
                  {value}
                </p>
                <p className="mt-2 text-sm font-bold text-neutral-600">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <p className="font-sans text-3xl font-black tracking-[-0.05em] text-[#8b1116]">
                {String(index + 1).padStart(2, "0")}
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

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Support areas
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Subject support for statistics, health data, programming and
              research methods.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Choose the area closest to your need. Each service is designed to
              support understanding, interpretation and independent academic
              progress.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-sans text-4xl font-black tracking-[-0.05em] text-[#8b1116]">
                    {service.number}
                  </p>

                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#8b1116]">
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
                      className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-neutral-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
              Academic integrity
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Support is guidance-based.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/70">
              We help students understand concepts, software, methods and
              interpretation. We do not complete assessed work, write
              assignments, submit work, impersonate students or support academic
              misconduct.
            </p>

            <a
              href={withBasePath("/academic-integrity")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15 sm:w-auto"
            >
              Read academic integrity policy →
            </a>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Types of help
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Support can be shaped around your exact learning need.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {supportTypes.map((type) => (
                <div
                  key={type}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold leading-6 text-neutral-700"
                >
                  {type}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/60">
            Request support
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="max-w-3xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
                Send your subject, topic and learning goal.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/75">
                Include your academic level, topic, software if relevant,
                deadline and what you need help understanding. The enquiry can
                then be directed to the most suitable support route.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href={withBasePath("/contact")}
                className="rounded-full bg-white px-6 py-4 text-center text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
              >
                Submit an enquiry
              </a>

              <a
                href={withBasePath("/courses")}
                className="rounded-full border border-white/25 bg-white/10 px-6 py-4 text-center text-sm font-black text-white transition hover:-translate-y-0.5"
              >
                View courses
              </a>

              <a
                href={withBasePath("/resources")}
                className="rounded-full border border-white/25 px-6 py-4 text-center text-sm font-black text-white/85 transition hover:bg-white/10"
              >
                Browse resources
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}