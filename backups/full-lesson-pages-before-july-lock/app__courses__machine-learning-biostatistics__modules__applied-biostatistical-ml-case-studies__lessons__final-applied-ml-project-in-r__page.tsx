import LockedLessonPreview from "@/components/course/LockedLessonPreview";

export default function LessonPreviewPage() {
  return (
    <LockedLessonPreview
      courseTitle="Machine Learning in Biostatistics"
      moduleTitle="Applied Biostatistical Ml Case Studies"
      lessonTitle="Final Applied Ml Project in R"
      backHref="/app/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/"
    />
  );
}
