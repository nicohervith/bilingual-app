import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";
import { User } from "firebase/auth";

export const useProgress = () => {
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProgress = async (user: User) => {
    const docRef = doc(db, "user_progress", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // Crear registro inicial
      await setDoc(docRef, {
        xp: 0,
        level: "A1",
        completedMissions: {},
        lastUpdated: new Date().toISOString(),
      });
      return { xp: 0, completedMissions: {} };
    }
    return docSnap.data();
  };

  const updateProgress = async (mission: any) => {
   /*  if (!auth.currentUser) return;

    const userRef = doc(db, "user_progress", auth.currentUser.uid);
    await updateDoc(userRef, {
      xp: firebase.firestore.FieldValue.increment(mission.xpReward),
      [`completedMissions.${mission.level}`]:
        firebase.firestore.FieldValue.arrayUnion(mission.id),
    });

    // Actualizar estado local
    setProgress((prev) => ({
      ...prev,
      xp: prev.xp + mission.xpReward,
      completedMissions: {
        ...prev.completedMissions,
        [mission.level]: [
          ...(prev.completedMissions[mission.level] || []),
          mission.id,
        ],
      },
    })); */
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchProgress(auth.currentUser).then((data) => {
        setProgress(data);
        setLoading(false);
      });
    }
  }, []);

  return { progress, loading, updateProgress };
};
