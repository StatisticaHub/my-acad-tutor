import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/sections/SectionHeading";

const roadmap = [
  "Biological data foundations",
  "RNA-seq concepts",
  "Single-cell analysis concepts",
  "Spatial transcriptomics ideas",
  "Reproducible bioinformatics workflows",
];

export default function BioinformaticsPathwayPage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="bg-slate-950 px-5 py-12 text-white md:px-6 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Badge variant="violet">Bioinformatics Pathway</Badge>

          <h1 className="mt-6 max-w-5xl text-3xl font-bold tracking-tight sm:text-4xl md:text-7xl">
            Understand biological data analysis from the ground up.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            This pathway introduces omics data, RNA-seq, single-cell concepts,
            spatial transcriptomics and reproducible bioinformatics thinking.
          </p>
        </div>
      </section>

      <section className="px-5 py-10 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Pathway roadmap"
            title="From biological data to interpretation."
            description="This pathway helps students connect computational workflows with biological meaning."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {roadmap.map((item, index) => (
              <div
                key={item}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  {item}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Learn the purpose of each analysis step, common outputs and how
                  results should be interpreted biologically.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}