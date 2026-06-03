const supportAreas = [
  "Statistics and probability",
  "Biostatistics and medical statistics",
  "R, Python, SPSS, SAS and Stata",
  "Data science and machine learning",
  "Bioinformatics and omics",
  "Dissertation and research projects",
];

const locations = [
  "India",
  "USA",
  "Canada",
  "Australia",
  "Italy",
  "UAE",
  "Ireland",
  "UK",
  "South Korea",
  "Singapore",
  "Kuwait",
];

export default function StudentSupportRecord() {
  return (
    <section className="bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Student support record
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <h2 className="max-w-4xl font-sans text-3xl font-black leading-tight tracking-[-0.04em] md:text-5xl">
                Supporting quantitative learning across subjects and countries.
              </h2>
            </div>

            <p className="max-w-4xl text-base leading-8 text-neutral-700">
              My Academic Tutor has supported students across multiple academic
              backgrounds and countries. Public examples are kept general,
              anonymised and focused on learning needs.
            </p>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Common requests
            </p>

            <h3 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em] md:text-3xl">
              Areas students commonly ask for support with
            </h3>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {supportAreas.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold leading-6 text-neutral-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Student locations
            </p>

            <h3 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em] md:text-3xl">
              International student experience
            </h3>

            <p className="mt-4 text-sm leading-7 text-neutral-700">
              Support has been requested by students based in:
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {locations.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-neutral-200 bg-[#f7f4ee] px-4 py-2 text-sm font-bold text-neutral-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[2rem] border border-[#ead8d8] bg-white p-6 shadow-sm">
          <p className="text-sm leading-7 text-neutral-700">
            Student privacy is treated carefully. Public statements avoid
            identifiable student details and focus instead on broad subject
            areas, learning needs and responsible academic support.
          </p>
        </section>
      </div>
    </section>
  );
}