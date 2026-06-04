export const STATISTICS_FOUNDATION_UNLOCK_DATE = "2026-07-01";

export function isStatisticsFoundationLessonOpen(lessonCode: string) {
  const alwaysOpenLessons = ["1.1"];

  if (alwaysOpenLessons.includes(lessonCode)) {
    return true;
  }

  const now = new Date();
  const unlockDate = new Date(`${STATISTICS_FOUNDATION_UNLOCK_DATE}T00:00:00`);

  return now >= unlockDate;
}
