type UnlockedLessonShellProps = {
  courseTitle: string;
  moduleTitle?: string;
  lessonTitle: string;
  backHref: string;
};

export default function UnlockedLessonShell({
  courseTitle,
  moduleTitle,
  lessonTitle,
  backHref,
}: UnlockedLessonShellProps) {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-6xl rounded-[2.5rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
        <a
          href={backHref}
          className="text-sm font-black text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to module
        </a>

        <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
          {courseTitle}
        </p>

        {moduleTitle ? (
          <p className="mt-3 text-sm font-bold text-neutral-500">
            {moduleTitle}
          </p>
        ) : null}

        <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight tracking-[-0.055em] md:text-6xl">
          {lessonTitle}
        </h1>

        <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
          This lesson is now unlocked for redesign. Replace this shell with the
          full lecture, detailed notes, interactive lab, worked examples,
          exercises and quiz content.
        </p>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            "Lecture",
            "Detailed Notes",
            "Interactive Lab",
            "Worked Examples",
            "Exercises",
            "Quiz",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
            >
              <p className="text-sm font-black text-neutral-950">{item}</p>
              <p className="mt-2 text-sm leading-7 text-neutral-700">
                Add the redesigned {item.toLowerCase()} section here.
              </p>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
