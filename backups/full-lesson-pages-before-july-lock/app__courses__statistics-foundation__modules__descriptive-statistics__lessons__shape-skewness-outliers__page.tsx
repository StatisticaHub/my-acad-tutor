import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Statistics Foundation"
      moduleTitle="Descriptive Statistics"
      lessonTitle="Shape Skewness Outliers"
      backHref="/app/courses/statistics-foundation/modules/descriptive-statistics/lessons/"
    />
  );
}
