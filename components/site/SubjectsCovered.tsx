const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (
    href.startsWith("#") ||
    href.startsWith("http") ||
    href.startsWith("mailto:")
  ) {
    return href;
  }

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const subjects = [
  "Statistics",
  "Mathematics",
  "Biostatistics",
  "Health Data Science",
  "Machine Learning",
  "Bioinformatics",
  "Research Methods",
  "Programming",
  "Data Analysis",
  "Dissertation Planning",
  "R Support",
  "Academic Guidance",
];

const subjectCards = [
  {
    title: "Statistics",
    icon: "Σ",
    focus: "Inference, regression and uncertainty",
  },
  {
    title: "Mathematics",
    icon: "∫",
    focus: "Algebra, calculus and probability",
  },
  {
    title: "Biostatistics",
    icon: "β",
    focus: "Clinical data and medical interpretation",
  },
  {
    title: "Health Data Science",
    icon: "◇",
    focus: "Prediction, validation and dashboards",
  },
  {
    title: "Machine Learning",
    icon: "λ",
    focus: "Models, risk scores and evaluation",
  },
  {
    title: "Bioinformatics",
    icon: "DNA",
    focus: "Omics and biomedical data thinking",
  },
  {
    title: "Research Methods",
    icon: "RQ",
    focus: "Study design, planning and reporting",
  },
  {
    title: "Programming",
    icon: "R",
    focus: "R workflows and reproducible analysis",
  },
];

export default function SubjectsCovered() {
  return (
    <section className="bg-[#f7f4ee] px-4 py-5 text-[#111111] sm:px-5 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-[#111111] text-white shadow-sm md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <div className="p-5 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55 md:text-sm">
                Subjects covered
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">
                Quantitative support across core study areas.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-base md:leading-8">
                Courses, demos and resources are organised around the topics
                students most often need help understanding.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath("/learning-hub")}
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto"
                >
                  Open Learning Hub
                </a>

                <a
                  href={withBasePath("/contact")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                >
                  Ask for support →
                </a>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                  Learning focus
                </p>

                <p className="mt-2 text-sm leading-7 text-white/70">
                  The aim is not only to solve a question, but to understand the
                  method, assumptions, interpretation and reporting.
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/[0.04] p-4 md:p-6 lg:border-l lg:border-t-0">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111111] py-4">
                <div className="flex animate-[marquee_24s_linear_infinite] gap-2 px-4">
                  {[...subjects, ...subjects].map((subject, index) => (
                    <span
                      key={`${subject}-${index}-top`}
                      className="shrink-0 rounded-full border border-white/10 bg-white px-4 py-2 text-sm font-semibold text-[#111111]"
                    >
                      {subject}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex animate-[marqueeReverse_28s_linear_infinite] gap-2 px-4">
                  {[...subjects.slice().reverse(), ...subjects.slice().reverse()].map(
                    (subject, index) => (
                      <span
                        key={`${subject}-${index}-bottom`}
                        className="shrink-0 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm font-semibold text-white/85"
                      >
                        {subject}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {subjectCards.map((subject) => (
                  <article
                    key={subject.title}
                    className="group rounded-[1.35rem] border border-white/10 bg-white/[0.07] p-4 transition hover:-translate-y-0.5 hover:bg-white hover:text-[#111111]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#8b1116] transition group-hover:bg-[#8b1116] group-hover:text-white">
                        {subject.icon}
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-white transition group-hover:text-[#111111]">
                          {subject.title}
                        </h3>

                        <p className="mt-1.5 text-sm leading-6 text-white/65 transition group-hover:text-neutral-700">
                          {subject.focus}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
