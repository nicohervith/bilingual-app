const admin = require("firebase-admin");
const serviceAccount = require("../service-account-key.json");
const exercisesData = require("./exercises_to_add.json"); // Tu nuevo JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function addExercisesToLessons() {
  try {
    const lessonsRef = db.collection("lessons");
    let lessonCount = 0;
    let exerciseCount = 0;

    console.log("🚀 Iniciando actualización de ejercicios...");

    for (const [lessonId, newExercises] of Object.entries(exercisesData)) {
      try {
        const docRef = lessonsRef.doc(lessonId);
        const doc = await docRef.get();

        if (!doc.exists) {
          console.warn(
            `⚠️ La lección ${lessonId} no existe en Firestore. Omitiendo...`,
          );
          continue;
        }

        // Procesar los ejercicios con tu lógica de switch para asegurar estructura
        const processedExercises = newExercises.map((ex) => {
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

          // Aplicar lógica específica por tipo (igual que en tu importador original)
          switch (ex.type) {
            case "drag_drop":
              return {
                ...baseExercise,
                dragItems: ex.dragItems || [],
                dropZones: ex.dropZones || [],
              };
            case "memory_game":
              return { ...baseExercise, pairs: ex.config?.pairs || [] };
            case "conjugation":
              // Aseguramos que el config contenga verb, pronouns y correct
              return { ...baseExercise };
            case "audio_matching":
              // Importante para el componente que acabamos de arreglar
              return { ...baseExercise };
            default:
              return baseExercise;
          }
        });

        // El arrayUnion se encarga de SUMAR al final del array existente
        await docRef.update({
          "content.exercises": admin.firestore.FieldValue.arrayUnion(
            ...processedExercises,
          ),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        lessonCount++;
        exerciseCount += processedExercises.length;
        console.log(
          `✅ ${processedExercises.length} ejercicios añadidos a: ${lessonId}`,
        );
      } catch (error) {
        console.error(
          `❌ Error actualizando lección ${lessonId}:`,
          error.message,
        );
      }
    }

    console.log(`\n🎉 ¡Proceso terminado!`);
    console.log(`Lecciones afectadas: ${lessonCount}`);
    console.log(`Total ejercicios nuevos: ${exerciseCount}`);
  } catch (error) {
    console.error("❌ Error crítico:", error);
  } finally {
    process.exit(0);
  }
}

addExercisesToLessons();
