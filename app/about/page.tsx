import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about My Academic Tutor, a structured academic support and quantitative learning platform for statistics, biostatistics, data science, programming and research methods.",
};

const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const values = [
  {
    title: "Clarity",
    text: "Complex quantitative ideas are explained step by step, with emphasis on meaning, interpretation and confidence.",
  },
  {
    title: "Academic responsibility",
    text: "Support is designed to help students understand and work independently, not replace their own academic effort.",
  },
  {
    title: "Structured learning",
    text: "Courses and support materials are organised to move from foundations to applied reasoning.",
  },
  {
    title: "Quantitative depth",
    text: "The platform focuses on statistics, biostatistics, data science, programming, bioinformatics and research methods.",
  },
];

const focusAreas = [
  "Statistics and probability",
  "Biostatistics and health data",
  "Programming and statistical software",
  "Research methods and dissertation planning",
  "Machine learning for medical and academic data",
  "Bioinformatics and quantitative interpretation",
];

const platformSections = [
  {
    title: "Structured courses",
    text: "Course pages are organised into modules, lessons, notes, worked examples, quizzes and interactive learning routes.",
    href: "/courses",
    cta: "View courses",
  },
  {
    title: "Learning Hub",
    text: "The Learning Hub brings together courses, resources, demos and student pathways in one central place.",
    href: "/learning-hub",
    cta: "Open Learning Hub",
  },
  {
    title: "Academic support",
    text: "Support focuses on explanation, planning, interpretation and software guidance while maintaining academic integrity.",
    href: "/services",
    cta: "View services",
  },
];

const credibilityPoints = [
  "Founder-led quantitative education platform",
  "Built around statistics, biostatistics and health data science",
  "Designed for university students and research learners",
  "Emphasis on interpretation, not just procedures",
  "Clear academic integrity boundaries",
  "Public resources plus structured course pathways",
];

const timeline = [
  {
    year: "2020",
    title: "Teaching and academic support foundation",
    text: "The tutoring and learning-support direction began with statistics, mathematics and quantitative subject support.",
  },
  {
    year: "2024",
    title: "Advanced statistics training",
    text: "The academic direction strengthened through postgraduate-level statistics training and applied quantitative projects.",
  },
  {
    year: "2026",
    title: "Premium learning platform rebuild",
    text: "My Academic Tutor is being rebuilt as a structured public learning platform with courses, resources, demos and support routes.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-20">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-bold text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            About
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl md:text-7xl">
                A structured platform for quantitative learning.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                My Academic Tutor is a specialist academic support and
                structured learning platform for university students,
                researchers and early-career professionals working with
                quantitative subjects.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Founder note
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                Built around clarity, structure and responsible academic
                support.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Founded by an Indian Institute of Technology Kanpur alumnus, the
                platform supports learners across statistics, biostatistics,
                data science, programming, bioinformatics and research methods.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath("/learning-hub")}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Explore Learning Hub →
            </a>

            <a
              href={withBasePath("/courses")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 hover:shadow-sm sm:w-auto"
            >
              View courses
            </a>

            <a
              href={withBasePath("/contact")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-200 bg-[#f7f4ee] px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 hover:shadow-sm sm:w-auto"
            >
              Request support
            </a>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h2 className="font-sans text-2xl font-black tracking-[-0.04em]">
                {value.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {value.text}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Platform purpose
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Quantitative learning should feel structured, explainable and
              academically responsible.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              The website brings together public resources, structured courses,
              interactive demos and guidance-based support so students can move
              from confusion to independent understanding.
            </p>

            <a
              href={withBasePath("/start-here")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Start here →
            </a>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Focus areas
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em]">
              Built for quantitative subjects.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <div
                  key={area}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold leading-6 text-neutral-800"
                >
                  {area}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            What the platform includes
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-5xl">
              Courses, resources and responsible support in one place.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              My Academic Tutor is being built as more than a tutoring website.
              It is a structured learning environment for quantitative subjects.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {platformSections.map((section) => (
              <a
                key={section.title}
                href={withBasePath(section.href)}
                className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
              >
                <h3 className="font-sans text-2xl font-black tracking-[-0.04em]">
                  {section.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {section.text}
                </p>

                <p className="mt-5 text-sm font-black text-[#8b1116]">
                  {section.cta} →
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Credibility
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              A focused platform, not a generic course catalogue.
            </h2>

            <div className="mt-6 grid gap-3">
              {credibilityPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold leading-6 text-neutral-800"
                >
                  {point}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/90">
              Learning promise
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              The aim is understanding, not shortcuts.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              The platform is designed to help learners understand concepts,
              build confidence, interpret results and make better academic
              decisions. It is not designed for ghostwriting, impersonation or
              dishonest completion of assessed work.
            </p>

            <a
              href={withBasePath("/academic-integrity")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Read academic integrity policy →
            </a>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Development timeline
          </p>

          <h2 className="mt-4 max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-5xl">
            From tutoring experience to a structured learning platform.
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {timeline.map((item) => (
              <article
                key={item.year}
                className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6"
              >
                <p className="font-sans text-4xl font-black tracking-[-0.05em] text-[#8b1116]">
                  {item.year}
                </p>

                <h3 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] bg-[#111111] p-6 text-white shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
            Next step
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-5xl">
                Start with the route that matches your current goal.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/90">
                Use the Start Here page to choose between courses, resources,
                interactive demos or academic support.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href={withBasePath("/start-here")}
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
              >
                Start here →
              </a>

              <a
                href={withBasePath("/contact")}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                Contact support →
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}