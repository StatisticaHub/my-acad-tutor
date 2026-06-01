const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  return `${basePath}${href}/`;
}

const pathways = [
  {
    title: "Statistics Foundation",
    tag: "Available",
    level: "Beginner to intermediate",
    href: "/courses/statistics-foundation",
    description:
      "A zero-coding course that builds statistical thinking, descriptive statistics, probability, random variables and inference foundations.",
    details: [
      "5 modules and 25 structured lessons",
      "Lecture, detailed notes, interactive labs, worked examples and quizzes",
      "Designed for university students preparing for biostatistics, data science and research methods",
    ],
  },
  {
    title: "Machine Learning in Biostatistics",
    tag: "Coming next",
    level: "Intermediate",
    href: "/courses/machine-learning-biostatistics",
    description:
      "A medical machine learning pathway focused on prediction, validation, overfitting, leakage, calibration and clinical interpretation.",
    details: [
      "Medical and health data examples",
      "Prediction versus inference",
      "Model evaluation and responsible reporting",
    ],
  },
  {
    title: "Research Methods & Data Analysis",
    tag: "Planned",
    level: "Project support",
    href: "/courses",
    description:
      "A future pathway for students planning dissertations, research reports and applied quantitative projects.",
    details: [
      "Study design and variables",
      "Analysis planning",
      "Interpretation and reporting",
    ],
  },
];

export default function LearningHubPage() {
  return (
    <main className="min-h-screen bg-[#f2efe7] text-neutral-950">
      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <a
            href={withBasePath("/")}
            className="text-sm font-black text-blue-700 hover:text-blue-900"
          >
            ← Back to homepage
          </a>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                Learning Hub
              </p>

              <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
                Learn quantitative subjects through structured pathways.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-9 text-neutral-700">
                The Learning Hub contains guided courses in statistics,
                biostatistics, data science, research methods and related
                quantitative subjects. Each course is designed to move from
                concepts to theory, interpretation and practice.
              </p>
            </div>

            <div className="rounded-[1.7rem] border border-[#ded9cf] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black tracking-tight">
                How to use the hub
              </h2>

              <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-neutral-600">
                <li>Start with the course that matches your current level.</li>
                <li>Study lessons in order instead of jumping randomly.</li>
                <li>Use interactive labs and quizzes to check understanding.</li>
                <li>
                  Return to detailed notes when mathematical ideas feel unclear.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {pathways.map((pathway) => (
              <a
                key={pathway.title}
                href={withBasePath(pathway.href)}
                className="group flex min-h-[420px] flex-col rounded-[1.7rem] border border-[#ded9cf] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-2 text-xs font-black text-blue-800">
                    {pathway.level}
                  </span>
                  <span className="rounded-full bg-emerald-100 px-3 py-2 text-xs font-black text-emerald-800">
                    {pathway.tag}
                  </span>
                </div>

                <h2 className="mt-6 text-3xl font-black tracking-tight">
                  {pathway.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-neutral-600">
                  {pathway.description}
                </p>

                <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-600">
                  {pathway.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>

                <p className="mt-auto pt-8 text-sm font-black text-blue-700">
                  Open pathway →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}