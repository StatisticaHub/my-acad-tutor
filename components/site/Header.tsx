"use client";

import { useState } from "react";
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

const navItems = [
  { label: "Learning Hub", href: "/learning-hub" },
  { label: "Courses", href: "/courses" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Interactive Demos", href: "/interactive-demos" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E4DED2] bg-[#F7F3EA]/90 px-3 py-3 backdrop-blur sm:px-5 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={withBasePath(item.href)}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#525252] transition hover:bg-[#FFFCF6] hover:text-[#741018]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`${withBasePath("/contact")}#support-form`}
            className="inline-flex items-center justify-center rounded-full bg-[#741018] px-4 py-2.5 text-xs font-black text-white shadow-sm transition hover:bg-[#11100E] sm:px-5 sm:text-sm"
          >
            <span className="md:hidden">Book</span>
            <span className="hidden md:inline">Request support</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="inline-flex items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-4 py-2.5 text-xs font-black text-[#141210] shadow-sm transition hover:bg-[#F7F3EA] sm:text-sm lg:hidden"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto mt-3 max-w-7xl rounded-[1.5rem] border border-[#E4DED2] bg-[#FFFCF6] p-3 shadow-sm lg:hidden">
          <nav className="grid gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={withBasePath(item.href)}
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-3 text-sm font-semibold text-[#525252] transition hover:bg-[#F7F3EA] hover:text-[#741018]"
              >
                {item.label}
              </a>
            ))}

            <a
              href={`${withBasePath("/contact")}#support-form`}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-[#741018] px-4 py-3 text-center text-sm font-black text-white transition hover:bg-[#11100E]"
            >
              Request support →
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}