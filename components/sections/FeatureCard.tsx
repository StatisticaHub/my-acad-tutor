type FeatureCardProps = {
  title: string;
  description: string;
};

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <h3 className="text-xl font-bold tracking-tight text-slate-950">
        {title}
      </h3>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}