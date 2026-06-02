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

const previewLinks = [
  {
    label: "Learning Hub",
    href: "/learning-hub",
  },
  {
    label: "Courses",
    href: "/courses",
  },
  {
    label: "Resources",
    href: "/resources",
  },
];

const learningRoutes = [
  {
    title: "Structured courses",
    text: "Follow complete learning pathways with lessons, notes, examples, labs and quizzes.",
  },
  {
    title: "Academic support",
    text: "Get guidance with concepts, methods, software, research planning and interpretation.",
  },
  {
    title: "Resource guides",
    text: "Use focused public guides for revision, method choice and reporting confidence.",
  },
];

export default function Hero() {
  return (
    <section className="bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <span
                    key={subject}
                    className="rounded-full border border-neutral-200 bg-[#f7f4ee] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-neutral-700"
                  >
                    {subject}
                  </span>
                ))}
              </div>

              <p className="mt-8 max-w-4xl text-sm font-black uppercase leading-6 tracking-[0.22em] text-[#8b1116]">
                Academic support for quantitative learning, analysis and research
              </p>

              <h1 className="mt-5 max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] sm:text-5xl md:text-7xl">
                Structured quantitative learning for university students and
                researchers.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                My Academic Tutor helps university students, researchers and
                early-career professionals understand statistics, biostatistics,
                data science and research methods with clarity, structure and
                responsible academic guidance.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                Learn through structured course pathways, focused study
                resources, interactive demos and support for statistical
                thinking, programming, analysis and research interpretation.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={withBasePath("/learning-hub")}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#8b1116] px-6 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#711014] sm:w-auto"
                >
                  Start learning
                </a>

                <a
                  href={withBasePath("/courses/statistics-foundation")}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 sm:w-auto"
                >
                  View Statistics Foundation
                </a>

                <a
                  href={withBasePath("/contact")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
                >
                  Request support
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {platformStats.map(([value, label]) => (
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
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] shadow-sm">
              <img
                src={`${basePath}/images/academic-tutoring-hero.jpg`}
                alt="Academic research and quantitative learning workspace"
                className="h-[360px] w-full object-cover object-center md:h-[620px]"
              />

              <div className="absolute inset-x-4 bottom-4 max-w-[90%] rounded-[1.75rem] border border-white/50 bg-white/95 p-5 shadow-sm backdrop-blur md:inset-x-6 md:bottom-6 md:max-w-[580px] md:p-6">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Platform preview
                </p>

                <h2 className="mt-3 font-sans text-2xl font-black leading-tight tracking-[-0.04em] text-[#111111] md:text-3xl">
                  Courses, demos, resources and support in one place.
                </h2>

                <p className="mt-4 text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
                  Designed for clearer explanations, responsible academic
                  support and stronger confidence with quantitative methods.
                </p>

                <div className="mt-5 grid gap-2 sm:grid-cols-3">
                  {previewLinks.map((link) => (
                    <a
                      key={link.href}
                      href={withBasePath(link.href)}
                      className="rounded-full border border-neutral-200 bg-[#f7f4ee] px-4 py-2 text-center text-xs font-black text-neutral-800 transition hover:bg-white hover:text-[#8b1116]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {learningRoutes.map((route) => (
            <article
              key={route.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h2 className="font-sans text-2xl font-black tracking-[-0.04em]">
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