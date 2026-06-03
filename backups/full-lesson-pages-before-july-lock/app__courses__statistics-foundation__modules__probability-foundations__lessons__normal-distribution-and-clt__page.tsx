import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Statistics Foundation"
      moduleTitle="Probability Foundations"
      lessonTitle="Normal Distribution and Clt"
      backHref="/app/courses/statistics-foundation/modules/probability-foundations/lessons/"
    />
  );
}
