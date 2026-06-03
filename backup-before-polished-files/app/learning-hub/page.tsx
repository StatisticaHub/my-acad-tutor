import NormalDistributionExplorer from "@/components/interactive/NormalDistributionExplorer";
import RegressionLineExplorer from "@/components/interactive/RegressionLineExplorer";
import ConfidenceIntervalSimulator from "@/components/interactive/ConfidenceIntervalSimulator";

const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const pathways = [
  {
    number: "01",
    title: "Statistics Foundation",
    tag: "Available",
    level: "Beginner to intermediate",
    href: "/courses/statistics-foundation",
    description:
      "A theory-first, zero-coding pathway that builds statistical thinking from the ground up: data, descriptive statistics, probability, inference and regression.",
    details: [
      "5 modules and 26 structured lessons",
      "Lectures, detailed notes, interactive labs, worked examples and quizzes",
      "Designed before biostatistics, data science, epidemiology and research methods",
    ],
    outcomes: [
      "Understand statistical notation and reasoning",
      "Build confidence with probability and inference",
      "Interpret regression models carefully",
    ],
    cta: "Open pathway",
  },
  {
    number: "02",
    title: "Machine Learning in Biostatistics",
    tag: "Module 1 available",
    level: "Intermediate",
    href: "/courses/machine-learning-biostatistics",
    description:
      "A structured medical machine learning pathway focused on prediction, validation, overfitting, leakage, calibration and clinical interpretation.",
    details: [
      "Module 1 foundations now available",
      "Medical and health-data examples",
      "Prediction, validation, leakage and responsible reporting",
    ],
    outcomes: [
      "Understand prediction modelling in health data",
      "Recognise overfitting and leakage",
      "Interpret performance metrics clinically",
    ],
    cta: "View pathway",
  },
  {
    number: "03",
    title: "Research Methods & Data Analysis",
    tag: "Planned",
    level: "Project support",
    href: "/courses",
    description:
      "A future applied pathway for students planning dissertations, research reports and quantitative projects.",
    details: [
      "Study design and variable planning",
      "Analysis strategy and method choice",
      "Interpretation, limitations and reporting",
    ],
    outcomes: [
      "Plan analysis around a research question",
      "Choose appropriate methods",
      "Report findings responsibly",
    ],
    cta: "Explore courses",
  },
];

const hubSteps = [
  {
    title: "Choose a pathway",
    description:
      "Start with the course that matches your current level and academic goal.",
  },
  {
    title: "Follow the sequence",
    description:
      "Study lessons in order so concepts, notation and interpretation build naturally.",
  },
  {
    title: "Use active practice",
    description:
      "Work through visual labs, examples and quizzes to check understanding.",
  },
  {
    title: "Return to theory",
    description:
      "Use detailed notes when formulas, assumptions or derivations feel unclear.",
  },
];

const learningFormats = [
  {
    title: "Structured courses",
    description:
      "Complete pathways with ordered lessons, theory, examples, labs and quizzes.",
  },
  {
    title: "Interactive demos",
    description:
      "Visual tools help students see how statistical ideas behave, not just memorise formulas.",
  },
  {
    title: "Resource guides",
    description:
      "Public guides explain method choice, interpretation, assumptions, software and research planning.",
  },
];

const platformCards = [
  {
    title: "Pricing preview",
    body: "See the planned free, premium course, academic support and institution support structure before live payments are connected.",
    href: "/pricing",
    cta: "View pricing",
  },
  {
    title: "Dashboard preview",
    body: "Preview the future student dashboard with course progress, saved lessons, coding labs and certificate placeholders.",
    href: "/dashboard",
    cta: "Open dashboard preview",
  },
  {
    title: "Interactive demos",
    body: "Try visual demonstrations for distributions, regression and confidence intervals.",
    href: "/interactive-demos",
    cta: "Try demos",
  },
];

const resourceHighlights = [
  {
    title: "Choosing the correct statistical test",
    href: "/resources/how-to-choose-the-correct-statistical-test",
  },
  {
    title: "P-values, confidence intervals and effect sizes",
    href: "/resources/understanding-p-values-confidence-intervals-and-effect-sizes",
  },
  {
    title: "Linear regression assumptions and diagnostics",
    href: "/resources/linear-regression-assumptions-and-diagnostics",
  },
  {
    title: "Survival analysis: Kaplan-Meier curves and Cox regression",
    href: "/resources/survival-analysis-kaplan-meier-curves-and-cox-regression",
  },
  {
    title: "R, Python, SPSS, SAS or Stata: which should I use?",
    href: "/resources/r-python-spss-sas-stata-which-should-i-use",
  },
];

export default function LearningHubPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-white md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-bold text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Learning Hub
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.05em] md:text-6xl">
                Learn quantitative subjects through structured pathways.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-white/90 md:text-lg md:leading-8">
                The Learning Hub brings together guided courses, interactive
                demos, flagship resources and platform previews for statistics,
                biostatistics, data science, research methods and quantitative
                academic development.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-white/90 md:text-lg md:leading-8">
                Each pathway is designed to move from concepts to notation,
                theory, interpretation and practice, so students understand not
                only what to do, but why the method works and when it should be
                used.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                How to use the hub
              </p>

              <div className="mt-5 grid gap-3">
                {hubSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-3xl border border-neutral-200 bg-white p-5"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116]">
                      Step {index + 1}
                    </p>

                    <h2 className="mt-2 font-sans text-lg font-black tracking-[-0.03em] text-white">
                      {step.title}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-white/90">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#pathways"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              View pathways
            </a>

            <a
              href={withBasePath("/interactive-demos")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Try interactive demos
            </a>

            <a
              href={withBasePath("/resources")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-[#f7f4ee] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 sm:w-auto"
            >
              Browse resources
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["3", "Learning pathways"],
              ["26+", "Foundation lessons"],
              ["Interactive", "Visual demos"],
              ["Applied", "Resource guides"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="font-sans text-2xl font-black tracking-[-0.04em] text-white">
                  {value}
                </p>
                <p className="mt-2 text-sm font-bold text-white/85">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {learningFormats.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h2 className="font-sans text-2xl font-black tracking-[-0.04em]">
                {item.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/90">
                {item.description}
              </p>
            </article>
          ))}
        </section>

        <section
          id="pathways"
          className="mt-8 scroll-mt-24 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
        >
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Guided pathways
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Start with the pathway that matches your current goal.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-white/90">
              The hub is organised around learning routes. Some students need
              foundations, some need applied modelling, and others need support
              planning research or analysis.
            </p>
          </div>

          <div className="mt-8 grid gap-5">
            {pathways.map((pathway) => (
              <a
                key={pathway.title}
                href={withBasePath(pathway.href)}
                className="group rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:bg-white md:p-7"
              >
                <div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#111111]">
                        {pathway.number}
                      </span>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#8b1116]">
                        {pathway.tag}
                      </span>
                    </div>

                    <h3 className="mt-5 font-sans text-3xl font-black leading-tight tracking-[-0.04em] group-hover:text-[#8b1116] md:text-4xl">
                      {pathway.title}
                    </h3>

                    <p className="mt-4 text-sm font-black text-white/75">
                      {pathway.level}
                    </p>
                  </div>

                  <div>
                    <p className="text-base leading-8 text-white/90">
                      {pathway.description}
                    </p>

                    <div className="mt-6 grid gap-4 lg:grid-cols-2">
                      <div className="rounded-3xl border border-neutral-200 bg-white p-5">
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-white/75">
                          Includes
                        </p>

                        <ul className="mt-4 space-y-3 text-sm leading-7 text-white/90">
                          {pathway.details.map((detail) => (
                            <li key={detail} className="flex gap-3">
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#8b1116]" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-3xl border border-neutral-200 bg-white p-5">
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-white/75">
                          You will learn to
                        </p>

                        <ul className="mt-4 space-y-3 text-sm leading-7 text-white/90">
                          {pathway.outcomes.map((outcome) => (
                            <li key={outcome} className="flex gap-3">
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <p className="mt-7 text-sm font-black text-[#8b1116]">
                      {pathway.cta} →
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Interactive learning preview
          </p>

          <div className="mt-4 max-w-4xl">
            <h2 className="font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Learn statistics by moving, seeing and interpreting.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              These demos show the direction of My Academic Tutor: visual
              explanations, active learning and interpretation-focused
              quantitative education.
            </p>
          </div>

          <div className="mt-8 grid gap-8">
            <NormalDistributionExplorer />
            <RegressionLineExplorer />
            <ConfidenceIntervalSimulator />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath("/interactive-demos")}
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Open all interactive demos
            </a>

            <a
              href={withBasePath("/dashboard")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              View dashboard preview
            </a>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Platform preview
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Explore the platform experience before login and payments.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              Live Stripe payments, full student login and progress tracking can
              be added later. For now, these preview pages show the platform
              direction clearly.
            </p>
          </article>

          <div className="grid gap-4">
            {platformCards.map((card) => (
              <a
                key={card.title}
                href={withBasePath(card.href)}
                className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="font-sans text-2xl font-black tracking-[-0.04em]">
                  {card.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/90">
                  {card.body}
                </p>

                <p className="mt-5 text-sm font-black text-[#8b1116]">
                  {card.cta} →
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Flagship resource guides
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <h2 className="font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
                Start with the most useful public guides.
              </h2>

              <p className="mt-5 text-base leading-8 text-white/90">
                These guides support students who need quick but careful help
                with method choice, interpretation, regression, survival
                analysis and software selection.
              </p>

              <a
                href={withBasePath("/resources")}
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#8b1116] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 sm:w-auto"
              >
                View all resources
              </a>
            </div>

            <div className="grid gap-3">
              {resourceHighlights.map((resource, index) => (
                <a
                  key={resource.href}
                  href={withBasePath(resource.href)}
                  className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:bg-white"
                >
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116]">
                    Guide {index + 1}
                  </p>

                  <h3 className="mt-2 font-sans text-xl font-black tracking-[-0.03em]">
                    {resource.title}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] bg-white p-6 text-[#111111] shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/90">
            Need live guidance?
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="max-w-3xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
                Enquire for subject-wise live sessions.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/90">
                Alongside structured pathways, students can enquire about live
                support in statistics, biostatistics, programming, data science,
                bioinformatics and dissertation data analysis.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href={withBasePath("/courses#live-sessions")}
                className="rounded-full bg-white px-6 py-4 text-center text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
              >
                View live session subjects
              </a>

              <a
                href={withBasePath("/contact")}
                className="rounded-full border border-[#ded9cf] bg-[#f7f4ee] px-6 py-4 text-center text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
              >
                Submit an enquiry
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}