"use client";

import { useMemo, useState } from "react";

type InputMode = "raw" | "summary";
type IntervalType = "z" | "t";

const zCritical: Record<number, number> = {
  90: 1.645,
  95: 1.96,
  99: 2.576,
};

const tCritical95: Record<number, number> = {
  1: 12.706, 2: 4.303, 3: 3.182, 4: 2.776, 5: 2.571,
  6: 2.447, 7: 2.365, 8: 2.306, 9: 2.262, 10: 2.228,
  12: 2.179, 15: 2.131, 20: 2.086, 25: 2.06, 30: 2.042,
  40: 2.021, 60: 2.0, 120: 1.98, 1000: 1.962,
};

const tCritical90: Record<number, number> = {
  1: 6.314, 2: 2.92, 3: 2.353, 4: 2.132, 5: 2.015,
  6: 1.943, 7: 1.895, 8: 1.86, 9: 1.833, 10: 1.812,
  12: 1.782, 15: 1.753, 20: 1.725, 25: 1.708, 30: 1.697,
  40: 1.684, 60: 1.671, 120: 1.658, 1000: 1.646,
};

const tCritical99: Record<number, number> = {
  1: 63.657, 2: 9.925, 3: 5.841, 4: 4.604, 5: 4.032,
  6: 3.707, 7: 3.499, 8: 3.355, 9: 3.25, 10: 3.169,
  12: 3.055, 15: 2.947, 20: 2.845, 25: 2.787, 30: 2.75,
  40: 2.704, 60: 2.66, 120: 2.617, 1000: 2.581,
};

function getTCritical(confidence: number, df: number) {
  const table =
    confidence === 90 ? tCritical90 : confidence === 99 ? tCritical99 : tCritical95;

  const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
  const key = keys.find((candidate) => df <= candidate) ?? 1000;

  return table[key];
}

function parseRawData(input: string) {
  return input
    .split(/[\s,;]+/)
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isFinite(value));
}

function mean(values: number[]) {
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function sampleSd(values: number[]) {
  if (values.length < 2) return 0;

  const xbar = mean(values);
  const variance =
    values.reduce((total, value) => total + (value - xbar) ** 2, 0) /
    (values.length - 1);

  return Math.sqrt(variance);
}

function fmt(value: number, digits = 3) {
  if (!Number.isFinite(value)) return "—";
  return value.toFixed(digits);
}

function axisPosition(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100;
}

export default function ConfidenceIntervalMeanExplorer() {
  const [inputMode, setInputMode] = useState<InputMode>("raw");
  const [intervalType, setIntervalType] = useState<IntervalType>("t");
  const [confidence, setConfidence] = useState(95);

  const [rawInput, setRawInput] = useState(
    "12, 15, 14, 16, 18, 17, 13, 15, 16, 14"
  );

  const [summaryN, setSummaryN] = useState("25");
  const [summaryMean, setSummaryMean] = useState("42.5");
  const [summarySd, setSummarySd] = useState("8.4");
  const [knownSigma, setKnownSigma] = useState("8");

  const result = useMemo(() => {
    const rawValues = inputMode === "raw" ? parseRawData(rawInput) : [];

    const n =
      inputMode === "raw" ? rawValues.length : Math.floor(Number(summaryN));

    const xbar =
      inputMode === "raw" && rawValues.length > 0
        ? mean(rawValues)
        : Number(summaryMean);

    const s =
      inputMode === "raw" && rawValues.length > 1
        ? sampleSd(rawValues)
        : Number(summarySd);

    const sigma = Number(knownSigma);

    if (!Number.isFinite(n) || n < 1 || !Number.isFinite(xbar)) {
      return {
        ok: false as const,
        message: "Enter valid data or summary values to calculate the interval.",
      };
    }

    if (intervalType === "t" && (n < 2 || !Number.isFinite(s) || s <= 0)) {
      return {
        ok: false as const,
        message:
          "For a t interval, use n ≥ 2 and provide a positive sample standard deviation.",
      };
    }

    if (intervalType === "z" && (!Number.isFinite(sigma) || sigma <= 0)) {
      return {
        ok: false as const,
        message:
          "For a z interval, provide a positive known population standard deviation.",
      };
    }

    const critical =
      intervalType === "z" ? zCritical[confidence] : getTCritical(confidence, n - 1);

    const se =
      intervalType === "z" ? sigma / Math.sqrt(n) : s / Math.sqrt(n);

    const margin = critical * se;
    const lower = xbar - margin;
    const upper = xbar + margin;

    const spread = Math.max(margin * 2.2, se * 8, 1);
    const axisMin = Math.min(lower, xbar) - spread;
    const axisMax = Math.max(upper, xbar) + spread;

    return {
      ok: true as const,
      rawValues,
      n,
      xbar,
      s,
      sigma,
      critical,
      se,
      margin,
      lower,
      upper,
      axisMin,
      axisMax,
    };
  }, [
    inputMode,
    rawInput,
    summaryN,
    summaryMean,
    summarySd,
    knownSigma,
    intervalType,
    confidence,
  ]);

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm md:rounded-[2.5rem]">
      <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
        <div className="p-5 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#741018] md:text-sm">
            Confidence interval calculator
          </p>

          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">
            Calculate a confidence interval for a mean.
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#525252] md:text-base md:leading-8">
            Enter raw data or summary statistics, choose a z or t interval, and
            see the interval, graph and interpretation update instantly.
          </p>

          <div className="mt-6 grid gap-3">
            <ControlGroup title="Input type">
              <ToggleButton active={inputMode === "raw"} onClick={() => setInputMode("raw")}>
                Raw data
              </ToggleButton>
              <ToggleButton
                active={inputMode === "summary"}
                onClick={() => setInputMode("summary")}
              >
                Data summary
              </ToggleButton>
            </ControlGroup>

            <ControlGroup title="Interval type">
              <ToggleButton active={intervalType === "z"} onClick={() => setIntervalType("z")}>
                Z interval
              </ToggleButton>
              <ToggleButton active={intervalType === "t"} onClick={() => setIntervalType("t")}>
                T interval
              </ToggleButton>
            </ControlGroup>

            <div className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4">
              <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a7063]">
                Confidence level
              </label>

              <select
                value={confidence}
                onChange={(event) => setConfidence(Number(event.target.value))}
                className="mt-3 w-full rounded-xl border border-[#D8CDBB] bg-[#FFFCF6] px-3 py-3 text-sm font-semibold text-neutral-800"
              >
                <option value={90}>90%</option>
                <option value={95}>95%</option>
                <option value={99}>99%</option>
              </select>
            </div>

            {inputMode === "raw" ? (
              <div className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4">
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a7063]">
                  Raw data
                </label>

                <textarea
                  value={rawInput}
                  onChange={(event) => setRawInput(event.target.value)}
                  rows={5}
                  className="mt-3 w-full rounded-xl border border-[#D8CDBB] bg-[#FFFCF6] px-3 py-3 text-sm leading-6 text-neutral-800"
                  placeholder="Example: 12, 15, 14, 16, 18"
                />

                {intervalType === "z" ? (
                  <NumberInput
                    label="Known population SD, σ"
                    value={knownSigma}
                    onChange={setKnownSigma}
                  />
                ) : null}
              </div>
            ) : (
              <div className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <NumberInput label="Sample size, n" value={summaryN} onChange={setSummaryN} />
                  <NumberInput
                    label="Sample mean, x̄"
                    value={summaryMean}
                    onChange={setSummaryMean}
                  />
                  <NumberInput label="Sample SD, s" value={summarySd} onChange={setSummarySd} />

                  {intervalType === "z" ? (
                    <NumberInput
                      label="Known population SD, σ"
                      value={knownSigma}
                      onChange={setKnownSigma}
                    />
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="border-t border-[#E4DED2] bg-[#fdfbf7] p-4 md:p-6 lg:border-l lg:border-t-0">
          {!result.ok ? (
            <div className="rounded-[1.5rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 text-sm leading-7 text-[#525252]">
              {result.message}
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <Metric label="n" value={String(result.n)} />
                <Metric label="Mean" value={fmt(result.xbar)} />
                <Metric label="SE" value={fmt(result.se)} />
                <Metric label="Margin" value={fmt(result.margin)} />
              </div>

              <div className="rounded-[1.5rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#741018]">
                      Result
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-[#141210]">
                      {fmt(result.lower)} to {fmt(result.upper)}
                    </h3>
                  </div>

                  <span className="rounded-full bg-[#11100E] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                    {confidence}% {intervalType.toUpperCase()}
                  </span>
                </div>

                <IntervalGraph result={result} inputMode={inputMode} />
              </div>

              <div className="rounded-[1.5rem] border border-[#E4DED2] bg-[#11100E] p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                  Basic interpretation
                </p>

                <p className="mt-3 text-sm leading-7 text-white/75">
                  Using a <strong>{confidence}%</strong>{" "}
                  <strong>{intervalType.toUpperCase()}</strong> interval, the
                  estimated population mean is between{" "}
                  <strong>{fmt(result.lower)}</strong> and{" "}
                  <strong>{fmt(result.upper)}</strong>.
                </p>

                <p className="mt-3 text-sm leading-7 text-white/75">
                  {intervalType === "z"
                    ? "A z interval is used when the population standard deviation is treated as known."
                    : "A t interval is used when the population standard deviation is unknown and the sample standard deviation is used."}
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

function ControlGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a7063]">
        {title}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-[#741018] text-white"
          : "border border-[#D8CDBB] bg-[#FFFCF6] text-[#525252] hover:bg-[#F7F3EA]"
      }`}
    >
      {children}
    </button>
  );
}

function NumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="mt-3 block">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a7063]">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-[#D8CDBB] bg-[#FFFCF6] px-3 py-3 text-sm text-neutral-800"
      />
    </label>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-[#E4DED2] bg-[#FFFCF6] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7a7063]">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[#741018]">
        {value}
      </p>
    </div>
  );
}

function IntervalGraph({
  result,
  inputMode,
}: {
  result: {
    rawValues: number[];
    xbar: number;
    lower: number;
    upper: number;
    axisMin: number;
    axisMax: number;
  };
  inputMode: InputMode;
}) {
  return <IntervalGraphContent result={result} inputMode={inputMode} />;
}

function IntervalGraphContent({
  result,
  inputMode,
}: {
  result: {
    rawValues: number[];
    xbar: number;
    lower: number;
    upper: number;
    axisMin: number;
    axisMax: number;
  };
  inputMode: InputMode;
}) {
  const lowerX = axisPosition(result.lower, result.axisMin, result.axisMax);
  const upperX = axisPosition(result.upper, result.axisMin, result.axisMax);
  const meanX = axisPosition(result.xbar, result.axisMin, result.axisMax);

  const ticks = Array.from({ length: 5 }, (_, index) => {
    const value =
      result.axisMin + (index / 4) * (result.axisMax - result.axisMin);

    return {
      value,
      left: index * 25,
    };
  });

  return (
    <div className="mt-5 rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#741018]">
            Visual interval
          </p>

          <h4 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[#141210]">
            Mean estimate with uncertainty range
          </h4>
        </div>

        <div className="rounded-full bg-[#FFFCF6] px-3 py-1.5 text-xs font-semibold text-[#5F5F5F]">
          Lower → Mean → Upper
        </div>
      </div>

      <div className="relative mt-5 h-[300px] overflow-hidden rounded-[1.25rem] border border-[#E4DED2] bg-[#FFFCF6] p-5">
        <div className="absolute left-5 right-5 top-16 h-[150px] rounded-[1.25rem] bg-[linear-gradient(90deg,rgba(17,17,17,0.03),rgba(139,17,22,0.08),rgba(17,17,17,0.03))]" />

        <div className="absolute left-9 right-9 top-[150px] h-1 rounded-full bg-neutral-200" />

        {ticks.map((tick) => (
          <div
            key={tick.left}
            className="absolute top-[139px] h-7 w-px bg-neutral-300"
            style={{ left: `calc(36px + ${tick.left}% * 0.88)` }}
          >
            <span className="absolute top-9 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold text-neutral-400">
              {fmt(tick.value, 1)}
            </span>
          </div>
        ))}

        {inputMode === "raw"
          ? result.rawValues.slice(0, 80).map((value, index) => {
              const left = axisPosition(value, result.axisMin, result.axisMax);
              const y = 70 + ((index * 23) % 108);

              return (
                <span
                  key={`${value}-${index}`}
                  className="absolute h-2.5 w-2.5 rounded-full bg-[#741018]/35 shadow-sm transition-all duration-300"
                  style={{
                    left: `calc(36px + ${left}% * 0.88)`,
                    top: `${y}px`,
                  }}
                />
              );
            })
          : (
            <div className="absolute left-8 right-8 top-20 rounded-[1rem] border border-dashed border-[#D8CDBB] bg-[#F7F3EA] p-4 text-center text-sm leading-6 text-[#5F5F5F]">
              Summary input mode: the interval is calculated from n, mean and SD.
            </div>
          )}

        <div
          className="absolute top-[141px] h-5 -translate-y-1/2 rounded-full bg-[#741018]/20 transition-all duration-500"
          style={{
            left: `calc(36px + ${lowerX}% * 0.88)`,
            width: `calc(${Math.max(5, upperX - lowerX)}% * 0.88)`,
          }}
        />

        <div
          className="absolute top-[116px] h-[54px] w-px bg-[#741018] transition-all duration-500"
          style={{ left: `calc(36px + ${lowerX}% * 0.88)` }}
        />

        <div
          className="absolute top-[116px] h-[54px] w-px bg-[#741018] transition-all duration-500"
          style={{ left: `calc(36px + ${upperX}% * 0.88)` }}
        />

        <div
          className="absolute top-[141px] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-[#11100E] shadow-xl transition-all duration-500"
          style={{ left: `calc(36px + ${meanX}% * 0.88)` }}
        />

        <span
          className="absolute top-[84px] -translate-x-1/2 rounded-full bg-[#11100E] px-3 py-1 text-xs font-semibold text-white shadow-sm transition-all duration-500"
          style={{ left: `calc(36px + ${meanX}% * 0.88)` }}
        >
          mean
        </span>

        <span
          className="absolute top-[178px] -translate-x-1/2 rounded-full bg-[#741018] px-3 py-1 text-[11px] font-semibold text-white shadow-sm transition-all duration-500"
          style={{ left: `calc(36px + ${lowerX}% * 0.88)` }}
        >
          lower
        </span>

        <span
          className="absolute top-[178px] -translate-x-1/2 rounded-full bg-[#741018] px-3 py-1 text-[11px] font-semibold text-white shadow-sm transition-all duration-500"
          style={{ left: `calc(36px + ${upperX}% * 0.88)` }}
        >
          upper
        </span>

        <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
          <MiniMetric label="Lower" value={fmt(result.lower)} />
          <MiniMetric label="Mean" value={fmt(result.xbar)} />
          <MiniMetric label="Upper" value={fmt(result.upper)} />
        </div>
      </div>

      <div className="mt-3 rounded-[1.25rem] bg-[#FFFCF6] p-4">
        <p className="text-sm leading-7 text-[#525252]">
          The black point is the sample mean. The red interval shows the range
          of plausible values for the population mean at the selected confidence
          level.
        </p>
      </div>
    </div>
  );
}


function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] bg-[#FFFCF6] p-3 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7a7063]">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-[#141210]">{value}</p>
    </div>
  );
}
