const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;
  return `${basePath}${href}/`;
}

const subjects = [
  "Statistics",
  "Biostatistics",
  "Data Science",
  "Research Methods",
];

export default function Hero() {
  return (
    <section className="bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <span
                key={subject}
                className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-700 shadow-sm"
              >
                {subject}
              </span>
            ))}
          </div>

          <p className="mt-8 max-w-4xl text-xs font-black uppercase leading-6 tracking-[0.14em] text-[#8b1116] sm:text-sm sm:tracking-[0.2em]">
            Academic support for quantitative learning, analysis and research
          </p>

          <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-700 md:text-lg md:leading-8">
            My Academic Tutor helps university students, researchers and
            early-career professionals understand quantitative subjects with
            clarity, structure and responsible academic guidance.
          </p>

          <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-600 md:text-lg md:leading-8">
            Learn through structured course pathways, focused study resources
            and support for statistical thinking, biostatistics, programming,
            data science, bioinformatics and research interpretation.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={withBasePath("/start-here")}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#8b1116] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#711014] sm:w-auto"
            >
              Start here
            </a>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-bold text-neutral-950 shadow-sm transition hover:bg-neutral-50 sm:w-auto"
            >
              View Statistics Foundation
            </a>

            <a
              href={withBasePath("/resources")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-transparent px-6 py-3 text-sm font-bold text-neutral-950 transition hover:bg-white sm:w-auto"
            >
              Browse resources
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
          <img
            src={`${basePath}/images/academic-tutoring-hero.jpg`}
            alt="Academic research and quantitative learning workspace"
            className="h-[300px] w-full object-cover object-center md:h-[560px]"
          />

          <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/90 p-4 shadow-sm backdrop-blur md:inset-x-6 md:bottom-6 md:rounded-3xl md:p-6">
            <p className="hidden text-xs font-black uppercase tracking-[0.18em] text-[#8b1116] md:block">
              Research and analysis workspace
            </p>

            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
              Quantitative learning environment
            </p>

            <h2 className="mt-2 text-lg font-bold tracking-tight text-neutral-950 md:text-2xl">
              Master complex methods with clarity and confidence.
            </h2>

            <p className="mt-2 text-sm leading-6 text-neutral-700 md:text-base md:leading-7">
              <span className="md:hidden">
                Ethical support for learning, analysis and interpretation.
              </span>
              <span className="hidden md:inline">
                Designed for clearer explanation, responsible academic support
                and stronger confidence with quantitative methods.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
