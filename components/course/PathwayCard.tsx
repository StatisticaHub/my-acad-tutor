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
      className="group block rounded-3xl border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <Badge variant={variant}>{badge}</Badge>

      <h3 className="mt-6 text-2xl font-bold tracking-tight text-[#141210] group-hover:text-[#741018]">
        {title}
      </h3>

      <p className="mt-4 text-sm leading-6 text-[#525252]">
        {description}
      </p>

      <div className="mt-6 grid gap-3 text-sm text-[#525252]">
        <div className="rounded-2xl bg-[#F7F3EA] p-3">
          <span className="font-semibold text-[#141210]">Level:</span> {level}
        </div>

        <div className="rounded-2xl bg-[#F7F3EA] p-3">
          <span className="font-semibold text-[#141210]">Courses:</span> {courses}
        </div>
      </div>

      <div className="mt-6 text-sm font-semibold text-[#741018]">
        Explore pathway →
      </div>
    </Link>
  );
}