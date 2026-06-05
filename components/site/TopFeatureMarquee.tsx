const features = [
  "Personalised Tutoring",
  "Structured Courses",
  "Interactive Demos",
  "Live Dashboards",
  "Statistics",
  "Mathematics",
  "Biostatistics",
  "Health Data Science",
  "Bioinformatics",
  "Research Methods",
  "Dissertation Planning",
  "R Support",
  "Data Analysis",
  "Responsible Guidance",
];

export default function TopFeatureMarquee() {
  return (
    <section className="overflow-hidden border-b border-[#E4DED2] bg-[#11100E] py-3 text-white">
      <div className="flex w-max animate-[featureMarquee_32s_linear_infinite] gap-2 px-4">
        {[...features, ...features].map((feature, index) => (
          <span
            key={`${feature}-${index}`}
            className="shrink-0 rounded-full border border-white/10 bg-[#FFFCF6]/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/80"
          >
            {feature}
          </span>
        ))}
      </div>
    </section>
  );
}
