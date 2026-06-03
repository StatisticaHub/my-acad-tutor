const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;
  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-20">
      <section className="mx-auto max-w-7xl">
        <a href={withBasePath("/")} className="text-sm font-bold text-[#8b1116] hover:text-[#5f0b0f]">
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">About</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl md:text-7xl">
                A structured platform for quantitative learning.
              </h1>
              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                My Academic Tutor is a specialist academic support and structured learning platform for university students, researchers and early-career professionals working with quantitative subjects.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">Founder note</p>
              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">Built around clarity, structure and responsible academic support.</h2>
              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Founded by an Indian Institute of Technology Kanpur alumnus, the platform supports learners across statistics, biostatistics, data science, programming, bioinformatics and research methods.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <article key={value.title} className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="font-sans text-2xl font-black tracking-[-0.04em]">{value.title}</h2>
              <p className="mt-4 text-sm leading-7 text-neutral-700">{value.text}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">Platform purpose</p>
            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">Quantitative learning should feel structured, explainable and academically responsible.</h2>
            <p className="mt-5 text-base leading-8 text-white/90">
              The website brings together public resources, structured courses, interactive demos and guidance-based support so students can move from confusion to independent understanding.
            </p>
          </article>
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">Focus areas</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <div key={area} className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold leading-6 text-neutral-800">
                  {area}
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
