import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Statistics Foundation"
      moduleTitle="Introduction to Statistical Thinking"
      lessonTitle="Sampling Methods"
      backHref="/app/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/"
    />
  );
}
