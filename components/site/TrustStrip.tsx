const items = [
  {
    value: "Clear",
    label: "Concepts are explained before formulas, software or technical detail.",
  },
  {
    value: "Responsible",
    label: "Guidance-based academic support focused on learning, integrity and independent work.",
  },
  {
    value: "Interactive",
    label: "Courses include visual labs, worked examples, tables, graphs and quizzes.",
  },
  {
    value: "Specialist",
    label: "Focused on statistics, biostatistics, data science and research methods.",
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-[#f7f4ee] px-5 py-6 text-[#111111] md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.value}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="font-sans text-2xl font-black tracking-[-0.04em] text-[#111111]">
                {item.value}
              </p>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}