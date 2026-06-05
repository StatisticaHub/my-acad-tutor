type FeatureCardProps = {
  title: string;
  description: string;
};

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-3xl border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <h3 className="text-xl font-bold tracking-tight text-[#141210]">
        {title}
      </h3>

      <p className="mt-4 text-sm leading-6 text-[#525252]">
        {description}
      </p>
    </div>
  );
}