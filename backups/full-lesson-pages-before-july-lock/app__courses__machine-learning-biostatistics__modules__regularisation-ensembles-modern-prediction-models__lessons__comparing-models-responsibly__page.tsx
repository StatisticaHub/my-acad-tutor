import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Machine Learning in Biostatistics"
      moduleTitle="Regularisation Ensembles Modern Prediction Models"
      lessonTitle="Comparing Models Responsibly"
      backHref="/app/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/"
    />
  );
}
