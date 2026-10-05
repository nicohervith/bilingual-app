const { v, g, match, memory, fill, build, drag, cat, dialog } = require("../../helpers");

// Unidades "Viajes y Ciudad", "Repaso final" y "Futuro y Metas"
// Guía A1 clases 9, 10, 12, 14, 15, 22, 23, 26, 28, 29 y 30.
// Lecciones nuevas: naturaleza y medio ambiente, eventos y celebraciones.

// los ejercicios de pasado traían la tabla sin tiempo verbal y la app mostraba la pestaña "Present"
const asPastTense = (exercise) => {
  const c = exercise.config;
  c.tenses = ["Past"];
  c.correct = { Past: c.correct };
};

module.exports = {
  A1_travel_and_transport: {
    grammar: g(
      "Presente continuo para viajes + by / take",
      "El presente continuo describe lo que estás haciendo ahora en un viaje. El medio de transporte se dice con 'by' o con 'take'.",
      ["to be + verbo-ing", "I am taking a taxi.", "She is waiting at the bus stop."],
      ["go / travel + by + transporte (sin artículo)", "I go by bus.", "He travels by plane."],
      ["take + a / the + transporte", "We take a taxi.", "They take the train."],
      ["A pie es distinto: on foot", "I go to school on foot."],
      ["Destino con 'to'", "I am going to the airport."],
    ),
    replace: {
      // el original pedía escribir "go by" o "take a" sin contexto: las dos formas valen para casi todos
      ex5_verbs_transport: fill("Travel Verbs: by / take", [
        "I go to work ___ bus. | by | in, with",
        "We ___ a taxi to the airport. | take | go, make",
        "She goes to school ___ bicycle. | by | at, with",
        "They ___ the train every day. | take | make, do",
        "He travels ___ plane. | by | in, of",
      ]),
    },
    add: [
      fill("Está pasando ahora", [
        "I ___ taking a taxi now. | am | is, are",
        "She is ___ at the bus stop. | waiting | wait, waits",
        "We ___ going to the airport. | are | is, am",
        "They are ___ tickets. | buying | buy, buys",
        "The train ___ leaving now. | is | are, am",
      ]),
      build("En la parada", "🚏 Ella está esperando en la parada de autobús", "She is waiting at the bus stop", ["wait", "are"]),
      build("Al aeropuerto", "✈️ Estamos yendo al aeropuerto en taxi", "We are going to the airport by taxi", ["is", "in"]),
      dialog("Simulación: En el aeropuerto", "Haces el check-in antes de tu vuelo", [
        ["Agent", "Good morning. Where are you traveling today?", "I am traveling to London.", "I traveling to London.", "Falta 'am'."],
        ["Agent", "Can I see your passport and ticket?", "Yes, here you are.", "Yes, I am.", "Al entregar algo se dice 'Here you are'."],
        ["Agent", "Thank you. Are you taking a suitcase?", "Yes, I am taking one suitcase.", "Yes, I am take one suitcase.", "Presente continuo: 'am taking'."],
      ]),
    ],
  },

  A1_directions: {
    grammar: g(
      "Preposiciones de lugar e indicaciones",
      "Las preposiciones de lugar dicen dónde está algo. Para dar indicaciones se usa el verbo solo, sin sujeto (imperativo).",
      ["next to = al lado de", "The bank is next to the post office."],
      ["between = entre / behind = detrás de", "The pharmacy is between the bank and the park.", "The park is behind the school."],
      ["in front of = delante de / opposite = enfrente de", "The bus stop is in front of the hospital."],
      ["Indicaciones: verbo sin sujeto", "Go straight.", "Turn left.", "Turn right at the corner."],
      ["Preguntar", "Where is the bank?", "How do I get to the park?"],
    ),
    vocab: [
      v("Supermarket", "Supermercado", "The supermarket is next to the bank"),
      v("Pharmacy", "Farmacia", "Where is the pharmacy?"),
      v("Park", "Parque", "The park is behind the school"),
      v("Next to", "Al lado de", "The bank is next to the park"),
      v("Behind", "Detrás de", "The garden is behind the house"),
      v("In front of", "Delante de", "The bus stop is in front of the hospital"),
      v("Turn left", "Girar a la izquierda", "Turn left at the corner"),
    ],
    fix: (exs) => {
      exs.find((e) => e.id === "ex1_matching").config.pairs.push(
        { from: "Turn right", to: "Gira a la derecha" },
        { from: "Cross the street", to: "Cruza la calle" },
      );
    },
    add: [
      memory("Memory: Lugares de la ciudad", [
        "Supermarket = Supermercado",
        "Pharmacy = Farmacia",
        "Park = Parque",
        "Post office = Correo",
        "Library = Biblioteca",
      ]),
      match("Preposiciones de lugar", [
        "Next to = Al lado de",
        "Behind = Detrás de",
        "In front of = Delante de",
        "Between = Entre",
        "Opposite = Enfrente de",
        "Near = Cerca de",
      ], "Une cada preposición con su traducción."),
      fill("¿Dónde está?", [
        "The bank is next ___ the post office. | to | of, at",
        "The pharmacy is ___ the bank and the park. | between | next, in",
        "The park is in front ___ the school. | of | to, at",
        "Turn ___ at the corner. | left | straight, between",
        "Go ___ for two blocks. | straight | behind, next",
      ]),
      build("Ubicación", "🏦 El banco está al lado del supermercado", "The bank is next to the supermarket", ["of", "at"]),
      build("Indicación", "↩️ Gira a la izquierda en la esquina", "Turn left at the corner", ["to", "in"]),
      build("Pregunta", "❓ ¿Dónde está la farmacia?", "Where is the pharmacy", ["are", "do"]),
      drag("Pregunta y respuesta", [
        "Where is the bank? = It is next to the park",
        "Is it far? = No, it is near",
        "How do I get to the park? = Go straight and turn left",
        "Thank you! = You're welcome",
      ], "Arrastra cada pregunta hasta su respuesta."),
      dialog("Simulación: Un turista perdido", "Un turista te pide indicaciones en la calle", [
        ["Tourist", "Excuse me, where is the supermarket?", "It is next to the bank.", "It is next the bank.", "Se dice 'next to'."],
        ["Tourist", "How do I get there?", "Go straight and turn right at the corner.", "Goes straight and turns right at the corner.", "Las indicaciones van sin -s."],
        ["Tourist", "Thank you very much!", "You're welcome.", "Yes, please.", "Te agradecen: 'You're welcome'."],
      ]),
    ],
  },

  A1_weather_and_seasons: {
    grammar: g(
      "Adjetivos comparativos",
      "Sirven para comparar dos cosas. La forma depende del largo del adjetivo, y siempre va seguida de 'than'.",
      ["Adjetivos cortos: + er + than", "cold → colder than", "warm → warmer than"],
      ["Consonante-vocal-consonante: se duplica la última", "hot → hotter", "big → bigger"],
      ["Terminados en -y: -ier", "sunny → sunnier", "windy → windier"],
      ["Adjetivos largos: more + adjetivo + than", "more beautiful than", "more expensive than"],
      ["Irregulares", "good → better", "bad → worse"],
      ["Hablar del clima: It is + adjetivo", "It is sunny today.", "What is the weather like?"],
    ),
    fixVocab: (vocab) => {
      const hot = vocab.find((w) => w.word === "Hot");
      if (hot) hot.translation = "Caluroso / Caliente";
    },
    fix: (exs) => {
      const comparatives = exs.find((e) => e.id === "weather_ex10_comparatives");
      comparatives.config.pairs.forEach((p) => {
        if (p.to === "sunni er") p.to = "sunnier";
      });
    },
    add: [
      fill("Comparativos", [
        "Winter is ___ than summer. | colder | cold, more cold",
        "Today is ___ than yesterday. | hotter | hot, more hot",
        "Spring is ___ than winter. | warmer | warm, more warm",
        "This umbrella is ___ than that one. | bigger | big, more big",
        "Rainy days are ___ than sunny days. (malo) | worse | badder, more bad",
      ]),
      build("Compara estaciones", "☀️ El verano es más caluroso que el invierno", "Summer is hotter than winter", ["hot", "more"]),
    ],
  },

  A1_nature_environment: {
    create: { title: "Nature and Environment", unit: "unitA1_travel_city", after: "A1_weather_and_seasons", xp: 100, tags: ["nature", "environment", "state_verbs"] },
    objectives: ["Nombrar elementos de la naturaleza", "Usar verbos de estado en presente simple", "Hablar de cómo cuidar el medio ambiente"],
    grammar: g(
      "Presente simple: verbos de estado",
      "Los verbos de estado expresan gustos, necesidades, conocimiento o percepción. No son acciones, por eso van en presente simple y no en continuo.",
      ["Gustos: like, love, hate", "I love nature.", "She likes the beach."],
      ["Necesidad y deseo: need, want", "Plants need water.", "We want to protect the forest."],
      ["Conocimiento y percepción: know, see, hear", "I know this river.", "I see a bird in the tree."],
      ["No se usan con -ing", "✅ I love nature.", "❌ I am loving nature."],
      ["Con he / she / it llevan -s", "She loves animals.", "A tree needs sun."],
    ),
    vocab: [
      v("Tree", "Árbol", "There is a big tree in the park"),
      v("Flower", "Flor", "This flower is beautiful"),
      v("River", "Río", "Fish live in the river"),
      v("Mountain", "Montaña", "The mountain is very high"),
      v("Forest", "Bosque", "There are many trees in the forest"),
      v("Beach", "Playa", "We swim at the beach"),
      v("Sea", "Mar", "The sea is blue"),
      v("Lake", "Lago", "The lake is near my house"),
      v("Sky", "Cielo", "Birds fly in the sky"),
      v("Recycle", "Reciclar", "We recycle paper and plastic"),
    ],
    add: [
      match("La naturaleza", [
        "Tree = Árbol",
        "Flower = Flor",
        "River = Río",
        "Mountain = Montaña",
        "Forest = Bosque",
        "Beach = Playa",
      ], "Une cada palabra con su traducción."),
      memory("Memory: Paisajes", [
        "Sea = Mar",
        "Lake = Lago",
        "Sky = Cielo",
        "Island = Isla",
        "Desert = Desierto",
      ]),
      cat("¿Agua o tierra?", [
        ["Agua", ["River", "Lake", "Sea"]],
        ["Tierra", ["Mountain", "Forest", "Desert"]],
      ]),
      fill("Verbos de estado", [
        "I ___ nature. | love | am loving, loves",
        "Plants ___ water and sun. | need | are needing, needs",
        "She ___ the names of all the trees. | knows | is knowing, know",
        "I ___ a bird in the tree. | see | am seeing, sees",
        "We ___ to protect the forest. | want | are wanting, wants",
      ]),
      fill("¿Dónde?", [
        "Fish live in the ___. | sea | sky, forest",
        "Birds fly in the ___. | sky | river, lake",
        "There are many trees in the ___. | forest | beach, sea",
        "We swim at the ___. | beach | mountain, sky",
        "The ___ is very high. | mountain | river, flower",
      ]),
      build("Lo que le gusta", "🌲 A ella le encanta caminar en el bosque", "She loves walking in the forest", ["love", "is"]),
      build("Lo que necesitan", "🌱 Las plantas necesitan agua y sol", "Plants need water and sun", ["needs", "are"]),
      build("Lo que queremos", "🌍 Queremos proteger el medio ambiente", "We want to protect the environment", ["wants", "are"]),
      drag("Cuidar el planeta", [
        "Paper and plastic = Recycle them",
        "Water = Don't waste it",
        "Trees = Plant them",
        "Trash = Put it in the bin",
        "Short trips = Walk or use a bicycle",
      ], "Arrastra cada cosa hasta la forma de cuidarla."),
      cat("¿Ayuda o daña?", [
        ["Ayuda al planeta", ["Recycle", "Plant trees", "Save water"]],
        ["Daña al planeta", ["Throw trash", "Waste water", "Cut down forests"]],
      ]),
      dialog("Simulación: En el parque nacional", "Un guía te recibe en un parque nacional", [
        ["Guide", "Welcome to the national park! Do you like nature?", "Yes, I love nature.", "Yes, I am loving nature.", "'Love' es verbo de estado: presente simple."],
        ["Guide", "Look at the river. What do you see?", "I see many fish and a big tree.", "I am see many fish and a big tree.", "Se dice 'I see', sin 'am'."],
        ["Guide", "Please remember: we need to protect this place.", "Of course. I want to keep it clean.", "Of course. I am wanting to keep it clean.", "'Want' no va en continuo."],
      ]),
    ],
  },

  A1_past_experiences: {
    objectives: ["Hablar de acciones terminadas", "Formar el pasado de verbos regulares", "Usar expresiones de tiempo pasado"],
    grammar: g(
      "Pasado simple: verbos regulares",
      "Se usa para acciones que ya terminaron. En los verbos regulares se agrega -ed, y es igual para todas las personas.",
      ["Verbo + ed", "walk → walked", "watch → watched", "play → played"],
      ["Si termina en -e: solo + d", "live → lived", "dance → danced"],
      ["Consonante + y: -ied", "study → studied", "try → tried"],
      ["Igual para todas las personas", "I walked. / She walked. / They walked."],
      ["Negativo: didn't + verbo base", "I didn't watch TV.", "She didn't work yesterday."],
      ["Expresiones de tiempo", "yesterday", "last night", "last week", "last year"],
    ),
    vocab: [
      v("Walked", "Caminé", "I walked to school yesterday"),
      v("Watched", "Miré / Vi", "We watched a movie last night"),
      v("Played", "Jugué", "She played soccer last Sunday"),
      v("Visited", "Visité", "I visited my grandparents"),
      v("Cooked", "Cociné", "They cooked dinner last night"),
      v("Studied", "Estudié", "He studied for the exam"),
      v("Yesterday", "Ayer", "I worked yesterday"),
    ],
    fix: (exs) => asPastTense(exs.find((e) => e.id === "ex1_past_verbs")),
    add: [
      match("Verbos en pasado", [
        "Walked = Caminé",
        "Watched = Miré",
        "Played = Jugué",
        "Visited = Visité",
        "Cooked = Cociné",
        "Studied = Estudié",
      ], "Une cada verbo en pasado con su traducción."),
      fill("Completa en pasado", [
        "I ___ a movie yesterday. | watched | watch, watching",
        "She ___ soccer last Sunday. | played | plays, play",
        "We ___ our grandparents last week. | visited | visit, visits",
        "He ___ for the exam. | studied | studyed, studies",
        "They ___ dinner last night. | cooked | cook, cooking",
      ]),
      fill("Negativo: didn't", [
        "I ___ work yesterday. | didn't | don't, wasn't",
        "She didn't ___ TV last night. | watch | watched, watches",
        "We ___ travel last year. | didn't | doesn't, aren't",
        "He didn't ___ the guitar. | play | played, plays",
      ]),
      build("La semana pasada", "👨‍👩‍👧 Ella visitó a su familia la semana pasada", "She visited her family last week", ["visit", "is"]),
      build("Ayer", "🎾 Jugamos al tenis ayer", "We played tennis yesterday", ["play", "are"]),
      build("Negativo", "📺 No miré televisión anoche", "I didn't watch TV last night", ["watched", "don't"]),
      cat("¿Cómo se forma el pasado?", [
        ["+ ed", ["walked", "played", "watched"]],
        ["+ d", ["lived", "danced", "liked"]],
        ["- ied", ["studied", "tried", "cried"]],
      ], "Clasifica cada verbo según cómo forma el pasado."),
      drag("De presente a pasado", [
        "I walk = I walked",
        "I study = I studied",
        "I live = I lived",
        "I cook = I cooked",
        "I travel = I traveled",
      ], "Arrastra cada oración hasta su forma en pasado."),
    ],
  },

  A1_past_experiences_2: {
    objectives: ["Reconocer verbos irregulares en pasado", "Usar was / were", "Preguntar con 'Did you...?'"],
    grammar: g(
      "Pasado simple: verbos irregulares",
      "Los verbos irregulares no llevan -ed: cada uno tiene su propia forma y hay que memorizarla. Es igual para todas las personas.",
      ["Formas irregulares frecuentes", "go → went", "eat → ate", "see → saw", "have → had", "buy → bought"],
      ["to be: was (I, he, she, it) / were (you, we, they)", "I was in Paris.", "They were happy."],
      ["Negativo: didn't + verbo base", "✅ I didn't go.", "❌ I didn't went."],
      ["Pregunta: Did + sujeto + verbo base?", "Did you see the movie? — Yes, I did. / No, I didn't."],
    ),
    vocab: [
      v("Saw", "Vi", "She saw a great movie"),
      v("Had", "Tuve", "We had a good time"),
      v("Bought", "Compré", "They bought a new car"),
      v("Made", "Hice / Preparé", "My mother made a cake"),
      v("Took", "Tomé / Saqué", "I took many photos"),
      v("Was / Were", "Fui / Estuve", "I was in Paris last year"),
    ],
    fix: (exs) => asPastTense(exs.find((e) => e.id === "ex2_past_conjugation")),
    add: [
      memory("Memory: Presente → pasado", [
        "Go = Went",
        "See = Saw",
        "Eat = Ate",
        "Have = Had",
        "Buy = Bought",
        "Make = Made",
      ], "Encuentra cada verbo con su pasado."),
      fill("Verbos irregulares", [
        "I ___ to the beach last summer. | went | go, goed",
        "We ___ pizza yesterday. | ate | eat, eated",
        "She ___ a great movie. | saw | see, seed",
        "They ___ a new car. | bought | buy, buyed",
        "He ___ a good time. | had | have, haved",
      ]),
      fill("¿Was o were?", [
        "I ___ in Paris last year. | was | were, did",
        "They ___ very happy. | were | was, did",
        "The trip ___ amazing. | was | were, went",
        "We ___ at the beach. | were | was, are",
      ]),
      fill("Negativo y pregunta", [
        "I ___ go to school yesterday. | didn't | don't, wasn't",
        "___ you see the movie? | Did | Do, Were",
        "She didn't ___ breakfast. | eat | ate, eats",
        "Did they ___ to the party? | go | went, goes",
      ]),
      build("El verano pasado", "🗼 Fui a París el verano pasado", "I went to Paris last summer", ["go", "was"]),
      build("Ayer", "🍕 Comimos pizza ayer", "We ate pizza yesterday", ["eat", "were"]),
      build("Pregunta", "🎬 ¿Viste la película?", "Did you see the movie", ["saw", "do"]),
      dialog("Simulación: Las vacaciones", "Un amigo te pregunta por tus vacaciones", [
        ["Friend", "Where did you go on vacation?", "I went to the beach.", "I goed to the beach.", "'Go' es irregular: 'went'."],
        ["Friend", "Nice! What did you eat there?", "I ate a lot of fish.", "I eated a lot of fish.", "'Eat' → 'ate'."],
        ["Friend", "Did you have a good time?", "Yes, I did. It was amazing.", "Yes, I had. It were amazing.", "'Did you...?' → 'Yes, I did'. Y 'It was'."],
      ]),
    ],
  },

  A1_events_celebrations: {
    create: { title: "Events and Celebrations", unit: "unitA1_final_test", after: "A1_past_experiences_2", xp: 100, tags: ["celebrations", "events", "past_simple_irregular"] },
    objectives: ["Nombrar festividades y eventos", "Contar una celebración en pasado", "Usar verbos irregulares frecuentes"],
    grammar: g(
      "Pasado simple irregular para contar celebraciones",
      "Para contar cómo fue una fiesta se usan verbos irregulares en pasado y 'was / were' para describirla.",
      ["Verbos de fiesta", "have → had", "come → came", "give → gave", "get → got", "sing → sang", "make → made"],
      ["Describir: was / were", "The party was great.", "The guests were happy."],
      ["on + día o fecha", "My birthday is on May 5th.", "The party was on Saturday."],
      ["in + mes o año / at + festividad", "The wedding was in June.", "We eat together at Christmas."],
      ["Pregunta y negativo con did / didn't + verbo base", "Did you get any gifts?", "I didn't go to the wedding."],
    ),
    vocab: [
      v("Birthday", "Cumpleaños", "My birthday is on May 5th"),
      v("Party", "Fiesta", "We had a party last Saturday"),
      v("Wedding", "Boda / Casamiento", "The wedding was in June"),
      v("Christmas", "Navidad", "We eat together at Christmas"),
      v("New Year", "Año Nuevo", "Happy New Year!"),
      v("Gift", "Regalo", "She gave me a beautiful gift"),
      v("Cake", "Torta / Pastel", "My mother made a chocolate cake"),
      v("Holiday", "Feriado / Día festivo", "Christmas is a holiday"),
      v("Celebrate", "Celebrar", "We celebrate New Year with our family"),
      v("Guest", "Invitado/a", "The guests were happy"),
    ],
    add: [
      match("Celebraciones", [
        "Birthday = Cumpleaños",
        "Party = Fiesta",
        "Wedding = Boda",
        "Christmas = Navidad",
        "Gift = Regalo",
        "Cake = Torta",
      ], "Une cada palabra con su traducción."),
      memory("Memory: En la fiesta", [
        "New Year = Año Nuevo",
        "Holiday = Feriado",
        "Guest = Invitado",
        "Candle = Vela",
        "Fireworks = Fuegos artificiales",
      ]),
      match("Presente → pasado", [
        "Give = Gave",
        "Get = Got",
        "Come = Came",
        "Sing = Sang",
        "Make = Made",
        "Have = Had",
      ], "Une cada verbo con su forma en pasado."),
      fill("Cuenta la fiesta", [
        "We ___ a party last Saturday. | had | have, haved",
        "My friends ___ to my birthday. | came | come, comed",
        "She ___ me a beautiful gift. | gave | give, gived",
        "I ___ a lot of presents. | got | get, getted",
        "We ___ 'Happy Birthday'. | sang | sing, singed",
      ]),
      fill("Was / were y preposiciones", [
        "The party ___ great. | was | were, did",
        "The guests ___ happy. | were | was, did",
        "My birthday is ___ May 5th. | on | in, at",
        "We eat together ___ Christmas. | at | on, of",
        "The wedding was ___ June. | in | on, at",
      ]),
      build("La fiesta", "🎉 Hicimos una fiesta el sábado pasado", "We had a party last Saturday", ["have", "was"]),
      build("La torta", "🎂 Mi mamá hizo una torta de chocolate", "My mother made a chocolate cake", ["make", "were"]),
      build("Pregunta", "💒 ¿Fuiste a la boda?", "Did you go to the wedding", ["went", "do"]),
      drag("¿Qué se hace?", [
        "Birthday = Blow out the candles",
        "Christmas = Give gifts to the family",
        "New Year = Watch the fireworks",
        "Wedding = Two people get married",
      ], "Arrastra cada celebración hasta lo que se hace ese día."),
      cat("¿Presente o pasado?", [
        ["Presente", ["have", "go", "give", "come"]],
        ["Pasado", ["had", "went", "gave", "came"]],
      ]),
      dialog("Simulación: Después del cumpleaños", "Un amigo te pregunta por tu fiesta de cumpleaños", [
        ["Friend", "How was your birthday party?", "It was great! Many friends came.", "It were great! Many friends comed.", "'It was' y 'came'."],
        ["Friend", "Did you get any gifts?", "Yes, I did. I got a new phone.", "Yes, I got. I getted a new phone.", "'Yes, I did' y 'got'."],
        ["Friend", "Wow! Did your mother make a cake?", "Yes, she made a chocolate cake.", "Yes, she maked a chocolate cake.", "'Make' → 'made'."],
      ]),
    ],
  },

  A1_MEGA_FINAL_EXAM: {
    objectives: ["Repasar todos los temas del nivel A1", "Comprobar comprensión auditiva, gramática y vocabulario", "Prepararse para el nivel A2"],
    grammar: g(
      "Repaso general del nivel A1",
      "Este examen recorre los tiempos verbales y estructuras de todo el nivel. Repasa este resumen antes de empezar.",
      ["Presente simple (hábitos)", "I usually study English in the morning.", "She works in a hospital."],
      ["Presente continuo (ahora)", "I am taking the bus to the airport."],
      ["Pasado simple (acciones terminadas)", "I worked yesterday. (regular)", "I went to Paris. (irregular)"],
      ["Futuro: going to (planes) / will (decisiones y predicciones)", "I am going to speak fluent English.", "I will be a great doctor."],
      ["Can (habilidad)", "I can play the guitar."],
      ["Comparativos", "Today is hotter than yesterday."],
      ["Demostrativos y cuantificadores", "Those houses are very big.", "How much is this shirt?"],
    ),
    vocab: [
      v("Review", "Repaso", "This is a review of the A1 level"),
      v("Exam", "Examen", "I have an exam today"),
      v("Level", "Nivel", "I am finishing the A1 level"),
      v("Certificate", "Certificado", "I got my certificate"),
      v("Practice", "Práctica", "Practice every day"),
      v("Congratulations", "Felicitaciones", "Congratulations! You passed the exam"),
    ],
    fixVocab: (vocab) => {
      const examples = { Success: "Hard work is the key to success", Achievement: "Finishing the A1 level is a great achievement" };
      vocab.forEach((w) => {
        if (examples[w.word]) w.examples = [examples[w.word]];
      });
    },
    replace: {
      ex7_directions: dialog("Direcciones y Ciudad (Clase 9)", "Un turista te pide indicaciones para llegar al supermercado", [
        ["Tourist", "Excuse me, where is the supermarket?", "It is next to the bank.", "I am a student.", "Te preguntan por un lugar."],
        ["Tourist", "How do I get there?", "Go straight for two blocks.", "I like food.", "Da una indicación."],
      ]),
      ex13_health: dialog("Salud y Síntomas (Clase 17)", "Una enfermera te atiende en la clínica", [
        ["Nurse", "How do you feel today?", "I have a fever.", "I am 20 years old.", "Te preguntan por tu salud."],
      ]),
    },
    fix: (exs) => {
      // el banco incluye "next year": la oración completa también debe aceptarse
      exs.find((e) => e.id === "ex20_goals").config.correctAnswers.push("I am going to speak fluent English next year");
    },
  },

  A1_future_plans: {
    grammar: g(
      "Futuro con 'going to'",
      "'Going to' se usa para planes e intenciones que ya decidiste. Se forma con 'to be' + going to + verbo base.",
      ["am / is / are + going to + verbo", "I am going to travel.", "She is going to read a book.", "They are going to play soccer."],
      ["Negativo: to be + not + going to", "I am not going to watch TV.", "He isn't going to come."],
      ["Pregunta: to be + sujeto + going to...?", "Are you going to buy groceries? — Yes, I am. / No, I'm not."],
      ["Expresiones de tiempo futuro", "tomorrow", "tonight", "next week", "next summer"],
    ),
    fixVocab: (vocab) => {
      // "Watch a movie" estaba dos veces: una con imagen y sin ejemplo, otra con ejemplo y sin imagen
      const first = vocab.findIndex((w) => w.word === "Watch a movie");
      const second = vocab.findIndex((w, i) => i > first && w.word === "Watch a movie");
      if (first >= 0 && second >= 0) {
        vocab[first].examples = vocab[second].examples;
        vocab.splice(second, 1);
      }
    },
    add: [
      fill("Going to", [
        "I ___ going to travel next summer. | am | is, are",
        "She is going to ___ a book. | read | reads, reading",
        "We ___ going to clean the house. | are | is, am",
        "They are ___ to play soccer. | going | go, goes",
        "He ___ going to visit his family. | is | are, am",
      ]),
      fill("Negativo y pregunta", [
        "I am ___ going to watch TV tonight. | not | no, don't",
        "___ you going to buy groceries? | Are | Do, Is",
        "She ___ going to go to the gym. | isn't | don't, aren't",
        "What are you going to ___ tomorrow? | do | doing, does",
      ]),
      build("Un plan", "👨‍👩‍👧 Ella va a visitar a su familia", "She is going to visit her family", ["are", "visits"]),
      build("Pregunta", "🎬 ¿Vas a ver una película?", "Are you going to watch a movie", ["is", "do"]),
      drag("Sujeto + going to", [
        "I = am going to study",
        "She = is going to cook",
        "They = are going to play",
      ], "Arrastra cada sujeto hasta la forma correcta."),
      dialog("Simulación: El fin de semana", "Un amigo te pregunta por tus planes", [
        ["Friend", "What are you going to do this weekend?", "I am going to visit my family.", "I going to visit my family.", "Falta 'am'."],
        ["Friend", "Are you going to travel by car?", "No, I am going to take the bus.", "No, I am going take the bus.", "Falta 'to'."],
        ["Friend", "Is your sister going to go with you?", "Yes, she is.", "Yes, she does.", "'Is she...?' se responde 'Yes, she is'."],
      ]),
    ],
  },

  A1_future_plans_will: {
    objectives: ["Hablar del futuro con 'will'", "Usar la forma negativa 'won't'", "Preguntar con 'Will you...?'"],
    grammar: g(
      "Futuro con 'will'",
      "'Will' se usa para predicciones, promesas y decisiones tomadas en el momento. Es igual para todas las personas.",
      ["Sujeto + will + verbo base", "I will travel next year.", "She will study English."],
      ["Contracción: 'll", "I'll call you.", "We'll see."],
      ["Negativo: won't (will not)", "They won't come to the party."],
      ["Pregunta: Will + sujeto + verbo?", "Will you help me? — Yes, I will. / No, I won't."],
      ["Sin 'to' y sin -s", "✅ She will work.", "❌ She will to work.", "❌ She will works."],
    ),
    vocab: [
      v("Next year", "El próximo año", "I will travel next year"),
      v("Soon", "Pronto", "I will see you soon"),
      v("Maybe", "Quizás", "Maybe I will go to the party"),
      v("Promise", "Prometer / Promesa", "I promise I will call you"),
    ],
    fix: (exs) => {
      // dos respuestas empezaban con "She" y "We", que no estaban en el banco
      exs.find((e) => e.id === "ex3_future_sentences").config.wordBank.push("She", "We");
    },
    replace: {
      ex4_future_plans: dialog("Simulación: Planes Futuros", "Hablas con un amigo sobre el año que viene", [
        ["Friend", "What will you do next year?", "I will travel to Europe.", "I will to travel to Europe.", "Después de 'will' no va 'to'."],
        ["Friend", "Will you work next month?", "Yes, I will. I will start a new job.", "Yes, I do. I will starts a new job.", "'Will you...?' se responde 'Yes, I will'."],
      ]),
    },
    add: [
      memory("Memory: Hablar del futuro", [
        "Next year = El próximo año",
        "Soon = Pronto",
        "Maybe = Quizás",
        "Promise = Prometer",
        "Later = Más tarde",
      ]),
      fill("Will / won't", [
        "I ___ travel next year. | will | am, going",
        "She will ___ English. | study | studies, studying",
        "They are busy. They ___ come to the party. | won't | will, don't",
        "___ you help me tomorrow? | Will | Do, Are",
        "I think it ___ rain soon. | will | is, does",
      ]),
      build("Una promesa", "📞 Te llamaré mañana", "I will call you tomorrow", ["am", "calls"]),
      build("Negativo", "🚫 Ella no vendrá a la fiesta", "She won't come to the party", ["doesn't", "comes"]),
      build("Pregunta", "🙏 ¿Me ayudarás?", "Will you help me", ["do", "are"]),
      drag("Contracciones", [
        "I will = I'll",
        "She will = She'll",
        "We will = We'll",
        "They will = They'll",
        "Will not = Won't",
      ], "Arrastra cada forma completa hasta su contracción."),
    ],
  },

  A1_goals: {
    objectives: ["Hablar de metas y sueños", "Elegir entre 'going to' y 'will'", "Explicar cómo vas a lograr una meta"],
    grammar: g(
      "'Going to' vs. 'will'",
      "Los dos hablan del futuro, pero no son intercambiables: depende de si el plan ya estaba decidido.",
      ["going to = plan ya decidido", "I am going to study medicine. (ya lo decidí)"],
      ["will = decisión del momento", "The phone is ringing. I will answer it!"],
      ["will = predicción u opinión (I think...)", "I think you will be a great teacher."],
      ["Metas: My goal / dream is to + verbo", "My dream is to become a doctor.", "My goal is to learn English."],
      ["want to + verbo", "I want to travel around the world."],
    ),
    vocab: [
      v("Goal", "Meta", "My goal is to learn English"),
      v("Dream", "Sueño", "My dream is to become a pilot"),
      v("Learn", "Aprender", "I am going to learn English"),
      v("Save money", "Ahorrar dinero", "We are going to save money"),
      v("Become", "Llegar a ser / Convertirse en", "She wants to become a doctor"),
      v("Career", "Carrera", "I want a career in medicine"),
    ],
    fix: (exs) => {
      exs.find((e) => e.id === "ex1_future_forms").config.pairs.push(
        { from: "I want to", to: "Yo quiero" },
        { from: "My goal is", to: "Mi meta es" },
      );
    },
    add: [
      match("Metas y sueños", [
        "Goal = Meta",
        "Dream = Sueño",
        "Learn = Aprender",
        "Save money = Ahorrar dinero",
        "Become = Llegar a ser",
        "Career = Carrera",
      ], "Une cada palabra con su traducción."),
      cat("¿Going to o will?", [
        ["Going to (plan decidido)", ["I am going to study medicine", "We are going to buy a house", "She is going to travel in July"]],
        ["Will (decisión o predicción)", ["I think it will rain", "I will help you now", "Maybe I will go"]],
      ], "Clasifica cada oración según el tipo de futuro."),
      fill("Elige el futuro correcto", [
        "I have a plan: I ___ going to learn English. | am | will, is",
        "The phone is ringing. I ___ answer it! | will | am going, going to",
        "She ___ to become a doctor. (plan) | is going | will, goes",
        "I think you ___ be a great teacher. | will | are going, going",
        "We are going ___ save money. | to | for, will",
      ]),
      build("Tu sueño", "👩‍⚕️ Mi sueño es llegar a ser médico", "My dream is to become a doctor", ["will", "going"]),
      build("Tu plan", "📘 Voy a aprender inglés", "I am going to learn English", ["will", "is"]),
      build("Una predicción", "🍎 Creo que seré un gran profesor", "I think I will be a great teacher", ["going", "am"]),
      drag("De la meta al plan", [
        "I want to speak English = I am going to study every day",
        "I want a new house = I am going to save money",
        "I want to be healthy = I am going to exercise",
        "I want to see the world = I am going to travel",
      ], "Arrastra cada meta hasta el plan para lograrla."),
      dialog("Simulación: Tus metas", "Tu profesora te pregunta por tus metas", [
        ["Teacher", "What are your goals for next year?", "I am going to learn English.", "I am going learn English.", "Falta 'to'."],
        ["Teacher", "Great! What is your dream job?", "My dream is to become a pilot.", "My dream is become to a pilot.", "Se dice 'to become'."],
        ["Teacher", "I think you will be a great pilot!", "Thank you! I will do my best.", "Thank you! I will to do my best.", "Después de 'will' no va 'to'."],
      ]),
    ],
  },

  A1_intentions_decisions: {
    objectives: ["Tomar decisiones en el momento con 'will'", "Ofrecer ayuda y hacer promesas", "Expresar duda con 'maybe' y 'I think'"],
    grammar: g(
      "'Will' para decisiones, ofrecimientos y promesas",
      "Cuando decides algo en el momento de hablar, ofreces ayuda o prometes algo, se usa 'will'.",
      ["Decisión del momento", "It is hot. I will open the window."],
      ["Ofrecer ayuda", "Don't worry, I will help you."],
      ["Promesa", "I promise I will call you.", "I won't be late."],
      ["Duda: I think / maybe + will", "I think I will stay at home.", "Maybe we will visit you."],
    ),
    vocab: [
      v("Decide", "Decidir", "I need to decide today"),
      v("Plan", "Plan / Planear", "What is your plan?"),
      v("Help", "Ayudar", "Can you help me?"),
      v("Offer", "Ofrecer", "I offer my help"),
    ],
    fix: (exs) => {
      // dos respuestas empezaban con "She" y "We", que no estaban en el banco
      exs.find((e) => e.id === "ex3_intention_sentences").config.wordBank.push("She", "We");
    },
    add: [
      match("Verbos de decisión", [
        "Decide = Decidir",
        "Plan = Planear",
        "Help = Ayudar",
        "Offer = Ofrecer",
        "Promise = Prometer",
      ], "Une cada verbo con su traducción."),
      fill("Decisiones y promesas", [
        "It is hot. I ___ open the window. | will | am, going",
        "Don't worry, I ___ help you. | will | do, am",
        "I promise I ___ be late. | won't | don't, am not",
        "I ___ I will stay at home. | think | will, am",
        "Maybe we ___ visit you tomorrow. | will | are, going",
      ]),
      build("Decisión", "🪟 Abriré la ventana", "I will open the window", ["am", "opens"]),
      build("Promesa", "⏰ Prometo que no llegaré tarde", "I promise I won't be late", ["don't", "am"]),
      drag("Situación → decisión", [
        "I am hungry = I will make a sandwich",
        "The phone is ringing = I will answer it",
        "It is cold = I will close the window",
        "I am tired = I will go to bed",
        "The bag is heavy = I will help you",
      ], "Arrastra cada situación hasta la decisión lógica."),
      dialog("Simulación: Ofrecer ayuda", "Un amigo tiene problemas con la tarea", [
        ["Friend", "I can't do my homework. It is very difficult.", "Don't worry, I will help you.", "Don't worry, I help you yesterday.", "Ofreces ayuda con 'will'."],
        ["Friend", "Thank you! Will you call me later?", "Yes, I will call you at six.", "Yes, I will calling you at six.", "'will' + verbo base."],
        ["Friend", "Great. Don't be late!", "I promise I won't be late.", "I promise I don't will be late.", "El negativo es 'won't'."],
      ]),
    ],
  },
};
