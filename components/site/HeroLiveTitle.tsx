"use client";

import { useEffect, useState } from "react";

const liveWords = [
  "Statistics",
  "Mathematics",
  "Biostatistics",
  "Health Data Science",
  "Machine Learning",
  "Bioinformatics",
  "Research Methods",
  "Programming",
];

export default function HeroLiveTitle() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % liveWords.length);
    }, 1800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div>
      <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-[#111111] sm:text-5xl md:text-5xl xl:text-6xl">
        Dive into Quantitative Learning.
      </h1>

      <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-neutral-200 bg-[#f7f4ee] px-3 py-2 shadow-sm">
        <span className="h-2.5 w-2.5 rounded-full bg-[#8b1116]" />

        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
          Live focus
        </span>

        <span className="max-w-[210px] truncate rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#8b1116] transition-all duration-500 sm:max-w-none">
          {liveWords[active]}
        </span>
      </div>
    </div>
  );
}
