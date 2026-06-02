export default function CertificatePolicyPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-20">
      <section className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-semibold text-[#8b1116]">
          ← Back to homepage
        </a>

        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
            Certificate Policy
          </p>

          <h1 className="font-serif-academic mt-4 text-3xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-4xl md:text-7xl">
            Course completion certificates.
          </h1>

          <p className="mt-6 text-base leading-8 text-neutral-600 md:text-lg">
            My Academic Tutor may provide private course completion certificates
            for selected structured courses. These certificates confirm
            participation or completion of platform-based learning activities.
          </p>
        </div>

        <div className="mt-10 rounded-[1.25rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-serif-academic text-3xl font-semibold tracking-tight">
            Important limitation
          </h2>

          <p className="mt-4 text-sm leading-7 text-neutral-600">
            My Academic Tutor does not award university degrees, statutory
            qualifications, regulated academic credits, government-recognised
            diplomas or professional licences.
          </p>
        </div>
      </section>
    </main>
  );
}
