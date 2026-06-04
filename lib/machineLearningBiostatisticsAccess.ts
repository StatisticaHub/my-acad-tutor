export const MACHINE_LEARNING_BIOSTATISTICS_UNLOCK_DATE = "2026-07-01";

export function isMachineLearningBiostatisticsLessonOpen(lessonCode: string) {
  const alwaysOpenLessons = ["1.1"];

  if (alwaysOpenLessons.includes(lessonCode)) return true;

  const now = new Date();
  const unlockDate = new Date(
    `${MACHINE_LEARNING_BIOSTATISTICS_UNLOCK_DATE}T00:00:00`
  );

  return now >= unlockDate;
}
