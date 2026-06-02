const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

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
      { label: "Request support", href: "/contact" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Academic Integrity", href: "/academic-integrity" },
      { label: "Certificate Policy", href: "/certificate-policy" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-[#111111] px-5 py-12 text-white md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1.35fr]">
          <div>
            <a
              href={withBasePath("/")}
              className="flex max-w-fit items-center gap-4"
              aria-label="My Academic Tutor homepage"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white shadow-sm">
                <img
                  src={`${basePath}/images/my-academic-tutor-logo.png`}
                  alt="My Academic Tutor logo"
                  className="h-full w-full object-contain object-center"
                />
              </div>

              <div>
                <p className="font-sans text-lg font-black leading-tight tracking-[-0.035em] text-white md:text-xl">
                  My Academic Tutor
                </p>

                <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                  Quantitative Learning
                </p>
              </div>
            </a>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60">
              Specialist academic support and structured learning pathways for
              statistics, biostatistics, data science, programming, research
              methods and quantitative academic development.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={withBasePath("/learning-hub")}
                className="rounded-full bg-white px-5 py-3 text-center text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
              >
                Open Learning Hub
              </a>

              <a
                href={withBasePath("/contact")}
                className="rounded-full border border-white/15 px-5 py-3 text-center text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Request support
              </a>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white/40">
                Academic responsibility
              </p>

              <p className="mt-3 text-sm leading-7 text-white/60">
                Support is guidance-based. We help students understand methods,
                plan analysis and interpret ideas. We do not complete assessed
                work on behalf of students.
              </p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-black uppercase tracking-[0.22em] text-white/40">
                  {group.title}
                </h2>

                <div className="mt-4 grid gap-3">
                  {group.links.map((link) => (
                    <a
                      key={`${group.title}-${link.href}`}
                      href={withBasePath(link.href)}
                      className="text-sm font-semibold leading-6 text-white/65 transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-6 text-white/40">
            © {new Date().getFullYear()} My Academic Tutor. All rights
            reserved.
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-bold text-white/45">
            <a
              href="https://www.linkedin.com/company/myacademictutor/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              LinkedIn
            </a>

            <a
              href="https://www.youtube.com/@StatisticaHub"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              YouTube
            </a>

            <a
              href="mailto:contact@myacademictutor.com"
              className="transition hover:text-white"
            >
              contact@myacademictutor.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}