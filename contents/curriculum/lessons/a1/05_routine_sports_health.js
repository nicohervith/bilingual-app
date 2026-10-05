const { v, g, match, memory, fill, build, drag, cat, dialog } = require("../../helpers");

// Unidades "Vida Diaria y Rutina", "Deportes y Ocio" y "Cuerpo y Salud"
// Guía A1 clases 5, 6, 7, 8, 17, 21, 24 y 27.
// Lecciones nuevas: presente simple vs. continuo, emociones.
module.exports = {
  A1_daily_routine: {
    grammar: g(
      "Presente simple y adverbios de frecuencia",
      "El presente simple se usa para rutinas y hábitos. Los adverbios de frecuencia dicen cada cuánto haces algo.",
      ["Rutinas: sujeto + verbo", "I wake up at 7am.", "I have breakfast with my family."],
      ["Con he / she / it el verbo lleva -s", "She wakes up early.", "He goes to work by bus."],
      ["Frecuencia: always (100%), usually (80%), sometimes (50%), never (0%)", "I always brush my teeth.", "I never go to bed late."],
      ["El adverbio va antes del verbo (pero después de 'to be')", "✅ I usually have dinner at 8.", "✅ I am always tired.", "❌ I have usually dinner."],
      ["Preguntas de sí / no: Do / Does + sujeto + verbo?", "Do you exercise every day? — Yes, I do. / No, I don't.", "Does she work on Sundays?"],
    ),
    replace: {
      ex8_dialogue_routine: dialog("Dialogue: Talking About Your Day", "Dos amigos hablan de sus rutinas", [
        ["Friend", "What time do you wake up?", "I wake up at 7am.", "I waking up at 7am.", "Presente simple: 'I wake up'."],
        ["Friend", "Do you exercise every day?", "No, I usually exercise three times a week.", "No, I exercise usually three times a week.", "El adverbio va antes del verbo."],
        ["Friend", "What do you do after work?", "I have dinner and then watch TV.", "I having dinner and watching TV.", "Presente simple: 'have' y 'watch'."],
      ]),
    },
  },

  A1_simple_present: {
    grammar: g(
      "Presente simple: verbos regulares",
      "Se usa para hábitos, rutinas y hechos. El verbo solo cambia con he, she, it: se le agrega -s.",
      ["I / you / we / they + verbo", "I work in an office.", "They live in Madrid."],
      ["He / she / it + verbo + s", "She works in a hospital.", "He lives in Lima."],
      ["Si termina en -ch, -sh, -s, -x, -o: + es", "watch → watches", "go → goes"],
      ["Si termina en consonante + y: -ies", "study → studies", "try → tries"],
      ["Negativo: don't / doesn't + verbo base", "I don't work on Sundays.", "She doesn't drink coffee."],
    ),
    vocab: [
      v("Work", "Trabajar", "She works in a hospital"),
      v("Live", "Vivir", "I live in Madrid"),
      v("Study", "Estudiar", "He studies English every day"),
      v("Eat", "Comer", "We eat at home"),
      v("Drink", "Beber / Tomar", "She doesn't drink coffee"),
      v("Play", "Jugar", "They play soccer on Sundays"),
      v("Read", "Leer", "My father reads the newspaper"),
      v("Speak", "Hablar", "I speak Spanish and English"),
    ],
    add: [
      match("Verbos comunes", [
        "Work = Trabajar",
        "Live = Vivir",
        "Study = Estudiar",
        "Eat = Comer",
        "Drink = Beber",
        "Speak = Hablar",
      ], "Une cada verbo con su traducción."),
      fill("¿Con -s o sin -s?", [
        "She ___ in a hospital. | works | work, working",
        "I ___ in Madrid. | live | lives, living",
        "He ___ English every day. | studies | study, studys",
        "They ___ soccer on Sundays. | play | plays, playing",
        "My father ___ the newspaper. | reads | read, reades",
      ]),
      fill("Negativo: don't / doesn't", [
        "I ___ like coffee. | don't | doesn't, not",
        "She ___ work on Sundays. | doesn't | don't, isn't",
        "We ___ live in London. | don't | doesn't, aren't",
        "He doesn't ___ meat. | eat | eats, eating",
      ]),
      build("Tercera persona", "📚 Él estudia inglés todos los días", "He studies English every day", ["study", "is"]),
      build("Con 'they'", "🏠 Ellos viven en una casa grande", "They live in a big house", ["lives", "are"]),
      build("Negativo", "☕ Ella no toma café", "She doesn't drink coffee", ["don't", "drinks"]),
      cat("Tercera persona: ¿cómo termina?", [
        ["Solo -s", ["works", "plays", "reads"]],
        ["-es", ["watches", "goes", "washes"]],
        ["-ies", ["studies", "tries", "flies"]],
      ], "Clasifica cada verbo según su terminación con he / she."),
      drag("De 'I' a 'he / she'", [
        "I work = He works",
        "I study = She studies",
        "I watch = He watches",
        "I go = She goes",
        "I have = He has",
      ], "Arrastra cada verbo hasta su forma en tercera persona."),
    ],
  },

  A1_time_expressions: {
    grammar: g(
      "Verbos irregulares en presente y expresiones de tiempo",
      "Algunos verbos muy comunes no siguen la regla de solo agregar -s. Además, cada momento del día lleva su preposición.",
      ["be: am / is / are", "I am early.", "It is midnight."],
      ["have → has, go → goes, do → does", "She has breakfast at 8.", "He goes to work at noon."],
      ["in + partes del día", "in the morning", "in the afternoon", "in the evening"],
      ["at + night y horas exactas", "at night", "at noon", "at midnight", "at 7 o'clock"],
      ["Decir la hora: It is + hora", "It is seven o'clock.", "It is half past eight."],
    ),
    fix: (exs) => {
      // "I take coffee" no es natural, y "drink" no estaba en el banco de palabras
      const coffee = exs.find((e) => e.id === "ex12_routine_sentences");
      coffee.config.wordBank = ["I", "drink", "coffee", "in", "the", "morning", "at", "night"];
      coffee.config.correctAnswers = ["I drink coffee in the morning"];
    },
  },

  A1_likes_dislikes: {
    grammar: g(
      "Like, love, hate + sustantivo o verbo en -ing",
      "Para hablar de gustos se usan like, love, enjoy, hate. Detrás puede ir una cosa o una actividad terminada en -ing.",
      ["Verbo + sustantivo", "I like music.", "She loves chocolate."],
      ["Verbo + actividad en -ing", "I like reading.", "They enjoy swimming."],
      ["Con he / she lleva -s", "He likes sports.", "She hates spiders."],
      ["Negativo: don't / doesn't like", "I don't like cooking.", "He doesn't like horror movies."],
      ["Pregunta: Do you like...?", "Do you like sports? — Yes, I do. / No, I don't."],
    ),
    replace: {
      ex7_talking_about_hobbies: dialog("Simulación: Hablando de Gustos", "Hablas de pasatiempos con un amigo nuevo", [
        ["Friend", "What do you like to do in your free time?", "I like listening to music.", "I like listen to music.", "Después de 'like' la actividad va en -ing."],
        ["Friend", "Do you like reading books?", "Yes, I love reading.", "Yes, I loves reading.", "Con 'I' el verbo no lleva -s."],
        ["Friend", "What about cooking?", "I don't like cooking very much.", "I doesn't like cooking very much.", "Con 'I' se usa 'don't'."],
      ]),
      // el original emparejaba "I → music", "She → sports"... cualquier combinación era válida
      ex9_complete_sentences: drag("Completa las Oraciones", [
        "She = likes dancing",
        "I = am a music fan",
        "They = are sports fans",
        "He doesn't = like cooking",
      ], "Arrastra cada sujeto hasta el final que le corresponde."),
    },
    add: [
      fill("Gustos", [
        "I like ___ books. | reading | read, reads",
        "She ___ music. | likes | like, liking",
        "They ___ like vegetables. | don't | doesn't, not",
        "He ___ like horror movies. | doesn't | don't, isn't",
        "Do you ___ sports? | like | likes, liking",
      ]),
    ],
  },

  A1_sports_activities: {
    grammar: g(
      "Presente continuo: acciones de ahora",
      "Se usa para lo que está pasando en este momento. Se forma con 'to be' + verbo terminado en -ing.",
      ["am / is / are + verbo-ing", "I am playing soccer.", "She is running.", "They are swimming."],
      ["Pregunta: What are you doing?", "What are you doing? — I am working out."],
      ["Verbos terminados en -e: se quita la e", "dance → dancing", "skate → skating"],
      ["Consonante-vocal-consonante: se duplica la última", "run → running", "swim → swimming"],
      ["Negativo: to be + not + verbo-ing", "He is not playing tennis."],
    ),
  },

  A1_team_sports: {
    objectives: ["Hablar de deportes de equipo", "Decir qué está pasando ahora", "Hacer preguntas en presente continuo"],
    grammar: g(
      "Presente continuo: afirmar y preguntar",
      "Para contar lo que pasa ahora en un partido se usa el presente continuo: 'to be' + verbo en -ing.",
      ["Afirmativo", "We are playing basketball.", "My team is winning."],
      ["Pregunta: to be + sujeto + verbo-ing?", "Are you playing today?", "Is your team winning?"],
      ["Respuestas cortas", "Yes, I am. / No, I'm not.", "Yes, they are. / No, they aren't."],
      ["'Team' es singular", "✅ My team is playing.", "❌ My team are play."],
    ),
    vocab: [
      v("Player", "Jugador/a", "He is a good player"),
      v("Coach", "Entrenador/a", "The coach is talking to the team"),
      v("Win", "Ganar", "My team is winning"),
      v("Lose", "Perder", "They are losing the game"),
    ],
    replace: {
      ex5_watching_game: dialog("Simulación: Ver un Partido", "Hablas con un amigo sobre el partido de hoy", [
        ["Friend", "What are you doing this afternoon?", "I am watching the basketball game.", "I watching the basketball game.", "Falta 'am'."],
        ["Friend", "Is your team playing?", "Yes, my team is playing now.", "Yes, my team are play now.", "'My team is playing'."],
      ]),
    },
    add: [
      match("En el partido", [
        "Player = Jugador",
        "Coach = Entrenador",
        "Win = Ganar",
        "Lose = Perder",
        "Ball = Pelota",
      ], "Une cada palabra con su traducción."),
      fill("Está pasando ahora", [
        "We ___ playing basketball now. | are | is, am",
        "She is ___ the game on TV. | watching | watch, watches",
        "My team ___ winning! | is | are, am",
        "___ you playing today? | Are | Is, Do",
        "They are not ___ volleyball. | playing | play, plays",
      ]),
      build("Mi equipo", "🏆 Mi equipo está ganando el partido", "My team is winning the game", ["are", "win"]),
      build("Pregunta", "📺 ¿Estás viendo el partido?", "Are you watching the game", ["is", "watch"]),
    ],
  },

  A1_present_simple_vs_continuous: {
    create: { title: "Free Time: Simple vs. Continuous", unit: "unitA1_sports_leisure", after: "A1_team_sports", xp: 120, tags: ["free_time", "present_simple", "present_continuous"] },
    objectives: ["Hablar de actividades de tiempo libre", "Diferenciar hábitos de acciones de ahora", "Elegir entre presente simple y presente continuo"],
    grammar: g(
      "Presente simple vs. presente continuo",
      "El presente simple es para lo que haces siempre o habitualmente. El presente continuo es para lo que estás haciendo justo ahora.",
      ["Presente simple = hábitos y rutinas", "I play tennis every weekend.", "She reads at night."],
      ["Presente continuo = ahora mismo (to be + -ing)", "I am playing tennis now.", "She is reading right now."],
      ["Palabras que piden presente simple", "every day", "usually", "always", "on weekends"],
      ["Palabras que piden presente continuo", "now", "right now", "at the moment", "today", "Look!"],
      ["Compara", "I usually drink coffee, but today I am drinking tea."],
    ),
    vocab: [
      v("Usually", "Normalmente", "I usually go for a walk"),
      v("Every day", "Todos los días", "She reads every day"),
      v("On weekends", "Los fines de semana", "We play soccer on weekends"),
      v("Now", "Ahora", "I am studying now"),
      v("Right now", "Ahora mismo", "He is cooking right now"),
      v("At the moment", "En este momento", "They are watching a movie at the moment"),
      v("Go for a walk", "Salir a caminar", "We go for a walk every evening"),
      v("Play video games", "Jugar videojuegos", "He is playing video games"),
      v("Listen to music", "Escuchar música", "I am listening to music"),
      v("Take photos", "Sacar fotos", "She takes photos on weekends"),
    ],
    add: [
      match("Expresiones de tiempo", [
        "Usually = Normalmente",
        "Every day = Todos los días",
        "On weekends = Los fines de semana",
        "Now = Ahora",
        "Right now = Ahora mismo",
        "Today = Hoy",
      ], "Une cada expresión con su traducción."),
      cat("¿Qué tiempo acompaña?", [
        ["Presente simple", ["every day", "usually", "on weekends", "always"]],
        ["Presente continuo", ["now", "right now", "at the moment", "Look!"]],
      ], "Clasifica cada expresión según el tiempo verbal que suele acompañar."),
      fill("Hábitos (presente simple)", [
        "I ___ soccer every Saturday. | play | am playing, plays",
        "She usually ___ books at night. | reads | is reading, read",
        "We ___ to the park on weekends. | go | are going, goes",
        "He never ___ video games. | plays | is playing, play",
      ]),
      fill("Ahora (presente continuo)", [
        "Look! She ___ in the park. | is running | runs, run",
        "I ___ to music right now. | am listening | listen, listens",
        "They ___ a movie at the moment. | are watching | watch, watches",
        "He ___ photos now. | is taking | takes, take",
      ]),
      fill("¿Simple o continuo?", [
        "I usually drink coffee, but today I ___ tea. | am drinking | drink, drinks",
        "She is cooking now. She ___ every day. | cooks | is cooking, cook",
        "We ___ TV every night. | watch | are watching, watches",
        "Be quiet! The baby ___. | is sleeping | sleeps, sleep",
        "He ___ to the gym on Mondays. | goes | is going, go",
      ]),
      build("Un hábito", "🎾 Juego al tenis todos los fines de semana", "I play tennis every weekend", ["plays", "now"]),
      build("Ahora mismo", "📖 Ella está leyendo un libro ahora mismo", "She is reading a book right now", ["reads", "every"]),
      build("Con 'usually'", "🚶 Normalmente salimos a caminar", "We usually go for a walk", ["goes", "now"]),
      drag("De hábito a ahora", [
        "I read every day = I am reading now",
        "She cooks every day = She is cooking now",
        "They play on weekends = They are playing now",
        "He runs every morning = He is running now",
      ], "Arrastra cada hábito hasta la misma acción ocurriendo ahora."),
      match("Verbo → forma en -ing", [
        "run = running",
        "swim = swimming",
        "dance = dancing",
        "read = reading",
        "play = playing",
        "write = writing",
      ], "Une cada verbo con su forma en -ing."),
      cat("¿Costumbre o ahora?", [
        ["Costumbre", ["I play soccer on Sundays", "She reads every night", "We walk to school"]],
        ["Ahora", ["I am playing soccer", "She is reading", "We are walking"]],
      ]),
      dialog("Simulación: ¿Qué estás haciendo?", "Un amigo te llama por teléfono", [
        ["Friend", "Hi! What are you doing?", "I am watching a movie.", "I watch a movie.", "Es ahora: presente continuo."],
        ["Friend", "Do you watch movies every day?", "No, I usually watch movies on weekends.", "No, I am usually watching movies on weekends.", "Es una costumbre: presente simple."],
        ["Friend", "What is your sister doing now?", "She is listening to music.", "She listen to music now.", "Ahora + she: 'is listening'."],
      ]),
    ],
  },

  A1_animals: {
    objectives: ["Nombrar animales comunes", "Describir animales con is / are", "Decir qué puede hacer un animal"],
    grammar: g(
      "Singular y plural: is / are",
      "Para describir un animal se usa 'is'. Para hablar de varios o de la especie en general se usa el plural con 'are'.",
      ["Uno: the / a + animal + is", "The elephant is very big.", "A hamster is small."],
      ["Varios: animal + s + are", "Elephants are strong.", "Lions are dangerous."],
      ["Habilidades con 'can'", "A parrot can speak.", "A horse can run fast."],
      ["Tener un animal: have / has", "I have two dogs.", "She has a cat."],
    ),
    add: [
      memory("Memory: Animales", [
        "Dog = Perro",
        "Cat = Gato",
        "Rabbit = Conejo",
        "Horse = Caballo",
        "Pig = Cerdo",
      ]),
      cat("¿Dónde vive?", [
        ["Mascotas", ["Dog", "Cat", "Hamster"]],
        ["Granja", ["Cow", "Pig", "Horse"]],
        ["Salvajes", ["Lion", "Elephant", "Monkey"]],
      ]),
      fill("Describe los animales", [
        "The elephant ___ very big. | is | are, am",
        "Lions ___ dangerous. | are | is, am",
        "A parrot ___ speak. | can | are, cans",
        "I have two ___. | dogs | dog, a dog",
        "The cow gives us ___. | milk | eggs, carrots",
      ]),
      build("Qué come", "🥕 El conejo come zanahorias", "The rabbit eats carrots", ["eat", "is"]),
      build("En plural", "🐘 Los elefantes son muy fuertes", "Elephants are very strong", ["is", "a"]),
      drag("¿Qué animal es?", [
        "It says 'meow' = Cat",
        "It gives us milk = Cow",
        "It can speak = Parrot",
        "It is the king of the jungle = Lion",
        "It eats carrots = Rabbit",
      ], "Arrastra cada pista hasta el animal correcto."),
    ],
  },

  A1_health_symptoms: {
    objectives: ["Nombrar síntomas comunes", "Decir qué te pasa con 'have'", "Hablar con un médico"],
    grammar: g(
      "Verbos de estado: have y feel para síntomas",
      "Los verbos de estado describen cómo estás, no una acción. Van en presente simple, no en continuo.",
      ["have + a / an + síntoma", "I have a headache.", "She has a fever."],
      ["feel + adjetivo", "I feel sick.", "He feels tired."],
      ["Con he / she: has, feels", "He has a cold.", "She feels better."],
      ["No se usan en continuo", "✅ I have a headache.", "❌ I am having a headache."],
      ["Pregunta: Do you have...?", "Do you have a cough? — Yes, I do. / No, I don't."],
    ),
    vocab: [
      v("Cough", "Tos", "I have a cough"),
      v("Cold", "Resfriado", "He has a cold"),
      v("Stomachache", "Dolor de estómago", "She has a stomachache"),
      v("Sore throat", "Dolor de garganta", "I have a sore throat"),
    ],
    replace: {
      ex4_doctor_visit: dialog("Simulación: Visita al Médico", "Le cuentas tus síntomas a un médico", [
        ["Doctor", "What symptoms do you have?", "I have a headache and a fever.", "I am a headache and a fever.", "Los síntomas van con 'have'."],
        ["Doctor", "Do you have a cough?", "No, I don't, but I have a sore throat.", "No, I am not, but I am a sore throat.", "'Do you...?' se responde 'No, I don't'."],
        ["Doctor", "Take this medicine and rest.", "Thank you, doctor.", "You're welcome, doctor.", "Agradece al médico."],
      ]),
    },
    add: [
      memory("Memory: Síntomas", [
        "Cough = Tos",
        "Cold = Resfriado",
        "Stomachache = Dolor de estómago",
        "Sore throat = Dolor de garganta",
        "Toothache = Dolor de muela",
      ]),
      fill("¿Have, has o feel?", [
        "I ___ a headache. | have | am, feel",
        "She ___ a fever. | has | have, is",
        "I ___ sick today. | feel | have, has",
        "He ___ a cold. | has | is, feels",
        "Do you ___ a cough? | have | has, feel",
      ]),
      build("Dolor de garganta", "🤒 Tengo dolor de garganta", "I have a sore throat", ["am", "has"]),
      build("Con 'she'", "🤢 Ella tiene dolor de estómago", "She has a stomachache", ["have", "is"]),
      drag("¿Dónde duele?", [
        "Headache = Head",
        "Stomachache = Stomach",
        "Toothache = Tooth",
        "Sore throat = Throat",
        "Backache = Back",
      ], "Arrastra cada dolor hasta la parte del cuerpo."),
      cat("¿Síntoma o solución?", [
        ["Síntoma", ["Fever", "Cough", "Headache"]],
        ["Solución", ["Medicine", "Rest", "See a doctor"]],
      ]),
    ],
  },

  A1_medical_vocabulary: {
    objectives: ["Nombrar lugares y personas de la salud", "Usar 'need' y 'need to'", "Pedir una cita médica"],
    grammar: g(
      "Need + sustantivo / need to + verbo",
      "'Need' (necesitar) es un verbo de estado. Si sigue una cosa va solo; si sigue una acción lleva 'to'.",
      ["need + cosa", "I need medicine.", "You need rest."],
      ["need to + verbo", "I need to see a doctor.", "She needs to go to the hospital."],
      ["Con he / she: needs", "He needs a pill.", "She needs to rest."],
      ["Dolor: have pain in + parte del cuerpo", "I have pain in my arm."],
    ),
    vocab: [
      v("Nurse", "Enfermero/a", "The nurse helps the doctor"),
      v("Pharmacy", "Farmacia", "I buy medicine at the pharmacy"),
      v("Pill", "Pastilla", "Take one pill every day"),
      v("Appointment", "Cita / Turno", "I have an appointment at 3 PM"),
    ],
    add: [
      match("En el hospital", [
        "Nurse = Enfermero",
        "Pharmacy = Farmacia",
        "Pill = Pastilla",
        "Appointment = Cita",
        "Ambulance = Ambulancia",
      ], "Une cada palabra con su traducción."),
      fill("Need / need to", [
        "I ___ to see a doctor. | need | needs, am",
        "She ___ medicine. | needs | need, needing",
        "You need ___ rest. (descansar) | to | a, for",
        "I have an ___ at 3 PM. | appointment | hospital, pain",
        "I buy pills at the ___. | pharmacy | nurse, pain",
      ]),
      build("Necesito un médico", "👨‍⚕️ Necesito ver a un médico", "I need to see a doctor", ["needs", "am"]),
      build("Con 'she'", "💊 Ella necesita medicina", "She needs some medicine", ["need", "to"]),
      drag("¿Qué hace cada uno?", [
        "Doctor = Examines patients",
        "Nurse = Helps the doctor",
        "Pharmacy = Sells medicine",
        "Hospital = Has many doctors",
        "Ambulance = Takes you to the hospital",
      ], "Arrastra cada palabra hasta su descripción."),
      dialog("Simulación: Pedir una cita", "Llamas a la clínica para pedir un turno", [
        ["Receptionist", "Good morning. How can I help you?", "I need an appointment with the doctor.", "I need to an appointment with the doctor.", "need + sustantivo va sin 'to'."],
        ["Receptionist", "What is the problem?", "I have pain in my leg.", "I am pain in my leg.", "Se dice 'I have pain'."],
        ["Receptionist", "The doctor can see you at four.", "Thank you very much.", "You need rest.", "Agradece la cita."],
      ]),
    ],
  },

  A1_feeling_sick: {
    objectives: ["Decir cómo te sientes", "Usar 'feel' y 'to be' + adjetivo", "Dar consejos simples"],
    grammar: g(
      "Feel / to be + adjetivo",
      "Para decir cómo te sientes se usa 'feel' o 'to be' seguido de un adjetivo. Son verbos de estado.",
      ["feel + adjetivo", "I feel sick.", "She feels dizzy."],
      ["to be + adjetivo", "I am tired.", "He is better now."],
      ["Hambre, sed y frío van con 'to be', no con 'have'", "✅ I am hungry.", "✅ I am thirsty.", "❌ I have hunger."],
      ["Preguntar", "How do you feel?", "Are you OK?"],
    ),
    vocab: [
      v("Dizzy", "Mareado/a", "I feel dizzy"),
      v("Weak", "Débil", "She feels weak"),
      v("Hungry", "Con hambre", "I am hungry"),
      v("Thirsty", "Con sed", "He is thirsty"),
    ],
    replace: {
      ex4_health_conversation: dialog("Simulación: Conversación de Salud", "Un amigo te pregunta cómo estás", [
        ["Friend", "How do you feel today?", "I feel sick and tired.", "I have sick and tired.", "'Feel' + adjetivo."],
        ["Friend", "Do you need to see a doctor?", "No, I just need rest.", "No, I am just need rest.", "'I need', sin 'am'."],
        ["Friend", "Are you hungry?", "Yes, I am.", "Yes, I have.", "'Are you...?' se responde 'Yes, I am'."],
      ]),
    },
    add: [
      match("¿Cómo te sientes?", [
        "Dizzy = Mareado",
        "Weak = Débil",
        "Hungry = Con hambre",
        "Thirsty = Con sed",
        "Cold = Con frío",
      ], "Une cada palabra con su traducción."),
      fill("Feel / to be", [
        "I ___ tired today. | feel | have, feels",
        "She ___ dizzy. | feels | feel, has",
        "I ___ hungry. | am | have, has",
        "He ___ thirsty. | is | has, have",
        "How do you ___? | feel | are, have",
      ]),
      build("Mareado y débil", "😵 Me siento mareado y débil", "I feel dizzy and weak", ["has", "feels"]),
      build("Pregunta", "❓ ¿Cómo te sientes hoy?", "How do you feel today", ["are", "does"]),
      drag("Consejos", [
        "I am thirsty = Drink some water",
        "I am hungry = Eat something",
        "I am tired = Go to bed",
        "I feel sick = See a doctor",
        "I am cold = Wear a jacket",
      ], "Arrastra cada problema hasta su consejo."),
    ],
  },

  A1_emotions_feelings: {
    create: { title: "Emotions and Feelings", unit: "unitA1_body_health", xp: 100, tags: ["emotions", "feelings", "adjectives"] },
    objectives: ["Nombrar emociones básicas", "Decir cómo te sientes y por qué", "Diferenciar adjetivos en -ed y en -ing"],
    grammar: g(
      "Adjetivos de sentimiento",
      "Las emociones se expresan con 'to be' o 'feel' + adjetivo. El adjetivo no cambia: no tiene género ni plural.",
      ["to be / feel + adjetivo", "I am happy.", "She feels nervous."],
      ["No cambia con el género ni el número", "He is happy. / She is happy. / They are happy."],
      ["-ed = cómo se siente la persona", "I am bored.", "She is excited."],
      ["-ing = cómo es la cosa que lo provoca", "The movie is boring.", "The game is exciting."],
      ["Intensidad: very / a little", "I am very happy.", "He is a little nervous."],
      ["Causa: about / of", "I am excited about the party.", "She is scared of spiders."],
    ),
    vocab: [
      v("Happy", "Feliz", "I am happy today"),
      v("Sad", "Triste", "Why are you sad?"),
      v("Angry", "Enojado/a", "He is angry with his brother"),
      v("Scared", "Asustado/a", "She is scared of spiders"),
      v("Excited", "Emocionado/a", "We are excited about the party"),
      v("Nervous", "Nervioso/a", "I feel nervous before exams"),
      v("Bored", "Aburrido/a", "The children are bored"),
      v("Surprised", "Sorprendido/a", "I am surprised to see you"),
      v("Worried", "Preocupado/a", "She is worried about the exam"),
      v("Proud", "Orgulloso/a", "We are proud of you"),
    ],
    add: [
      match("Emociones básicas", [
        "Happy = Feliz",
        "Sad = Triste",
        "Angry = Enojado",
        "Scared = Asustado",
        "Excited = Emocionado",
        "Nervous = Nervioso",
      ], "Une cada emoción con su traducción."),
      memory("Memory: Más emociones", [
        "Bored = Aburrido",
        "Surprised = Sorprendido",
        "Worried = Preocupado",
        "Proud = Orgulloso",
        "Tired = Cansado",
      ]),
      cat("¿Positiva o negativa?", [
        ["Positiva", ["Happy", "Excited", "Proud"]],
        ["Negativa", ["Sad", "Angry", "Scared", "Worried"]],
      ]),
      fill("¿Cómo se sienten?", [
        "I ___ happy today. | am | have, has",
        "She ___ nervous before exams. | feels | feel, have",
        "They ___ excited about the party. | are | is, has",
        "He is ___ of spiders. | scared | happy, proud",
        "We are very ___ of you! | proud | angry, bored",
      ]),
      fill("¿-ed o -ing?", [
        "The movie is ___. | boring | bored, bore",
        "I am ___. There is nothing to do. | bored | boring, bore",
        "The news is ___. | surprising | surprised, surprise",
        "She is ___ about the trip. | excited | exciting, excite",
        "This game is ___! | exciting | excited, excite",
      ]),
      build("Hoy", "😊 Hoy me siento feliz", "I feel happy today", ["have", "feels"]),
      build("Preocupación", "😟 Ella está preocupada por el examen", "She is worried about the exam", ["are", "has"]),
      build("Pregunta", "😢 ¿Por qué estás triste?", "Why are you sad", ["is", "do"]),
      drag("Situación → emoción", [
        "It is my birthday = Happy",
        "I have an exam = Nervous",
        "My dog is sick = Worried",
        "There is nothing to do = Bored",
        "I see a big spider = Scared",
      ], "Arrastra cada situación hasta la emoción que provoca."),
      match("Opuestos", [
        "Happy = Sad",
        "Calm = Nervous",
        "Excited = Bored",
        "Brave = Scared",
      ], "Une cada emoción con su opuesto."),
      dialog("Simulación: ¿Cómo estás?", "Te encuentras con un amigo el día de tu cumpleaños", [
        ["Friend", "Hi! How are you today?", "I am very happy.", "I have very happy.", "Las emociones van con 'to be'."],
        ["Friend", "Why are you happy?", "Because it is my birthday!", "Because I am bored.", "Da una razón para estar feliz."],
        ["Friend", "Happy birthday! Are you excited about the party?", "Yes, I am very excited.", "Yes, I am very exciting.", "La persona se siente 'excited'."],
      ]),
    ],
  },
};
