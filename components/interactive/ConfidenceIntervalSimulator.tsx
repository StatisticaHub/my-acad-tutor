"use client";

import { useMemo, useState } from "react";

const sampleOffsets = [
  -0.42, 0.28, 0.12, -0.1, 0.51, -0.24, 0.05, 0.34, -0.31, 0.19,
];

function zValue(level: number) {
  if (level === 90) return 1.645;
  if (level === 99) return 2.576;
  return 1.96;
}

export default function ConfidenceIntervalSimulator() {
  const [sampleSize, setSampleSize] = useState(40);
  const [confidence, setConfidence] = useState(95);

  const trueMean = 5;
  const sd = 1.6;
  const z = zValue(confidence);

  const intervals = useMemo(() => {
    const se = sd / Math.sqrt(sampleSize);
    const margin = z * se;

    return sampleOffsets.map((offset, index) => {
      const mean = trueMean + offset * (40 / sampleSize);
      const lower = mean - margin;
      const upper = mean + margin;
      return {
        index: index + 1,
        mean,
        lower,
        upper,
        covers: lower <= trueMean && upper >= trueMean,
      };
    });
  }, [sampleSize, z]);

  const covered = intervals.filter((interval) => interval.covers).length;

  function mapX(value: number) {
    return ((value - 3.5) / 3) * 700;
  }

  return (
    <section className="rounded-[2rem] border border-[#ded9cf] bg-white p-6 shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
        Interactive demo
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.035em]">
        Confidence Interval Simulator
      </h2>
      <p className="mt-3 text-base leading-8 text-neutral-700">
        Change the sample size and confidence level. Wider intervals are more
        likely to capture the true value, but they are less precise.
      </p>

      <div className="mt-6 rounded-[1.5rem] border border-[#ded9cf] bg-[#fbfaf7] p-4">
        <svg viewBox="0 0 700 330" className="h-80 w-full">
          <line
            x1={mapX(trueMean)}
            x2={mapX(trueMean)}
            y1="20"
            y2="310"
            stroke="currentColor"
            strokeDasharray="6 6"
            strokeWidth="3"
            className="text-[#8b1116]"
          />
          {intervals.map((interval, i) => {
            const y = 35 + i * 28;
            return (
              <g key={interval.index}>
                <line
                  x1={mapX(interval.lower)}
                  x2={mapX(interval.upper)}
                  y1={y}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="4"
                  className={interval.covers ? "text-[#111111]" : "text-[#8b1116]"}
                />
                <circle
                  cx={mapX(interval.mean)}
                  cy={y}
                  r="6"
                  className={interval.covers ? "fill-[#111111]" : "fill-[#8b1116]"}
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label>
          <span className="text-sm font-black uppercase tracking-[0.16em] text-neutral-600">
            Sample size: {sampleSize}
          </span>
          <input
            type="range"
            min="20"
            max="200"
            step="10"
            value={sampleSize}
            onChange={(event) => setSampleSize(Number(event.target.value))}
            className="mt-3 w-full"
          />
        </label>

        <label>
          <span className="text-sm font-black uppercase tracking-[0.16em] text-neutral-600">
            Confidence level: {confidence}%
          </span>
          <select
            value={confidence}
            onChange={(event) => setConfidence(Number(event.target.value))}
            className="mt-3 w-full rounded-2xl border border-[#ded9cf] bg-white px-4 py-3 font-semibold"
          >
            <option value={90}>90%</option>
            <option value={95}>95%</option>
            <option value={99}>99%</option>
          </select>
        </label>
      </div>

      <p className="mt-5 rounded-2xl bg-[#f8f6f1] p-4 text-sm leading-7 text-neutral-700">
        Interpretation: {covered}/10 displayed intervals contain the true mean.
        Increasing the sample size narrows intervals. Increasing the confidence
        level widens intervals.
      </p>
    </section>
  );
}
