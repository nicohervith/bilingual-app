// scripts/content-data.js
module.exports = {
  // Transformar estructura antigua a nueva
  newStructure: transformOldData(oldLevels),

  // Función de transformación
  transformOldData: (old) => {
    const units = {};
    const lessons = {};

    Object.entries(old.levels).forEach(([levelId, levelData]) => {
      levelData.missions.forEach((mission) => {
        // Crear unidades basadas en agrupaciones lógicas
        if (!units[mission.unit]) {
          units[mission.unit] = createUnit(mission, levelId);
        }

        // Convertir misiones a lecciones
        const lessonId = `lesson_${mission.id}`;
        lessons[lessonId] = convertToLesson(mission);
        units[mission.unit].lessons.push(lessonId);
      });
    });

    return { levels: old.levels, units, lessons };
  },
};
