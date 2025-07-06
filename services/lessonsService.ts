/* export const getLessonsByLevel = async (level: string): Promise<Lesson[]> => {
  try {
    // 1. Obtener unidades del nivel
    const unitsSnapshot = await db
      .collection("units")
      .where("level", "==", level)
      .orderBy("order")
      .get();

    // 2. Obtener lecciones de cada unidad
    const lessonPromises = unitsSnapshot.docs.map(async (unitDoc) => {
      const lessonsSnapshot = await db
        .collection("lessons")
        .where("unit", "==", unitDoc.id)
        .orderBy("createdAt")
        .get();
      return lessonsSnapshot.docs.map((doc) => doc.data() as Lesson);
    });

    const lessonArrays = await Promise.all(lessonPromises);
    return lessonArrays.flat();
  } catch (error) {
    console.error("Error getting lessons:", error);
    return [];
  }
};

export const completeLesson = async (
  userId: string,
  lessonId: string,
  xp: number
) => {
  await db
    .collection("userProgress")
    .doc(userId)
    .update({
      [`completedLessons.${lessonId}`]: true,
      xp: admin.firestore.FieldValue.increment(xp),
      lastCompleted: admin.firestore.FieldValue.serverTimestamp(),
    });
};
 */