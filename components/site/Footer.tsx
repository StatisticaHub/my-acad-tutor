import Logo from "./Logo";

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const learningLinks = [
  { label: "Learning Hub", href: "/learning-hub" },
  { label: "Courses", href: "/courses" },
  { label: "Resources", href: "/resources" },
  { label: "Interactive demos", href: "/interactive-demos" },
];

const supportLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Academic Integrity", href: "/academic-integrity" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Certificate Policy", href: "/certificate-policy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-[#111111] px-5 py-10 text-white md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <section>
            <div className="inline-flex">
              <Logo />
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
              Specialist learning pathways and responsible academic support for
              statistics, biostatistics, data science, programming, research methods
              and quantitative academic development.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={withBasePath("/learning-hub")}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-[#111111] transition hover:bg-[#f7f4ee]"
              >
                Open Learning Hub
              </a>

              <a
                href={withBasePath("/contact")}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
              >
                Request support
              </a>
            </div>
          </section>

          <FooterColumn title="Learning" links={learningLinks} />
          <FooterColumn title="Support" links={supportLinks} />
          <FooterColumn title="Policies" links={policyLinks} />
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="grid gap-4 text-sm text-white/60 md:grid-cols-[1fr_auto] md:items-center">
            <p>© 2026 My Academic Tutor. All rights reserved.</p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.linkedin.com/company/my-academic-tutor"
                className="transition hover:text-white"
              >
                LinkedIn
              </a>

              <a
                href="https://www.youtube.com/@StatisticaHub"
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
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <section>
      <h2 className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
        {title}
      </h2>

      <div className="mt-5 grid gap-3">
        {links.map((link) => (
          <a
            key={link.href}
            href={withBasePath(link.href)}
            className="text-sm font-bold text-white/80 transition hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
