export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-16 text-neutral-950 md:px-8 md:py-20">
      <section className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-semibold text-[#8b1116]">
          ← Back to homepage
        </a>

        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
            Privacy Policy
          </p>

          <h1 className="font-serif-academic mt-4 text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
            Privacy and student information.
          </h1>

          <p className="mt-6 text-base leading-8 text-neutral-600 md:text-lg">
            My Academic Tutor treats student information responsibly. Support
            requests, academic details and personal information are used only to
            understand and respond to learning or support needs.
          </p>
        </div>

        <div className="mt-10 rounded-[1.25rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm leading-7 text-neutral-600">
            For privacy-related questions, email contact@myacademictutor.com.
          </p>
        </div>
      </section>
    </main>
  );
}
