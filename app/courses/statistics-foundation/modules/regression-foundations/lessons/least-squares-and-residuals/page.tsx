import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";

import UnlockedLessonShell from "@/components/course/UnlockedLessonShell";

export default function LessonPreviewPage() {
  const lessonCode = "5.3";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Least squares and residuals"
        moduleTitle="Module 5: Regression Foundations"
      />
    );
  }

  return (
    <UnlockedLessonShell
      courseTitle="Statistics Foundation"
      moduleTitle="Regression Foundations"
      lessonTitle="Multiple Regression Confounding"
      backHref="/courses/statistics-foundation/modules/regression-foundations/lessons/"
    />
  );
}
