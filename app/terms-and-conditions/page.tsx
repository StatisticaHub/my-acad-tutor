export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-20">
      <section className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-semibold text-[#8b1116]">
          ← Back to homepage
        </a>

        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
            Terms & Conditions
          </p>

          <h1 className="font-serif-academic mt-4 text-3xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-4xl md:text-7xl">
            Terms for using My Academic Tutor.
          </h1>

          <p className="mt-6 text-base leading-8 text-neutral-600 md:text-lg">
            By using My Academic Tutor, students agree that support is provided
            for educational guidance, learning and interpretation. Support must
            not be used for dishonest academic completion or misconduct.
          </p>
        </div>
      </section>
    </main>
  );
}
