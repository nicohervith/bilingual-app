const { v, g, match, memory, fill, build, drag, cat, dialog } = require("../../helpers");

// Unidades "Conociendo Personas" y "Números y Colores" — guía A1 clases 1, 2 y 3
module.exports = {
  A1_meeting_people: {
    objectives: ["Presentar a otra persona", "Usar 'This is' y 'These are'", "Responder cuando te presentan a alguien"],
    grammar: g(
      "Presentar a alguien: This is / These are",
      "Para presentar a una persona se usa 'This is'. Para presentar a varias, 'These are'.",
      ["Una persona: This is + nombre", "This is my friend Maria.", "This is Mr. Brown."],
      ["Varias personas: These are + nombres", "These are my friends, Tom and Ana."],
      ["Después puedes dar más datos con he / she / they", "This is Ana. She is my sister.", "These are Tom and Leo. They are my neighbors."],
      ["Respuestas habituales", "Nice to meet you.", "Pleased to meet you."],
    ),
    vocab: [
      v("Colleague", "Colega / Compañero de trabajo", "This is my colleague, Mr. Brown"),
      v("Neighbor", "Vecino/a", "This is my neighbor Tom"),
      v("Classmate", "Compañero/a de clase", "These are my classmates"),
      v("Let me introduce", "Permíteme presentar", "Let me introduce my friend"),
    ],
    replace: {
      ex4_group_introduction: dialog("Simulación: Presentación en Grupo", "Estás en una reunión y te presentan a alguien", [
        ["Host", "This is my colleague, Mr. Brown.", "Pleased to meet you, Mr. Brown.", "Goodbye, Mr. Brown.", "Te lo están presentando, no te despidas."],
        ["Mr. Brown", "Nice to meet you too. Who is your friend?", "This is my friend Anna.", "These is my friend Anna.", "Para una persona: 'This is'."],
      ]),
    },
    add: [
      match("Personas que conoces", [
        "Colleague = Colega",
        "Neighbor = Vecino",
        "Classmate = Compañero de clase",
        "Friend = Amigo",
        "Boss = Jefe",
      ], "Une cada palabra con su traducción."),
      fill("¿This o these?", [
        "___ is my friend Maria. | This | These, They",
        "___ are my friends Tom and Ana. | These | This, He",
        "This ___ my colleague. | is | are, am",
        "These ___ my neighbors. | are | is, am",
        "Pleased to ___ you. | meet | introduce, be",
      ]),
      build("Presenta a tu vecino", "🏠 Te presento a mi vecino Tom", "This is my neighbor Tom", ["are", "these"]),
      build("Presenta a varios", "🎒 Te presento a mis compañeros de clase", "These are my classmates", ["is", "this"]),
      drag("¿Qué respondes?", [
        "This is my friend Anna = Nice to meet you, Anna",
        "Pleased to meet you = Pleased to meet you too",
        "Who is this? = This is my colleague",
        "Are these your friends? = Yes, these are my friends",
      ], "Arrastra cada frase hasta su respuesta."),
    ],
  },

  A1_introductions_names: {
    objectives: ["Decir tu nombre y el de otras personas", "Usar my, your, his y her", "Usar Mr., Mrs. y Miss"],
    grammar: g(
      "My, your, his, her + name",
      "Los adjetivos posesivos van antes del sustantivo e indican de quién es el nombre.",
      ["my = mi", "My name is Maria."],
      ["your = tu / su (de usted)", "What is your name?"],
      ["his = su (de él)", "This is my brother. His name is Pablo."],
      ["her = su (de ella)", "This is my sister. Her name is Julia."],
      ["En español 'su' sirve para todo; en inglés hay que elegir", "his name (de él) ≠ her name (de ella)"],
    ),
    vocab: [
      v("His name", "Su nombre (de él)", "His name is Pablo"),
      v("Her name", "Su nombre (de ella)", "Her name is Julia"),
      v("Mr.", "Señor (Sr.)", "Good morning, Mr. Smith"),
      v("Mrs.", "Señora (Sra.)", "This is Mrs. Brown"),
    ],
    replace: {
      ex4_name_introduction: dialog("Simulación: Intercambiar Nombres", "Conoces a alguien nuevo en una fiesta", [
        ["New friend", "What is your name?", "My name is Carlos.", "His name is Carlos.", "Hablas de ti: 'My name'."],
        ["New friend", "Nice to meet you, Carlos. Who is she?", "She is my sister. Her name is Julia.", "She is my sister. His name is Julia.", "Para ella se usa 'her'."],
      ]),
    },
    add: [
      fill("¿His o her?", [
        "This is my brother. ___ name is Pablo. | His | Her, My",
        "This is my sister. ___ name is Julia. | Her | His, Your",
        "I am John. ___ name is John. | My | His, Her",
        "What is ___ name? (de ella) | her | his, she",
        "What is ___ name? (de él) | his | her, he",
      ]),
      match("¿De quién es el nombre?", [
        "My name = Mi nombre",
        "Your name = Tu nombre",
        "His name = Su nombre (de él)",
        "Her name = Su nombre (de ella)",
      ], "Une cada expresión con su significado."),
      build("El nombre de él", "👦 Su nombre es Pablo", "His name is Pablo", ["her", "are"]),
      build("El nombre de ella", "👧 Su nombre es Julia", "Her name is Julia", ["his", "am"]),
      drag("Títulos de cortesía", [
        "Mr. = Señor",
        "Mrs. = Señora (casada)",
        "Miss = Señorita",
        "Ms. = Señora o señorita (neutro)",
      ], "Arrastra cada título hasta su significado."),
    ],
  },

  A1_meeting_people_formal: {
    objectives: ["Saludar en situaciones formales", "Usar títulos (Mr., Mrs., sir, madam)", "Distinguir lenguaje formal e informal"],
    grammar: g(
      "Lenguaje formal",
      "En situaciones formales (trabajo, personas mayores, desconocidos) se usan saludos completos y título + apellido.",
      ["Título + apellido (nunca título + nombre de pila)", "✅ Good afternoon, Mr. Johnson.", "❌ Good afternoon, Mr. David."],
      ["Sin apellido: sir (hombre) / madam (mujer)", "Excuse me, sir.", "Thank you, madam."],
      ["'How do you do?' es un saludo formal, no una pregunta real", "How do you do? — How do you do?"],
      ["Informal → formal", "Hi → Good afternoon", "Nice to meet you → Pleased to meet you"],
    ),
    vocab: [
      v("Sir", "Señor (sin apellido)", "Excuse me, sir"),
      v("Madam", "Señora (sin apellido)", "Good evening, madam"),
      v("Excuse me", "Disculpe", "Excuse me, are you Mr. Johnson?"),
      v("Good evening", "Buenas noches (al llegar)", "Good evening, Mrs. Brown"),
    ],
    replace: {
      ex4_formal_meeting: dialog("Simulación: Reunión Formal", "Tienes una reunión de trabajo", [
        ["Mr. Johnson", "Good afternoon, I am Mr. Johnson.", "Good afternoon, Mr. Johnson. Pleased to meet you.", "Hey! What's up?", "Es una situación formal."],
        ["Mr. Johnson", "This is my colleague, Ms. Garcia.", "How do you do, Ms. Garcia?", "Bye, Ms. Garcia.", "Te la están presentando."],
      ]),
    },
    add: [
      cat("¿Formal o informal?", [
        ["Formal", ["Good afternoon", "How do you do?", "Pleased to meet you"]],
        ["Informal", ["Hi!", "What's up?", "Hey!"]],
      ]),
      fill("Completa las frases formales", [
        "Good afternoon, ___ Johnson. (a un hombre) | Mr. | Mrs., Miss",
        "How do you ___? | do | are, is",
        "Excuse ___, are you Mrs. Brown? | me | I, my",
        "Pleased to meet you, ___. (a un hombre) | sir | madam, miss",
        "This ___ my colleague, Ms. Garcia. | is | are, am",
      ]),
      build("Pregunta con cortesía", "🤝 Disculpe, ¿es usted el Sr. Johnson?", "Excuse me are you Mr Johnson", ["is", "do"]),
      drag("De informal a formal", [
        "Hi! = Good afternoon",
        "What's up? = How do you do?",
        "Nice to meet you = Pleased to meet you",
        "Bye! = Goodbye",
      ], "Arrastra cada frase informal hasta su versión formal."),
    ],
  },

  A1_numbers: {
    grammar: g(
      "Números, edad y plural",
      "Los números van antes del sustantivo. Con más de uno, el sustantivo lleva -s. La edad se dice con 'to be'.",
      ["Del 13 al 19 terminan en -teen", "thirteen, fourteen, fifteen... nineteen"],
      ["Número + sustantivo en plural", "one apple → two apples", "one book → three books"],
      ["Edad: to be + número + years old", "I am twenty years old.", "She is fifteen years old."],
      ["No se usa 'have' para la edad", "✅ I am ten years old.", "❌ I have ten years."],
    ),
    fixVocab: (vocab) => {
      const nine = vocab.find((w) => w.word === "Nine");
      if (nine) nine.examples = ["Nine players in a baseball team"];
    },
    replace: {
      ex9_age_conversation: dialog("Simulación: Hablando de Edades", "Hablas de edades con un amigo nuevo", [
        ["Friend", "How old are you?", "I am twelve years old.", "I have twelve years.", "La edad va con 'to be'."],
        ["Friend", "How old is your brother?", "He is ten years old.", "He is ten year old.", "Se dice 'years old'."],
      ]),
    },
    add: [
      fill("Números y edad", [
        "I am ten ___ old. | years | year, age",
        "Seven + five = ___ | twelve | eleven, thirteen",
        "I have two ___. | brothers | brother, a brother",
        "Ten + ten = ___ | twenty | twelve, two",
        "She ___ fifteen years old. | is | has, have",
      ]),
      drag("Palabra y cifra", [
        "Eleven = 11",
        "Thirteen = 13",
        "Fifteen = 15",
        "Eighteen = 18",
        "Twenty = 20",
      ], "Arrastra cada número hasta su cifra."),
      build("Di tu edad", "🎂 Tengo dieciocho años", "I am eighteen years old", ["have", "year"]),
    ],
  },

  A1_colors: {
    objectives: ["Nombrar los colores básicos", "Describir objetos con 'to be' + color", "Colocar el color antes del sustantivo"],
    grammar: g(
      "Los colores como adjetivos",
      "En inglés el adjetivo va antes del sustantivo y nunca cambia: no tiene plural ni género.",
      ["Sustantivo + to be + color", "The sky is blue.", "The apples are red."],
      ["Color + sustantivo (al revés que en español)", "✅ a red car", "❌ a car red"],
      ["El color no lleva -s en plural", "✅ two black cats", "❌ two blacks cats"],
      ["Preguntar el color", "What color is it? — It is green."],
    ),
    fix: (exs) => {
      // el resto de la app usa "correct"; esta lección traía "isCorrect"
      const sel = exs.find((e) => e.id === "ex2_colors_selection");
      sel.config.options.forEach((o) => (o.correct = !!o.isCorrect));
    },
    add: [
      fill("¿De qué color?", [
        "The sky is ___. | blue | green, pink",
        "A banana is ___. | yellow | purple, black",
        "I have a ___ car. (rojo) | red | reds, car red",
        "The grass is ___. | green | white, orange",
        "She has two ___ cats. (negros) | black | blacks, cats black",
      ]),
      build("Color + sustantivo", "🚗 Tengo un auto rojo", "I have a red car", ["cars", "is"]),
      cat("Colores cálidos y fríos", [
        ["Cálidos", ["Red", "Orange", "Yellow"]],
        ["Fríos", ["Blue", "Green", "Purple"]],
      ]),
      drag("¿De qué color es?", [
        "The sun = Yellow",
        "The sky = Blue",
        "Grass = Green",
        "Snow = White",
        "Chocolate = Brown",
      ], "Arrastra cada cosa hasta su color."),
      match("Más colores", [
        "Orange = Naranja",
        "Pink = Rosa",
        "Purple = Morado",
        "Brown = Marrón",
        "Black = Negro",
        "White = Blanco",
      ], "Une cada color con su traducción."),
    ],
  },

  A1_nationalities: {
    grammar: g(
      "País y nacionalidad",
      "Hay dos formas de decir de dónde eres: 'from' + país, o 'to be' + nacionalidad. Las dos se escriben con mayúscula.",
      ["to be + from + país", "I am from Spain.", "They are from Mexico."],
      ["to be + nacionalidad", "I am Spanish.", "They are Mexican."],
      ["Terminaciones frecuentes: -an / -ian, -ish, -ese", "Mexico → Mexican", "Spain → Spanish", "China → Chinese"],
      ["Algunas son irregulares", "France → French", "Germany → German"],
      ["Preguntar el origen", "Where are you from?", "Where is she from?"],
    ),
    fix: (exs) => {
      const suffixes = exs.find((e) => e.id === "ex3_nationality_suffixes");
      suffixes.config.pairs.forEach((p) => {
        if (p.from === "USA") p.to = "American (-an)";
        if (p.from === "France") p.to = "French (irregular)";
      });
    },
  },

  A1_greetings_and_nations: {
    objectives: ["Saludar y decir de dónde eres", "Diferenciar país y nacionalidad", "Preguntar 'Where are you from?'"],
    grammar: g(
      "From + país / nacionalidad",
      "Después de saludar, lo más común es decir de dónde eres. Puedes usar el país o la nacionalidad.",
      ["I am from + país", "I am from Spain.", "He is from Mexico."],
      ["I am + nacionalidad (sin 'from')", "I am Spanish.", "He is Mexican."],
      ["No mezcles las dos formas", "❌ I am from Mexican.", "❌ I am Mexico."],
      ["Pregunta", "Where are you from? — I am from Colombia."],
    ),
    vocab: [
      v("Nice to meet you", "Mucho gusto", "Hello, nice to meet you"),
      v("Spanish", "Español/a", "She is Spanish"),
      v("Mexican", "Mexicano/a", "He is Mexican"),
      v("Where are you from?", "¿De dónde eres?", "Where are you from? — I am from Peru"),
      v("Colombia", "Colombia", "We are from Colombia"),
    ],
    add: [
      match("País → nacionalidad", [
        "Spain = Spanish",
        "Mexico = Mexican",
        "Colombia = Colombian",
        "Canada = Canadian",
        "Peru = Peruvian",
      ], "Une cada país con su nacionalidad."),
      fill("¿País o nacionalidad?", [
        "I am ___ Spain. | from | of, in",
        "He is ___. (de México) | Mexican | Mexico, from Mexican",
        "Where ___ you from? | are | is, am",
        "She is from Colombia. She is ___. | Colombian | Colombia, Colombians",
        "Nice to ___ you. | meet | from, are",
      ]),
      build("Pregunta el origen", "❓ ¿De dónde eres?", "Where are you from", ["is", "he"]),
      build("Saluda y di tu país", "👋 Hola, soy de Colombia", "Hello I am from Colombia", ["is", "Mexican"]),
      drag("Pregunta y respuesta", [
        "Where are you from? = I am from Mexico",
        "Is she Spanish? = Yes, she is",
        "Hello! = Hello, nice to meet you",
        "Where is he from? = He is from Spain",
      ], "Arrastra cada frase hasta su respuesta."),
      dialog("Simulación: De dónde eres", "Conoces a una chica en un curso de idiomas", [
        ["Lucia", "Hello! Where are you from?", "I am from Mexico.", "I am Mexico.", "Falta 'from'."],
        ["Lucia", "Oh, you are Mexican! I am from Spain.", "Nice to meet you. You are Spanish.", "Nice to meet you. You are Spain.", "La nacionalidad es 'Spanish'."],
      ]),
    ],
  },
};
