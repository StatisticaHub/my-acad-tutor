import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Statistics Foundation"
      moduleTitle="Introduction to Statistical Thinking"
      lessonTitle="Tables and Graphs"
      backHref="/app/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/"
    />
  );
}
