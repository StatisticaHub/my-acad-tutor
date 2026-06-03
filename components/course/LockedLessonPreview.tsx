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
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-5xl rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
          Lesson preview
        </p>

        <h1 className="mt-5 font-sans text-4xl font-black tracking-[-0.05em] md:text-6xl">
          {lessonTitle}
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-700 md:text-lg">
          This lesson is part of <strong>{courseTitle}</strong>
          {moduleTitle ? (
            <>
              {" "}
              in the <strong>{moduleTitle}</strong> module.
            </>
          ) : null}
        </p>

        <div className="mt-8 rounded-[1.5rem] border border-[#8b1116]/20 bg-[#fff7f7] p-5 md:p-6">
          <h2 className="font-sans text-2xl font-black tracking-[-0.04em] text-[#8b1116]">
            Full lesson opens in July 2026.
          </h2>

          <p className="mt-4 text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
            This preview shows the lesson title and its position in the course pathway.
            Full lecture notes, visual labs, worked examples, exercises and quizzes will
            be released with premium course access.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5">
            <p className="text-sm font-black text-neutral-950">Available now</p>
            <p className="mt-2 text-sm leading-7 text-neutral-700">
              Course homepage, module overview and lesson pathway.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5">
            <p className="text-sm font-black text-neutral-950">Opening in July</p>
            <p className="mt-2 text-sm leading-7 text-neutral-700">
              Full notes, examples, labs, quizzes and structured study material.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5">
            <p className="text-sm font-black text-neutral-950">Course access</p>
            <p className="mt-2 text-sm leading-7 text-neutral-700">
              Premium access details will be shared before release.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={backHref}
            className="inline-flex items-center justify-center rounded-full bg-[#8b1116] px-5 py-3 text-sm font-black text-white transition hover:bg-[#6f0d12]"
          >
            Back to lesson list →
          </a>

          <a
            href="/contact/"
            className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-black text-neutral-950 transition hover:bg-neutral-50"
          >
            Ask about course access →
          </a>
        </div>
      </section>
    </main>
  );
}
