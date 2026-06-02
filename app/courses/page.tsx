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

const courses = [
  {
    number: "01",
    status: "Available",
    title: "Statistics Foundation",
    href: "/courses/statistics-foundation",
    badge: "5 modules · 26 lessons",
    level: "Beginner to intermediate",
    format: "Theory-first · Interactive · Zero coding",
    description:
      "A complete foundation course for university students beginning statistics. The course focuses on statistical thinking, notation, probability, inference, regression, derivations, interpretation and exam-style reasoning.",
    highlights: [
      "No coding required",
      "Mathematical notation and derivations",
      "Interactive labs and quizzes",
      "Ideal before biostatistics, data science or research methods",
    ],
  },
  {
    number: "02",
    status: "Launching July 2026",
    title: "Machine Learning in Biostatistics",
    href: "/courses/machine-learning-biostatistics",
    badge: "Structured applied pathway",
    level: "Intermediate to advanced",
    format: "Applied medical ML · R-based examples",
    description:
      "A medical machine learning course connecting prediction modelling with clinical interpretation. Topics include validation, overfitting, leakage, calibration, regularisation, tree-based methods and survival prediction.",
    highlights: [
      "Clinical prediction modelling",
      "Validation and calibration",
      "Overfitting and leakage",
      "Medical interpretation of model performance",
    ],
  },
  {
    number: "03",
    status: "Planned",
    title: "Research Methods & Data Analysis",
    href: "/contact",
    badge: "Future applied course",
    level: "Undergraduate to postgraduate",
    format: "Dissertation-focused · Applied guidance",
    description:
      "A future pathway for students working on dissertations, research projects and quantitative reports. The focus will be on study planning, variable selection, method choice, analysis interpretation and reporting.",
    highlights: [
      "Research question planning",
      "Method selection",
      "Tables and figures",
      "Results interpretation",
    ],
  },
];

const liveSubjects = [
  {
    title: "Statistics",
    summary:
      "Live sessions for probability, inference, regression, hypothesis testing, descriptive statistics and exam preparation.",
    topics: [
      "Probability and random variables",
      "Confidence intervals and hypothesis testing",
      "Regression and correlation",
      "Descriptive statistics and graphs",
      "Exam-style problem solving",
    ],
  },
  {
    title: "Biostatistics & Medical Statistics",
    summary:
      "Subject-focused support for medical statistics, epidemiology, survival analysis, clinical trials and diagnostic testing.",
    topics: [
      "Epidemiology foundations",
      "Survival analysis",
      "Clinical trial concepts",
      "Diagnostic test accuracy",
      "Interpreting medical statistics papers",
    ],
  },
  {
    title: "Programming for Data Analysis",
    summary:
      "Guided sessions for students using R, Python, SPSS, SAS or Stata in coursework, projects or dissertation analysis.",
    topics: [
      "R and Python basics",
      "Data cleaning and visualisation",
      "SPSS, SAS and Stata support",
      "Code walkthroughs",
      "Debugging and reproducible reports",
    ],
  },
  {
    title: "Data Science & Machine Learning",
    summary:
      "Live academic support for machine learning concepts, model evaluation, validation, prediction and interpretation.",
    topics: [
      "Machine learning foundations",
      "Train/test splits and validation",
      "Overfitting and regularisation",
      "Classification and regression models",
      "Performance metrics and interpretation",
    ],
  },
  {
    title: "Bioinformatics & Omics",
    summary:
      "Support for students learning omics concepts, RNA-seq, gene expression, biological interpretation and workflow planning.",
    topics: [
      "Gene expression concepts",
      "RNA-seq foundations",
      "Omics workflow planning",
      "Bioconductor concepts",
      "Biological interpretation",
    ],
  },
  {
    title: "Dissertation & Research Support",
    summary:
      "Guidance for research planning, analysis strategy, method selection, results interpretation and academic reporting.",
    topics: [
      "Research question refinement",
      "Variable selection",
      "Analysis plan development",
      "Tables and figures",
      "Results and limitations",
    ],
  },
];

const learningOptions = [
  {
    title: "Self-paced courses",
    description:
      "Structured lessons for students who want to study in order, revisit explanations and practise through quizzes and visual labs.",
  },
  {
    title: "Live subject sessions",
    description:
      "Book topic-specific sessions when you need explanation, revision, software guidance or help understanding research methods.",
  },
  {
    title: "Research guidance",
    description:
      "Get support with planning an analysis, choosing methods, interpreting results and structuring academic reporting responsibly.",
  },
];

export default function CoursesPage() {
  const [openSubject, setOpenSubject] = useState(0);

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-neutral-950">
      <section className="relative overflow-hidden border-b border-neutral-200 bg-white px-5 py-16 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f6dede,transparent_34%),radial-gradient(circle_at_bottom_left,#fff3d8,transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1116]">
            Courses and live learning
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="font-serif-academic max-w-5xl text-5xl font-medium leading-[1.05] tracking-[-0.03em] md:text-7xl">
                Structured courses for serious quantitative learning.
              </h1>

              <p className="mt-6 max-w-4xl text-lg leading-9 text-neutral-700">
                Learn statistics, biostatistics, data science, programming and
                research methods through structured courses, interactive lessons
                and live subject-wise academic support.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-600">
                The aim is not only to remember formulas, but to understand
                where ideas come from, how methods are interpreted, when they
                should be used and how to communicate results responsibly.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#available-courses"
                  className="rounded-md bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  View courses
                </a>

                <a
                  href="#live-sessions"
                  className="rounded-md border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Enquire for live sessions
                </a>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-neutral-200 bg-white/85 p-6 shadow-sm backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">
                Learning options
              </p>

              <div className="mt-5 grid gap-3">
                {learningOptions.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-neutral-200 bg-[#f8f6f1] p-4"
                  >
                    <h2 className="text-sm font-semibold text-neutral-950">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="available-courses"
        className="mx-auto max-w-7xl px-5 py-16 md:px-8"
      >
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              Structured pathways
            </p>

            <h2 className="font-serif-academic mt-3 text-4xl font-medium leading-tight tracking-[-0.025em] md:text-5xl">
              Courses built for understanding, interpretation and academic
              confidence.
            </h2>
          </div>

          <p className="max-w-3xl text-base leading-8 text-neutral-600">
            Each course is designed as a complete pathway with clear lesson
            sequencing, theoretical explanation, examples, interactive learning
            and assessment-style practice.
          </p>
        </div>

        <div className="grid gap-6">
          {courses.map((course) => (
            <article
              key={course.title}
              className="rounded-[1.5rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-8"
            >
              <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[#8b1116] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white">
                      {course.number}
                    </span>

                    <span className="rounded-full bg-[#f7f4ee] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#8b1116]">
                      {course.status}
                    </span>
                  </div>

                  <h3 className="font-serif-academic mt-5 text-4xl font-medium leading-tight tracking-[-0.025em]">
                    {course.title}
                  </h3>

                  <p className="mt-4 text-sm font-semibold text-neutral-500">
                    {course.badge}
                  </p>

                  <div className="mt-6 grid gap-3">
                    <div className="rounded-xl border border-neutral-200 bg-[#f8f6f1] p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                        Level
                      </p>
                      <p className="mt-1 text-sm font-semibold text-neutral-800">
                        {course.level}
                      </p>
                    </div>

                    <div className="rounded-xl border border-neutral-200 bg-[#f8f6f1] p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                        Format
                      </p>
                      <p className="mt-1 text-sm font-semibold text-neutral-800">
                        {course.format}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-base leading-8 text-neutral-700">
                    {course.description}
                  </p>

                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {course.highlights.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-neutral-200 bg-[#f8f6f1] p-4 text-sm font-semibold leading-6 text-neutral-700"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href={withBasePath(course.href)}
                      className="rounded-md bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      View course →
                    </a>

                    <a
                      href={withBasePath("/contact")}
                      className="rounded-md border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      Enquire about this course
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="live-sessions"
        className="border-y border-neutral-200 bg-white px-5 py-16 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
                Live subject-wise sessions
              </p>

              <h2 className="font-serif-academic mt-3 text-4xl font-medium leading-tight tracking-[-0.025em] md:text-5xl">
                Enquire for live sessions by subject.
              </h2>
            </div>

            <p className="max-w-3xl text-base leading-8 text-neutral-600">
              Alongside structured courses, students can enquire about live
              subject-focused sessions for statistics, biostatistics,
              programming, data science, bioinformatics and dissertation
              support.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[1.5rem] border border-neutral-200 bg-[#f8f6f1] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">
                Choose a subject
              </p>

              <div className="mt-5 grid gap-2">
                {liveSubjects.map((subject, index) => (
                  <button
                    key={subject.title}
                    onClick={() => setOpenSubject(index)}
                    className={`rounded-md border px-4 py-3 text-left text-sm font-semibold transition ${
                      openSubject === index
                        ? "border-[#8b1116] bg-[#8b1116] text-white"
                        : "border-neutral-200 bg-white text-neutral-700 hover:border-[#8b1116]/40"
                    }`}
                  >
                    {subject.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8b1116]">
                    Selected subject
                  </p>

                  <h3 className="font-serif-academic mt-3 text-4xl font-medium leading-tight tracking-[-0.025em]">
                    {liveSubjects[openSubject].title}
                  </h3>
                </div>

                <span className="w-fit rounded-full bg-[#f7f4ee] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8b1116]">
                  Live support
                </span>
              </div>

              <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-600">
                {liveSubjects[openSubject].summary}
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {liveSubjects[openSubject].topics.map((topic) => (
                  <div
                    key={topic}
                    className="rounded-xl border border-neutral-200 bg-[#f8f6f1] p-4 text-sm font-semibold leading-6 text-neutral-700"
                  >
                    {topic}
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-xl border border-[#ead8d8] bg-[#fff8f6] p-5">
                <p className="text-sm font-semibold text-neutral-950">
                  What to include in your enquiry
                </p>

                <p className="mt-2 text-sm leading-7 text-neutral-600">
                  Mention your subject, academic level, topic, software if
                  relevant, deadline and whether you need concept explanation,
                  revision, coding guidance, analysis planning or results
                  interpretation.
                </p>
              </div>

              <a
                href={withBasePath("/contact")}
                className="mt-7 inline-flex rounded-md bg-[#8b1116] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Enquire for {liveSubjects[openSubject].title} →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="rounded-[1.5rem] border border-neutral-200 bg-neutral-950 p-8 text-white shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">
                Not sure where to begin?
              </p>

              <h2 className="font-serif-academic mt-4 max-w-3xl text-4xl font-medium leading-tight tracking-[-0.025em] md:text-5xl">
                Start with your goal, and we will suggest the right route.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/70">
                You can start with a structured course, request subject support
                or enquire about live sessions for a specific topic.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href={withBasePath("/contact")}
                className="rounded-md bg-white px-6 py-4 text-center text-sm font-semibold text-neutral-950 transition hover:-translate-y-0.5"
              >
                Submit an enquiry
              </a>

              <a
                href={withBasePath("/learning-hub")}
                className="rounded-md border border-white/15 bg-white/10 px-6 py-4 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Visit Learning Hub
              </a>

              <a
                href={withBasePath("/academic-integrity")}
                className="rounded-md border border-white/15 px-6 py-4 text-center text-sm font-semibold text-white/80 transition hover:bg-white/5"
              >
                Read academic integrity policy
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}