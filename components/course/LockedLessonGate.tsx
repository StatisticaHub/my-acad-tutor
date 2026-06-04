const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

type LockedLessonGateProps = {
  lessonCode: string;
  lessonTitle: string;
  moduleTitle: string;
};

export default function LockedLessonGate({
  lessonCode,
  lessonTitle,
  moduleTitle,
}: LockedLessonGateProps) {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-5xl rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#6f0d12]">
          Lesson coming soon
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-neutral-200 bg-[#f7f4ee] px-4 py-2 text-sm font-bold text-neutral-700">
            Lesson {lessonCode}
          </span>

          <span className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-800">
            Locked until July 2026
          </span>
        </div>

        <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
          {lessonTitle}
        </h1>

        <p className="mt-4 text-lg font-semibold text-neutral-700">
          {moduleTitle}
        </p>

        <p className="mt-6 max-w-3xl text-base leading-7 text-neutral-700 md:text-lg md:leading-8">
          This lesson is part of the new Statistics Foundation course design.
          Module pages are open for preview, and Lesson 1.1 is available now.
          The remaining lessons will open from July 2026.
        </p>

        <div className="mt-8 rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5 md:p-6">
          <h2 className="text-xl font-black tracking-tight">
            Join the waitlist
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700">
            Join the waitlist to be notified when the remaining lessons,
            worked examples, quizzes and interactive learning sections become
            available.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={withBasePath("/courses/statistics-foundation/waitlist")}
              className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#6f0d12]"
            >
              Join waitlist
            </a>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-black text-neutral-950 transition hover:-translate-y-0.5 hover:border-neutral-950"
            >
              Back to course
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
