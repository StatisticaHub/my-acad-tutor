import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/sections/SectionHeading";

const roadmap = [
  "Algebra and functions",
  "Calculus for rates of change",
  "Matrices and linear algebra",
  "Probability mathematics",
  "Optimisation ideas for statistics and machine learning",
];

export default function MathematicsPathwayPage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="bg-slate-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl">
          <Badge variant="violet">Mathematics Pathway</Badge>

          <h1 className="mt-6 max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
            Strengthen the mathematics behind statistics and data science.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            This pathway helps students build confidence in algebra, calculus,
            matrices, probability and optimisation ideas used in modern quantitative
            subjects.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Pathway roadmap"
            title="Mathematics for quantitative learning."
            description="This pathway focuses on the mathematical ideas students need before advanced statistics, machine learning and data science."
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
                  Learn the concept clearly, connect it to statistics, and practise
                  with examples designed for academic learners.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}