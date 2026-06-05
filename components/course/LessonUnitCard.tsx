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
    <div className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] p-5">
      <h4 className="text-lg font-bold text-[#141210]">{title}</h4>

      <p className="mt-3 text-sm leading-6 text-[#525252]">{description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge variant="blue">Lecture</Badge>
        <Badge variant="violet">Detailed Notes</Badge>
        {hasCoding && <Badge variant="dark">Coding Practice</Badge>}
        <Badge variant="green">Quiz</Badge>
      </div>

      <div className="mt-6">
        <Link
          href={href}
          className="text-sm font-semibold text-[#741018] hover:text-[#741018]"
        >
          Open lesson →
        </Link>
      </div>
    </div>
  );
}