/* const admin = require("firebase-admin");
const serviceAccount = require("../service-account-key.json");
const missionsData = require("./units-new.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bilingual-site-65404-default-rtdb.firebaseio.com", 
});

const db = admin.firestore();

async function importMissions() {
  try {
    const batch = db.batch();
    const missionsRef = db.collection("missions");

    // Para cada nivel (A1, A2, etc.)
    Object.entries(missionsData).forEach(([levelId, levelData]) => {
      const levelRef = missionsRef.doc(levelId);
      batch.set(levelRef, levelData);
    });

    await batch.commit();
    console.log("✅ ¡Datos importados correctamente a Firestore!");
  } catch (error) {
    console.error("❌ Error al importar:", error);
  }
}

importMissions();
 */

const admin = require("firebase-admin");
const serviceAccount = require("../service-account-key.json");
const contentData = require("./units-new.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bilingual-site-65404-default-rtdb.firebaseio.com",
});

const db = admin.firestore();

async function importContent() {
  try {
    // 1. Importar unidades
    const unitsBatch = db.batch();
    const unitsRef = db.collection("units");

    Object.entries(contentData.units || {}).forEach(([unitId, unitData]) => {
      if (!unitData) return;

      const unitRef = unitsRef.doc(unitId);
      const simplifiedUnit = {
        title: unitData.title,
        order: unitData.order,
        description: unitData.description,
        lessons: unitData.lessons || [],
        rewards: unitData.rewards
          ? {
              gems: unitData.rewards.gems || 0,
              badge: unitData.rewards.badge || "",
              sticker: unitData.rewards.sticker || "",
            }
          : { gems: 0, badge: "", sticker: "" },
      };
      unitsBatch.set(unitRef, simplifiedUnit);
    });

    await unitsBatch.commit();
    console.log(
      `✅ ${Object.keys(contentData.units || {}).length} unidades importadas`
    );

    // 2. Importar lecciones
    const lessonsBatch = db.batch();
    const lessonsRef = db.collection("lessons");
    let lessonCount = 0;

    Object.entries(contentData.lessons || {}).forEach(
      ([lessonId, lessonData]) => {
        if (!lessonData) return;
        lessonCount++;

        const lessonRef = lessonsRef.doc(lessonId);
        const simplifiedLesson = {
          type: lessonData.type || "",
          title: lessonData.title || "",
          objectives: lessonData.objectives || [],
          vocabulary: lessonData.vocabulary || [],
          grammarStructure: lessonData.grammarStructure || "",
          examples: lessonData.examples || [],
          gameType: lessonData.gameType || "",
          description: lessonData.description || "",
          pairs: lessonData.pairs || [],
          rewards: lessonData.rewards || {},
        };

        // Manejar ejercicios de forma segura
        if (Array.isArray(lessonData.exercises)) {
          simplifiedLesson.exercises = lessonData.exercises.map((exercise) => ({
            type: exercise.type || "",
            question: exercise.question || "",
            pairs: exercise.pairs
              ? exercise.pairs.map((pair) => [...pair])
              : [],
            sentence: exercise.sentence || "",
            answer: exercise.answer || "",
            options: exercise.options || [],
            correctIndex: exercise.correctIndex || 0,
            correctImage: exercise.correctImage || "",
            matches: exercise.matches || "",
          }));
        } else {
          simplifiedLesson.exercises = [];
        }

        lessonsBatch.set(lessonRef, simplifiedLesson);
      }
    );

    await lessonsBatch.commit();
    console.log(`✅ ${lessonCount} lecciones importadas`);
    console.log("🎉 Importación completada con éxito!");
  } catch (error) {
    console.error("❌ Error durante la importación:", error);
  }
}

importContent();