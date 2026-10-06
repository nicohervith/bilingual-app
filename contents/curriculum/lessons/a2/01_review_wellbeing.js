const { v, g, match, memory, fill, build, drag, cat, dialog } = require("../../helpers");

// Unidades "Examen Final" y "Hogar, Salud y Bienestar"
// Guía A2 clases 13, 19, 25, 27, 28, 33, 37 y 40.
module.exports = {
  A2_general_review: {
    objectives: ["Repasar los tiempos verbales del nivel A2", "Usar modales y comparativos", "Mantener una conversación completa"],
    grammar: g(
      "Repaso general del nivel A2",
      "Este repaso reúne las estructuras principales del nivel. Cada tiempo verbal responde a una pregunta distinta: ¿siempre?, ¿ahora?, ¿cuándo pasó?, ¿alguna vez?",
      ["Presente simple / continuo", "I usually work in the morning.", "Right now I am studying."],
      ["Pasado simple / continuo", "I visited a museum yesterday.", "I was reading when you called."],
      ["Presente perfecto (experiencias, sin fecha)", "I have been to London twice."],
      ["Pasado perfecto (lo que pasó antes de otra acción pasada)", "The film had started when we arrived."],
      ["Futuro: going to (plan) / will (decisión o predicción)", "I am going to study abroad.", "I think it will rain."],
      ["Modales: can, could, may, must, have to, should, ought to", "You should rest.", "You must wear a seatbelt."],
      ["Comparativos y superlativos", "This book is more interesting than that one.", "She is the tallest in the class."],
    ),
    vocab: [
      v("Experience", "Experiencia", "Working abroad was a great experience"),
      v("Opportunity", "Oportunidad", "This job is a great opportunity"),
      v("Challenge", "Desafío", "Learning English is a challenge"),
      v("Improve", "Mejorar", "My English has improved a lot"),
    ],
    replace: {
      ex3_comprehensive_conversation: dialog("Conversación Integral", "Una entrevista que repasa todos los temas del nivel", [
        ["Interviewer", "Tell me about your daily routine.", "I usually work in the morning and study at night.", "I am usually work in the morning.", "Para la rutina: presente simple."],
        ["Interviewer", "What did you do last weekend?", "I visited a museum with my family.", "I have visited a museum last weekend.", "Con 'last weekend' va pasado simple."],
        ["Interviewer", "What are your plans for next year?", "I am going to study abroad.", "I going to study abroad.", "Falta 'am'."],
      ]),
      // la tabla original tenía una sola respuesta por tiempo verbal, no una por pronombre: era imposible de completar
      ex5_comprehensive_verbs: fill("Repaso de tiempos verbales", [
        "I usually ___ English at night. | study | am studying, studied",
        "Right now she ___ a book. | is reading | reads, read",
        "Yesterday we ___ a museum. | visited | visit, have visited",
        "I ___ to London twice in my life. | have been | went, am",
        "Tomorrow I ___ call you. | will | am, did",
      ]),
    },
    add: [
      fill("Repaso de modales", [
        "You ___ wear a seatbelt. It's the law. | must | could, may",
        "You look sick. You ___ see a doctor. | should | must to, can to",
        "___ I open the window, please? (formal) | May | Must, Should",
        "When I was five, I ___ swim. | could | can, may",
        "We ___ to finish the report today. | have | must, should",
      ]),
      fill("Repaso de comparativos y superlativos", [
        "This book is ___ than that one. | more interesting | interestinger, most interesting",
        "She is the ___ student in the class. | tallest | taller, most tall",
        "Today is ___ than yesterday. | colder | more cold, coldest",
        "This is the ___ restaurant in town. | best | better, goodest",
      ]),
      build("Experiencias", "🗾 Nunca he estado en Japón", "I have never been to Japan", ["went", "was"]),
      drag("Tiempo verbal → ejemplo", [
        "Present perfect = I have seen that movie",
        "Past continuous = I was reading when you called",
        "Going to = I am going to travel next month",
        "Present continuous = She is cooking right now",
      ], "Arrastra cada tiempo verbal hasta su ejemplo."),
    ],
  },

  A2_housing_places: {
    // estaba en dos unidades ("Hogar, Salud y Bienestar" y "El Mundo que nos Rodea"): queda solo en la primera
    onlyInUnit: "unitA2_wellbeing",
    objectives: ["Describir viviendas y barrios", "Usar this, that, these, those", "Hablar de alquiler y muebles"],
    grammar: g(
      "Adjetivos demostrativos",
      "Acompañan al sustantivo e indican distancia (cerca / lejos) y número (uno / varios).",
      ["Cerca: this + singular / these + plural", "This apartment is bright.", "These chairs are new."],
      ["Lejos: that + singular / those + plural", "That house is old.", "Those buildings are tall."],
      ["Here (aquí) va con this / these; over there (allá) con that / those", "I like these rooms here.", "Those houses over there are expensive."],
      ["Para no repetir el sustantivo: this one / that one", "This neighborhood is quieter than that one."],
    ),
    vocab: [
      v("Building", "Edificio", "That building has twenty floors"),
      v("Rent", "Alquiler / Alquilar", "The rent is very high here"),
      v("Landlord", "Dueño / Propietario", "The landlord fixed the window"),
      v("Furniture", "Muebles", "This apartment has new furniture"),
    ],
    replace: {
      ex4_housing_conversation: dialog("Conversación sobre Vivienda", "Visitas departamentos con un amigo", [
        ["Friend", "What do you think of this apartment?", "This apartment is very nice and bright.", "These apartment is very nice and bright.", "Singular: 'this apartment'."],
        ["Friend", "And those houses over there?", "Those houses are too expensive for me.", "That houses are too expensive for me.", "Plural y lejos: 'those'."],
      ]),
    },
    add: [
      fill("This, that, these, those", [
        "___ apartment here is mine. | This | These, Those",
        "___ buildings over there are new. | Those | That, This",
        "I like ___ chairs here. | these | this, that",
        "___ neighborhood over there is quiet. | That | Those, These",
        "We pay the ___ every month. | rent | furniture, landlord",
      ]),
      match("Vivienda", [
        "Building = Edificio",
        "Rent = Alquiler",
        "Landlord = Propietario",
        "Furniture = Muebles",
        "Neighbor = Vecino",
        "Downtown = Centro",
      ], "Une cada palabra con su traducción."),
      build("Lejos y plural", "🏚️ Esas casas son muy viejas", "Those houses are very old", ["that", "is"]),
      build("Comparar barrios", "🏘️ Este barrio es más tranquilo que aquel", "This neighborhood is quieter than that one", ["these", "more"]),
      cat("¿Cerca o lejos?", [
        ["Cerca", ["this", "these", "here"]],
        ["Lejos", ["that", "those", "over there"]],
      ]),
    ],
  },

  A2_money_finances: {
    objectives: ["Hablar de dinero, gastos y ahorro", "Diferenciar must y have to", "Usar don't have to y mustn't"],
    grammar: g(
      "Must / have to",
      "Los dos expresan obligación. 'Must' suele ser una obligación que siente quien habla; 'have to', una obligación externa (reglas, bancos, trabajo).",
      ["must + verbo base (igual para todas las personas)", "I must save more money.", "You must pay on time."],
      ["have to / has to + verbo base", "We have to pay the bills.", "She has to work on Saturdays."],
      ["don't have to = no es necesario", "You don't have to pay. It's free."],
      ["mustn't = está prohibido", "You mustn't use my card without asking."],
      ["En pasado solo existe 'had to'", "Yesterday I had to pay the rent."],
    ),
    vocab: [
      v("Bill", "Factura / Cuenta", "I have to pay the electricity bill"),
      v("Loan", "Préstamo", "They asked the bank for a loan"),
      v("Spend", "Gastar", "I spend too much money on clothes"),
      v("Earn", "Ganar (dinero)", "She earns a good salary"),
    ],
    replace: {
      ex4_financial_advice: dialog("Consejos Financieros", "Un amigo te pide consejos para ahorrar", [
        ["Friend", "I want to save more money. What should I do?", "You have to make a budget and spend less.", "You must to make a budget and spend less.", "Después de 'must' no va 'to'."],
        ["Friend", "Do I have to pay my credit card every month?", "Yes, you have to pay it on time.", "Yes, you has to pay it on time.", "Con 'you' se usa 'have to'."],
      ]),
    },
    add: [
      fill("Must, have to, don't have to, mustn't", [
        "You ___ pay your bills on time. | must | must to, musts",
        "She ___ to work on Saturdays. | has | have, must",
        "You ___ have to pay. It's free! | don't | mustn't, doesn't",
        "You ___ use my card without asking. (prohibido) | mustn't | don't have to, haven't",
        "Yesterday I ___ to pay the rent. | had | have, must",
      ]),
      match("Palabras de dinero", [
        "Bill = Factura",
        "Loan = Préstamo",
        "Spend = Gastar",
        "Earn = Ganar",
        "Bank account = Cuenta bancaria",
        "Cash = Efectivo",
      ], "Une cada palabra con su traducción."),
      build("Una obligación", "💡 Tengo que pagar la factura de luz", "I have to pay the electricity bill", ["must", "has"]),
      build("No es necesario", "🆓 No tienes que pagar por esto", "You don't have to pay for this", ["mustn't", "doesn't"]),
      cat("¿Qué significa?", [
        ["Obligación", ["You must pay taxes", "I have to work today"]],
        ["No es necesario", ["You don't have to pay, it's free", "We don't have to wear a uniform"]],
        ["Prohibido", ["You mustn't smoke here", "You mustn't park here"]],
      ], "Clasifica cada oración según lo que expresa."),
      memory("Memory: Verbos de dinero", [
        "Earn = Ganar",
        "Spend = Gastar",
        "Save = Ahorrar",
        "Borrow = Pedir prestado",
        "Lend = Prestar",
      ]),
    ],
  },

  A2_shopping_prices: {
    grammar: g(
      "Can, could, may para pedir y ofrecer",
      "Los tres sirven para pedir permiso o un favor. Cambia el nivel de formalidad. Después del modal va el verbo base, sin 'to'.",
      ["can = informal", "Can I try this on?", "Can I pay in cash?"],
      ["could = más amable", "Could you show me a bigger size?", "Could I see that jacket?"],
      ["may = formal (lo usan mucho los vendedores)", "May I help you?", "May I pay by card?"],
      ["Respuestas", "Yes, of course.", "Sure, the fitting room is over there.", "Sorry, you can't."],
    ),
    replace: {
      // el original tenía dos destinos "Could": soltar en el "otro" daba error
      ex3_modal_drag_expanded: fill("Politeness Levels", [
        "___ I help you, sir? (formal) | May | Must, Should",
        "___ you show me a bigger size, please? | Could | May, Must",
        "I ___ pay in cash. | can | may to, could to",
        "___ I try this on? | Can | Must, Do",
        "___ you give me a receipt, please? | Could | May, Should",
      ]),
    },
    add: [
      match("En la tienda", [
        "Fitting room = Probador",
        "Refund = Reembolso",
        "On sale = En oferta",
        "Customer = Cliente",
        "Discount = Descuento",
        "Receipt = Recibo",
      ], "Une cada palabra con su traducción."),
      build("Probarse ropa", "👕 ¿Podría probarme esta chaqueta?", "Could I try this jacket on", ["must", "to"]),
      build("Pagar con tarjeta", "💳 ¿Puedo pagar con tarjeta de crédito?", "May I pay by credit card", ["must", "with"]),
      drag("Pregunta → respuesta", [
        "Can I help you? = Yes, I'm looking for a shirt",
        "Could I try this on? = Of course, the fitting room is there",
        "May I pay by card? = Yes, we accept all cards",
        "Is it on sale? = Yes, it's 20% off",
      ], "Arrastra cada pregunta hasta su respuesta."),
      fill("Vocabulario de compras", [
        "It's 20% ___. | off | on, of",
        "The jeans are ___ sale today. | on | in, at",
        "The shirt is broken. I'd like a ___, please. | refund | discount, customer",
        "Where is the ___ room? | fitting | trying, testing",
      ]),
      dialog("Simulación: En la tienda", "Compras una chaqueta", [
        ["Clerk", "Good afternoon. May I help you?", "Yes, please. Could I see that jacket?", "Yes, please. Could I to see that jacket?", "Después de 'could' no va 'to'."],
        ["Clerk", "Of course. What size are you?", "Medium. Can I try it on?", "Medium. Can I tried it on?", "'can' + verbo base."],
        ["Clerk", "It fits well! Anything else?", "No, thanks. May I pay by card?", "No, thanks. May I paying by card?", "'may' + verbo base."],
      ]),
    ],
  },

  A2_health_symptoms: {
    objectives: ["Describir síntomas", "Dar consejos con should / shouldn't", "Pedir consejo con 'What should I do?'"],
    grammar: g(
      "Should / shouldn't para dar consejos",
      "'Should' recomienda algo y 'shouldn't' desaconseja. Es más suave que 'must'. Va seguido del verbo base.",
      ["should + verbo base", "You should rest.", "You should drink more water."],
      ["shouldn't + verbo base", "You shouldn't smoke.", "He shouldn't go to work today."],
      ["Pedir consejo: Should I...? / What should I do?", "Should I take this medicine?", "What should I do?"],
      ["Sin 'to' y sin -s", "✅ She should rest.", "❌ She should to rest.", "❌ She shoulds rest."],
    ),
    vocab: [
      v("Cough", "Tos", "I have a terrible cough"),
      v("Sore throat", "Dolor de garganta", "You should drink hot tea for a sore throat"),
      v("Allergy", "Alergia", "She has an allergy to cats"),
    ],
    replace: {
      // el original tenía dos destinos "should"
      ex2_health_advice: fill("Consejos de Salud: Should/Shouldn't", [
        "If you have a fever, you ___ see a doctor. | should | shouldn't, should to",
        "You ___ smoke when you're sick. | shouldn't | should, don't should",
        "You ___ drink more water. | should | shoulds, should to",
        "He's very sick. He ___ go to work today. | shouldn't | should, doesn't should",
        "What ___ I do? | should | do should, shoulds",
      ]),
      ex4_doctor_visit: dialog("Simulación: Visita al Doctor", "Consultas a un médico por un resfriado", [
        ["Doctor", "What symptoms do you have?", "I have a sore throat and a cough.", "I am a sore throat and a cough.", "Los síntomas van con 'have'."],
        ["Doctor", "You should rest and drink hot tea.", "Should I take any medicine?", "Do I should take any medicine?", "La pregunta es 'Should I...?'"],
        ["Doctor", "Yes, take this twice a day. And you shouldn't go out in the cold.", "OK, I won't. Thank you, doctor.", "OK, I shouldn't to go out. Thank you.", "Agradece el consejo."],
      ]),
    },
    add: [
      memory("Memory: Síntomas", [
        "Cough = Tos",
        "Sore throat = Dolor de garganta",
        "Allergy = Alergia",
        "Stomachache = Dolor de estómago",
        "Painkiller = Analgésico",
      ]),
      build("Consejo", "🛏️ Deberías quedarte en cama hoy", "You should stay in bed today", ["shouldn't", "to"]),
      build("Consejo negativo", "🍬 No deberías comer tanta azúcar", "You shouldn't eat so much sugar", ["should", "to"]),
      drag("Problema → consejo", [
        "I have a headache = You should take a painkiller",
        "I can't sleep = You shouldn't drink coffee at night",
        "I have a cough = You should drink hot tea",
        "I feel tired = You should rest more",
      ], "Arrastra cada problema hasta el consejo adecuado."),
      cat("¿Should o shouldn't?", [
        ["Should", ["Drink water", "Sleep eight hours", "Eat vegetables"]],
        ["Shouldn't", ["Smoke", "Eat too much sugar", "Stay up all night"]],
      ], "Clasifica cada hábito: ¿se recomienda o no?"),
    ],
  },

  A2_mental_health_wellbeing: {
    objectives: ["Hablar del estrés y el bienestar", "Sugerir con 'could'", "Expresar posibilidad con 'may' y 'can'"],
    grammar: g(
      "Can, could, may: posibilidad y sugerencias",
      "Además de habilidad y permiso, estos modales sirven para sugerir y hablar de cosas que pueden pasar.",
      ["can = algo que es posible en general", "Exercise can reduce stress."],
      ["could = sugerencia suave", "You could try yoga.", "You could take a short break."],
      ["may = quizás (posibilidad concreta)", "You may feel better tomorrow."],
      ["may = permiso formal", "May I talk to you for a minute?"],
      ["Siempre + verbo base", "✅ You could try.", "❌ You could to try."],
    ),
    vocab: [
      v("Stress", "Estrés", "Exercise can reduce stress"),
      v("Anxious", "Ansioso/a", "I feel anxious before exams"),
      v("Calm", "Tranquilo/a", "Breathing deeply helps me stay calm"),
      v("Break", "Descanso / Pausa", "You could take a short break"),
    ],
    replace: {
      ex3_mental_health_conversation: dialog("Conversación sobre Bienestar", "Un amigo estresado te pide ayuda", [
        ["Friend", "I feel very stressed these days. What can I do?", "You could try meditation or yoga.", "You could to try meditation or yoga.", "Después de 'could' no va 'to'."],
        ["Friend", "Do you think it will help?", "Yes, you may feel better after a few days.", "Yes, you may feels better after a few days.", "'may' + verbo base, sin -s."],
      ]),
    },
    add: [
      fill("Can, could, may", [
        "You ___ go for a walk. It may help. (sugerencia) | could | must, should to",
        "I ___ feel better tomorrow. (quizás) | may | can to, musts",
        "___ I talk to you for a minute? (permiso formal) | May | Must, Should",
        "Exercise ___ reduce stress. | can | cans, may to",
        "You look tired. You ___ take a break. | could | coulds, can to",
      ]),
      match("Bienestar", [
        "Stress = Estrés",
        "Anxious = Ansioso",
        "Calm = Tranquilo",
        "Break = Descanso",
        "Sleep well = Dormir bien",
        "Breathe deeply = Respirar profundo",
      ], "Une cada palabra con su traducción."),
      build("Sugerencia", "☕ Podrías tomarte un descanso corto", "You could take a short break", ["must", "to"]),
      build("Posibilidad", "👥 Hablar con amigos puede ayudarte", "Talking to friends can help you", ["cans", "to"]),
      drag("Problema → sugerencia", [
        "I feel stressed = You could try yoga",
        "I can't sleep = You could read before bed",
        "I feel lonely = You could call a friend",
        "I am tired = You could take a short break",
      ], "Arrastra cada problema hasta una sugerencia."),
    ],
  },

  A2_problems_solutions: {
    objectives: ["Describir problemas cotidianos", "Proponer soluciones con must / have to", "Usar don't have to"],
    grammar: g(
      "Must / have to para soluciones",
      "Para decir qué es necesario hacer ante un problema se usa 'must' o 'have to'. Si algo no hace falta, 'don't have to'.",
      ["have to / has to + verbo", "I have to fix my computer.", "She has to find a solution."],
      ["must + verbo (más urgente o personal)", "You must call the technician now."],
      ["don't / doesn't have to = no hace falta", "We don't have to worry. It's fixed."],
      ["Pasado: had to", "They had to change the plan yesterday."],
    ),
    vocab: [
      v("Broken", "Roto/a", "My phone is broken"),
      v("Fix", "Arreglar", "I have to fix my computer"),
      v("Lost", "Perdido/a", "I lost my keys"),
      v("Mistake", "Error", "Sorry, it was my mistake"),
    ],
    replace: {
      // el original tenía dos destinos "must"
      ex2_problem_solutions: fill("Soluciones con Must/Have to", [
        "My computer is broken. I ___ fix it. | have to | has to, must to",
        "You ___ call the technician now. | must | musts, must to",
        "She ___ to find a solution. | has | have, must",
        "It's fixed. We don't ___ to worry. | have | has, must",
        "They ___ to change the plan yesterday. | had | have, must",
      ]),
      ex4_problem_solving: dialog("Resolviendo Problemas", "Un amigo tiene problemas con el auto", [
        ["Friend", "My car won't start. What do I have to do?", "You have to call a mechanic.", "You have call a mechanic.", "Falta 'to'."],
        ["Friend", "Do I have to pay a lot?", "No, you don't have to pay much for a battery.", "No, you mustn't pay much for a battery.", "'No hace falta' es 'don't have to'."],
      ]),
    },
    add: [
      match("Problemas", [
        "Broken = Roto",
        "Fix = Arreglar",
        "Lost = Perdido",
        "Mistake = Error",
        "Problem = Problema",
      ], "Une cada palabra con su traducción."),
      build("Arreglar", "📱 Tengo que arreglar mi teléfono", "I have to fix my phone", ["has", "must"]),
      build("Urgente", "🚓 Tienes que llamar a la policía", "You must call the police", ["to", "have"]),
      drag("Problema → solución", [
        "I lost my keys = You have to call a locksmith",
        "My phone is broken = You have to take it to a repair shop",
        "I made a mistake = You must tell your boss",
        "The sink is leaking = You have to call a plumber",
      ], "Arrastra cada problema hasta su solución."),
      fill("Vocabulario de problemas", [
        "My laptop is ___. It doesn't work. | broken | lost, mistake",
        "I ___ my wallet. I can't find it. | lost | fixed, found",
        "The technician ___ the computer. Now it works. | fixed | broke, lost",
        "Sorry, it was my ___. | mistake | solution, problem",
      ]),
      cat("¿Problema o solución?", [
        ["Problema", ["My phone is broken", "I lost my keys", "I missed the bus"]],
        ["Solución", ["Take it to a repair shop", "Call a locksmith", "Take a taxi"]],
      ]),
    ],
  },

  A2_time_planning: {
    objectives: ["Organizar la agenda", "Usar adverbios de tiempo (already, yet, still, soon)", "Hablar de plazos"],
    grammar: g(
      "Adverbios de tiempo",
      "Indican cuándo pasa algo o si ya pasó. Muchos se usan con el presente perfecto.",
      ["already = ya (antes de lo esperado) — en afirmativas", "I have already finished."],
      ["yet = ya (preguntas) / todavía (negativas) — al final", "Have you finished yet?", "I haven't finished yet."],
      ["still = todavía (sigue pasando)", "She is still working."],
      ["soon / later / early / late", "See you later!", "The deadline is soon."],
      ["on time = puntual / in time = con tiempo suficiente", "The train arrived on time."],
    ),
    vocab: [
      v("Deadline", "Fecha límite", "The deadline is on Friday"),
      v("Calendar", "Calendario", "I check my calendar every morning"),
      v("Postpone", "Posponer", "We have to postpone the meeting"),
      v("On time", "A tiempo / Puntual", "She always arrives on time"),
    ],
    replace: {
      ex4_scheduling_conversation: dialog("Conversación sobre Agenda", "Un colega pregunta por un informe", [
        ["Colleague", "Have you finished the report yet?", "Not yet. I will finish it later today.", "Not already. I will finish it yesterday.", "'Not yet' y 'later today'."],
        ["Colleague", "OK. The deadline is soon, on Friday.", "Don't worry, I'll send it on time.", "Don't worry, I'll send it on time ago.", "'On time' = a tiempo."],
      ]),
    },
    add: [
      fill("Already, yet, still...", [
        "I have ___ finished my homework. | already | yet, still",
        "Have you called her ___? | yet | already, soon",
        "She hasn't finished. She is ___ working. | still | yet, already",
        "See you ___! | later | already, yet",
        "The train arrived ___ time. | on | in, at",
      ]),
      match("Planificación", [
        "Deadline = Fecha límite",
        "Calendar = Calendario",
        "Postpone = Posponer",
        "On time = A tiempo",
        "Early = Temprano",
        "Late = Tarde",
      ], "Une cada palabra con su traducción."),
      build("Todavía no", "📄 Todavía no terminé el proyecto", "I haven't finished the project yet", ["already", "still"]),
      build("Posponer", "📅 Tenemos que posponer la reunión", "We have to postpone the meeting", ["has", "postpones"]),
      drag("Adverbio → significado", [
        "Already = Ya (antes de lo esperado)",
        "Yet = Ya / Todavía (preguntas y negativas)",
        "Still = Todavía (sigue pasando)",
        "Soon = Pronto",
        "Later = Más tarde",
      ], "Arrastra cada adverbio hasta su significado."),
      memory("Memory: Tiempo", [
        "Week = Semana",
        "Month = Mes",
        "Weekend = Fin de semana",
        "Tomorrow = Mañana",
        "Tonight = Esta noche",
      ]),
    ],
  },
};
