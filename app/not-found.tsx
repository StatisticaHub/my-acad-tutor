const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const links = [
  {
    label: "Back to homepage",
    href: "/",
    primary: true,
  },
  {
    label: "Open Learning Hub",
    href: "/learning-hub",
    primary: false,
  },
  {
    label: "Browse courses",
    href: "/courses",
    primary: false,
  },
  {
    label: "Request support",
    href: "/contact",
    primary: false,
  },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-12 text-[#111111] md:px-8 md:py-24">
      <section className="mx-auto max-w-5xl rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
          404 · Page not found
        </p>

        <h1 className="mt-5 max-w-4xl text-balance font-sans text-4xl font-black leading-tight tracking-[-0.05em] md:text-6xl">
          This page does not exist yet.
        </h1>

        <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
          The page may have moved, or it may not have been built yet. You can go
          back to the homepage, browse the Learning Hub, explore courses or
          request academic support.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {links.map((link) => (
            <a
              key={link.href}
              href={withBasePath(link.href)}
              className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-black transition hover:-translate-y-0.5 sm:w-auto ${
                link.primary
                  ? "bg-[#8b1116] text-white hover:bg-[#711014]"
                  : "border border-neutral-300 bg-white text-[#111111] hover:border-[#8b1116] hover:text-[#8b1116]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-neutral-200 bg-[#f7f4ee] p-5">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
            Useful starting points
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              "Statistics Foundation",
              "Machine Learning in Biostatistics",
              "Resource guides",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-neutral-700"
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