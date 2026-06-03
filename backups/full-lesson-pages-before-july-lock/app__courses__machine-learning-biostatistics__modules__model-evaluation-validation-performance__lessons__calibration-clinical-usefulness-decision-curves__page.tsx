import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Machine Learning in Biostatistics"
      moduleTitle="Model Evaluation Validation Performance"
      lessonTitle="Calibration Clinical Usefulness Decision Curves"
      backHref="/app/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/"
    />
  );
}
