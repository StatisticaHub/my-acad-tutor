"use client";

import { useState } from "react";

const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}`;
}

const routes = [
  {
    label: "Study a structured course",
    title: "Begin with the Learning Hub",
    href: "/learning-hub",
    description:
      "Choose a structured course pathway if you want organised lessons, clear explanations, visual learning, worked examples and quizzes.",
    bestFor:
      "Students who want to build foundations step by step rather than jumping between disconnected resources.",
    steps: [
      "Choose your subject pathway",
      "Study the lessons in sequence",
      "Use labs and quizzes to check understanding",
    ],
  },
  {
    label: "Get academic support",
    title: "Request subject-focused guidance",
    href: "/contact",
    description:
      "Use this route if you need help understanding concepts, preparing for a quantitative module, reviewing methods or interpreting academic material.",
    bestFor:
      "Students who want explanation, direction and confidence while completing their own academic work responsibly.",
    steps: [
      "Share your subject and academic level",
      "Describe the topic or difficulty",
      "Receive guidance focused on understanding",
    ],
  },
  {
    label: "Plan research or analysis",
    title: "Explore research and analysis support",
    href: "/services",
    description:
      "Use this route for dissertation planning, study design, variable selection, method choice, statistical interpretation and reporting structure.",
    bestFor:
      "Students and researchers who need help making sense of data, methods and results without compromising academic integrity.",
    steps: [
      "Clarify the research question",
      "Identify suitable methods and variables",
      "Interpret and report findings responsibly",
    ],
  },
];

export default function LearningRouteSelector() {
  const [active, setActive] = useState(0);
  const route = routes[active];

  return (
    <section className="bg-white px-5 py-10 text-neutral-950 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-6 shadow-sm md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              Find your route
            </p>

            <h2 className="font-serif-academic mt-3 text-4xl font-medium leading-tight tracking-[-0.025em] md:text-5xl">
              Choose the right starting point.
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-600">
              Select the option that best matches your current goal. The guide
              will suggest the most suitable place to begin on the platform.
            </p>

            <div className="mt-6 grid gap-2">
              {routes.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => setActive(index)}
                  className={`rounded-md border px-4 py-3 text-left text-sm font-semibold transition ${
                    active === index
                      ? "border-[#8b1116] bg-[#8b1116] text-white shadow-sm"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-[#8b1116]/40 hover:bg-[#fffaf7]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-neutral-500">
                  Recommended route
                </p>

                <h3 className="font-serif-academic mt-3 text-4xl font-semibold tracking-tight">
                  {route.title}
                </h3>
              </div>

              <span className="w-fit rounded-full bg-[#f7f4ee] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8b1116]">
                Route {active + 1}
              </span>
            </div>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-neutral-600">
              {route.description}
            </p>

            <div className="mt-5 rounded-xl border border-neutral-200 bg-[#f8f6f1] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
                Best for
              </p>

              <p className="mt-2 text-sm leading-7 text-neutral-700">
                {route.bestFor}
              </p>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {route.steps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-md border border-neutral-200 bg-white p-4"
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
              href={withBasePath(route.href)}
              className="mt-7 inline-flex rounded-md bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Continue →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}