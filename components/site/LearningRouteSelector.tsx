"use client";

import { useState } from "react";

const routes = [
  {
    label: "I want a structured course",
    title: "Start with the Learning Hub",
    href: "/learning-hub",
    description:
      "Use structured course pathways with lectures, notes, interactive labs, worked examples and quizzes.",
    steps: [
      "Choose your subject pathway",
      "Study lessons in order",
      "Use quizzes and labs to check understanding",
    ],
  },
  {
    label: "I need academic support",
    title: "Request subject-focused guidance",
    href: "/contact",
    description:
      "Best for students who need help understanding concepts, planning analysis, interpreting results or preparing for quantitative modules.",
    steps: [
      "Share your subject and level",
      "Describe your topic or challenge",
      "Receive guidance focused on understanding",
    ],
  },
  {
    label: "I am working on research",
    title: "Explore research and analysis support",
    href: "/services",
    description:
      "Useful for dissertation planning, study design, variable selection, method choice and interpretation of statistical results.",
    steps: [
      "Clarify your research question",
      "Identify variables and methods",
      "Understand how to report findings responsibly",
    ],
  },
];

export default function LearningRouteSelector() {
  const [active, setActive] = useState(0);
  const route = routes[active];

  return (
    <section className="bg-white px-5 py-16 text-neutral-950 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-6 shadow-sm md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              Interactive guide
            </p>

            <h2 className="font-serif-academic mt-3 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              Choose your starting point.
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-600">
              Select the option closest to your current goal. The guide will
              suggest where to begin on the platform.
            </p>

            <div className="mt-6 grid gap-2">
              {routes.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => setActive(index)}
                  className={`rounded-md border px-4 py-3 text-left text-sm font-semibold transition ${
                    active === index
                      ? "border-[#8b1116] bg-[#8b1116] text-white"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-[#8b1116]/40"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-neutral-200 bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-neutral-500">
              Recommended route
            </p>

            <h3 className="font-serif-academic mt-3 text-4xl font-semibold tracking-tight">
              {route.title}
            </h3>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600">
              {route.description}
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {route.steps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-md border border-neutral-200 bg-[#f8f6f1] p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-neutral-800">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <a
              href={route.href}
              className="mt-7 inline-flex rounded-md bg-neutral-950 px-6 py-3 text-sm font-semibold text-white"
            >
              Continue →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}