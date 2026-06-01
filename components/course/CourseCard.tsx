import Link from "next/link";
import Badge from "@/components/ui/Badge";

type CourseCardProps = {
  title: string;
  description: string;
  href: string;
  subject: string;
  level: string;
  duration: string;
  status?: "Free" | "Premium" | "Coming Soon";
};

export default function CourseCard({
  title,
  description,
  href,
  subject,
  level,
  duration,
  status = "Coming Soon",
}: CourseCardProps) {
  const statusVariant =
    status === "Free" ? "green" : status === "Premium" ? "violet" : "light";

  return (
    <Link
      href={href}
      className="group block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="blue">{subject}</Badge>
        <Badge variant={statusVariant}>{status}</Badge>
      </div>

      <h3 className="mt-6 text-2xl font-bold tracking-tight text-slate-950 group-hover:text-blue-600">
        {title}
      </h3>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium text-slate-500">
        <span>{level}</span>
        <span>•</span>
        <span>{duration}</span>
      </div>

      <div className="mt-6 text-sm font-semibold text-blue-600">
        View course →
      </div>
    </Link>
  );
}