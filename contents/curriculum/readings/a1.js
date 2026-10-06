// Lecturas cortas de A1: 2 por unidad. Formato en ../readings-helpers.js.
const { reading } = require("../readings-helpers");

module.exports = [
  // ───────────── Primeros Pasos ─────────────
  reading({
    unitId: "unitA1_first_steps",
    title: "Hello, I'm Sofia",
    titleEs: "Hola, soy Sofía",
    text: [
      "Hello! My name is Sofia. I am twenty years old. I am from Argentina, but I live in London now. I am a student.",
      "This is my friend Tom. He is English. He is twenty-two years old. Tom is a teacher. He is very nice!",
      "We are in the same building. My flat is number 4 and his flat is number 6. Every morning we say: \"Good morning! How are you?\"",
    ],
    glossary: ["live = vivir", "now = ahora", "friend = amigo/a", "building = edificio", "flat = departamento", "every morning = todas las mañanas"],
    questions: [
      "Where is Sofia from? | Argentina | England, Spain | Sofía dice: \"I am from Argentina\".",
      "Where does Sofia live now? | In London | In Argentina, In Madrid | \"I live in London now\".",
      "How old is Tom? | Twenty-two | Twenty, Twenty-four | \"He is twenty-two years old\".",
      "What is Tom's job? | He is a teacher. | He is a student., He is a doctor. | \"Tom is a teacher\".",
      "Sofia and Tom live in the same building. | True | False | \"We are in the same building\".",
    ],
  }),
  reading({
    unitId: "unitA1_first_steps",
    title: "The First Day of Class",
    titleEs: "El primer día de clase",
    text: [
      "It is Monday. It is the first day of the English class. The teacher is Mrs. Brown. She says: \"Good morning, everyone! Welcome!\"",
      "A boy says: \"Hi! I'm Carlos. I'm from Mexico. Nice to meet you.\" A girl answers: \"Nice to meet you too. My name is Yuki. I'm from Japan.\"",
      "Carlos asks: \"How do you spell your name?\" Yuki says: \"Y-U-K-I.\" They are happy. They are new friends.",
    ],
    glossary: ["first = primer/a", "everyone = todos", "welcome = bienvenidos", "boy = chico", "girl = chica", "spell = deletrear", "happy = feliz"],
    questions: [
      "What day is it? | Monday | Friday, Sunday | El texto empieza con \"It is Monday\".",
      "Who is Mrs. Brown? | The teacher | A student, Carlos's mother | \"The teacher is Mrs. Brown\".",
      "Where is Carlos from? | Mexico | Japan, Spain | \"I'm from Mexico\".",
      "How do you spell the girl's name? | Y-U-K-I | Y-O-K-I, J-U-K-I | Yuki deletrea: \"Y-U-K-I\".",
      "Carlos and Yuki are old friends. | False | True | Son \"new friends\": se conocen ese día.",
    ],
  }),

  // ───────────── Conociendo Personas ─────────────
  reading({
    unitId: "unitA1_meeting_people",
    title: "At a Party",
    titleEs: "En una fiesta",
    text: [
      "Lucy is at a party. She doesn't know many people. A tall man comes and says: \"Hi! I'm David. What's your name?\"",
      "\"I'm Lucy. Nice to meet you, David,\" she says. \"Are you a friend of Anna?\" David answers: \"Yes, I am. Anna is my sister!\"",
      "Then David introduces his friend: \"Lucy, this is Mark. He is from Canada.\" Mark smiles and says: \"Hello, Lucy! How are you?\" \"I'm fine, thanks,\" says Lucy. Now she has two new friends.",
    ],
    glossary: ["party = fiesta", "doesn't know = no conoce", "tall = alto", "sister = hermana", "introduces = presenta", "smiles = sonríe"],
    questions: [
      "Where is Lucy? | At a party | At school, At work | \"Lucy is at a party\".",
      "Who is Anna? | David's sister | Lucy's sister, Mark's friend | David dice: \"Anna is my sister!\"",
      "Where is Mark from? | Canada | England, Australia | \"He is from Canada\".",
      "How is Lucy? | She is fine. | She is sad., She is tired. | Lucy responde: \"I'm fine, thanks\".",
      "At the end, Lucy has two new friends. | True | False | \"Now she has two new friends\".",
    ],
  }),
  reading({
    unitId: "unitA1_meeting_people",
    title: "A Meeting at the Office",
    titleEs: "Una reunión en la oficina",
    text: [
      "Mr. Green is the manager of a small company. Today he meets a new employee. Her name is Ms. Laura Pérez.",
      "\"Good afternoon, Ms. Pérez. I'm Robert Green. Pleased to meet you,\" he says. \"Good afternoon, Mr. Green. Pleased to meet you too,\" she answers. They shake hands.",
      "\"Please, call me Laura,\" she says. \"OK, Laura. And you can call me Robert,\" he answers. Then he shows her the office. \"Goodbye, Laura. See you tomorrow!\"",
    ],
    glossary: ["manager = gerente", "company = empresa", "employee = empleado/a", "pleased to meet you = encantado/a de conocerte", "shake hands = darse la mano", "call me = llámame"],
    questions: [
      "What is Mr. Green's job? | He is a manager. | He is a teacher., He is a student. | \"Mr. Green is the manager of a small company\".",
      "What is the new employee's first name? | Laura | Robert, Pérez | Su nombre es \"Laura Pérez\"; Pérez es el apellido.",
      "What time of day is it? | Afternoon | Morning, Night | Se saludan con \"Good afternoon\".",
      "What do they do after the greeting? | They shake hands. | They eat lunch., They say goodbye. | \"They shake hands\".",
      "Laura wants Mr. Green to use her first name. | True | False | Ella dice: \"Please, call me Laura\".",
    ],
  }),

  // ───────────── Números y Colores ─────────────
  reading({
    unitId: "unitA1_numbers_colors",
    title: "My Favourite Colours",
    titleEs: "Mis colores favoritos",
    text: [
      "My name is Ben and I love colours. My favourite colour is blue. My bedroom is blue and my bike is blue too.",
      "My sister Emma likes pink and purple. She has a pink bag and fifteen purple pencils! My mother's favourite colour is green, like the plants in our garden.",
      "My father says: \"Black and white are the best colours.\" His car is black and his shirts are white. And you? What is your favourite colour?",
    ],
    glossary: ["favourite = favorito/a", "bedroom = dormitorio", "bike = bicicleta", "bag = bolso", "pencils = lápices", "garden = jardín", "shirts = camisas"],
    questions: [
      "What is Ben's favourite colour? | Blue | Green, Black | \"My favourite colour is blue\".",
      "How many purple pencils does Emma have? | Fifteen | Five, Fifty | \"fifteen purple pencils\".",
      "What colour is Emma's bag? | Pink | Purple, Blue | \"She has a pink bag\".",
      "What colour is the father's car? | Black | White, Green | \"His car is black\".",
      "Ben's mother likes green. | True | False | \"My mother's favourite colour is green\".",
    ],
  }),
  reading({
    unitId: "unitA1_numbers_colors",
    title: "An International Class",
    titleEs: "Una clase internacional",
    text: [
      "In my English class there are twelve students. We are from different countries. Pedro is Spanish and Giulia is Italian. Ahmed is Egyptian.",
      "There are three Brazilian students: Ana, João and Carla. They speak Portuguese. Li is Chinese and he speaks Chinese and a little English.",
      "Our teacher, Sarah, is American. She is thirty-five years old. Her phone number is on the board: 555-0193. We all speak English in class!",
    ],
    glossary: ["there are = hay", "countries = países", "different = diferentes", "speak = hablar", "a little = un poco", "board = pizarrón"],
    questions: [
      "How many students are in the class? | Twelve | Twenty, Three | \"there are twelve students\".",
      "What nationality is Giulia? | Italian | Spanish, Brazilian | \"Giulia is Italian\".",
      "How many Brazilian students are there? | Three | Two, Four | \"There are three Brazilian students\".",
      "Where is the teacher from? | The United States | England, China | Sarah es \"American\" (de Estados Unidos).",
      "Li speaks a little English. | True | False | \"he speaks Chinese and a little English\".",
    ],
  }),

  // ───────────── Mi Entorno Cercano ─────────────
  reading({
    unitId: "unitA1_my_environment",
    title: "My Family",
    titleEs: "Mi familia",
    text: [
      "Hi, I'm Mia. I have a big family. My father's name is Paul. He is tall and he has short black hair. My mother, Helen, is short and she has long blond hair.",
      "I have two brothers and one sister. My brothers are twins: Leo and Sam. They are ten years old. My sister, Kate, is sixteen. She is very funny.",
      "My grandparents live with us. My grandmother has blue eyes and she always wears a red jumper. My grandfather wears glasses. I love my family!",
    ],
    glossary: ["tall = alto/a", "short = bajo/a, corto", "hair = pelo", "twins = mellizos", "funny = divertido/a", "grandparents = abuelos", "wears = usa (ropa)", "jumper = suéter", "glasses = anteojos"],
    questions: [
      "What does Mia's father look like? | He is tall with short black hair. | He is short with blond hair., He has long black hair. | \"He is tall and he has short black hair\".",
      "How many brothers does Mia have? | Two | One, Three | \"I have two brothers and one sister\".",
      "How old is Kate? | Sixteen | Ten, Six | \"My sister, Kate, is sixteen\".",
      "What does the grandmother always wear? | A red jumper | Glasses, A blue dress | \"she always wears a red jumper\".",
      "Mia's grandparents live in another city. | False | True | \"My grandparents live with us\".",
    ],
  }),
  reading({
    unitId: "unitA1_my_environment",
    title: "Our New House",
    titleEs: "Nuestra casa nueva",
    text: [
      "We have a new house! It is near the park. It has two floors. Downstairs there is a big living room, a kitchen and a small bathroom.",
      "Upstairs there are three bedrooms and another bathroom. My bedroom is small, but it has a big window. I can see the park from my bed!",
      "There is a garden behind the house with a tree and some flowers. My dog, Max, loves the garden. There isn't a garage, so my mother's car is in the street.",
    ],
    glossary: ["near = cerca de", "floors = pisos", "downstairs = abajo", "upstairs = arriba", "kitchen = cocina", "window = ventana", "behind = detrás de", "street = calle"],
    questions: [
      "Where is the new house? | Near the park | Near the school, In the city centre | \"It is near the park\".",
      "How many bedrooms are there? | Three | Two, Four | \"Upstairs there are three bedrooms\".",
      "What can the writer see from the bed? | The park | The garden, The street | \"I can see the park from my bed!\"",
      "Where is the garden? | Behind the house | In front of the house, Upstairs | \"There is a garden behind the house\".",
      "The mother's car is in the street. | True | False | No hay garaje: \"my mother's car is in the street\".",
    ],
  }),

  // ───────────── Vida Diaria y Rutina ─────────────
  reading({
    unitId: "unitA1_daily_lifestyle",
    title: "Tom's Day",
    titleEs: "El día de Tom",
    text: [
      "Tom is a nurse. He works in a hospital. He gets up at six o'clock every day. He has a shower and he drinks a cup of coffee. He doesn't eat breakfast at home.",
      "He takes the bus to work at a quarter to seven. He starts work at half past seven. At one o'clock he has lunch with his colleagues.",
      "Tom finishes work at four o'clock. In the evening he cooks dinner and watches TV. He goes to bed at ten o'clock because he is always tired.",
    ],
    glossary: ["nurse = enfermero/a", "gets up = se levanta", "has a shower = se ducha", "takes the bus = toma el colectivo", "a quarter to seven = siete menos cuarto", "half past seven = siete y media", "colleagues = compañeros de trabajo", "tired = cansado"],
    questions: [
      "Where does Tom work? | In a hospital | In a school, In a restaurant | \"He works in a hospital\".",
      "What time does Tom get up? | At six o'clock | At seven o'clock, At half past seven | \"He gets up at six o'clock every day\".",
      "How does Tom go to work? | By bus | By car, On foot | \"He takes the bus to work\".",
      "What does Tom do in the evening? | He cooks and watches TV. | He goes to the gym., He works. | \"In the evening he cooks dinner and watches TV\".",
      "Tom eats breakfast at home. | False | True | \"He doesn't eat breakfast at home\".",
    ],
  }),
  reading({
    unitId: "unitA1_daily_lifestyle",
    title: "Likes and Dislikes",
    titleEs: "Lo que nos gusta y lo que no",
    text: [
      "My name is Clara. I love music and I listen to it every day. I like reading books, especially on Sundays. I don't like watching football on TV. It's boring for me!",
      "My brother Jack is different. He loves football. He plays it on Saturdays and watches it on TV every weekend. He hates reading.",
      "But we both like cooking. On Friday evenings we usually make pizza together. Our mother never cooks on Fridays. She is very happy!",
    ],
    glossary: ["love = amar, encantar", "especially = especialmente", "boring = aburrido", "hates = odia", "both = ambos", "usually = generalmente", "never = nunca", "together = juntos"],
    questions: [
      "What does Clara do every day? | She listens to music. | She reads books., She plays football. | \"I love music and I listen to it every day\".",
      "When does Clara like reading? | On Sundays | On Saturdays, On Fridays | \"especially on Sundays\".",
      "What does Jack hate? | Reading | Football, Cooking | \"He hates reading\".",
      "What do Clara and Jack make on Friday evenings? | Pizza | Pasta, A cake | \"we usually make pizza together\".",
      "Clara likes watching football on TV. | False | True | \"I don't like watching football on TV\".",
    ],
  }),

  // ───────────── Comida y Bebidas ─────────────
  reading({
    unitId: "unitA1_food_drinks",
    title: "What I Eat",
    titleEs: "Lo que como",
    text: [
      "I'm Daniel and I try to eat healthy food. For breakfast I have cereal with milk and a banana. I drink orange juice. I don't drink coffee.",
      "For lunch I usually eat a salad with chicken or fish. I love vegetables, especially tomatoes and carrots. I drink a lot of water.",
      "For dinner I have rice or pasta. On Saturdays I eat a hamburger with chips. It isn't healthy, but it's delicious! My favourite dessert is chocolate ice cream.",
    ],
    glossary: ["healthy = saludable", "milk = leche", "juice = jugo", "chicken = pollo", "a lot of = mucho/a", "rice = arroz", "chips = papas fritas", "dessert = postre"],
    questions: [
      "What does Daniel have for breakfast? | Cereal with milk and a banana | Eggs and toast, A salad | \"For breakfast I have cereal with milk and a banana\".",
      "What does Daniel drink in the morning? | Orange juice | Coffee, Tea | \"I drink orange juice. I don't drink coffee\".",
      "Which vegetables does he especially love? | Tomatoes and carrots | Potatoes and onions, Peas and beans | \"especially tomatoes and carrots\".",
      "When does Daniel eat a hamburger? | On Saturdays | Every day, On Mondays | \"On Saturdays I eat a hamburger with chips\".",
      "Daniel's favourite dessert is chocolate ice cream. | True | False | \"My favourite dessert is chocolate ice cream\".",
    ],
  }),
  reading({
    unitId: "unitA1_food_drinks",
    title: "Food Around the World",
    titleEs: "Comida del mundo",
    text: [
      "People eat different food in different countries. In Italy, people love pasta and pizza. They often drink coffee after lunch.",
      "In Japan, people eat a lot of rice and fish. Sushi is very popular. They drink green tea with their meals.",
      "In Argentina, people eat a lot of meat. Asado is a typical meal on Sundays with family and friends. Many Argentinians drink mate, a hot drink, every day. What do people eat in your country?",
    ],
    glossary: ["people = la gente", "often = a menudo", "popular = popular", "meals = comidas", "meat = carne", "typical = típico/a", "hot drink = bebida caliente"],
    questions: [
      "What do Italians often drink after lunch? | Coffee | Tea, Mate | \"They often drink coffee after lunch\".",
      "What do people in Japan eat a lot? | Rice and fish | Meat and potatoes, Pasta | \"people eat a lot of rice and fish\".",
      "What do Japanese people drink with meals? | Green tea | Coffee, Juice | \"They drink green tea with their meals\".",
      "When do Argentinians typically eat asado? | On Sundays | On Mondays, For breakfast | \"Asado is a typical meal on Sundays\".",
      "Many Argentinians drink mate every day. | True | False | \"Many Argentinians drink mate, a hot drink, every day\".",
    ],
  }),

  // ───────────── En el Restaurante ─────────────
  reading({
    unitId: "unitA1_at_the_restaurant",
    title: "Dinner at Luigi's",
    titleEs: "Cena en Luigi's",
    text: [
      "It's Friday night and Emma and Jake are at Luigi's, an Italian restaurant. The waiter comes to their table. \"Good evening! Are you ready to order?\"",
      "\"Yes, please,\" says Emma. \"Can I have the vegetable soup and a mushroom pizza?\" Jake says: \"I'd like the spaghetti with meatballs, please.\" \"And to drink?\" asks the waiter. \"Two glasses of water, please.\"",
      "The food is delicious. After dinner Jake asks: \"Can we have the bill, please?\" The bill is thirty-two pounds. Emma pays by card.",
    ],
    glossary: ["waiter = mozo", "ready to order = listos para pedir", "Can I have...? = ¿Me trae...?", "I'd like = quisiera", "meatballs = albóndigas", "bill = cuenta", "pays by card = paga con tarjeta"],
    questions: [
      "What kind of restaurant is Luigi's? | Italian | Chinese, Mexican | \"Luigi's, an Italian restaurant\".",
      "What does Emma order? | Vegetable soup and a mushroom pizza | Spaghetti with meatballs, A salad | \"Can I have the vegetable soup and a mushroom pizza?\"",
      "What do they drink? | Water | Wine, Orange juice | \"Two glasses of water, please\".",
      "How much is the bill? | Thirty-two pounds | Twenty-two pounds, Thirty pounds | \"The bill is thirty-two pounds\".",
      "Emma pays in cash. | False | True | \"Emma pays by card\": paga con tarjeta, no en efectivo.",
    ],
  }),
  reading({
    unitId: "unitA1_at_the_restaurant",
    title: "Shopping for Clothes",
    titleEs: "Comprando ropa",
    text: [
      "Sara is in a clothes shop. She wants a new T-shirt. The shop assistant asks: \"Can I help you?\" \"Yes, I'm looking for a T-shirt,\" says Sara.",
      "\"What size are you?\" \"Medium, please.\" The assistant shows her a white T-shirt and a yellow one. \"How much is the yellow T-shirt?\" asks Sara. \"It's twelve dollars.\" \"And the white one?\" \"It's nine dollars.\"",
      "Sara tries on the yellow T-shirt. It's perfect! \"I'll take it,\" she says. She gives the assistant a twenty-dollar note and gets eight dollars change.",
    ],
    glossary: ["shop assistant = vendedor/a", "looking for = buscando", "size = talle", "How much is...? = ¿Cuánto cuesta...?", "tries on = se prueba", "I'll take it = me lo llevo", "change = vuelto"],
    questions: [
      "What does Sara want to buy? | A T-shirt | A dress, A jacket | \"She wants a new T-shirt\".",
      "What size is Sara? | Medium | Small, Large | \"Medium, please\".",
      "How much is the white T-shirt? | Nine dollars | Twelve dollars, Twenty dollars | \"It's nine dollars\".",
      "Which T-shirt does Sara buy? | The yellow one | The white one, Both | Se prueba la amarilla y dice \"I'll take it\".",
      "Sara gets eight dollars change. | True | False | Paga con 20 y la remera cuesta 12: 20 - 12 = 8.",
    ],
  }),

  // ───────────── Habilidades y Trabajo ─────────────
  reading({
    unitId: "unitA1_skills_work",
    title: "What Can You Do?",
    titleEs: "¿Qué sabés hacer?",
    text: [
      "Hi! I'm Nina and I'm a chef. I can cook very well, of course! I can also speak three languages: Spanish, English and French. But I can't drive a car.",
      "My husband, Peter, is a mechanic. He works in a garage and he can repair cars and motorbikes. He can play the guitar too, but he can't sing!",
      "Our son, Alex, is eight. He can swim and ride a bike. He can't cook yet, but he wants to be a chef like me.",
    ],
    glossary: ["chef = cocinero/a", "languages = idiomas", "can't = no puede/no sabe", "drive = manejar", "husband = esposo", "repair = reparar", "sing = cantar", "yet = todavía"],
    questions: [
      "What is Nina's job? | She is a chef. | She is a mechanic., She is a teacher. | \"I'm a chef\".",
      "How many languages can Nina speak? | Three | Two, Four | \"three languages: Spanish, English and French\".",
      "What can Peter repair? | Cars and motorbikes | Computers, Bikes and phones | \"he can repair cars and motorbikes\".",
      "What can't Peter do? | Sing | Play the guitar, Drive | \"He can play the guitar too, but he can't sing!\"",
      "Alex wants to be a chef. | True | False | \"he wants to be a chef like me\".",
    ],
  }),
  reading({
    unitId: "unitA1_skills_work",
    title: "My Phone and My Laptop",
    titleEs: "Mi celular y mi laptop",
    text: [
      "I'm Oscar and I'm a web designer. I work from home, so I have a laptop, a big screen and a good keyboard. My laptop is silver and it's very fast.",
      "I have a smartphone too. I use it to send messages, take photos and listen to music. I check my email on my phone every morning.",
      "My grandmother has a tablet. She can make video calls with me, but she can't send emails. Every Sunday I help her with her tablet. She says I'm her favourite teacher!",
    ],
    glossary: ["web designer = diseñador/a web", "work from home = trabajar desde casa", "screen = pantalla", "keyboard = teclado", "send messages = mandar mensajes", "check = revisar", "video calls = videollamadas"],
    questions: [
      "What is Oscar's job? | Web designer | Teacher, Photographer | \"I'm a web designer\".",
      "Where does Oscar work? | At home | In an office, In a shop | \"I work from home\".",
      "What colour is Oscar's laptop? | Silver | Black, White | \"My laptop is silver\".",
      "What can't the grandmother do? | Send emails | Make video calls, Use her tablet | \"she can't send emails\".",
      "Oscar helps his grandmother every Sunday. | True | False | \"Every Sunday I help her with her tablet\".",
    ],
  }),

  // ───────────── Cuerpo y Salud ─────────────
  reading({
    unitId: "unitA1_body_health",
    title: "At the Doctor's",
    titleEs: "En el médico",
    text: [
      "Mark doesn't feel well. He goes to the doctor. \"What's the matter?\" asks Dr. Lee. \"I have a headache and a sore throat,\" says Mark. \"And I'm very tired.\"",
      "The doctor checks his temperature. \"You have a fever. It's thirty-eight degrees. I think you have the flu.\"",
      "\"You should stay in bed for three days and drink a lot of water. Take this medicine twice a day, after meals.\" \"Thank you, doctor,\" says Mark. \"Get well soon!\"",
    ],
    glossary: ["doesn't feel well = no se siente bien", "What's the matter? = ¿Qué te pasa?", "headache = dolor de cabeza", "sore throat = dolor de garganta", "fever = fiebre", "flu = gripe", "should = debería", "twice a day = dos veces por día"],
    questions: [
      "What are Mark's problems? | A headache and a sore throat | A stomachache and a cough, A broken arm | \"I have a headache and a sore throat\".",
      "What is Mark's temperature? | Thirty-eight degrees | Thirty-six degrees, Forty degrees | \"It's thirty-eight degrees\".",
      "What does the doctor think Mark has? | The flu | A cold, Nothing | \"I think you have the flu\".",
      "How many days should Mark stay in bed? | Three | Two, Seven | \"stay in bed for three days\".",
      "Mark should take the medicine before meals. | False | True | \"Take this medicine twice a day, after meals\": después de comer.",
    ],
  }),
  reading({
    unitId: "unitA1_body_health",
    title: "How Do You Feel Today?",
    titleEs: "¿Cómo te sentís hoy?",
    text: [
      "Today is a big day at school. Rosa is nervous because she has an exam. Her hands are cold and she can't eat her breakfast.",
      "Her friend Ana is excited. It's her birthday and her parents have a surprise for her. Their teacher, Mr. Smith, is angry because some students don't have their homework.",
      "After the exam, Rosa feels much better. She is happy and relaxed. In the afternoon, she goes to Ana's birthday party. Everyone is having fun!",
    ],
    glossary: ["nervous = nervioso/a", "exam = examen", "excited = entusiasmado/a", "surprise = sorpresa", "angry = enojado/a", "homework = tarea", "relaxed = relajado/a", "having fun = divirtiéndose"],
    questions: [
      "Why is Rosa nervous? | She has an exam. | It's her birthday., She is sick. | \"Rosa is nervous because she has an exam\".",
      "Why is Ana excited? | It's her birthday. | She has an exam., She has a new dog. | \"It's her birthday and her parents have a surprise for her\".",
      "Why is Mr. Smith angry? | Some students don't have their homework. | Rosa is late., The exam is difficult. | \"some students don't have their homework\".",
      "How does Rosa feel after the exam? | Happy and relaxed | Sad and tired, Angry | \"She is happy and relaxed\".",
      "Rosa eats a big breakfast. | False | True | \"she can't eat her breakfast\" porque está nerviosa.",
    ],
  }),

  // ───────────── Viajes y Ciudad ─────────────
  reading({
    unitId: "unitA1_travel_city",
    title: "Excuse Me, Where Is the Museum?",
    titleEs: "Disculpe, ¿dónde está el museo?",
    text: [
      "Kenji is a tourist in Madrid. He wants to visit the art museum, but he is lost. He asks a woman: \"Excuse me, where is the museum, please?\"",
      "\"Go straight on this street and turn left at the bank. Then go past the supermarket. The museum is on the right, opposite the park,\" she says.",
      "\"Is it far?\" asks Kenji. \"No, it's about ten minutes on foot. You can also take bus number 27.\" Kenji decides to walk. \"Thank you very much!\"",
    ],
    glossary: ["tourist = turista", "lost = perdido", "go straight = siga derecho", "turn left = doble a la izquierda", "go past = pase", "opposite = enfrente de", "far = lejos", "on foot = a pie"],
    questions: [
      "Where is Kenji? | In Madrid | In Tokyo, In London | \"Kenji is a tourist in Madrid\".",
      "Where should Kenji turn left? | At the bank | At the supermarket, At the park | \"turn left at the bank\".",
      "Where is the museum? | Opposite the park | Next to the bank, Behind the supermarket | \"The museum is on the right, opposite the park\".",
      "How long does it take on foot? | About ten minutes | About one hour, Two minutes | \"it's about ten minutes on foot\".",
      "Kenji takes bus number 27. | False | True | \"Kenji decides to walk\": decide ir caminando.",
    ],
  }),
  reading({
    unitId: "unitA1_travel_city",
    title: "Weather Around the Year",
    titleEs: "El clima durante el año",
    text: [
      "I live in Canada. Here we have four very different seasons. In winter it's very cold and it snows a lot. We go skiing and make snowmen.",
      "In spring the weather is nice. It's warm and sometimes it rains. The trees are green and there are flowers everywhere. Summer is hot and sunny. We go to the lake and swim.",
      "In autumn it's windy and cool. The leaves on the trees turn red, orange and yellow. It's beautiful! My favourite season is autumn. What's your favourite season?",
    ],
    glossary: ["seasons = estaciones", "winter = invierno", "snows = nieva", "spring = primavera", "warm = templado", "summer = verano", "lake = lago", "autumn = otoño", "windy = ventoso", "leaves = hojas"],
    questions: [
      "Where does the writer live? | In Canada | In Spain, In Australia | \"I live in Canada\".",
      "What do they do in winter? | They go skiing. | They swim in the lake., They pick flowers. | \"We go skiing and make snowmen\".",
      "What is the weather like in summer? | Hot and sunny | Cold and snowy, Windy and cool | \"Summer is hot and sunny\".",
      "What colour do the leaves turn in autumn? | Red and yellow | Green and blue, White and grey | \"The leaves on the trees turn red, orange and yellow\".",
      "The writer's favourite season is summer. | False | True | \"My favourite season is autumn\".",
    ],
  }),

  // ───────────── Deportes y Ocio ─────────────
  reading({
    unitId: "unitA1_sports_leisure",
    title: "A Busy Saturday",
    titleEs: "Un sábado ocupado",
    text: [
      "It's Saturday morning. Usually Leo plays tennis on Saturdays, but today it's raining. So right now he is playing video games in his bedroom.",
      "His sister Mia is in the living room. She is doing yoga. She does yoga every day. Their father is in the kitchen. He is making pancakes for everyone.",
      "Their mother isn't at home. She is running in the park with her friends. She runs ten kilometres every Saturday, rain or sun!",
    ],
    glossary: ["usually = generalmente", "today = hoy", "right now = ahora mismo", "is playing = está jugando", "is doing yoga = está haciendo yoga", "pancakes = panqueques", "rain or sun = llueva o haga sol"],
    questions: [
      "What does Leo usually do on Saturdays? | He plays tennis. | He does yoga., He runs. | \"Usually Leo plays tennis on Saturdays\".",
      "What is Leo doing right now? | Playing video games | Playing tennis, Making pancakes | \"right now he is playing video games\".",
      "How often does Mia do yoga? | Every day | On Saturdays, Never | \"She does yoga every day\".",
      "What is the father doing? | Making pancakes | Running, Reading | \"He is making pancakes for everyone\".",
      "The mother runs only when it is sunny. | False | True | Corre todos los sábados \"rain or sun\": llueva o haga sol.",
    ],
  }),
  reading({
    unitId: "unitA1_sports_leisure",
    title: "A Day at the Zoo",
    titleEs: "Un día en el zoológico",
    text: [
      "Today the children of class 3B are at the zoo. First they see the elephants. They are very big and grey. One elephant is drinking water.",
      "Next, they visit the monkeys. The monkeys are funny. They are jumping and eating bananas. Then the children see a lion. It's sleeping under a tree.",
      "Their favourite animals are the penguins. Penguins can't fly, but they can swim very fast. At the end of the day, the children are tired but very happy.",
    ],
    glossary: ["children = niños", "zoo = zoológico", "first = primero", "grey = gris", "next = después", "monkeys = monos", "jumping = saltando", "fly = volar"],
    questions: [
      "What colour are the elephants? | Grey | Brown, White | \"They are very big and grey\".",
      "What are the monkeys eating? | Bananas | Apples, Fish | \"They are jumping and eating bananas\".",
      "What is the lion doing? | Sleeping | Eating, Running | \"It's sleeping under a tree\".",
      "What are the children's favourite animals? | The penguins | The monkeys, The lions | \"Their favourite animals are the penguins\".",
      "Penguins can swim very fast. | True | False | \"they can swim very fast\".",
    ],
  }),

  // ───────────── Futuro y Metas ─────────────
  reading({
    unitId: "unitA1_future_goals",
    title: "Summer Plans",
    titleEs: "Planes para el verano",
    text: [
      "The school year finishes next week, and everyone has plans for the summer. Julia is going to visit her grandparents in Italy. She is going to stay there for a month.",
      "Her brother Tom isn't going to travel. He is going to work in a café because he wants to buy a new bike.",
      "Their parents are going to paint the house in July. In August, the whole family is going to spend a week at the beach. \"I'm going to swim every day!\" says Tom.",
    ],
    glossary: ["school year = año escolar", "next week = la semana que viene", "is going to = va a", "stay = quedarse", "a month = un mes", "paint = pintar", "whole family = toda la familia", "beach = playa"],
    questions: [
      "Where is Julia going to go? | To Italy | To the beach, To a café | \"Julia is going to visit her grandparents in Italy\".",
      "How long is Julia going to stay there? | A month | A week, Two days | \"She is going to stay there for a month\".",
      "Why is Tom going to work in a café? | He wants to buy a new bike. | He likes coffee., His parents want him to. | \"he wants to buy a new bike\".",
      "What are the parents going to do in July? | Paint the house | Go to the beach, Visit Italy | \"Their parents are going to paint the house in July\".",
      "The family is going to spend a month at the beach. | False | True | Van a pasar \"a week\" (una semana) en la playa.",
    ],
  }),
  reading({
    unitId: "unitA1_future_goals",
    title: "My Goals for Next Year",
    titleEs: "Mis metas para el año que viene",
    text: [
      "Next year will be a great year for me! I have three big goals. First, I will learn to speak English very well. I'm going to practise every day with this app.",
      "Second, I will be healthier. I'm going to walk thirty minutes every day and I won't eat fast food.",
      "Third, I will save money. I want to travel to New York in December. I think it will be cold, but I don't care! I'll take a lot of photos and I'll speak English there.",
    ],
    glossary: ["goals = metas", "will = (futuro)", "practise = practicar", "healthier = más saludable", "won't = no voy a", "save money = ahorrar dinero", "I don't care = no me importa"],
    questions: [
      "How many goals does the writer have? | Three | Two, Four | \"I have three big goals\".",
      "How is the writer going to practise English? | With this app every day | At a school, With a teacher | \"I'm going to practise every day with this app\".",
      "How long will the writer walk every day? | Thirty minutes | One hour, Ten minutes | \"I'm going to walk thirty minutes every day\".",
      "Where does the writer want to travel? | New York | London, Paris | \"I want to travel to New York in December\".",
      "The writer is going to eat fast food. | False | True | \"I won't eat fast food\".",
    ],
  }),

  // ───────────── Repaso final ─────────────
  reading({
    unitId: "unitA1_final_test",
    title: "My Last Holiday",
    titleEs: "Mis últimas vacaciones",
    text: [
      "Last summer I went to Brazil with my best friend, Laura. We travelled by plane and the flight was ten hours long. We stayed in a small hotel near the beach in Rio de Janeiro.",
      "Every morning we swam in the sea. In the afternoons we visited interesting places. We climbed a big mountain and saw the whole city. It was amazing!",
      "We ate a lot of fruit and we tried a typical dish called feijoada. On the last night we danced samba at a party. We didn't want to come home!",
    ],
    glossary: ["last summer = el verano pasado", "went = fue/fuimos", "flight = vuelo", "stayed = nos alojamos", "swam = nadamos", "climbed = subimos", "saw = vimos", "tried = probamos", "danced = bailamos"],
    questions: [
      "Who did the writer travel with? | Their best friend | Their family, Alone | \"with my best friend, Laura\".",
      "How did they travel to Brazil? | By plane | By boat, By bus | \"We travelled by plane\".",
      "Where was the hotel? | Near the beach | In the mountains, Near the airport | \"a small hotel near the beach\".",
      "What did they do on the last night? | They danced samba. | They swam in the sea., They climbed a mountain. | \"On the last night we danced samba at a party\".",
      "They wanted to go home early. | False | True | \"We didn't want to come home!\"",
    ],
  }),
  reading({
    unitId: "unitA1_final_test",
    title: "A Birthday Surprise",
    titleEs: "Una sorpresa de cumpleaños",
    text: [
      "Yesterday was my mother's fiftieth birthday. My father, my sister and I organised a surprise party for her. We invited twenty friends and family members.",
      "In the morning my sister made a big chocolate cake. My father bought flowers and balloons. I decorated the living room. My mother was at work, so she didn't see anything.",
      "When she arrived home at six o'clock, everyone shouted: \"Surprise!\" She was very happy and she cried a little. We sang \"Happy Birthday\" and danced all night. It was a perfect day.",
    ],
    glossary: ["yesterday = ayer", "fiftieth = quincuagésimo (50)", "organised = organizamos", "invited = invitamos", "made = hizo", "bought = compró", "arrived = llegó", "shouted = gritaron", "cried = lloró", "sang = cantamos"],
    questions: [
      "How old was the mother yesterday? | Fifty | Forty, Sixty | Fue su \"fiftieth birthday\": cumplió 50.",
      "How many people did they invite? | Twenty | Fifty, Ten | \"We invited twenty friends and family members\".",
      "Who made the cake? | The writer's sister | The father, The mother | \"my sister made a big chocolate cake\".",
      "Where was the mother in the morning? | At work | At home, At the shops | \"My mother was at work\".",
      "The mother cried a little at the party. | True | False | \"She was very happy and she cried a little\": lloró de emoción.",
    ],
  }),
];
