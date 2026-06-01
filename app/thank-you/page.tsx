export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-16 text-neutral-950 md:px-8 md:py-20">
      <section className="mx-auto max-w-4xl rounded-[1.5rem] border border-neutral-200 bg-white p-8 shadow-sm md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
          Thank you
        </p>

        <h1 className="font-serif-academic mt-4 text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
          Your message has been received.
        </h1>

        <p className="mt-6 text-base leading-8 text-neutral-600 md:text-lg">
          Thank you for contacting My Academic Tutor. We will review your
          request and respond as soon as possible.
        </p>

        <a
          href="/"
          className="mt-8 inline-flex rounded-md bg-[#8b1116] px-6 py-3 text-sm font-semibold text-white"
        >
          Back to homepage
        </a>
      </section>
    </main>
  );
}
