const { v, g, match, memory, fill, build, drag, cat, dialog } = require("../../helpers");

// Unidades "Comida y Bebidas" y "En el Restaurante" — guía A1 clases 11 y 13
module.exports = {
  A1_food_basics: {
    objectives: ["Nombrar alimentos básicos", "Usar a / an / some", "Pedir comida con 'I want' y 'Can I have'"],
    grammar: g(
      "A, an y some con comida",
      "Los alimentos que se pueden contar llevan 'a' o 'an' en singular. Los que no se pueden contar llevan 'some'.",
      ["a + consonante", "a banana", "a sandwich"],
      ["an + vocal", "an apple", "an egg"],
      ["some + incontables (y plurales)", "some water", "some bread", "some apples"],
      ["Los contables tienen plural con -s", "one apple → two apples", "one egg → three eggs"],
      ["Los incontables no tienen plural ni 'a'", "✅ some bread", "❌ a bread", "❌ breads"],
    ),
    vocab: [
      v("Banana", "Banana / Plátano", "I eat a banana every morning"),
      v("Milk", "Leche", "I want some milk"),
      v("Rice", "Arroz", "She wants some rice"),
      v("Cheese", "Queso", "I like cheese"),
    ],
    add: [
      fill("¿A, an o some?", [
        "I want ___ apple. | an | a, some",
        "I want ___ banana. | a | an, some",
        "Can I have ___ water? | some | a, an",
        "I eat ___ egg for breakfast. | an | a, some",
        "She wants ___ rice. | some | a, an",
      ]),
      memory("Memory: Más comida", [
        "Banana = Plátano",
        "Milk = Leche",
        "Rice = Arroz",
        "Cheese = Queso",
        "Breakfast = Desayuno",
      ]),
      build("Pide leche", "🥛 Quiero un poco de leche, por favor", "I want some milk please", ["a", "an"]),
      build("El desayuno", "🍳 Ella come un huevo en el desayuno", "She eats an egg for breakfast", ["eat", "a"]),
      drag("De singular a plural", [
        "One apple = Two apples",
        "One egg = Three eggs",
        "One banana = Four bananas",
        "One sandwich = Two sandwiches",
      ], "Arrastra cada alimento hasta su plural."),
      dialog("Simulación: El desayuno", "Tu mamá te pregunta qué quieres desayunar", [
        ["Mom", "What do you want for breakfast?", "I want an egg and some bread.", "I want a egg and a bread.", "'An egg' (vocal) y 'some bread' (incontable)."],
        ["Mom", "Do you want some milk?", "Yes, please.", "Yes, I am.", "Responde 'Yes, please'."],
      ]),
    ],
  },

  A1_food: {
    objectives: ["Clasificar alimentos en contables e incontables", "Hablar de comida saludable", "Usar is / are con alimentos"],
    grammar: g(
      "Sustantivos contables e incontables",
      "Contables son los que puedes contar uno por uno. Incontables son líquidos, masas o cosas que no se cuentan por unidad.",
      ["Contables: tienen singular y plural", "an apple / two apples", "a carrot / three carrots"],
      ["Incontables: solo singular, sin a / an", "water", "milk", "bread", "rice", "cheese"],
      ["Contable plural + are", "Carrots are good for you."],
      ["Incontable + is", "Milk is healthy.", "Fish is delicious."],
      ["Para contar incontables se usa un recipiente", "a glass of milk", "a piece of bread"],
    ),
    add: [
      match("Alimentos", [
        "Chicken = Pollo",
        "Fish = Pescado",
        "Cheese = Queso",
        "Carrot = Zanahoria",
        "Milk = Leche",
        "Banana = Plátano",
      ], "Une cada alimento con su traducción."),
      memory("Memory: Comida", [
        "Apple = Manzana",
        "Bread = Pan",
        "Egg = Huevo",
        "Water = Agua",
        "Carrot = Zanahoria",
      ]),
      cat("¿Saludable o no?", [
        ["Saludable", ["Apple", "Carrot", "Fish", "Water"]],
        ["Poco saludable", ["Candy", "Soda", "Fries", "Cake"]],
      ]),
      fill("Contables e incontables", [
        "I eat ___ apple every day. | an | a, some",
        "I drink ___ milk. | some | a, an",
        "There are three ___ in the bag. | carrots | carrot, a carrot",
        "Fish ___ healthy. | is | are, am",
        "Carrots ___ good for you. | are | is, am",
      ]),
      build("Cuándo comes", "🐟 Como pescado los viernes", "I eat fish on Fridays", ["eats", "in"]),
      build("Con recipiente", "🥛 Bebo un vaso de leche", "I drink a glass of milk", ["an", "drinks"]),
      dialog("Simulación: Con la nutricionista", "Una doctora te pregunta por tu alimentación", [
        ["Doctor", "What do you eat for breakfast?", "I eat an apple and some bread.", "I eat a apple and a bread.", "'An apple' y 'some bread'."],
        ["Doctor", "Good. Do you drink water?", "Yes, I drink some water every day.", "Yes, I drink a water every day.", "'Water' es incontable: no lleva 'a'."],
      ]),
    ],
  },

  A1_drinks_beverages: {
    objectives: ["Nombrar bebidas comunes", "Pedir una bebida con 'I would like'", "Usar a cup of / a glass of / a bottle of"],
    grammar: g(
      "Pedir bebidas: I would like + recipiente",
      "Las bebidas son incontables. Para pedir una cantidad se nombra el recipiente. 'I would like' es la forma amable de 'I want'.",
      ["I would like + bebida (más amable que 'I want')", "I would like a coffee, please.", "I'd like some tea."],
      ["Ofrecer: Would you like...?", "Would you like some water?"],
      ["Recipiente + of + bebida", "a cup of coffee", "a glass of juice", "a bottle of water"],
      ["Con = with / sin = without", "Coffee with milk.", "Tea without sugar."],
    ),
    vocab: [
      v("Water", "Agua", "A glass of water, please"),
      v("Milk", "Leche", "Coffee with milk"),
      v("Hot chocolate", "Chocolate caliente", "I like hot chocolate in winter"),
      v("Lemonade", "Limonada", "I would like a lemonade"),
    ],
    replace: {
      ex4_cafe_conversation: dialog("Simulación: Pedir en una Cafetería", "Pides una bebida en una cafetería", [
        ["Barista", "What would you like to drink?", "I would like a coffee, please.", "I am a coffee, please.", "Para pedir: 'I would like...'"],
        ["Barista", "With milk or sugar?", "With milk, please.", "With bread, please.", "Te ofrecen leche o azúcar."],
        ["Barista", "Here you are.", "Thank you!", "You're welcome!", "Te entregan el pedido: agradece."],
      ]),
    },
    add: [
      match("Recipientes", [
        "A cup of = Una taza de",
        "A glass of = Un vaso de",
        "A bottle of = Una botella de",
        "A can of = Una lata de",
      ], "Une cada recipiente con su traducción."),
      fill("En la cafetería", [
        "A ___ of coffee, please. | cup | plate, slice",
        "A ___ of water, please. | glass | plate, piece",
        "Would you ___ some tea? | like | likes, liking",
        "I ___ like a lemonade. | would | am, do",
        "Coffee with ___, please. | milk | bread, rice",
      ]),
      build("Pide un té", "🍵 Quisiera una taza de té", "I would like a cup of tea", ["am", "likes"]),
      build("Ofrece agua", "💧 ¿Quieres un poco de agua?", "Would you like some water", ["do", "likes"]),
      drag("¿En qué viene?", [
        "Coffee = A cup of",
        "Soda = A can of",
        "Orange juice = A glass of",
        "Mineral water = A bottle of",
      ], "Arrastra cada bebida hasta su recipiente habitual."),
    ],
  },

  A1_food_restaurants: {
    grammar: g(
      "Contables, incontables, some / any y 'would like'",
      "En el restaurante se combinan tres cosas: saber si un alimento se cuenta, usar some / any y pedir con amabilidad.",
      ["Contables: a / an y plural", "a burger", "an apple", "two tomatoes"],
      ["Incontables: sin plural", "rice", "water", "pasta", "milk"],
      ["some en afirmativas", "I have some rice.", "There is some pasta."],
      ["any en negativas y preguntas", "I don't have any milk.", "Is there any sugar?"],
      ["Pedir con amabilidad", "I would like a burger, please.", "Can I have a glass of water?"],
    ),
    vocab: [
      v("Menu", "Menú / Carta", "Can I see the menu, please?"),
      v("Waiter", "Mesero/a", "The waiter brings the food"),
      v("Tip", "Propina", "We leave a tip for the waiter"),
    ],
  },

  A1_restaurant_phrases: {
    objectives: ["Pedir una mesa y el menú", "Ordenar comida con amabilidad", "Pedir la cuenta"],
    grammar: g(
      "Pedir algo con amabilidad: Can I have...?",
      "En un restaurante no se dan órdenes: se pide con 'Can I have...?' o 'I would like...' y se agrega 'please'.",
      ["Can I have + cosa + please?", "Can I have the menu, please?", "Can I have the bill, please?"],
      ["I would like + comida", "I would like the pizza, please."],
      ["A table for + número", "A table for two, please."],
      ["'I want' suena brusco; mejor 'I would like'", "😐 I want pizza.", "🙂 I would like pizza, please."],
    ),
    vocab: [
      v("Waiter", "Mesero / Camarero", "The waiter is very kind"),
      v("Dessert", "Postre", "I would like a dessert"),
      v("Reservation", "Reserva", "I have a reservation for two"),
      v("Delicious", "Delicioso", "The food is delicious"),
    ],
    replace: {
      ex3_restaurant_conversation: dialog("Simulación: Pedir en Restaurante", "Llegas a un restaurante a cenar", [
        ["Waiter", "Good evening. A table for two?", "Yes, please.", "Yes, I am two.", "Responde 'Yes, please'."],
        ["Waiter", "Are you ready to order?", "Yes, I would like the pizza, please.", "Yes, I am pizza.", "Usa 'I would like...'"],
        ["Waiter", "Anything else?", "No, thank you. Can I have the bill?", "No, thank you. Can I am the bill?", "La forma es 'Can I have...?'"],
      ]),
    },
    add: [
      memory("Memory: En el restaurante", [
        "Waiter = Mesero",
        "Dessert = Postre",
        "Reservation = Reserva",
        "Delicious = Delicioso",
        "Order = Pedido",
      ]),
      fill("Frases del restaurante", [
        "Can I ___ the menu, please? | have | has, am",
        "A table ___ two, please. | for | of, to",
        "I would ___ the chicken. | like | likes, liking",
        "Can I have the ___, please? (para pagar) | bill | table, waiter",
        "The food is ___! | delicious | reservation, menu",
      ]),
      build("Pide una mesa", "🍽️ Una mesa para dos, por favor", "A table for two please", ["of", "menu"]),
      build("Pide la cuenta", "🧾 ¿Me trae la cuenta, por favor?", "Can I have the bill please", ["has", "am"]),
      drag("El orden de la cena", [
        "First = A table for two, please",
        "Second = Can I see the menu?",
        "Third = I would like the pasta",
        "Finally = Can I have the bill?",
      ], "Arrastra cada momento hasta la frase que corresponde."),
      cat("¿Quién lo dice?", [
        ["Cliente", ["Can I have the menu?", "The bill, please", "I would like pasta"]],
        ["Mesero", ["Are you ready to order?", "Here is your bill", "Anything to drink?"]],
      ]),
    ],
  },

  A1_ordering_food: {
    grammar: g(
      "Would like: pedir y ofrecer",
      "'Would like' es la forma amable de 'want'. Es igual para todas las personas y se suele contraer a 'd like.",
      ["Pedir: I would like + comida", "I would like a hamburger.", "We would like two salads."],
      ["Contracción: I'd like", "I'd like a salad, please."],
      ["Ofrecer: Would you like...?", "Would you like some fries?", "Would you like a dessert?"],
      ["No cambia con he / she", "✅ She would like soup.", "❌ She woulds like soup."],
    ),
    vocab: [
      v("Salad", "Ensalada", "I would like a salad"),
      v("Soup", "Sopa", "The soup is hot"),
      v("Fries", "Papas fritas", "A hamburger with fries"),
      v("Main course", "Plato principal", "The main course is chicken"),
      v("Starter", "Entrada", "Would you like a starter?"),
    ],
    add: [
      match("En el menú", [
        "Salad = Ensalada",
        "Soup = Sopa",
        "Fries = Papas fritas",
        "Main course = Plato principal",
        "Starter = Entrada",
      ], "Une cada palabra con su traducción."),
      fill("Would like", [
        "I ___ like a hamburger, please. | would | am, do",
        "___ you like some fries? | Would | Are, Does",
        "I'd ___ a salad. | like | likes, to like",
        "We would like two ___. | salads | salad, a salad",
        "Would you like ___ dessert? | a | an, two",
      ]),
      build("Pide una ensalada", "🥗 Quisiera una ensalada, por favor", "I would like a salad please", ["am", "likes"]),
      build("Ofrece papas", "🍟 ¿Quieres papas fritas?", "Would you like some fries", ["do", "likes"]),
      cat("Partes del menú", [
        ["Starter", ["Soup", "Salad"]],
        ["Main course", ["Hamburger", "Chicken with rice"]],
        ["Dessert", ["Ice cream", "Cake"]],
      ]),
      dialog("Simulación: Tomando el pedido", "El mesero toma tu pedido", [
        ["Waiter", "Would you like a starter?", "Yes, I would like the soup, please.", "Yes, I am the soup, please.", "Para pedir: 'I would like'."],
        ["Waiter", "And for the main course?", "A hamburger with fries, please.", "A table for two, please.", "Te preguntan el plato principal."],
        ["Waiter", "Would you like something to drink?", "Still water, please.", "The bill is water.", "Pide una bebida."],
      ]),
    ],
  },

  A1_shopping: {
    grammar: g(
      "Cuantificadores: some, any, much, many",
      "Sirven para hablar de cantidades sin dar un número exacto. Cuál usar depende de si el sustantivo se puede contar.",
      ["some: afirmativas", "I have some money.", "She bought some dresses."],
      ["any: negativas y preguntas", "I don't have any money.", "Do you have any discounts?"],
      ["many: con contables", "How many shirts?", "I don't have many shoes."],
      ["much: con incontables", "How much money?", "I don't have much time."],
      ["Precio: How much is / are...?", "How much is this jacket?", "How much are these shoes?"],
    ),
    vocab: [
      v("Price", "Precio", "What is the price?"),
      v("Cheap", "Barato", "This shirt is cheap"),
      v("Expensive", "Caro", "The jacket is expensive"),
    ],
    replace: {
      // el original tenía dos destinos "MANY" y dos "MUCH": soltar en el "otro" daba error
      shop_ex1_quantifiers_match: cat("Much vs Many", [
        ["Many (contables)", ["apples", "shirts", "dollars"]],
        ["Much (incontables)", ["milk", "money", "time"]],
      ], "Clasifica cada sustantivo: ¿se usa con 'many' o con 'much'?"),
    },
    add: [
      fill("En la tienda", [
        "How much ___ this shirt? | is | are, am",
        "How much ___ these shoes? | are | is, be",
        "How ___ apples do you want? | many | much, any",
        "I don't have ___ money. | any | some, many",
        "It is too ___. I can't buy it. | expensive | cheap, discount",
      ]),
      build("Pregunta por descuentos", "🏷️ ¿Tienen algún descuento?", "Do you have any discounts", ["much", "is"]),
      dialog("Simulación: Comprando una chaqueta", "Estás en una tienda de ropa", [
        ["Clerk", "Good morning. Can I help you?", "Yes, how much is this jacket?", "Yes, how many is this jacket?", "Para el precio: 'How much'."],
        ["Clerk", "It is fifty dollars.", "It is expensive. Do you have any discounts?", "It is cheap. How many discount is?", "Cincuenta dólares es caro: 'expensive'."],
        ["Clerk", "Yes, today it is forty dollars.", "Great, I will take it. Can I have the receipt?", "Great, I will take it. Can I have the size?", "El comprobante es 'receipt'."],
      ]),
    ],
  },

  A1_paying_the_bill: {
    grammar: g(
      "Pagar: Can I...? y How much...?",
      "Para pedir permiso o un favor se usa 'Can I...?'. Para preguntar el precio, 'How much...?'.",
      ["Can I + verbo...?", "Can I have the bill, please?", "Can I pay by card?"],
      ["Forma de pago: by card / in cash", "I pay by card.", "She pays in cash."],
      ["Precio", "How much is it? — It is twenty dollars."],
      ["Al entregar algo: Here is... / Here you are", "Here is your change.", "Here you are."],
    ),
    vocab: [
      v("Change", "Cambio / Vuelto", "Here is your change"),
      v("Receipt", "Recibo", "Can I have the receipt?"),
      v("Price", "Precio", "The price is twenty dollars"),
      v("Pay", "Pagar", "Can I pay by card?"),
    ],
    add: [
      match("Palabras para pagar", [
        "Change = Vuelto",
        "Receipt = Recibo",
        "Price = Precio",
        "Pay = Pagar",
        "Total = Total",
      ], "Une cada palabra con su traducción."),
      fill("Al pagar", [
        "Can I pay ___ card? | by | in, on",
        "Can I pay ___ cash? | in | by, at",
        "How ___ is it? | much | many, any",
        "Here is your ___. (el vuelto) | change | tip, bill",
        "Can I ___ the bill, please? | have | has, am",
      ]),
      build("Pagar con tarjeta", "💳 ¿Puedo pagar con tarjeta?", "Can I pay by card", ["in", "am"]),
      build("Pregunta el precio", "💰 ¿Cuánto es?", "How much is it", ["many", "are"]),
      dialog("Simulación: La cuenta", "Terminas de cenar y vas a pagar", [
        ["Waiter", "Here is your bill. It is thirty dollars.", "Can I pay by card?", "Can I am card?", "La forma es 'Can I pay by card?'"],
        ["Waiter", "Of course. Would you like the receipt?", "Yes, please.", "Yes, I am.", "Responde 'Yes, please'."],
        ["Waiter", "Thank you. Have a nice evening!", "Thank you. Here is a tip for you.", "Thank you. Here is a bill for you.", "La propina es 'tip'."],
      ]),
    ],
  },
};
