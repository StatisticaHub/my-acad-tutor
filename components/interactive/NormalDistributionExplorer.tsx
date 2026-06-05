"use client";

import { useMemo, useState } from "react";

function normalDensity(x: number, mean: number, sd: number) {
  return (
    (1 / (sd * Math.sqrt(2 * Math.PI))) *
    Math.exp(-0.5 * Math.pow((x - mean) / sd, 2))
  );
}

export default function NormalDistributionExplorer() {
  const [mean, setMean] = useState(0);
  const [sd, setSd] = useState(1);

  const points = useMemo(() => {
    const xs = Array.from({ length: 121 }, (_, i) => -4 + (8 * i) / 120);
    const ys = xs.map((x) => normalDensity(x, mean, sd));
    const maxY = Math.max(...ys);

    return xs
      .map((x, i) => {
        const px = ((x + 4) / 8) * 700;
        const py = 260 - (ys[i] / maxY) * 210;
        return `${px},${py}`;
      })
      .join(" ");
  }, [mean, sd]);

  return (
    <section className="rounded-[2rem] border border-[#ded9cf] bg-[#FFFCF6] p-6 shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
        Interactive demo
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.035em]">
        Normal Distribution Explorer
      </h2>
      <p className="mt-3 text-base leading-8 text-[#525252]">
        Move the mean and standard deviation. The mean shifts the centre. The
        standard deviation controls the spread.
      </p>

      <div className="mt-6 rounded-[1.5rem] border border-[#ded9cf] bg-[#fbf8f1] p-4">
        <svg viewBox="0 0 700 300" className="h-72 w-full">
          <line x1="0" y1="260" x2="700" y2="260" stroke="currentColor" />
          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-[#741018]"
          />
        </svg>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-black uppercase tracking-[0.16em] text-[#5F5F5F]">
            Mean: {mean.toFixed(1)}
          </span>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={mean}
            onChange={(event) => setMean(Number(event.target.value))}
            className="mt-3 w-full"
          />
        </label>

        <label className="block">
          <span className="text-sm font-black uppercase tracking-[0.16em] text-[#5F5F5F]">
            Standard deviation: {sd.toFixed(1)}
          </span>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.1"
            value={sd}
            onChange={(event) => setSd(Number(event.target.value))}
            className="mt-3 w-full"
          />
        </label>
      </div>

      <p className="mt-5 rounded-2xl bg-[#f8f6f1] p-4 text-sm leading-7 text-[#525252]">
        Interpretation: increasing the standard deviation spreads probability
        over a wider range. Changing the mean moves the centre without changing
        the total area under the curve.
      </p>
    </section>
  );
}
