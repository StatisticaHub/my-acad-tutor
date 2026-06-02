"use client";

import { useState } from "react";

const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

const navLinks = [
  { label: "Start Here", href: "/start-here" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Courses", href: "/courses" },
  { label: "Learning Hub", href: "/learning-hub" },
  { label: "Resources", href: "/resources" },
];

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;
  return `${basePath}${href}/`;
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-[#f7f4ee]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <a
          href={withBasePath("/")}
          className="flex min-w-0 shrink-0 items-center gap-3 md:gap-4"
          aria-label="My Academic Tutor home"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden md:h-16 md:w-16">
            <img
              src={`${basePath}/images/my-academic-tutor-logo.png`}
              alt="My Academic Tutor logo"
              className="h-full w-full object-contain object-center"
            />
          </div>

          <div className="min-w-0">
            <p className="whitespace-nowrap font-sans text-[1.55rem] font-bold leading-none tracking-[-0.035em] text-[#111111] sm:text-[1.9rem] lg:text-[2.15rem]">
              My Academic Tutor
            </p>

            <p className="mt-1 whitespace-nowrap text-[0.78rem] font-semibold leading-snug tracking-[0.04em] text-neutral-700 sm:text-sm md:text-base">
              Quantitative Learning Support
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 2xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={withBasePath(link.href)}
              className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-white hover:text-[#8b1116]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 2xl:flex">
          <a
            href={withBasePath("/learning-hub")}
            className="whitespace-nowrap rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 shadow-sm transition hover:-translate-y-0.5"
          >
            Explore courses
          </a>

          <a
            href={withBasePath("/contact")}
            className="whitespace-nowrap rounded-full bg-[#8b1116] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
          >
            Request support
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="shrink-0 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-bold text-neutral-950 shadow-sm 2xl:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="border-t border-neutral-200 bg-[#f7f4ee] px-5 py-5 2xl:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={withBasePath(link.href)}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-800 shadow-sm"
              >
                {link.label}
              </a>
            ))}

            <div className="grid gap-2 pt-3 sm:grid-cols-2">
              <a
                href={withBasePath("/learning-hub")}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-center text-sm font-bold text-neutral-950"
              >
                Explore courses
              </a>

              <a
                href={withBasePath("/contact")}
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-[#8b1116] px-4 py-3 text-center text-sm font-bold text-white"
              >
                Request support
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}