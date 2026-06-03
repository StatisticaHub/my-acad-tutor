import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Machine Learning in Biostatistics"
      moduleTitle="Supervised Learning Clinical Health Data"
      lessonTitle="Decision Trees and Rule Based Prediction"
      backHref="/app/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/"
    />
  );
}
