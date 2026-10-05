import { db } from "@/lib/firebaseConfig";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";

export type StreakStats = {
  daysStreak: number;
  lastLogin: Date;
  longestStreak: number;
};

const toDate = (value: any): Date | null => {
  if (!value) return null;
  if (value instanceof Timestamp || typeof value?.toDate === "function") return value.toDate();
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
};

// Días de calendario (hora local) entre dos fechas. Se compara año/mes/día en UTC
// para que un día de 23 o 25 horas (cambio de horario) no altere la cuenta.
const calendarDaysBetween = (from: Date, to: Date) => {
  const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const b = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b - a) / 86400000);
};

/**
 * Calcula la racha de días consecutivos con conexión.
 * - Mismo día que la última conexión: no cambia.
 * - Día siguiente: suma 1.
 * - Más de un día sin conectarse: vuelve a 1.
 */
export const computeStreak = (stats: any, now: Date = new Date()): StreakStats => {
  const lastLogin = toDate(stats?.lastLogin);
  const current = Math.max(stats?.daysStreak || 0, 1);

  let daysStreak = current;
  if (!lastLogin) {
    daysStreak = 1;
  } else {
    const diff = calendarDaysBetween(lastLogin, now);
    if (diff === 1) daysStreak = current + 1;
    else if (diff > 1) daysStreak = 1;
    // diff <= 0: mismo día (o reloj del dispositivo atrasado): se mantiene
  }

  return {
    daysStreak,
    lastLogin: now,
    longestStreak: Math.max(daysStreak, stats?.longestStreak || 0),
  };
};

/** Registra la conexión de hoy y devuelve la racha actualizada. */
export const registerDailyConnection = async (
  userId: string,
  knownStats?: any,
): Promise<StreakStats | null> => {
  const ref = doc(db, "userProgress", userId);
  let stats = knownStats;
  if (stats === undefined) {
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    stats = snap.data().stats;
  }

  const next = computeStreak(stats);
  await updateDoc(ref, {
    "stats.daysStreak": next.daysStreak,
    "stats.lastLogin": next.lastLogin,
    "stats.longestStreak": next.longestStreak,
  });
  return next;
};
