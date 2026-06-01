export default function ZScoresPage() {
  return (
    <main className="min-h-screen bg-[#f2efe7] px-6 py-16 text-neutral-950">
      <section className="mx-auto max-w-5xl rounded-[2rem] border border-[#ded9cf] bg-white p-8 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
          Module 2 · Lesson 2.4
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
          Standardisation and Z-scores
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-600">
          This lesson page is ready. We will build this with z-score formulas,
          standardisation, relative position, outlier detection and comparison
          across scales.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/courses/statistics-foundation/modules/descriptive-statistics/lessons/shape-skewness-outliers"
            className="rounded-full border border-[#ded9cf] bg-white px-5 py-3 text-sm font-black"
          >
            ← Previous lesson
          </a>
          <a
            href="/courses/statistics-foundation/modules/descriptive-statistics/lessons/correlation-association"
            className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-black text-white"
          >
            Next lesson →
          </a>
        </div>
      </section>
    </main>
  );
}
