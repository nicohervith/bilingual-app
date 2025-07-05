import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

export const createNewUserProgress = async (userId: string) => {
  try {
    await setDoc(doc(db, "userProgress", userId), {
      xp: 0,
      currentLevel: "A1",
      unlockedLevels: ["A1"],
      completedMissions: {},
      rewards: {
        gems: 10,
        badges: ["welcome_badge"],
        stickers: ["bily_hello"],
      },
      stats: {
        daysStreak: 0,
        lastLogin: new Date(),
        totalMinutesPracticed: 0,
      },
    });
  } catch (error) {
    console.error("Error creating user progress:", error);
    throw error;
  }
};

export const checkUserProgress = async (userId: string) => {
  const docRef = doc(db, "userProgress", userId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    console.log("Progress not found, creating new...");
    await createNewUserProgress(userId);
  }
};
