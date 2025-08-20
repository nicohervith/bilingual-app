// add-purchased-levels-field.js
const admin = require("firebase-admin");
const serviceAccount = require("../service-account-key.json");// Ajusta la ruta

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bilingual-site-65404-default-rtdb.firebaseio.com",
});

const db = admin.firestore();

async function addPurchasedLevelsField() {
  try {
    console.log("🚀 Iniciando migración: agregando campo purchasedLevels...");

    // Obtener todos los documentos de userProgress
    const progressSnapshot = await db.collection("userProgress").get();

    if (progressSnapshot.empty) {
      console.log("📭 No hay documentos en userProgress");
      return;
    }

    console.log(`📊 Encontrados ${progressSnapshot.size} usuarios`);

    let processed = 0;
    let updated = 0;
    let errors = 0;

    // Procesar en lotes para evitar timeouts
    const batchSize = 100;
    const batches = [];

    for (let i = 0; i < progressSnapshot.size; i += batchSize) {
      const batch = [];
      const chunk = progressSnapshot.docs.slice(i, i + batchSize);

      chunk.forEach((doc) => {
        const userData = doc.data();

        // Solo actualizar si no existe el campo purchasedLevels
        if (userData.purchasedLevels === undefined) {
          batch.push({
            docRef: doc.ref,
            updateData: {
              purchasedLevels: {}, // Objeto vacío por defecto
            },
          });
          updated++;
        }

        processed++;
      });

      if (batch.length > 0) {
        batches.push(batch);
      }
    }

    console.log(`📈 Usuarios a actualizar: ${updated}`);
    console.log(`📈 Usuarios ya actualizados: ${processed - updated}`);

    // Ejecutar las actualizaciones por lotes
    for (const batch of batches) {
      const writeBatch = db.batch();

      batch.forEach(({ docRef, updateData }) => {
        writeBatch.update(docRef, updateData);
      });

      await writeBatch.commit();
      console.log(`✅ Lote de ${batch.length} usuarios actualizado`);

      // Pequeña pausa para evitar sobrecargar Firebase
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    console.log("🎉 ¡Migración completada!");
    console.log(`📊 Resumen:`);
    console.log(`   - Total procesados: ${processed}`);
    console.log(`   - Actualizados: ${updated}`);
    console.log(`   - Ya tenían el campo: ${processed - updated}`);
    console.log(`   - Errores: ${errors}`);
  } catch (error) {
    console.error("❌ Error durante la migración:", error);
  } finally {
    process.exit(0);
  }
}

// Versión alternativa para migración masiva con paginación
async function addPurchasedLevelsFieldBatched() {
  try {
    console.log("🚀 Iniciando migración con paginación...");

    let lastDoc = null;
    let processed = 0;
    let updated = 0;

    do {
      let query = db.collection("userProgress").limit(100);

      if (lastDoc) {
        query = query.startAfter(lastDoc);
      }

      const snapshot = await query.get();

      if (snapshot.empty) {
        break;
      }

      const batch = db.batch();
      let batchCount = 0;

      snapshot.forEach((doc) => {
        const userData = doc.data();

        if (userData.purchasedLevels === undefined) {
          batch.update(doc.ref, { purchasedLevels: {} });
          batchCount++;
          updated++;
        }

        processed++;
      });

      if (batchCount > 0) {
        await batch.commit();
        console.log(`✅ Lote de ${batchCount} usuarios actualizado`);
      }

      lastDoc = snapshot.docs[snapshot.docs.length - 1];

      // Pequeña pausa
      await new Promise((resolve) => setTimeout(resolve, 300));
    } while (lastDoc);

    console.log("🎉 ¡Migración completada!");
    console.log(`📊 Total procesados: ${processed}`);
    console.log(`📊 Total actualizados: ${updated}`);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// Script para verificar el estado actual
async function checkCurrentState() {
  try {
    console.log("🔍 Verificando estado actual...");

    const sampleSnapshot = await db.collection("userProgress").limit(5).get();

    console.log("📋 Muestra de documentos:");
    sampleSnapshot.forEach((doc, index) => {
      const data = doc.data();
      console.log(`\n📄 Documento ${index + 1}:`);
      console.log(`   ID: ${doc.id}`);
      console.log(
        `   Tiene purchasedLevels: ${data.purchasedLevels !== undefined}`
      );
      console.log(`   purchasedLevels:`, data.purchasedLevels || "No existe");
      console.log(`   unlockedLevels:`, data.unlockedLevels || []);
    });

    // Contar documentos con/sin el campo
    const withField = await db
      .collection("userProgress")
      .where("purchasedLevels", "!=", null)
      .count()
      .get();

    const total = await db.collection("userProgress").count().get();

    console.log(`\n📊 Estadísticas:`);
    console.log(`   - Total documentos: ${total.data().count}`);
    console.log(`   - Con purchasedLevels: ${withField.data().count}`);
    console.log(
      `   - Sin purchasedLevels: ${total.data().count - withField.data().count}`
    );
  } catch (error) {
    console.error("❌ Error verificando estado:", error);
  }
}

// Ejecutar según el argumento
const command = process.argv[2];

switch (command) {
  case "check":
    checkCurrentState();
    break;
  case "migrate":
    addPurchasedLevelsField();
    break;
  case "migrate-batch":
    addPurchasedLevelsFieldBatched();
    break;
  default:
    console.log(
      "💡 Uso: node add-purchased-levels-field.js [check|migrate|migrate-batch]"
    );
    console.log("   check: Verificar estado actual");
    console.log("   migrate: Ejecutar migración normal");
    console.log("   migrate-batch: Ejecutar migración con paginación");
    process.exit(1);
}
