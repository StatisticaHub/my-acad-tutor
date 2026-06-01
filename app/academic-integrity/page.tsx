export default function AcademicIntegrityPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-16 text-neutral-950 md:px-8 md:py-20">
      <section className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-semibold text-[#8b1116]">
          ← Back to homepage
        </a>

        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
            Academic Integrity
          </p>

          <h1 className="font-serif-academic mt-4 text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
            Guidance-based academic support.
          </h1>

          <p className="mt-6 text-base leading-8 text-neutral-600 md:text-lg">
            My Academic Tutor supports learning, interpretation and academic
            confidence. We do not complete assessed work on behalf of students.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.25rem] border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="font-serif-academic text-3xl font-semibold tracking-tight">
              We can help with
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-neutral-600">
              <li>Concept explanation</li>
              <li>Statistical method selection</li>
              <li>Software guidance and debugging support</li>
              <li>Research planning and interpretation</li>
              <li>Exam preparation and revision support</li>
            </ul>
          </div>

          <div className="rounded-[1.25rem] border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="font-serif-academic text-3xl font-semibold tracking-tight">
              We do not provide
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-neutral-600">
              <li>Ghostwriting assessed work</li>
              <li>Submitting work on behalf of students</li>
              <li>Impersonation in exams or assessments</li>
              <li>Changing results to fit a desired conclusion</li>
              <li>Academic misconduct or dishonest completion of coursework</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
