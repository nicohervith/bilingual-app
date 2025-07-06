// services/firestoreService.ts
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebaseConfig"; // Asegúrate de tener tu configuración de Firebase

/**
 * Completa una lección y actualiza el progreso del usuario
 * @param userId - ID del usuario
 * @param levelId - ID del nivel
 * @param lessonId - ID de la lección
 * @param xpReward - XP a otorgar
 */
export const completeLesson = async (
  userId: string,
  levelId: string,
  lessonId: string,
  xpReward: number
): Promise<void> => {
  try {
    const userRef = doc(db, "userProgress", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const currentXp = userData.xp || 0;
      const completedLessons = userData.completedLessons || {};
      const levelLessons = completedLessons[levelId] || [];

      // Solo actualizar si la lección no estaba completada
      if (!levelLessons.includes(lessonId)) {
        await updateDoc(userRef, {
          xp: currentXp + xpReward,
          [`completedLessons.${levelId}`]: [...levelLessons, lessonId],
          lastCompleted: new Date().toISOString(),
        });
      }
    } else {
      throw new Error("User document not found");
    }
  } catch (error) {
    console.error("Error completing lesson:", error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

/**
 * Obtiene las lecciones de un nivel específico
 * @param levelId - ID del nivel (A1, A2, etc.)
 */
/* export const getLessonsByLevel = async (levelId: string): Promise<any[]> => {
  try {
    const levelsRef = doc(db, "lessons");
    console.log("levelsRef", levelsRef);
    const docSnap = await getDoc(levelsRef);

    if (docSnap.exists()) {
      const lessonsData = docSnap.data();
      // Filtrar lecciones por nivel y convertirlas a array
      return Object.values(lessonsData).filter(
        (lesson: any) => lesson.level === levelId
      );
    }
    return [];
  } catch (error) {
    console.error("Error getting lessons:", error);
    throw error;
  }
}; */

export const getLessonsByLevel = async (levelId: string): Promise<any[]> => {
  try {
    const lessonsRef = collection(db, "lessons"); // ✅ Colección, no documento
    const snapshot = await getDocs(lessonsRef);

    const lessons = snapshot.docs
      .map((doc) => doc.data())
      .filter((lesson: any) => lesson.level === levelId);

    return lessons;
  } catch (error) {
    console.error("Error getting lessons:", error);
    throw error;
  }
};
