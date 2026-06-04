import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";

import UnlockedLessonShell from "@/components/course/UnlockedLessonShell";

export default function LessonPreviewPage() {
  const lessonCode = "3.5";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Bayes theorem and diagnostic reasoning"
        moduleTitle="Module 3: Probability Foundations"
      />
    );
  }

  return (
    <UnlockedLessonShell
      courseTitle="Statistics Foundation"
      moduleTitle="Probability Foundations"
      lessonTitle="Normal Distribution and Clt"
      backHref="/courses/statistics-foundation/modules/probability-foundations/lessons/"
    />
  );
}
