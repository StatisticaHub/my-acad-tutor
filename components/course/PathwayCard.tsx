import Link from "next/link";
import Badge from "@/components/ui/Badge";

type PathwayCardProps = {
  title: string;
  description: string;
  href: string;
  level: string;
  courses: string;
  badge: string;
  variant?: "blue" | "green" | "violet" | "dark" | "light";
};

export default function PathwayCard({
  title,
  description,
  href,
  level,
  courses,
  badge,
  variant = "blue",
}: PathwayCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <Badge variant={variant}>{badge}</Badge>

      <h3 className="mt-6 text-2xl font-bold tracking-tight text-[#111111] group-hover:text-[#8b1116]">
        {title}
      </h3>

      <p className="mt-4 text-sm leading-6 text-neutral-700">
        {description}
      </p>

      <div className="mt-6 grid gap-3 text-sm text-neutral-700">
        <div className="rounded-2xl bg-[#f7f4ee] p-3">
          <span className="font-semibold text-[#111111]">Level:</span> {level}
        </div>

        <div className="rounded-2xl bg-[#f7f4ee] p-3">
          <span className="font-semibold text-[#111111]">Courses:</span> {courses}
        </div>
      </div>

      <div className="mt-6 text-sm font-semibold text-[#8b1116]">
        Explore pathway →
      </div>
    </Link>
  );
}