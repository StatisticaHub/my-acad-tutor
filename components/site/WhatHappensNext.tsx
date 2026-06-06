const steps = [
  {
    title: "1. Share the context",
    text: "Send your subject, level, topic, software and the kind of support you need.",
  },
  {
    title: "2. We review the enquiry",
    text: "Your request is checked for subject fit, tutor availability, urgency and academic-integrity suitability.",
  },
  {
    title: "3. You receive a clear route",
    text: "You may be directed to a tutor, resource, course pathway or demo, depending on what is most suitable.",
  },
  {
    title: "4. Support stays responsible",
    text: "Guidance focuses on explanation, planning, interpretation and independent learning.",
  },
];

export default function WhatHappensNext() {
  return (
    <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-[#6f0d12]">
        What happens next
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {steps.map((step) => (
          <article
            key={step.title}
            className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
          >
            <h3 className="text-base font-black text-neutral-950">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-700">
              {step.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
