const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

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
    label: "Dashboard preview",
    href: "/dashboard",
  },
  {
    label: "Pricing preview",
    href: "/pricing",
  },
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

          <h1 className="font-serif-academic mt-5 max-w-5xl text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-neutral-950 sm:text-5xl md:text-7xl">
            Structured quantitative learning for university students and researchers.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-7 text-neutral-700 md:text-lg md:leading-8">
            My Academic Tutor helps university students, researchers and
            early-career professionals understand statistics, biostatistics,
            data science and research methods with clarity, structure and
            responsible academic guidance.
          </p>

          <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-600 md:text-lg md:leading-8">
            Learn through structured course pathways, focused study resources,
            interactive demos, dashboard previews and support for statistical
            thinking, programming, analysis and research interpretation.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={withBasePath("/learning-hub")}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#8b1116] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#711014] sm:w-auto"
            >
              Start learning
            </a>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-bold text-neutral-950 shadow-sm transition hover:bg-neutral-50 sm:w-auto"
            >
              View Statistics Foundation
            </a>

            <a
              href={withBasePath("/interactive-demos")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-transparent px-6 py-3 text-sm font-bold text-neutral-950 transition hover:bg-white sm:w-auto"
            >
              Try interactive demos
            </a>

            <a
              href={withBasePath("/pricing")}
              className="inline-flex w-full items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-neutral-800 sm:w-auto"
            >
              Pricing preview
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {platformStats.map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-neutral-200 bg-white/80 p-4 shadow-sm"
              >
                <p className="text-2xl font-black tracking-[-0.03em] text-neutral-950">
                  {value}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
          <img
            src={`${basePath}/images/academic-tutoring-hero.jpg`}
            alt="Academic research and quantitative learning workspace"
            className="h-[340px] w-full object-cover object-center md:h-[620px]"
          />

          <div className="absolute inset-x-4 bottom-4 max-w-[88%] rounded-2xl bg-white/94 p-4 shadow-sm backdrop-blur md:inset-x-6 md:bottom-6 md:max-w-[580px] md:rounded-3xl md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
              Platform preview
            </p>

            <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-neutral-950 md:text-3xl">
              Courses, demos, resources and dashboard previews in one place.
            </h2>

            <p className="mt-3 text-sm leading-6 text-neutral-700 md:text-base md:leading-7">
              Designed for clearer explanations, responsible academic support
              and stronger confidence with quantitative methods.
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {previewLinks.map((link) => (
                <a
                  key={link.href}
                  href={withBasePath(link.href)}
                  className="rounded-full border border-neutral-200 bg-[#f8f6f1] px-4 py-2 text-center text-xs font-black text-neutral-800 transition hover:bg-white hover:text-[#8b1116]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
