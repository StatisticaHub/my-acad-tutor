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

const routes = [
  {
    eyebrow: "Learn from zero",
    title: "Start Statistics Foundation",
    body:
      "Best if you want a structured, zero-coding statistics course with theory, examples, visual labs and quizzes.",
    href: "/courses/statistics-foundation",
    dark: false,
  },
  {
    eyebrow: "Explore visually",
    title: "Try interactive demos",
    body:
      "Use visual demos for normal distributions, regression lines and confidence intervals to understand ideas before formulas.",
    href: "/interactive-demos",
    dark: false,
  },
  {
    eyebrow: "Need quick help",
    title: "Browse resources",
    body:
      "Use in-depth guides for statistical tests, p-values, confidence intervals, regression, survival analysis and software choice.",
    href: "/resources",
    dark: false,
  },
  {
    eyebrow: "Need guidance",
    title: "Request academic support",
    body:
      "Best for topic explanation, research planning, software guidance, interpretation or dissertation support.",
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
    <section className="border-b border-neutral-200 bg-white px-5 py-10 text-neutral-950 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
          Start with this
        </p>

        <div className="mt-3 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h2 className="font-serif-academic max-w-3xl text-3xl font-medium leading-tight tracking-[-0.035em] text-neutral-950 md:text-5xl">
              Choose your route in less than a minute.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
              The platform now has clear starting points: learn through a
              structured course, explore a visual demo, use a focused guide, or
              request personalised academic support.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-neutral-200 bg-[#f8f6f1] p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500">
              Platform preview
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {previewLinks.map((link) => (
                <a
                  key={link.href}
                  href={withBasePath(link.href)}
                  className="rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-center text-sm font-bold text-neutral-800 transition hover:-translate-y-0.5 hover:border-[#8b1116] hover:text-[#8b1116]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {routes.map((route) => (
            <a
              key={route.title}
              href={withBasePath(route.href)}
              className={`rounded-3xl border p-6 transition hover:-translate-y-1 ${
                route.dark
                  ? "border-neutral-950 bg-neutral-950 text-white hover:bg-neutral-800"
                  : "border-neutral-200 bg-neutral-50 text-neutral-950 hover:bg-white hover:shadow-sm"
              }`}
            >
              <p
                className={`text-sm font-black uppercase tracking-[0.16em] ${
                  route.dark ? "text-white/60" : "text-[#8b1116]"
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