// Valida las lecturas de contents/curriculum/readings/<nivel>.js y las sube a Firestore (colección "readings").
//
//   node contents/curriculum/readings.js A1            -> valida y muestra qué se escribiría, no escribe nada
//   node contents/curriculum/readings.js A1 --write    -> escribe en Firestore (antes guarda un backup)
//
// Cada documento queda como readings/reading_<nivel>_<unidad>_<n>, por ejemplo reading_A1_first_steps_1.

const fs = require("fs");
const path = require("path");

const WRITE = process.argv.includes("--write");
const LEVEL = (process.argv.find((a) => /^[ab][12]$/i.test(a)) || "A1").toUpperCase();
const MODULE_ID = { A1: "basics", A2: "basics_a2" }[LEVEL];
if (!MODULE_ID) throw new Error(`Nivel desconocido: ${LEVEL}`);

const PER_UNIT = 2;
const dump = JSON.parse(fs.readFileSync(require("./helpers").latestDump(), "utf8"));
const units = dump.modules[MODULE_ID].units;
const source = require(`./readings/${LEVEL.toLowerCase()}.js`);

const errors = [];
const readings = {};
const countByUnit = {};

source.forEach((r, i) => {
  const where = `#${i + 1} "${r.title}"`;
  const unit = units[r.unitId];
  if (!unit) return errors.push(`${where}: la unidad ${r.unitId} no existe en ${MODULE_ID}`);

  const n = (countByUnit[r.unitId] = (countByUnit[r.unitId] || 0) + 1);
  const id = `reading_${r.unitId.replace(/^unit/, "")}_${n}`;

  if (!r.title || !r.titleEs) errors.push(`${where}: falta title o titleEs`);
  if (!r.text?.length || r.text.some((p) => !p.trim())) errors.push(`${where}: texto vacío`);
  if (r.questions.length < 3) errors.push(`${where}: tiene ${r.questions.length} preguntas (mínimo 3)`);
  r.questions.forEach((q, qi) => {
    const isTrueFalse = q.options.join() === "True,False";
    if (!isTrueFalse && q.options.length !== 3)
      errors.push(`${where} pregunta ${qi + 1}: tiene ${q.options.length} opciones (¿una opción con coma?)`);
    if (q.answer < 0) errors.push(`${where} pregunta ${qi + 1}: la respuesta no está entre las opciones`);
    if (new Set(q.options).size !== q.options.length) errors.push(`${where} pregunta ${qi + 1}: opciones repetidas`);
  });

  readings[id] = { ...r, level: LEVEL, unitTitle: unit.title, order: n };
});

for (const [unitId, count] of Object.entries(countByUnit)) {
  if (count > PER_UNIT) errors.push(`${unitId}: tiene ${count} lecturas (se esperan ${PER_UNIT})`);
}

const words = (r) => r.text.join(" ").split(/\s+/).length;
console.log(`Lecturas ${LEVEL}: ${Object.keys(readings).length}`);
for (const [id, r] of Object.entries(readings)) {
  console.log(`  ${id.padEnd(40)} ${String(words(r)).padStart(4)} palabras, ${r.questions.length} preguntas  "${r.title}"`);
}
const missing = Object.keys(units).filter((u) => (countByUnit[u] || 0) < PER_UNIT);
if (missing.length) {
  console.log(`\nUnidades sin sus ${PER_UNIT} lecturas (${missing.length}):`);
  missing.forEach((u) => console.log(`  ${u} (${units[u].title}): ${countByUnit[u] || 0}`));
}
if (errors.length) {
  console.log(`\nErrores (${errors.length}):\n  ` + errors.join("\n  "));
  process.exit(1);
}

if (!WRITE) {
  console.log(`\nNo se escribió nada. Para subir: node contents/curriculum/readings.js ${LEVEL} --write`);
  process.exit(0);
}

const admin = require("firebase-admin");
admin.initializeApp({ credential: admin.credential.cert(require("../../service-account-key.json")) });
const db = admin.firestore();
const now = admin.firestore.FieldValue.serverTimestamp();

(async () => {
  const existing = await db.collection("readings").where("level", "==", LEVEL).get();
  const backup = Object.fromEntries(existing.docs.map((d) => [d.id, d.data()]));
  const backupPath = path.join(__dirname, `../backups/before-readings-${LEVEL.toLowerCase()}-${Date.now()}.json`);
  fs.writeFileSync(backupPath, JSON.stringify(backup, null, 1));
  console.log(`\nBackup guardado en ${backupPath}`);

  for (const [id, r] of Object.entries(readings)) {
    await db.collection("readings").doc(id).set({ ...r, updatedAt: now });
    console.log("✓ readings/" + id);
  }

  const stale = existing.docs.map((d) => d.id).filter((id) => !readings[id]);
  if (stale.length) console.log(`\nEn Firestore pero no en el archivo (no se borraron): ${stale.join(", ")}`);
  console.log("\nListo.");
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
