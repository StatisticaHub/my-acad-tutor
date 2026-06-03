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
  { label: "Interactive Demos", href: "/interactive-demos" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-[#f7f4ee]/95 px-5 py-3 backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
        <div className="shrink-0">
          <Logo />
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex items-center justify-center rounded-full bg-[#111111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8b1116]"
          aria-expanded={open}
          aria-controls="main-menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div id="main-menu" className="mx-auto mt-3 max-w-7xl">
          <nav
            aria-label="Main navigation"
            className="rounded-[1.5rem] border border-neutral-200 bg-white p-3 shadow-sm"
          >
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={withBasePath(item.href)}
                  onClick={() => setOpen(false)}
                  className="rounded-full px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-[#f7f4ee] hover:text-[#8b1116]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
