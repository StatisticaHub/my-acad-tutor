type LessonSectionProps = {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
};

export default function LessonSection({
  eyebrow,
  title,
  children,
}: LessonSectionProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-[#FFFCF6] p-6 shadow-sm md:p-8">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7A0710]">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
        {title}
      </h2>

      <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
        {children}
      </div>
    </section>
  );
}