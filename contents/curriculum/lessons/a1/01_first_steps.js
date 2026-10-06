const { v, g, match, memory, fill, build, drag, cat, conj, dialog } = require("../../helpers");

// Unidad "Primeros Pasos" — guía A1 clases 1 y 3 (saludos, presentaciones, verbo to be)
module.exports = {
  A1_greetings_basic: {
    objectives: ["Saludar y despedirse", "Usar el verbo 'to be' con I, you, he, she, it", "Responder a 'How are you?'"],
    grammar: g(
      "Verbo 'to be' (ser / estar)",
      "En inglés un solo verbo, 'to be', significa tanto 'ser' como 'estar'. Cambia según la persona.",
      ["I + am", "I am Maria. (Soy María)", "I am fine. (Estoy bien)"],
      ["You + are", "You are my friend. (Eres mi amigo)"],
      ["He / She / It + is", "He is John.", "She is fine.", "It is a good day."],
      ["Al hablar se suele contraer", "I am → I'm", "You are → You're", "She is → She's"],
    ),
    vocab: [
      v("Please", "Por favor", "Water, please"),
      v("Good morning", "Buenos días", "Good morning, Maria!"),
      v("Good night", "Buenas noches", "Good night, see you tomorrow"),
      v("You're welcome", "De nada", "Thank you! — You're welcome"),
    ],
    replace: {
      ex4_basic_introduction: dialog("Simulación: Presentación Básica", "Conoces a alguien por primera vez", [
        ["Person", "Hello, what is your name?", "My name is Carlos.", "I am fine, thank you.", "Te preguntan tu nombre."],
        ["Person", "Nice to meet you, Carlos. How are you today?", "I am fine, thank you.", "My name is Carlos.", "Te preguntan cómo estás."],
      ]),
    },
    add: [
      memory("Memory: Saludos y cortesía", [
        "Good morning = Buenos días",
        "Good night = Buenas noches",
        "Please = Por favor",
        "You're welcome = De nada",
        "How are you? = ¿Cómo estás?",
      ]),
      fill("Completa con am / is / are", [
        "I ___ Maria. | am | is, are",
        "You ___ my friend. | are | am, is",
        "She ___ fine. | is | am, are",
        "He ___ a student. | is | are, am",
        "It ___ a good day. | is | am, are",
      ]),
      build("Saluda por la mañana", "🌅 Buenos días, ¿cómo estás?", "Good morning how are you", ["is", "night"]),
      drag("¿Qué respondes?", [
        "How are you? = I am fine, thank you",
        "Thank you = You're welcome",
        "Hello! = Hi!",
        "Goodbye! = See you tomorrow!",
      ], "Arrastra cada frase hasta su respuesta."),
      cat("¿Saludo o despedida?", [
        ["Saludos", ["Hello", "Hi", "Good morning"]],
        ["Despedidas", ["Goodbye", "Good night", "See you tomorrow"]],
      ]),
      build("Da las gracias", "🙏 Gracias por tu ayuda", "Thank you for your help", ["are", "please"]),
    ],
  },

  A1_introducing_yourself: {
    objectives: ["Decir tu nombre", "Decir de dónde eres", "Decir a qué te dedicas"],
    grammar: g(
      "Presentarte con 'I am'",
      "Para presentarte usas 'I am' (o 'My name is') seguido de tu nombre, tu país o tu ocupación.",
      ["Nombre: My name is... / I am...", "My name is Laura.", "I am Laura."],
      ["Origen: I am from + país", "I am from Mexico. (Soy de México)"],
      ["Ocupación: I am a / an + profesión", "I am a student.", "I am an engineer."],
      ["En inglés la profesión siempre lleva 'a' o 'an'", "✅ I am a teacher.", "❌ I am teacher."],
    ),
    vocab: [
      v("Student", "Estudiante", "I am a student"),
      v("Teacher", "Profesor/a", "She is a teacher"),
      v("Country", "País", "Mexico is my country"),
      v("Friend", "Amigo/a", "This is my friend"),
    ],
    replace: {
      ex4_full_introduction: dialog("Simulación: Presentación Completa", "Te presentas en una clase de inglés", [
        ["Teacher", "Please introduce yourself to the class.", "Hello, my name is Laura.", "Goodbye, see you tomorrow.", "Tienes que presentarte."],
        ["Teacher", "Where are you from, Laura?", "I am from Brazil.", "I am a Brazil.", "Usa 'from' + país."],
        ["Teacher", "Welcome to the class!", "Thank you. Nice to meet you.", "You're welcome. Goodbye.", "Te dan la bienvenida: agradece."],
      ]),
    },
    add: [
      fill("Completa la presentación", [
        "My ___ is Laura. | name | country, friend",
        "I am ___ Italy. | from | to, at",
        "Nice to ___ you. | meet | name, be",
        "I ___ a student. | am | is, are",
        "She ___ from Brazil. | is | am, are",
      ]),
      match("Frases para presentarte", [
        "I am from Mexico = Soy de México",
        "I am a student = Soy estudiante",
        "This is my friend = Este es mi amigo",
        "I am 20 years old = Tengo 20 años",
      ], "Une cada frase con su significado."),
      build("Di tu profesión", "👩‍🏫 Soy profesora", "I am a teacher", ["is", "from"]),
      build("Nombre y país", "🌎 Me llamo Ana y soy de Perú", "My name is Ana and I am from Peru", ["are"]),
      drag("Pregunta y respuesta", [
        "What is your name? = My name is Carlos",
        "Where are you from? = I am from Spain",
        "What do you do? = I am a student",
        "Nice to meet you = Nice to meet you too",
      ], "Arrastra cada pregunta hasta su respuesta."),
      cat("¿Nombre o país?", [
        ["Nombres", ["Laura", "Carlos", "Ana"]],
        ["Países", ["Italy", "Brazil", "Spain"]],
      ]),
    ],
  },

  A1_asking_names: {
    objectives: ["Preguntar el nombre de alguien", "Diferenciar nombre y apellido", "Pedir que deletreen un nombre"],
    grammar: g(
      "Preguntas con 'What' y 'How'",
      "En las preguntas con 'to be' el verbo va antes del sujeto. 'Your' significa 'tu' y 'my' significa 'mi'.",
      ["What + is + your...?", "What is your name?", "What is your last name?"],
      ["Respuesta con 'My'", "My name is David.", "My last name is Smith."],
      ["How do you spell...? (¿Cómo se deletrea?)", "How do you spell your name? — D-A-V-I-D."],
      ["Contracción frecuente", "What is → What's", "What's your name?"],
    ),
    vocab: [
      v("Last name", "Apellido", "My last name is Smith"),
      v("Full name", "Nombre completo", "My full name is David Smith"),
      v("Nickname", "Apodo", "My nickname is Dave"),
      v("How do you spell it?", "¿Cómo se deletrea?", "How do you spell it? — D-A-V-E"),
    ],
    replace: {
      ex3_questions_with_to_be: fill("Preguntas con 'to be'", [
        "What ___ your name? | is | are, am",
        "How ___ you? | are | is, am",
        "Where ___ you from? | are | is, am",
        "What ___ his name? | is | are, am",
        "___ that your last name? | Is | Are, Am",
      ]),
      ex4_name_conversation: dialog("Simulación: Conversación de Nombres", "Conoces a una compañera nueva", [
        ["Sophie", "Hi! What is your name?", "My name is Daniel.", "Your name is Daniel.", "Usa 'My name is...'"],
        ["Sophie", "How do you spell your last name?", "P-E-R-E-Z.", "I am fine, thanks.", "Te piden deletrear."],
        ["Sophie", "Nice to meet you, Daniel.", "Nice to meet you too.", "What is my name?", "Responde al saludo."],
      ]),
    },
    add: [
      memory("Memory: Nombres", [
        "Last name = Apellido",
        "Full name = Nombre completo",
        "Nickname = Apodo",
        "First name = Nombre de pila",
        "To spell = Deletrear",
      ]),
      build("Pregunta el apellido", "❓ ¿Cuál es tu apellido?", "What is your last name", ["are", "my"]),
      build("Di tu apellido", "🪪 Mi apellido es García", "My last name is Garcia", ["your", "are"]),
      fill("¿My o your?", [
        "What is ___ name? (tú) | your | my, I",
        "___ name is David. (yo) | My | Your, I",
        "Can you spell ___ last name? (tú) | your | you, my",
        "___ first name is Maria. (yo) | My | Me, I",
      ]),
      drag("Pregunta y respuesta", [
        "What is your name? = My name is Sophie",
        "How do you spell it? = S-O-P-H-I-E",
        "What is your last name? = My last name is Brown",
        "Is Sophie your first name? = Yes, it is",
      ], "Arrastra cada pregunta hasta su respuesta."),
      cat("¿Nombre o apellido?", [
        ["First name", ["Maria", "David", "Sophie"]],
        ["Last name", ["Garcia", "Smith", "Brown"]],
      ]),
    ],
  },

  A1_personal_info: {
    grammar: g(
      "'To be', 'to have' y adjetivos posesivos",
      "Con 'to be' dices quién eres y con 'to have' dices lo que tienes. Los adjetivos posesivos indican de quién es algo.",
      ["To be: am / is / are", "I am a student.", "She is my mother.", "They are from Spain."],
      ["To have: have / has (has solo con he, she, it)", "I have one sister.", "My father has a car."],
      ["Posesivos: my, your, his, her, our, their", "My name is John.", "Her brother is tall.", "Their house is big."],
      ["La edad se dice con 'to be', no con 'to have'", "✅ I am 25 years old.", "❌ I have 25 years."],
    ),
    replace: {
      ex5_verb_to_be_conjugation_2: fill("Completa con 'To Be' - Ejercicio 1", [
        "I ___ Maria. | am | is, are",
        "You ___ my friend. | are | am, is",
        "He ___ my brother. | is | am, are",
        "We ___ a family. | are | is, am",
        "It ___ my country. | is | am, are",
      ]),
      ex6_verb_to_be_conjugation_3: fill("Completa con 'To Be' - Ejercicio 2", [
        "I ___ 25 years old. | am | is, are",
        "She ___ my mother. | is | am, are",
        "We ___ students. | are | is, am",
        "He ___ a doctor. | is | are, am",
        "They ___ from Spain. | are | is, am",
      ]),
    },
  },

  A1_personal_pronouns: {
    objectives: ["Reconocer los pronombres personales", "Elegir el pronombre correcto para cada persona", "Combinar pronombre + to be"],
    grammar: g(
      "Pronombres personales (sujeto)",
      "El pronombre dice quién hace la acción. En inglés nunca se omite: siempre hay que decirlo.",
      ["Singular: I, you, he, she, it", "I am Ana.", "He is my brother.", "It is a book."],
      ["Plural: we, you, they", "We are friends.", "They are teachers."],
      ["'I' siempre se escribe con mayúscula", "My friend and I are students."],
      ["'It' se usa para cosas y animales", "This is my dog. It is small."],
      ["En español se puede omitir, en inglés no", "✅ She is from Mexico.", "❌ Is from Mexico."],
    ),
    vocab: [
      v("We", "Nosotros/as", "We are friends"),
      v("They", "Ellos/Ellas", "They are from Peru"),
      v("You (plural)", "Ustedes / Vosotros", "You are my students"),
    ],
    add: [
      fill("Elige el pronombre", [
        "___ am a student. | I | He, They",
        "Maria is my sister. ___ is a doctor. | She | He, It",
        "Tom and Ana are friends. ___ are from Peru. | They | We, He",
        "My brother and I are tall. ___ are tall. | We | They, You",
        "This is my book. ___ is new. | It | He, She",
      ]),
      drag("Reemplaza por el pronombre", [
        "Maria = She",
        "Carlos = He",
        "The book = It",
        "Ana and Tom = They",
        "My friend and I = We",
      ], "Arrastra cada persona o cosa hasta su pronombre."),
      build("Nosotros", "👫 Nosotros somos amigos", "We are friends", ["is", "am"]),
      build("Ellos", "🇲🇽 Ellos son de México", "They are from Mexico", ["is", "he"]),
      conj("Pronombre + to be", "to be", "Present", {
        I: "am", You: "are", He: "is", She: "is", It: "is", We: "are", They: "are",
      }),
    ],
  },

  A1_greetings: {
    objectives: ["Saludar según el momento del día", "Despedirse de distintas formas", "Distinguir saludos formales e informales"],
    grammar: g(
      "Saludos según el momento del día",
      "El saludo cambia con la hora. Ojo: 'Good evening' es para saludar al llegar de noche y 'Good night' solo para despedirse o ir a dormir.",
      ["Mañana (hasta las 12)", "Good morning!"],
      ["Tarde (12 a 18 aprox.)", "Good afternoon!"],
      ["Noche, al llegar", "Good evening!"],
      ["Noche, al irse o ir a dormir", "Good night!"],
      ["Informal: Hi / Bye — Formal: Hello / Goodbye", "Hi, Tom!", "Goodbye, Mr. Smith."],
      ["Responder a 'How are you?' y devolver la pregunta", "I'm fine, thanks. And you?", "Very well, thank you."],
      ["Al conocer a alguien", "Nice to meet you. (Encantado/a)", "Nice to meet you too. (Igualmente)"],
    ),
    vocab: [
      v("Good morning", "Buenos días", "Good morning, class!"),
      v("Good afternoon", "Buenas tardes", "Good afternoon, Mr. Smith"),
      v("Good evening", "Buenas noches (al llegar)", "Good evening, welcome!"),
      v("See you later", "Hasta luego", "Bye! See you later"),
      v("Bye", "Chau / Adiós", "Bye, Tom!"),
      v("Welcome", "Bienvenido/a", "Welcome to my house"),
      v("Good night", "Buenas noches (al despedirse)", "Good night, Mom!"),
      v("See you soon", "Hasta pronto", "Bye, Anna! See you soon"),
      v("Take care", "Cuídate", "Goodbye and take care!"),
      v("Nice to meet you", "Encantado/a de conocerte", "Hi, I'm Tom. — Nice to meet you!"),
    ],
    add: [
      match("Saludos del día", [
        "Good morning = Buenos días",
        "Good afternoon = Buenas tardes",
        "Good evening = Buenas noches (al llegar)",
        "Good night = Buenas noches (al despedirse)",
      ], "Une cada saludo con su significado."),
      memory("Memory: Despedidas", [
        "See you later = Hasta luego",
        "Bye = Chau",
        "Welcome = Bienvenido",
        "See you soon = Hasta pronto",
        "Take care = Cuídate",
      ]),
      cat("¿Formal o informal?", [
        ["Formal", ["Good morning", "Good evening", "How do you do?"]],
        ["Informal", ["Hi", "Bye", "What's up?"]],
      ]),
      drag("¿Qué saludo usas?", [
        "8:00 AM = Good morning",
        "3:00 PM = Good afternoon",
        "7:00 PM = Good evening",
        "11:00 PM (a dormir) = Good night",
      ], "Arrastra cada hora hasta el saludo correcto."),
      fill("Completa los saludos", [
        "Good ___! It is 9 AM. | morning | night, evening",
        "___, see you tomorrow! | Goodbye | Hello, Welcome",
        "Hello, my name ___ John. | is | am, are",
        "See you ___! | later | hello, morning",
        "___ to my house! | Welcome | Goodbye, Bye",
      ]),
      build("Preséntate", "👋 Hola, mi nombre es John", "Hello my name is John", ["are", "bye"]),
      build("Despídete", "👋 Adiós, nos vemos mañana", "Goodbye see you tomorrow", ["hello", "is"]),
      dialog("Simulación: En la calle", "Te encuentras con una vecina por la mañana", [
        ["Emma", "Good morning! How are you?", "Good morning! I am fine, thank you.", "Good night! I am John.", "Es de mañana: responde con 'Good morning'."],
        ["Emma", "Nice to see you. Goodbye!", "Bye! See you later.", "Hello! Welcome.", "Emma se está despidiendo."],
      ]),
      dialog("Simulación: En la oficina", "Llegas a una reunión a las 3 de la tarde", [
        ["Mr. Smith", "Good afternoon! I'm Robert Smith.", "Good afternoon, Mr. Smith. Nice to meet you.", "Good morning! What's up?", "Son las 3 PM y es una situación formal."],
        ["Mr. Smith", "Nice to meet you too. How are you?", "Very well, thank you. And you?", "Good night, Mr. Smith.", "Responde cómo estás y devuelve la pregunta."],
        ["Mr. Smith", "I'm fine, thanks. Welcome to the company!", "Thank you very much.", "You're welcome.", "Te dan la bienvenida: agradece."],
      ]),
      match("¿Cómo respondes?", [
        "How are you? = I'm fine, thanks. And you?",
        "Nice to meet you. = Nice to meet you too.",
        "Thank you! = You're welcome.",
        "See you later! = Bye! Take care.",
      ], "Une cada frase con la respuesta adecuada."),
      build("Saludo formal", "🏢 Buenas tardes, señor Smith. Encantado de conocerlo.", "Good afternoon Mr Smith Nice to meet you", ["morning", "hi"]),
    ],
  },
};
