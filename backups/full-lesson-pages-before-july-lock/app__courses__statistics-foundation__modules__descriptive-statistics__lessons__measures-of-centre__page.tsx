import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Statistics Foundation"
      moduleTitle="Descriptive Statistics"
      lessonTitle="Measures of Centre"
      backHref="/app/courses/statistics-foundation/modules/descriptive-statistics/lessons/"
    />
  );
}
