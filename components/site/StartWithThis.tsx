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
    body: "Follow structured lessons and study routes.",
    href: "/learning-hub",
    action: "Open Hub",
  },
  {
    number: "02",
    title: "Explore",
    body: "Use visuals to understand models and examples.",
    href: "/interactive-demos",
    action: "Explore demos",
  },
  {
    number: "03",
    title: "Get support",
    body: "Request focused tutoring when you need guidance.",
    href: "/contact",
    action: "Request support",
  },
];

export default function StartWithThis() {
  return (
    <section className="bg-[#f7f4ee] px-4 py-5 text-[#111111] sm:px-5 md:px-8 md:py-7">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.25rem] md:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Start here
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
                Choose your route.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
                Start with a course, explore a visual explanation, or request
                focused support.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {routes.map((route) => (
                <a
                  key={route.number}
                  href={withBasePath(route.href)}
                  className="group rounded-full border border-neutral-200 bg-[#f7f4ee] px-4 py-4 transition hover:-translate-y-0.5 hover:border-[#8b1116]/25 hover:bg-white hover:shadow-sm md:rounded-[1.5rem]"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#8b1116] transition group-hover:bg-[#8b1116] group-hover:text-white">
                      {route.number}
                    </span>

                    <span>
                      <span className="block text-base font-semibold tracking-[-0.025em] text-neutral-950">
                        {route.title}
                      </span>

                      <span className="mt-1 block text-sm leading-6 text-neutral-600">
                        {route.body}
                      </span>

                      <span className="mt-2 block text-sm font-semibold text-[#8b1116]">
                        {route.action} →
                      </span>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
