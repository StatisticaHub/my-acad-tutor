import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Machine Learning in Biostatistics"
      moduleTitle="Regularisation Ensembles Modern Prediction Models"
      lessonTitle="Ridge Lasso and Elastic Net"
      backHref="/app/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/"
    />
  );
}
