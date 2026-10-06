const { v, g, match, memory, fill, build, drag, cat, dialog } = require("../../helpers");

// Unidad "Sociedad y Tecnología" — guía A2 clases 17, 21, 23 y 35 (+ lecciones extra de comunicación)
module.exports = {
  A2_technology_social_media: {
    objectives: ["Hablar de redes sociales y hábitos digitales", "Usar adverbios de frecuencia", "Preguntar 'How often...?'"],
    grammar: g(
      "Adverbios de frecuencia",
      "Indican cada cuánto haces algo. Van antes del verbo principal y después de 'to be'.",
      ["always · usually · often · sometimes · rarely · never", "I always check my phone in the morning."],
      ["Antes del verbo principal", "She rarely posts photos."],
      ["Después de 'to be'", "I'm never online after 10 p.m."],
      ["Expresiones al final: every day, once a week, ten times a day", "I get notifications ten times a day."],
      ["Pregunta: How often...?", "How often do you share videos?"],
    ),
    vocab: [
      v("Post", "Publicar / Publicación", "She often posts photos"),
      v("Share", "Compartir", "I share videos with my friends"),
      v("Follower", "Seguidor/a", "He has a thousand followers"),
      v("Notification", "Notificación", "I turn off notifications at night"),
    ],
    replace: {
      ex3_social_media_talk: dialog("Conversación sobre Redes Sociales", "Hablas con un amigo sobre el uso del celular", [
        ["Friend", "How often do you use social media?", "I check it every morning, but I rarely post.", "I check it every morning, but I post rarely always.", "'rarely' va antes del verbo y no se combina con 'always'."],
        ["Friend", "Are you always online?", "No, I'm never online after 10 p.m.", "No, I never am online after 10 p.m.", "Con 'to be', el adverbio va después."],
      ]),
    },
    add: [
      fill("Adverbios de frecuencia", [
        "I ___ check my phone in the morning. (100%) | always | never, ever",
        "She ___ posts photos. (casi nunca) | rarely | often, always",
        "He is ___ online. (60%) | often | ever, yet",
        "How ___ do you share videos? | often | much, many",
        "I get notifications ten times ___ day. | a | the, per the",
      ]),
      match("Redes sociales", [
        "Post = Publicar",
        "Share = Compartir",
        "Follower = Seguidor",
        "Notification = Notificación",
        "Download = Descargar",
        "Upload = Subir",
      ], "Une cada palabra con su traducción."),
      build("Casi nunca", "📷 Casi nunca publico fotos en redes", "I rarely post photos on social media", ["posts", "am"]),
      build("Con 'to be'", "🌙 Ella siempre está conectada a la noche", "She is always online in the evening", ["does", "has"]),
      build("Pregunta", "📱 ¿Con qué frecuencia revisas tu teléfono?", "How often do you check your phone", ["does", "much"]),
      drag("Adverbio → porcentaje", [
        "Always = 100%",
        "Usually = 80%",
        "Often = 60%",
        "Sometimes = 40%",
        "Rarely = 10%",
        "Never = 0%",
      ], "Arrastra cada adverbio hasta su frecuencia aproximada."),
    ],
  },

  A2_advanced_technology: {
    objectives: ["Hablar de avances tecnológicos", "Usar el pasado perfecto", "Ordenar dos acciones en el pasado"],
    grammar: g(
      "Pasado perfecto",
      "Se usa para una acción que ocurrió antes de otra acción pasada. Se forma con had + participio, igual para todas las personas.",
      ["had + participio", "They had developed the app.", "She had never used AI."],
      ["La acción más antigua va en pasado perfecto", "When I arrived, the meeting had already started."],
      ["Con already, never, by the time, before", "By the time we called, he had installed the update."],
      ["Participios irregulares", "build → built", "write → written", "begin → begun", "send → sent"],
    ),
    vocab: [
      v("Robot", "Robot", "They had built a robot before 2020"),
      v("Device", "Dispositivo", "This device is very fast"),
      v("Invent", "Inventar", "Who invented the internet?"),
      v("Update", "Actualización / Actualizar", "I had installed the update"),
    ],
    replace: {
      // dos respuestas usaban palabras que no estaban en el banco ("We", "She", "algorithm")
      ex3_tech_advancements: build("Avances Tecnológicos", "💻 Habían desarrollado el software antes del lanzamiento", "They had developed the software before the launch", ["have", "develop"]),
      ex4_tech_discussion: dialog("Discusión sobre Tecnología", "Hablas con un colega sobre un lanzamiento", [
        ["Colleague", "Had they finished the app before the launch?", "Yes, they had already finished it.", "Yes, they have already finish it.", "Pasado perfecto: 'had finished'."],
        ["Colleague", "What happened when you arrived at the conference?", "The presentation had already started.", "The presentation has already start.", "Pasó antes de que llegaras: 'had started'."],
      ]),
    },
    add: [
      fill("Pasado perfecto", [
        "When I arrived, the meeting ___ already started. | had | has, have",
        "They had ___ the robot before 2020. | built | build, builded",
        "She ___ never used AI before that day. | had | has, was",
        "By the time we called, he had ___ the update. | installed | install, installing",
        "We ___ the software before the launch. | had tested | have tested, test",
      ]),
      match("Tecnología", [
        "Robot = Robot",
        "Device = Dispositivo",
        "Invent = Inventar",
        "Update = Actualización",
        "Virtual reality = Realidad virtual",
      ], "Une cada palabra con su traducción."),
      build("Ya había empezado", "🏫 Cuando llegué, la clase ya había empezado", "When I arrived the class had already started", ["has", "start"]),
      cat("¿Pasado perfecto o pasado simple?", [
        ["Pasado perfecto", ["had invented", "had finished", "had seen"]],
        ["Pasado simple", ["invented", "finished", "saw"]],
      ]),
      fill("Participios", [
        "write → ___ | written | wrote, writed",
        "build → ___ | built | builded, build",
        "begin → ___ | begun | began, beginned",
        "forget → ___ | forgotten | forgot, forgetted",
        "send → ___ | sent | sended, send",
      ]),
    ],
  },

  A2_communication_skills: {
    objectives: ["Hablar de idiomas y habilidades lingüísticas", "Usar can / could para habilidades", "Pedir que repitan o hablen más despacio"],
    grammar: g(
      "Can / could para hablar de idiomas",
      "'Can' expresa lo que sabes hacer ahora; 'could', lo que sabías hacer antes. 'Could you...?' sirve para pedir algo con amabilidad.",
      ["can / can't = habilidad presente", "I can speak three languages.", "I can't understand him."],
      ["could / couldn't = habilidad pasada", "When I was a child, I could speak French."],
      ["Could you...? = pedido amable", "Could you repeat that, please?", "Could you speak more slowly?"],
      ["Siempre + verbo base, sin 'to'", "✅ She can understand.", "❌ She can to understand."],
    ),
    vocab: [
      v("Accent", "Acento", "She has a British accent"),
      v("Translate", "Traducir", "Can you translate this?"),
      v("Repeat", "Repetir", "Could you repeat that, please?"),
      v("Slowly", "Despacio", "Please speak slowly"),
    ],
    replace: {
      // el original tenía dos destinos "can"
      ex1_communication_modals: fill("Modales de Comunicación", [
        "I ___ speak three languages. | can | cans, could to",
        "___ you repeat that, please? | Could | Must, Should",
        "When I was a child, I ___ speak French. | could | can, cans",
        "She ___ understand English very well. | can | cans, can to",
        "Sorry, I ___ hear you. The music is too loud. | can't | couldn't to, mustn't",
      ]),
      ex4_language_conversation: dialog("Conversación sobre Idiomas", "Conoces a alguien en un intercambio de idiomas", [
        ["Person", "What languages can you speak?", "I can speak English and Spanish.", "I can to speak English and Spanish.", "Después de 'can' no va 'to'."],
        ["Person", "Sorry, could you speak more slowly?", "Of course. Can you understand me now?", "Of course. Can you understanding me now?", "'can' + verbo base."],
      ]),
    },
    add: [
      match("Idiomas", [
        "Accent = Acento",
        "Translate = Traducir",
        "Repeat = Repetir",
        "Slowly = Despacio",
        "Native speaker = Hablante nativo",
        "Mistake = Error",
      ], "Une cada palabra con su traducción."),
      build("Pedido amable", "🐢 ¿Podrías hablar más despacio, por favor?", "Could you speak more slowly please", ["must", "to"]),
      build("Habilidad pasada", "👩‍🏫 No pude entender a la profesora", "I couldn't understand the teacher", ["can't", "understood"]),
      drag("Situación → frase", [
        "You didn't hear = Could you repeat that?",
        "They speak very fast = Could you speak more slowly?",
        "You don't know a word = What does this word mean?",
        "You want a translation = How do you say this in English?",
      ], "Arrastra cada situación hasta la frase adecuada."),
      fill("Vocabulario de idiomas", [
        "She has a British ___. | accent | mistake, fluent",
        "Can you ___ this into English? | translate | repeat, accent",
        "Please speak ___. I'm learning. | slowly | slow, slower than",
        "He speaks English like a ___ speaker. | native | fluent, accent",
      ]),
      memory("Memory: Habilidades del idioma", [
        "Listen = Escuchar",
        "Speak = Hablar",
        "Read = Leer",
        "Write = Escribir",
        "Understand = Entender",
      ]),
    ],
  },

  A2_effective_communication: {
    objectives: ["Comunicarse con claridad", "Usar el imperativo para dar consejos", "Hacer pedidos amables (could you, would you mind, let me)"],
    grammar: g(
      "Imperativo y pedidos amables",
      "El imperativo usa el verbo base sin sujeto para dar consejos o instrucciones. Para pedir algo con cortesía hay fórmulas fijas.",
      ["Imperativo: verbo base", "Speak clearly.", "Listen carefully."],
      ["Imperativo negativo: don't + verbo", "Don't interrupt."],
      ["Could you + verbo...?", "Could you explain that again?"],
      ["Would you mind + verbo-ing...?", "Would you mind repeating that?"],
      ["Let me + verbo (ofrecerse)", "Let me explain what I mean."],
    ),
    vocab: [
      v("Clarify", "Aclarar", "Let me clarify my message"),
      v("Explain", "Explicar", "Could you explain that again?"),
      v("Polite", "Educado/a / Cortés", "Always be polite in emails"),
      v("Interrupt", "Interrumpir", "Don't interrupt people"),
    ],
    replace: {
      // la tabla original tenía una sola respuesta por tiempo verbal, no una por pronombre: era imposible de completar
      ex4_communication_verbs: fill("Verbos de Comunicación", [
        "___ clearly and slowly. (consejo) | Speak | Speaks, Speaking",
        "___ interrupt people when they talk. | Don't | Not, Doesn't",
        "___ you explain that again, please? | Could | Should, Must",
        "Would you ___ repeating that? | mind | care, like to",
        "Let me ___ what I mean. | explain | explaining, to explain",
      ]),
      ex3_clarification_dialogue: dialog("Simulación: Aclarando Malentendidos", "Aclaras un malentendido con un amigo", [
        ["Friend", "I think there was a misunderstanding. What did you mean?", "Sorry, let me clarify what I meant.", "Sorry, let me to clarify what I meant.", "'let me' + verbo base."],
        ["Friend", "OK. Next time, could you send a clearer message?", "Of course. I'll explain things more clearly.", "Of course. I'll explaining things more clearly.", "'will' + verbo base."],
      ]),
    },
    add: [
      match("Comunicación", [
        "Clarify = Aclarar",
        "Explain = Explicar",
        "Polite = Cortés",
        "Interrupt = Interrumpir",
        "Listen carefully = Escuchar con atención",
        "Body language = Lenguaje corporal",
      ], "Une cada expresión con su traducción."),
      build("Consejo negativo", "🤐 No interrumpas a la gente cuando habla", "Don't interrupt people when they speak", ["not", "speaks"]),
      build("Pedido amable", "🙏 ¿Te molestaría explicar eso otra vez?", "Would you mind explaining that again", ["explain", "to"]),
      cat("¿Ayuda o perjudica?", [
        ["Ayuda a comunicar", ["Listen carefully", "Ask questions", "Speak clearly"]],
        ["Perjudica", ["Interrupt", "Look at your phone", "Shout"]],
      ]),
      drag("De directo a amable", [
        "Repeat that! = Could you repeat that, please?",
        "Explain! = Would you mind explaining?",
        "Wait! = Could you wait a moment, please?",
        "Speak slowly! = Could you speak more slowly?",
      ], "Arrastra cada orden directa hasta su versión amable."),
    ],
  },

  A2_communication_styles: {
    objectives: ["Distinguir lenguaje formal e informal", "Escribir mensajes según el destinatario", "Usar would y could para sonar formal"],
    grammar: g(
      "Lenguaje formal e informal",
      "El mismo mensaje cambia según a quién le hablas. En lo formal se usan modales más suaves, frases completas y saludos de cortesía.",
      ["Saludo y despedida", "Formal: Dear Mr. Smith, … Kind regards", "Informal: Hi Tom! … See you!"],
      ["Pedidos", "Formal: Could you send me the report?", "Informal: Can you send me the report?"],
      ["would like (formal) = want (informal)", "I would like to make a suggestion."],
      ["Contracciones: más comunes en lo informal", "I'm, don't (informal) / I am, do not (formal)"],
    ),
    vocab: [
      v("Rude", "Maleducado/a / Grosero/a", "It's rude to interrupt"),
      v("Greeting", "Saludo", "Start the email with a greeting"),
      v("Request", "Pedido / Solicitud", "I have a request"),
      v("Suggestion", "Sugerencia", "I would like to make a suggestion"),
    ],
    replace: {
      ex3_formal_informal_dialogue: dialog("Simulación: Formal vs Informal", "Un colega te pregunta cómo escribir mensajes", [
        ["Colleague", "How should I write to our new client?", "Use a formal tone: 'Dear Mr. Smith, could you...?'", "Use an informal tone: 'Hey Smith, what's up?'", "Con un cliente nuevo: tono formal."],
        ["Colleague", "And with my teammates?", "You can be more informal, but always polite.", "You can be rude with them.", "Informal no significa maleducado."],
      ]),
    },
    add: [
      cat("¿Formal o informal?", [
        ["Formal", ["Dear Mr. Brown", "Could you please...?", "Kind regards"]],
        ["Informal", ["Hi Tom!", "Can you...?", "See you!"]],
      ]),
      fill("Formal e informal", [
        "___ Mrs. Taylor, (al empezar un email formal) | Dear | Hey, Yo",
        "___ you send me the report, please? (formal) | Could | Can't, Must",
        "Kind ___, John Smith | regards | wishes you, bye",
        "___! How are you? (a un amigo) | Hi | Dear, Sir",
        "I ___ like to make a suggestion. (formal) | would | will, am",
      ]),
      match("Estilos", [
        "Rude = Maleducado",
        "Greeting = Saludo",
        "Request = Pedido",
        "Suggestion = Sugerencia",
        "Direct = Directo",
        "Indirect = Indirecto",
      ], "Une cada palabra con su traducción."),
      build("Pedido formal", "📧 ¿Podría enviarme el informe, por favor?", "Could you send me the report please", ["must", "sends"]),
      build("Sugerencia formal", "💡 Me gustaría hacer una sugerencia", "I would like to make a suggestion", ["will", "making"]),
      drag("De informal a formal", [
        "Hi! = Dear Sir or Madam",
        "Thanks! = Thank you very much",
        "Can you help? = Could you help me, please?",
        "Bye! = Kind regards",
      ], "Arrastra cada expresión informal hasta su versión formal."),
    ],
  },

  A2_education_studies: {
    objectives: ["Hablar de estudios y materias", "Dar consejos con should y ought to", "Usar vocabulario de exámenes y notas"],
    grammar: g(
      "Should / ought to",
      "Los dos dan consejos y significan casi lo mismo. 'Ought to' es un poco más formal y siempre lleva 'to'.",
      ["should + verbo base", "You should study every day."],
      ["ought to + verbo base", "You ought to sleep well before the exam."],
      ["Negativo: shouldn't (el más usado)", "You shouldn't stay up all night."],
      ["Pregunta: Should I...?", "Should I take notes in class?"],
      ["Error típico", "❌ You should to study.", "❌ You ought study."],
    ),
    vocab: [
      v("Subject", "Materia", "Math is my favorite subject"),
      v("Grade", "Nota / Calificación", "I got a good grade"),
      v("Pass", "Aprobar", "Did you pass the exam?"),
      v("Fail", "Reprobar / Desaprobar", "He failed the test"),
    ],
    replace: {
      // el original tenía dos destinos "should"
      ex2_study_advice: fill("Consejos de Estudio: Should/Ought to", [
        "You ___ study every day. | should | should to, shoulds",
        "We ought ___ practice speaking. | to | for, at",
        "They ___ to do their homework. | ought | should, must",
        "You ___ stay up all night before an exam. | shouldn't | should, ought",
        "___ I take notes in class? | Should | Ought, Do should",
      ]),
      ex4_study_conversation: dialog("Conversación sobre Estudios", "Un compañero te pide consejos para un examen", [
        ["Classmate", "I have an English exam next week. What should I do?", "You should study a little every day.", "You should to study a little every day.", "Después de 'should' no va 'to'."],
        ["Classmate", "Is it a good idea to study all night?", "No, you ought to sleep well before the exam.", "No, you ought sleep well before the exam.", "'ought' siempre lleva 'to'."],
      ]),
    },
    add: [
      match("Estudios", [
        "Subject = Materia",
        "Grade = Nota",
        "Pass = Aprobar",
        "Fail = Reprobar",
        "Notes = Apuntes",
        "Classroom = Aula",
      ], "Une cada palabra con su traducción."),
      build("Ought to", "📒 Deberías repasar tus apuntes", "You ought to review your notes", ["reviews", "oughts"]),
      build("Shouldn't", "🚫 No deberías copiarte en el examen", "You shouldn't copy in the exam", ["don't", "copies"]),
      cat("¿Buen o mal consejo?", [
        ["Should", ["Review your notes", "Sleep well", "Ask the teacher"]],
        ["Shouldn't", ["Copy from a classmate", "Study all night", "Skip classes"]],
      ]),
      fill("Vocabulario escolar", [
        "Math is my favorite ___. | subject | grade, classroom",
        "I got a good ___ on the test: 9 out of 10. | grade | subject, note",
        "Did you ___ the exam? — Yes, with an 8! | pass | fail, lose",
        "He didn't study, so he ___ the test. | failed | passed, won",
      ]),
      memory("Memory: Materias", [
        "Math = Matemáticas",
        "History = Historia",
        "Science = Ciencias",
        "Geography = Geografía",
        "Art = Arte",
      ]),
    ],
  },
};
