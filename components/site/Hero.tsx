const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const subjects = [
  "Statistics",
  "Biostatistics",
  "Data Science",
  "Research Methods",
];

const platformStats = [
  ["5", "Statistics modules"],
  ["26", "Foundation lessons"],
  ["3", "Interactive demos"],
  ["July 2026", "Course release"],
];

const learningRoutes = [
  {
    title: "Structured courses",
    text: "Follow ordered lessons with lectures, detailed notes, visual labs, worked examples and quizzes.",
  },
  {
    title: "Academic support",
    text: "Get guidance with concepts, methods, software, research planning and interpretation.",
  },
  {
    title: "Resource guides",
    text: "Use focused guides for revision, method choice, statistical reporting and dissertation planning.",
  },
];

const previewItems = [
  "Statistics Foundation",
  "ML in Biostatistics",
  "Interactive demos",
];

export default function Hero() {
  return (
    <section className="bg-[#f7f4ee] px-5 py-8 !text-[#111111] md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[2rem] border border-[#ded9cf] bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="p-6 md:p-10 lg:p-12">
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <span
                    key={subject}
                    className="rounded-full border border-[#ded9cf] bg-[#f7f4ee] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-neutral-700"
                  >
                    {subject}
                  </span>
                ))}
              </div>

              <p className="mt-8 max-w-4xl text-sm font-black uppercase leading-6 tracking-[0.2em] text-[#8b1116]">
                Academic support for quantitative learning, analysis and research
              </p>

              <h1 className="mt-5 max-w-5xl text-balance font-sans text-4xl font-black leading-[1.04] tracking-[-0.052em] !text-[#111111] sm:text-5xl md:text-6xl xl:text-7xl">
                Structured quantitative learning for university students and
                researchers.
              </h1>

              <p className="mt-6 max-w-4xl text-pretty text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                My Academic Tutor helps students, researchers and early-career
                professionals understand statistics, biostatistics, data science
                and research methods with clarity, structure and responsible
                academic guidance.
              </p>

              <p className="mt-4 max-w-4xl text-pretty text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Learn through structured course pathways, focused study
                resources, interactive demos and support for statistical
                thinking, programming, analysis and research interpretation.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={withBasePath("/learning-hub")}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#8b1116] px-6 py-3 text-sm font-black !text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#5f0b0f] sm:w-auto"
                >
                  Start learning
                </a>

                <a
                  href={withBasePath("/courses/statistics-foundation")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#ded9cf] bg-white px-6 py-3 text-sm font-black !text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:border-[#8b1116] hover:text-[#8b1116] sm:w-auto"
                >
                  View Statistics Foundation
                </a>

                <a
                  href={withBasePath("/contact")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#ded9cf] bg-white px-6 py-3 text-sm font-black !text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:border-[#8b1116] hover:text-[#8b1116] sm:w-auto"
                >
                  Request support
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {platformStats.map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-3xl border border-[#ded9cf] bg-[#f7f4ee] p-5"
                  >
                    <p className="font-sans text-2xl font-black tracking-[-0.04em] !text-[#111111]">
                      {value}
                    </p>

                    <p className="mt-2 text-sm font-bold text-neutral-600">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-t border-[#ded9cf] bg-[#f7f4ee] p-5 md:p-7 lg:border-l lg:border-t-0 lg:p-8">
              <div className="overflow-hidden rounded-[2rem] border border-[#ded9cf] bg-white shadow-sm">
                <img
                  src={`${basePath}/images/academic-tutoring-hero.jpg`}
                  alt="Academic workspace for quantitative learning and research support"
                  className="h-[250px] w-full object-cover object-center sm:h-[300px] lg:h-[350px]"
                />

                <div className="p-6">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                    Platform preview
                  </p>

                  <h2 className="mt-3 text-balance font-sans text-2xl font-black leading-tight tracking-[-0.04em] !text-[#111111] md:text-3xl">
                    Courses, demos, resources and guidance in one academic
                    platform.
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
                    Designed for clearer explanations, stronger quantitative
                    reasoning and responsible academic support.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {previewItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#ded9cf] bg-white px-5 py-4 text-sm font-black !text-[#111111] shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-[1.75rem] border border-[#ded9cf] bg-white p-5 text-[#111111] shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.18em] !text-neutral-700">
                  Responsible academic support
                </p>

                <p className="mt-3 text-sm leading-7 !text-neutral-700">
                  Guidance is focused on explanation, planning, interpretation
                  and independent learning — not assignment completion.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {learningRoutes.map((route) => (
            <article
              key={route.title}
              className="rounded-[2rem] border border-[#ded9cf] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="font-sans text-2xl font-black tracking-[-0.04em] !text-[#111111]">
                {route.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {route.text}
              </p>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}