const admin = require('firebase-admin');
const serviceAccount = require('../service-account-key.json');
const { oldLevels, newStructure } = require('./content-data');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bilingual-site-65404-default-rtdb.firebaseio.com",
});

const db = admin.firestore();

async function migrate() {
  const batch = db.batch();
  const levelsRef = db.collection('levels');
  const unitsRef = db.collection('units');
  const lessonsRef = db.collection('lessons');

  // 1. Migrar niveles
  Object.entries(newStructure.levels).forEach(([levelId, levelData]) => {
    batch.set(levelsRef.doc(levelId), levelData);
  });

  // 2. Migrar unidades y lecciones
  Object.entries(newStructure.units).forEach(([unitId, unitData]) => {
    // Crear unidad
    batch.set(unitsRef.doc(unitId), {
      ...unitData,
      lessons: [] // Se llenará después
    });

    // Crear lecciones de la unidad
    unitData.lessons.forEach(lessonId => {
      const lessonData = newStructure.lessons[lessonId];
      batch.set(lessonsRef.doc(lessonId), {
        ...lessonData,
        unit: unitId
      });
    });
  });

  await batch.commit();
  console.log('Migración completada!');
}

migrate().catch(console.error);