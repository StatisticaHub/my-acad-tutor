const items = [
  {
    value: "Zero confusion",
    label: "Clear explanations before technical detail.",
  },
  {
    value: "Ethical",
    label: "Guidance-based support, not assignment completion.",
  },
  {
    value: "Interactive",
    label: "Courses use visual labs, tables, graphs and quizzes.",
  },
  {
    value: "Focused",
    label: "Statistics, biostatistics and research methods.",
  },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-[#ded9cf] bg-white px-5 py-6 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.value} className="rounded-2xl bg-[#f8f6f1] p-5">
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