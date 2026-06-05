const subjectAreas = [
  {
    title: "Statistics",
    body:
      "Support may include probability, distributions, hypothesis testing, confidence intervals, regression, data summaries, statistical reasoning and related topics.",
  },
  {
    title: "Mathematics",
    body:
      "Support may include algebra, calculus, linear algebra, probability, optimisation, quantitative reasoning and related mathematical topics.",
  },
  {
    title: "Data Science",
    body:
      "Support may include data cleaning, exploratory analysis, modelling concepts, validation, interpretation, reporting and related data-analysis topics.",
  },
  {
    title: "Biostatistics",
    body:
      "Support may include clinical data, study design, medical statistics, survival analysis, diagnostic reasoning, health evidence and related topics.",
  },
  {
    title: "Bioinformatics",
    body:
      "Support may include omics concepts, sequence-analysis ideas, biological data interpretation, computational biology foundations and related topics.",
  },
  {
    title: "Research Methods",
    body:
      "Support may include research questions, study design, methodology planning, analysis strategy, interpretation of results and related research tasks.",
  },
];

const educationLevels = [
  {
    level: "School / Foundation",
    fit:
      "For students building confidence with core ideas, formulas, graphs and problem-solving basics.",
  },
  {
    level: "Undergraduate",
    fit:
      "For module support, coursework understanding, statistics labs, applied methods and exam preparation.",
  },
  {
    level: "Master’s",
    fit:
      "For advanced modules, dissertation planning, statistical modelling, research design and interpretation.",
  },
  {
    level: "Research / Dissertation",
    fit:
      "For support with research questions, analysis planning, method choice, reporting and critical interpretation.",
  },
  {
    level: "Professional upskilling",
    fit:
      "For learners who want to strengthen quantitative, statistical or data-analysis understanding for work.",
  },
];

const supportTypes = [
  "Concept explanation",
  "Study planning",
  "Method selection",
  "Software direction",
  "Data interpretation",
  "Model interpretation",
  "Research planning",
  "Dissertation support",
];

export default function SupportOptions() {
  return (
    <section className="bg-[#F7F3EA] px-5 py-12 text-[#141210] md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
          Support options
        </p>

        <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h2 className="max-w-3xl text-3xl font-black leading-[1.05] tracking-[-0.05em] md:text-5xl">
              Subject-wise support, matched to the student’s level.
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-[#525252]">
              My Academic Tutor reviews each enquiry by subject area, education
              level, topic and support type. Students may be directed to a suitable
              tutor, resource, course pathway or visual demo.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
              Pricing approach
            </p>
            <p className="mt-3 text-sm leading-7 text-[#525252]">
              Pricing is shared after enquiry review because support needs vary by
              subject, academic level, urgency, tutor availability and support type.
              Students receive clear details before confirming any support.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
                Subject areas
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">
                Focused quantitative support.
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#525252]">
              The examples below are not fixed limits. They show common areas where
              students ask for guidance, but each enquiry is reviewed individually.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subjectAreas.map((subject) => (
              <article
                key={subject.title}
                className="rounded-[1.5rem] border border-[#E4DED2] bg-white p-5 shadow-sm"
              >
                <h4 className="text-lg font-black tracking-[-0.03em]">
                  {subject.title}
                </h4>
                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  {subject.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-[#E4DED2] bg-[#F7F3EA] p-5 md:p-6">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
            Education level
          </p>

          <div className="mt-5 grid gap-4 lg:grid-cols-5">
            {educationLevels.map((item) => (
              <article
                key={item.level}
                className="rounded-[1.35rem] border border-[#E4DED2] bg-[#FFFCF6] p-4"
              >
                <h4 className="text-sm font-black text-[#141210]">
                  {item.level}
                </h4>
                <p className="mt-3 text-xs leading-6 text-[#525252]">
                  {item.fit}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
            Common support types
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            {supportTypes.map((type) => (
              <span
                key={type}
                className="rounded-full border border-[#E4DED2] bg-white px-4 py-2 text-sm font-bold text-[#141210]"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/contact/#support-form"
            className="rounded-full bg-[#141210] px-5 py-3 text-sm font-black text-white transition hover:bg-[#741018]"
          >
            Submit enquiry
          </a>
          <a
            href="/resources/"
            className="rounded-full border border-[#D8CDBB] px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA]"
          >
            Read resources first
          </a>
        </div>
      </div>
    </section>
  );
}
