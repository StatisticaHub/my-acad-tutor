import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Statistics Foundation"
      moduleTitle="Statistical Inference Foundations"
      lessonTitle="P Values Errors and Power"
      backHref="/app/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/"
    />
  );
}
