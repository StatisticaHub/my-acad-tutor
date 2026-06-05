"use client";

import { useMemo, useState, type MouseEvent } from "react";

const patients = [
  { x: 12, y: 72, risk: 0.18 },
  { x: 18, y: 58, risk: 0.22 },
  { x: 25, y: 80, risk: 0.26 },
  { x: 31, y: 48, risk: 0.29 },
  { x: 38, y: 64, risk: 0.33 },
  { x: 44, y: 38, risk: 0.37 },
  { x: 49, y: 74, risk: 0.41 },
  { x: 55, y: 52, risk: 0.46 },
  { x: 61, y: 33, risk: 0.51 },
  { x: 66, y: 62, risk: 0.56 },
  { x: 71, y: 44, risk: 0.61 },
  { x: 76, y: 25, risk: 0.66 },
  { x: 82, y: 54, risk: 0.71 },
  { x: 87, y: 36, risk: 0.77 },
  { x: 92, y: 18, risk: 0.84 },
];

const bands = [
  { label: "Lower", top: "66%", height: "34%" },
  { label: "Borderline", top: "42%", height: "24%" },
  { label: "Higher", top: "0%", height: "42%" },
];

export default function HeroInteractiveVisual() {
  const [threshold, setThreshold] = useState(0.5);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const summary = useMemo(() => {
    const flagged = patients.filter((patient) => patient.risk >= threshold).length;
    const near = patients.filter(
      (patient) =>
        patient.risk >= threshold - 0.08 && patient.risk < threshold,
    ).length;
    const lower = patients.length - flagged - near;

    const sensitivityFeel =
      threshold < 0.4 ? "Screening-like" : threshold > 0.62 ? "Conservative" : "Balanced";

    return { flagged, near, lower, sensitivityFeel };
  }, [threshold]);

  const thresholdPosition = 88 - threshold * 76;

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setTilt({
      x: -((y / rect.height) - 0.5) * 8,
      y: ((x / rect.width) - 0.5) * 8,
    });
  }

  return (
    <div
      className="relative h-full min-h-[430px] overflow-hidden rounded-[1.75rem] border border-[#E4DED2] bg-[radial-gradient(circle_at_15%_10%,rgba(139,17,22,0.16),transparent_32%),radial-gradient(circle_at_90%_8%,rgba(17,17,17,0.12),transparent_34%),linear-gradient(135deg,#ffffff,#f3eee4_55%,#efe8dc)] p-4 shadow-sm md:rounded-[2rem] md:p-5"
      style={{ perspective: "1300px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-[#741018]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-20 h-48 w-48 rounded-full bg-[#141210]/10 blur-3xl" />

      <div
        className="relative h-full transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="relative h-full rounded-[1.5rem] border border-white/70 bg-[#FFFCF6]/85 p-4 shadow-[0_18px_55px_rgba(17,17,17,0.10)] backdrop-blur md:rounded-[1.75rem] md:p-4"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#741018]">
                Live 3D visual
              </p>

              <h2 className="mt-2 text-xl font-semibold leading-tight tracking-[-0.045em] text-[#141210] md:text-2xl">
                Prediction threshold surface
              </h2>
            </div>

            <span className="rounded-full border border-[#E4DED2] bg-[#F7F3EA] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#5F5F5F]">
              Interactive
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-[#525252]">
            Move the threshold to see how a prediction model changes its
            decisions. Points above the surface are flagged as higher risk.
          </p>

          <div
            className="relative mt-3 overflow-hidden rounded-[1.5rem] border border-[#E4DED2] bg-[#fcfaf6] p-4"
            style={{ transform: "translateZ(18px)" }}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#141210]">
                  Patient risk field
                </p>
                <p className="mt-1 text-xs leading-5 text-[#7a7063]">
                  x-axis: predictor pattern · height: predicted risk
                </p>
              </div>

              <p className="rounded-full bg-[#FFFCF6] px-3 py-1 text-xs font-semibold text-[#741018] shadow-sm">
                threshold {threshold.toFixed(2)}
              </p>
            </div>

            <div
              className="relative mt-4 h-[190px] overflow-hidden rounded-[1.25rem] border border-[#E4DED2] bg-[#FFFCF6]"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {bands.map((band) => (
                <div
                  key={band.label}
                  className="absolute left-0 right-0 border-b border-white/70"
                  style={{
                    top: band.top,
                    height: band.height,
                    background:
                      band.label === "Higher"
                        ? "linear-gradient(90deg, rgba(139,17,22,0.14), rgba(139,17,22,0.04))"
                        : band.label === "Borderline"
                          ? "linear-gradient(90deg, rgba(245,158,11,0.14), rgba(245,158,11,0.04))"
                          : "linear-gradient(90deg, rgba(17,17,17,0.06), rgba(17,17,17,0.02))",
                  }}
                >
                  <span className="absolute right-3 top-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                    {band.label}
                  </span>
                </div>
              ))}

              <div className="absolute inset-x-8 bottom-10 h-px bg-neutral-200" />
              <div className="absolute bottom-10 left-8 top-8 w-px bg-neutral-200" />

              <div
                className="absolute left-5 right-5 z-20 rounded-full border-t-2 border-dashed border-[#741018] transition-all duration-300"
                style={{
                  top: `${thresholdPosition}%`,
                  transform: "translateZ(42px)",
                }}
              >
                <span className="absolute -top-3 left-3 rounded-full bg-[#741018] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm">
                  decision plane
                </span>
              </div>

              <svg
                className="absolute inset-0 h-full w-full opacity-90"
                viewBox="0 0 420 285"
                aria-hidden="true"
              >
                <path
                  d="M20 228 C 80 218, 120 190, 170 155 C 230 110, 280 78, 400 48"
                  fill="none"
                  stroke="#741018"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0.22"
                />
                <path
                  d="M20 228 C 80 218, 120 190, 170 155 C 230 110, 280 78, 400 48"
                  fill="none"
                  stroke="#741018"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              </svg>

              {patients.map((patient, index) => {
                const flagged = patient.risk >= threshold;
                const near =
                  patient.risk >= threshold - 0.08 && patient.risk < threshold;
                const size = flagged ? 18 : near ? 15 : 12;

                return (
                  <div
                    key={`${patient.x}-${patient.y}-${index}`}
                    className="absolute rounded-full border-2 border-white shadow-lg transition-all duration-300"
                    style={{
                      left: `${patient.x}%`,
                      top: `${patient.y}%`,
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: flagged
                        ? "#741018"
                        : near
                          ? "#f59e0b"
                          : "#9ca3af",
                      transform: flagged
                        ? "translate(-50%, -50%) translateZ(55px) scale(1.08)"
                        : near
                          ? "translate(-50%, -50%) translateZ(35px)"
                          : "translate(-50%, -50%) translateZ(15px)",
                      opacity: flagged ? 1 : near ? 0.92 : 0.72,
                    }}
                  />
                );
              })}

              <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-[#FFFCF6]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7a7063] shadow-sm">
                lower predictor pattern
              </div>

              <div className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-[#FFFCF6]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7a7063] shadow-sm">
                higher predictor pattern
              </div>
            </div>

            <label
              htmlFor="hero-threshold"
              className="mt-4 block text-sm font-semibold text-neutral-800"
            >
              Adjust decision threshold
            </label>

            <input
              id="hero-threshold"
              type="range"
              min="0.25"
              max="0.75"
              step="0.01"
              value={threshold}
              onChange={(event) => setThreshold(Number(event.target.value))}
              className="mt-2 w-full accent-[#741018]"
            />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2.5">
            <Metric label="Flagged" value={summary.flagged} tone="red" />
            <Metric label="Near line" value={summary.near} tone="amber" />
            <Metric label="Lower" value={summary.lower} tone="dark" />
          </div>

          <div
            className="mt-3 rounded-[1.35rem] border border-neutral-900 bg-[#11100E] p-3.5 text-white"
            style={{ transform: "translateZ(24px)" }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                  Decision behaviour
                </p>

                <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em]">
                  {summary.sensitivityFeel}
                </h3>
              </div>

              <span className="rounded-full bg-[#FFFCF6]/10 px-3 py-1 text-xs font-semibold text-white/80">
                live update
              </span>
            </div>

            <p className="mt-3 text-sm leading-7 text-white/75">
              The same model can behave differently depending on the threshold.
              Learners can see why prediction is both statistical and
              decision-based.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "red" | "amber" | "dark";
}) {
  const text =
    tone === "red"
      ? "text-[#741018]"
      : tone === "amber"
        ? "text-amber-600"
        : "text-neutral-900";

  return (
    <div className="rounded-[1.15rem] border border-[#E4DED2] bg-[#FFFCF6] p-3 shadow-sm">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7a7063]">
        {label}
      </p>

      <p className={`mt-1 text-2xl font-semibold tracking-[-0.06em] ${text}`}>
        {value}
      </p>
    </div>
  );
}