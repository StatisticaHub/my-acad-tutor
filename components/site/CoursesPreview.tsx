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

const courses = [
  {
    title: "Statistics Foundation",
    tag: "Foundation",
    href: "/courses/statistics-foundation",
    description:
      "A zero-coding route through probability, inference, regression and uncertainty.",
  },
  {
    title: "Machine Learning in Biostatistics",
    tag: "Health data",
    href: "/courses/machine-learning-biostatistics",
    description:
      "Clinical prediction, validation, calibration and responsible model interpretation.",
  },
];

export default function CoursesPreview() {
  return (
    <section className="bg-[#f7f4ee] px-4 py-5 text-[#111111] sm:px-5 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm md:tracking-[0.22em]">
                Courses
              </p>

              <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.045em] md:mt-4 md:text-5xl">
                Structured courses for deeper understanding.
              </h2>
            </div>

            <p className="max-w-3xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              Clear pathways for organised explanations, worked interpretation
              and applied quantitative thinking.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:mt-8 lg:grid-cols-2 lg:gap-5">
            {courses.map((course) => (
              <a
                key={course.title}
                href={withBasePath(course.href)}
                className="group rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:rounded-[2rem] md:p-6"
              >
                <span className="rounded-full bg-[#111111] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white md:text-xs">
                  {course.tag}
                </span>

                <h3 className="mt-4 text-xl font-semibold tracking-[-0.04em] md:mt-5 md:text-3xl">
                  {course.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-neutral-700 md:mt-4">
                  {course.description}
                </p>

                <p className="mt-5 text-sm font-semibold text-[#8b1116] md:mt-6">
                  View course →
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
