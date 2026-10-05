const { v, g, match, memory, fill, build, drag, cat, conj, dialog } = require("../../helpers");

// Unidad "Viajes, Ocio y Cultura" — guía A2 clases 9, 12, 16, 20, 24, 30, 34 y 39
module.exports = {
  A2_travel_vacations: {
    objectives: ["Hablar de viajes y vacaciones", "Contar experiencias con el presente perfecto", "Usar ever / never"],
    grammar: g(
      "Presente perfecto",
      "Se usa para experiencias de la vida sin decir cuándo pasaron. Se forma con have / has + participio.",
      ["have / has + participio", "I have visited Italy.", "She has been to Japan."],
      ["Experiencias: ever (alguna vez) / never (nunca)", "Have you ever been abroad?", "I have never flown."],
      ["Participios irregulares frecuentes", "be → been", "see → seen", "eat → eaten", "fly → flown", "buy → bought"],
      ["Si dices cuándo, va pasado simple", "✅ I visited Rome last year.", "❌ I have visited Rome last year."],
    ),
    vocab: [
      v("Abroad", "En el extranjero", "Have you ever been abroad?"),
      v("Sightseeing", "Hacer turismo / Recorrer lugares", "We went sightseeing in Rome"),
      v("Book", "Reservar", "We have booked a hotel"),
      v("Souvenir", "Recuerdo (de viaje)", "I bought a souvenir for my mom"),
    ],
    replace: {
      ex4_travel_planning: dialog("Planificando un Viaje", "Hablas de viajes con un amigo", [
        ["Friend", "Have you ever been abroad?", "Yes, I have. I have been to Mexico twice.", "Yes, I have. I have went to Mexico twice.", "El participio es 'been'."],
        ["Friend", "Have you ever visited Europe?", "No, I have never visited Europe.", "No, I have ever visited Europe.", "En negativo se usa 'never'."],
      ]),
    },
    add: [
      fill("Presente perfecto", [
        "I ___ visited Italy three times. | have | has, am",
        "She ___ been to Japan. | has | have, is",
        "Have you ___ seen the sea? | ever | never, yet",
        "We have ___ been abroad. (nunca) | never | ever, yet",
        "They have ___ a hotel for the trip. | booked | book, booking",
      ]),
      fill("Participios irregulares", [
        "see → ___ | seen | saw, seed",
        "eat → ___ | eaten | ate, eated",
        "take → ___ | taken | took, taked",
        "fly → ___ | flown | flew, flyed",
        "buy → ___ | bought | buyed, boughten",
      ]),
      match("De viaje", [
        "Abroad = En el extranjero",
        "Sightseeing = Hacer turismo",
        "Book = Reservar",
        "Souvenir = Recuerdo",
        "Luggage = Equipaje",
        "Flight = Vuelo",
      ], "Une cada palabra con su traducción."),
      build("Pregunta de experiencia", "🗼 ¿Alguna vez estuviste en París?", "Have you ever been to Paris", ["went", "did"]),
      build("Nunca", "✈️ Ella nunca ha volado en avión", "She has never flown on a plane", ["flew", "ever"]),
      drag("Pregunta → respuesta", [
        "Have you ever been to Brazil? = Yes, I have",
        "Has she visited Rome? = No, she hasn't",
        "Have they booked the hotel? = Yes, they have",
        "Have you packed your suitcase? = Not yet",
      ], "Arrastra cada pregunta hasta su respuesta."),
    ],
  },

  A2_transportation: {
    objectives: ["Nombrar medios de transporte", "Hablar de posibilidades con can / could", "Usar could para habilidades pasadas y pedidos amables"],
    grammar: g(
      "Can / could",
      "'Can' habla de lo que es posible o sabes hacer ahora. 'Could' es su pasado y también sirve para sugerir o pedir con amabilidad.",
      ["can = posible / sé hacerlo (presente)", "You can take the bus.", "I can drive."],
      ["could = sabía hacerlo (pasado)", "When I was ten, I could ride a bike."],
      ["could = sugerencia", "We could drive to the beach."],
      ["Could you...? = pedido amable", "Could you tell me where the station is?"],
      ["Negativo: can't / couldn't", "I can't drive. I don't have a license."],
    ),
    vocab: [
      v("Ferry", "Ferry / Transbordador", "We took the ferry to the island"),
      v("Motorcycle", "Moto", "He can ride a motorcycle"),
      v("Ride", "Andar / Montar (en bici, moto, caballo)", "I can ride a bike"),
    ],
    replace: {
      // el original tenía dos destinos "can"
      ex2_transport_suggestions: fill("Sugerencias de Transporte: Can/Could", [
        "You ___ take the bus to the city. (es posible) | can | could to, cans",
        "We ___ drive to the beach. (sugerencia) | could | can to, coulds",
        "When I was ten, I ___ ride a bike. | could | can, may",
        "___ you tell me where the station is? (amable) | Could | Must, Should",
        "I ___ drive. I don't have a license. | can't | couldn't, mustn't",
      ]),
      ex4_travel_planning: dialog("Planificando un Viaje", "Decides con un amigo cómo ir al aeropuerto", [
        ["Friend", "How can we get to the airport?", "We can take a taxi or the airport bus.", "We can to take a taxi or the airport bus.", "Después de 'can' no va 'to'."],
        ["Friend", "The taxi is expensive. Could we take the train?", "Yes, we could. It's cheaper.", "Yes, we could to. It's cheaper.", "Respuesta corta: 'Yes, we could'."],
      ]),
    },
    add: [
      memory("Memory: Más transportes", [
        "Ferry = Ferry",
        "Motorcycle = Moto",
        "Ride a bike = Andar en bici",
        "Helicopter = Helicóptero",
        "Truck = Camión",
      ]),
      build("Posibilidad", "🚇 Puedes tomar el metro al centro", "You can take the subway downtown", ["cans", "to"]),
      build("Habilidad pasada", "🚲 De chico no sabía andar en bici", "When I was young I couldn't ride a bike", ["can't", "rode"]),
      drag("¿Qué transporte es?", [
        "Ferry = It crosses a river or the sea",
        "Motorcycle = It has two wheels and an engine",
        "Truck = It carries heavy things",
        "Helicopter = It flies and can land on a roof",
      ], "Arrastra cada transporte hasta su descripción."),
      cat("¿Tierra, agua o aire?", [
        ["Tierra", ["bus", "train", "motorcycle"]],
        ["Agua", ["ferry", "ship", "boat"]],
        ["Aire", ["plane", "helicopter"]],
      ]),
    ],
  },

  A2_public_transportation: {
    objectives: ["Moverse en transporte público", "Preguntar horarios y precios", "Usar verbos de estado en presente simple"],
    grammar: g(
      "Presente simple: verbos de estado y horarios",
      "Los horarios fijos se dicen en presente simple. Verbos como cost, need, belong y depend son de estado: no van en continuo.",
      ["Horarios: presente simple", "The train leaves at 8:15.", "The bus arrives at 9."],
      ["cost / need / belong / depend", "The ticket costs two dollars.", "I need a ticket.", "It depends on the traffic."],
      ["No se usan con -ing", "✅ It costs three dollars.", "❌ It is costing three dollars."],
      ["Preguntas: How much does it cost? / What time does it leave?", "What time does the next train leave?"],
    ),
    vocab: [
      v("Platform", "Andén", "The train leaves from platform 3"),
      v("Fare", "Tarifa / Pasaje", "The bus fare is two dollars"),
      v("Departure", "Salida", "Check the departure time"),
      v("Arrival", "Llegada", "The arrival time is 10:30"),
    ],
    replace: {
      ex3_transport_conversation: dialog("Preguntando sobre Transporte", "Un viajero te pide información en la estación", [
        ["Traveler", "Excuse me, where is the nearest bus stop?", "It's two blocks from here, on the left.", "It's being two blocks from here, on the left.", "'To be' no va en continuo aquí."],
        ["Traveler", "How much does a ticket cost?", "It costs two dollars.", "It is costing two dollars.", "'Cost' es verbo de estado."],
        ["Traveler", "What time does the next train leave?", "It leaves at 8:15.", "It is leave at 8:15.", "Horarios: presente simple."],
      ]),
    },
    add: [
      fill("Verbos de estado y horarios", [
        "The ticket ___ three dollars. | costs | is costing, cost",
        "The train ___ at 9:00 every day. | leaves | is leaving, leave",
        "I ___ a ticket to the city center. | need | am needing, needs",
        "This seat ___ to that man. | belongs | is belonging, belong",
        "The travel time ___ on the traffic. | depends | is depending, depend",
      ]),
      match("En la estación", [
        "Platform = Andén",
        "Fare = Tarifa",
        "Departure = Salida",
        "Arrival = Llegada",
        "Delay = Retraso",
        "Stop = Parada",
      ], "Une cada palabra con su traducción."),
      build("Horario", "🚌 El próximo autobús sale a las diez", "The next bus leaves at ten", ["is", "leaving"]),
      build("Precio", "🎫 ¿Cuánto cuesta el boleto?", "How much does the ticket cost", ["do", "costs"]),
      drag("Pregunta → respuesta", [
        "Which platform is it? = Platform 3",
        "How much is the fare? = Two dollars",
        "Is the train on time? = No, there is a delay",
        "Where do I get off? = At the next stop",
      ], "Arrastra cada pregunta hasta su respuesta."),
      cat("¿Persona, lugar o documento?", [
        ["Persona", ["driver", "passenger"]],
        ["Lugar", ["platform", "bus stop"]],
        ["Documento", ["ticket", "travel card"]],
      ]),
    ],
  },

  A2_food_restaurants: {
    objectives: ["Pedir y recomendar en un restaurante", "Usar should para recomendar", "Usar must y mustn't"],
    grammar: g(
      "Must / should en el restaurante",
      "'Should' recomienda. 'Must' expresa obligación o una recomendación muy fuerte. 'Mustn't' prohíbe.",
      ["should = te lo recomiendo", "You should try the fish."],
      ["must = es necesario / ¡tienes que probarlo!", "We must make a reservation.", "You must try this cake!"],
      ["mustn't = no debes (prohibido o peligroso)", "You mustn't eat that. You're allergic!"],
      ["Pedir consejo: What should I...?", "What should I order?"],
      ["Sin 'to' después del modal", "✅ You should try it.", "❌ You should to try it."],
    ),
    vocab: [
      v("Reservation", "Reserva", "We have a reservation for two"),
      v("Recommend", "Recomendar", "What do you recommend?"),
      v("Spicy", "Picante", "This curry is very spicy"),
      v("Vegetarian", "Vegetariano/a", "Do you have vegetarian dishes?"),
    ],
    replace: {
      // el original tenía dos destinos "must"
      ex2_modal_verbs_food: fill("Must vs Should en Restaurantes", [
        "You ___ try the fish. It's very good. (recomendación) | should | shouldn't, must to",
        "It's always full. We ___ make a reservation. | must | mustn't, should to",
        "You ___ eat that. You're allergic! | mustn't | must, should",
        "You ___ order too much food. | shouldn't | should, must to",
        "What ___ I order? | should | must to, do should",
      ]),
      ex3_restaurant_ordering: dialog("Simulación: Pedir en Restaurante", "Pides la cena en un restaurante", [
        ["Waiter", "Are you ready to order?", "Yes. What do you recommend?", "Yes. What do you recommending?", "Se dice 'What do you recommend?'"],
        ["Waiter", "You should try the chicken curry. It's a little spicy.", "Great, I'll have the chicken curry.", "Great, I'll to have the chicken curry.", "Se dice 'I'll have...'"],
        ["Waiter", "And for dessert?", "What should I try?", "What should I to try?", "'should' + verbo base."],
      ]),
      // los audios de este ejercicio apuntaban a archivos inexistentes ("audio_order_pasta.mp3")
      ex5_food_orders: drag("Pregunta → respuesta", [
        "Is it spicy? = Yes, a little",
        "Do you have vegetarian dishes? = Yes, we have pasta and salads",
        "What do you recommend? = You should try the soup",
        "Can I have the bill? = Of course, here you are",
      ], "Arrastra cada pregunta hasta la respuesta del mesero."),
    },
    add: [
      match("En el restaurante", [
        "Reservation = Reserva",
        "Recommend = Recomendar",
        "Spicy = Picante",
        "Vegetarian = Vegetariano",
        "Tip = Propina",
        "Bill = Cuenta",
      ], "Une cada palabra con su traducción."),
      build("Recomendación", "🍰 Deberías probar la torta de chocolate", "You should try the chocolate cake", ["shoulds", "to"]),
      build("Obligación", "📅 Tenemos que reservar una mesa para el viernes", "We must book a table for Friday", ["musts", "to"]),
      cat("¿Consejo o prohibición?", [
        ["Should (consejo)", ["try the soup", "leave a tip", "book early"]],
        ["Mustn't (prohibido)", ["smoke inside", "eat peanuts if you're allergic", "park in front of the door"]],
      ]),
      fill("Vocabulario del restaurante", [
        "I don't eat meat. I'm ___. | vegetarian | spicy, waiter",
        "This sauce is very ___. | spicy | vegetarian, tip",
        "Can you ___ a good wine? | recommend | reservation, order to",
        "I have a ___ for two at 8. | reservation | recommend, menu",
      ]),
    ],
  },

  A2_culture_traditions: {
    objectives: ["Hablar de costumbres y festividades", "Diferenciar pasado simple y pasado continuo", "Usar when y while"],
    grammar: g(
      "Pasado simple vs. pasado continuo",
      "El pasado continuo describe una acción que estaba en progreso. El pasado simple, una acción completa o que interrumpe a la otra.",
      ["Pasado continuo: was / were + verbo-ing", "We were watching the parade.", "She was wearing a costume."],
      ["Pasado simple: acción terminada", "The parade started at 10.", "We celebrated the festival last year."],
      ["Acción larga + interrupción", "We were having dinner when the fireworks started."],
      ["while + acción larga / when + acción corta", "While they were dancing, it started to rain."],
    ),
    vocab: [
      v("Ceremony", "Ceremonia", "The ceremony was very long"),
      v("Celebrate", "Celebrar", "We celebrate this festival every year"),
      v("Costume", "Disfraz / Traje típico", "She was wearing a traditional costume"),
      v("Parade", "Desfile", "We were watching the parade"),
    ],
    replace: {
      // la tabla original tenía una sola respuesta por tiempo verbal, no una por pronombre: era imposible de completar
      ex2_cultural_verbs: fill("Pasado Simple vs Continuo - Cultura", [
        "We ___ dinner when the fireworks started. | were having | had, are having",
        "While they ___, it started to rain. | were dancing | danced, dance",
        "The parade ___ at 10 a.m. yesterday. | started | was starting, starts",
        "Last year we ___ the festival in Mexico. | celebrated | celebrate, are celebrating",
        "What ___ you doing at 8 p.m.? | were | was, did",
      ]),
      ex4_culture_conversation: dialog("Conversación sobre Cultura", "Un amigo te pregunta por un festival", [
        ["Friend", "What were you doing during the festival?", "We were watching the parade.", "We was watching the parade.", "Con 'we' se usa 'were'."],
        ["Friend", "Did anything special happen?", "Yes! While we were dancing, the fireworks started.", "Yes! While we danced, the fireworks were start.", "Acción larga: continuo; interrupción: simple."],
      ]),
    },
    add: [
      match("Cultura", [
        "Ceremony = Ceremonia",
        "Celebrate = Celebrar",
        "Costume = Disfraz",
        "Parade = Desfile",
        "Fireworks = Fuegos artificiales",
        "Tradition = Tradición",
      ], "Une cada palabra con su traducción."),
      build("Interrupción", "🌧️ Estaba mirando el desfile cuando empezó a llover", "I was watching the parade when it started to rain", ["were", "watched"]),
      build("Acción terminada", "🎉 Celebraron el festival el año pasado", "They celebrated the festival last year", ["were", "celebrate"]),
      fill("¿Was o were?", [
        "I ___ wearing a costume. | was | were, did",
        "The children ___ singing. | were | was, did",
        "___ she dancing at the party? | Was | Were, Did",
        "We ___ celebrating when you called. | were | was, are",
      ]),
      cat("¿Acción larga o interrupción?", [
        ["Acción larga (past continuous)", ["was walking", "were dancing", "was sleeping"]],
        ["Interrupción (past simple)", ["saw", "stopped", "started"]],
      ]),
      memory("Memory: Festividades", [
        "Holiday = Feriado",
        "Mask = Máscara",
        "Flag = Bandera",
        "Folk dance = Danza folclórica",
        "Candle = Vela",
      ]),
    ],
  },

  A2_music_concerts: {
    objectives: ["Hablar de música y conciertos", "Usar el presente continuo con listen, watch, look", "Saber por qué hear, see y sound no suelen ir en continuo"],
    grammar: g(
      "Presente continuo y verbos de percepción",
      "Algunos verbos de percepción son acciones voluntarias y van en continuo. Otros describen lo que percibimos sin querer: van en presente simple o con 'can'.",
      ["Acción voluntaria (sí van en continuo): listen, watch, look", "I am listening to the radio.", "We are watching the concert."],
      ["Percepción involuntaria: hear, see, sound, smell", "I can hear the drums.", "This song sounds great."],
      ["No es natural decir 'I am hearing'", "✅ I can hear the music.", "❌ I am hearing the music."],
      ["listen to (escuchar con atención) / hear (oír)", "I'm listening to jazz.", "Can you hear that?"],
    ),
    vocab: [
      v("Band", "Banda", "The band is playing on stage"),
      v("Singer", "Cantante", "The singer has a beautiful voice"),
      v("Stage", "Escenario", "The musicians are on stage"),
      v("Ticket", "Entrada", "I bought two tickets for the concert"),
    ],
    fixVocab: (vocab) => {
      // el ejemplo original ("I am hearing beautiful music") enseñaba una forma poco natural
      const hearing = vocab.find((w) => w.word === "Hearing");
      if (hearing) {
        hearing.word = "Hear";
        hearing.translation = "Oír";
        hearing.examples = ["I can hear the music from here"];
      }
    },
    fix: (exs) => {
      exs.find((e) => e.id === "ex1_music_vocabulary").config.pairs.forEach((p) => {
        // un par venía con "back" en lugar de "to" y quedaba sin pareja
        if (p.back && !p.to) {
          p.to = p.back;
          delete p.back;
        }
      });
    },
    replace: {
      ex2_perception_verbs: conj("Verbos de Percepción en Presente Continuo", "to listen", "Present Continuous", {
        I: "am listening", You: "are listening", He: "is listening", We: "are listening", They: "are listening",
      }),
      ex3_music_experiences: build("Describe Experiencias Musicales", "🎵 Estamos escuchando un concierto", "We are listening to a concert", ["hearing", "is"]),
      ex4_concert_conversation: dialog("Conversación sobre Conciertos", "Hablas de música con un amigo", [
        ["Friend", "What are you listening to right now?", "I'm listening to a jazz album.", "I'm hearing to a jazz album.", "Acción voluntaria: 'listening to'."],
        ["Friend", "Can you hear the drums in this song?", "Yes, I can hear them. They sound great!", "Yes, I am hearing them. They are sounding great!", "'Hear' y 'sound' no suelen ir en continuo."],
      ]),
    },
    add: [
      fill("Verbos de percepción", [
        "Shh! I ___ to the radio. | am listening | listen, am hearing",
        "I can ___ the music from my room. | hear | listen, hearing",
        "This song ___ beautiful. | sounds | is sounding, sound",
        "Look! The band ___ on stage now. | is playing | plays, play",
        "We ___ the concert on TV right now. | are watching | watch, are seeing",
      ]),
      match("En el concierto", [
        "Band = Banda",
        "Singer = Cantante",
        "Stage = Escenario",
        "Ticket = Entrada",
        "Audience = Público",
        "Drums = Batería",
      ], "Une cada palabra con su traducción."),
      build("Oír", "🎤 ¿Puedes oír a la cantante?", "Can you hear the singer", ["listen", "are"]),
      cat("¿Van en continuo?", [
        ["Sí (acción voluntaria)", ["listen", "watch", "look"]],
        ["Casi nunca", ["hear", "see", "sound"]],
      ], "Clasifica cada verbo según si se usa en presente continuo."),
      memory("Memory: Música", [
        "Classical music = Música clásica",
        "Folk music = Música folclórica",
        "Singer = Cantante",
        "Guitarist = Guitarrista",
        "Concert hall = Sala de conciertos",
      ]),
    ],
  },

  A2_art_creativity: {
    objectives: ["Hablar de arte y artistas", "Contar en pasado con verbos irregulares", "Usar did / didn't"],
    grammar: g(
      "Pasado simple de verbos irregulares",
      "Los verbos irregulares tienen una forma propia en pasado, igual para todas las personas. En preguntas y negativas se vuelve al verbo base.",
      ["Formas frecuentes", "draw → drew", "make → made", "see → saw", "begin → began", "sell → sold", "become → became"],
      ["Afirmativo", "Picasso made many paintings.", "She began to paint at six."],
      ["Pregunta: Did + sujeto + verbo base?", "Did you take that photo?"],
      ["Negativo: didn't + verbo base", "✅ He didn't sell it.", "❌ He didn't sold it."],
    ),
    vocab: [
      v("Painter", "Pintor/a", "Frida Kahlo was a famous painter"),
      v("Sculptor", "Escultor/a", "The sculptor made a statue"),
      v("Museum", "Museo", "We visited the art museum"),
      v("Exhibition", "Exposición", "We saw a great exhibition"),
    ],
    replace: {
      ex4_art_conversation: dialog("Conversación sobre Arte", "Hablas con una amiga artista", [
        ["Artist", "What did you do last weekend?", "I drew some portraits in the park.", "I drawed some portraits in the park.", "'Draw' es irregular: 'drew'."],
        ["Artist", "Did you sell any?", "Yes, I sold two of them!", "Yes, I selled two of them!", "'Sell' → 'sold'."],
      ]),
    },
    add: [
      fill("Verbos irregulares", [
        "Picasso ___ many famous paintings. | made | maked, make",
        "We ___ a great exhibition yesterday. | saw | seed, see",
        "She ___ to paint when she was six. | began | beginned, begin",
        "He ___ a famous sculptor. | became | becomed, become",
        "Did you ___ that photo? | take | took, taken",
      ]),
      match("Arte", [
        "Painter = Pintor",
        "Sculptor = Escultor",
        "Museum = Museo",
        "Exhibition = Exposición",
        "Brush = Pincel",
        "Portrait = Retrato",
      ], "Une cada palabra con su traducción."),
      build("Un retrato", "🖼️ Ella pintó un retrato de su madre", "She painted a portrait of her mother", ["paint", "did"]),
      drag("Presente → pasado", [
        "Draw = Drew",
        "Sell = Sold",
        "Begin = Began",
        "Become = Became",
        "Take = Took",
      ], "Arrastra cada verbo hasta su forma en pasado."),
    ],
  },

  A2_events_celebrations: {
    objectives: ["Contar cómo fue un evento", "Combinar pasado simple y pasado continuo", "Usar when y while"],
    grammar: g(
      "Pasado simple vs. pasado continuo en eventos",
      "Para contar una fiesta se combinan: el pasado continuo pone la escena (lo que estaba pasando) y el pasado simple cuenta los hechos.",
      ["Escena: was / were + -ing", "Everyone was dancing.", "It was raining."],
      ["Hechos: pasado simple", "She arrived at 8.", "They got married in June."],
      ["Una hora concreta → continuo", "At nine I was dancing at the wedding."],
      ["while + continuo / when + simple", "While the band was playing, my uncle fell down."],
    ),
    vocab: [
      v("Anniversary", "Aniversario", "My parents celebrated their anniversary"),
      v("Graduation", "Graduación", "Her graduation was in July"),
      v("Invite", "Invitar", "She invited all her friends"),
      v("Surprise party", "Fiesta sorpresa", "We organized a surprise party"),
    ],
    replace: {
      // la tabla original tenía una sola respuesta por tiempo verbal, no una por pronombre: era imposible de completar
      ex2_past_tenses: fill("Pasado Simple vs Pasado Continuo", [
        "I ___ my birthday when you called. | was celebrating | celebrated, am celebrating",
        "She ___ at the party at 8 p.m. | arrived | was arriving, arrives",
        "While we ___, the lights went out. | were dancing | danced, dance",
        "They ___ married last June. | got | were getting, get",
        "What ___ you doing when the cake arrived? | were | did, was",
      ]),
      ex4_party_conversation: dialog("Conversación sobre un Evento", "Un amigo te pregunta por una boda", [
        ["Friend", "What were you doing last night at nine?", "I was dancing at my cousin's wedding.", "I danced at my cousin's wedding when nine.", "A una hora concreta: pasado continuo."],
        ["Friend", "Did something funny happen?", "Yes! While the band was playing, my uncle fell down.", "Yes! While the band played, my uncle was fall down.", "Acción larga: continuo; acción corta: simple."],
      ]),
    },
    add: [
      match("Eventos", [
        "Anniversary = Aniversario",
        "Graduation = Graduación",
        "Invite = Invitar",
        "Surprise party = Fiesta sorpresa",
        "Guest = Invitado",
        "Toast = Brindis",
      ], "Une cada palabra con su traducción."),
      build("Escena + hecho", "🎂 Estábamos comiendo torta cuando paró la música", "We were eating cake when the music stopped", ["was", "eat"]),
      build("Invitar", "💌 Ella invitó a todos sus amigos a la fiesta", "She invited all her friends to the party", ["invite", "was"]),
      cat("¿Past simple o past continuous?", [
        ["Past simple", ["I arrived at 8", "She opened the gifts", "We got married in 2020"]],
        ["Past continuous", ["I was dancing", "They were singing", "It was raining"]],
      ]),
      fill("Was / were + -ing", [
        "It ___ raining during the wedding. | was | were, did",
        "The guests ___ laughing. | were | was, did",
        "___ you celebrating your anniversary? | Were | Was, Did",
        "My brother ___ a speech when the lights went out. | was giving | gave, gives",
      ]),
    ],
  },
};
