const routes = [
  {
    title: "I want to learn statistics from the beginning",
    href: "/courses/statistics-foundation",
    recommendation: "Start with Statistics Foundation",
    description:
      "Best for students who want a structured, zero-coding course covering the core ideas of statistics.",
  },
  {
    title: "I need help with a topic, module or assignment concept",
    href: "/services",
    recommendation: "Explore academic support services",
    description:
      "Best if you need guided explanation, tutoring, method clarification or support understanding analysis.",
  },
  {
    title: "I am working on a dissertation or research project",
    href: "/contact",
    recommendation: "Request support",
    description:
      "Best if you need help thinking through variables, study design, statistical methods or interpretation.",
  },
  {
    title: "I want free resources and guides",
    href: "/resources",
    recommendation: "Open resources",
    description:
      "Best if you want short guides, study notes, checklists and learning materials.",
  },
];

export default function StartHerePage() {
  return (
    <main className="min-h-screen bg-[#f2efe7] px-5 py-10 text-neutral-950 md:px-8 md:py-20">
      <section className="mx-auto max-w-7xl">
        <a
          href="/"
          className="text-sm font-black text-blue-700 hover:text-blue-900"
        >
          ← Back to homepage
        </a>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
              Start Here
            </p>

            <h1 className="mt-4 text-3xl font-black leading-[1] tracking-[-0.045em] sm:text-4xl md:text-7xl">
              Choose the right route for your learning goal.
            </h1>

            <p className="mt-6 text-lg leading-9 text-neutral-700">
              My Academic Tutor has two main routes: structured learning through
              courses, and responsible academic support for students who need
              help understanding quantitative subjects.
            </p>

            <div className="mt-8 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-6">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-800">
                Important
              </p>
              <p className="mt-3 text-sm leading-7 text-amber-950">
                Support is guidance-based. We help you understand methods,
                plan analysis and interpret ideas. We do not complete assessed
                work, exams, dissertations or submissions on behalf of students.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {routes.map((route, index) => (
              <a
                key={route.title}
                href={route.href}
                className="rounded-[1.5rem] border border-[#ded9cf] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm font-black text-blue-700">
                  Route {index + 1}
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight">
                  {route.title}
                </h2>

                <p className="mt-3 text-sm font-black text-neutral-950">
                  {route.recommendation}
                </p>

                <p className="mt-3 text-sm leading-7 text-neutral-600">
                  {route.description}
                </p>

                <p className="mt-5 text-sm font-black text-blue-700">
                  Continue →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
