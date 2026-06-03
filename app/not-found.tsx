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

const links = [
  { label: "Back to homepage", href: "/", primary: true },
  { label: "Learning Hub", href: "/learning-hub", primary: false },
  { label: "Courses", href: "/courses", primary: false },
  { label: "Contact", href: "/contact", primary: false },
];

const startingPoints = [
  "Statistics Foundation",
  "Machine Learning in Biostatistics",
  "Resource guides",
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-12 text-[#111111] md:px-8 md:py-24">
      <section className="mx-auto max-w-5xl rounded-[2.5rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b1116]">
          404 · Page not found
        </p>

        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.055em] md:text-6xl">
          This page is not available.
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
          The page may have moved or may not be published yet. Use one of the
          links below to continue learning.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {links.map((link) => (
            <a
              key={link.href}
              href={withBasePath(link.href)}
              className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition sm:w-auto ${
                link.primary
                  ? "bg-[#111111] text-white hover:bg-[#8b1116]"
                  : "border border-neutral-300 bg-white text-[#111111] hover:border-[#8b1116] hover:text-[#8b1116]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-neutral-200 bg-[#f7f4ee] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b1116]">
            Useful starting points
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {startingPoints.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold leading-6 text-neutral-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
