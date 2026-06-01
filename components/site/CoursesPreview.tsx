const courses = [
  {
    title: "Statistics Foundation for University Students",
    tag: "Launching July 2026",
    href: "/courses/statistics-foundation",
    description:
      "A beginner-friendly, no-coding course focused on statistical concepts, notation, probability, inference foundations, derivations and exam-style thinking.",
    details: [
      ["Level", "Beginner to intermediate"],
      ["Format", "Lectures, notes, interactive labs and quizzes"],
      ["Certificate", "Completion certificate planned"],
    ],
  },
  {
    title: "Machine Learning in Biostatistics",
    tag: "Launching July 2026",
    href: "/courses/machine-learning-biostatistics",
    description:
      "A structured course connecting machine learning with medical statistics, clinical prediction modelling, validation, regularisation, survival analysis and biomedical data science.",
    details: [
      ["Level", "Intermediate to advanced"],
      ["Format", "R-based applied learning pathway"],
      ["Certificate", "Completion certificate planned"],
    ],
  },
];

const upcoming = [
  "R for Academic Data Analysis",
  "Dissertation Data Analysis",
  "Bioinformatics and Omics Data Analysis",
];

export default function CoursesPreview() {
  return (
    <section className="bg-[#f7f4ee] px-5 py-16 text-neutral-950 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              Learning Hub
            </p>
            <h2 className="font-serif-academic mt-3 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              Structured courses launching in July 2026.
            </h2>
          </div>

          <p className="max-w-3xl text-base leading-8 text-neutral-600">
            My Academic Tutor is developing structured course pathways for
            students who want clear explanations, strong foundations and applied
            quantitative learning across statistics, biostatistics and data
            science.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.title}
              className="rounded-[1.25rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
            >
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#8b1116]">
                {course.tag}
              </p>

              <h3 className="font-serif-academic mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em]">
                {course.title}
              </h3>

              <p className="mt-5 text-sm leading-7 text-neutral-600">
                {course.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={course.href}
                  className="rounded-md bg-neutral-950 px-5 py-3 text-sm font-semibold text-white"
                >
                  Open course
                </a>
                <a
                  href="/contact"
                  className="rounded-md border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-950"
                >
                  Register interest
                </a>
              </div>

              <dl className="mt-8 grid gap-3">
                {course.details.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-2 border-t border-neutral-200 pt-3 sm:grid-cols-[0.3fr_0.7fr]"
                  >
                    <dt className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                      {label}
                    </dt>
                    <dd className="text-sm leading-6 text-neutral-700">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[1.25rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#8b1116]">
            Upcoming pathways
          </p>

          <h3 className="font-serif-academic mt-3 text-3xl font-semibold tracking-tight">
            More courses are being prepared.
          </h3>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600">
            These pathways will support students who need applied software,
            dissertation and biomedical data analysis guidance.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {upcoming.map((item) => (
              <div
                key={item}
                className="rounded-md border border-neutral-200 bg-[#f8f6f1] p-5"
              >
                <p className="text-sm font-semibold text-neutral-950">{item}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                  Planned
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[1.25rem] border border-neutral-200 bg-neutral-950 p-6 text-white md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-white/50">
            Founder note
          </p>

          <p className="mt-4 max-w-5xl text-sm leading-7 text-white/75">
            These courses are developed under the guidance of Rahul, Founder of
            My Academic Tutor. His academic background in MSc Statistics from
            Indian Institute of Technology Kanpur and MSc Medical Statistics and
            Health Data Science from the University of Bristol shapes the
            platform’s focus on clear explanation, mathematical understanding,
            applied interpretation and responsible academic support.
          </p>

          <a
            href="/about"
            className="mt-6 inline-flex rounded-md bg-white px-5 py-3 text-sm font-semibold text-neutral-950"
          >
            About the platform
          </a>
        </div>
      </div>
    </section>
  );
}