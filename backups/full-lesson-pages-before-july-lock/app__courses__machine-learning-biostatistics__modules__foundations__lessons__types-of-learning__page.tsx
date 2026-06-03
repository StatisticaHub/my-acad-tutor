import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Machine Learning in Biostatistics"
      moduleTitle="Foundations"
      lessonTitle="Types of Learning"
      backHref="/app/courses/machine-learning-biostatistics/modules/foundations/lessons/"
    />
  );
}
