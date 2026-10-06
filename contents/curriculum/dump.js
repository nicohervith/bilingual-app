// Descarga modules, units y lessons de Firestore a contents/backups/firestore-dump-AAAA-MM-DD-HHMMSS.json.
// Solo lee. La hora en el nombre evita pisar un volcado anterior que un build ya usó.
// build.js y readings.js usan siempre el volcado más reciente.
//
//   node contents/curriculum/dump.js

const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

admin.initializeApp({ credential: admin.credential.cert(require("../../service-account-key.json")) });
const db = admin.firestore();

(async () => {
  const dump = {};
  for (const name of ["modules", "units", "lessons"]) {
    const snap = await db.collection(name).get();
    dump[name] = {};
    snap.forEach((doc) => (dump[name][doc.id] = doc.data()));
    console.log(`${name}: ${snap.size}`);
  }
  const file = path.join(__dirname, `../backups/firestore-dump-${new Date().toISOString().slice(0, 19).replace("T", "-").replace(/:/g, "")}.json`);
  fs.writeFileSync(file, JSON.stringify(dump, null, 1));
  console.log(`Guardado en ${file}`);
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
