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
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-10 text-[#141210] md:px-8 md:py-16">
      <section className="mx-auto max-w-5xl rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A0710]">
          Lesson coming soon
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-[#E4DED2] bg-[#F7F3EA] px-4 py-2 text-sm font-bold text-[#525252]">
            Lesson {lessonCode}
          </span>

          <span className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-800">
            Locked until July 2026
          </span>
        </div>

        <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
          {lessonTitle}
        </h1>

        <p className="mt-4 text-lg font-semibold text-[#525252]">
          {moduleTitle}
        </p>

        <p className="mt-6 max-w-3xl text-base leading-7 text-[#525252] md:text-lg md:leading-8">
          This lesson is part of the new Statistics Foundation course design.
          Module pages are open for preview, and Lesson 1.1 is available now.
          The remaining lessons will open from July 2026.
        </p>

        <div className="mt-8 rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5 md:p-6">
          <h2 className="text-xl font-black tracking-tight">
            Join the waitlist
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#525252]">
            Join the waitlist to be notified when the remaining lessons,
            worked examples, quizzes and interactive learning sections become
            available.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={withBasePath("/courses/statistics-foundation/waitlist")}
              className="inline-flex items-center justify-center rounded-full bg-[#11100E] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#7A0710]"
            >
              Join waitlist
            </a>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="inline-flex items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-6 py-3 text-sm font-black text-[#141210] transition hover:-translate-y-0.5 hover:border-stone-950"
            >
              Back to course
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
