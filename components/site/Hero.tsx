import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#f7f4ee] px-5 py-12 text-neutral-950 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-[1.5rem] border border-[#ead8d8] bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#8b1116]">
            New courses launching July 2026
          </p>

          <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg">
            Statistics Foundation for University Students and Machine Learning
            in Biostatistics are being released as structured learning pathways
            by My Academic Tutor.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/courses"
              className="rounded-md bg-[#8b1116] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
            >
              Explore courses
            </a>

            <a
              href="/contact"
              className="rounded-md border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:-translate-y-0.5"
            >
              Join interest list
            </a>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.36em] text-[#8b1116]">
              Statistics · Biostatistics · Data Science · Research Methods
            </p>

            <h1 className="font-serif-academic mt-6 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
              Specialist academic support and structured courses for
              quantitative learning.
            </h1>

            <div className="mt-7 max-w-4xl space-y-5 text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
              <p>
                My Academic Tutor supports university students, researchers and
                early-career professionals across statistics, biostatistics,
                programming, data science, bioinformatics and quantitative
                research methods.
              </p>

              <p>
                From foundational statistical theory to applied medical
                statistics, machine learning, dissertation analysis and research
                interpretation, the platform is designed to make complex
                quantitative subjects clearer, structured and academically
                responsible.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="/start-here"
                className="rounded-md bg-neutral-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
              >
                Start here
              </a>

              <a
                href="/learning-hub"
                className="rounded-md border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:-translate-y-0.5"
              >
                Visit Learning Hub
              </a>

              <a
                href="/contact"
                className="rounded-md border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:-translate-y-0.5"
              >
                Request support
              </a>
            </div>

            <div className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
              {[
                ["2020", "Supporting learners since"],
                ["July 2026", "Structured course release"],
                ["0", "Shortcuts or assignment writing"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="border-l border-neutral-300 bg-white/60 px-5 py-4"
                >
                  <p className="font-serif-academic text-3xl font-semibold tracking-tight text-neutral-950">
                    {value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[1.5rem] border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="relative min-h-[560px] overflow-hidden rounded-[1.1rem] border border-neutral-200 bg-neutral-950">
              <Image
                src="/images/academic-tutoring-hero.jpg"
                alt="Academic tutoring and research support workspace"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/78" />

              <div className="relative z-10 flex min-h-[560px] flex-col justify-between p-8 text-white md:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.36em] text-white/70">
                  Academic research and data analysis workspace
                </p>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">
                    Founder-led academic platform
                  </p>

                  <h2 className="font-serif-academic mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
                    Built around clarity, interpretation and responsible
                    learning.
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 md:text-base">
                    Founded by Rahul, with academic training in MSc Statistics
                    from IIT Kanpur and MSc Medical Statistics and Health Data
                    Science from the University of Bristol.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}