const { v, g, match, memory, fill, build, drag, cat, dialog } = require("../../helpers");

// Unidad "Personas y Estilo de Vida" — guía A2 clases 1, 3, 6, 11, 22 y 32
module.exports = {
  A2_describing_people: {
    objectives: ["Describir el físico y la personalidad", "Usar los adjetivos posesivos", "Diferenciar 'What is he like?' y 'What does he look like?'"],
    grammar: g(
      "Adjetivos posesivos y descripciones",
      "Los adjetivos posesivos van antes del sustantivo y concuerdan con el dueño, no con la cosa poseída.",
      ["my, your, his, her, its, our, their", "Her hair is long.", "Their teacher is kind."],
      ["his (de él) / her (de ella) / its (de una cosa o animal)", "Tom loves his dog.", "The dog is wagging its tail."],
      ["No confundir: its ≠ it's / their ≠ there", "its tail (su cola) / it's late (es tarde)"],
      ["Personalidad: What is he like? → to be + adjetivo", "What is she like? — She is very generous."],
      ["Físico: What does he look like? → to be / to have", "What does he look like? — He is tall and has curly hair."],
    ),
    vocab: [
      v("Shy", "Tímido/a", "My brother is very shy"),
      v("Outgoing", "Extrovertido/a", "She is outgoing and talks to everyone"),
      v("Generous", "Generoso/a", "My grandfather is very generous"),
      v("Lazy", "Perezoso/a", "He is lazy on weekends"),
      v("Hardworking", "Trabajador/a", "Our teacher is very hardworking"),
    ],
    add: [
      match("Personalidad", [
        "Shy = Tímido",
        "Outgoing = Extrovertido",
        "Generous = Generoso",
        "Lazy = Perezoso",
        "Hardworking = Trabajador",
        "Friendly = Amigable",
      ], "Une cada adjetivo con su traducción."),
      fill("Adjetivos posesivos", [
        "My sister is tall. ___ hair is long. | Her | His, Their",
        "Tom is very friendly. ___ smile is nice. | His | Her, Its",
        "We love ___ grandparents. | our | us, we",
        "The students and ___ teacher are here. | their | they, there",
        "The dog is wagging ___ tail. | its | it's, his",
      ]),
      fill("¿Personalidad o aspecto?", [
        "What ___ she like? — She is very kind. | is | does, do",
        "What does he ___ like? — He is tall with dark hair. | look | looks, be",
        "My brother talks to everyone. He is ___. | outgoing | shy, lazy",
        "She never shares anything. She isn't very ___. | generous | outgoing, tall",
        "He works ten hours a day. He is very ___. | hardworking | lazy, shy",
      ]),
      build("Describir al hermano de ella", "🧍 Su hermano (de ella) es alto y muy amigable", "Her brother is tall and very friendly", ["his", "has"]),
      build("Preguntar por el aspecto", "❓ ¿Cómo es tu hermana físicamente?", "What does your sister look like", ["is", "likes"]),
      cat("¿Físico o personalidad?", [
        ["Físico", ["tall", "curly hair", "blue eyes", "slim"]],
        ["Personalidad", ["shy", "generous", "lazy", "outgoing"]],
      ]),
      dialog("Simulación: La nueva jefa", "Un amigo te pregunta por tu nueva jefa", [
        ["Friend", "What is your new boss like?", "She is very friendly and hardworking.", "She is very tall and has blue eyes.", "'What is she like?' pregunta por la personalidad."],
        ["Friend", "And what does she look like?", "She is tall and has curly hair.", "She is generous and shy.", "'What does she look like?' pregunta por el aspecto."],
        ["Friend", "Do you like her team?", "Yes, her team is great.", "Yes, his team is great.", "Hablamos de ella: 'her'."],
      ]),
    ],
  },

  A2_family_relationships: {
    objectives: ["Hablar de la familia y las relaciones", "Usar adverbios de frecuencia en la posición correcta", "Preguntar 'How often...?'"],
    grammar: g(
      "Adverbios de frecuencia",
      "Dicen cada cuánto pasa algo. Van antes del verbo principal, pero después de 'to be'.",
      ["always (100%) · usually · often · sometimes · rarely · never (0%)", "I always visit my parents on Sundays."],
      ["Antes del verbo principal", "✅ We often call our relatives.", "❌ We call often our relatives."],
      ["Después de 'to be'", "She is never late."],
      ["Preguntar: How often...?", "How often do you see your cousins?"],
      ["Expresiones: once / twice / three times a week", "I see my grandparents twice a month."],
    ),
    vocab: [
      v("Get along with", "Llevarse bien con", "I get along with my sister"),
      v("Grandchildren", "Nietos", "My grandparents have five grandchildren"),
      v("Married", "Casado/a", "My parents have been married for 30 years"),
      v("Divorced", "Divorciado/a", "My uncle is divorced"),
    ],
    replace: {
      // "___ I visit my family → Always" daba una oración poco natural
      ex2_adverbs_frequency: fill("Adverbios de Frecuencia", [
        "I ___ visit my parents on Sundays. (100%) | always | never, ever",
        "We ___ call our relatives. (70%) | often | never, always",
        "She is ___ late for family dinners. (0%) | never | always, often",
        "How ___ do you see your cousins? | often | much, many",
        "I see my grandparents twice a ___. | month | often, times",
      ]),
    },
    add: [
      match("Relaciones", [
        "Get along with = Llevarse bien con",
        "Grandchildren = Nietos",
        "Married = Casado",
        "Divorced = Divorciado",
        "Twins = Gemelos",
        "Siblings = Hermanos",
      ], "Une cada palabra con su traducción."),
      fill("Relaciones familiares", [
        "I ___ along well with my sister. | get | am, go",
        "My parents have been together for 30 years. They are ___. | married | divorced, single",
        "My grandparents have five ___. | grandchildren | parents, siblings",
        "Tom and Tim were born on the same day. They are ___. | twins | cousins, relatives",
        "She ___ visits her aunt. (a veces) | sometimes | ever, yet",
      ]),
      build("Con 'usually'", "🍽️ Normalmente ceno con mi familia", "I usually have dinner with my family", ["has", "am"]),
      build("Con 'to be'", "⏰ Mi hermano nunca llega tarde", "My brother is never late", ["does", "has"]),
      build("Pregunta", "❓ ¿Con qué frecuencia visitas a tus abuelos?", "How often do you visit your grandparents", ["does", "much"]),
      dialog("Simulación: Hablando de la familia", "Un amigo te pregunta por tu familia", [
        ["Friend", "How often do you see your family?", "I usually see them on Sundays.", "I see usually them on Sundays.", "El adverbio va antes del verbo."],
        ["Friend", "Do you get along with your siblings?", "Yes, I always get along with my sister.", "Yes, I get always along with my sister.", "El adverbio va antes del verbo."],
        ["Friend", "Is your brother married?", "No, he is single.", "No, he is twins.", "Te preguntan su estado civil."],
      ]),
    ],
  },

  A2_activities_hobbies: {
    objectives: ["Nombrar actividades y pasatiempos", "Usar el presente continuo para lo que pasa ahora", "Escribir correctamente la forma -ing"],
    grammar: g(
      "Presente continuo",
      "Se usa para acciones que están ocurriendo ahora y también para actividades temporales de estos días.",
      ["am / is / are + verbo-ing", "She is painting.", "We are playing chess."],
      ["Ahora mismo o estos días", "Look! He is gardening.", "I am learning photography these days."],
      ["Pregunta y negativo", "Are you watching TV?", "He isn't cooking. He's sleeping."],
      ["Ortografía: -e se quita / consonante final se duplica", "write → writing", "swim → swimming", "run → running"],
    ),
    vocab: [
      v("Painting", "Pintar / Pintando", "She is painting a landscape"),
      v("Gardening", "Jardinería", "My father loves gardening"),
      v("Hiking", "Senderismo", "We are hiking in the mountains"),
      v("Photography", "Fotografía", "I am learning photography"),
      v("Knitting", "Tejer", "My grandmother is knitting a scarf"),
      v("Playing chess", "Jugar al ajedrez", "They are playing chess"),
    ],
    add: [
      match("Pasatiempos", [
        "Painting = Pintar",
        "Gardening = Jardinería",
        "Hiking = Senderismo",
        "Photography = Fotografía",
        "Knitting = Tejer",
        "Playing chess = Jugar al ajedrez",
      ], "Une cada pasatiempo con su traducción."),
      fill("Presente continuo", [
        "Look! She ___ in the garden. | is painting | paints, painted",
        "We ___ chess right now. | are playing | play, plays",
        "I ___ a new hobby these days: photography. | am learning | learn, learns",
        "___ you watching TV? | Are | Do, Is",
        "He isn't ___. He's sleeping. | cooking | cook, cooks",
      ]),
      fill("Ortografía de -ing", [
        "swim → ___ | swimming | swiming, swimmming",
        "write → ___ | writing | writeing, writting",
        "run → ___ | running | runing, runnning",
        "garden → ___ | gardening | gardenning, gardning",
        "make → ___ | making | makeing, makking",
      ]),
      build("Ahora mismo", "🌱 Mi papá está haciendo jardinería ahora mismo", "My father is gardening right now", ["gardens", "are"]),
      build("Estos días", "❓ ¿Qué estás haciendo estos días?", "What are you doing these days", ["do", "is"]),
      drag("¿Qué está haciendo?", [
        "She has a camera = She is taking photos",
        "He has a brush = He is painting",
        "They have boots and backpacks = They are hiking",
        "I have a book = I am reading",
      ], "Arrastra cada pista hasta la actividad."),
      dialog("Simulación: ¿Qué estás haciendo?", "Un amigo te escribe por la tarde", [
        ["Friend", "Hi! What are you doing?", "I'm painting a picture for my mom.", "I paint a picture right now.", "Es ahora: presente continuo."],
        ["Friend", "Cool! Are you taking art classes?", "Yes, I'm taking classes this month.", "Yes, I take classes now this month.", "Algo temporal: presente continuo."],
      ]),
    ],
  },

  A2_free_time_hobbies: {
    objectives: ["Hablar de gustos y preferencias", "Reconocer los verbos estativos", "Elegir entre presente simple y continuo"],
    grammar: g(
      "Presente simple: verbos estativos",
      "Los verbos estativos expresan gustos, opiniones, conocimiento o posesión. No describen una acción, por eso casi nunca van en presente continuo.",
      ["Gustos: like, love, hate, prefer, want", "I love jazz.", "I prefer tea to coffee."],
      ["Mente: know, understand, believe, think (opinión)", "Do you understand?", "He thinks chess is boring."],
      ["Posesión: have (tener), own", "She owns two guitars."],
      ["No se usan con -ing", "✅ I like this song.", "❌ I am liking this song."],
      ["Compara con un verbo de acción", "I am reading a book now. / I love this book."],
    ),
    vocab: [
      v("Prefer", "Preferir", "I prefer books to movies"),
      v("Hate", "Odiar", "I hate waking up early"),
      v("Believe", "Creer", "I believe it's a good idea"),
      v("Own", "Poseer / Ser dueño de", "She owns a guitar and a piano"),
    ],
    replace: {
      ex4_hobbies_conversation: dialog("Conversación sobre Pasatiempos", "Hablas de tus pasatiempos con un amigo nuevo", [
        ["Friend", "What do you like doing in your free time?", "I like reading and watching movies.", "I am liking reading and watching movies.", "'Like' es estativo: no va en continuo."],
        ["Friend", "Do you prefer books or movies?", "I prefer books. I love fantasy stories.", "I am preferring books. I love fantasy stories.", "'Prefer' es estativo."],
      ]),
    },
    add: [
      fill("Verbos estativos", [
        "I ___ jazz music. | love | am loving, loves",
        "She ___ a guitar and a piano. | owns | is owning, own",
        "Do you ___ what I mean? | understand | understanding, understands",
        "I ___ tea to coffee. | prefer | am preferring, prefers",
        "He ___ chess is boring. | thinks | is thinking, think",
      ]),
      cat("¿Estativo o de acción?", [
        ["Estativo", ["like", "know", "prefer", "own"]],
        ["Acción", ["run", "cook", "swim", "write"]],
      ]),
      match("Verbos estativos", [
        "Prefer = Preferir",
        "Hate = Odiar",
        "Believe = Creer",
        "Own = Poseer",
        "Understand = Entender",
        "Want = Querer",
      ], "Une cada verbo con su traducción."),
      build("Preferencia", "📚 Prefiero leer a mirar televisión", "I prefer reading to watching TV", ["am", "preferring"]),
      build("Conocimiento", "🎹 Ella sabe tocar el piano", "She knows how to play the piano", ["is", "knowing"]),
      fill("¿Simple o continuo?", [
        "I ___ a book right now. | am reading | read, reads",
        "I ___ this book. It's great! | love | am loving, loving",
        "They ___ soccer at the moment. | are playing | play, plays",
        "We ___ the answer. | know | are knowing, knows",
      ]),
    ],
  },

  A2_fashion_style: {
    objectives: ["Hablar de moda y estilo", "Comparar prendas con comparativos", "Usar superlativos"],
    grammar: g(
      "Comparativos y superlativos",
      "El comparativo compara dos cosas (+ than). El superlativo destaca una entre varias (the + ...).",
      ["Adjetivos cortos: -er / the -est", "cheap → cheaper → the cheapest", "big → bigger → the biggest"],
      ["Terminados en -y: -ier / the -iest", "pretty → prettier → the prettiest", "trendy → trendier → the trendiest"],
      ["Adjetivos largos: more / the most", "elegant → more elegant → the most elegant"],
      ["Irregulares", "good → better → the best", "bad → worse → the worst"],
      ["Ejemplos", "This dress is prettier than that one.", "These are the most comfortable shoes in the store."],
    ),
    vocab: [
      v("Trendy", "A la moda", "These sneakers are very trendy"),
      v("Old-fashioned", "Pasado de moda", "That jacket is old-fashioned"),
      v("Elegant", "Elegante", "She looks elegant in that dress"),
      v("Casual", "Informal", "I prefer casual clothes on weekends"),
    ],
    replace: {
      ex4_shopping_conversation: dialog("Conversación sobre Moda", "Vas de compras con una amiga", [
        ["Friend", "Which dress do you like better?", "The red one. It's prettier than the blue one.", "The red one. It's more pretty than the blue one.", "Pretty → prettier."],
        ["Friend", "And these shoes?", "They are the most comfortable shoes in the store.", "They are the comfortablest shoes in the store.", "Adjetivo largo: 'the most comfortable'."],
      ]),
    },
    add: [
      fill("Comparativos y superlativos", [
        "This jacket is ___ than that one. | cheaper | more cheap, cheapest",
        "She is the ___ person I know. | most elegant | elegantest, more elegant",
        "These jeans are ___ than my old ones. | better | gooder, best",
        "That was the ___ outfit at the party. | worst | baddest, worse",
        "Your bag is ___ than mine. | bigger | biger, more big",
      ]),
      match("Adjetivo → superlativo", [
        "Good = The best",
        "Bad = The worst",
        "Trendy = The trendiest",
        "Elegant = The most elegant",
        "Big = The biggest",
        "Cheap = The cheapest",
      ], "Une cada adjetivo con su superlativo."),
      build("Comparar vestidos", "👗 Este vestido es más elegante que aquel", "This dress is more elegant than that one", ["most", "elegantest"]),
      build("Superlativo", "👟 Estos son los zapatos más de moda de la tienda", "These are the trendiest shoes in the store", ["more", "trendier"]),
      cat("¿-er / -est o more / most?", [
        ["-er / -est", ["cheap", "big", "trendy"]],
        ["more / most", ["elegant", "comfortable", "expensive"]],
      ], "Clasifica cada adjetivo según cómo forma el comparativo."),
      memory("Memory: Estilo", [
        "Trendy = A la moda",
        "Old-fashioned = Pasado de moda",
        "Elegant = Elegante",
        "Casual = Informal",
        "Necklace = Collar",
      ]),
    ],
  },

  A2_daily_conversations: {
    objectives: ["Mantener conversaciones cotidianas", "Usar presente simple con verbos regulares e irregulares", "Usar expresiones comunes (sorry, excuse me...)"],
    grammar: g(
      "Presente simple: verbos regulares e irregulares",
      "Con he / she / it el verbo cambia. La mayoría solo agrega -s, pero algunos verbos muy comunes son irregulares.",
      ["Regulares: + s / + es / -ies", "work → works", "watch → watches", "study → studies"],
      ["Irregulares: be, have, go, do", "I am → she is", "I have → he has", "I go → she goes", "I do → he does"],
      ["Preguntas: Do / Does + verbo base", "Do you work here?", "Where does your brother work?"],
      ["Negativo: don't / doesn't + verbo base", "They don't live here.", "She doesn't drive."],
    ),
    vocab: [
      v("How's it going?", "¿Cómo va?", "Hi Tom! How's it going?"),
      v("See you soon", "Nos vemos pronto", "Bye! See you soon"),
      v("What do you do?", "¿A qué te dedicas?", "What do you do? — I'm a nurse"),
      v("I'm sorry", "Lo siento", "I'm sorry I'm late"),
      v("Excuse me", "Disculpa / Disculpe", "Excuse me, where is the bank?"),
      v("Never mind", "No importa", "Never mind, it's OK"),
    ],
    replace: {
      // el original empezaba con un turno del alumno y tenía "[Name]" sin reemplazar
      ex1_daily_dialogue: dialog("Simulación de Diálogo Cotidiano", "Conoces a alguien en una fiesta", [
        ["Maria", "Hi! I'm Maria. What's your name?", "Hi Maria, I'm Daniel. Nice to meet you.", "Hi Maria, I'm Daniel. Nice to meet me.", "Se dice 'Nice to meet you'."],
        ["Maria", "Where are you from, Daniel?", "I'm from Mexico, but I live in Spain now.", "I'm from Mexico, but I lives in Spain now.", "Con 'I' el verbo no lleva -s."],
        ["Maria", "What do you do?", "I work in an office.", "I works in an office.", "Con 'I' el verbo no lleva -s."],
      ]),
      ex3_verb_matching: match("Verbo → forma con he / she", [
        "Go = Goes",
        "Have = Has",
        "Do = Does",
        "Study = Studies",
        "Watch = Watches",
        "Be = Is",
      ], "Une cada verbo con su forma en tercera persona."),
    },
    add: [
      memory("Memory: Expresiones cotidianas", [
        "How's it going? = ¿Cómo va?",
        "See you soon = Nos vemos pronto",
        "I'm sorry = Lo siento",
        "Excuse me = Disculpa",
        "Never mind = No importa",
      ]),
      fill("Presente simple", [
        "She ___ to work by bus. | goes | go, gos",
        "He ___ two brothers. | has | have, haves",
        "___ you work on Saturdays? | Do | Does, Are",
        "My mother ___ the dishes after dinner. | does | do, doing",
        "They ___ live here. | don't | doesn't, aren't",
      ]),
      fill("Expresiones comunes", [
        "___ me, where is the bank? | Excuse | Sorry, Never",
        "I'm ___ I'm late. | sorry | excuse, mind",
        "Hi! How's it ___? | going | doing, go",
        "Bye! See you ___! | soon | yet, ago",
        "Don't worry, never ___. | mind | sorry, soon",
      ]),
      build("Pregunta con 'does'", "❓ ¿Dónde trabaja tu hermano?", "Where does your brother work", ["do", "works"]),
      build("Verbo irregular", "🏋️ Mi hermana va al gimnasio todos los días", "My sister goes to the gym every day", ["go", "do"]),
      drag("Frase → respuesta", [
        "How's it going? = Fine, thanks. And you?",
        "What do you do? = I'm a nurse",
        "Sorry I'm late! = Never mind",
        "See you soon! = Bye, take care",
      ], "Arrastra cada frase hasta su respuesta."),
      cat("¿Saludo, disculpa o despedida?", [
        ["Saludo", ["How's it going?", "Hi there!"]],
        ["Disculpa", ["I'm sorry", "Excuse me"]],
        ["Despedida", ["See you soon", "Take care"]],
      ]),
    ],
  },
};
