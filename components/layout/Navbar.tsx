import Link from "next/link";

const navLinks = [
  { label: "Learning Hub", href: "/learning-hub" },
  { label: "Courses", href: "/courses" },
  { label: "Resources", href: "/resources" },
  { label: "Interactive Demos", href: "/interactive-demos" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 md:px-8">
        <Link
          href="/"
          className="shrink-0 text-base font-semibold tracking-[-0.03em] text-[#111111] md:text-lg"
        >
          My Academic Tutor
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-neutral-700 transition hover:text-[#8b1116]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="shrink-0 rounded-full bg-[#111111] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8b1116]"
        >
          Request support
        </Link>
      </nav>
    </header>
  );
}
