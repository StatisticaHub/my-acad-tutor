const timeline = [
  {
    label: "Open now",
    title: "Statistics Foundation is fully open",
    body:
      "Statistics Foundation is fully open now. Machine Learning in Biostatistics has Lesson 1.1 available as a preview.",
    items: [
      "Statistics Foundation · Lesson 1.1",
      "Machine Learning in Biostatistics · Lesson 1.1",
    ],
  },
  {
    label: "Open now",
    title: "Next pathway updates",
    body:
      "Statistics Foundation is fully open now. Machine Learning in Biostatistics will open gradually after the preview lesson.",
    items: [
      "Statistics Foundation full course",
      "Machine Learning in Biostatistics preview pathway",
    ],
  },
  {
    label: "From September 2026",
    title: "Additional subject routes release gradually",
    body:
      "Other structured routes will be released one by one after the main July course launch.",
    items: [
      "Biostatistics Foundation",
      "Epidemiology and Study Designs",
      "Regression Analysis",
      "Survival Analysis",
      "Other specialist pathways",
    ],
  },
];

export default function CourseAccessTimeline() {
  return (
    <section className="bg-[#F7F3EA] px-5 py-12 text-[#141210] md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
          Course access timeline
        </p>

        <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h2 className="max-w-3xl text-3xl font-black leading-[1.05] tracking-[-0.05em] md:text-5xl">
              What is open now, what opens next.
            </h2>
          </div>

          <p className="max-w-3xl text-base leading-8 text-[#525252]">
            Start with the open sample lessons, then start learning or return
            for the main course release in Open now.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {timeline.map((phase) => (
            <article
              key={phase.label}
              className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
            >
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
                {phase.label}
              </p>

              <h3 className="mt-4 text-xl font-black tracking-[-0.035em]">
                {phase.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#525252]">
                {phase.body}
              </p>

              <ul className="mt-4 space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="text-sm font-semibold text-[#141210]">
                    • {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/what-is-statistics/"
            className="rounded-full bg-[#141210] px-5 py-3 text-sm font-black text-white transition hover:bg-[#741018]"
          >
            Open Statistics Foundation
          </a>

          <a
            href="/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics/"
            className="rounded-full border border-[#D8CDBB] px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA]"
          >
            Open ML preview
          </a>

          <a
            href="/courses/"
            className="rounded-full border border-[#D8CDBB] px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA]"
          >
            View all courses
          </a>
        </div>
      </div>
    </section>
  );
}
