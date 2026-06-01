export default function DescriptiveStatisticsModulePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-950">
      <section className="mx-auto max-w-6xl">
        <a
          href="/courses/statistics-foundation"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to Statistics Foundation
        </a>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Module 2
        </p>

        <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
          Descriptive Statistics
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          This module will cover measures of centre, spread, quartiles,
          boxplots, skewness, outliers and descriptive comparison between
          groups.
        </p>
      </section>
    </main>
  );
}