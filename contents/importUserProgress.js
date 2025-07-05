const admin = require("firebase-admin");
const serviceAccount = require("../service-account-key.json");
const progressData = require("./user_progress.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bilingual-site-65404-default-rtdb.firebaseio.com",
});

const db = admin.firestore();

async function importUserProgress() {
  try {
    console.log("🚀 Iniciando importación de userProgress...");
    const batch = db.batch();
    const progressRef = db.collection("userProgress");

    Object.entries(progressData).forEach(([userId, userData]) => {
      const userRef = progressRef.doc(userId);
      batch.set(userRef, {
        ...userData,
        // Conversión de fechas si es necesario
        lastLogin: admin.firestore.Timestamp.fromDate(
          new Date(userData.stats.lastLogin)
        ),
      });
    });

    await batch.commit();
    console.log("✅ ¡userProgress importado correctamente!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al importar userProgress:", error);
    process.exit(1);
  }
}

importUserProgress();
