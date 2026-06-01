export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f2efe7] px-6 py-24 text-neutral-950">
      <section className="mx-auto max-w-4xl rounded-[2rem] border border-[#ded9cf] bg-white p-8 shadow-sm md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
          404 · Page not found
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
          This page does not exist yet.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-600">
          The page may have moved, or it may not have been built yet. You can go
          back to the homepage, browse the learning hub, or request academic
          support.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/"
            className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-black text-white"
          >
            Back to homepage
          </a>

          <a
            href="/learning-hub"
            className="rounded-full border border-[#ded9cf] bg-white px-6 py-3 text-sm font-black text-neutral-950"
          >
            Open Learning Hub
          </a>

          <a
            href="/contact"
            className="rounded-full border border-[#ded9cf] bg-white px-6 py-3 text-sm font-black text-neutral-950"
          >
            Request Support
          </a>
        </div>
      </section>
    </main>
  );
}