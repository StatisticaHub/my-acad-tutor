import Badge from "@/components/ui/Badge";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <div className="mb-4">
          <Badge variant="blue">{eyebrow}</Badge>
        </div>
      )}

      <h2 className="text-3xl font-bold tracking-tight text-[#111111] md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-lg leading-8 text-neutral-700">
          {description}
        </p>
      )}
    </div>
  );
}