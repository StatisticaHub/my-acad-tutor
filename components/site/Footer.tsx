import Image from "next/image";

const platformLinks = [
  { label: "Start Here", href: "/start-here" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Courses", href: "/courses" },
  { label: "Learning Hub", href: "/learning-hub" },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const policyLinks = [
  { label: "Academic Integrity", href: "/academic-integrity" },
  { label: "Certificate Policy", href: "/certificate-policy" },
  { label: "Certificate Verification", href: "/certificate-verification" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/myacademictutor/",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@StatisticaHub",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-[#f7f4ee] text-neutral-950">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.35fr_0.65fr_0.75fr_0.55fr] md:px-8">
        <div>
          <a href="/" className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-neutral-300 bg-white shadow-sm">
              <Image
                src="/images/my-academic-tutor-logo.png"
                alt="My Academic Tutor logo"
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#8b1116]">
                My Academic Tutor
              </p>
              <p className="font-serif-academic mt-1 text-xl font-semibold tracking-tight">
                Quantitative Learning
              </p>
            </div>
          </a>

          <p className="mt-6 max-w-md text-sm leading-7 text-neutral-600">
            Specialist academic support and structured learning resources in
            statistics, biostatistics, medical statistics, data science,
            programming, bioinformatics and research methods.
          </p>

          <p className="mt-5 max-w-md text-sm leading-7 text-neutral-600">
            Founded by Rahul, with academic training in MSc Statistics from
            Indian Institute of Technology Kanpur, India, and MSc Medical
            Statistics and Health Data Science from the University of Bristol,
            UK.
          </p>
        </div>

        <FooterColumn title="Platform" links={platformLinks} />
        <FooterColumn title="Trust & Policies" links={policyLinks} />

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">
            Contact
          </h2>

          <p className="mt-5 text-sm leading-7 text-neutral-600">
            <a
              href="mailto:contact@myacademictutor.com"
              className="font-semibold text-[#8b1116] underline decoration-[#8b1116]/30 underline-offset-4"
            >
              contact@myacademictutor.com
            </a>
          </p>

          <p className="mt-3 text-sm leading-7 text-neutral-600">
            Online academic support
          </p>

          <h2 className="mt-8 text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">
            Social
          </h2>

          <ul className="mt-5 space-y-3">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-semibold text-neutral-600 transition hover:text-[#8b1116]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-200 bg-white/50">
        <div className="mx-auto max-w-7xl px-5 py-6 text-xs leading-6 text-neutral-500 md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>© 2026 My Academic Tutor. All rights reserved.</p>
          </div>

          <p className="mt-4 max-w-5xl">
            My Academic Tutor provides educational guidance, tutoring support
            and private course completion certificates. It does not award
            university degrees, statutory qualifications, government-recognised
            diplomas or regulated academic credits.
          </p>
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
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">
        {title}
      </h2>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm font-semibold text-neutral-600 transition hover:text-[#8b1116]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}