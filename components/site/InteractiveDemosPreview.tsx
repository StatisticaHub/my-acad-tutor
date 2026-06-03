"use client";

import { useMemo, useState } from "react";

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

function round(value: number, digits = 1) {
  return Number(value.toFixed(digits));
}

function zValue(confidence: number) {
  if (confidence === 90) return 1.645;
  if (confidence === 99) return 2.576;
  return 1.96;
}

const observations = [
  48, 52, 55, 49, 61, 58, 54, 63, 51, 57, 66, 60, 53, 64, 59, 56,
  68, 62, 50, 65, 70, 55, 58, 72, 67, 61, 74, 69, 63, 71, 76, 57,
  60, 73, 65, 78, 62, 67, 80, 59, 64, 75, 69, 77, 81, 66, 70, 83,
  72, 79, 85, 68, 74, 82, 87, 71, 76, 84, 89, 78,
];

const intervalLines = [
  { mean: 58.2, low: 51.8, high: 64.6 },
  { mean: 61.1, low: 55.2, high: 67.0 },
  { mean: 54.8, low: 48.4, high: 61.2 },
  { mean: 65.4, low: 59.1, high: 71.7 },
  { mean: 59.7, low: 53.6, high: 65.8 },
  { mean: 63.2, low: 57.5, high: 68.9 },
  { mean: 56.6, low: 50.4, high: 62.8 },
  { mean: 67.1, low: 60.9, high: 73.3 },
];

export default function InteractiveDemosPreview() {
  const [sampleSize, setSampleSize] = useState(25);
  const [confidence, setConfidence] = useState(95);
  const [meanShift, setMeanShift] = useState(0);

  const demo = useMemo(() => {
    const selected = observations.slice(0, sampleSize).map((x) => x + meanShift);
    const mean =
      selected.reduce((total, value) => total + value, 0) / selected.length;

    const sd = Math.sqrt(
      selected.reduce((total, value) => total + (value - mean) ** 2, 0) /
        (selected.length - 1),
    );

    const se = sd / Math.sqrt(selected.length);
    const margin = zValue(confidence) * se;
    const low = mean - margin;
    const high = mean + margin;

    return {
      mean,
      sd,
      se,
      margin,
      low,
      high,
      width: high - low,
      selected,
    };
  }, [sampleSize, confidence, meanShift]);

  return (
    <section className="bg-[#f7f4ee] px-4 py-6 text-[#111111] sm:px-5 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-5 md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm md:tracking-[0.22em]">
                Interactive demo
              </p>

              <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.045em] md:mt-4 md:text-5xl">
                See how uncertainty changes with evidence.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-700 md:mt-5 md:text-base md:leading-8">
                Adjust the sample size and confidence level to see how a
                confidence interval becomes narrower, wider, more stable or more
                cautious.
              </p>

              <div className="mt-6 rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-4 md:mt-7 md:p-5">
                <div className="grid gap-3">
                  <ControlSlider
                    label="Sample size"
                    value={sampleSize}
                    min={8}
                    max={60}
                    step={1}
                    suffix=" observations"
                    onChange={setSampleSize}
                  />

                  <ControlSlider
                    label="Mean shift"
                    value={meanShift}
                    min={-10}
                    max={10}
                    step={1}
                    suffix=""
                    onChange={setMeanShift}
                  />

                  <div className="rounded-[1.25rem] border border-neutral-200 bg-white p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-semibold text-neutral-950">
                        Confidence level
                      </p>

                      <p className="rounded-full bg-[#f7f4ee] px-3 py-1 text-xs font-semibold text-[#8b1116]">
                        {confidence}%
                      </p>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {[90, 95, 99].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setConfidence(level)}
                          className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                            confidence === level
                              ? "bg-[#111111] text-white"
                              : "border border-neutral-200 bg-[#f7f4ee] text-neutral-700 hover:bg-white"
                          }`}
                        >
                          {level}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
                  <Metric label="Mean" value={`${round(demo.mean, 1)}`} />
                  <Metric label="SE" value={`${round(demo.se, 2)}`} />
                  <Metric label="Margin" value={`${round(demo.margin, 1)}`} />
                  <Metric label="Width" value={`${round(demo.width, 1)}`} />
                </div>
              </div>

              <div className="mt-3 rounded-[1.5rem] border border-neutral-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b1116]">
                  Concept
                </p>

                <p className="mt-2 text-sm leading-7 text-neutral-700">
                  Larger samples usually reduce uncertainty. Higher confidence
                  levels make intervals wider because the estimate is being made
                  more cautious.
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-7">
                <a
                  href={withBasePath("/interactive-demos")}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8b1116] sm:w-auto md:py-4"
                >
                  Explore demos →
                </a>

                <a
                  href={withBasePath("/learning-hub")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 px-6 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
                >
                  Continue learning →
                </a>
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-[#fdfbf7] p-4 sm:p-5 md:p-5 lg:border-l lg:border-t-0">
              <UncertaintyVisual
                mean={demo.mean}
                low={demo.low}
                high={demo.high}
                sampleSize={sampleSize}
                confidence={confidence}
                selected={demo.selected}
              />
            </aside>
          </div>
        </section>
      </div>
    </section>
  );
}

function ControlSlider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block rounded-[1.25rem] border border-neutral-200 bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-neutral-950">{label}</span>

        <span className="rounded-full bg-[#f7f4ee] px-3 py-1 text-xs font-semibold text-[#8b1116]">
          {value}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full accent-[#8b1116]"
      />
    </label>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-neutral-200 bg-white p-3.5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
        {label}
      </p>

      <p className="mt-1.5 text-2xl font-semibold tracking-[-0.055em] text-neutral-950">
        {value}
      </p>
    </div>
  );
}

function UncertaintyVisual({
  mean,
  low,
  high,
  sampleSize,
  confidence,
  selected,
}: {
  mean: number;
  low: number;
  high: number;
  sampleSize: number;
  confidence: number;
  selected: number[];
}) {
  const minScale = 35;
  const maxScale = 95;

  function xPosition(value: number) {
    return ((value - minScale) / (maxScale - minScale)) * 100;
  }

  const meanX = xPosition(mean);
  const lowX = xPosition(low);
  const highX = xPosition(high);
  const intervalWidth = Math.max(3, highX - lowX);

  const coverageFeel =
    confidence === 90
      ? "narrower but less cautious"
      : confidence === 99
        ? "wider and more cautious"
        : "balanced interval";

  return (
    <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-4 shadow-sm md:rounded-[2rem] md:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b1116] md:text-sm">
            Statistical visual
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-neutral-950">
            Confidence interval explorer
          </h3>
        </div>

        <div className="rounded-full bg-[#111111] px-4 py-2 text-sm font-semibold text-white">
          {confidence}%
        </div>
      </div>

      <p className="mt-2 text-sm leading-6 text-neutral-700">
        The estimate sits in the centre. The interval shows uncertainty around
        that estimate.
      </p>

      <div className="mt-3 rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-4">
        <div className="rounded-[1.25rem] border border-neutral-200 bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-neutral-950">
              Current estimate
            </p>

            <p className="text-sm font-semibold text-[#8b1116]">
              {round(mean, 1)}
            </p>
          </div>

          <div className="relative mt-8 h-24">
            <div className="absolute left-0 right-0 top-1/2 h-1 rounded-full bg-neutral-200" />

            <div
              className="absolute top-1/2 h-3 -translate-y-1/2 rounded-full bg-[#8b1116]/25 transition-all duration-500"
              style={{
                left: `${lowX}%`,
                width: `${intervalWidth}%`,
              }}
            />

            <div
              className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-[#8b1116] shadow-xl transition-all duration-500"
              style={{ left: `${meanX}%` }}
            />

            <div
              className="absolute top-[20%] h-[72%] w-px bg-[#8b1116]/40 transition-all duration-500"
              style={{ left: `${lowX}%` }}
            />

            <div
              className="absolute top-[20%] h-[72%] w-px bg-[#8b1116]/40 transition-all duration-500"
              style={{ left: `${highX}%` }}
            />

            <div
              className="absolute -top-1 -translate-x-1/2 rounded-full bg-[#111111] px-2 py-1 text-[10px] font-semibold text-white transition-all duration-500"
              style={{ left: `${meanX}%` }}
            >
              mean
            </div>

            <span className="absolute bottom-0 left-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
              lower values
            </span>

            <span className="absolute bottom-0 right-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
              higher values
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <MiniMetric label="Lower" value={`${round(low, 1)}`} />
            <MiniMetric label="Mean" value={`${round(mean, 1)}`} />
            <MiniMetric label="Upper" value={`${round(high, 1)}`} />
          </div>
        </div>

        <div className="mt-3 rounded-[1.25rem] border border-neutral-200 bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-neutral-950">
              Sample distribution
            </p>

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
              n = {sampleSize}
            </p>
          </div>

          <div className="relative mt-4 h-40 overflow-hidden rounded-[1rem] bg-[#fcfaf6]">
            <div className="absolute inset-x-4 bottom-8 h-px bg-neutral-200" />

            {selected.slice(0, 36).map((value, index) => {
              const left = xPosition(value);
              const bottom = 22 + ((index * 17) % 88);

              return (
                <div
                  key={`${value}-${index}`}
                  className="absolute h-3 w-3 rounded-full bg-[#8b1116]/70 shadow-sm transition-all duration-500"
                  style={{
                    left: `${left}%`,
                    bottom: `${bottom}px`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
            Interval behaviour
          </p>

          <p className="mt-2 text-xl font-semibold tracking-[-0.045em] text-neutral-950">
            {coverageFeel}
          </p>
        </div>

        <div className="rounded-[1.25rem] bg-[#111111] p-4 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
            Teaching point
          </p>

          <p className="mt-2 text-sm leading-6 text-white/75">
            A confidence interval is not a decoration around a mean. It is a
            visual statement about uncertainty.
          </p>
        </div>
      </div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] bg-[#f7f4ee] p-3 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-semibold tracking-[-0.045em] text-neutral-950">
        {value}
      </p>
    </div>
  );
}