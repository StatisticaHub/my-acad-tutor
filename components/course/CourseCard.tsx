import Link from "next/link";
import Badge from "@/components/ui/Badge";

type CourseCardProps = {
  title: string;
  description: string;
  href: string;
  subject: string;
  level: string;
  duration: string;
  status?: "Free" | "Customised" | "Opens July 2026" | "From September 2026";
};

export default function CourseCard({
  title,
  description,
  href,
  subject,
  level,
  duration,
  status = "Opens July 2026",
}: CourseCardProps) {
  const statusVariant =
    status === "Free" ? "green" : status === "Customised" ? "violet" : "light";

  return (
    <Link
      href={href}
      className="group block rounded-3xl border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="blue">{subject}</Badge>
        <Badge variant={statusVariant}>{status}</Badge>
      </div>

      <h3 className="mt-6 text-2xl font-bold tracking-tight text-[#141210] group-hover:text-[#741018]">
        {title}
      </h3>

      <p className="mt-4 text-sm leading-6 text-[#525252]">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium text-[#525252]">
        <span>{level}</span>
        <span>•</span>
        <span>{duration}</span>
      </div>

      <div className="mt-6 text-sm font-semibold text-[#741018]">
        View course →
      </div>
    </Link>
  );
}