"use client";

import { useState } from "react";

const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
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
    badge: "5 modules · Applied case studies",
    level: "Intermediate to advanced",
    format: "Medical ML · R-based examples",
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
    badge: "Future applied pathway",
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
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-bold text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Courses and live learning
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.05em] md:text-6xl">
                Structured courses for serious quantitative learning.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                Learn statistics, biostatistics, data science, programming and
                research methods through structured courses, interactive lessons
                and live subject-wise academic support.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                The aim is not only to remember formulas, but to understand
                where ideas come from, how methods are interpreted, when they
                should be used and how to communicate results responsibly.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-neutral-200 bg-[#f7f4ee] p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-neutral-700">
                Learning routes
              </p>

              <div className="mt-5 grid gap-3">
                {learningOptions.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-neutral-200 bg-white p-5"
                  >
                    <h2 className="font-sans text-lg font-black tracking-[-0.03em] text-[#111111]">
                      {item.title}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-neutral-700">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#available-courses"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              View courses
            </a>

            <a
              href="#live-sessions"
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Enquire for live sessions
            </a>

            <a
              href={withBasePath("/learning-hub")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-[#f7f4ee] px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Open Learning Hub
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["2", "Main course pathways"],
              ["Live", "Subject support"],
              ["Zero coding", "Foundation course"],
              ["Applied", "Medical ML pathway"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="font-sans text-2xl font-black tracking-[-0.04em] text-[#111111]">
                  {value}
                </p>
                <p className="mt-2 text-sm font-bold text-neutral-600">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="available-courses"
          className="mt-8 scroll-mt-24 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
        >
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Structured pathways
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Courses built for understanding, interpretation and academic
              confidence.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Each course is designed as a complete pathway with clear lesson
              sequencing, theoretical explanation, examples, interactive
              learning and assessment-style practice.
            </p>
          </div>

          <div className="mt-8 grid gap-5">
            {courses.map((course) => (
              <article
                key={course.title}
                className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:bg-white md:p-7"
              >
                <div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#111111]">
                        {course.number}
                      </span>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#8b1116]">
                        {course.status}
                      </span>
                    </div>

                    <h3 className="mt-5 font-sans text-3xl font-black leading-tight tracking-[-0.04em] md:text-4xl">
                      {course.title}
                    </h3>

                    <p className="mt-4 text-sm font-black text-neutral-700">
                      {course.badge}
                    </p>

                    <div className="mt-6 grid gap-3">
                      <div className="rounded-3xl border border-neutral-200 bg-white p-4">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-700">
                          Level
                        </p>
                        <p className="mt-2 text-sm font-bold leading-6 text-neutral-800">
                          {course.level}
                        </p>
                      </div>

                      <div className="rounded-3xl border border-neutral-200 bg-white p-4">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-700">
                          Format
                        </p>
                        <p className="mt-2 text-sm font-bold leading-6 text-neutral-800">
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
                          className="rounded-3xl border border-neutral-200 bg-white p-4 text-sm font-bold leading-7 text-neutral-700"
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <a
                        href={withBasePath(course.href)}
                        className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
                      >
                        View course →
                      </a>

                      <a
                        href={withBasePath("/contact")}
                        className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
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
          className="mt-8 scroll-mt-24 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
        >
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Live subject-wise sessions
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Enquire for live sessions by subject.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Alongside structured courses, students can enquire about live
              subject-focused sessions for statistics, biostatistics,
              programming, data science, bioinformatics and dissertation
              support.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-neutral-700">
                Choose a subject
              </p>

              <div className="mt-5 grid gap-2">
                {liveSubjects.map((subject, index) => (
                  <button
                    key={subject.title}
                    type="button"
                    onClick={() => setOpenSubject(index)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
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

            <div className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                    Selected subject
                  </p>

                  <h3 className="mt-3 font-sans text-3xl font-black leading-tight tracking-[-0.04em] md:text-4xl">
                    {liveSubjects[openSubject].title}
                  </h3>
                </div>

                <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#8b1116]">
                  Live support
                </span>
              </div>

              <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-700">
                {liveSubjects[openSubject].summary}
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {liveSubjects[openSubject].topics.map((topic) => (
                  <div
                    key={topic}
                    className="rounded-3xl border border-neutral-200 bg-white p-4 text-sm font-bold leading-7 text-neutral-700"
                  >
                    {topic}
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-3xl border border-[#ead8d8] bg-white p-5">
                <p className="text-sm font-black text-[#111111]">
                  What to include in your enquiry
                </p>

                <p className="mt-2 text-sm leading-7 text-neutral-700">
                  Mention your subject, academic level, topic, software if
                  relevant, deadline and whether you need concept explanation,
                  revision, coding guidance, analysis planning or results
                  interpretation.
                </p>
              </div>

              <a
                href={withBasePath("/contact")}
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#8b1116] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 sm:w-auto"
              >
                Enquire for {liveSubjects[openSubject].title} →
              </a>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] bg-white p-6 text-[#111111] shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-neutral-700">
            Not sure where to begin?
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="max-w-3xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
                Start with your goal, and choose the right route.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-700">
                You can start with a structured course, request subject support
                or enquire about live sessions for a specific topic.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href={withBasePath("/contact")}
                className="rounded-full bg-white px-6 py-4 text-center text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
              >
                Submit an enquiry
              </a>

              <a
                href={withBasePath("/learning-hub")}
                className="rounded-full border border-white/15 bg-white/10 px-6 py-4 text-center text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
              >
                Visit Learning Hub
              </a>

              <a
                href={withBasePath("/academic-integrity")}
                className="rounded-full border border-white/15 px-6 py-4 text-center text-sm font-black text-neutral-700 transition hover:bg-white/5"
              >
                Read academic integrity policy
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}