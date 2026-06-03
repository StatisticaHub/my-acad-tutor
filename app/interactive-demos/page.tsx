import type { Metadata } from "next";
import NormalDistributionExplorer from "@/components/interactive/NormalDistributionExplorer";
import RegressionLineExplorer from "@/components/interactive/RegressionLineExplorer";
import ConfidenceIntervalSimulator from "@/components/interactive/ConfidenceIntervalSimulator";

export const metadata: Metadata = {
  title: "Interactive Demos",
  description:
    "Explore interactive statistics demos for normal distributions, regression lines and confidence intervals at My Academic Tutor.",
};

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const demoCards = [
  {
    number: "01",
    title: "Normal distribution explorer",
    anchor: "#normal-distribution",
    description:
      "Change distribution settings and connect centre, spread and curve shape visually.",
    bestFor: ["Mean", "Standard deviation", "Shape", "Probability intuition"],
  },
  {
    number: "02",
    title: "Regression line explorer",
    anchor: "#regression-line",
    description:
      "Explore how slope, intercept and noise affect fitted lines and visual interpretation.",
    bestFor: ["Slope", "Intercept", "Noise", "Prediction intuition"],
  },
  {
    number: "03",
    title: "Confidence interval simulator",
    anchor: "#confidence-interval",
    description:
      "Use repeated sampling to understand why confidence intervals vary from sample to sample.",
    bestFor: ["Sampling", "Uncertainty", "Coverage", "Interpretation"],
  },
];

const learningSteps = [
  {
    title: "Move the controls",
    text: "Start by changing the sliders or inputs and observing what changes visually.",
  },
  {
    title: "Describe the behaviour",
    text: "Put the visual change into words before jumping to formulas or notation.",
  },
  {
    title: "Connect to the course",
    text: "Use the Statistics Foundation lessons to study the formal explanation after the visual intuition.",
  },
];

export default function InteractiveDemosPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-20">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/learning-hub")}
          className="text-sm font-bold text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to Learning Hub
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Interactive demos
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl md:text-7xl">
                Visual statistics demos for active learning.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Use these demos to build intuition before studying formal
                notation, derivations, assumptions and interpretation.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Learning method
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                See the idea before formalising it.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                The demos are designed to support conceptual learning, not
                replace the notes, examples and quizzes inside the course.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#demos"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Start demos
            </a>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Open Statistics Foundation
            </a>

            <a
              href={withBasePath("/resources")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Browse resources
            </a>
          </div>
        </section>

        <section
          id="demos"
          className="mt-8 scroll-mt-24 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
        >
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Demo library
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-5xl">
              Start with the visual overview.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              These three demos introduce ideas that appear repeatedly in
              statistics: distributions, relationships and uncertainty.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {demoCards.map((demo) => (
              <a
                key={demo.title}
                href={demo.anchor}
                className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
              >
                <p className="font-sans text-3xl font-black tracking-[-0.05em] text-[#8b1116]">
                  {demo.number}
                </p>

                <h3 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                  {demo.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {demo.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {demo.bestFor.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-black text-neutral-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-sm font-black text-[#8b1116]">
                  Open demo →
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {learningSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#8b1116]">
                Step {index + 1}
              </p>

              <h2 className="mt-3 font-sans text-xl font-black tracking-[-0.03em]">
                {step.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {step.text}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-8">
          <div id="normal-distribution" className="scroll-mt-24">
            <NormalDistributionExplorer />
          </div>

          <div id="regression-line" className="scroll-mt-24">
            <RegressionLineExplorer />
          </div>

          <div id="confidence-interval" className="scroll-mt-24">
            <ConfidenceIntervalSimulator />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Use with courses
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Pair demos with Statistics Foundation.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              Interactive tools work best with lecture explanations, detailed
              notes, examples and quizzes. Use them before or after studying the
              related lesson.
            </p>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Open Statistics Foundation →
            </a>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/90">
              Need help interpreting?
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Use resources or request support.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              If a concept is unclear, browse the resource library or send a
              support enquiry with the topic, level and concept you are trying
              to understand.
            </p>

            <a
              href={withBasePath("/contact")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Request support →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}