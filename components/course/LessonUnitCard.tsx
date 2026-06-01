import Link from "next/link";
import Badge from "@/components/ui/Badge";

type LessonUnitCardProps = {
  title: string;
  description: string;
  href: string;
  hasCoding?: boolean;
};

export default function LessonUnitCard({
  title,
  description,
  href,
  hasCoding = false,
}: LessonUnitCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h4 className="text-lg font-bold text-slate-950">{title}</h4>

      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge variant="blue">Lecture</Badge>
        <Badge variant="violet">Detailed Notes</Badge>
        {hasCoding && <Badge variant="dark">Coding Practice</Badge>}
        <Badge variant="green">Quiz</Badge>
      </div>

      <div className="mt-6">
        <Link
          href={href}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Open lesson →
        </Link>
      </div>
    </div>
  );
}