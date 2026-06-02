const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;
  return `${basePath}${href}/`;
}

const routes = [
  {
    eyebrow: "Learn from zero",
    title: "Start Statistics Foundation",
    body: "Best if you want a structured, zero-coding statistics course with theory, examples, visual labs and quizzes.",
    href: "/courses/statistics-foundation",
    dark: false,
  },
  {
    eyebrow: "Need quick help",
    title: "Browse resources",
    body: "Use in-depth guides for statistical tests, p-values, confidence intervals, regression, missing data and more.",
    href: "/resources",
    dark: false,
  },
  {
    eyebrow: "Need guidance",
    title: "Request academic support",
    body: "Best for topic explanation, research planning, software guidance, interpretation or dissertation support.",
    href: "/contact",
    dark: true,
  },
];

export default function StartWithThis() {
  return (
    <section className="border-b border-neutral-200 bg-white px-5 py-10 text-neutral-950 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
          Start with this
        </p>

        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-neutral-950 md:text-5xl">
              Choose your route in less than a minute.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
              The platform now has three clear starting points: learn through a
              structured course, use a focused guide, or request personalised
              academic support.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {routes.map((route) => (
            <a
              key={route.title}
              href={withBasePath(route.href)}
              className={`rounded-3xl border p-6 transition ${
                route.dark
                  ? "border-neutral-950 bg-neutral-950 text-white hover:bg-neutral-800"
                  : "border-neutral-200 bg-neutral-50 text-neutral-950 hover:bg-white hover:shadow-sm"
              }`}
            >
              <p
                className={`text-sm font-black uppercase tracking-[0.16em] ${
                  route.dark ? "text-white/60" : "text-blue-600"
                }`}
              >
                {route.eyebrow}
              </p>

              <h3 className="mt-3 text-xl font-bold">{route.title}</h3>

              <p
                className={`mt-3 text-sm leading-6 ${
                  route.dark ? "text-white/70" : "text-neutral-600"
                }`}
              >
                {route.body}
              </p>

              <span
                className={`mt-5 inline-flex text-sm font-bold ${
                  route.dark ? "text-white" : "text-neutral-950"
                }`}
              >
                Continue →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
