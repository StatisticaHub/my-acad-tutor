export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          My Academic Tutor
        </p>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Premium interactive learning for Statistics, Biostatistics and Data Science.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Structured courses, visual explanations, academic tutoring, and research-focused
          support for students working with statistics, programming, biostatistics,
          bioinformatics and data science.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/learning-hub"
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            Explore Learning Hub
          </a>

          <a
            href="/contact"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-white"
          >
            Request Academic Support
          </a>
        </div>
      </section>
    </main>
  );
}