import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

// Configuración de Firebase (reemplaza con tu configuración)
const firebaseConfig = {
  apiKey: "AIzaSyC40iEVDPzMrQBEjPAuYss5lzvhpH_ZrsU",
  authDomain: "bilingual-site-65404.firebaseapp.com",
  databaseURL: "https://bilingual-site-65404-default-rtdb.firebaseio.com",
  projectId: "bilingual-site-65404",
  storageBucket: "bilingual-site-65404.firebasestorage.app",
  messagingSenderId: "500497750948",
  appId: "1:500497750948:web:082933a226e1224f5abf31",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrateWithExistingBadges(batchSize = 50) {
  try {
    console.log("Iniciando migración...");

    // 1. Obtener todas las unidades con insignias
    const unitBadges = await getUnitBadges();
    console.log(
      `Encontradas ${Object.keys(unitBadges).length} unidades con insignias`
    );

    // 2. Obtener todos los usuarios
    const usersSnapshot = await getDocs(collection(db, "userProgress"));
    const totalUsers = usersSnapshot.size;
    console.log(`Total de usuarios a procesar: ${totalUsers}`);

    let processed = 0;
    let successes = 0;
    let errors = 0;

    // 3. Procesar por lotes
    for (let i = 0; i < usersSnapshot.docs.length; i += batchSize) {
      const batch = usersSnapshot.docs.slice(i, i + batchSize);

      const batchResults = await Promise.all(
        batch.map(async (userDoc) => {
          try {
            const result = await processUser(userDoc, unitBadges);
            return { success: true };
          } catch (error) {
            console.error(
              `Error procesando usuario ${userDoc.id}:`,
              error.message
            );
            return { success: false, error };
          }
        })
      );

      // Contar resultados del batch
      const batchSuccesses = batchResults.filter((r) => r.success).length;
      const batchErrors = batchResults.length - batchSuccesses;

      successes += batchSuccesses;
      errors += batchErrors;
      processed += batch.length;
    }

    console.log(`
      Migración completada!
      Total procesados: ${processed}
      Usuarios actualizados: ${successes}
      Errores: ${errors}
    `);

    return successes;
  } catch (error) {
    console.error("Error en la migración:", error);
    process.exit(1);
  }
}

async function getUnitBadges() {
  const unitBadges = {};
  const modulesSnapshot = await getDocs(collection(db, "modules"));

  modulesSnapshot.forEach((moduleDoc) => {
    const units = moduleDoc.data().units || {};
    Object.entries(units).forEach(([unitId, unit]) => {
      if (unit.insignia) {
        unitBadges[unitId] = {
          url: unit.insignia,
          title: unit.title || `Unidad ${unitId}`,
        };
      }
    });
  });

  return unitBadges;
}

async function processUser(userDoc, unitBadges) {
  const userData = userDoc.data();
  const updates = {};
  let needsUpdate = false;

  // Inicializar earnedBadges si no existe
  if (!userData.earnedBadges) {
    updates.earnedBadges = {};
    needsUpdate = true;
  }

  // Verificar cada unidad con insignia
  for (const [unitId, badgeInfo] of Object.entries(unitBadges)) {
    // Saltar si ya tiene la insignia
    if (userData.earnedBadges?.[unitId]) continue;

    // Obtener datos de la unidad
    const unitDoc = await getDoc(doc(db, "units", unitId));
    if (!unitDoc.exists()) continue;

    const unit = unitDoc.data();
    const lessons = unit.lessons || [];

    // Verificar si completó todas las lecciones
    const allLessonsCompleted = lessons.every(
      (lessonId) => userData.completedLessons?.[lessonId]
    );

    if (allLessonsCompleted) {
      updates[`earnedBadges.${unitId}`] = {
        unitId,
        unitTitle: badgeInfo.title,
        insigniaUrl: badgeInfo.url,
        earnedAt: userData.lastCompleted || serverTimestamp(),
      };
      needsUpdate = true;
    }
  }

  if (needsUpdate) {
    await updateDoc(userDoc.ref, updates);
  }

  return needsUpdate;
}

migrateWithExistingBadges()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
