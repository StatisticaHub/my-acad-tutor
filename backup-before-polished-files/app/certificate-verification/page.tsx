export default function CertificateVerificationPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-20">
      <section className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-semibold text-[#8b1116]">
          ← Back to homepage
        </a>

        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
            Certificate Verification
          </p>

          <h1 className="font-serif-academic mt-4 text-3xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-4xl md:text-7xl">
            Verify a course certificate.
          </h1>

          <p className="mt-6 text-base leading-8 text-neutral-600 md:text-lg">
            Certificate verification will be available for selected My Academic
            Tutor course completion certificates.
          </p>
        </div>

        <div className="mt-10 rounded-[1.25rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-serif-academic text-3xl font-semibold tracking-tight">
            Verification requests
          </h2>

          <p className="mt-4 text-sm leading-7 text-neutral-600">
            For now, please email contact@myacademictutor.com with the learner
            name, course name and certificate reference number if available.
          </p>

          <a
            href="mailto:contact@myacademictutor.com?subject=Certificate%20verification"
            className="mt-6 inline-flex rounded-md bg-[#8b1116] px-6 py-3 text-sm font-semibold text-white"
          >
            Email verification request
          </a>
        </div>
      </section>
    </main>
  );
}
