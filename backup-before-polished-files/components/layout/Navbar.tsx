import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Learning Hub", href: "/learning-hub" },
  { label: "Courses", href: "/courses" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-[#111111]">
          My Academic Tutor
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-700 transition hover:text-[#8b1116]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="rounded-full bg-[#8b1116] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5f0b0f]"
        >
          Request Support
        </Link>
      </nav>
    </header>
  );
}