import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Machine Learning in Biostatistics"
      moduleTitle="Model Evaluation Validation Performance"
      lessonTitle="Train Test Split and Resampling"
      backHref="/app/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/"
    />
  );
}
