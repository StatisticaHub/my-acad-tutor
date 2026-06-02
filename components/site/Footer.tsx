const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "Start Here", href: "/start-here" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Learning",
    links: [
      { label: "Courses", href: "/courses" },
      { label: "Learning Hub", href: "/learning-hub" },
      {
        label: "Statistics Foundation",
        href: "/courses/statistics-foundation",
      },
      {
        label: "ML in Biostatistics",
        href: "/courses/machine-learning-biostatistics",
      },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Preview",
    links: [
      { label: "Dashboard preview", href: "/dashboard" },
      { label: "Interactive demos", href: "/interactive-demos" },
      { label: "Pricing preview", href: "/pricing" },
      { label: "Request access", href: "/contact" },
    ],
  },
];

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;
  return `${basePath}${href}/`;
}

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 px-5 py-12 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_1.4fr]">
        <div>
          <a href={`${basePath}/`} className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white shadow-sm">
              <img
                src={`${basePath}/images/my-academic-tutor-logo.png`}
                alt="My Academic Tutor logo"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-white/55">
                My Academic Tutor
              </p>
              <p className="font-serif-academic mt-1 text-base font-semibold tracking-tight text-white md:text-lg">
                Quantitative Learning
              </p>
            </div>
          </a>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60">
            Specialist academic support and structured learning pathways for
            statistics, biostatistics, data science, programming, research
            methods and quantitative academic development.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={withBasePath("/pricing")}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-neutral-950 transition hover:-translate-y-0.5"
            >
              Pricing preview
            </a>

            <a
              href={withBasePath("/dashboard")}
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Dashboard preview
            </a>
          </div>

          <p className="mt-6 text-xs leading-6 text-white/40">
            © {new Date().getFullYear()} My Academic Tutor. All rights
            reserved.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h2 className="text-xs font-black uppercase tracking-[0.22em] text-white/45">
                {group.title}
              </h2>

              <div className="mt-4 grid gap-3">
                {group.links.map((link) => (
                  <a
                    key={`${group.title}-${link.href}`}
                    href={withBasePath(link.href)}
                    className="text-sm font-semibold text-white/65 transition hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}