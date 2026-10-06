// Constructor compacto para escribir lecturas.
//
// reading({
//   unitId: "unitA1_first_steps",
//   title: "Hello, I'm Sofia",        // título en inglés
//   titleEs: "Hola, soy Sofía",       // traducción del título
//   text: ["párrafo 1", "párrafo 2"],
//   glossary: ["live = vivir", ...],
//   questions: ["Pregunta? | correcta | incorrecta, incorrecta | explicación opcional", ...],
//   xpReward: 10,                      // opcional
// })
//
// Para verdadero/falso: "Afirmación. | True | False | explicación".
// El id, el nivel, el orden y el título de la unidad los completa readings.js.

// posición estable pero variada para la respuesta correcta, según el texto de la pregunta
const hash = (str) => [...str].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

const pair = (p) => p.split(" = ").map((s) => s.trim());

const reading = ({ unitId, title, titleEs, text, glossary = [], questions, xpReward = 10 }) => ({
  unitId,
  title,
  titleEs,
  text,
  glossary: glossary.map(pair).map(([word, translation]) => ({ word, translation })),
  questions: questions.map((q) => {
    const [question, answer, rest, explanation] = q.split(" | ").map((s) => s.trim());
    const wrong = rest.split(",").map((s) => s.trim());
    // en verdadero/falso se mantiene el orden True, False; en el resto la correcta rota de posición
    const isTrueFalse = [answer, ...wrong].sort().join() === "False,True";
    const options = isTrueFalse ? ["True", "False"] : [...wrong];
    if (!isTrueFalse) options.splice(hash(question) % (wrong.length + 1), 0, answer);
    return { question, options, answer: options.indexOf(answer), ...(explanation ? { explanation } : {}) };
  }),
  xpReward,
});

module.exports = { reading };
