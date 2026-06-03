import Logo from "./Logo";

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

const learningLinks = [
  { label: "Learning Hub", href: "/learning-hub" },
  { label: "Courses", href: "/courses" },
  { label: "Resources", href: "/resources" },
  { label: "Interactive Demos", href: "/interactive-demos" },
];

const supportLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Academic Integrity", href: "/academic-integrity" },
  { label: "Certificate Policy", href: "/certificate-policy" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2.5rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.75fr]">
            <div>
              <div className="inline-flex">
                <Logo />
              </div>

              <p className="mt-5 max-w-md text-sm leading-7 text-neutral-700">
                A calm learning platform for statistics, biostatistics, health data
                science and research methods.
              </p>

              <p className="mt-4 max-w-md text-sm leading-7 text-neutral-500">
                Built for students who want clear explanations, structured pathways,
                visual learning tools and responsible academic guidance.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath("/learning-hub")}
                  className="inline-flex items-center justify-center rounded-full bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8b1116]"
                >
                  Open Learning Hub
                </a>

                <a
                  href="mailto:contact@myacademictutor.com"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f4ee]"
                >
                  Email us
                </a>
              </div>
            </div>

            <FooterColumn title="Learning" links={learningLinks} />
            <FooterColumn title="Support" links={supportLinks} />
            <FooterColumn title="Policies" links={policyLinks} />
          </div>

          <div className="mt-10 border-t border-neutral-200 pt-6">
            <div className="grid gap-4 text-sm text-neutral-500 md:grid-cols-[1fr_auto] md:items-center">
              <p>© 2026 My Academic Tutor. All rights reserved.</p>

              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <a
                  href="mailto:contact@myacademictutor.com"
                  className="transition hover:text-[#8b1116]"
                >
                  contact@myacademictutor.com
                </a>

                <a
                  href="https://www.linkedin.com/company/my-academic-tutor"
                  className="transition hover:text-[#8b1116]"
                >
                  LinkedIn
                </a>

                <a
                  href="https://www.youtube.com/@StatisticaHub"
                  className="transition hover:text-[#8b1116]"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </section>
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
      <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b1116]">
        {title}
      </h2>

      <div className="mt-5 grid gap-3">
        {links.map((link) => (
          <a
            key={`${link.label}-${link.href}`}
            href={withBasePath(link.href)}
            className="text-sm font-semibold text-neutral-650 text-neutral-700 transition hover:text-[#8b1116]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
