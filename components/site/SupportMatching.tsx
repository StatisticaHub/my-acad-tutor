const steps = [
  {
    number: "01",
    title: "Submit an enquiry",
    body:
      "Tell us the subject, academic level, topic, software and type of support needed.",
  },
  {
    number: "02",
    title: "Review",
    body:
      "The enquiry is reviewed for subject fit, academic level, urgency and academic-integrity suitability.",
  },
  {
    number: "03",
    title: "Match",
    body:
      "The student is directed to a suitable tutor, resource, course pathway or learning demo.",
  },
  {
    number: "04",
    title: "Learn responsibly",
    body:
      "Support focuses on understanding, planning, interpretation and independent work.",
  },
];

export default function SupportMatching() {
  return (
    <section className="bg-[#F7F3EA] px-5 py-12 text-[#141210] md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
            How support is matched
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <h2 className="max-w-3xl text-3xl font-black leading-[1.05] tracking-[-0.05em] md:text-5xl">
                Not just a booking form — a guided support pathway.
              </h2>
            </div>

            <p className="max-w-3xl text-base leading-8 text-[#525252]">
              My Academic Tutor reviews each enquiry and directs students towards
              the most suitable tutor, resource or learning pathway. This helps
              keep support focused, appropriate and academically responsible.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
              >
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
                  {step.number}
                </p>
                <h3 className="mt-4 text-xl font-black tracking-[-0.035em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  {step.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-[#E4DED2] bg-white p-5">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
              Academic integrity
            </p>
            <p className="mt-3 text-sm leading-7 text-[#525252]">
              We do not support ghostwriting, exam impersonation or dishonest
              completion of assessed work. Guidance is designed to improve
              understanding and independent academic confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
