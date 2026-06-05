const items = [
  {
    value: "Clear",
    label: "Concepts before formulas.",
  },
  {
    value: "Structured",
    label: "Guided study routes.",
  },
  {
    value: "Visual",
    label: "Interactive explanations.",
  },
  {
    value: "Responsible",
    label: "Support for independent work.",
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-[#F7F3EA] px-4 py-4 text-[#141210] sm:px-5 md:px-8 md:py-5">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.value}
              className="rounded-[1.25rem] border border-[#E4DED2] bg-[#FFFCF6] px-4 py-3.5 shadow-sm md:rounded-[1.5rem] md:px-5 md:py-4"
            >
              <p className="text-lg font-semibold tracking-[-0.04em] text-[#141210] md:text-xl">
                {item.value}
              </p>

              <p className="mt-1.5 text-sm leading-6 text-[#525252]">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
