const audiences = [
  {
    title: "University students",
    text: "Build confidence with statistics, mathematics, research methods and data analysis.",
  },
  {
    title: "Master’s and dissertation students",
    text: "Get guidance on method choice, interpretation, modelling strategy and responsible reporting.",
  },
  {
    title: "Health and life-science learners",
    text: "Learn biostatistics, epidemiology, survival analysis, clinical prediction and health data science.",
  },
  {
    title: "Professionals upskilling",
    text: "Strengthen quantitative reasoning, statistical interpretation and applied data-analysis confidence.",
  },
];

export default function WhoThisIsFor() {
  return (
    <section className="bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#6f0d12]">
          Who this is for
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-black text-neutral-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-700">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
