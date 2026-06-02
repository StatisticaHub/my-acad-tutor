const items = [
  {
    value: "Clear",
    label: "Concepts are explained before formulas, software or technical detail.",
  },
  {
    value: "Responsible",
    label: "Guidance-based academic support focused on learning and integrity.",
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
    <section className="border-y border-[#ded9cf] bg-white px-5 py-6 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.value}
            className="rounded-2xl border border-neutral-200 bg-[#f8f6f1] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-sm"
          >
            <p className="text-lg font-black tracking-tight text-neutral-950">
              {item.value}
            </p>

            <p className="mt-2 text-sm leading-6 text-neutral-600">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}