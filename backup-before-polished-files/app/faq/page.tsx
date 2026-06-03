const faqs = [
  {
    question: "What does My Academic Tutor support?",
    answer:
      "We support statistics, biostatistics, programming, data science, bioinformatics, research methods, dissertation planning and quantitative interpretation.",
  },
  {
    question: "Do you complete assignments for students?",
    answer:
      "No. Support is guidance-based. We explain concepts, methods, software and interpretation, but we do not complete assessed work or submit work on behalf of students.",
  },
  {
    question: "Are courses separate from tutoring support?",
    answer:
      "Yes. Courses are structured learning pathways. Tutoring and academic support are personalised guidance routes for students who need help with specific topics or projects.",
  },
  {
    question: "Will Statistics Foundation require coding?",
    answer:
      "No. Statistics Foundation is designed as a zero-coding course focused on concepts, notation, theory, derivations, interpretation, interactive labs and quizzes.",
  },
  {
    question: "How can I request support?",
    answer:
      "Email contact@myacademictutor.com with your subject, level, topic, software needs, deadline and the type of support you are looking for.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-20">
      <section className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-semibold text-[#8b1116]">
          ← Back to homepage
        </a>

        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
            FAQ
          </p>

          <h1 className="font-serif-academic mt-4 text-3xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-4xl md:text-7xl">
            Frequently asked questions.
          </h1>

          <p className="mt-6 text-base leading-8 text-neutral-600 md:text-lg">
            Common questions about courses, academic support and responsible
            tutoring.
          </p>
        </div>

        <div className="mt-12 grid gap-4">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-[1.25rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h2 className="font-serif-academic text-2xl font-semibold tracking-tight">
                {faq.question}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-600">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
