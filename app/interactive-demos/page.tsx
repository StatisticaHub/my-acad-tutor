import NormalDistributionExplorer from "@/components/interactive/NormalDistributionExplorer";
import RegressionLineExplorer from "@/components/interactive/RegressionLineExplorer";
import ConfidenceIntervalSimulator from "@/components/interactive/ConfidenceIntervalSimulator";

const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;
  return `${basePath}${href}/`;
}

export default function InteractiveDemosPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-slate-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/learning-hub")}
          className="text-sm font-black text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to Learning Hub
        </a>

        <section className="mt-8 rounded-[2rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8b1116]">
            Premium interactive demos
          </p>

          <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-[-0.04em] md:text-6xl">
            Visual statistics demos for active learning.
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
            These demos show the platform direction: not only notes, but
            interactive learning tools for statistics, regression and inference.
          </p>
        </section>

        <div className="mt-8 grid gap-8">
          <NormalDistributionExplorer />
          <RegressionLineExplorer />
          <ConfidenceIntervalSimulator />
        </div>
      </section>
    </main>
  );
}
