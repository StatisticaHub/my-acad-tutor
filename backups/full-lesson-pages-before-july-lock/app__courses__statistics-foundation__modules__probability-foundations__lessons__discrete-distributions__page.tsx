import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Statistics Foundation"
      moduleTitle="Probability Foundations"
      lessonTitle="Discrete Distributions"
      backHref="/app/courses/statistics-foundation/modules/probability-foundations/lessons/"
    />
  );
}
