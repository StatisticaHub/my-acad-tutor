const faqs = [
  {
    question: "Who is this support for?",
    answer:
      "Students studying statistics, biostatistics, health data science, research methods or quantitative analysis at school, university or postgraduate level.",
  },
  {
    question: "Do I need coding experience?",
    answer:
      "No coding is needed for the Statistics Foundation course. Advanced health data science and machine learning materials may include R or Python later.",
  },
  {
    question: "How quickly will I hear back?",
    answer:
      "Most enquiries receive a reply within 24–48 hours. Please include your subject, academic level and the type of support you need.",
  },
];

export default function QuickFAQ() {
  return (
    <section className="bg-[#F7F3EA] px-5 py-12 text-[#141210] md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A0710]">
          Common questions
        </p>

        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl text-3xl font-black tracking-tight md:text-5xl">
            Before you send an enquiry
          </h2>

          <p className="max-w-md text-sm leading-6 text-[#525252]">
            A few quick answers to help you decide whether My Academic Tutor is the right fit.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-[1.5rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm"
            >
              <h3 className="text-base font-black text-[#141210]">
                {faq.question}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#525252]">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
