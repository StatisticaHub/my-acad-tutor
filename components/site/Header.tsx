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

const navItems = [
  { label: "Learning Hub", href: "/learning-hub" },
  { label: "Courses", href: "/courses" },
  { label: "Resources", href: "/resources" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-[#f7f4ee]/95 px-5 py-4 backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
        <a href={withBasePath("/")} className="shrink-0">
          <Logo />
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 text-sm font-black text-neutral-800 lg:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={withBasePath(item.href)}
              className="transition hover:text-[#8b1116]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={withBasePath("/contact")}
          className="hidden items-center justify-center rounded-full bg-[#8b1116] px-5 py-3 text-sm font-black text-white transition hover:bg-[#6f0d12] sm:inline-flex"
        >
          Request support
        </a>

        <a
          href={withBasePath("/contact")}
          className="inline-flex items-center justify-center rounded-full bg-[#8b1116] px-4 py-2 text-xs font-black text-white transition hover:bg-[#6f0d12] sm:hidden"
        >
          Support
        </a>
      </div>
    </header>
  );
}
