

const admin = require("firebase-admin");
const serviceAccount = require("../service-account-key.json");
const contentData = require("./units-new.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bilingualsite-ee6f8-default-rtdb.firebaseio.com",
});

const db = admin.firestore();

async function importContent() {
  try {
    const db = admin.firestore();

    // 1. Primero importar las lecciones (porque las unidades las referencian)
    const lessonsBatch = db.batch();
    const lessonsRef = db.collection("lessons");
    let lessonCount = 0;

    for (const [lessonId, lessonData] of Object.entries(
      contentData.lessons || {}
    )) {
      if (!lessonData) continue;
      lessonCount++;

      const lessonRef = lessonsRef.doc(lessonId);
      const lessonToSave = {
        type: lessonData.type || "",
        title: lessonData.title || "",
        objectives: lessonData.objectives || [],
        vocabulary: (lessonData.vocabulary || []).map((item) => ({
          word: item.word || "",
          translation: item.translation || "",
          audio: item.audio || "",
          image: item.image || "",
          context: item.context || "",
          example: item.example || "",
        })),
        grammarStructure: lessonData.grammarStructure || "",
        examples: lessonData.examples || [],
        gameType: lessonData.gameType || "",
        description: lessonData.description || "",
        pairs: (lessonData.pairs || []).map((pair) => ({
          image: pair.image || "",
          matches: pair.matches || "",
        })),
        rewards: lessonData.rewards || {},
        exercises: [],
      };

      // Manejar ejercicios de forma compatible con Firestore
      if (Array.isArray(lessonData.exercises)) {
        lessonToSave.exercises = lessonData.exercises.map((ex) => ({
          type: ex.type || "",
          question: ex.question || "",
          sentence: ex.sentence || "",
          answer: ex.answer || "",
          options: ex.options || [],
          correctIndex: ex.correctIndex || 0,
          correctImage: ex.correctImage || "",
          matches: ex.matches || "",
          // Convertir arrays de arrays a arrays de objetos
          pairs: Array.isArray(ex.pairs)
            ? ex.pairs.map(([from, to]) => ({ from, to }))
            : [],
        }));
      }

      lessonsBatch.set(lessonRef, lessonToSave);
    }

    await lessonsBatch.commit();
    console.log(`✅ ${lessonCount} lecciones importadas`);

    // 2. Luego importar las unidades
    const unitsBatch = db.batch();
    const unitsRef = db.collection("units");

    for (const [unitId, unitData] of Object.entries(contentData.units || {})) {
      if (!unitData) continue;

      const unitRef = unitsRef.doc(unitId);
      unitsBatch.set(unitRef, {
        title: unitData.title || "",
        order: unitData.order || 0,
        description: unitData.description || "",
        lessons: unitData.lessons || [],
        rewards: {
          gems: unitData.rewards?.gems || 0,
          badge: unitData.rewards?.badge || "",
          sticker: unitData.rewards?.sticker || "",
        },
      });
    }

    await unitsBatch.commit();
    console.log(
      `✅ ${Object.keys(contentData.units || {}).length} unidades importadas`
    );
    console.log("🎉 Importación completada con éxito!");
  } catch (error) {
    console.error("❌ Error durante la importación:", error);
    // Detalle adicional del error
    if (error.details) {
      console.error("Detalles del error:", error.details);
    }
  }
}

importContent();