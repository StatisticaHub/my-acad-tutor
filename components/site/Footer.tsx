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
  { label: "Book Customised Tutoring", href: "/contact#support-form" },
  { label: "Academic Integrity", href: "/academic-integrity" },
  { label: "Certificate Policy", href: "/certificate-policy" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

const subjectPills = [
  "Statistics",
  "Mathematics",
  "Biostatistics",
  "Health Data Science",
  "Bioinformatics",
  "Research Methods",
];

export default function Footer() {
  return (
    <footer className="bg-[#f7f4ee] px-4 pb-6 pt-5 text-[#111111] sm:px-5 md:px-8 md:pb-8 md:pt-8">
      <section className="mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm md:rounded-[2.5rem]">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b border-neutral-200 p-5 md:p-8 lg:border-b-0 lg:border-r">
            <Logo />

            <h2 className="mt-6 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">
              Clearer quantitative learning, from foundations to applied support.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              My Academic Tutor supports students through structured courses,
              visual demos, in-depth resources and responsible academic
              guidance across quantitative subjects.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {subjectPills.map((subject) => (
                <span
                  key={subject}
                  className="rounded-full border border-neutral-200 bg-[#f7f4ee] px-3 py-1.5 text-xs font-semibold text-neutral-700"
                >
                  {subject}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={withBasePath("/learning-hub")}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8b1116] sm:w-auto"
              >
                Open Learning Hub
              </a>

              <a
                href={`${withBasePath("/contact")}#support-form`}
                className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto"
              >
                Book Customised Tutoring →
              </a>
            </div>
          </div>

          <div className="grid gap-0 md:grid-cols-2">
            <FooterColumn
              title="Learning"
              links={learningLinks}
              className="border-b border-neutral-200 p-5 md:border-r md:p-8"
            />

            <div className="grid gap-0">
              <FooterColumn
                title="Support"
                links={supportLinks}
                className="border-b border-neutral-200 p-5 md:p-8"
              />

              <FooterColumn
                title="Policies"
                links={policyLinks}
                className="p-5 md:p-8"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 bg-[#fdfbf7] p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-semibold text-neutral-600">
              © 2026 My Academic Tutor. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-3 text-sm font-semibold text-neutral-600">
              <a
                href="mailto:contact@myacademictutor.com"
                className="transition hover:text-[#8b1116]"
              >
                contact@myacademictutor.com
              </a>

              <a
                href="https://www.linkedin.com"
                className="transition hover:text-[#8b1116]"
              >
                LinkedIn
              </a>

              <a
                href="https://www.youtube.com"
                className="transition hover:text-[#8b1116]"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <nav className={className}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
        {title}
      </p>

      <div className="mt-4 grid gap-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={withBasePath(link.href)}
            className="rounded-full px-0 py-1.5 text-sm font-semibold text-neutral-700 transition hover:text-[#8b1116]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
