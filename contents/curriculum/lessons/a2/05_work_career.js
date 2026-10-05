const { v, g, match, memory, fill, build, drag, cat, dialog } = require("../../helpers");

// Unidad "Mundo Profesional y Futuro" — guía A2 clases 5 y 14 (+ lecciones extra del mundo laboral)
module.exports = {
  A2_work_professions: {
    objectives: ["Hablar del trabajo y las profesiones", "Usar el presente continuo para trabajos actuales o temporales", "Diferenciarlo del presente simple"],
    grammar: g(
      "Presente continuo en el trabajo",
      "Para lo que estás haciendo ahora o en un período temporal (esta semana, este mes) se usa el presente continuo. Para tu trabajo habitual, el presente simple.",
      ["Ahora o temporal: am / is / are + -ing", "I'm working on a new project.", "She's working from home this week."],
      ["Permanente: presente simple", "I'm a web developer. I design websites.", "He works in a bank."],
      ["Expresiones que piden continuo", "now", "at the moment", "this week", "currently"],
      ["Negativo y pregunta", "He isn't working today.", "What are you working on?"],
    ),
    vocab: [
      v("Salary", "Salario / Sueldo", "She has a good salary"),
      v("Manager", "Gerente", "The manager is having a meeting"),
      v("Full-time", "Tiempo completo", "I have a full-time job"),
    ],
    replace: {
      ex4_job_interview: dialog("Simulación: Entrevista de Trabajo", "Respondes preguntas en una entrevista", [
        ["Interviewer", "What are you working on at the moment?", "I'm working on a software project.", "I work on a software project at the moment now.", "'At the moment' pide presente continuo."],
        ["Interviewer", "And what do you do in general?", "I'm a web developer. I design websites.", "I'm being a web developer.", "Trabajo permanente: presente simple."],
      ]),
    },
    add: [
      fill("¿Simple o continuo?", [
        "I ___ in a hospital this month. (temporal) | am working | work, works",
        "She ___ as a teacher. (permanente) | works | is working now, work",
        "They ___ a new office this week. | are opening | open, opens",
        "What ___ you working on now? | are | do, is",
        "He's sick. He isn't ___ today. | working | work, works",
      ]),
      match("El trabajo", [
        "Salary = Salario",
        "Manager = Gerente",
        "Full-time = Tiempo completo",
        "Part-time = Medio tiempo",
        "Boss = Jefe",
        "Employee = Empleado",
      ], "Une cada palabra con su traducción."),
      build("Temporal", "🏠 Ella está trabajando desde casa esta semana", "She is working from home this week", ["works", "are"]),
      build("Permanente", "👷 Mi hermano trabaja como ingeniero", "My brother works as an engineer", ["work", "does"]),
      cat("¿Permanente o temporal?", [
        ["Permanente (presente simple)", ["I work in a bank", "She teaches English", "He designs houses"]],
        ["Temporal (presente continuo)", ["I'm working from home this week", "She's teaching a new class this month", "He's designing a house now"]],
      ]),
      memory("Memory: Profesiones", [
        "Lawyer = Abogado",
        "Accountant = Contador",
        "Mechanic = Mecánico",
        "Pilot = Piloto",
        "Chef = Cocinero",
      ]),
    ],
  },

  A2_workplace_communication: {
    objectives: ["Comunicarse en el trabajo", "Usar el presente continuo para planes acordados", "Hablar de reuniones y plazos"],
    grammar: g(
      "Presente continuo para planes futuros acordados",
      "Cuando un plan ya está organizado (con día y hora), se usa el presente continuo aunque sea en el futuro.",
      ["Plan acordado: am / is / are + -ing + momento futuro", "I'm meeting the client tomorrow at 10.", "We're giving a presentation on Friday."],
      ["Pregunta", "Are you coming to the meeting this afternoon?"],
      ["Compara: ahora vs. plan", "I'm writing an email now. / I'm flying to Lima next week."],
      ["Muy usado con verbos de movimiento y citas", "come, go, meet, fly, have (a meeting)"],
    ),
    vocab: [
      v("Schedule a meeting", "Programar una reunión", "Let's schedule a meeting for Monday"),
      v("Email", "Correo electrónico", "I'm writing an email to the client"),
      v("Call back", "Devolver la llamada", "Can you call me back later?"),
      v("Team", "Equipo", "My team is meeting at 3"),
    ],
    replace: {
      ex3_work_meeting: dialog("Simulación: Reunión de Trabajo", "Tu gerente te pregunta por tus tareas", [
        ["Manager", "When is the deadline for this task?", "It's next Friday. I'm finishing it on Thursday.", "It's next Friday. I finishing it on Thursday.", "Falta 'am'."],
        ["Manager", "Are you meeting the client this week?", "Yes, I'm meeting her on Wednesday at ten.", "Yes, I meet her on Wednesday at ten now.", "Plan acordado: presente continuo."],
      ]),
    },
    add: [
      fill("Planes acordados", [
        "I ___ the client tomorrow at 10. | am meeting | meet, meets",
        "We ___ a presentation on Friday. | are giving | give, gives",
        "She ___ to London next week for work. | is flying | flies, fly",
        "___ you coming to the meeting this afternoon? | Are | Do, Is",
        "They have a day off. They aren't ___ today. | working | work, works",
      ]),
      match("En la oficina", [
        "Schedule a meeting = Programar una reunión",
        "Call back = Devolver la llamada",
        "Team = Equipo",
        "Email = Correo electrónico",
        "Report = Informe",
        "Meeting room = Sala de reuniones",
      ], "Une cada expresión con su traducción."),
      build("Un plan", "📅 Me reúno con mi jefe el lunes", "I am meeting my boss on Monday", ["meet", "is"]),
      build("Pregunta", "❓ ¿Vienes a la reunión?", "Are you coming to the meeting", ["do", "come"]),
      drag("Pregunta → respuesta", [
        "When is the meeting? = It's on Monday at 9",
        "Can you call me back? = Sure, in ten minutes",
        "Who is giving the presentation? = Laura is giving it",
        "Did you send the report? = Yes, I sent it this morning",
      ], "Arrastra cada pregunta hasta su respuesta."),
      cat("¿Ahora o plan futuro?", [
        ["Ahora", ["I'm writing an email right now", "She's talking on the phone at the moment"]],
        ["Plan futuro", ["I'm meeting the client tomorrow", "We're flying to Lima next week"]],
      ]),
    ],
  },

  A2_professional_relationships: {
    objectives: ["Hablar de relaciones laborales", "Combinar presente simple (hábitos) y continuo (proyectos actuales)", "Pedir y dar apoyo en el trabajo"],
    grammar: g(
      "Presente simple vs. continuo en el trabajo",
      "Las costumbres del equipo van en presente simple; los proyectos de estos días, en presente continuo.",
      ["Hábitos: presente simple", "We usually meet every Monday.", "My mentor gives me good advice."],
      ["Proyectos actuales: presente continuo", "We are working with a new partner.", "She is leading a new team this month."],
      ["Verbos de estado siempre en simple", "I trust my colleagues.", "I know my team well."],
      ["Shall we...? para proponer algo juntos", "Shall we work on this together?"],
    ),
    vocab: [
      v("Trust", "Confiar / Confianza", "I trust my colleagues"),
      v("Support", "Apoyar / Apoyo", "Thanks for your support"),
      v("Advice", "Consejo", "My mentor gives me good advice"),
      v("Partner", "Socio/a", "We are working with a new partner"),
    ],
    replace: {
      ex3_networking_conversation: dialog("Simulación: Evento de Networking", "Conoces a una profesional en un evento", [
        ["Professional", "What project are you working on these days?", "I'm working on a marketing campaign.", "I work on a marketing campaign these days now.", "Algo temporal: presente continuo."],
        ["Professional", "Do you usually work in a team?", "Yes, I usually work with five colleagues.", "Yes, I'm usually working with five colleagues.", "Hábito: presente simple."],
      ]),
    },
    add: [
      fill("Hábitos y proyectos", [
        "My mentor usually ___ me good advice. | gives | is giving, give",
        "Right now we ___ with a new partner. | are working | work, works",
        "I ___ my colleagues. They're great. | trust | am trusting, trusts",
        "She ___ a new team this month. | is leading | leads, lead",
        "We ___ meet every Monday. | usually | are usually, usual",
      ]),
      match("Relaciones laborales", [
        "Trust = Confianza",
        "Support = Apoyo",
        "Advice = Consejo",
        "Partner = Socio",
        "Coworker = Compañero de trabajo",
        "Feedback = Comentarios",
      ], "Une cada palabra con su traducción."),
      build("Un hábito", "🥪 Normalmente almorzamos juntos los viernes", "We usually have lunch together on Fridays", ["are", "having"]),
      build("Un proyecto actual", "🚀 Mi equipo está trabajando en un proyecto nuevo", "My team is working on a new project", ["works", "are"]),
      drag("Situación → frase", [
        "You need help = Could you give me some advice?",
        "A colleague did a great job = Well done! Great work",
        "You want to work together = Shall we work on this together?",
        "Someone helped you = Thanks for your support",
      ], "Arrastra cada situación hasta la frase adecuada."),
    ],
  },

  A2_business_meetings: {
    objectives: ["Participar en reuniones", "Hacer sugerencias (let's, why don't we, how about)", "Expresar acuerdo y desacuerdo"],
    grammar: g(
      "Hacer sugerencias",
      "Cada fórmula de sugerencia va seguida de una forma distinta del verbo.",
      ["Let's + verbo base", "Let's start the meeting."],
      ["Why don't we + verbo base?", "Why don't we take a break?"],
      ["How about / What about + verbo-ing?", "How about finishing the report tomorrow?"],
      ["Responder", "I agree. / Good idea!", "I'm not sure. / I don't agree."],
      ["Ojo: 'agree' es un verbo", "✅ I agree.", "❌ I am agree."],
    ),
    vocab: [
      v("Suggest", "Sugerir", "I suggest a new strategy"),
      v("Agree", "Estar de acuerdo", "I agree with you"),
      v("Disagree", "No estar de acuerdo", "I disagree with that idea"),
      v("Decision", "Decisión", "We need to make a decision"),
    ],
    replace: {
      ex4_meeting_conversation: dialog("Simulación: Reunión de Negocios", "Participas en una reunión para conseguir clientes", [
        ["Manager", "We need more clients. Any ideas?", "Why don't we start an online campaign?", "Why don't we starting an online campaign?", "'Why don't we' + verbo base."],
        ["Manager", "Good idea. What about the budget?", "How about reducing travel costs?", "How about reduce travel costs?", "'How about' + verbo-ing."],
        ["Manager", "I agree. Let's decide next week.", "Great. Let's meet again on Monday.", "Great. Let's to meet again on Monday.", "'Let's' + verbo base."],
      ]),
    },
    add: [
      fill("Sugerencias", [
        "___ start the meeting. | Let's | Let, Lets to",
        "Why don't we ___ a break? | take | taking, to take",
        "How about ___ the report tomorrow? | finishing | finish, to finish",
        "It's a good idea. I ___ with you. | agree | am agree, agrees",
        "I'm sorry, but I don't ___. | agree | disagree, agreeing",
      ]),
      match("Reuniones", [
        "Suggest = Sugerir",
        "Agree = Estar de acuerdo",
        "Disagree = No estar de acuerdo",
        "Decision = Decisión",
        "Deadline = Fecha límite",
        "Goal = Objetivo",
      ], "Une cada palabra con su traducción."),
      build("Why don't we", "📅 ¿Por qué no nos reunimos el jueves?", "Why don't we meet on Thursday", ["meeting", "to"]),
      build("How about", "📝 ¿Qué tal si cambiamos la agenda?", "How about changing the agenda", ["change", "to"]),
      cat("¿Sugerir o responder?", [
        ["Sugerir", ["Let's...", "Why don't we...?", "How about...?"]],
        ["Responder", ["I agree", "Good idea", "I'm not sure"]],
      ]),
    ],
  },

  A2_client_interactions: {
    objectives: ["Atender a clientes", "Ofrecer ayuda con I'll y Shall I...?", "Hacer pedidos amables con Would you / Could you"],
    grammar: g(
      "Ofrecimientos y pedidos",
      "Con los clientes se ofrecen cosas y se piden favores con fórmulas amables.",
      ["Ofrecer en el momento: I'll + verbo", "I'll send it this afternoon.", "I'll call you back."],
      ["Ofrecer preguntando: Shall I + verbo?", "Shall I send you the contract?"],
      ["Ofrecer algo: Would you like...?", "Would you like some coffee?"],
      ["Pedir: Could you + verbo?", "Could you sign here, please?"],
    ),
    vocab: [
      v("Offer", "Ofrecer / Oferta", "We can offer you a better price"),
      v("Deal", "Trato / Acuerdo", "It's a deal!"),
      v("Quote", "Presupuesto (cotización)", "Shall I send you a quote?"),
      v("Customer service", "Atención al cliente", "Call customer service for help"),
    ],
    replace: {
      ex4_client_meeting: dialog("Simulación: Reunión con Cliente", "Te reúnes con un cliente importante", [
        ["Client", "What are you currently negotiating?", "We're negotiating the contract details.", "We negotiating the contract details.", "Falta 'are'."],
        ["Client", "Could you send me the final price?", "Of course. I'll send it this afternoon.", "Of course. I send it this afternoon tomorrow.", "Ofrecimiento: 'I'll'."],
        ["Client", "Thank you. Would you like to sign on Friday?", "Yes, Friday would be perfect.", "Yes, Friday would being perfect.", "'would' + verbo base."],
      ]),
    },
    add: [
      fill("Ofrecer y pedir", [
        "___ I send you the contract? (ofrecer) | Shall | Will, Do",
        "I ___ call you back in five minutes. | will | am, going",
        "Would you ___ some coffee? | like | likes, liking",
        "___ you sign here, please? | Could | Shall, Must",
        "We can offer you a 10% ___. | discount | deal, client",
      ]),
      match("Con clientes", [
        "Offer = Ofrecer",
        "Deal = Trato",
        "Quote = Presupuesto",
        "Customer service = Atención al cliente",
        "Sign = Firmar",
        "Agreement = Acuerdo",
      ], "Une cada expresión con su traducción."),
      build("Shall I", "📄 ¿Le envío el presupuesto?", "Shall I send you the quote", ["will", "sends"]),
      build("I'll", "📞 Lo llamo esta tarde", "I'll call you back this afternoon", ["calling", "am"]),
    ],
  },

  A2_professional_presentations: {
    objectives: ["Organizar una presentación", "Usar conectores de orden (first, then, finally)", "Presentar con 'I'm going to talk about...'"],
    grammar: g(
      "Conectores para presentaciones",
      "Los conectores ordenan las ideas y ayudan al público a seguirte.",
      ["Empezar", "First, … / Today I'm going to talk about…"],
      ["Continuar", "Then, … / Next, … / After that, …"],
      ["Terminar", "Finally, … / To sum up, …"],
      ["Invitar preguntas", "Are there any questions?"],
      ["Anunciar lo que harás: going to / will", "First, I'll introduce the topic. Then I'll show some charts."],
    ),
    vocab: [
      v("Introduction", "Introducción", "The introduction should be short"),
      v("Conclusion", "Conclusión", "Finish with a clear conclusion"),
      v("Chart", "Gráfico", "This chart shows our sales"),
      v("Question", "Pregunta", "Are there any questions?"),
    ],
    replace: {
      ex4_presentation_prep: dialog("Simulación: Preparación de Presentación", "Un colega te ayuda a preparar una presentación", [
        ["Colleague", "What presentation are you preparing for tomorrow?", "I'm preparing the sales report.", "I preparing the sales report.", "Falta 'am'."],
        ["Colleague", "How will you start?", "First, I'll introduce the topic. Then I'll show the charts.", "Finally, I'll introduce the topic. First, I'll show the charts.", "Orden lógico: First… Then…"],
      ]),
    },
    add: [
      fill("Conectores", [
        "___, I'm going to introduce the topic. (al principio) | First | Finally, To sum up",
        "___ that, I'll show you some charts. | After | Before, First",
        "___, are there any questions? (al final) | Finally | First, Next",
        "To ___ up, sales are growing. | sum | finish, end",
        "Today I'm going to ___ about our results. | talk | talking, to talk",
      ]),
      match("Presentaciones", [
        "Introduction = Introducción",
        "Conclusion = Conclusión",
        "Chart = Gráfico",
        "Question = Pregunta",
        "Topic = Tema",
        "Speaker = Orador",
      ], "Une cada palabra con su traducción."),
      build("Empezar", "🎤 Primero voy a presentar el tema", "First I will introduce the topic", ["finally", "introducing"]),
      drag("Orden de la presentación", [
        "1 = Introduce the topic",
        "2 = Present the main points",
        "3 = Show charts and examples",
        "4 = Summarize and take questions",
      ], "Arrastra cada paso hasta su lugar en la presentación."),
    ],
  },

  A2_remote_work_skills: {
    objectives: ["Hablar del trabajo remoto", "Usar el presente continuo para tendencias actuales", "Resolver problemas en videollamadas"],
    grammar: g(
      "Presente continuo para tendencias",
      "Además de lo que pasa ahora mismo, el presente continuo describe cambios y tendencias de esta época.",
      ["Tendencia: am / is / are + -ing + nowadays / these days", "More people are working from home nowadays.", "Companies are using more online tools."],
      ["Ahora mismo", "Sorry, I'm checking my microphone."],
      ["Instrucciones en una llamada: imperativo", "Mute your microphone.", "Share your screen, please."],
      ["Can you...? para pedir", "Can you share your screen, please?"],
    ),
    vocab: [
      v("Video call", "Videollamada", "We have a video call at 3"),
      v("Connection", "Conexión", "My connection is slow today"),
      v("Mute", "Silenciar", "Please mute your microphone"),
      v("Share screen", "Compartir pantalla", "Can you share your screen?"),
    ],
    replace: {
      ex4_virtual_meeting: dialog("Simulación: Reunión Virtual", "Participas en una reunión por videollamada", [
        ["Team leader", "How are you managing remote work this week?", "I'm working from home and using video calls.", "I work from home now this week and using video calls.", "'This week': presente continuo."],
        ["Team leader", "Your sound is bad. Can you check it?", "Sorry, I'm checking my microphone now.", "Sorry, I check my microphone now at the moment.", "Ahora mismo: presente continuo."],
      ]),
    },
    add: [
      fill("Trabajo remoto", [
        "More people ___ from home nowadays. | are working | work now, is working",
        "Sorry, my connection ___ very slow today. | is | are, be",
        "Can you ___ your screen, please? | share | sharing, shares",
        "Please ___ your microphone when you're not speaking. | mute | muted, muting",
        "Companies ___ more online tools these days. | are using | use now, uses",
      ]),
      match("Videollamadas", [
        "Video call = Videollamada",
        "Connection = Conexión",
        "Mute = Silenciar",
        "Share screen = Compartir pantalla",
        "Camera = Cámara",
        "Headset = Auriculares con micrófono",
      ], "Une cada expresión con su traducción."),
      build("Tendencia", "💼 Más empresas están contratando trabajadores remotos", "More companies are hiring remote workers", ["hire", "is"]),
      build("Pedido", "🖥️ ¿Puedes compartir tu pantalla, por favor?", "Can you share your screen please", ["sharing", "do"]),
      drag("Problema → solución", [
        "I can't hear you = Check your microphone",
        "Your video is frozen = Restart your camera",
        "The connection is slow = Turn off your video",
        "There's background noise = Mute your microphone",
      ], "Arrastra cada problema hasta su solución."),
    ],
  },

  A2_work_life_balance: {
    objectives: ["Hablar del equilibrio entre trabajo y vida personal", "Usar too much / too many / enough", "Dar consejos para reducir el estrés"],
    grammar: g(
      "Too much, too many, enough",
      "'Too' indica exceso (más de lo necesario) y 'enough', cantidad suficiente.",
      ["too much + incontable", "I have too much work.", "There is too much stress."],
      ["too many + contable plural", "I have too many meetings.", "She works too many hours."],
      ["enough + sustantivo (antes)", "I don't have enough time."],
      ["adjetivo / verbo + enough (después)", "I'm not sleeping enough.", "The office isn't big enough."],
    ),
    vocab: [
      v("Overtime", "Horas extra", "I work overtime every week"),
      v("Day off", "Día libre", "I need a day off"),
      v("Workload", "Carga de trabajo", "My workload is too heavy"),
      v("Burnout", "Agotamiento (laboral)", "Too much work can cause burnout"),
    ],
    replace: {
      ex3_balance_conversation: dialog("Conversación sobre Equilibrio", "Un amigo te pregunta cómo estás con el trabajo", [
        ["Friend", "How are you balancing work and life?", "Not very well. I have too much work.", "Not very well. I have too many work.", "'Work' es incontable: 'too much'."],
        ["Friend", "Do you have time to relax?", "No, I don't have enough free time.", "No, I don't have free time enough.", "'Enough' va antes del sustantivo."],
      ]),
    },
    add: [
      fill("Too much, too many, enough", [
        "I have too ___ emails every day. | many | much, enough",
        "She works too ___ hours. | many | much, lot",
        "I don't have ___ time to exercise. | enough | too, many",
        "There is too ___ stress at my job. | much | many, enough",
        "I'm not sleeping ___. | enough | too much, many",
      ]),
      match("Equilibrio", [
        "Overtime = Horas extra",
        "Day off = Día libre",
        "Workload = Carga de trabajo",
        "Burnout = Agotamiento",
        "Vacation = Vacaciones",
        "Break = Descanso",
      ], "Une cada palabra con su traducción."),
      build("Enough", "⏳ No tengo suficiente tiempo libre", "I don't have enough free time", ["too", "many"]),
      build("Too much", "📚 Mi jefe me da demasiado trabajo", "My boss gives me too much work", ["many", "enough"]),
      cat("¿Too much o too many?", [
        ["Too much", ["work", "stress", "noise"]],
        ["Too many", ["emails", "meetings", "hours"]],
      ], "Clasifica cada sustantivo."),
      drag("Problema → consejo", [
        "I work too many hours = Ask for a day off",
        "I have too much stress = Try yoga or meditation",
        "I don't sleep enough = Go to bed earlier",
        "I have too many meetings = Cancel the less important ones",
      ], "Arrastra cada problema hasta su consejo."),
    ],
  },

  A2_future_plans: {
    objectives: ["Hablar de planes e intenciones", "Elegir entre going to y will", "Hacer predicciones"],
    grammar: g(
      "Futuro con 'going to' y 'will'",
      "Los dos hablan del futuro, pero se usan en situaciones distintas.",
      ["going to = plan ya decidido", "We are going to visit Paris in July. (ya compramos los pasajes)"],
      ["going to = predicción con evidencia", "Look at those clouds! It's going to rain."],
      ["will = decisión en el momento / ofrecimiento", "I'm hungry. I think I'll make a sandwich.", "I'll help you."],
      ["will = predicción u opinión / promesa", "I think robots will do many jobs.", "I promise I won't tell anyone."],
    ),
    vocab: [
      v("Plan", "Plan / Planear", "What are your plans for next year?"),
      v("Intention", "Intención", "My intention is to study abroad"),
      v("Predict", "Predecir", "Nobody can predict the future"),
      v("Probably", "Probablemente", "I will probably travel next summer"),
      v("Decide", "Decidir", "I decided to change jobs"),
    ],
    fix: (exs) => {
      // "I will study at the university" necesitaba "at", que no estaba en el banco
      exs.find((e) => e.id === "ex2_future_sentences").config.wordBank.push("at");
    },
    replace: {
      ex3_future_plans_dialogue: dialog("Diálogo: Planes Futuros", "Un amigo te pregunta por tus planes", [
        ["Friend", "What are your plans for next year?", "I'm going to study abroad.", "I'm going study abroad.", "Falta 'to'."],
        ["Friend", "Where are you going to study?", "I'm not sure yet. I think I'll choose Canada.", "I'm not sure yet. I think I going to choose Canada.", "Decisión todavía dudosa: 'I think I'll'."],
      ]),
    },
    add: [
      fill("¿Going to o will?", [
        "Look at those clouds! It ___ rain. | is going to | will, going",
        "I'm hungry. I think I ___ make a sandwich. | will | am going, going to",
        "We booked the tickets. We ___ visit Paris in July. | are going to | will, going",
        "I promise I ___ help you. | will | am going, going",
        "She ___ start a new job next month. (plan) | is going to | will to, going",
      ]),
      fill("Predicciones con will", [
        "I think robots ___ do many jobs in the future. | will | are, going",
        "I'm sure you ___ pass the exam. | will | are, going",
        "___ you help me tomorrow? | Will | Are, Going",
        "Don't worry, I ___ tell anyone. | won't | don't, am not",
      ]),
      match("Futuro", [
        "Plan = Plan",
        "Intention = Intención",
        "Predict = Predecir",
        "Probably = Probablemente",
        "Decide = Decidir",
      ], "Une cada palabra con su traducción."),
      build("Un plan", "💼 Voy a empezar mi propio negocio", "I am going to start my own business", ["will", "starting"]),
      build("Una predicción", "🌟 Creo que va a ser un gran año", "I think it will be a great year", ["going", "is"]),
      cat("¿Going to o will?", [
        ["Going to", ["I'm going to study medicine (plan)", "Look! It's going to rain (evidencia)"]],
        ["Will", ["I'll help you (ofrecimiento)", "I think she'll win (opinión)", "I'll have the soup (decisión)"]],
      ]),
      drag("Situación → frase", [
        "You already bought plane tickets = I'm going to travel to Rome",
        "The phone is ringing = I'll answer it",
        "Your friend is sad = I'll call her",
        "You see dark clouds = It's going to rain",
      ], "Arrastra cada situación hasta la frase adecuada."),
    ],
  },
};
