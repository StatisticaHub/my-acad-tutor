const courses = [
  {
    title: "Statistics Foundation",
    status: "Available",
    href: "/courses/statistics-foundation",
    modules: "5 modules",
    lessons: "25 lessons",
    description:
      "A complete foundation course for students beginning statistics. Zero coding, strong theory, mathematical notation, interactive labs and quizzes.",
  },
  {
    title: "Machine Learning in Biostatistics",
    status: "Coming next",
    href: "/courses/machine-learning-biostatistics",
    modules: "Planned",
    lessons: "Planned",
    description:
      "A medical machine learning course focused on prediction, validation, overfitting, leakage, calibration and clinical interpretation.",
  },
  {
    title: "Research Methods & Data Analysis",
    status: "Planned",
    href: "/courses",
    modules: "Planned",
    lessons: "Planned",
    description:
      "A future applied course for students working on dissertations, research projects and quantitative reports.",
  },
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[#f2efe7] px-5 py-16 text-neutral-950 md:px-8 md:py-20">
      <section className="mx-auto max-w-7xl">
        <a
          href="/"
          className="text-sm font-black text-blue-700 hover:text-blue-900"
        >
          ← Back to homepage
        </a>

        <div className="mt-10 max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
            Courses
          </p>

          <h1 className="mt-4 text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Courses built for serious quantitative learning.
          </h1>

          <p className="mt-6 text-lg leading-9 text-neutral-700">
            Courses on My Academic Tutor are designed to be structured,
            theory-first and interactive. The aim is not only to help students
            remember formulas, but to understand where ideas come from, how to
            interpret them and when to use them.
          </p>
        </div>

        <div className="mt-12 grid gap-5">
          {courses.map((course) => (
            <a
              key={course.title}
              href={course.href}
              className="grid gap-6 rounded-[1.7rem] border border-[#ded9cf] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md lg:grid-cols-[1fr_0.45fr]"
            >
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-2 text-xs font-black text-blue-800">
                    {course.status}
                  </span>
                  <span className="rounded-full bg-[#f8f6f1] px-3 py-2 text-xs font-black text-neutral-700">
                    {course.modules}
                  </span>
                  <span className="rounded-full bg-[#f8f6f1] px-3 py-2 text-xs font-black text-neutral-700">
                    {course.lessons}
                  </span>
                </div>

                <h2 className="mt-5 text-3xl font-black tracking-tight">
                  {course.title}
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600">
                  {course.description}
                </p>
              </div>

              <div className="flex items-end justify-start lg:justify-end">
                <span className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-black text-white">
                  View course →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
