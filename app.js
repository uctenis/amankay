const products = {
  maqui: {
    id: "maqui",
    name: "Crema facial de maqui",
    price: 10000,
    wholesale: { minimumQuantity: 6, price: 8000 },
    category: "Rostro",
    image: "assets/products/crema-facial-maqui-catalogo.jpg",
    format: "50 G",
    detail: "El maqui es uno de los frutos con más antocianinas, antioxidantes que ayudan a proteger la piel del estrés ambiental que acentúa las líneas de expresión. La manteca de karité aporta ácidos grasos que nutren, suavizan y refuerzan la barrera natural de la piel. Recomendada para pieles normales, secas o maduras. Aplica una pequeña cantidad sobre el rostro limpio, de día o de noche. Envase de 50 g.",
  },
  "crema-leche-avena": {
    id: "crema-leche-avena",
    name: "Crema leche de avena",
    price: 10000,
    wholesale: { minimumQuantity: 6, price: 8000 },
    category: "Rostro",
    image: "assets/products/crema-leche-avena-catalogo.jpg",
    format: "50 G",
    detail: "La avena aporta betaglucanos y avenantramidas, reconocidos por calmar, hidratar y aliviar la sensación de tirantez; el aceite de caléndula suma su efecto suavizante. De textura ligera y rápida absorción, es una buena opción para pieles sensibles, mixtas o que se enrojecen con facilidad. Aplícala por la mañana sobre el rostro limpio. Envase de 50 g.",
  },
  "crema-rosa-mosqueta": {
    id: "crema-rosa-mosqueta",
    name: "Crema facial rosa mosqueta",
    price: 10000,
    wholesale: { minimumQuantity: 6, price: 8000 },
    category: "Rostro",
    image: "assets/products/crema-rosa-mosqueta-catalogo.jpg",
    format: "50 G",
    detail: "El aceite de rosa mosqueta es rico en ácidos grasos esenciales (omega 3 y 6) y provitamina A, que favorecen la renovación de la piel y ayudan a atenuar la apariencia de marcas, manchas y líneas finas. La manteca de karité nutre en profundidad y la vitamina E aporta protección antioxidante. Pensada para la noche, cuando la piel se repara. Aplica sobre el rostro limpio antes de dormir y usa protector solar durante el día. Envase de 50 g.",
  },
  serum: {
    id: "serum",
    name: "Sérum facial",
    price: 6000,
    category: "Rostro",
    image: "assets/products/serum-facial-catalogo.jpg",
    format: "30 G",
    detail: "La proteína de seda forma una película fina que ayuda a retener el agua en la piel, mejorando su suavidad, elasticidad y luminosidad sin dejar sensación grasa. Apto para todo tipo de piel. Aplica unas gotas sobre el rostro limpio, antes de tu crema, para potenciar la hidratación. Envase de 30 g.",
  },
  cafe: {
    id: "cafe",
    name: "Exfoliante de café",
    price: 5000,
    category: "Cuerpo",
    image: "assets/products/exfoliante-cafe-catalogo.jpg",
    format: "100 G",
    detail: "El café molido exfolia de forma mecánica, retirando células muertas y activando la circulación con el masaje, mientras los aceites de coco, almendras y zanahoria nutren la piel para que quede suave y sin tirantez. Úsalo 1 o 2 veces por semana sobre la piel húmeda, con movimientos circulares suaves, y enjuaga. En el rostro, masajea con delicadeza y evita el contorno de ojos. Envase de 100 g.",
  },
  "jabon-cafe": {
    id: "jabon-cafe",
    name: "Jabón café",
    price: 6000,
    wholesale: { minimumQuantity: 10, price: 4000 },
    category: "Jabones",
    image: "assets/products/jabon-cafe-catalogo.jpg",
    format: "BARRA",
    detail: "Elaborado artesanalmente con café, aceites y mantecas vegetales. El café molido aporta una exfoliación suave que retira células muertas y es conocido por ayudar a neutralizar olores, por lo que resulta ideal para manos y cuerpo. Humedece, haz espuma entre las manos, masajea y enjuaga. Déjalo secar entre usos para que dure más.",
  },
  "jabon-carbon-activado": {
    id: "jabon-carbon-activado",
    name: "Jabón carbón activado",
    price: 6000,
    wholesale: { minimumQuantity: 10, price: 4000 },
    category: "Jabones",
    image: "assets/products/jabon-carbon-activado-catalogo.jpg",
    format: "BARRA",
    detail: "El carbón activado es muy poroso y atrapa impurezas y exceso de sebo, dejando una sensación de limpieza profunda. Por eso es una buena opción para pieles mixtas, grasas o con tendencia a imperfecciones. Úsalo una vez al día y complementa con una crema hidratante, ya que puede resecar las pieles secas o sensibles. Humedece, haz espuma entre las manos, masajea y enjuaga. Déjalo secar entre usos para que dure más.",
  },
  "jabon-maqui": {
    id: "jabon-maqui",
    name: "Jabón maqui",
    price: 6000,
    wholesale: { minimumQuantity: 10, price: 4000 },
    category: "Jabones",
    image: "assets/products/jabon-maqui-catalogo.jpg",
    format: "BARRA",
    detail: "El maqui aporta antocianinas, antioxidantes naturales, a una barra de limpieza suave que no deja la piel tirante. Apto para todo tipo de piel, en rostro y cuerpo. Humedece, haz espuma entre las manos, masajea y enjuaga. Déjalo secar entre usos para que dure más.",
  },
  "jabon-calendula": {
    id: "jabon-calendula",
    name: "Jabón caléndula",
    price: 6000,
    wholesale: { minimumQuantity: 10, price: 4000 },
    category: "Jabones",
    image: "assets/products/jabon-calendula-catalogo.jpg",
    format: "BARRA",
    detail: "La caléndula es reconocida por calmar y suavizar, lo que hace de este jabón una opción delicada para pieles sensibles, secas o que se irritan con facilidad. Limpia sin resecar, en rostro y cuerpo. Humedece, haz espuma entre las manos, masajea y enjuaga. Déjalo secar entre usos para que dure más.",
  },
  "jabon-romero": {
    id: "jabon-romero",
    name: "Jabón Romero",
    price: 6000,
    wholesale: { minimumQuantity: 10, price: 4000 },
    category: "Jabones",
    image: "assets/products/jabon-romero-catalogo.jpg",
    format: "BARRA",
    detail: "El romero es una planta aromática valorada por sus propiedades purificantes y tonificantes. Este jabón limpia en profundidad sin resecar y deja una sensación fresca, especialmente agradable para pieles normales a grasas. Humedece, haz espuma entre las manos, masajea y enjuaga. Déjalo secar entre usos para que dure más.",
  },
  "jabon-arroz": {
    id: "jabon-arroz",
    name: "Jabón arroz",
    price: 6000,
    category: "Jabones",
    image: "assets/products/jabon-arroz-catalogo.jpg",
    format: "BARRA",
    detail: "El arroz se usa desde hace siglos en la cosmética asiática para suavizar la piel y darle un aspecto más luminoso y uniforme. Elaborado con finos aceites, este jabón limpia con suavidad y ayuda a mantener la elasticidad de la piel. Apto para todo tipo de piel. Humedece, haz espuma entre las manos, masajea y enjuaga. Déjalo secar entre usos para que dure más.",
  },
  "jabon-canelo-cacao": {
    id: "jabon-canelo-cacao",
    name: "Jabón canelo-cacao",
    price: 6000,
    wholesale: { minimumQuantity: 10, price: 4000 },
    category: "Jabones",
    image: "assets/products/jabon-canelo-cacao-catalogo.jpg",
    format: "BARRA",
    detail: "El canelo es el árbol sagrado del pueblo mapuche y forma parte de la tradición botánica del sur de Chile; el cacao aporta polifenoles, antioxidantes naturales. Una barra de aroma cálido para el cuidado diario del cuerpo. Humedece, haz espuma entre las manos, masajea y enjuaga. Déjalo secar entre usos para que dure más.",
  },
  "jabon-rosa-mosqueta": {
    id: "jabon-rosa-mosqueta",
    name: "Jabón rosa mosqueta",
    price: 6000,
    wholesale: { minimumQuantity: 10, price: 4000 },
    category: "Jabones",
    image: "assets/products/jabon-rosa-mosqueta-catalogo.jpg",
    format: "BARRA",
    detail: "La rosa mosqueta aporta ácidos grasos esenciales que acompañan la regeneración natural de la piel y ayudan a mantenerla hidratada y flexible. Recomendado para pieles secas, maduras o con marcas. Humedece, haz espuma entre las manos, masajea y enjuaga. Déjalo secar entre usos para que dure más.",
  },
  "jabon-avena-miel": {
    id: "jabon-avena-miel",
    name: "Jabón avena miel",
    price: 6000,
    wholesale: { minimumQuantity: 10, price: 4000 },
    category: "Jabones",
    image: "assets/products/jabon-avena-miel-catalogo.jpg",
    format: "BARRA",
    detail: "La avena es reconocida por calmar la piel y aliviar la sensación de tirantez, y la miel es un humectante natural que ayuda a retener la humedad. Elaborado con finos aceites, limpia en profundidad sin resecar y ayuda a mantener la elasticidad de la piel. Ideal para pieles sensibles o secas. Humedece, haz espuma entre las manos, masajea y enjuaga. Déjalo secar entre usos para que dure más.",
  },
  "aceite-maqui": {
    id: "aceite-maqui",
    name: "Aceite de maqui",
    price: 8000,
    wholesale: { minimumQuantity: 6, price: 7000 },
    category: "Aceites",
    image: "assets/products/aceite-maqui-catalogo.jpg",
    format: "30 ML",
    detail: "El maqui concentra antocianinas, antioxidantes que ayudan a proteger la piel del estrés oxidativo asociado al envejecimiento. Este aceite nutre, aporta elasticidad y deja la piel luminosa; se recomienda especialmente para pieles maduras o secas. Aplica 2 a 3 gotas sobre el rostro limpio y ligeramente húmedo, de preferencia por la noche. Envase de 30 ml.",
  },
  "aceite-oregano": {
    id: "aceite-oregano",
    name: "Aceite de orégano",
    price: 9000,
    category: "Aceites",
    image: "assets/products/aceite-oregano-catalogo.jpg",
    format: "30 ML",
    detail: "El orégano contiene carvacrol y timol, compuestos estudiados por su acción purificante, por lo que se usa tradicionalmente en el cuidado de pieles con imperfecciones. Es un aceite potente: aplícalo en poca cantidad y solo sobre la zona que quieras cuidar, evitando ojos, mucosas y piel irritada. Haz una prueba en el antebrazo antes del primer uso. Envase de 30 ml.",
  },
  "agua-rosas": {
    id: "agua-rosas",
    name: "Agua de rosas",
    price: 6000,
    wholesale: { minimumQuantity: 6, price: 4500 },
    category: "Rostro",
    image: "assets/products/agua-rosas-catalogo.jpg",
    format: "SPRAY",
    detail: "El agua de rosas es un tónico tradicional que refresca, suaviza y ayuda a calmar la piel, dejándola lista para absorber mejor los productos que apliques después. Apta para todo tipo de piel, incluidas las sensibles. Rocíala sobre el rostro limpio, mañana y noche, o durante el día cuando necesites un respiro.",
  },
  "aceite-calmar-irritaciones": {
    id: "aceite-calmar-irritaciones",
    name: "Aceite para calmar irritaciones",
    price: 9500,
    category: "Aceites",
    image: "assets/products/aceite-calmar-irritaciones-catalogo.jpg",
    format: "30 ML",
    detail: "La caléndula es una de las plantas más usadas para calmar y suavizar la piel, y el aceite esencial de manzanilla aporta compuestos como el bisabolol, reconocido por su efecto calmante. Juntos acompañan a las pieles sensibles, reactivas o enrojecidas por el frío, el sol o el afeitado. Aplica unas gotas con un masaje suave sobre la piel limpia. Envase de 30 ml.",
  },
  "macerado-calendula": {
    id: "macerado-calendula",
    name: "Macerado de caléndula",
    price: 9000,
    wholesale: { minimumQuantity: 6, price: 8000 },
    category: "Aceites",
    image: "assets/products/macerado-calendula-catalogo.jpg",
    format: "GOTERO",
    detail: "La maceración traspasa al aceite los compuestos calmantes de la flor de caléndula, usada desde siempre para aliviar la piel seca, agrietada o sensible. Es suave y versátil: úsalo en rostro, manos, codos o después del sol. Aplica unas gotas sobre la piel limpia y masajea hasta que se absorba.",
  },
  "aceite-almendras": {
    id: "aceite-almendras",
    name: "Aceite de almendras",
    price: 9000,
    wholesale: { minimumQuantity: 6, price: 7000 },
    category: "Aceites",
    image: "assets/products/aceite-almendras-catalogo.jpg",
    format: "GOTERO",
    detail: "El aceite de almendras es rico en ácido oleico y vitamina E, por lo que suaviza, nutre y aporta elasticidad a la piel seca. Es muy versátil: sirve para el rostro, el cuerpo, los masajes e incluso para retirar el maquillaje. Aplícalo sobre la piel ligeramente húmeda para sellar la hidratación. No recomendado para personas alérgicas a los frutos secos.",
  },
  "aceite-rosa-mosqueta": {
    id: "aceite-rosa-mosqueta",
    name: "Aceite de rosa mosqueta",
    price: 9000,
    wholesale: { minimumQuantity: 6, price: 8000 },
    category: "Aceites",
    image: "assets/products/aceite-rosa-mosqueta-catalogo.jpg",
    format: "30 ML",
    detail: "Prensado en frío para conservar sus ácidos grasos esenciales (omega 3 y 6) y su provitamina A, el aceite de rosa mosqueta favorece la renovación de la piel y ayuda a mejorar la apariencia de cicatrices, estrías, manchas y líneas finas. Aplica 2 a 3 gotas por la noche sobre la piel limpia, con un masaje suave, y usa protector solar durante el día. Envase de 30 ml.",
  },
  "shampoo-ortiga": {
    id: "shampoo-ortiga",
    name: "Shampoo ortiga",
    price: 7000,
    wholesale: { minimumQuantity: 6, price: 6000 },
    category: "Cabello",
    image: "assets/products/shampoo-ortiga-catalogo.jpg",
    format: "60 G",
    detail: "La ortiga es rica en minerales y se usa tradicionalmente para fortalecer el cabello, equilibrar el cuero cabelludo graso y acompañar los cuidados frente a la caída. Su base limpiadora, derivada del aceite de coco, hace una espuma suave que no reseca. Humedece la barra, frótala sobre el cabello mojado hasta hacer espuma, masajea el cuero cabelludo y enjuaga. Déjala secar entre usos para que dure más. Peso aproximado: 60 g.",
  },
  "pack-shampoo-acondicionador": {
    id: "pack-shampoo-acondicionador",
    name: "Pack shampoo de maqui y acondicionador",
    price: 13000,
    wholesale: { minimumQuantity: 6, price: 11000 },
    category: "Cabello",
    image: "assets/products/pack-shampoo-acondicionador-catalogo.jpg",
    format: "PACK",
    detail: "Una rutina capilar completa en formato sólido. El shampoo de maqui, rico en antioxidantes, está indicado para el cuidado de los cabellos tinturados. El acondicionador de aceite de coco suaviza, desenreda y ayuda a reducir el quiebre. Lava con el shampoo, enjuaga y luego desliza el acondicionador de medios a puntas. Deja secar ambas barras entre usos para que duren más.",
  },
  "pack-shampoo-rosa-mosqueta-acondicionador": {
    id: "pack-shampoo-rosa-mosqueta-acondicionador",
    name: "Pack shampoo de rosa mosqueta y acondicionador",
    price: 13000,
    wholesale: { minimumQuantity: 6, price: 11000 },
    category: "Cabello",
    image: "assets/products/pack-shampoo-rosa-mosqueta-acondicionador-catalogo.jpg",
    format: "PACK",
    detail: "Una rutina capilar completa en formato sólido. El shampoo de rosa mosqueta aporta ácidos grasos esenciales que hidratan y ayudan a reparar el cabello seco o dañado. El acondicionador de aceite de coco suaviza, desenreda y ayuda a reducir el quiebre. Lava con el shampoo, enjuaga y luego desliza el acondicionador de medios a puntas. Deja secar ambas barras entre usos para que duren más.",
  },
  "shampoo-romero": {
    id: "shampoo-romero",
    name: "Shampoo romero",
    price: 7000,
    wholesale: { minimumQuantity: 6, price: 6000 },
    category: "Cabello",
    image: "assets/products/shampoo-romero-catalogo.jpg",
    format: "50 G",
    detail: "El romero es uno de los ingredientes capilares más estudiados: se asocia a la estimulación de la circulación del cuero cabelludo y aporta brillo y vitalidad al cabello opaco o dañado. Humedece la barra, frótala sobre el cabello mojado hasta hacer espuma, masajea el cuero cabelludo y enjuaga. Déjala secar entre usos para que dure más. Peso aproximado: 50 g.",
  },
  "pack-shampoo-ortiga-acondicionador": {
    id: "pack-shampoo-ortiga-acondicionador",
    name: "Pack shampoo de ortiga y acondicionador",
    price: 13000,
    wholesale: { minimumQuantity: 6, price: 11000 },
    category: "Cabello",
    image: "assets/products/pack-shampoo-ortiga-acondicionador-catalogo.jpg",
    format: "PACK",
    detail: "Una rutina capilar completa en formato sólido. El shampoo de ortiga, planta usada tradicionalmente para fortalecer el cabello, ayuda a equilibrar el cuero cabelludo. El acondicionador de aceite de coco suaviza, desenreda y ayuda a reducir el quiebre. Lava con el shampoo, enjuaga y luego desliza el acondicionador de medios a puntas. Deja secar ambas barras entre usos para que duren más.",
  },
  "shampoo-rosa-mosqueta": {
    id: "shampoo-rosa-mosqueta",
    name: "Shampoo rosa mosqueta",
    price: 7000,
    wholesale: { minimumQuantity: 6, price: 6000 },
    category: "Cabello",
    image: "assets/products/shampoo-rosa-mosqueta-catalogo.jpg",
    format: "60 G",
    detail: "La rosa mosqueta aporta ácidos grasos esenciales que nutren la fibra capilar y devuelven suavidad y flexibilidad al cabello seco, quebradizo o castigado por el calor y las tinturas. Humedece la barra, frótala sobre el cabello mojado hasta hacer espuma, masajea el cuero cabelludo y enjuaga. Déjala secar entre usos para que dure más. Peso aproximado: 60 g.",
  },
  "shampoo-manzanilla": {
    id: "shampoo-manzanilla",
    name: "Shampoo manzanilla",
    price: 7000,
    wholesale: { minimumQuantity: 6, price: 6000 },
    category: "Cabello",
    image: "assets/products/shampoo-manzanilla-catalogo.jpg",
    format: "BARRA",
    detail: "La manzanilla es conocida por calmar el cuero cabelludo sensible y aportar brillo; con el uso continuo realza los reflejos dorados de los cabellos claros. Ayuda además a suavizar el cabello dañado. Humedece la barra, frótala sobre el cabello mojado hasta hacer espuma, masajea el cuero cabelludo y enjuaga. Déjala secar entre usos para que dure más.",
  },
  "pack-shampoo-manzanilla-acondicionador": {
    id: "pack-shampoo-manzanilla-acondicionador",
    name: "Pack shampoo de manzanilla y acondicionador",
    price: 13000,
    wholesale: { minimumQuantity: 6, price: 11000 },
    category: "Cabello",
    image: "assets/products/pack-shampoo-manzanilla-acondicionador-catalogo.jpg",
    format: "PACK",
    detail: "Una rutina capilar completa en formato sólido. El shampoo de manzanilla calma el cuero cabelludo, da brillo y realza los reflejos de los cabellos claros. El acondicionador de aceite de coco suaviza, desenreda y ayuda a reducir el quiebre. Lava con el shampoo, enjuaga y luego desliza el acondicionador de medios a puntas. Deja secar ambas barras entre usos para que duren más.",
  },
  "shampoo-palta": {
    id: "shampoo-palta",
    name: "Shampoo palta",
    price: 7000,
    wholesale: { minimumQuantity: 6, price: 6000 },
    category: "Cabello",
    image: "assets/products/shampoo-palta-catalogo.jpg",
    format: "60 G",
    detail: "La palta es rica en ácido oleico y vitamina E, nutrientes que suavizan la fibra capilar y ayudan a recuperar el cabello seco, opaco o dañado. Recomendado para cabellos secos o con frizz. Humedece la barra, frótala sobre el cabello mojado hasta hacer espuma, masajea el cuero cabelludo y enjuaga. Déjala secar entre usos para que dure más. Peso aproximado: 60 g.",
  },
  "shampoo-avena": {
    id: "shampoo-avena",
    name: "Shampoo avena",
    price: 7000,
    wholesale: { minimumQuantity: 6, price: 6000 },
    category: "Cabello",
    image: "assets/products/shampoo-avena-catalogo.jpg",
    format: "60 G",
    detail: "La avena es reconocida por su efecto calmante e hidratante: este shampoo limpia con suavidad, cuida el cuero cabelludo sensible y deja el cabello suave, fuerte y con brillo. Una barra muy durable y ecológica. Humedece la barra, frótala sobre el cabello mojado hasta hacer espuma, masajea el cuero cabelludo y enjuaga. Déjala secar entre usos para que dure más. Peso: 60 g.",
  },
  "shampoo-maqui": {
    id: "shampoo-maqui",
    name: "Shampoo sólido maqui",
    price: 7000,
    wholesale: { minimumQuantity: 6, price: 6000 },
    category: "Cabello",
    image: "assets/products/shampoo-maqui-catalogo.jpg",
    format: "BARRA",
    detail: "El maqui es rico en antocianinas, antioxidantes que ayudan a proteger la fibra capilar, por lo que este shampoo está indicado para el cuidado de los cabellos tinturados. Es una barra concentrada y muy durable. Humedece la barra, frótala sobre el cabello mojado hasta hacer espuma, masajea el cuero cabelludo y enjuaga. Déjala secar entre usos para que dure más.",
  },
  "pack-shampoo-palta-acondicionador": {
    id: "pack-shampoo-palta-acondicionador",
    name: "Pack shampoo de palta y acondicionador",
    price: 13000,
    wholesale: { minimumQuantity: 6, price: 11000 },
    category: "Cabello",
    image: "assets/products/pack-shampoo-palta-acondicionador-catalogo.jpg",
    format: "PACK",
    detail: "Una rutina capilar completa en formato sólido. El shampoo de palta, rica en vitamina E y ácido oleico, nutre y ayuda a reparar el cabello seco o dañado. El acondicionador de aceite de coco suaviza, desenreda y ayuda a reducir el quiebre. Lava con el shampoo, enjuaga y luego desliza el acondicionador de medios a puntas. Deja secar ambas barras entre usos para que duren más.",
  },
  "acondicionador-solido": {
    id: "acondicionador-solido",
    name: "Acondicionador sólido",
    price: 7000,
    wholesale: { minimumQuantity: 6, price: 6000 },
    category: "Cabello",
    image: "assets/products/acondicionador-solido-catalogo.jpg",
    format: "60 G",
    detail: "El aceite de coco es uno de los pocos aceites que penetra en la fibra capilar y ayuda a reducir la pérdida de proteínas, dejando el cabello más suave, fuerte y fácil de desenredar. Después del shampoo, desliza la barra húmeda de medios a puntas, deja actuar un minuto y enjuaga. Déjala secar entre usos para que dure más. Peso aproximado: 60 g.",
  },
  "pack-shampoo-romero-acondicionador": {
    id: "pack-shampoo-romero-acondicionador",
    name: "Pack shampoo de romero y acondicionador",
    price: 13000,
    wholesale: { minimumQuantity: 6, price: 11000 },
    category: "Cabello",
    image: "assets/products/pack-shampoo-romero-acondicionador-catalogo.jpg",
    format: "PACK",
    detail: "Una rutina capilar completa en formato sólido. El shampoo de romero, conocido por estimular el cuero cabelludo, aporta brillo y vitalidad al cabello opaco o dañado. El acondicionador de aceite de coco suaviza, desenreda y ayuda a reducir el quiebre. Lava con el shampoo, enjuaga y luego desliza el acondicionador de medios a puntas. Deja secar ambas barras entre usos para que duren más.",
  },
  "pomada-calendula": {
    id: "pomada-calendula",
    name: "Pomada de caléndula",
    price: 7000,
    wholesale: { minimumQuantity: 6, price: 4500 },
    category: "Cuerpo",
    image: "assets/products/pomada-calendula-catalogo.jpg",
    format: "30 G",
    detail: "La caléndula es reconocida por su efecto calmante y suavizante. En formato de pomada forma una capa protectora que evita la pérdida de humedad, ideal para manos, codos, talones y zonas resecas o rozadas. Aplica una pequeña cantidad sobre la piel limpia las veces que necesites. Envase de 30 g.",
  },
  "aceite-contracturas": {
    id: "aceite-contracturas",
    name: "Aceite para contracturas",
    price: 9500,
    category: "Cuerpo",
    image: "assets/products/aceite-contracturas-catalogo.jpg",
    format: "30 ML",
    detail: "La jojoba es una cera líquida muy afín a la piel, que se absorbe bien y facilita el masaje, y la caléndula suaviza. El aceite esencial de canela aporta una sensación de calor, mientras la manzanilla y la lavanda acompañan la relajación. Aplica unas gotas sobre cuello, hombros o espalda y masajea con presión suave. Solo uso externo: evita la piel irritada, los ojos y las mucosas, y prueba antes en una zona pequeña. Envase de 30 ml.",
  },
  "aceite-masaje-muscular": {
    id: "aceite-masaje-muscular",
    name: "Aceite masaje muscular",
    price: 9500,
    category: "Cuerpo",
    image: "assets/products/aceite-masaje-muscular-catalogo.jpg",
    format: "30 ML",
    detail: "El aceite de almendras se desliza con facilidad y nutre la piel mientras masajeas. El aceite esencial de romero aporta una sensación tonificante, y la lavanda y la manzanilla invitan a la relajación. Ideal después del ejercicio o de una jornada larga. Entibia unas gotas entre las manos y masajea la zona. Solo uso externo. Envase de 30 ml.",
  },
  "unguento-masaje": {
    id: "unguento-masaje",
    name: "Ungüento para masaje",
    price: 5000,
    category: "Cuerpo",
    image: "assets/products/unguento-masaje-catalogo.jpg",
    format: "20 G",
    detail: "Un bálsamo que se funde con el calor de la piel: el aceite de coco y la cera vegetal nutren y protegen, y los aceites esenciales de manzanilla, lavanda y melisa aportan un aroma que invita a soltar la tensión. Práctico para llevar contigo. Toma una pequeña cantidad y masajea cuello, sienes, hombros o manos, evitando los ojos. Envase de 20 g.",
  },
  "roll-on-antiestres": {
    id: "roll-on-antiestres",
    name: "Roll on antiestrés",
    price: 8000,
    wholesale: { minimumQuantity: 6, price: 7000 },
    category: "Aromaterapia",
    image: "assets/products/roll-on-antiestres-catalogo.jpg",
    format: "ROLL ON",
    detail: "La lavanda es el aroma más estudiado por su efecto relajante; la melisa se usa tradicionalmente para acompañar los momentos de nerviosismo y la menta aporta una sensación de frescor. Aplica en muñecas, nuca o sienes, respira profundo y tómate un minuto. Solo uso externo: evita los ojos y las mucosas.",
  },
  "roll-on-eucalipto": {
    id: "roll-on-eucalipto",
    name: "Roll on de eucalipto",
    price: 7500,
    wholesale: { minimumQuantity: 6, price: 6500 },
    category: "Aromaterapia",
    image: "assets/products/roll-on-eucalipto-catalogo.jpg",
    format: "10 ML",
    detail: "El eucalipto es rico en eucaliptol, responsable de su aroma fresco y de esa sensación de respirar más despejado. Aplica en muñecas, pecho o nuca e inhala profundamente cuando necesites un impulso de frescura. Solo uso externo: evita los ojos y las mucosas, y no lo uses en niños pequeños. Envase de 10 ml.",
  },
  "roll-on-romero": {
    id: "roll-on-romero",
    name: "Roll on de romero",
    price: 8000,
    wholesale: { minimumQuantity: 6, price: 6000 },
    category: "Aromaterapia",
    image: "assets/products/roll-on-romero-catalogo.jpg",
    format: "10 ML",
    detail: "El aroma del romero se asocia tradicionalmente a la memoria y la concentración, y algunos estudios lo vinculan con un mayor estado de alerta. Aplica en muñecas, nuca o sienes antes de estudiar o trabajar y respira profundo. Solo uso externo: evita los ojos y las mucosas. Envase de 10 ml.",
  },
};

const currency = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});
const cartKey = "amankay-cart";
const drawer = document.querySelector(".cart-drawer");
const backdrop = document.querySelector(".drawer-backdrop");
const cartItems = document.querySelector(".cart-items");
const emptyCart = document.querySelector(".cart-empty");
const drawerFooter = document.querySelector(".drawer-footer");
const toast = document.querySelector(".toast");
const productDialog = document.querySelector(".product-dialog");
const checkoutDialog = document.querySelector(".checkout-dialog");
const checkoutForm = checkoutDialog.querySelector(".checkout-form");
const checkoutSubtotal = checkoutDialog.querySelector(".checkout-subtotal");
const productDialogImage = productDialog.querySelector(".product-dialog-image img");
const productDialogCategory = productDialog.querySelector(".product-dialog-category");
const productDialogTitle = productDialog.querySelector("#product-dialog-title");
const productDialogPrice = productDialog.querySelector(".product-dialog-price");
const productDialogWholesale = productDialog.querySelector(".product-dialog-wholesale");
const productDialogFormat = productDialog.querySelector(".product-dialog-format strong");
const productDialogLongDescription = productDialog.querySelector(".product-dialog-long-description");
const productDialogAdd = productDialog.querySelector(".product-dialog-add");
const productDialogQuantity = productDialog.querySelector(".product-quantity");
let productCards = [...document.querySelectorAll(".product-card")];
const loadMoreProducts = document.querySelector("#load-more-products");
const mobileCatalog = window.matchMedia("(max-width: 520px)");
let productDialogTrigger = null;
let checkoutTrigger = null;
let selectedProductQuantity = 1;
let visibleProductLimit = 6;
let cart = loadCart();
let toastTimer;
const productGroups = {
  cabello: {
    title: "Shampoos y cabello",
    description: "Shampoos sólidos, acondicionador y packs para tu rutina capilar.",
  },
  jabones: {
    title: "Jabones artesanales",
    description: "Hechos a mano con aceites y mantecas vegetales, en variedades botánicas.",
  },
  rostro: {
    title: "Rostro",
    description: "Fórmulas botánicas para acompañar tu rutina facial, de día y de noche.",
  },
  aceites: {
    title: "Aceites",
    description: "Aceites y macerados botánicos inspirados en la naturaleza del sur.",
  },
  cuerpo: {
    title: "Cuerpo",
    description: "Pequeños rituales de cuidado, masaje y bienestar corporal.",
  },
  aromaterapia: {
    title: "Aromaterapia",
    description: "Mezclas aromáticas para acompañar distintos momentos de tu día.",
  },
};

function normalizeSearch(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
}

function createProductGroup(category) {
  const grid = document.querySelector("#product-grid");
  const existingGroup = grid.querySelector(`.product-group[data-group-category="${CSS.escape(category)}"]`);
  if (existingGroup) return existingGroup.querySelector(".product-group-grid");

  const groupInfo = productGroups[category] || {
    title: category.replace(/-/g, " "),
    description: "Explora esta selección de cuidado natural.",
  };
  const group = document.createElement("section");
  group.className = "product-group";
  group.dataset.groupCategory = category;
  const heading = document.createElement("div");
  heading.className = "product-group-heading";
  const copy = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = groupInfo.title;
  const description = document.createElement("p");
  description.textContent = groupInfo.description;
  const count = document.createElement("span");
  count.className = "product-group-count";
  count.textContent = "0 productos";
  copy.append(title, description);
  heading.append(copy, count);
  const productGrid = document.createElement("div");
  productGrid.className = "product-group-grid";
  group.append(heading, productGrid);
  const emptySearch = grid.querySelector(".empty-search");
  grid.insertBefore(group, emptySearch);
  return productGrid;
}

function groupStaticProducts() {
  const grid = document.querySelector("#product-grid");
  const cards = [...grid.children].filter((child) => child.classList.contains("product-card"));
  Object.keys(productGroups).forEach(createProductGroup);
  for (const card of cards) {
    createProductGroup(card.dataset.category).append(card);
  }
}

groupStaticProducts();

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(cartKey) || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter((item) =>
      item &&
      Object.hasOwn(products, item.id) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0,
    );
  } catch (error) {
    console.warn("No se pudo recuperar la bolsa guardada.", error);
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  } catch (error) {
    console.warn("No se pudo guardar la bolsa en este navegador.", error);
    showToast("No se pudo guardar la bolsa en este navegador.");
  }
}

function formatPrice(price) {
  return currency.format(price).replace(/\s/g, "");
}

function getUnitPrice(product, quantity) {
  if (product.price === null) return null;
  if (product.wholesale && quantity >= product.wholesale.minimumQuantity) {
    return product.wholesale.price;
  }
  return product.price;
}

function getWholesaleNote(product, quantity) {
  if (!product.wholesale) return "";
  const { minimumQuantity, price } = product.wholesale;
  if (quantity >= minimumQuantity) {
    return `Precio por mayor aplicado · ahorras ${formatPrice((product.price - price) * quantity)}`;
  }
  return `Agrega ${minimumQuantity - quantity} más y paga ${formatPrice(price)} c/u`;
}

function getWholesaleDiscount(product) {
  return Math.round((1 - product.wholesale.price / product.price) * 100);
}

function renderCardWholesale(card, product) {
  let note = card.querySelector(".product-wholesale-note");
  if (product.wholesale && !note) {
    note = document.createElement("p");
    note.className = "product-wholesale-note";
    card.querySelector(".product-title-row").after(note);
  }
  if (!note) return;
  note.hidden = !product.wholesale;
  note.innerHTML = product.wholesale
    ? `<span class="wholesale-badge">−${getWholesaleDiscount(product)}%</span><span>Desde ${product.wholesale.minimumQuantity} unidades · <strong>${formatPrice(product.wholesale.price)} c/u</strong></span>`
    : "";
}

// Galería: cada producto puede sumar fotos extra en "images" (en uso, en la mano, detalle).
function getGallery(product) {
  return [product.image, ...(product.images || [])].filter(Boolean);
}

function showGalleryImage(container, gallery, index) {
  const current = (index + gallery.length) % gallery.length;
  container.dataset.galleryIndex = String(current);
  container.querySelector("img").src = gallery[current];
  container.querySelectorAll(".gallery-dot").forEach((dot, position) => {
    dot.classList.toggle("is-active", position === current);
  });
}

function setupGallery(container, product) {
  container.querySelectorAll(".gallery-arrow, .gallery-dots").forEach((element) => element.remove());
  container.dataset.galleryIndex = "0";
  const gallery = getGallery(product);
  if (gallery.length < 2) return;
  container.insertAdjacentHTML("beforeend", `
    <button class="gallery-arrow gallery-arrow-prev" type="button" data-gallery-step="-1" aria-label="Foto anterior"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 6-6 6 6 6"/></svg></button>
    <button class="gallery-arrow gallery-arrow-next" type="button" data-gallery-step="1" aria-label="Foto siguiente"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 6 6 6-6 6"/></svg></button>
    <div class="gallery-dots" aria-hidden="true">${gallery.map((_, position) => `<span class="gallery-dot${position === 0 ? " is-active" : ""}"></span>`).join("")}</div>`);
}

document.addEventListener("click", (event) => {
  const arrow = event.target.closest("[data-gallery-step]");
  if (!arrow) return;
  const container = arrow.parentElement;
  const id = container.closest("[data-product]")?.dataset.product || productDialogAdd.dataset.add;
  showGalleryImage(
    container,
    getGallery(products[id]),
    Number(container.dataset.galleryIndex) + Number(arrow.dataset.galleryStep),
  );
});

function renderDialogWholesale(product, quantity) {
  productDialogWholesale.hidden = !product.wholesale;
  if (!product.wholesale) {
    productDialogWholesale.replaceChildren();
    return;
  }
  const { minimumQuantity, price } = product.wholesale;
  const applied = quantity >= minimumQuantity;
  const saving = product.price - price;
  const unitRange = minimumQuantity > 2 ? `1 a ${minimumQuantity - 1} unidades` : "1 unidad";
  const hint = applied
    ? `Precio por mayor aplicado: ahorras ${formatPrice(saving * quantity)} en este producto.`
    : `Agrega ${minimumQuantity - quantity} más y ahorra ${formatPrice(saving)} por unidad. <button class="price-tier-jump" type="button" data-quantity="${minimumQuantity}">Llevar ${minimumQuantity}</button>`;
  productDialogWholesale.innerHTML = `
    <p class="price-tier-title">PRECIO POR CANTIDAD</p>
    <div class="price-tier${applied ? "" : " is-active"}"><span>${unitRange}</span><strong>${formatPrice(product.price)} c/u</strong></div>
    <div class="price-tier${applied ? " is-active" : ""}"><span>${minimumQuantity} o más <em>−${getWholesaleDiscount(product)}%</em></span><strong>${formatPrice(price)} c/u</strong></div>
    <p class="price-tier-hint">${hint}</p>`;
}

function setDialogQuantity(quantity) {
  selectedProductQuantity = Math.max(1, quantity);
  productDialogQuantity.value = String(selectedProductQuantity);
  productDialog.querySelector('[data-step="-1"]').disabled = selectedProductQuantity === 1;
  renderDialogWholesale(products[productDialogAdd.dataset.add], selectedProductQuantity);
}

function updateCart() {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + (getUnitPrice(products[item.id], item.quantity) ?? 0) * item.quantity,
    0,
  );
  const hasUnpricedItems = cart.some((item) => products[item.id].price === null);
  document.querySelector(".cart-count").textContent = itemCount;
  document.querySelector(".drawer-count").textContent = `(${itemCount})`;
  document.querySelector(".cart-subtotal").textContent = hasUnpricedItems
    ? "Por confirmar"
    : formatPrice(subtotal);
  emptyCart.hidden = cart.length > 0;
  drawerFooter.hidden = cart.length === 0;
  cartItems.replaceChildren();

  for (const item of cart) {
    const product = products[item.id];
    const currentUnitPrice = getUnitPrice(product, item.quantity);
    const unitPrice = currentUnitPrice === null
      ? "Precio por confirmar"
      : `${formatPrice(currentUnitPrice)}${product.wholesale ? " c/u" : ""}`;
    const linePrice = currentUnitPrice === null
      ? "Por confirmar"
      : formatPrice(currentUnitPrice * item.quantity);
    const wholesaleNote = getWholesaleNote(product, item.quantity);
    const row = document.createElement("article");
    row.className = "cart-line";
    row.innerHTML = `
      <img class="cart-thumb" src="${product.image}" alt="" loading="lazy">
      <div class="cart-line-details">
        <h3>${product.name}</h3>
        <span>${unitPrice}</span>
        ${wholesaleNote ? `<small class="cart-wholesale-note${item.quantity >= product.wholesale.minimumQuantity ? " is-applied" : ""}">${wholesaleNote}</small>` : ""}
        <div class="quantity-control" aria-label="Cantidad de ${product.name}">
          <button type="button" data-quantity="-1" data-id="${product.id}" aria-label="Quitar una unidad">−</button>
          <span>${item.quantity}</span>
          <button type="button" data-quantity="1" data-id="${product.id}" aria-label="Agregar una unidad">+</button>
        </div>
      </div>
      <div class="cart-line-end">
        <span class="cart-line-price">${linePrice}</span>
        <button class="remove-item" type="button" data-remove="${product.id}">Quitar</button>
      </div>`;
    cartItems.append(row);
  }
}

function openDrawer() {
  backdrop.hidden = false;
  drawer.inert = false;
  drawer.setAttribute("aria-hidden", "false");
  backdrop.getBoundingClientRect();
  backdrop.classList.add("is-visible");
  drawer.classList.add("is-open");
  drawer.querySelector(".close-drawer").focus();
  document.body.classList.add("drawer-open");
}

function closeDrawer() {
  drawer.classList.remove("is-open");
  backdrop.classList.remove("is-visible");
  drawer.setAttribute("aria-hidden", "true");
  drawer.inert = true;
  document.body.classList.remove("drawer-open");
  window.setTimeout(() => {
    if (!drawer.classList.contains("is-open")) backdrop.hidden = true;
  }, 300);
  document.querySelector(".cart-trigger").focus();
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function addToCart(id, quantity = 1) {
  const existing = cart.find((item) => item.id === id);
  if (existing) existing.quantity += quantity;
  else cart.push({ id, quantity });
  saveCart();
  updateCart();
  showToast(`${products[id].name} se agregó a tu bolsa.`);
}

function openProductDialog(id, trigger) {
  const product = products[id];
  const card = document.querySelector(`[data-product="${id}"]`);
  if (!product || !card) {
    console.error(`No se encontró la ficha del producto "${id}".`);
    return;
  }
  const image = card.querySelector(".product-image img");
  const dialogGallery = productDialogImage.parentElement;
  setupGallery(dialogGallery, product);
  showGalleryImage(
    dialogGallery,
    getGallery(product),
    Number(card.querySelector(".product-image").dataset.galleryIndex) || 0,
  );
  productDialogImage.alt = image.alt;
  productDialogImage.classList.toggle(
    "is-botanical",
    card.querySelector(".product-image-botanical") !== null,
  );
  productDialogCategory.textContent = card.querySelector(".product-meta > span").textContent;
  productDialogTitle.textContent = product.name;
  productDialogPrice.textContent = product.price === null
    ? "Precio por confirmar"
    : formatPrice(product.price);
  productDialogLongDescription.textContent = product.detail;
  productDialogFormat.textContent = card.querySelector(".product-meta > span").textContent
    .replace(" · ", " / ");
  productDialogAdd.dataset.add = id;
  setDialogQuantity(1);
  const accordions = productDialog.querySelectorAll(".product-detail-accordions details");
  accordions[0].open = true;
  accordions[1].open = false;
  const productReviews = testimonials.filter((item) => item.productId === id);
  const reviewsPanel = productDialog.querySelector(".product-dialog-reviews");
  reviewsPanel.hidden = productReviews.length === 0;
  reviewsPanel.open = false;
  reviewsPanel.querySelector("summary b").textContent = `(${productReviews.length})`;
  reviewsPanel.querySelector(".product-dialog-reviews-list").innerHTML =
    productReviews.map((item) => testimonialCard(item, false)).join("");
  productDialogTrigger = trigger;
  productDialog.showModal();
  productDialog.querySelector(".product-dialog-close").focus();
}

document.querySelector("#product-grid").addEventListener("click", (event) => {
  const detailButton = event.target.closest("[data-detail]");
  if (detailButton) openProductDialog(detailButton.dataset.detail, detailButton);
  const addButton = event.target.closest("[data-add]");
  if (addButton) addToCart(addButton.dataset.add);
});

productDialog.querySelector(".product-dialog-close").addEventListener("click", () => {
  productDialog.close();
});
productDialog.querySelectorAll(".product-quantity-change").forEach((button) => {
  button.addEventListener("click", () => {
    setDialogQuantity(selectedProductQuantity + Number(button.dataset.step));
  });
});
productDialogWholesale.addEventListener("click", (event) => {
  const jumpButton = event.target.closest(".price-tier-jump");
  if (jumpButton) setDialogQuantity(Number(jumpButton.dataset.quantity));
});
productDialog.addEventListener("click", (event) => {
  if (event.target === productDialog) productDialog.close();
});
productDialog.addEventListener("close", () => {
  productDialogTrigger?.focus();
  productDialogTrigger = null;
});
productDialogAdd.addEventListener("click", () => {
  addToCart(productDialogAdd.dataset.add, selectedProductQuantity);
  productDialogTrigger = null;
  productDialog.close();
  openDrawer();
});

document.querySelectorAll(".cart-trigger").forEach((button) => {
  button.addEventListener("click", openDrawer);
});

document.querySelector(".close-drawer").addEventListener("click", closeDrawer);
document.querySelector(".continue-shopping").addEventListener("click", closeDrawer);
backdrop.addEventListener("click", closeDrawer);
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (checkoutDialog.open) {
    return;
  } else if (productDialog.open) {
    productDialog.close();
  } else if (drawer.classList.contains("is-open")) {
    closeDrawer();
  }
});

cartItems.addEventListener("click", (event) => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");
  if (quantityButton) {
    const item = cart.find((entry) => entry.id === quantityButton.dataset.id);
    if (!item) return;
    item.quantity += Number(quantityButton.dataset.quantity);
    if (item.quantity < 1) cart = cart.filter((entry) => entry.id !== item.id);
  } else if (removeButton) {
    cart = cart.filter((item) => item.id !== removeButton.dataset.remove);
  } else {
    return;
  }
  saveCart();
  updateCart();
});

// Envío por pagar: valores referenciales por zona desde La Araucanía, para paquetes XS (hasta 0,5 kg),
// S (hasta 3 kg) y M (hasta 6 kg). Son estimaciones: ajústalas con las tarifas vigentes del courier.
const shippingRates = {
  a: [3900, 4500, 6000],
  b: [4200, 5200, 6700],
  c: [4950, 5900, 7700],
  d: [6300, 7000, 9900],
  e: [7150, 8300, 12400],
  f: [8000, 9500, 14000],
};
const shippingZones = {
  "La Araucanía": "a",
  "Los Ríos": "b",
  "Los Lagos": "b",
  "Biobío": "b",
  "Ñuble": "b",
  "Maule": "c",
  "O'Higgins": "c",
  "Metropolitana de Santiago": "c",
  "Valparaíso": "c",
  "Coquimbo": "d",
  "Atacama": "d",
  "Antofagasta": "e",
  "Tarapacá": "e",
  "Arica y Parinacota": "e",
  "Aysén": "f",
  "Magallanes": "f",
};
// Peso estimado por unidad (kg), con su envase.
const unitWeights = { Cabello: 0.08, Jabones: 0.13, Rostro: 0.2, Aceites: 0.12, Cuerpo: 0.12, Aromaterapia: 0.05 };
const shippingSizes = ["XS", "S", "M"];

function getCartWeight() {
  const contents = cart.reduce((sum, { id, quantity }) => {
    const unit = id.startsWith("pack-") ? 0.16 : unitWeights[products[id].category] ?? 0.15;
    return sum + unit * quantity;
  }, 0);
  return contents + 0.1;
}

function getShippingEstimate(region) {
  if (!region) return null;
  if (region === "retiro") return { text: "Retiro sin costo en Villarrica" };
  const weight = getCartWeight();
  const size = weight <= 0.5 ? 0 : weight <= 3 ? 1 : weight <= 6 ? 2 : -1;
  const rates = shippingRates[shippingZones[region]];
  if (size < 0 || !rates) return { text: "Por confirmar (pedido grande)" };
  return { text: `${formatPrice(rates[size])} aprox. · paquete ${shippingSizes[size]}` };
}

function updateShippingEstimate() {
  const estimate = getShippingEstimate(checkoutForm.elements.region.value);
  checkoutDialog.querySelector(".checkout-shipping-value").textContent = estimate ? estimate.text : "Elige tu región";
}
checkoutForm.elements.region.addEventListener("change", updateShippingEstimate);

function buildOrderMessage(customer) {
  const lines = cart.map(({ id, quantity }) => {
    const product = products[id];
    const unitPrice = getUnitPrice(product, quantity);
    const linePrice = unitPrice === null
      ? "valor por confirmar"
      : formatPrice(unitPrice * quantity);
    const wholesaleNote = product.wholesale
      ? quantity >= product.wholesale.minimumQuantity
        ? ` (${formatPrice(unitPrice)} c/u, precio mayorista)`
        : ` (${formatPrice(unitPrice)} c/u; mayorista desde ${product.wholesale.minimumQuantity}: ${formatPrice(product.wholesale.price)} c/u)`
      : "";
    return `• ${product.name} x${quantity}: ${linePrice}${wholesaleNote}`;
  });
  const hasUnpricedItems = cart.some((item) => products[item.id].price === null);
  const subtotal = cart.reduce(
    (sum, item) => sum + (getUnitPrice(products[item.id], item.quantity) ?? 0) * item.quantity,
    0,
  );
  const message = [
    "Hola, Amankay. Quiero realizar este pedido:",
    "",
    ...(customer
      ? [
          "Datos de entrega:",
          `Nombre: ${customer.name}`,
          `Correo: ${customer.email}`,
          `Teléfono: ${customer.phone}`,
          `Región: ${customer.region === "retiro" ? "Retiro en Villarrica" : customer.region}`,
          `Comuna o ciudad: ${customer.city}`,
          ...(customer.address ? [`Dirección: ${customer.address}`] : []),
          "",
        ]
      : []),
    ...lines,
    "",
    hasUnpricedItems
      ? "El valor final y la entrega quedan por confirmar."
      : `Subtotal referencial: ${formatPrice(subtotal)}.`,
    customer?.region === "retiro"
      ? "Entrega: retiro en Villarrica, sin costo."
      : `Envío por pagar (referencial): ${getShippingEstimate(customer?.region)?.text ?? "por confirmar"}.`,
  ].join("\n");
  return message;
}

document.querySelector(".checkout-button").addEventListener("click", (event) => {
  if (cart.length === 0) return;
  checkoutTrigger = event.currentTarget;
  const hasUnpricedItems = cart.some((item) => products[item.id].price === null);
  const subtotal = cart.reduce(
    (sum, item) => sum + (getUnitPrice(products[item.id], item.quantity) ?? 0) * item.quantity,
    0,
  );
  checkoutSubtotal.textContent = hasUnpricedItems ? "Por confirmar" : formatPrice(subtotal);
  updateShippingEstimate();
  checkoutDialog.showModal();
  checkoutDialog.querySelector('[name="name"]').focus();
});

checkoutDialog.querySelector(".checkout-close").addEventListener("click", () => {
  checkoutDialog.close();
});
checkoutDialog.addEventListener("click", (event) => {
  if (event.target === checkoutDialog) checkoutDialog.close();
});
checkoutDialog.addEventListener("close", () => {
  checkoutTrigger?.focus();
  checkoutTrigger = null;
});
checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (cart.length === 0) return;
  const customer = Object.fromEntries(new FormData(checkoutForm));
  const message = buildOrderMessage(customer);
  window.open(
    `https://wa.me/56953750504?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
  checkoutDialog.close();
  closeDrawer();
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("is-active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    filterProducts();
    if (button.classList.contains("category-tile")) {
      document.querySelector("#product-grid").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

document.querySelector("#product-search").addEventListener("input", (event) => {
  // La búsqueda recorre todo el catálogo, no solo la categoría elegida.
  if (event.target.value.trim()) {
    document.querySelectorAll(".filter-button").forEach((filter) => {
      const active = filter.dataset.filter === "todos";
      filter.classList.toggle("is-active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
  }
  filterProducts();
});

loadMoreProducts.addEventListener("click", () => {
  visibleProductLimit += 6;
  filterProducts(false);
});

function filterProducts(resetVisibleLimit = true) {
  const selectedCategory =
    document.querySelector(".filter-button.is-active").dataset.filter;
  const searchValue = document.querySelector("#product-search").value.trim();
  const query = normalizeSearch(searchValue);
  document.querySelector(".collection-toolbar").classList.toggle("is-searching", searchValue !== "");
  document.querySelector(".category-filter-heading > p").textContent =
    searchValue ? "Resultados de tu búsqueda" : "Explora por categoría";
  const matchingCards = [];
  document.querySelectorAll(".filter-button").forEach((button) => {
    const category = button.dataset.filter;
    const count = productCards.filter((card) =>
      (category === "todos" || card.dataset.category === category) &&
      products[card.dataset.product]?.published !== false,
    ).length;
    button.querySelector(".filter-count").textContent = String(count);
  });
  document.querySelectorAll(".product-group").forEach((group) => {
    const groupCards = [...group.querySelectorAll(".product-card")];
    const count = groupCards.filter((card) =>
      products[card.dataset.product]?.published !== false,
    ).length;
    group.querySelector(".product-group-count").textContent =
      `${count} ${count === 1 ? "producto" : "productos"}`;
  });
  if (resetVisibleLimit) visibleProductLimit = 6;
  let matchingIndex = 0;

  productCards.forEach((card) => {
    const categoryMatches =
      selectedCategory === "todos" || card.dataset.category === selectedCategory;
    const product = products[card.dataset.product];
    const searchableText = `${card.dataset.name} ${card.querySelector(".product-description").textContent} ${product?.detail ?? ""}`;
    const textMatches = normalizeSearch(searchableText).includes(query);
    const matches = categoryMatches && textMatches && product?.published !== false;
    card.hidden = !matches || (mobileCatalog.matches && matchingIndex >= visibleProductLimit);
    if (matches) {
      matchingCards.push(card);
      matchingIndex += 1;
    }
  });
  document.querySelectorAll(".product-group").forEach((group) => {
    const groupCards = [...group.querySelectorAll(".product-card")];
    group.hidden = !groupCards.some((card) => !card.hidden);
    if (query) {
      const found = groupCards.filter((card) => matchingCards.includes(card)).length;
      group.querySelector(".product-group-count").textContent = `${found} ${found === 1 ? "resultado" : "resultados"}`;
    }
  });
  const remainingCount = matchingCards.length - visibleProductLimit;
  const showLoadMore = mobileCatalog.matches && remainingCount > 0;
  loadMoreProducts.hidden = !showLoadMore;
  loadMoreProducts.parentElement.hidden = !showLoadMore;
  if (showLoadMore) {
    loadMoreProducts.textContent = `Ver ${Math.min(6, remainingCount)} productos más`;
  }
  document.querySelector(".empty-search").hidden = matchingCards.length > 0;
  const resultCount = matchingCards.length;
  document.querySelector(".collection-results").textContent = searchValue
    ? `${resultCount} ${resultCount === 1 ? "resultado" : "resultados"}`
    : `${resultCount} ${resultCount === 1 ? "opción" : "opciones"} para explorar`;
}

if (typeof mobileCatalog.addEventListener === "function") {
  mobileCatalog.addEventListener("change", () => filterProducts());
} else {
  mobileCatalog.addListener(() => filterProducts());
}

const storyDialog = document.querySelector(".story-dialog");
const storyOpen = document.querySelector(".story-open");
storyOpen.addEventListener("click", () => {
  storyDialog.showModal();
  storyDialog.querySelector(".story-dialog-close").focus();
});
storyDialog.querySelector(".story-dialog-close").addEventListener("click", () => storyDialog.close());
storyDialog.querySelector(".story-dialog-collection").addEventListener("click", () => storyDialog.close());
storyDialog.addEventListener("click", (event) => {
  if (event.target === storyDialog) storyDialog.close();
});
storyDialog.addEventListener("close", () => {
  storyOpen.focus({ preventScroll: true });
});

const siteHeader = document.querySelector(".site-header");
function updateHeaderCompact() {
  // Dos umbrales distintos evitan que el menú parpadee justo en el límite.
  const compact = siteHeader.classList.contains("is-compact");
  if (!compact && window.scrollY > 220) siteHeader.classList.add("is-compact");
  else if (compact && window.scrollY < 60) siteHeader.classList.remove("is-compact");
}
window.addEventListener("scroll", updateHeaderCompact, { passive: true });
updateHeaderCompact();

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
document.querySelector(".header-search").addEventListener("click", () => {
  const search = document.querySelector("#product-search");
  search.focus({ preventScroll: true });
  search.scrollIntoView({ behavior: "smooth", block: "center" });
});

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Selección de inicio: cámbiala por los más vendidos cuando quieras.
const favoriteProducts = ["maqui", "shampoo-romero", "aceite-rosa-mosqueta", "roll-on-antiestres"];
const advisorGuide = {
  piel: {
    label: "Piel",
    needs: [
      {
        id: "seca",
        label: "Seca o tirante",
        advice: "La piel seca produce pocos lípidos y pierde agua con facilidad. La clave es limpiar sin resecar y luego reponer grasas nobles que sellen la hidratación, idealmente sobre la piel aún húmeda.",
        picks: [
          ["jabon-avena-miel", "Limpia sin resecar: la avena calma y la miel retiene la humedad."],
          ["maqui", "Karité y aceite de maqui para nutrir y reforzar la barrera de la piel."],
          ["aceite-almendras", "Unas gotas sobre la piel húmeda sellan la hidratación."],
        ],
      },
      {
        id: "grasa",
        label: "Grasa o mixta",
        advice: "El error más común es resecarla: la piel responde produciendo más grasa. Limpia una vez al día con un jabón que arrastre el exceso de sebo, tonifica e hidrata siempre, pero con texturas ligeras.",
        picks: [
          ["jabon-carbon-activado", "El carbón activado atrapa impurezas y exceso de grasa."],
          ["agua-rosas", "Tónico que refresca y equilibra la piel después de la limpieza."],
          ["crema-leche-avena", "Hidratación ligera, de rápida absorción y sin sensación grasa."],
        ],
      },
      {
        id: "sensible",
        label: "Sensible o irritada",
        advice: "Menos es más: pocos productos, suaves y con ingredientes calmantes. Evita los exfoliantes y prueba cada producto nuevo en una zona pequeña antes de usarlo en todo el rostro.",
        picks: [
          ["jabon-calendula", "Limpieza delicada con caléndula, la planta calmante por excelencia."],
          ["crema-leche-avena", "Avena y caléndula, dos calmantes clásicos, en textura ligera."],
          ["aceite-calmar-irritaciones", "Caléndula y manzanilla para la piel enrojecida o reactiva."],
        ],
      },
      {
        id: "madura",
        label: "Madura",
        advice: "Con los años la piel pierde lípidos y capacidad de renovarse. Ayudan los antioxidantes durante el día, los aceites ricos en omegas por la noche y, sobre todo, el protector solar a diario.",
        picks: [
          ["maqui", "De día: antioxidantes del maqui y karité que nutre y protege."],
          ["crema-rosa-mosqueta", "De noche: rosa mosqueta y vitamina E acompañan la renovación."],
          ["aceite-maqui", "Un extra de nutrición y elasticidad: 2 a 3 gotas por la noche."],
        ],
      },
      {
        id: "manchas",
        label: "Con manchas o marcas",
        advice: "Las manchas mejoran con constancia y, ante todo, con protector solar: sin él, cualquier cuidado pierde efecto. La rosa mosqueta es el ingrediente con más tradición para mejorar la apariencia de marcas y cicatrices.",
        picks: [
          ["aceite-rosa-mosqueta", "Prensado en frío: 2 a 3 gotas por la noche sobre la zona."],
          ["crema-rosa-mosqueta", "Crema de noche que nutre y ayuda a unificar el tono."],
          ["jabon-arroz", "Limpieza suave que deja la piel más luminosa y uniforme."],
        ],
      },
    ],
  },
  cabello: {
    label: "Cabello",
    needs: [
      {
        id: "seco",
        label: "Seco o dañado",
        advice: "El cabello seco o castigado por el calor y las tinturas necesita una limpieza suave y lípidos que le devuelvan flexibilidad. No te saltes el acondicionador, de medios a puntas.",
        picks: [
          ["shampoo-palta", "La palta aporta vitamina E y grasas nobles que suavizan la fibra."],
          ["shampoo-rosa-mosqueta", "Hidrata y ayuda a reparar el cabello quebradizo."],
          ["acondicionador-solido", "El aceite de coco reduce el quiebre y facilita el desenredado."],
        ],
      },
      {
        id: "graso",
        label: "Raíz grasa",
        advice: "Si la raíz se engrasa rápido, concentra el shampoo en el cuero cabelludo, masajea bien y aplica el acondicionador solo en las puntas. Evita el agua muy caliente, que estimula la producción de grasa.",
        picks: [
          ["shampoo-ortiga", "La ortiga se usa tradicionalmente para equilibrar el cuero cabelludo graso."],
          ["shampoo-romero", "Limpieza fresca que estimula el cuero cabelludo."],
        ],
      },
      {
        id: "debil",
        label: "Débil o con caída",
        advice: "La caída tiene muchas causas: estrés, cambios hormonales o de estación. Un shampoo acompaña fortaleciendo el cabello y estimulando el cuero cabelludo con el masaje; si la caída es intensa o persistente, consulta a un dermatólogo.",
        picks: [
          ["shampoo-ortiga", "Planta rica en minerales, usada tradicionalmente para fortalecer el cabello."],
          ["shampoo-romero", "El romero se asocia a la estimulación del cuero cabelludo."],
          ["pack-shampoo-romero-acondicionador", "El dúo completo: shampoo de romero y acondicionador."],
        ],
      },
      {
        id: "tenido",
        label: "Teñido",
        advice: "El cabello tinturado es más poroso y pierde color con cada lavado. Lava con agua tibia, espacia los lavados y usa siempre acondicionador para sellar la cutícula.",
        picks: [
          ["shampoo-maqui", "Indicado para cabellos tinturados, con los antioxidantes del maqui."],
          ["acondicionador-solido", "Sella la cutícula y deja el cabello suave."],
          ["pack-shampoo-acondicionador", "El dúo completo: shampoo de maqui y acondicionador."],
        ],
      },
      {
        id: "opaco",
        label: "Opaco o sin brillo",
        advice: "El brillo depende de una cutícula lisa. Ayudan los lavados suaves, un enjuague final con agua fría y los ingredientes que suavizan la fibra capilar.",
        picks: [
          ["shampoo-manzanilla", "Da brillo y realza los reflejos, sobre todo en cabellos claros."],
          ["shampoo-avena", "Limpia con suavidad y deja el cabello suave y con brillo."],
          ["acondicionador-solido", "Alisa la fibra para que refleje mejor la luz."],
        ],
      },
      {
        id: "sensible",
        label: "Cuero cabelludo sensible",
        advice: "Si el cuero cabelludo pica o se irrita, busca fórmulas suaves con ingredientes calmantes y enjuaga muy bien para no dejar residuos.",
        picks: [
          ["shampoo-avena", "La avena es reconocida por su efecto calmante e hidratante."],
          ["shampoo-manzanilla", "La manzanilla calma el cuero cabelludo sensible."],
        ],
      },
    ],
  },
  bienestar: {
    label: "Bienestar",
    needs: [
      {
        id: "tension",
        label: "Tensión muscular",
        advice: "Para cuello, hombros y espalda cargados, lo que más ayuda es el masaje: el calor y la presión suave relajan la zona, y los aceites esenciales acompañan.",
        picks: [
          ["aceite-contracturas", "Con canela, que aporta una sensación de calor en la zona."],
          ["aceite-masaje-muscular", "Con romero, lavanda y manzanilla, ideal después del ejercicio."],
          ["unguento-masaje", "Bálsamo para llevar contigo y aplicar en zonas puntuales."],
        ],
      },
      {
        id: "estres",
        label: "Estrés y descanso",
        advice: "Los aromas actúan rápido: un par de minutos de respiración profunda con lavanda ayudan a bajar el ritmo, durante el día o antes de dormir.",
        picks: [
          ["roll-on-antiestres", "Lavanda, melisa y menta para tus pausas."],
          ["unguento-masaje", "Un masaje en cuello y sienes con manzanilla, lavanda y melisa."],
        ],
      },
      {
        id: "enfoque",
        label: "Concentración y energía",
        advice: "Los aromas herbales y frescos se asocian a un mayor estado de alerta. Úsalos antes de estudiar, trabajar o cuando necesites despejarte.",
        picks: [
          ["roll-on-romero", "Aroma herbal asociado a la memoria y la concentración."],
          ["roll-on-eucalipto", "Frescor que despeja y renueva."],
        ],
      },
    ],
  },
};
let advisorArea = "piel";
let advisorNeed = advisorGuide.piel.needs[0].id;
let showcaseRefreshPending = false;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function isProductAvailable(id) {
  return Object.hasOwn(products, id) && products[id].published !== false;
}

function miniCard(id, why = "") {
  const product = products[id];
  const name = escapeHtml(product.name);
  return `
    <article class="mini-card">
      <button class="mini-card-image" type="button" data-detail="${id}" aria-label="Ver detalles de ${name}"><img src="${escapeHtml(product.image)}" alt="" loading="lazy"></button>
      <div class="mini-card-copy">
        <h3><button type="button" data-detail="${id}">${name}</button></h3>
        ${why ? `<p class="mini-card-why">${escapeHtml(why)}</p>` : ""}
        <div class="mini-card-foot">
          <span class="mini-card-price">${product.price === null ? "Precio por confirmar" : formatPrice(product.price)}</span>
          <button class="mini-card-add" type="button" data-add="${id}">Agregar <span aria-hidden="true">↗</span></button>
        </div>
      </div>
    </article>`;
}

function renderShowcase() {
  const favorites = favoriteProducts.filter(isProductAvailable);
  document.querySelector("#favorites-grid").innerHTML = favorites.map((id) => miniCard(id)).join("");
  document.querySelector("#favoritos").hidden = favorites.length === 0;

  const area = advisorGuide[advisorArea];
  const need = area.needs.find((item) => item.id === advisorNeed) || area.needs[0];
  document.querySelector("#advisor-tabs").innerHTML = Object.entries(advisorGuide).map(([key, item]) =>
    `<button class="advisor-tab${key === advisorArea ? " is-active" : ""}" type="button" data-advisor-area="${key}" aria-pressed="${key === advisorArea}">${item.label}</button>`,
  ).join("");
  document.querySelector("#advisor-needs").innerHTML = area.needs.map((item) =>
    `<button class="advisor-need${item.id === need.id ? " is-active" : ""}" type="button" data-advisor-need="${item.id}" aria-pressed="${item.id === need.id}">${item.label}</button>`,
  ).join("");
  document.querySelector("#advisor-result").innerHTML = `
    <p class="advisor-advice">${need.advice}</p>
    <p class="advisor-picks-title">TE RECOMENDAMOS</p>
    <div class="advisor-picks">${need.picks.filter(([id]) => isProductAvailable(id)).map(([id, why]) => miniCard(id, why)).join("")}</div>`;
}

function scheduleShowcaseRefresh() {
  if (showcaseRefreshPending) return;
  showcaseRefreshPending = true;
  window.setTimeout(() => {
    showcaseRefreshPending = false;
    renderShowcase();
  }, 0);
}

document.querySelectorAll("#favoritos, #asesoria, #testimonios").forEach((section) => {
  section.addEventListener("click", (event) => {
    const areaButton = event.target.closest("[data-advisor-area]");
    const needButton = event.target.closest("[data-advisor-need]");
    const detailButton = event.target.closest("[data-detail]");
    const addButton = event.target.closest("[data-add]");
    if (areaButton) {
      advisorArea = areaButton.dataset.advisorArea;
      advisorNeed = advisorGuide[advisorArea].needs[0].id;
      renderShowcase();
    } else if (needButton) {
      advisorNeed = needButton.dataset.advisorNeed;
      renderShowcase();
    } else if (detailButton) {
      openProductDialog(detailButton.dataset.detail, detailButton);
    } else if (addButton) {
      addToCart(addButton.dataset.add);
    }
  });
});
renderShowcase();

let testimonials = [];

function testimonialCard(item, withProduct = true) {
  const product = withProduct && item.productId && isProductAvailable(item.productId)
    ? products[item.productId]
    : null;
  const author = [item.name, item.city].filter(Boolean).map(escapeHtml).join(" · ");
  return `
    <figure class="testimonial">
      <blockquote>${escapeHtml(item.text)}</blockquote>
      <figcaption><strong>${author}</strong>${product ? `<button type="button" data-detail="${escapeHtml(product.id)}">${escapeHtml(product.name)}</button>` : ""}</figcaption>
    </figure>`;
}

window.amankayRenderTestimonials = (list) => {
  testimonials = Array.isArray(list) ? list : [];
  document.querySelector("#testimonios").hidden = testimonials.length === 0;
  document.querySelector("#testimonials-grid").innerHTML =
    testimonials.slice(0, 6).map((item) => testimonialCard(item)).join("");
};
if (window.amankayTestimonials) window.amankayRenderTestimonials(window.amankayTestimonials);

productCards.forEach((card) => {
  const product = products[card.dataset.product];
  if (!product) return;
  renderCardWholesale(card, product);
  setupGallery(card.querySelector(".product-image"), product);
});
filterProducts();
updateCart();

window.amankayProducts = Object.values(products);
window.amankayProductDescriptionSync = {
  revision: "20261003-1",
  productIds: Object.keys(products),
};
// Fotos del catálogo que pasaron de PNG a JPG: los registros guardados en Firebase pueden apuntar aún al PNG.
const optimizedImages = new Set(Object.values(products).map((product) => product.image));
// Textos y formatos del sitio: la tarjeta muestra el resumen corto mientras la descripción completa no se edite en Firebase.
const staticCopy = new Map(Object.values(products).map((product) => [product.id, {
  detail: product.detail,
  format: product.format || "",
  images: product.images || [],
  summary: document.querySelector(`[data-product="${CSS.escape(product.id)}"] .product-description`)?.textContent || "",
}]));
// Productos retirados de la tienda: se ignoran aunque sigan guardados en Firebase.
const retiredProducts = new Set(["jabones", "shampoo-seco", "shampoo-normal", "shampoo-hidratante"]);
// Aceites que antes estaban en Rostro o Botánica: Firebase puede conservar la categoría antigua.
const recategorizedOils = new Set(["aceite-maqui", "aceite-oregano", "aceite-rosa-mosqueta", "aceite-almendras", "macerado-calendula", "aceite-calmar-irritaciones"]);
window.amankayApplyCatalogUpdate = (record) => {
  if (retiredProducts.has(record.id)) return;
  scheduleShowcaseRefresh();
  if (recategorizedOils.has(record.id) && ["Rostro", "Botánica"].includes(record.category)) {
    record = { ...record, category: "Aceites" };
  }
  const optimizedImage = String(record.image || "").replace(/\.png$/i, ".jpg");
  const staticProduct = products[record.id];
  const descriptionSync = window.amankayProductDescriptionSync;
  const useReviewedDescription = descriptionSync?.productIds.includes(record.id)
    && record.descriptionRevision !== descriptionSync.revision;
  const product = {
    id: record.id,
    name: record.name,
    price: record.price ?? null,
    wholesale: record.wholesaleMinimum > 0 && record.wholesalePrice > 0
      ? { minimumQuantity: record.wholesaleMinimum, price: record.wholesalePrice }
      : null,
    category: record.category,
    image: optimizedImages.has(optimizedImage) ? optimizedImage : record.image,
    detail: useReviewedDescription && staticProduct ? staticProduct.detail : record.detail,
    format: record.format || staticCopy.get(record.id)?.format || "",
    images: Array.isArray(record.images) ? record.images : staticCopy.get(record.id)?.images || [],
    published: record.published !== false,
  };
  products[product.id] = product;
  const card = document.querySelector(`[data-product="${CSS.escape(product.id)}"]`);
  if (!card && product.published) {
    const number = String(document.querySelectorAll(".product-card").length + 1).padStart(2, "0");
    const category = product.category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const categoryLabel = category.toLocaleUpperCase("es");
    const escaped = (value) => String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[character]);
    createProductGroup(category).insertAdjacentHTML("beforeend", `
      <article class="product-card" data-product="${escaped(product.id)}" data-category="${escaped(category)}" data-name="${escaped(product.name.toLocaleLowerCase("es"))}">
        <div class="product-image product-image-botanical">
          <button class="product-detail-trigger" type="button" data-detail="${escaped(product.id)}" aria-label="Ver detalles de ${escaped(product.name)}"><img src="${escaped(product.image)}" alt="${escaped(product.name)}" loading="lazy"></button>
        </div>
        <div class="product-meta"><span>${escaped(categoryLabel)}${product.format ? ` · ${escaped(product.format)}` : ""}</span><span class="product-number">${number}</span></div>
        <div class="product-title-row"><h3><button class="product-title-trigger" type="button" data-detail="${escaped(product.id)}">${escaped(product.name)}</button></h3><span class="product-price">${product.price === null ? "Precio por confirmar" : formatPrice(product.price)}</span></div>
        <p class="product-wholesale-note" ${product.wholesale ? "" : "hidden"}>${product.wholesale ? `Mayorista desde ${product.wholesale.minimumQuantity} unidades · ${formatPrice(product.wholesale.price)} c/u` : ""}</p>
        <p class="product-description">${escaped(product.detail)}</p>
        <button class="text-add" type="button" data-add="${escaped(product.id)}">Agregar a la bolsa <span aria-hidden="true">↗</span></button>
      </article>`);
    renderCardWholesale(document.querySelector(`[data-product="${CSS.escape(product.id)}"]`), product);
    setupGallery(document.querySelector(`[data-product="${CSS.escape(product.id)}"] .product-image`), product);
    productCards = [...document.querySelectorAll(".product-card")];
    filterProducts();
    updateCart();
    return;
  }
  if (!card) return;
  card.dataset.catalogCloud = String(record._fromCloud === true || card.dataset.catalogCloud === "true");
  card.hidden = !product.published;
  card.dataset.name = product.name.toLocaleLowerCase("es");
  card.dataset.category = product.category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const image = card.querySelector(".product-image img");
  image.src = product.image;
  setupGallery(card.querySelector(".product-image"), product);
  image.alt = product.name;
  card.querySelector(".product-meta > span").textContent =
    `${product.category.toLocaleUpperCase("es")}${product.format ? ` · ${product.format}` : ""}`;
  card.querySelector(".product-title-trigger").textContent = product.name;
  const titleRow = card.querySelector(".product-title-row");
  titleRow.querySelector(".product-price").textContent =
    product.price === null ? "Precio por confirmar" : formatPrice(product.price);
  renderCardWholesale(card, product);
  const copy = staticCopy.get(product.id);
  card.querySelector(".product-description").textContent =
    copy?.summary && product.detail === copy.detail ? copy.summary : product.detail;
  filterProducts();
  updateCart();
};
window.dispatchEvent(new Event("amankay-products-ready"));
