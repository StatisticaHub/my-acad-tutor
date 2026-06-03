import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/sections/SectionHeading";

const roadmap = [
  "Health data and study designs",
  "Epidemiological measures",
  "Logistic regression and risk modelling",
  "Survival analysis",
  "Medical prediction and validation",
];

export default function BiostatisticsPathwayPage() {
  return (
    <main className="bg-[#f7f4ee] text-[#111111]">
      <section className="bg-[#111111] px-5 py-12 text-white md:px-6 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Badge variant="green">Biostatistics Pathway</Badge>

          <h1 className="mt-6 max-w-5xl text-3xl font-bold tracking-tight sm:text-4xl md:text-7xl">
            Learn statistics for health research and clinical data.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/90">
            This pathway focuses on the statistical methods used in epidemiology,
            clinical studies, survival analysis and medical prediction modelling.
          </p>
        </div>
      </section>

      <section className="px-5 py-10 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Pathway roadmap"
            title="From health data to clinical interpretation."
            description="Follow a structured route through the core ideas used in biostatistics and medical statistics."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {roadmap.map((item, index) => (
              <div
                key={item}
                className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#111111]">
                  {item}
                </h3>

                <p className="mt-4 text-sm leading-6 text-neutral-700">
                  Understand the method, when it is used, how to interpret it and
                  what mistakes to avoid in medical research.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}