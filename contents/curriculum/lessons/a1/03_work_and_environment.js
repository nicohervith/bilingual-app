const { v, g, match, memory, fill, build, drag, cat, dialog } = require("../../helpers");

// Unidades "Habilidades y Trabajo" y "Mi Entorno Cercano"
// Guía A1 clases 3, 4, 16, 18, 19, 20 y 25. Lecciones nuevas: tecnología y ropa.
module.exports = {
  A1_abilities: {
    objectives: ["Decir lo que sabes y no sabes hacer", "Usar 'can' y 'can't'", "Preguntar por habilidades con 'Can you...?'"],
    grammar: g(
      "Can / can't (poder, saber hacer)",
      "'Can' expresa habilidad. Es igual para todas las personas y va seguido del verbo en su forma base, sin 'to'.",
      ["Afirmativo: sujeto + can + verbo", "I can swim.", "She can sing."],
      ["Negativo: can't (cannot)", "I can't drive.", "He can't cook."],
      ["Pregunta: Can + sujeto + verbo?", "Can you dance? — Yes, I can. / No, I can't."],
      ["Nunca lleva -s ni 'to'", "✅ She can play the piano.", "❌ She cans play.", "❌ She can to play."],
    ),
    vocab: [
      v("Sing", "Cantar", "She can sing very well"),
      v("Dance", "Bailar", "I can't dance"),
      v("Cook", "Cocinar", "My father can cook"),
      v("Drive", "Conducir / Manejar", "Can you drive a car?"),
      v("Draw", "Dibujar", "He can draw animals"),
      v("Run", "Correr", "I can run fast"),
      v("Play the guitar", "Tocar la guitarra", "They can play the guitar"),
    ],
    fix: (exs) => {
      exs.find((e) => e.id === "ex1_abilities").config.pairs.push(
        { from: "Swim", to: "Nadar" },
        { from: "Cook", to: "Cocinar" },
        { from: "Drive", to: "Manejar" },
      );
    },
    add: [
      memory("Memory: Habilidades", [
        "Cook = Cocinar",
        "Drive = Manejar",
        "Draw = Dibujar",
        "Run = Correr",
        "Play the guitar = Tocar la guitarra",
      ]),
      fill("¿Can o can't?", [
        "I ___ swim very well. | can | cans, am",
        "She ___ drive. She is ten years old. | can't | can, don't",
        "He can ___ the guitar. | play | plays, to play",
        "___ you dance? | Can | Do, Are",
        "Yes, I ___. | can | can't, do",
      ]),
      build("Habilidad", "🎤 Ella sabe cantar muy bien", "She can sing very well", ["cans", "to"]),
      build("Pregunta", "❓ ¿Sabes cocinar?", "Can you cook", ["do", "are"]),
      build("Negativo", "🚗 No sé manejar un auto", "I can't drive a car", ["don't", "to"]),
      drag("Respuestas cortas", [
        "Can you swim? = Yes, I can",
        "Can he drive? = No, he can't",
        "Can they sing? = Yes, they can",
        "Can she cook? = No, she can't",
      ], "Arrastra cada pregunta hasta su respuesta."),
      cat("Tipos de habilidades", [
        ["Música y arte", ["Sing", "Dance", "Draw"]],
        ["Deporte y movimiento", ["Swim", "Run", "Play soccer"]],
      ]),
      dialog("Simulación: En el club", "Un entrenador te pregunta qué sabes hacer", [
        ["Coach", "Can you swim?", "Yes, I can.", "Yes, I am.", "Responde con 'can'."],
        ["Coach", "Great! Can you play soccer too?", "No, I can't play soccer.", "No, I can't to play soccer.", "Después de 'can't' no va 'to'."],
      ]),
    ],
  },

  A1_jobs_and_professions: {
    grammar: g(
      "A / an + profesión",
      "Al decir la profesión de alguien siempre se usa el artículo 'a' o 'an'. En presente simple, con he / she el verbo lleva -s.",
      ["a + sonido de consonante", "a teacher", "a doctor", "a pilot"],
      ["an + sonido de vocal", "an engineer", "an artist", "an architect"],
      ["Preguntar la profesión", "What do you do? — I am a nurse."],
      ["Dónde trabaja: work(s) + in / at", "I work in a school.", "She works in a hospital."],
    ),
    add: [
      fill("¿A o an?", [
        "She is ___ nurse. | a | an, the",
        "He is ___ engineer. | an | a, the",
        "My mother is ___ artist. | an | a, two",
        "I am ___ pilot. | a | an, am",
        "He is ___ office worker. | an | a, the",
      ]),
      match("¿Dónde trabajan?", [
        "Nurse = Hospital",
        "Waiter = Restaurant",
        "Teacher = School",
        "Pilot = Airplane",
        "Office worker = Office",
      ], "Une cada profesión con su lugar de trabajo."),
      build("Profesión con 'an'", "👷 Mi hermano es ingeniero", "My brother is an engineer", ["a", "are"]),
      build("Lugar de trabajo", "🏥 Ella trabaja en un hospital", "She works in a hospital", ["work", "an"]),
      dialog("Simulación: ¿A qué te dedicas?", "Hablas de trabajo con una persona que acabas de conocer", [
        ["Anna", "What do you do?", "I am a teacher.", "I am teacher.", "Falta el artículo 'a'."],
        ["Anna", "Where do you work?", "I work in a school.", "I work a school.", "Falta 'in'."],
        ["Anna", "My sister is an architect.", "Really? She designs houses!", "Really? She is a architect!", "Antes de vocal se usa 'an'."],
      ]),
    ],
  },

  A1_personal_info_have: {
    objectives: ["Usar 'have' y 'has'", "Hablar de tu familia", "Decir y preguntar la edad"],
    grammar: g(
      "Verbo 'to have' (tener)",
      "'Have' se usa para hablar de lo que tienes: familia, objetos, mascotas. Con he, she, it cambia a 'has'.",
      ["I / you / we / they + have", "I have two sisters.", "They have a dog."],
      ["He / she / it + has", "She has one brother.", "My father has a car."],
      ["Pregunta: Do you have...?", "Do you have a pet? — Yes, I do. / No, I don't."],
      ["La edad NO va con 'have'", "✅ I am twenty years old.", "❌ I have twenty years."],
    ),
    vocab: [
      v("Have", "Tener", "I have a big family"),
      v("Family", "Familia", "My family is from Peru"),
      v("Parents", "Padres (padre y madre)", "My parents are teachers"),
      v("Children", "Hijos / Niños", "They have two children"),
      v("Pet", "Mascota", "Do you have a pet?"),
    ],
    add: [
      fill("¿Have, has o to be?", [
        "I ___ two sisters. | have | has, am",
        "She ___ one brother. | has | have, is",
        "We ___ a big family. | have | has, are",
        "My father ___ a car. | has | have, haves",
        "I ___ twenty years old. | am | have, has",
      ]),
      build("Con 'has'", "👧 Ella tiene dos hermanos", "She has two brothers", ["have", "is"]),
      build("Pregunta con 'have'", "🐶 ¿Tienes una mascota?", "Do you have a pet", ["has", "are"]),
      drag("Pregunta y respuesta", [
        "Do you have a brother? = Yes, I have one brother",
        "How old are you? = I am thirty years old",
        "How many sisters do you have? = I have two sisters",
        "Do you have children? = No, I don't",
      ], "Arrastra cada pregunta hasta su respuesta."),
      cat("¿Have o has?", [
        ["Have", ["I", "You", "We", "They"]],
        ["Has", ["He", "She", "It"]],
      ], "Clasifica cada pronombre según la forma del verbo que usa."),
    ],
  },

  A1_technology_devices: {
    create: { title: "Technology and Devices", unit: "unitA1_skills_work", after: "A1_jobs_and_professions", xp: 100, tags: ["technology", "devices", "modals"] },
    objectives: ["Nombrar dispositivos y acciones digitales", "Usar can, should y must en presente", "Pedir permiso con 'Can I...?'"],
    grammar: g(
      "Verbos modales en presente: can, should, must",
      "Los modales van antes de otro verbo y le agregan un significado. No cambian con la persona y el verbo que sigue va sin 'to' y sin -s.",
      ["can = poder (habilidad o permiso)", "I can send emails.", "Can I use your phone?"],
      ["should = debería (consejo)", "You should use a strong password.", "You shouldn't share your password."],
      ["must = tener que (obligación)", "You must charge your phone."],
      ["Modal + verbo base", "✅ She can use a computer.", "❌ She cans use.", "❌ She can to use."],
    ),
    vocab: [
      v("Phone", "Teléfono / Celular", "I use my phone every day"),
      v("Computer", "Computadora", "The computer is on the desk"),
      v("Laptop", "Computadora portátil", "I work with my laptop"),
      v("Tablet", "Tableta", "He watches videos on his tablet"),
      v("Internet", "Internet", "I search the internet"),
      v("Email", "Correo electrónico", "I send an email to my teacher"),
      v("Password", "Contraseña", "You should use a strong password"),
      v("Screen", "Pantalla", "The screen is very big"),
      v("Keyboard", "Teclado", "I write with the keyboard"),
      v("App", "Aplicación", "This app is free"),
    ],
    add: [
      match("Dispositivos", [
        "Phone = Celular",
        "Computer = Computadora",
        "Laptop = Computadora portátil",
        "Tablet = Tableta",
        "Email = Correo electrónico",
        "App = Aplicación",
      ], "Une cada palabra con su traducción."),
      memory("Memory: Partes y accesorios", [
        "Screen = Pantalla",
        "Keyboard = Teclado",
        "Password = Contraseña",
        "Charger = Cargador",
        "Headphones = Auriculares",
      ]),
      fill("Can, should, must", [
        "I ___ send emails with my phone. | can | cans, must to",
        "You ___ use a strong password. | should | can't, are",
        "The battery is at 1%. You ___ charge your phone. | must | can't, shouldn't",
        "She has no internet. She ___ open the app. | can't | can, should",
        "You ___ share your password. | shouldn't | should, must",
      ]),
      build("Uso diario", "💻 Uso mi laptop todos los días", "I use my laptop every day", ["uses", "to"]),
      build("Un consejo", "🔒 Deberías usar una contraseña segura", "You should use a strong password", ["to", "uses"]),
      drag("¿Para qué sirve?", [
        "Keyboard = To write",
        "Headphones = To listen to music",
        "Screen = To watch videos",
        "Charger = To charge the battery",
        "Password = To protect your account",
      ], "Arrastra cada objeto hasta su uso."),
      cat("¿Dispositivo o acción?", [
        ["Dispositivos", ["Phone", "Laptop", "Tablet"]],
        ["Acciones", ["Send", "Download", "Search"]],
      ]),
      fill("Verbos de tecnología", [
        "I ___ an email to my teacher. | send | sends, sending",
        "He ___ videos on his tablet. | watches | watch, watching",
        "We ___ photos with our phones. | take | takes, do",
        "She ___ music from the internet. | downloads | download, downloading",
        "They ___ the internet every day. | use | uses, using",
      ]),
      build("Pedir permiso", "📱 ¿Puedo usar tu teléfono?", "Can I use your phone", ["do", "to"]),
      match("Acciones digitales", [
        "Turn on = Encender",
        "Turn off = Apagar",
        "Send a message = Enviar un mensaje",
        "Take a photo = Sacar una foto",
        "Search the internet = Buscar en internet",
      ], "Une cada acción con su traducción."),
      dialog("Simulación: Problemas con el teléfono", "Un amigo necesita ayuda con la tecnología", [
        ["Friend", "My phone is not working. Can I use your laptop?", "Yes, you can. Here it is.", "Yes, you must. Here it is.", "Para dar permiso se usa 'can'."],
        ["Friend", "Thanks! What is the wifi password?", "I can't remember. You should ask my sister.", "I can't to remember. You should to ask my sister.", "Después de can / should no va 'to'."],
        ["Friend", "OK. Can you send me the photos later?", "Sure, I can send them by email.", "Sure, I can sends them by email.", "Después de 'can' el verbo no lleva -s."],
      ]),
    ],
  },

  A1_family: {
    objectives: ["Nombrar a los miembros de la familia", "Explicar parentescos con 's", "Presentar a tu familia con 'This is my...'"],
    grammar: g(
      "Posesivo con 's y 'my'",
      "Para decir de quién es un familiar se agrega 's a la persona. Es el equivalente de 'de' en español, pero al revés.",
      ["Persona + 's + familiar", "my mother's brother (el hermano de mi madre)", "Ana's father (el padre de Ana)"],
      ["Presentar: This is my + familiar", "This is my mother.", "This is my uncle."],
      ["Parentescos", "My mother's brother is my uncle.", "My father's mother is my grandmother."],
      ["He para hombres, she para mujeres", "He is my father.", "She is my aunt."],
    ),
    add: [
      fill("¿Quién es?", [
        "My mother's brother is my ___. | uncle | aunt, grandfather",
        "My father's mother is my ___. | grandmother | sister, aunt",
        "My mother's sister is my ___. | aunt | uncle, brother",
        "This is ___ father. (yo) | my | I, me",
        "My father's father is my ___. | grandfather | uncle, brother",
      ]),
      memory("Memory: La familia", [
        "Grandfather = Abuelo",
        "Grandmother = Abuela",
        "Uncle = Tío",
        "Aunt = Tía",
        "Sister = Hermana",
      ]),
      build("Dónde vive", "🇬🇧 Mi tío vive en Londres", "My uncle lives in London", ["live", "aunt"]),
      build("Qué hace bien", "👵 Mi abuela cocina muy bien", "My grandmother cooks very well", ["cook", "is"]),
      drag("Ella y él", [
        "Mother = Father",
        "Sister = Brother",
        "Aunt = Uncle",
        "Grandmother = Grandfather",
      ], "Arrastra cada familiar hasta su par masculino."),
      dialog("Simulación: La foto familiar", "Le muestras una foto de tu familia a un amigo", [
        ["Friend", "Who is she in the photo?", "She is my mother.", "He is my mother.", "Para una mujer se usa 'she'."],
        ["Friend", "And who is the man?", "He is my uncle. He is my father's brother.", "He is my aunt. He is my father's brother.", "El hermano del padre es 'uncle'."],
      ]),
    ],
  },

  A1_family_2: {
    grammar: g(
      "Pronombres reflexivos",
      "Se usan cuando la persona que hace la acción es la misma que la recibe, o para decir que alguien hizo algo solo, sin ayuda.",
      ["Singular: myself, yourself, himself, herself, itself", "I made this cake myself.", "She looked at herself in the mirror."],
      ["Plural: ourselves, yourselves, themselves", "We enjoyed ourselves.", "They built the house themselves."],
      ["Cada sujeto tiene el suyo", "I → myself", "he → himself", "they → themselves"],
      ["No confundir con los posesivos", "my book (posesivo) ≠ I did it myself (reflexivo)"],
      ["Familia política y ensamblada", "mother-in-law = suegra", "stepbrother = hermanastro"],
    ),
    add: [build("La edad de mi sobrino", "🧒 Mi sobrino tiene diez años", "My nephew is ten years old", ["niece", "are"])],
  },

  A1_descriptions: {
    grammar: g(
      "Describir personas: to be, to have y posesivos",
      "Para la estatura y la personalidad se usa 'to be'. Para el pelo y los ojos se usa 'to have'. Los adjetivos posesivos dicen de quién es algo.",
      ["to be + adjetivo", "He is tall.", "She is kind."],
      ["to have + adjetivo + hair / eyes", "She has blonde hair.", "He has brown eyes."],
      ["Adjetivos posesivos: my, your, his, her, our, their", "His friends are funny.", "Her hair is long."],
      ["El adjetivo va antes del sustantivo", "✅ brown hair", "❌ hair brown"],
    ),
    fixVocab: (vocab) => {
      const brunette = vocab.find((w) => w.word === "Brunette");
      if (brunette) {
        brunette.translation = "Moreno/a (de pelo castaño)";
        brunette.examples = ["Her friend is brunette"];
      }
      const small = vocab.find((w) => w.word === "Small");
      if (small) small.translation = "Pequeño/a";
    },
    fix: (exs) => {
      const dragEx = exs.find((e) => e.id === "ex2_drag_drop_match");
      dragEx.title = "Match the translations";
    },
    add: [
      fill("¿To be o to have?", [
        "She ___ tall. | is | has, have",
        "He ___ brown hair. | has | is, have",
        "They ___ short. | are | have, is",
        "I ___ blue eyes. | have | am, has",
        "My sister ___ blonde. | is | has, are",
      ]),
      build("Descripción completa", "🧍 Él es alto y tiene pelo castaño", "He is tall and has brown hair", ["have", "are"]),
      cat("¿Con qué verbo?", [
        ["Con 'to be'", ["tall", "short", "kind", "funny"]],
        ["Con 'to have'", ["blonde hair", "brown eyes", "long hair", "a beard"]],
      ], "Clasifica cada descripción según el verbo que usa."),
    ],
  },

  A1_clothes: {
    create: { title: "Clothes", unit: "unitA1_my_environment", after: "A1_descriptions", xp: 100, tags: ["clothes", "possessives", "descriptions"] },
    objectives: ["Nombrar prendas de vestir", "Decir qué lleva puesto alguien", "Usar adjetivos posesivos con la ropa"],
    grammar: g(
      "Ropa: wear, is wearing y posesivos",
      "'Wear' significa 'usar / llevar puesto'. Para lo que alguien lleva ahora se usa 'is wearing'. Los posesivos indican de quién es la prenda.",
      ["Ahora: to be + wearing", "She is wearing a red dress.", "I am wearing jeans."],
      ["Costumbre: wear / wears", "I wear a jacket in winter.", "He wears a hat every day."],
      ["Posesivos: my, your, his, her, our, their", "His shoes are black.", "Her dress is red."],
      ["Pants, jeans, shoes y socks son siempre plural", "✅ These pants are big.", "❌ This pants is big."],
      ["Color + prenda", "✅ a black jacket", "❌ a jacket black"],
    ),
    vocab: [
      v("Shirt", "Camisa", "He is wearing a white shirt"),
      v("T-shirt", "Camiseta / Remera", "I wear a T-shirt in summer"),
      v("Pants", "Pantalones", "These pants are too big"),
      v("Jeans", "Jeans / Vaqueros", "I am wearing my jeans"),
      v("Dress", "Vestido", "She is wearing a red dress"),
      v("Skirt", "Falda / Pollera", "Her skirt is blue"),
      v("Shoes", "Zapatos", "His shoes are black"),
      v("Jacket", "Chaqueta / Campera", "I wear a jacket in winter"),
      v("Hat", "Sombrero / Gorro", "He wears a hat every day"),
      v("Socks", "Medias / Calcetines", "My socks are white"),
    ],
    add: [
      match("Prendas básicas", [
        "Shirt = Camisa",
        "T-shirt = Camiseta",
        "Pants = Pantalones",
        "Shoes = Zapatos",
        "Dress = Vestido",
        "Skirt = Falda",
      ], "Une cada prenda con su traducción."),
      memory("Memory: Ropa de invierno", [
        "Coat = Abrigo",
        "Sweater = Suéter",
        "Scarf = Bufanda",
        "Boots = Botas",
        "Gloves = Guantes",
      ]),
      cat("¿Dónde se usa?", [
        ["Parte de arriba", ["Shirt", "Jacket", "Sweater"]],
        ["Parte de abajo", ["Pants", "Skirt", "Jeans"]],
        ["Pies", ["Shoes", "Socks", "Boots"]],
      ]),
      fill("¿De quién es?", [
        "Ana has a red dress. ___ dress is red. | Her | His, Their",
        "Tom has black shoes. ___ shoes are black. | His | Her, Our",
        "We have blue T-shirts. ___ T-shirts are blue. | Our | Their, Your",
        "The children have hats. ___ hats are yellow. | Their | His, Our",
        "I have a new jacket. ___ jacket is new. | My | Me, I",
      ]),
      fill("¿Qué lleva puesto?", [
        "She is ___ a green dress. | wearing | wear, wears",
        "These pants ___ too big. | are | is, am",
        "He ___ a hat every day. | wears | wear, wearing",
        "My shoes ___ new. | are | is, be",
        "I am wearing ___ jeans. (míos) | my | me, I",
      ]),
      build("Lo que lleva ahora", "👗 Ella lleva puesto un vestido rojo", "She is wearing a red dress", ["wear", "are"]),
      build("De quién son", "👞 Sus zapatos (de él) son negros", "His shoes are black", ["is", "her"]),
      build("Costumbre", "🧥 Uso chaqueta en invierno", "I wear a jacket in winter", ["wears", "on"]),
      drag("¿Qué te pones?", [
        "It is cold = Coat and gloves",
        "It is hot = T-shirt and shorts",
        "It is raining = Raincoat and boots",
        "At the beach = Swimsuit",
        "At the office = Shirt and tie",
      ], "Arrastra cada situación hasta la ropa adecuada."),
      match("Describir la ropa", [
        "Big = Grande",
        "Small = Pequeño",
        "New = Nuevo",
        "Old = Viejo",
        "Cheap = Barato",
        "Expensive = Caro",
      ], "Une cada adjetivo con su traducción."),
      dialog("Simulación: En la tienda de ropa", "Quieres comprar una chaqueta", [
        ["Clerk", "Hello! Can I help you?", "Yes, I am looking for a jacket.", "Yes, I am a jacket.", "Usa 'I am looking for...'"],
        ["Clerk", "What color do you want?", "A black jacket, please.", "A jacket black, please.", "El color va antes de la prenda."],
        ["Clerk", "Here you are. Is it your size?", "Yes, it is perfect. Thank you!", "Yes, they is perfect. Thank you!", "Una sola prenda: 'it is'."],
      ]),
    ],
  },

  A1_housing: {
    grammar: g(
      "Demostrativos: this, that, these, those",
      "Los demostrativos señalan cosas según la distancia y la cantidad. También se usan las preposiciones in, on, at para ubicar.",
      ["Cerca: this (uno) / these (varios)", "This is my bedroom.", "These are my books."],
      ["Lejos: that (uno) / those (varios)", "That house is big.", "Those trees are tall."],
      ["this / that + is — these / those + are", "This is the kitchen.", "Those are the bedrooms."],
      ["in = dentro, on = sobre, at = en un punto", "The car is in the garage.", "The cat is on the roof.", "I am at home."],
    ),
    add: [
      fill("This, that, these, those", [
        "___ is my bedroom. (cerca, uno) | This | These, Those",
        "___ are my windows. (cerca, varios) | These | This, That",
        "___ house over there is big. (lejos, uno) | That | This, These",
        "___ trees over there are tall. (lejos, varios) | Those | That, This",
        "I cook in the ___. | kitchen | bathroom, garage",
      ]),
      match("¿Qué haces en cada lugar?", [
        "Kitchen = I cook",
        "Bedroom = I sleep",
        "Bathroom = I take a shower",
        "Living room = I watch TV",
        "Garage = I park the car",
      ], "Une cada lugar de la casa con lo que haces ahí."),
      build("Varios, cerca", "🛏️ Estos son los dormitorios", "These are the bedrooms", ["is", "this"]),
      build("Dónde está", "🚗 El auto está en el garaje", "The car is in the garage", ["on", "at"]),
      dialog("Simulación: Visitando una casa", "Un agente inmobiliario te muestra una casa", [
        ["Agent", "Welcome! This is the living room.", "It is very big. Is that the kitchen?", "It is very big. Are that the kitchen?", "Una sola cosa: 'Is that...?'"],
        ["Agent", "Yes, and those are the bedrooms.", "Great! How many bedrooms are there?", "Great! How many bedroom is there?", "En plural: 'bedrooms' y 'are'."],
      ]),
    ],
  },
};
