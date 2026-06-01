const values = [
  {
    title: "Clarity",
    text: "Complex quantitative ideas are explained step by step, with emphasis on meaning and interpretation.",
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
    text: "The platform focuses on statistics, biostatistics, data science, programming and research methods.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-16 text-neutral-950 md:px-8 md:py-20">
      <section className="mx-auto max-w-7xl">
        <a href="/" className="text-sm font-semibold text-[#8b1116]">
          ← Back to homepage
        </a>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              About
            </p>

            <h1 className="font-serif-academic mt-4 text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
              A founder-led platform for quantitative learning.
            </h1>
          </div>

          <p className="max-w-3xl text-base leading-8 text-neutral-600 md:text-lg">
            My Academic Tutor is a specialist academic support and structured
            learning platform for university students, researchers and
            early-career professionals working with statistics, biostatistics,
            programming, data science, bioinformatics and quantitative research
            methods.
          </p>
        </div>

        <div className="mt-12 rounded-[1.25rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
            Founder note
          </p>

          <h2 className="font-serif-academic mt-3 text-4xl font-semibold tracking-tight">
            Built around clear explanation and responsible academic support.
          </h2>

          <p className="mt-5 max-w-5xl text-sm leading-8 text-neutral-600 md:text-base">
            Founded by Rahul, with academic training in MSc Statistics from
            Indian Institute of Technology Kanpur, India, and MSc Medical
            Statistics and Health Data Science from the University of Bristol,
            UK, the platform is shaped by a commitment to statistical reasoning,
            applied interpretation and structured teaching.
          </p>
        </div>

        <div className="mt-8 grid gap-px overflow-hidden rounded-[1.25rem] border border-neutral-200 bg-neutral-200 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <article key={value.title} className="bg-white p-6">
              <h2 className="font-serif-academic text-2xl font-semibold tracking-tight">
                {value.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-neutral-600">
                {value.text}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
