import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Machine Learning in Biostatistics"
      moduleTitle="Applied Biostatistical Ml Case Studies"
      lessonTitle="Missing Data Imbalance and Fairness"
      backHref="/app/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/"
    />
  );
}
