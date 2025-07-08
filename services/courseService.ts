import { Lesson, UserProgress } from "@/types/types";
import { initializeApp } from "firebase/app";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firebaseConfig } from "../lib/firebaseConfig"; // Asegúrate de tener tu configuración

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Define los tipos para mejor TypeScript
type Module = {
  id: string;
  title: string;
  description: string;
  icon: string;
  units: Unit[];
};

type Unit = {
  id: string;
  title: string;
  lessons: string[];
  requiredXP: number;
  rewardXP: number;
};

export const getUserProgress = async (
  userId: string
): Promise<UserProgress> => {
  try {
    const userProgressRef = doc(db, "userProgress", userId);
    const snapshot = await getDoc(userProgressRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        xp: data.xp || 0,
        completedMissions: data.completedMissions || {},
        levels: data.levels || {},
        completedUnits: data.completedUnits || [],
        totalXP: data.totalXP || 0,
        lastActive: data.lastActive || Timestamp.now(),
      };
    } else {
      const newProgress: UserProgress = {
        xp: 0,
        completedMissions: {},
        levels: {},
        completedUnits: [],
        totalXP: 0,
        lastActive: Timestamp.now(),
      };

      await setDoc(userProgressRef, newProgress);
      return newProgress;
    }
  } catch (error) {
    console.error("Error getting user progress:", error);
    throw error;
  }
};


export const getModules = async (): Promise<Module[]> => {
  try {
    const modulesCollection = collection(db, "modules");
    const snapshot = await getDocs(modulesCollection);

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Module)
    );
  } catch (error) {
    console.error("Error fetching modules:", error);
    return [];
  }
};

export const getUnitById = async (unitId: string): Promise<Unit | null> => {
  try {
    const unitDoc = doc(db, "units", unitId);
    const unitSnapshot = await getDoc(unitDoc);

    if (unitSnapshot.exists()) {
      return {
        id: unitSnapshot.id,
        ...unitSnapshot.data(),
      } as Unit;
    }
    return null;
  } catch (error) {
    console.error("Error fetching unit:", error);
    return null;
  }
};

export const completeUnit = async (
  userId: string,
  unitId: string,
  xpReward: number
): Promise<void> => {
  try {
    const userProgressRef = doc(db, "userProgress", userId);

    await updateDoc(userProgressRef, {
      completedUnits: arrayUnion(unitId),
      totalXP: increment(xpReward),
    });
  } catch (error) {
    console.error("Error completing unit:", error);
    throw error;
  }
};

export const getLessonById = async (lessonId: string): Promise<Lesson> => {
  const docSnap = await getDoc(doc(db, "lessons", lessonId));
  return docSnap.data() as Lesson;
};

// firebase.ts
export const completeLesson = async (
  userId: string,
  lessonId: string,
  xpReward: number
) => {
  const userRef = doc(db, "userProgress", userId);
  
  await updateDoc(userRef, {
    [`completedLessons.${lessonId}`]: true,
    xp: increment(xpReward)
  });
};

export const unlockNextUnit = async (
  userId: string,
  moduleId: string,
  currentUnitId: string
) => {
  const moduleDoc = await getDoc(doc(db, "modules", moduleId));
  const units = moduleDoc.data()?.units;
  const unitIds = Object.keys(units);
  const currentIndex = unitIds.indexOf(currentUnitId);
  
  if (currentIndex < unitIds.length - 1) {
    const nextUnitId = unitIds[currentIndex + 1];
    const userRef = doc(db, "userProgress", userId);
    
    await updateDoc(userRef, {
      unlockedUnits: arrayUnion(nextUnitId)
    });
  }
};

export const getProgress = async (userId: string) => {
  const docSnap = await getDoc(doc(db, "userProgress", userId));
  return docSnap.exists() ? docSnap.data() : null;
};