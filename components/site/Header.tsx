"use client";

import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Start Here", href: "/start-here" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Courses", href: "/courses" },
  { label: "Learning Hub", href: "/learning-hub" },
  { label: "Resources", href: "/resources" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-[#f7f4ee]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="/" className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-neutral-300 bg-white shadow-sm">
            <Image
              src="/images/my-academic-tutor-logo.png"
              alt="My Academic Tutor logo"
              width={56}
              height={56}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#8b1116]">
              My Academic Tutor
            </p>
            <p className="font-serif-academic mt-1 text-base font-semibold tracking-tight text-neutral-800 md:text-lg">
              Statistics, biostatistics & data science support
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-white hover:text-[#8b1116]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href="/learning-hub"
            className="rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 shadow-sm transition hover:-translate-y-0.5"
          >
            Explore courses
          </a>

          <a
            href="/contact"
            className="rounded-full bg-[#8b1116] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
          >
            Request support
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-bold text-neutral-950 shadow-sm xl:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="border-t border-neutral-200 bg-[#f7f4ee] px-5 py-5 xl:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-800 shadow-sm"
              >
                {link.label}
              </a>
            ))}

            <div className="grid gap-2 pt-3 sm:grid-cols-2">
              <a
                href="/learning-hub"
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-center text-sm font-bold text-neutral-950"
              >
                Explore courses
              </a>

              <a
                href="/contact"
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