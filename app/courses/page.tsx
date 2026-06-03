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
    title: "Statistics Foundation",
    status: "Available",
    level: "Beginner → intermediate",
    href: "/courses/statistics-foundation",
    description:
      "A zero-coding, theory-first course for university students who need strong foundations in statistical thinking, probability, descriptive statistics and inference.",
    points: ["5 modules", "Structured lessons", "No coding", "Theory and interpretation"],
  },
  {
    number: "02",
    title: "Machine Learning in Biostatistics",
    status: "Module 1 available",
    level: "Intermediate",
    href: "/courses/machine-learning-biostatistics",
    description:
      "A health-data machine learning course focused on prediction, validation, overfitting, leakage, clinical usefulness and responsible reporting.",
    points: ["Medical examples", "Validation focus", "Clinical prediction", "Biostatistical interpretation"],
  },
  {
    number: "03",
    title: "Research Methods & Data Analysis",
    status: "Planned",
    level: "Project support",
    href: "/resources",
    description:
      "A future pathway for dissertation planning, research questions, variables, analysis strategy, results interpretation and reporting limitations.",
    points: ["Study design", "Variables", "Analysis planning", "Reporting"],
  },
];

const learningOptions = [
  {
    title: "Self-paced courses",
    description: "Structured pathways for students who want to study in order and build knowledge step by step.",
  },
  {
    title: "Live subject sessions",
    description: "Topic-specific support for students who need explanation, revision, software guidance or interpretation help.",
  },
  {
    title: "Research guidance",
    description: "Responsible support for research questions, method choice, analysis planning, limitations and reporting.",
  },
];

const coursePrinciples = [
  "Concepts before procedures",
  "Notation explained carefully",
  "Interpretation included throughout",
  "Assumptions and limitations made explicit",
  "Academic integrity respected",
  "Progression from foundations to application",
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-20">
      <section className="mx-auto max-w-7xl">
        <a href={withBasePath("/")} className="text-sm font-bold text-[#8b1116] hover:text-[#5f0b0f]">← Back to homepage</a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">Courses</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl md:text-7xl">
                Structured learning pathways for quantitative subjects.
              </h1>
              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Courses are designed for students who want organised learning rather than scattered notes. Each pathway moves from concepts to theory, examples, interpretation and responsible academic use.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">Best first step</p>
              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">Start with Statistics Foundation if you are unsure.</h2>
              <p className="mt-4 text-sm leading-7 text-neutral-700">It builds the language needed before biostatistics, data science, machine learning, epidemiology and research methods.</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {learningOptions.map((option) => (
            <article key={option.title} className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="font-sans text-2xl font-black tracking-[-0.04em]">{option.title}</h2>
              <p className="mt-4 text-sm leading-7 text-neutral-700">{option.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">Available and planned pathways</p>
          <div className="mt-8 grid gap-5">
            {courses.map((course) => (
              <a key={course.title} href={withBasePath(course.href)} className="group rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:p-7">
                <div className="grid gap-6 lg:grid-cols-[0.18fr_1fr_0.7fr] lg:items-start">
                  <p className="font-sans text-4xl font-black tracking-[-0.05em] text-[#8b1116]">{course.number}</p>
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#111111] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">{course.status}</span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-neutral-600">{course.level}</span>
                    </div>
                    <h2 className="mt-5 font-sans text-3xl font-black leading-tight tracking-[-0.04em]">{course.title}</h2>
                    <p className="mt-4 max-w-3xl text-base leading-8 text-neutral-700">{course.description}</p>
                    <p className="mt-5 text-sm font-black text-[#8b1116]">Open course →</p>
                  </div>
                  <div className="grid gap-2">
                    {course.points.map((point) => (
                      <div key={point} className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-neutral-800">{point}</div>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">Course principles</p>
            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">Designed to teach reasoning, not shortcuts.</h2>
            <p className="mt-5 text-base leading-8 text-white/90">The aim is to help students understand what methods mean, when they are appropriate, how to interpret outputs and where limitations appear.</p>
          </article>
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">What the courses emphasise</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {coursePrinciples.map((point) => (
                <div key={point} className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold leading-6 text-neutral-800">{point}</div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
