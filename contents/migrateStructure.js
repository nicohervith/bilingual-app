// contents/migrateStructure.js
const { db } = require("../lib/firebaseConfig");
const {
  doc,
  setDoc,
  collection,
  getDocs,
  writeBatch,
} = require("firebase/firestore");

async function migrateStructure() {
  try {
    console.log("🚀 Iniciando migración de estructura...");

    // 1. Crear estructura principal de módulos
    await setDoc(doc(db, "modules", "basics"), {
      id: "basics",
      title: "Fundamentos de Inglés",
      description: "Aprende lo básico",
      icon: "🌟",
      units: {
        unitA1_basics: {
          id: "unitA1_basics",
          title: "Conceptos Básicos",
          lessons: ["A1_colors", "A1_numbers", "A1_greetings"],
          requiredXP: 0,
          rewardXP: 100,
        },
        unitA1_vocabulary: {
          id: "unitA1_vocabulary",
          title: "Vocabulario Esencial",
          lessons: ["A1_animals", "A1_food", "A1_family"],
          requiredXP: 100,
          rewardXP: 150,
        },
        unitA1_grammar: {
          id: "unitA1_grammar",
          title: "Gramática Fundamental",
          lessons: ["A1_pronouns", "A1_articles", "A1_simple_present"],
          requiredXP: 200,
          rewardXP: 200,
        },
      },
    });
    console.log('✅ Módulo "basics" creado');

    // 2. Mapeo de unidades antiguas a nuevas
    const unitMap = {
      unitA1_basics: "unitA1_basics",
      unitA1_vocabulary: "unitA1_vocabulary",
      unitA1_grammar: "unitA1_grammar",
      unitA1_relationships: "unitA1_vocabulary",
      unitA1_food: "unitA1_vocabulary",
      unitA1_daily_life: "unitA1_vocabulary",
    };

    // 3. Actualizar lecciones en lote
    const batch = writeBatch(db);
    const lessonsSnapshot = await getDocs(collection(db, "lessons"));
    let updatedCount = 0;

    lessonsSnapshot.forEach((lessonDoc) => {
      const lessonData = lessonDoc.data();
      const newUnit = unitMap[lessonData.unit] || "unitA1_basics";

      batch.update(lessonDoc.ref, {
        unit: newUnit,
        module: "basics",
      });
      updatedCount++;
    });

    await batch.commit();
    console.log(`🔄 ${updatedCount} lecciones actualizadas`);
    console.log("🎉 ¡Migración completada con éxito!");
  } catch (error) {
    console.error("❌ Error durante la migración:", error);
    process.exit(1);
  }
}

// Ejecutar migración
migrateStructure();
