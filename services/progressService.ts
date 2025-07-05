import { db } from "../lib/firebaseConfig";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";

export const initUserProgress = async (userId: string) => {
  const progressRef = doc(db, "userProgress", userId);
  await setDoc(progressRef, {
    xp: 0,
    level: "A1",
    completedMissions: {},
    unlockedLevels: ["A1"],
    rewards: {
      gems: 0,
      badges: [],
      stickers: [],
    },
  });
};

export const getProgress = async (userId: string) => {
  const progressRef = doc(db, "userProgress", userId);
  const snapshot = await getDoc(progressRef);
  return snapshot.exists() ? snapshot.data() : null;
};

export const completeMission = async (
  userId: string,
  levelId: string,
  missionId: string,
  xpReward: number
) => {
  const progressRef = doc(db, "userProgress", userId);

  // Primero obtenemos el progreso actual para calcular el nuevo nivel
  const currentProgress = await getProgress(userId);
  const currentXp = currentProgress?.xp || 0;

  await updateDoc(progressRef, {
    [`completedMissions.${levelId}`]: arrayUnion(missionId),
    xp: increment(xpReward),
    ...calculateLevelUpdates(currentXp, xpReward), // Pasamos ambos parámetros
  });
};

// Función modificada para recibir ambos parámetros
const calculateLevelUpdates = (currentXp: number, xpEarned: number) => {
  const newXp = currentXp + xpEarned;
  let level = "A1";
  let unlockedLevels = ["A1"];

  if (newXp > 1000) {
    level = "B1";
    unlockedLevels = ["A1", "A2", "B1"];
  } else if (newXp > 500) {
    level = "A2";
    unlockedLevels = ["A1", "A2"];
  }

  return { level, unlockedLevels };
};