import { db } from "@/lib/firebaseConfig";
import { XP } from "@/services/xpService";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

export type ReadingQuestion = {
  question: string;
  options: string[];
  answer: number; // índice de la opción correcta
  explanation?: string;
};

export type Reading = {
  id: string;
  level: string;
  unitId: string;
  unitTitle: string;
  order: number;
  title: string;
  titleEs: string;
  text: string[]; // un elemento por párrafo
  glossary: { word: string; translation: string }[];
  questions: ReadingQuestion[];
};

export type ReadingResult = {
  score: number;
  total: number;
};

const byOrder = (a: Reading, b: Reading) => a.order - b.order;

export const getAllReadings = async (): Promise<Reading[]> => {
  const snap = await getDocs(collection(db, "readings"));
  return snap.docs.map((d) => ({ ...(d.data() as Reading), id: d.id })).sort(byOrder);
};

export const getReadingsByLevel = async (level: string): Promise<Reading[]> => {
  const snap = await getDocs(query(collection(db, "readings"), where("level", "==", level)));
  return snap.docs.map((d) => ({ ...(d.data() as Reading), id: d.id })).sort(byOrder);
};

export const getReadingsByUnit = async (unitId: string): Promise<Reading[]> => {
  const snap = await getDocs(query(collection(db, "readings"), where("unitId", "==", unitId)));
  return snap.docs.map((d) => ({ ...(d.data() as Reading), id: d.id })).sort(byOrder);
};

export const getReadingById = async (id: string): Promise<Reading | null> => {
  const snap = await getDoc(doc(db, "readings", id));
  return snap.exists() ? { ...(snap.data() as Reading), id: snap.id } : null;
};

/** Lecturas que el usuario ya hizo, con su mejor puntaje. */
export const getCompletedReadings = async (
  userId: string,
): Promise<Record<string, ReadingResult>> => {
  const snap = await getDoc(doc(db, "userProgress", userId));
  return snap.exists() ? snap.data().completedReadings || {} : {};
};

/**
 * Guarda el resultado de una lectura. El XP se suma solo la primera vez;
 * si se repite, se conserva el mejor puntaje.
 */
export const completeReading = async (
  userId: string,
  reading: Reading,
  score: number,
): Promise<{ firstTime: boolean }> => {
  const ref = doc(db, "userProgress", userId);
  const snap = await getDoc(ref);
  const previous: ReadingResult | undefined = snap.data()?.completedReadings?.[reading.id];

  const update: Record<string, any> = {
    [`completedReadings.${reading.id}`]: {
      score: Math.max(score, previous?.score || 0),
      total: reading.questions.length,
      completedAt: serverTimestamp(),
    },
  };
  if (!previous) update.xp = increment(XP.reading);

  await updateDoc(ref, update);
  return { firstTime: !previous };
};
