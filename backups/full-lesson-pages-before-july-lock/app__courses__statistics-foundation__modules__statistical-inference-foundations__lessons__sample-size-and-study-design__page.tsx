import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Statistics Foundation"
      moduleTitle="Statistical Inference Foundations"
      lessonTitle="Sample Size and Study Design"
      backHref="/app/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/"
    />
  );
}
