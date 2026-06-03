import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Statistics Foundation"
      moduleTitle="Introduction to Statistical Thinking"
      lessonTitle="Populations Samples Variables"
      backHref="/app/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/"
    />
  );
}
