const { v, g, match, memory, fill, build, drag, cat, dialog } = require("../../helpers");

// Unidades "Gramática de Experiencias" y "El Mundo que nos Rodea"
// Guía A2 clases 2, 4, 7, 8, 10, 15, 18, 26, 29, 31, 36 y 38.
module.exports = {
  A2_past_events: {
    objectives: ["Contar eventos pasados en orden", "Usar el pasado perfecto", "Usar expresiones como by the time, already, before"],
    grammar: g(
      "Pasado perfecto",
      "Cuando cuentas dos cosas que pasaron, la que ocurrió primero va en pasado perfecto (had + participio) y la segunda en pasado simple.",
      ["had + participio = lo que pasó antes", "When I arrived, everyone had already eaten."],
      ["by the time = para cuando", "By the time the police arrived, the thief had escaped."],
      ["before / after", "I had finished my homework before dinner."],
      ["never ... before = nunca antes", "She had never seen snow before that trip."],
    ),
    vocab: [
      v("By the time", "Para cuando", "By the time I arrived, the movie had started"),
      v("Already", "Ya", "They had already eaten"),
      v("Never before", "Nunca antes", "I had never flown before"),
      v("Realize", "Darse cuenta", "She realized she had forgotten her keys"),
    ],
    fixVocab: (vocab) => {
      // "Before arrived" y "After finished" no son expresiones en inglés
      const fixes = {
        "Before arrived": { word: "Before", translation: "Antes (de)", examples: ["I had eaten before I arrived"] },
        "After finished": { word: "After", translation: "Después (de)", examples: ["After I had finished, I went home"] },
      };
      vocab.forEach((w) => fixes[w.word] && Object.assign(w, fixes[w.word]));
    },
    replace: {
      ex5_past_stories: dialog("Cuenta Historias Pasadas", "Le explicas a un amigo por qué llegaste tarde", [
        ["Friend", "Why were you late for the party?", "When I arrived, everyone had already eaten.", "When I arrived, everyone has already ate.", "Pasado perfecto: 'had eaten'."],
        ["Friend", "Oh no! Had you forgotten the time?", "No, I had missed the bus.", "No, I have miss the bus.", "'had' + participio."],
      ]),
    },
    add: [
      fill("Pasado perfecto", [
        "When we got to the station, the train ___ left. | had | has, have",
        "I had ___ my homework before dinner. | finished | finish, finishing",
        "She ___ never seen snow before that trip. | had | has, did",
        "By the time the police arrived, the thief ___ escaped. | had | has, was",
        "They ___ already eaten when I called. | had | have, did",
      ]),
      build("By the time", "🎬 Para cuando llegué, la película había empezado", "By the time I arrived the movie had started", ["has", "start"]),
      build("Darse cuenta", "🔑 Ella se dio cuenta de que había olvidado las llaves", "She realized she had forgotten her keys", ["has", "forget"]),
      cat("¿Qué pasó primero?", [
        ["Primero (had + participio)", ["the film had started", "she had left", "we had eaten"]],
        ["Después (pasado simple)", ["we arrived", "I called", "they came"]],
      ]),
      match("Expresiones de tiempo", [
        "By the time = Para cuando",
        "Already = Ya",
        "Never before = Nunca antes",
        "Realize = Darse cuenta",
        "Forget = Olvidar",
      ], "Une cada expresión con su traducción."),
    ],
  },

  A2_past_experiences: {
    objectives: ["Contar experiencias pasadas", "Formar el pasado simple de verbos regulares", "Usar ago, last y did"],
    grammar: g(
      "Pasado simple de verbos regulares",
      "Para acciones terminadas en un momento del pasado. Los verbos regulares agregan -ed y son iguales para todas las personas.",
      ["+ ed / + d", "visit → visited", "arrive → arrived"],
      ["consonante + y → -ied / vocal + y → -yed", "try → tried", "stay → stayed"],
      ["consonante-vocal-consonante → se duplica", "plan → planned", "stop → stopped"],
      ["Pregunta y negativo con did + verbo base", "Did you visit the museum?", "I didn't spend much money."],
      ["Tiempo: ago, last, yesterday, on + día", "two years ago", "last summer", "on Monday"],
    ),
    vocab: [
      v("Arrived", "Llegué / Llegó", "We arrived at the airport at 9"),
      v("Stayed", "Me quedé / Se quedó", "We stayed in a nice hotel"),
      v("Enjoyed", "Disfruté / Disfrutó", "She enjoyed the trip"),
      v("Walked", "Caminé / Caminó", "We walked for three hours"),
      v("Tried", "Probé / Intenté", "I tried the local food"),
      v("Planned", "Planeé / Planeó", "They planned the trip together"),
    ],
    replace: {
      // solo tenía 2 pares y cualquier combinación sujeto-acción era válida
      ex2_past_actions: drag("Verbo → pasado", [
        "Travel = Traveled",
        "Stay = Stayed",
        "Enjoy = Enjoyed",
        "Try = Tried",
        "Plan = Planned",
      ], "Arrastra cada verbo hasta su forma en pasado."),
    },
    add: [
      fill("Pasado simple regular", [
        "We ___ in a nice hotel. | stayed | stay, staied",
        "I ___ the local food. | tried | tryed, try",
        "She ___ the trip a lot. | enjoyed | enjoied, enjoys",
        "They ___ at the airport at 9 p.m. | arrived | arrive, arrivied",
        "Did you ___ the museum? | visit | visited, visits",
      ]),
      fill("Expresiones de tiempo", [
        "I traveled to Spain two years ___. | ago | last, before",
        "We visited Rome ___ summer. | last | ago, past",
        "She arrived ___ Monday. | on | in, at",
        "I didn't ___ much money. | spend | spent, spended",
      ]),
      match("Verbos en pasado", [
        "Arrived = Llegué",
        "Stayed = Me quedé",
        "Enjoyed = Disfruté",
        "Walked = Caminé",
        "Tried = Probé",
        "Planned = Planeé",
      ], "Une cada verbo con su traducción."),
      build("El hotel", "🏨 Nos quedamos en un hotel pequeño cerca de la playa", "We stayed in a small hotel near the beach", ["stay", "was"]),
      build("Pregunta", "❓ ¿Disfrutaste tus vacaciones?", "Did you enjoy your vacation", ["enjoyed", "do"]),
      build("Ago", "🇲🇽 Viajé a México hace dos años", "I traveled to Mexico two years ago", ["travel", "last"]),
      dialog("Simulación: El verano pasado", "Un amigo te pregunta por tu viaje", [
        ["Friend", "What did you do last summer?", "I traveled to Peru with my sister.", "I travel to Peru with my sister last summer.", "En pasado: 'traveled'."],
        ["Friend", "Did you visit Machu Picchu?", "Yes, I did. We walked for three hours!", "Yes, I visited. We walk for three hours!", "'Did you...?' se responde 'Yes, I did'."],
      ]),
    ],
  },

  A2_recent_past: {
    objectives: ["Hablar del pasado reciente", "Diferenciar presente perfecto y pasado simple", "Usar just, already, ever, since, for, ago"],
    grammar: g(
      "Presente perfecto vs. pasado simple",
      "El presente perfecto conecta el pasado con el presente y no dice cuándo. El pasado simple habla de un momento terminado y concreto.",
      ["Presente perfecto: have / has + participio", "I have just finished.", "Have you ever eaten sushi?"],
      ["Con just, already, yet, ever, never, recently", "She has already seen that movie."],
      ["since (desde) / for (durante)", "He has lived here since 2020.", "I have worked here for three years."],
      ["Pasado simple: con yesterday, last, ago, in 2019", "I saw that movie yesterday.", "We had dinner two hours ago."],
      ["Error típico", "❌ I have seen it yesterday.", "✅ I saw it yesterday."],
    ),
    vocab: [
      v("Recently", "Recientemente", "I have recently started a new job"),
      v("Ever", "Alguna vez", "Have you ever been to London?"),
      v("Since", "Desde", "She has worked here since 2019"),
      v("For", "Durante / Hace (con duración)", "I have lived here for five years"),
    ],
    replace: {
      // el original tenía dos destinos "have"
      ex2_present_vs_past: fill("Present Perfect vs Past Simple", [
        "I ___ just finished my homework. | have | has, did",
        "She ___ to Paris last year. | went | has gone, goes",
        "They have already ___ that movie. | seen | saw, see",
        "We ___ dinner two hours ago. | had | have had, have",
        "___ you ever eaten sushi? | Have | Did, Do",
      ]),
      // la tabla original tenía una sola respuesta por tiempo verbal, no una por pronombre: era imposible de completar
      ex5_verb_tenses: fill("Conjugación: Present Perfect vs Past Simple", [
        "I ___ that movie yesterday. | saw | have seen, see",
        "I ___ that movie three times. | have seen | saw, seen",
        "She ___ her keys. She can't find them. | has lost | loses, lose",
        "When ___ you arrive? | did | have, do",
        "He ___ here since 2020. | has lived | lived, lives",
      ]),
      ex4_recent_experiences: dialog("Hablando de Experiencias Recientes", "Te pones al día con un amigo", [
        ["Friend", "What have you done recently?", "I've just started a new job.", "I've just start a new job.", "'have' + participio."],
        ["Friend", "Great! What did you do last weekend?", "I went to the beach.", "I have gone to the beach last weekend.", "Con 'last weekend': pasado simple."],
      ]),
    },
    add: [
      match("Expresiones de tiempo", [
        "Recently = Recientemente",
        "Ever = Alguna vez",
        "Since = Desde",
        "For = Durante",
        "Just = Recién",
        "Ago = Hace",
      ], "Une cada expresión con su traducción."),
      build("Ever", "🇬🇧 ¿Alguna vez estuviste en Londres?", "Have you ever been to London", ["went", "did"]),
      build("Since", "🏢 Ella trabaja aquí desde 2019", "She has worked here since 2019", ["worked", "for"]),
      cat("¿Qué tiempo acompaña?", [
        ["Present perfect", ["just", "already", "ever", "since 2020"]],
        ["Past simple", ["yesterday", "last week", "two days ago", "in 2019"]],
      ], "Clasifica cada expresión según el tiempo verbal que pide."),
      drag("Pregunta → respuesta", [
        "Have you ever been to Japan? = No, never",
        "When did you arrive? = Yesterday morning",
        "Have you finished yet? = Yes, I've just finished",
        "How long have you lived here? = For three years",
      ], "Arrastra cada pregunta hasta su respuesta."),
    ],
  },

  A2_abilities_skills: {
    objectives: ["Hablar de habilidades presentes y pasadas", "Usar can, could y be able to", "Hablar de habilidades futuras"],
    grammar: g(
      "Can, could, be able to",
      "'Can' es la habilidad presente y 'could' la pasada. Para el futuro se usa 'will be able to', porque 'can' no tiene futuro.",
      ["can / can't = ahora", "She can speak French.", "I can't drive."],
      ["could / couldn't = en el pasado", "I could swim when I was five.", "He couldn't ride a bike as a child."],
      ["will be able to = en el futuro", "Next year I will be able to drive."],
      ["Siempre + verbo base", "✅ I can cook.", "❌ I can cooking."],
    ),
    vocab: [
      v("Skill", "Habilidad", "Cooking is a useful skill"),
      v("Learn", "Aprender", "I want to learn to drive"),
      v("Be able to", "Poder / Ser capaz de", "I will be able to drive next year"),
      v("Improve", "Mejorar", "I want to improve my English"),
    ],
    replace: {
      // el original tenía dos destinos "can"
      ex2_modal_verbs: fill("Can vs Could", [
        "I ___ swim when I was five. | could | can, cans",
        "She ___ speak French very well now. | can | could, cans",
        "Next year I will be ___ to drive. | able | can, could",
        "He learned at twelve. He ___ ride a bike as a small child. | couldn't | can't, mustn't",
        "___ you use Excel? | Can | Could to, Are",
      ]),
      ex4_skills_interview: dialog("Entrevista de Habilidades", "Te preguntan por tus habilidades en una entrevista", [
        ["Interviewer", "What languages can you speak?", "I can speak English and Spanish.", "I can speaking English and Spanish.", "'can' + verbo base."],
        ["Interviewer", "Could you speak English when you were a child?", "No, I couldn't. I learned it at university.", "No, I can't. I learned it at university.", "En pasado: 'couldn't'."],
      ]),
    },
    add: [
      match("Habilidades", [
        "Skill = Habilidad",
        "Learn = Aprender",
        "Be able to = Ser capaz de",
        "Improve = Mejorar",
        "Talent = Talento",
        "Practice = Practicar",
      ], "Une cada palabra con su traducción."),
      build("Pasado", "🏃 De joven podía correr muy rápido", "When I was young I could run very fast", ["can", "ran"]),
      build("Futuro", "🚗 Voy a poder manejar el año que viene", "I will be able to drive next year", ["can", "could"]),
      fill("Can, could, be able to", [
        "I'm learning. I ___ cook a little. | can | could, cans to",
        "My grandmother ___ dance very well when she was young. | could | can, cans",
        "I can't play now, but I will be able ___ play soon. | to | for, can",
        "She's an expert. She ___ use any computer program. | can | could, couldn't",
      ]),
      cat("¿Presente, pasado o futuro?", [
        ["Presente", ["I can swim", "She can't drive"]],
        ["Pasado", ["I could swim at five", "He couldn't read at three"]],
        ["Futuro", ["I'll be able to drive", "She'll be able to speak French"]],
      ]),
      memory("Memory: Habilidades", [
        "Swim = Nadar",
        "Drive = Manejar",
        "Cook = Cocinar",
        "Sing = Cantar",
        "Draw = Dibujar",
      ]),
    ],
  },

  A2_skills_talents: {
    objectives: ["Hablar de talentos actuales y pasados", "Usar can, could y may", "Expresar posibilidad futura con may"],
    grammar: g(
      "Can, could, may",
      "Los tres hablan de habilidades o posibilidades en distintos momentos.",
      ["can = sé hacerlo ahora", "She can sing beautifully."],
      ["could = sabía hacerlo antes", "I could play the piano when I was six."],
      ["may = quizás (posibilidad futura)", "I may join a dance class next month."],
      ["may = permiso formal", "May I play your guitar?"],
      ["Todos + verbo base", "✅ I may learn.", "❌ I may to learn."],
    ),
    vocab: [
      v("Gifted", "Talentoso/a", "She is a gifted musician"),
      v("Musical instrument", "Instrumento musical", "Can you play a musical instrument?"),
      v("Perform", "Actuar / Presentarse", "They perform every weekend"),
      v("Achieve", "Lograr", "You can achieve your goals"),
    ],
    replace: {
      ex4_talents_conversation: dialog("Conversación sobre Talentos", "Hablas de tus talentos con un amigo", [
        ["Friend", "What can you do very well?", "I can play the guitar very well.", "I can plays the guitar very well.", "'can' + verbo base."],
        ["Friend", "What new skill may you learn this year?", "I may learn to paint. I'm not sure yet.", "I may to learn to paint. I'm not sure yet.", "'may' + verbo base."],
      ]),
    },
    add: [
      fill("Can, could, may", [
        "I ___ play the piano when I was six. | could | can, may",
        "She's a professional. She ___ sing beautifully. | can | may, could to",
        "I ___ join a dance class next month. (quizás) | may | can to, could to",
        "___ I play your guitar? (permiso, formal) | May | Could to, Must",
        "We'll see. He ___ win the competition. (posibilidad) | may | can to, must",
      ]),
      match("Talentos", [
        "Gifted = Talentoso",
        "Musical instrument = Instrumento musical",
        "Perform = Actuar",
        "Train = Entrenar",
        "Achieve = Lograr",
      ], "Une cada palabra con su traducción."),
      build("Quizás", "🎤 Quizás tome clases de canto el año que viene", "I may take singing lessons next year", ["can", "to"]),
      build("Pasado", "💃 Mi hermana sabía bailar a los cuatro años", "My sister could dance when she was four", ["can", "danced"]),
      cat("¿Can, could o may?", [
        ["Can (presente)", ["I can sing now", "She can draw well"]],
        ["Could (pasado)", ["I could swim at five", "He could read at four"]],
        ["May (quizás)", ["I may learn to paint", "We may win"]],
      ]),
      drag("Talento → persona", [
        "Plays the violin = Musician",
        "Paints pictures = Painter",
        "Acts in films = Actor",
        "Writes novels = Writer",
      ], "Arrastra cada talento hasta la persona."),
    ],
  },

  A2_changes_transformations: {
    objectives: ["Describir cambios y transformaciones", "Usar el presente continuo para cambios en progreso", "Diferenciarlo del presente simple"],
    grammar: g(
      "Presente simple vs. continuo para hablar de cambios",
      "Un cambio que está ocurriendo ahora va en presente continuo, sobre todo con get, become, grow, change. Los hábitos y verdades generales van en presente simple.",
      ["Cambio en progreso: is / are getting / growing / changing", "My English is getting better.", "The city is changing very fast."],
      ["Hábitos y verdades: presente simple", "I study every morning.", "Water boils at 100°C."],
      ["get + comparativo = ponerse / volverse", "It's getting colder.", "Prices are getting more expensive."],
      ["Un cambio terminado: pasado simple", "She became a doctor in 2020."],
    ),
    vocab: [
      v("Grow", "Crecer", "My little brother is growing fast"),
      v("Become", "Volverse / Llegar a ser", "She became a doctor"),
      v("Get better", "Mejorar", "My English is getting better"),
      v("Different", "Diferente", "The city looks very different now"),
    ],
    replace: {
      // la tabla original tenía una sola respuesta por tiempo verbal, no una por pronombre: era imposible de completar
      ex2_change_verbs: fill("Presente Simple vs Continuo - Cambios", [
        "My English ___ better every day. | is getting | gets now, get",
        "The city ___ very fast these days. | is changing | changes now, change",
        "Water ___ at 100°C. | boils | is boiling, boil",
        "I usually ___ to work by bus, but this week I'm walking. | go | am going, goes",
        "Look! The leaves ___ color. | are changing | change, changes",
      ]),
      // una respuesta ("I usually evolve with practice") no era natural
      ex3_change_sentences: build("Describe Cambios", "📈 Mi inglés está mejorando cada día", "My English is getting better every day", ["gets", "are"]),
      ex4_change_conversation: dialog("Conversación sobre Cambios", "Un amigo te pregunta cómo vas con el inglés", [
        ["Friend", "How is your English these days?", "It's getting better every day.", "It gets better every day now at the moment.", "Cambio en progreso: presente continuo."],
        ["Friend", "Do you study every day?", "Yes, I study for an hour every morning.", "Yes, I am studying for an hour every morning always.", "Rutina: presente simple."],
      ]),
    },
    add: [
      match("Cambios", [
        "Grow = Crecer",
        "Become = Volverse",
        "Get better = Mejorar",
        "Get worse = Empeorar",
        "Different = Diferente",
      ], "Une cada expresión con su traducción."),
      fill("Cambios en progreso", [
        "Prices ___ more expensive every year. | are getting | get now, getting",
        "My little brother ___ so fast! | is growing | grows now, grow",
        "She ___ a doctor in 2020. | became | becomes, is becoming",
        "Take an umbrella. The weather ___ worse. | is getting | gets, get",
        "I ___ coffee every morning. | drink | am drinking always, drinks",
      ]),
      build("La ciudad", "🏙️ La ciudad está cambiando muy rápido", "The city is changing very fast", ["changes", "are"]),
      cat("¿Cambio en progreso o hábito?", [
        ["Cambio en progreso", ["is getting better", "are growing", "is changing"]],
        ["Hábito", ["usually walk", "always study", "never eat meat"]],
      ]),
      memory("Memory: Antes y ahora", [
        "Old = Viejo",
        "New = Nuevo",
        "Bigger = Más grande",
        "Modern = Moderno",
        "Traditional = Tradicional",
      ]),
    ],
  },

  A2_multiple_choice: {
    objectives: ["Hacer y responder preguntas de opción múltiple", "Usar comparativos", "Usar superlativos"],
    grammar: g(
      "Comparativos y superlativos en preguntas de opción",
      "Para elegir entre dos opciones se usa el comparativo; para destacar una entre muchas, el superlativo.",
      ["Pregunta: Which is + comparativo, A or B?", "Which is bigger, the Earth or the Moon?"],
      ["Respuesta con comparativo + than", "The Earth is bigger than the Moon."],
      ["Superlativo: the + -est / the most", "The Nile is the longest river.", "It's the most expensive option."],
      ["Irregulares", "good → better → the best", "bad → worse → the worst", "far → farther → the farthest"],
    ),
    vocab: [
      v("Smallest", "El / la más pequeño/a", "This is the smallest room"),
      v("Worse", "Peor", "My test was worse than yours"),
      v("Better", "Mejor", "This option is better"),
      v("Most expensive", "El / la más caro/a", "It's the most expensive car"),
      v("Option", "Opción", "Choose the correct option"),
    ],
    replace: {
      ex4_multiple_choice_dialogue: dialog("Simulación: Concurso de Preguntas", "Participas en un concurso de preguntas de opción múltiple", [
        ["Quiz host", "Which is bigger, the Earth or the Moon?", "The Earth is bigger than the Moon.", "The Moon is biggest than the Earth.", "La Tierra es más grande: 'bigger than'."],
        ["Quiz host", "What is the longest river in the world: the Nile or the Thames?", "The Nile is the longest river.", "The Thames is the longer river.", "Superlativo: 'the longest'."],
        ["Quiz host", "Which is more expensive, a bike or a car?", "A car is more expensive than a bike.", "A bike is expensiver than a car.", "Adjetivo largo: 'more expensive'."],
      ]),
    },
    add: [
      fill("Elige la opción correcta", [
        "Which is ___, a cat or an elephant? | bigger | biggest, more big",
        "Mount Everest is the ___ mountain in the world. | highest | higher, most high",
        "Which is ___, gold or silver? | more expensive | expensiver, most expensive",
        "This is the ___ day of my life! | best | better, goodest",
        "My test was ___ than yours. | worse | worst, badder",
      ]),
      match("Comparar", [
        "Smallest = El más pequeño",
        "Worse = Peor",
        "Better = Mejor",
        "Most expensive = El más caro",
        "Option = Opción",
        "Answer = Respuesta",
      ], "Une cada palabra con su traducción."),
      build("Pregunta de opción", "🏙️ ¿Qué ciudad es más grande, Londres o París?", "Which city is bigger London or Paris", ["biggest", "more"]),
      build("Superlativo", "📖 Este es el libro más interesante", "This is the most interesting book", ["more", "interestingest"]),
      drag("Adjetivo → comparativo / superlativo", [
        "Good = Better / The best",
        "Bad = Worse / The worst",
        "Far = Farther / The farthest",
        "Happy = Happier / The happiest",
        "Famous = More famous / The most famous",
      ], "Arrastra cada adjetivo hasta sus formas."),
      fill("Preguntas de cultura general", [
        "Which is the ___ planet? (el más grande) — Jupiter. | largest | larger, most large",
        "Which is ___, a plane or a train? | faster | fastest, more fast",
        "Antarctica is the ___ place on Earth. | coldest | colder, most cold",
        "For me, which is ___: English or Chinese? | easier | easiest, more easy",
      ]),
    ],
  },

  A2_past_simple_regular: {
    grammar: g(
      "Pasado simple: verbos regulares",
      "Se usa para acciones terminadas en el pasado. Los verbos regulares agregan -ed, igual para todas las personas.",
      ["Ortografía: + ed / + d / -ied / doble consonante", "play → played", "dance → danced", "study → studied", "stop → stopped"],
      ["Pronunciación de -ed: /t/, /d/, /ɪd/", "walked /t/", "played /d/", "visited /ɪd/ (con t o d antes)"],
      ["Negativo: did not (didn't) + verbo base", "I didn't watch TV yesterday."],
      ["Pregunta: Did + sujeto + verbo base?", "Did you watch the movie?", "Where did you go?"],
    ),
    add: [
      fill("Ortografía del pasado regular", [
        "plan → ___ | planned | planed, plannd",
        "cry → ___ | cried | cryed, craid",
        "stop → ___ | stopped | stoped, stopt",
        "dance → ___ | danced | danceed, dancd",
        "play → ___ | played | plaied, playd",
      ]),
    ],
  },

  A2_past_simple_irregular: {
    grammar: g(
      "Pasado simple: verbos irregulares",
      "Los irregulares no agregan -ed: cada uno tiene su forma en pasado, que hay que memorizar. En negativas y preguntas se usa did + verbo base.",
      ["Formas frecuentes", "go → went", "eat → ate", "see → saw", "have → had", "buy → bought", "take → took"],
      ["Afirmativo: igual para todas las personas", "I went / She went / They went"],
      ["Negativo: didn't + verbo base", "✅ I didn't go.", "❌ I didn't went."],
      ["Pregunta: Did + sujeto + verbo base?", "Did you see the new movie?", "What did you eat?"],
    ),
    add: [
      fill("Negativo y pregunta con irregulares", [
        "I didn't ___ to the party. | go | went, gone",
        "Did she ___ the email? | write | wrote, written",
        "We ___ a great time. | had | haved, have",
        "They ___ their grandparents last week. | saw | seen, seed",
        "He ___ his keys at home. | left | leaved, leaves",
      ]),
    ],
  },

  A2_places_directions: {
    objectives: ["Pedir y dar indicaciones", "Usar preposiciones de lugar", "Nombrar lugares de la ciudad"],
    grammar: g(
      "Preposiciones de lugar e indicaciones",
      "Las preposiciones dicen dónde está algo. Las indicaciones se dan con el verbo base (imperativo).",
      ["next to · opposite · between · behind · in front of · near", "The bank is next to the post office.", "The café is between the bank and the library."],
      ["opposite = enfrente (sin 'of')", "✅ It's opposite the bank.", "❌ It's opposite of the bank."],
      ["at the corner / on the left / on the right", "Turn right at the corner.", "It's on your left."],
      ["Indicaciones: verbo base", "Go straight.", "Turn left.", "Cross the street."],
      ["Preguntar", "How do I get to the station?", "Is it far from here?"],
    ),
    vocab: [
      v("Next to", "Al lado de", "The bank is next to the post office"),
      v("Opposite", "Enfrente de", "The hotel is opposite the museum"),
      v("Between", "Entre", "The café is between the bank and the library"),
      v("Corner", "Esquina", "Turn right at the corner"),
      v("Block", "Cuadra", "Go straight for two blocks"),
      v("Crossroads", "Cruce / Intersección", "Turn left at the crossroads"),
    ],
    replace: {
      // solo tenía 2 pares
      ex2_directions: drag("Dar y Seguir Direcciones", [
        "Turn left = Gira a la izquierda",
        "Go straight on = Sigue derecho",
        "Turn right = Gira a la derecha",
        "Cross the street = Cruza la calle",
        "At the corner = En la esquina",
      ], "Arrastra cada indicación hasta su traducción."),
      // el original empezaba con un turno del alumno
      ex3_ask_directions: dialog("Simulación: Preguntando Direcciones", "Un turista te pregunta cómo llegar a la estación", [
        ["Tourist", "Excuse me, where is the train station?", "Go straight for two blocks and turn left.", "Go straight for two blocks and turns left.", "Las indicaciones van con el verbo base."],
        ["Tourist", "Is it next to the bank?", "No, it's opposite the bank.", "No, it's opposite of the bank.", "'opposite' no lleva 'of'."],
        ["Tourist", "Thank you so much!", "You're welcome.", "You're welcome to.", "Se responde 'You're welcome'."],
      ]),
    },
    add: [
      match("Preposiciones y lugares", [
        "Next to = Al lado de",
        "Opposite = Enfrente de",
        "Between = Entre",
        "Corner = Esquina",
        "Block = Cuadra",
        "Crossroads = Cruce",
      ], "Une cada palabra con su traducción."),
      fill("¿Dónde está?", [
        "The bank is ___ to the post office. | next | behind, between",
        "The café is ___ the bank and the library. | between | opposite, near to",
        "The park is ___ the school. (detrás) | behind | in front, between",
        "The hotel is ___ the museum. (enfrente) | opposite | behind, under",
        "Turn right ___ the corner. | at | of, to",
      ]),
      build("Enfrente", "🏥 La farmacia está enfrente del hospital", "The pharmacy is opposite the hospital", ["of", "front"]),
      build("Indicación", "↪️ Sigue derecho y gira a la derecha en la esquina", "Go straight and turn right at the corner", ["turns", "in"]),
      build("Pregunta", "🚉 ¿Cómo llego a la estación?", "How do I get to the station", ["does", "going"]),
      cat("¿Preposición o indicación?", [
        ["Preposición", ["next to", "opposite", "between", "behind"]],
        ["Indicación", ["turn left", "go straight", "cross the street"]],
      ]),
      memory("Memory: Lugares", [
        "Library = Biblioteca",
        "Post office = Correo",
        "Pharmacy = Farmacia",
        "Museum = Museo",
        "Train station = Estación de tren",
      ]),
    ],
  },

  A2_weather_seasons: {
    objectives: ["Describir el clima y las estaciones", "Usar presente simple para el clima habitual", "Usar presente continuo para el clima de ahora"],
    grammar: g(
      "Presente simple vs. presente continuo para el clima",
      "El clima habitual de un lugar o estación va en presente simple. El clima de este momento, en presente continuo.",
      ["En general: presente simple", "It rains a lot in April.", "It snows in winter."],
      ["Ahora: presente continuo", "Take an umbrella! It's raining.", "Look! The sun is shining."],
      ["'It is' + adjetivo para describir", "It's hot in summer.", "It's very windy today."],
      ["Preguntar", "What's the weather like today?", "Does it rain a lot in your city?"],
    ),
    vocab: [
      v("Foggy", "Con niebla / Neblinoso", "It's very foggy this morning"),
      v("Storm", "Tormenta", "There's a big storm tonight"),
      v("Freezing", "Helado / Muy frío", "It's freezing outside"),
      v("Humid", "Húmedo", "Summer here is hot and humid"),
      v("Forecast", "Pronóstico", "The forecast says it will rain"),
    ],
    replace: {
      // la tabla original tenía una sola respuesta por tiempo verbal, no una por pronombre: era imposible de completar
      ex2_weather_verbs: fill("Verbos del Clima", [
        "It ___ a lot here in winter. (en general) | rains | is raining, rain",
        "Take an umbrella! It ___. (ahora) | is raining | rains, rain",
        "It usually ___ in December. | snows | is snowing, snow",
        "Look! The sun ___. | is shining | shines, shine",
        "It ___ very hot in summer here. | is | is being, be",
      ]),
    },
    add: [
      match("El clima", [
        "Foggy = Con niebla",
        "Storm = Tormenta",
        "Freezing = Helado",
        "Humid = Húmedo",
        "Forecast = Pronóstico",
        "Thunder = Trueno",
      ], "Une cada palabra con su traducción."),
      build("Ahora", "🏔️ Está nevando en las montañas ahora mismo", "It is snowing in the mountains right now", ["snows", "are"]),
      build("En general", "🌧️ Normalmente llueve mucho en abril", "It usually rains a lot in April", ["rain", "snows"]),
      cat("¿Ahora o en general?", [
        ["Ahora", ["It's raining now", "The wind is blowing", "It's getting cold"]],
        ["En general", ["It rains a lot in April", "It snows in winter", "It's hot in summer"]],
      ]),
      fill("Vocabulario del clima", [
        "I can't see the road. It's very ___. | foggy | sunny, humid",
        "The weather ___ says it will rain tomorrow. | forecast | storm, thunder",
        "It's -10°C. It's ___! | freezing | humid, warm",
        "There's a big ___ with thunder and lightning. | storm | fog, forecast",
      ]),
      dialog("Simulación: ¿Qué tiempo hace?", "Hablas por teléfono con un amigo de otra ciudad", [
        ["Friend", "What's the weather like there today?", "It's raining and it's very cold.", "It rains now and it's very cold.", "Ahora mismo: presente continuo."],
        ["Friend", "Does it rain a lot in your city?", "Yes, it usually rains a lot in autumn.", "Yes, it is usually raining a lot in autumn.", "En general: presente simple."],
      ]),
    ],
  },

  A2_nature_environment: {
    objectives: ["Hablar de la naturaleza y sus problemas", "Usar must y have to para obligaciones", "Usar mustn't y don't have to"],
    grammar: g(
      "Must / have to para cuidar el ambiente",
      "Los dos expresan obligación. En negativo cambian de significado.",
      ["must + verbo base", "We must recycle plastic."],
      ["have to / has to + verbo base", "You have to turn off the lights.", "Our school has to separate the trash."],
      ["mustn't = está prohibido", "You mustn't throw trash in the river."],
      ["don't have to = no es necesario", "It's sunny. We don't have to turn on the lights."],
    ),
    vocab: [
      v("Waste", "Desperdiciar / Residuos", "Don't waste water"),
      v("Protect", "Proteger", "We have to protect the forests"),
      v("Plastic", "Plástico", "We must use less plastic"),
      v("Planet", "Planeta", "We must take care of our planet"),
    ],
    replace: {
      // el original tenía dos destinos "must"
      ex1_environmental_rules: fill("Normas Ambientales: Must/Have to", [
        "We ___ recycle plastic. | must | must to, musts",
        "You ___ to turn off the lights. | have | must, has",
        "Our school has rules: we ___ to separate the trash. | have | has, must",
        "You ___ throw trash in the river! It's prohibited. | mustn't | don't have to, haven't",
        "It's sunny. We don't ___ to turn on the lights. | have | must, has",
      ]),
      ex4_eco_conversation: dialog("Conversación sobre Ecología", "Hablas con un amigo sobre cómo ayudar al planeta", [
        ["Friend", "What must we do to help the environment?", "We must recycle and use less plastic.", "We must to recycle and use less plastic.", "Después de 'must' no va 'to'."],
        ["Friend", "Do we have to save water too?", "Yes, we have to. Water is limited.", "Yes, we must to. Water is limited.", "Respuesta corta: 'we have to'."],
      ]),
    },
    add: [
      match("Medio ambiente", [
        "Waste = Desperdiciar",
        "Protect = Proteger",
        "Plastic = Plástico",
        "Planet = Planeta",
        "Endangered = En peligro de extinción",
        "Forest = Bosque",
      ], "Une cada palabra con su traducción."),
      build("Obligación", "🌳 Tenemos que proteger los bosques", "We have to protect the forests", ["must", "has"]),
      build("Prohibición", "🚱 No debes desperdiciar agua", "You mustn't waste water", ["don't", "wastes"]),
      cat("¿Obligación o prohibición?", [
        ["Must / have to", ["recycle", "save energy", "protect animals"]],
        ["Mustn't", ["throw trash in the street", "waste water", "cut down trees"]],
      ]),
      drag("Problema → solución", [
        "Air pollution = Use public transport",
        "Too much plastic = Use reusable bags",
        "Water shortage = Take shorter showers",
        "Too much trash = Recycle and reuse",
      ], "Arrastra cada problema hasta su solución."),
      memory("Memory: Naturaleza", [
        "Wildlife = Vida silvestre",
        "Ocean = Océano",
        "Climate = Clima",
        "Energy = Energía",
        "River = Río",
      ]),
    ],
  },

  A2_urban_rural_life: {
    objectives: ["Comparar la vida en la ciudad y en el campo", "Dar consejos con should y ought to", "Usar adjetivos para describir lugares"],
    grammar: g(
      "Should / ought to para aconsejar",
      "Los dos dan consejos. 'Ought to' es más formal y siempre lleva 'to'; 'should' nunca lo lleva.",
      ["should + verbo base", "You should move to a big city."],
      ["ought to + verbo base", "You ought to visit the countryside first."],
      ["Negativo: shouldn't", "You shouldn't live far from your work."],
      ["Comparar lugares", "The city is noisier than the countryside.", "Life in the city is more expensive."],
    ),
    vocab: [
      v("Traffic", "Tráfico", "There is a lot of traffic in the city"),
      v("Noisy", "Ruidoso/a", "My street is very noisy"),
      v("Peaceful", "Tranquilo/a / Apacible", "The countryside is peaceful"),
      v("Farm", "Granja", "My grandparents live on a farm"),
    ],
    replace: {
      ex4_lifestyle_discussion: dialog("Discusión sobre Estilo de Vida", "Un amigo no sabe dónde vivir", [
        ["Friend", "Where should I live for better job opportunities?", "You should move to a big city.", "You should to move to a big city.", "Después de 'should' no va 'to'."],
        ["Friend", "But the city is noisy. What about the countryside?", "You ought to visit it first. It's very peaceful.", "You ought visit it first. It's very peaceful.", "'ought' siempre lleva 'to'."],
      ]),
    },
    add: [
      fill("Ciudad y campo", [
        "There's a lot of traffic. The city is very ___. | noisy | peaceful, quiet",
        "The countryside is ___ and quiet. | peaceful | noisy, crowded",
        "You ___ to try living in the country. | ought | should, must",
        "You ___ live near your work. You'll save time. | should | ought, should to",
        "There are many cows on the ___. | farm | traffic, skyscraper",
      ]),
      match("Lugares", [
        "Traffic = Tráfico",
        "Noisy = Ruidoso",
        "Peaceful = Tranquilo",
        "Farm = Granja",
        "Crowded = Abarrotado",
        "Fresh air = Aire fresco",
      ], "Une cada palabra con su traducción."),
      build("Ought to", "🏡 Deberías mudarte a un lugar más tranquilo", "You ought to move to a quieter place", ["should", "moving"]),
      build("Comparar", "💸 La vida en la ciudad es más cara", "Life in the city is more expensive", ["most", "expensiver"]),
      cat("¿Ciudad o campo?", [
        ["Ciudad", ["skyscrapers", "traffic", "subway"]],
        ["Campo", ["farms", "fresh air", "cows"]],
      ]),
    ],
  },

  A2_environment_sustainability: {
    objectives: ["Hablar de sostenibilidad", "Dar consejos con should y ought to", "Conocer las tres R: reducir, reutilizar, reciclar"],
    grammar: g(
      "Should / ought to para hábitos sostenibles",
      "Para recomendar hábitos que cuidan el planeta se usa 'should' u 'ought to'.",
      ["should + verbo base", "We should recycle more."],
      ["ought to + verbo base", "We ought to turn off the lights when we leave."],
      ["shouldn't = no se recomienda", "We shouldn't waste food."],
      ["Pregunta: Should we...?", "Should we use more public transport?"],
    ),
    vocab: [
      v("Reuse", "Reutilizar", "You ought to reuse plastic bags"),
      v("Reduce", "Reducir", "We should reduce our waste"),
      v("Solar panel", "Panel solar", "Our house has solar panels"),
      v("Eco-friendly", "Ecológico", "This bag is eco-friendly"),
    ],
    replace: {
      // el original tenía dos destinos "should"
      ex2_environmental_advice: fill("Consejos Ambientales", [
        "We ___ recycle more. | should | should to, shoulds",
        "You ought ___ use less plastic. | to | for, at",
        "They ___ conserve energy. | should | ought, shoulds",
        "We ___ waste food. | shouldn't | should, ought",
        "___ we use more public transport? | Should | Ought, Do should",
      ]),
      ex4_eco_discussion: dialog("Discusión Ambiental", "Hablas con un amigo sobre hábitos sostenibles", [
        ["Friend", "What should we do to help the environment?", "We should recycle and reuse more things.", "We should recycling and reuse more things.", "'should' + verbo base."],
        ["Friend", "How can we save energy at home?", "We ought to turn off the lights when we leave.", "We ought turn off the lights when we leave.", "'ought' siempre lleva 'to'."],
      ]),
    },
    add: [
      match("Sostenibilidad", [
        "Reuse = Reutilizar",
        "Reduce = Reducir",
        "Solar panel = Panel solar",
        "Eco-friendly = Ecológico",
        "Carbon footprint = Huella de carbono",
      ], "Une cada palabra con su traducción."),
      build("Energía", "☀️ Deberíamos usar más energía renovable", "We should use more renewable energy", ["ought", "using"]),
      build("Reutilizar", "🛍️ Deberías reutilizar las bolsas de plástico", "You ought to reuse plastic bags", ["should", "reusing"]),
      cat("Las tres R", [
        ["Reduce", ["Use less water", "Buy less plastic"]],
        ["Reuse", ["Use cloth bags", "Refill bottles"]],
        ["Recycle", ["Separate paper", "Recycle glass"]],
      ], "Clasifica cada acción."),
      drag("Acción → beneficio", [
        "Solar panels = Clean energy",
        "Cycling to work = Less pollution",
        "Reusable bottles = Less plastic",
        "Turning off lights = Saving energy",
      ], "Arrastra cada acción hasta su beneficio."),
    ],
  },
};
