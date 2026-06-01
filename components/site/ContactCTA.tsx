export default function ContactCTA() {
  return (
    <section className="bg-[#f7f4ee] px-5 py-16 text-neutral-950 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[1.5rem] border border-neutral-200 bg-neutral-950 p-8 text-white shadow-sm md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">
              Start here
            </p>

            <h2 className="font-serif-academic mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              Tell us what you need support with.
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-white/70">
              Share your subject, level, software requirements, deadline and the
              type of support you need. We will suggest the most suitable tutor
              or support route.
            </p>
          </div>

          <div className="grid gap-3">
            <a
              href="/contact"
              className="rounded-md bg-white px-6 py-4 text-center text-sm font-semibold text-neutral-950 transition hover:-translate-y-0.5"
            >
              Submit requirement
            </a>

            <a
              href="mailto:contact@myacademictutor.com"
              className="rounded-md border border-white/15 bg-white/10 px-6 py-4 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              Email directly
            </a>

            <a
              href="/academic-integrity"
              className="rounded-md border border-white/15 px-6 py-4 text-center text-sm font-semibold text-white/80 transition hover:bg-white/5"
            >
              Read academic integrity policy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}