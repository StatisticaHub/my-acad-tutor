import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Machine Learning in Biostatistics"
      moduleTitle="Applied Biostatistical Ml Case Studies"
      lessonTitle="High Dimensional Omics and Feature Selection"
      backHref="/app/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/"
    />
  );
}
