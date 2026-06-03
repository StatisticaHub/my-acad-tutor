import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Statistics Foundation"
      moduleTitle="Regression Foundations"
      lessonTitle="Least Squares Derivation"
      backHref="/app/courses/statistics-foundation/modules/regression-foundations/lessons/"
    />
  );
}
