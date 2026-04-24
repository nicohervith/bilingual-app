import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// Crea un archivo cache.ts
// contexts/cache.ts
const cache = new Map<string, any>();

export const getCachedData = async (
  key: string,
  fetcher: () => Promise<any>,
  ttl = 300000 // 5 minutos por defecto
) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }

  const data = await fetcher();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
};

// Función para limpiar caché específico
export const clearCache = (key?: string) => {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
};