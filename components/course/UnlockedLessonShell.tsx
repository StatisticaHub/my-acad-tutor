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
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-10 text-[#141210] md:px-8 md:py-16">
      <section className="mx-auto max-w-6xl rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
        <a
          href={backHref}
          className="text-sm font-black text-[#741018] hover:text-[#4d080e]"
        >
          ← Back to module
        </a>

        <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
          {courseTitle}
        </p>

        {moduleTitle ? (
          <p className="mt-3 text-sm font-bold text-[#7a7063]">
            {moduleTitle}
          </p>
        ) : null}

        <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight tracking-[-0.055em] md:text-6xl">
          {lessonTitle}
        </h1>

        <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
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
              className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
            >
              <p className="text-sm font-black text-[#141210]">{item}</p>
              <p className="mt-2 text-sm leading-7 text-[#525252]">
                Add the redesigned {item.toLowerCase()} section here.
              </p>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
