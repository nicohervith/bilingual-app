const admin = require("firebase-admin");
const serviceAccount = require("../service-account-key.json");
const lessonsData = require("./lessons_to_import2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bilingual-site-65404.firebaseio.com",
});

const db = admin.firestore();

// 2. Función principal
async function importLessons() {
  try {
    const batch = db.batch();
    const lessonsRef = db.collection("lessons");
    let count = 0;

    console.log("🔥 Iniciando importación...");

    // 3. Procesar cada lección
    for (const [lessonId, lesson] of Object.entries(lessonsData.lessons)) {
      try {
        // Validación básica
        if (!lesson.id || !lesson.title || !lesson.type) {
          console.warn(
            `⚠️ Lección omitida: ${lessonId} - Faltan campos requeridos`
          );
          continue;
        }

        // Estructura Firestore
        const lessonData = {
          id: lessonId,
          unit: lesson.unit || null,
          level: lesson.level || "A1",
          title: lesson.title,
          type: lesson.type,
          xpReward: lesson.xpReward || 50,
          objectives: lesson.objectives || [],
          content: {
            vocabulary:
              lesson.content?.vocabulary?.map((item) => ({
                word: item.word,
                translation: item.translation,
                image: item.image || null,
                examples: item.examples || [],
              })) || [],
            exercises:
              lesson.content?.exercises?.map((ex) => ({
                type: ex.type,
                title: ex.title || ex.type,
                question: ex.question || "",
                pairs: ex.pairs || [],
                options: ex.options || [],
              })) || [],
          },
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        // Añadir al batch
        batch.set(lessonsRef.doc(lessonId), lessonData);
        count++;
        console.log(`✓ Lección preparada: ${lessonId}`);
      } catch (error) {
        console.error(`❌ Error en lección ${lessonId}:`, error.message);
      }
    }

    // 4. Ejecutar batch
    await batch.commit();
    console.log(`\n🎉 ¡Importación completada! ${count} lecciones procesadas.`);
  } catch (error) {
    console.error("❌ Error crítico:", error);
  } finally {
    process.exit(0);
  }
}

// Ejecutar
importLessons();