import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Statistics Foundation"
      moduleTitle="Statistical Inference Foundations"
      lessonTitle="Confidence Intervals"
      backHref="/app/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/"
    />
  );
}
