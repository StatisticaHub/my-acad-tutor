const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const routes = [
  {
    number: "01",
    eyebrow: "Learn from zero",
    title: "Start Statistics Foundation",
    body: "Best if you want a structured, zero-coding statistics course with theory, examples, visual labs and quizzes.",
    href: "/courses/statistics-foundation",
    dark: false,
  },
  {
    number: "02",
    eyebrow: "Explore visually",
    title: "Try interactive demos",
    body: "Use visual demos for normal distributions, regression lines and confidence intervals to understand ideas before formulas.",
    href: "/interactive-demos",
    dark: false,
  },
  {
    number: "03",
    eyebrow: "Need quick help",
    title: "Browse resources",
    body: "Use in-depth guides for statistical tests, p-values, confidence intervals, regression, survival analysis and software choice.",
    href: "/resources",
    dark: false,
  },
  {
    number: "04",
    eyebrow: "Need guidance",
    title: "Request academic support",
    body: "Best for topic explanation, research planning, software guidance, interpretation or dissertation support.",
    href: "/contact",
    dark: true,
  },
];

const previewLinks = [
  {
    label: "Open Learning Hub",
    href: "/learning-hub",
  },
  {
    label: "View dashboard preview",
    href: "/dashboard",
  },
  {
    label: "View pricing preview",
    href: "/pricing",
  },
];

export default function StartWithThis() {
  return (
    <section className="bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Start with this
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <h2 className="max-w-4xl text-balance font-sans text-3xl font-black leading-tight tracking-[-0.04em] md:text-5xl">
                Choose your route in less than a minute.
              </h2>

              <p className="mt-5 max-w-3xl text-pretty text-base leading-8 text-neutral-700">
                The platform has clear starting points: learn through a
                structured course, explore a visual demo, use a focused guide,
                or request personalised academic support.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Platform preview
              </p>

              <h3 className="mt-3 text-balance font-sans text-2xl font-black tracking-[-0.04em]">
                Explore the learning ecosystem.
              </h3>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {previewLinks.map((link) => (
                  <a
                    key={link.href}
                    href={withBasePath(link.href)}
                    className="rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-center text-sm font-black text-[#111111] transition hover:-translate-y-0.5 hover:border-[#8b1116] hover:text-[#8b1116]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {routes.map((route) => (
            <a
              key={route.title}
              href={withBasePath(route.href)}
              className={`group rounded-[2rem] border p-6 shadow-sm transition hover:-translate-y-0.5 ${
                route.dark
                  ? "border-[#111111] bg-[#111111] text-white hover:bg-neutral-900"
                  : "border-neutral-200 bg-white text-[#111111] hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <p
                  className={`font-sans text-3xl font-black tracking-[-0.05em] ${
                    route.dark ? "text-white" : "text-[#8b1116]"
                  }`}
                >
                  {route.number}
                </p>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${
                    route.dark
                      ? "bg-white/10 text-white/90"
                      : "bg-[#f7f4ee] text-[#8b1116]"
                  }`}
                >
                  {route.eyebrow}
                </span>
              </div>

              <h3 className="mt-5 text-balance font-sans text-2xl font-black leading-tight tracking-[-0.04em]">
                {route.title}
              </h3>

              <p
                className={`mt-4 text-sm leading-7 ${
                  route.dark ? "text-white/90" : "text-neutral-700"
                }`}
              >
                {route.body}
              </p>

              <span
                className={`mt-6 inline-flex text-sm font-black ${
                  route.dark
                    ? "text-white"
                    : "text-[#111111] group-hover:text-[#8b1116]"
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