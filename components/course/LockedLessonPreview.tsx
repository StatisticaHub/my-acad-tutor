type LockedLessonPreviewProps = {
  courseTitle: string;
  lessonTitle: string;
  moduleTitle?: string;
  backHref: string;
};

export default function LockedLessonPreview({
  courseTitle,
  lessonTitle,
  moduleTitle,
  backHref,
}: LockedLessonPreviewProps) {
  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-10 text-[#141210] md:px-8 md:py-16">
      <section className="mx-auto max-w-5xl rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#741018]">
          Lesson preview
        </p>

        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.055em] md:text-6xl">
          {lessonTitle}
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
          This lesson belongs to <strong>{courseTitle}</strong>
          {moduleTitle ? (
            <>
              {" "}
              in the <strong>{moduleTitle}</strong> module.
            </>
          ) : null}
        </p>

        <section className="mt-8 rounded-[2rem] border border-[#741018]/20 bg-[#fff4ef] p-5 md:p-6">
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#741018]">
            Full lesson content opens in July 2026.
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#525252] md:text-base md:leading-8">
            This preview shows the lesson title and its place in the course
            pathway. Full lecture notes, visual labs, worked examples,
            exercises and quizzes will be added as the course release expands.
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
            <p className="text-sm font-semibold text-[#141210]">
              Available now
            </p>

            <p className="mt-2 text-sm leading-7 text-[#525252]">
              Course homepage, module overview and lesson pathway.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
            <p className="text-sm font-semibold text-[#141210]">
              Opening soon
            </p>

            <p className="mt-2 text-sm leading-7 text-[#525252]">
              Detailed notes, examples, labs, exercises and quizzes.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
            <p className="text-sm font-semibold text-[#141210]">
              Need support?
            </p>

            <p className="mt-2 text-sm leading-7 text-[#525252]">
              Ask for guidance with concepts, methods or study planning.
            </p>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={backHref}
            className="inline-flex items-center justify-center rounded-full bg-[#11100E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#741018]"
          >
            Back to lesson list →
          </a>

          <a
            href="/contact/"
            className="inline-flex items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-5 py-3 text-sm font-semibold text-[#141210] transition hover:bg-[#F7F3EA]"
          >
            Ask for guidance →
          </a>
        </div>
      </section>
    </main>
  );
}
