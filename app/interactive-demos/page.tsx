"use client";

import { useMemo, useState, type MouseEvent } from "react";

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

const demoTabs = [
  {
    id: "uncertainty",
    label: "Uncertainty",
    title: "Confidence intervals",
    note: "How sample size and confidence level change interval width.",
  },
  {
    id: "regression",
    label: "Regression",
    title: "Model surface",
    note: "How predictors shape a fitted plane.",
  },
  {
    id: "threshold",
    label: "Prediction",
    title: "Decision threshold",
    note: "How a model becomes a decision rule.",
  },
] as const;

type DemoId = (typeof demoTabs)[number]["id"];

export default function InteractiveDemosPreview() {
  const [activeDemo, setActiveDemo] = useState<DemoId>("uncertainty");

  return (
    <section className="bg-[#f7f4ee] px-4 py-6 text-[#111111] sm:px-5 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
            <div className="p-5 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm md:tracking-[0.22em]">
                Interactive demos
              </p>

              <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.045em] md:mt-4 md:text-5xl">
                Explore statistical ideas visually.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-700 md:mt-5 md:text-base md:leading-8">
                Switch between live visual demos and adjust the controls. Each
                visual is designed to show the concept, not just decorate the
                page.
              </p>

              <div className="mt-6 grid gap-3">
                {demoTabs.map((demo) => (
                  <button
                    key={demo.id}
                    type="button"
                    onClick={() => setActiveDemo(demo.id)}
                    className={`rounded-[1.35rem] border p-4 text-left transition ${
                      activeDemo === demo.id
                        ? "border-[#8b1116] bg-[#8b1116] text-white shadow-sm"
                        : "border-neutral-200 bg-[#f7f4ee] text-neutral-950 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-semibold">{demo.label}</p>

                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                          activeDemo === demo.id
                            ? "bg-white/15 text-white/80"
                            : "bg-white text-neutral-500"
                        }`}
                      >
                        Live
                      </span>
                    </div>

                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em]">
                      {demo.title}
                    </h3>

                    <p
                      className={`mt-2 text-sm leading-6 ${
                        activeDemo === demo.id
                          ? "text-white/75"
                          : "text-neutral-600"
                      }`}
                    >
                      {demo.note}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-neutral-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b1116]">
                  Learning design
                </p>

                <p className="mt-2 text-sm leading-7 text-neutral-700">
                  Learners change one or two values and immediately see how the
                  statistical object responds: an interval, a fitted surface or
                  a decision boundary.
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-7">
                <a
                  href={withBasePath("/interactive-demos")}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8b1116] sm:w-auto md:py-4"
                >
                  Explore all demos →
                </a>

                <a
                  href={withBasePath("/learning-hub")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 px-6 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
                >
                  Continue learning →
                </a>
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-[#fdfbf7] p-4 sm:p-5 md:p-8 lg:border-l lg:border-t-0">
              {activeDemo === "uncertainty" && <UncertaintyDemo />}
              {activeDemo === "regression" && <RegressionDemo />}
              {activeDemo === "threshold" && <ThresholdDemo />}
            </aside>
          </div>
        </section>
      </div>
    </section>
  );
}

function TiltShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setTilt({
      x: -((y / rect.height) - 0.5) * 7,
      y: ((x / rect.width) - 0.5) * 7,
    });
  }

  return (
    <div
      className="relative min-h-[620px] overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-[radial-gradient(circle_at_18%_10%,rgba(139,17,22,0.16),transparent_32%),radial-gradient(circle_at_92%_12%,rgba(17,17,17,0.10),transparent_34%),linear-gradient(135deg,#ffffff,#f7f4ee_60%,#efe8dc)] p-4 shadow-sm md:rounded-[2rem] md:p-5"
      style={{ perspective: "1300px" }}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="pointer-events-none absolute -left-12 top-12 h-44 w-44 rounded-full bg-[#8b1116]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-14 bottom-16 h-52 w-52 rounded-full bg-black/10 blur-3xl" />

      <div
        className="relative h-full transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="relative h-full rounded-[1.5rem] border border-white/70 bg-white/85 p-4 shadow-[0_22px_70px_rgba(17,17,17,0.12)] backdrop-blur md:rounded-[1.75rem] md:p-5"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b1116]">
                {eyebrow}
              </p>

              <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.045em] text-[#111111] md:text-3xl">
                {title}
              </h3>
            </div>

            <span className="rounded-full border border-neutral-200 bg-[#f7f4ee] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-600">
              Interactive
            </span>
          </div>

          <p className="mt-4 text-sm leading-7 text-neutral-700">
            {description}
          </p>

          {children}
        </div>
      </div>
    </div>
  );
}

function ControlSlider({
  label,
  value,
  min,
  max,
  step,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block rounded-[1.2rem] border border-neutral-200 bg-white p-3.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-neutral-950">{label}</span>

        <span className="rounded-full bg-[#f7f4ee] px-3 py-1 text-xs font-semibold text-[#8b1116]">
          {value}
          {suffix}
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

function SmallMetric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-[1.15rem] border border-neutral-200 bg-white p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-semibold tracking-[-0.055em] text-neutral-950">
        {value}
      </p>
    </div>
  );
}

function UncertaintyDemo() {
  const [sampleSize, setSampleSize] = useState(24);
  const [confidence, setConfidence] = useState(95);

  const values = useMemo(
    () =>
      Array.from({ length: sampleSize }, (_, index) => {
        const wave = Math.sin(index * 1.7) * 7;
        const trend = (index % 9) * 1.1;
        return 58 + wave + trend;
      }),
    [sampleSize],
  );

  const stats = useMemo(() => {
    const mean = values.reduce((total, value) => total + value, 0) / values.length;
    const sd = Math.sqrt(
      values.reduce((total, value) => total + (value - mean) ** 2, 0) /
        (values.length - 1),
    );
    const se = sd / Math.sqrt(values.length);
    const margin = zValue(confidence) * se;

    return {
      mean,
      low: mean - margin,
      high: mean + margin,
      width: margin * 2,
      se,
    };
  }, [values, confidence]);

  const lowX = ((stats.low - 40) / 45) * 100;
  const highX = ((stats.high - 40) / 45) * 100;
  const meanX = ((stats.mean - 40) / 45) * 100;

  return (
    <TiltShell
      eyebrow="Statistical inference"
      title="Confidence interval explorer"
      description="Change sample size and confidence level to see how uncertainty around an estimate becomes wider or narrower."
    >
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <ControlSlider
          label="Sample size"
          value={sampleSize}
          min={8}
          max={60}
          step={1}
          suffix=""
          onChange={setSampleSize}
        />

        <div className="rounded-[1.2rem] border border-neutral-200 bg-white p-3.5">
          <div className="flex items-center justify-between gap-3">
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
                className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                  confidence === level
                    ? "bg-[#111111] text-white"
                    : "border border-neutral-200 bg-[#f7f4ee] text-neutral-700"
                }`}
              >
                {level}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="mt-5 rounded-[1.5rem] border border-neutral-200 bg-[#fcfaf6] p-4"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="relative h-[300px] overflow-hidden rounded-[1.25rem] border border-neutral-200 bg-white">
          <div className="absolute inset-x-8 top-1/2 h-1 rounded-full bg-neutral-200" />

          <div
            className="absolute top-1/2 h-5 -translate-y-1/2 rounded-full bg-[#8b1116]/25 transition-all duration-500"
            style={{
              left: `${lowX}%`,
              width: `${Math.max(5, highX - lowX)}%`,
            }}
          />

          <div
            className="absolute top-[34%] h-[34%] w-px bg-[#8b1116]/50 transition-all duration-500"
            style={{ left: `${lowX}%` }}
          />

          <div
            className="absolute top-[34%] h-[34%] w-px bg-[#8b1116]/50 transition-all duration-500"
            style={{ left: `${highX}%` }}
          />

          <div
            className="absolute top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-[#8b1116] shadow-xl transition-all duration-500"
            style={{ left: `${meanX}%` }}
          />

          <span
            className="absolute top-[36%] -translate-x-1/2 rounded-full bg-[#111111] px-3 py-1 text-xs font-semibold text-white transition-all duration-500"
            style={{ left: `${meanX}%` }}
          >
            mean
          </span>

          {values.slice(0, 42).map((value, index) => {
            const left = ((value - 40) / 45) * 100;
            const bottom = 38 + ((index * 19) % 132);

            return (
              <div
                key={`${value}-${index}`}
                className="absolute h-3 w-3 rounded-full bg-[#8b1116]/65 shadow-sm transition-all duration-500"
                style={{
                  left: `${left}%`,
                  bottom: `${bottom}px`,
                  transform: "translateZ(24px)",
                }}
              />
            );
          })}

          <span className="absolute bottom-4 left-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
            lower values
          </span>

          <span className="absolute bottom-4 right-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
            higher values
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2.5">
        <SmallMetric label="Mean" value={round(stats.mean, 1)} />
        <SmallMetric label="SE" value={round(stats.se, 2)} />
        <SmallMetric label="Lower" value={round(stats.low, 1)} />
        <SmallMetric label="Upper" value={round(stats.high, 1)} />
      </div>
    </TiltShell>
  );
}

function RegressionDemo() {
  const [slope, setSlope] = useState(0.55);
  const [noise, setNoise] = useState(24);

  const points = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => {
        const x = 8 + (index % 6) * 15;
        const z = 16 + Math.floor(index / 6) * 25;
        const y = 62 - slope * x + Math.sin(index * 1.4) * noise * 0.25;

        return { x, y, z };
      }),
    [slope, noise],
  );

  const fitQuality = Math.max(36, Math.min(94, 96 - noise * 1.8));

  return (
    <TiltShell
      eyebrow="Regression modelling"
      title="Fitted surface explorer"
      description="Change the slope and noise to see how a fitted regression surface becomes clearer or harder to trust."
    >
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <ControlSlider
          label="Slope strength"
          value={round(slope, 2)}
          min={0.1}
          max={1}
          step={0.05}
          onChange={setSlope}
        />

        <ControlSlider
          label="Noise"
          value={noise}
          min={5}
          max={40}
          step={1}
          onChange={setNoise}
        />
      </div>

      <div
        className="mt-5 rounded-[1.5rem] border border-neutral-200 bg-[#fcfaf6] p-4"
        style={{ transform: "translateZ(20px)" }}
      >
        <div
          className="relative h-[330px] overflow-hidden rounded-[1.25rem] border border-neutral-200 bg-[linear-gradient(135deg,#ffffff,#f7f4ee)]"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute inset-x-10 bottom-16 h-px bg-neutral-200" />
          <div className="absolute bottom-16 left-10 top-10 w-px bg-neutral-200" />

          <div
            className="absolute left-[18%] top-[24%] h-[170px] w-[66%] rounded-[1.25rem] border border-[#8b1116]/20 bg-[#8b1116]/12 shadow-[0_24px_55px_rgba(139,17,22,0.12)] transition-transform duration-500"
            style={{
              transform: `rotateX(62deg) rotateZ(${-15 - slope * 10}deg) translateZ(36px)`,
            }}
          />

          <div
            className="absolute left-[24%] top-[39%] h-[90px] w-[50%] rounded-full border border-[#8b1116]/25 bg-[#8b1116]/10 blur-sm transition-transform duration-500"
            style={{
              transform: `rotateX(65deg) rotateZ(${-15 - slope * 10}deg) translateZ(20px)`,
            }}
          />

          {points.map((point, index) => {
            const left = point.x;
            const top = Math.max(13, Math.min(84, point.y));
            const size = 12 + (point.z / 70) * 8;

            return (
              <div
                key={`${point.x}-${point.z}-${index}`}
                className="absolute rounded-full border-2 border-white bg-[#8b1116] shadow-lg transition-all duration-500"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: `translate(-50%, -50%) translateZ(${point.z}px)`,
                  opacity: 0.74 + point.z / 230,
                }}
              />
            );
          })}

          <span className="absolute bottom-4 left-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500 shadow-sm">
            predictor 1
          </span>

          <span className="absolute bottom-4 right-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500 shadow-sm">
            predictor 2
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <SmallMetric label="Slope" value={round(slope, 2)} />
        <SmallMetric label="Noise" value={noise} />
        <SmallMetric label="Fit" value={`${round(fitQuality, 0)}%`} />
      </div>
    </TiltShell>
  );
}

function ThresholdDemo() {
  const [threshold, setThreshold] = useState(0.52);

  const patients = [
    { x: 12, y: 70, risk: 0.18 },
    { x: 20, y: 50, risk: 0.25 },
    { x: 30, y: 76, risk: 0.33 },
    { x: 38, y: 42, risk: 0.39 },
    { x: 47, y: 60, risk: 0.46 },
    { x: 55, y: 35, risk: 0.53 },
    { x: 63, y: 66, risk: 0.58 },
    { x: 70, y: 48, risk: 0.64 },
    { x: 79, y: 28, risk: 0.72 },
    { x: 88, y: 40, risk: 0.82 },
  ];

  const flagged = patients.filter((patient) => patient.risk >= threshold).length;
  const near = patients.filter(
    (patient) => patient.risk >= threshold - 0.08 && patient.risk < threshold,
  ).length;
  const lower = patients.length - flagged - near;

  const thresholdTop = 88 - threshold * 76;

  return (
    <TiltShell
      eyebrow="Prediction modelling"
      title="Decision threshold explorer"
      description="Move the threshold and watch the same model become more cautious or more sensitive."
    >
      <div className="mt-5">
        <ControlSlider
          label="Decision threshold"
          value={round(threshold, 2)}
          min={0.25}
          max={0.75}
          step={0.01}
          onChange={setThreshold}
        />
      </div>

      <div
        className="mt-5 rounded-[1.5rem] border border-neutral-200 bg-[#fcfaf6] p-4"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="relative h-[330px] overflow-hidden rounded-[1.25rem] border border-neutral-200 bg-white">
          <div className="absolute inset-x-0 top-0 h-[42%] bg-[#8b1116]/10" />
          <div className="absolute inset-x-0 top-[42%] h-[24%] bg-amber-300/15" />
          <div className="absolute inset-x-0 bottom-0 h-[34%] bg-neutral-950/[0.03]" />

          <div
            className="absolute left-5 right-5 z-20 border-t-2 border-dashed border-[#8b1116] transition-all duration-300"
            style={{ top: `${thresholdTop}%` }}
          >
            <span className="absolute -top-3 left-3 rounded-full bg-[#8b1116] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm">
              threshold
            </span>
          </div>

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 420 330"
            aria-hidden="true"
          >
            <path
              d="M22 278 C 80 268, 130 225, 178 178 C 230 128, 286 72, 400 48"
              fill="none"
              stroke="#8b1116"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.16"
            />

            <path
              d="M22 278 C 80 268, 130 225, 178 178 C 230 128, 286 72, 400 48"
              fill="none"
              stroke="#8b1116"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.9"
            />
          </svg>

          {patients.map((patient, index) => {
            const isFlagged = patient.risk >= threshold;
            const isNear = patient.risk >= threshold - 0.08 && patient.risk < threshold;

            return (
              <div
                key={`${patient.risk}-${index}`}
                className="absolute rounded-full border-2 border-white shadow-lg transition-all duration-300"
                style={{
                  left: `${patient.x}%`,
                  top: `${patient.y}%`,
                  width: isFlagged ? 20 : isNear ? 17 : 14,
                  height: isFlagged ? 20 : isNear ? 17 : 14,
                  backgroundColor: isFlagged
                    ? "#8b1116"
                    : isNear
                      ? "#f59e0b"
                      : "#9ca3af",
                  transform: isFlagged
                    ? "translate(-50%, -50%) translateZ(58px) scale(1.08)"
                    : isNear
                      ? "translate(-50%, -50%) translateZ(36px)"
                      : "translate(-50%, -50%) translateZ(18px)",
                  opacity: isFlagged ? 1 : isNear ? 0.92 : 0.7,
                }}
              />
            );
          })}

          <span className="absolute bottom-4 left-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500 shadow-sm">
            lower score
          </span>

          <span className="absolute bottom-4 right-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500 shadow-sm">
            higher score
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <SmallMetric label="Flagged" value={flagged} />
        <SmallMetric label="Near line" value={near} />
        <SmallMetric label="Lower" value={lower} />
      </div>
    </TiltShell>
  );
}