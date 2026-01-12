const admin = require("firebase-admin");
const serviceAccount = require("../service-account-key.json");
const lessonsData = require("./lessons_to_import.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bilingualsite-ee6f8-default-rtdb.firebaseio.com",
});

const db = admin.firestore();

async function importLessons() {
  try {
    const batch = db.batch();
    const lessonsRef = db.collection("lessons");
    let count = 0;

    console.log("🔥 Iniciando importación...");

    for (const [lessonId, lesson] of Object.entries(lessonsData.lessons)) {
      try {
        // Validación corregida
        if (!lesson.id || !lesson.title || !lesson.metadata?.level) {
          console.warn(
            `⚠️ Lección omitida: ${lessonId} - Faltan campos requeridos`
          );
          continue;
        }

        // Estructura Firestore corregida
        const lessonData = {
          id: lesson.id,
          title: lesson.title,
          metadata: {
            level: lesson.metadata.level,
            module: lesson.metadata.module || null,
            unit: lesson.metadata.unit || null,
            xpReward: lesson.metadata.xpReward || 50,
            estimatedDuration: lesson.metadata.estimatedDuration || 0,
            tags: lesson.metadata.tags || [],
          },
          objectives: lesson.objectives || [],
          content: {
            vocabulary:
              lesson.content?.vocabulary?.map((item) => ({
                id: item.id,
                word: item.word,
                translation: item.translation,
                examples: item.examples || [],
                conjugations: item.conjugations || null,
                image: item.image || null,
                tags: item.tags || [],
              })) || [],
            exercises:
              lesson.content?.exercises?.map((ex) => {
                const baseExercise = {
                  id: ex.id,
                  type: ex.type,
                  title: ex.title || ex.type,
                  instructions: ex.instructions || "",
                  question: ex.question || "",
                  config: ex.config || {},
                  feedback: ex.feedback || {},
                  scoring: ex.scoring || { pointsPerCorrect: 1 },
                };

                // Añade campos específicos para cada tipo de ejercicio
                switch (ex.type) {
                  case "drag_drop":
                    return {
                      ...baseExercise,
                      dragItems: ex.dragItems || [],
                      dropZones: ex.dropZones || [],
                    };
                  case "memory_game":
                    return {
                      ...baseExercise,
                      pairs: ex.config?.pairs || [],
                    };
                  default:
                    return baseExercise;
                }
              }) || [],
          },
          settings: {
            unlockCondition: lesson.settings?.unlockCondition || null,
            retryLimit: lesson.settings?.retryLimit || 3,
            accessibility: lesson.settings?.accessibility || {},
          },
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        batch.set(lessonsRef.doc(lessonId), lessonData);
        count++;
        console.log(`✓ Lección preparada: ${lessonId}`);
      } catch (error) {
        console.error(`❌ Error en lección ${lessonId}:`, error.message);
      }
    }

    await batch.commit();
    console.log(`\n🎉 ¡Importación completada! ${count} lecciones procesadas.`);
  } catch (error) {
    console.error("❌ Error crítico:", error);
  } finally {
    process.exit(0);
  }
}

importLessons();
