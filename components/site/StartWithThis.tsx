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

const routes = [
  {
    number: "01",
    title: "Learn",
    body: "Follow structured lessons and guided study routes.",
    href: "/learning-hub",
    label: "Open Hub",
  },
  {
    number: "02",
    title: "Explore",
    body: "Use visuals to understand models and applied examples.",
    href: "/interactive-demos",
    label: "Explore demos",
  },
  {
    number: "03",
    title: "Get support",
    body: "Request focused tutoring when you need guidance.",
    href: "/contact",
    label: "Request support",
  },
];

export default function StartWithThis() {
  return (
    <section className="bg-[#f7f4ee] px-4 py-5 text-[#111111] sm:px-5 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm md:tracking-[0.22em]">
                Start here
              </p>

              <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.045em] md:mt-4 md:text-5xl">
                Choose how to begin.
              </h2>
            </div>

            <p className="max-w-3xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              Start with structured learning, explore a visual explanation, or
              request support when you need individual guidance.
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:mt-8 md:grid-cols-3 md:gap-4">
            {routes.map((route) => (
              <a
                key={route.title}
                href={withBasePath(route.href)}
                className="group rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:rounded-[2rem] md:p-6"
              >
                <p className="text-2xl font-semibold tracking-[-0.055em] text-[#8b1116] md:text-3xl">
                  {route.number}
                </p>

                <h3 className="mt-4 text-xl font-semibold tracking-[-0.04em] md:mt-5 md:text-2xl">
                  {route.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-neutral-700 md:mt-4">
                  {route.body}
                </p>

                <p className="mt-5 text-sm font-semibold text-[#8b1116] md:mt-6">
                  {route.label} →
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
