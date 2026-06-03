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
      { label: "Statistics Foundation", href: "/courses/statistics-foundation" },
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
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
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
    <footer className="border-t border-[#ded9cf] bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_1.45fr]">
            <div>
              <a
                href={withBasePath("/")}
                className="flex max-w-fit items-center gap-4"
                aria-label="My Academic Tutor homepage"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#ded9cf] bg-[#f7f4ee] shadow-sm">
                  <img
                    src={`${basePath}/images/my-academic-tutor-logo.png`}
                    alt="My Academic Tutor logo"
                    className="h-full w-full object-contain object-center"
                  />
                </div>

                <div>
                  <p className="text-lg font-black leading-tight tracking-[-0.035em] text-[#111111] md:text-xl">
                    My Academic Tutor
                  </p>

                  <p className="mt-1 text-xs font-black uppercase tracking-[0.22em] text-[#8b1116]">
                    Quantitative Learning
                  </p>
                </div>
              </a>

              <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-700">
                Specialist academic support and structured learning pathways for
                statistics, biostatistics, data science, programming, research
                methods and quantitative academic development.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={withBasePath("/learning-hub")}
                  className="inline-flex items-center justify-center rounded-full bg-[#8b1116] px-5 py-3 text-center text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#5f0b0f]"
                >
                  Open Learning Hub
                </a>

                <a
                  href={withBasePath("/contact")}
                  className="inline-flex items-center justify-center rounded-full border border-[#ded9cf] bg-white px-5 py-3 text-center text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:border-[#8b1116] hover:text-[#8b1116]"
                >
                  Request support
                </a>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-[#ded9cf] bg-[#f7f4ee] p-5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Academic responsibility
                </p>

                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  Support is guidance-based. We help students understand
                  methods, plan analysis and interpret ideas. We do not complete
                  assessed work on behalf of students.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {footerLinks.map((group) => (
                <div
                  key={group.title}
                  className="rounded-[1.25rem] border border-[#ded9cf] bg-[#f7f4ee] p-5"
                >
                  <h2 className="text-xs font-black uppercase tracking-[0.22em] text-[#8b1116]">
                    {group.title}
                  </h2>

                  <div className="mt-4 grid gap-3">
                    {group.links.map((link) => (
                      <a
                        key={`${group.title}-${link.href}`}
                        href={withBasePath(link.href)}
                        className="text-sm font-semibold leading-6 text-neutral-700 transition hover:text-[#8b1116]"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-[#ded9cf] pt-6 md:flex-row md:items-center md:justify-between">
            <p className="text-xs leading-6 text-neutral-700">
              © {new Date().getFullYear()} My Academic Tutor. All rights
              reserved.
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-black text-neutral-600">
              <a
                href="https://www.linkedin.com/company/myacademictutor/"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-[#8b1116]"
              >
                LinkedIn
              </a>

              <a
                href="https://www.youtube.com/@StatisticaHub"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-[#8b1116]"
              >
                YouTube
              </a>

              <a
                href="mailto:contact@myacademictutor.com"
                className="transition hover:text-[#8b1116]"
              >
                contact@myacademictutor.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}