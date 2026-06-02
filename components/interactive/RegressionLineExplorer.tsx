"use client";

import { useMemo, useState } from "react";

const basePoints = [
  [0.5, 1.1],
  [1.1, 1.8],
  [1.8, 2.0],
  [2.4, 3.2],
  [3.1, 3.0],
  [3.8, 4.1],
  [4.5, 4.7],
  [5.2, 4.9],
  [5.8, 6.3],
  [6.5, 6.5],
];

export default function RegressionLineExplorer() {
  const [slope, setSlope] = useState(0.8);
  const [intercept, setIntercept] = useState(0.8);
  const [noise, setNoise] = useState(0.4);

  const points = useMemo(() => {
    return basePoints.map(([x, y], index) => {
      const offset = Math.sin(index * 1.7) * noise;
      return [x, y + offset] as const;
    });
  }, [noise]);

  function mapX(x: number) {
    return (x / 7) * 700;
  }

  function mapY(y: number) {
    return 280 - (y / 8) * 250;
  }

  const lineStartY = intercept;
  const lineEndY = intercept + slope * 7;

  return (
    <section className="rounded-[2rem] border border-[#ded9cf] bg-white p-6 shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
        Interactive demo
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.035em]">
        Regression Line Explorer
      </h2>
      <p className="mt-3 text-base leading-8 text-neutral-700">
        Adjust slope, intercept and noise to see how a fitted line represents an
        approximate relationship between two quantitative variables.
      </p>

      <div className="mt-6 rounded-[1.5rem] border border-[#ded9cf] bg-[#fbfaf7] p-4">
        <svg viewBox="0 0 700 300" className="h-72 w-full">
          <line x1="0" y1="280" x2="700" y2="280" stroke="currentColor" />
          <line x1="30" y1="20" x2="30" y2="280" stroke="currentColor" />
          <line
            x1={mapX(0)}
            y1={mapY(lineStartY)}
            x2={mapX(7)}
            y2={mapY(lineEndY)}
            stroke="currentColor"
            strokeWidth="4"
            className="text-[#8b1116]"
          />
          {points.map(([x, y]) => (
            <circle
              key={`${x}-${y}`}
              cx={mapX(x)}
              cy={mapY(y)}
              r="7"
              className="fill-[#111111]"
            />
          ))}
        </svg>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label>
          <span className="text-sm font-black uppercase tracking-[0.16em] text-neutral-600">
            Slope: {slope.toFixed(1)}
          </span>
          <input
            type="range"
            min="-0.5"
            max="1.5"
            step="0.1"
            value={slope}
            onChange={(event) => setSlope(Number(event.target.value))}
            className="mt-3 w-full"
          />
        </label>

        <label>
          <span className="text-sm font-black uppercase tracking-[0.16em] text-neutral-600">
            Intercept: {intercept.toFixed(1)}
          </span>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={intercept}
            onChange={(event) => setIntercept(Number(event.target.value))}
            className="mt-3 w-full"
          />
        </label>

        <label>
          <span className="text-sm font-black uppercase tracking-[0.16em] text-neutral-600">
            Noise: {noise.toFixed(1)}
          </span>
          <input
            type="range"
            min="0"
            max="1.5"
            step="0.1"
            value={noise}
            onChange={(event) => setNoise(Number(event.target.value))}
            className="mt-3 w-full"
          />
        </label>
      </div>

      <p className="mt-5 rounded-2xl bg-[#f8f6f1] p-4 text-sm leading-7 text-neutral-700">
        Interpretation: the slope describes the expected change in the outcome
        for a one-unit increase in the predictor. More noise means the line
        explains less of the observed variation.
      </p>
    </section>
  );
}
