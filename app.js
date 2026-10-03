const products = {
  maqui: {
    id: "maqui",
    name: "Crema facial de maqui",
    price: 10000,
    wholesale: { minimumQuantity: 6, price: 8000 },
    category: "Rostro",
    image: "assets/products/crema-facial-maqui-catalogo.jpg",
    detail: "Aceite de maqui y manteca de karité se unen en esta crema facial, pensada para acompañar el cuidado de las líneas de expresión. Envase de 50 g.",
  },
  "crema-leche-avena": {
    id: "crema-leche-avena",
    name: "Crema leche de avena",
    price: 10000,
    wholesale: { minimumQuantity: 6, price: 8000 },
    category: "Rostro",
    image: "assets/products/crema-leche-avena-catalogo.jpg",
    detail: "De textura ligera, combina avena y aceite de caléndula. Ideal para sumar a tu rutina de día. Envase de 50 g.",
  },
  "crema-rosa-mosqueta": {
    id: "crema-rosa-mosqueta",
    name: "Crema facial rosa mosqueta",
    price: 10000,
    wholesale: { minimumQuantity: 6, price: 8000 },
    category: "Rostro",
    image: "assets/products/crema-rosa-mosqueta-catalogo.jpg",
    detail: "Para tu rutina nocturna, con rosa mosqueta, manteca de karité y vitamina E. Aporta hidratación y ayuda a cuidar la piel. Envase de 50 g.",
  },
  serum: {
    id: "serum",
    name: "Sérum facial",
    price: 6000,
    category: "Rostro",
    image: "assets/products/serum-facial-catalogo.jpg",
    detail: "Una textura ligera con proteína de seda para acompañar la hidratación y nutrición de tu piel.",
  },
  cafe: {
    id: "cafe",
    name: "Exfoliante de café",
    price: 5000,
    category: "Cuerpo",
    image: "assets/products/exfoliante-cafe-catalogo.jpg",
    detail: "Un momento de cuidado para rostro y cuerpo, elaborado con aceites de coco, almendras y zanahoria.",
  },
  "jabon-cafe": {
    id: "jabon-cafe",
    name: "Jabón café",
    price: 6000,
    wholesale: { minimumQuantity: 10, price: 4000 },
    category: "Jabones",
    image: "assets/products/jabon-cafe-catalogo.jpg",
    detail: "Hecho artesanalmente con café, aceites y mantecas vegetales.",
  },
  "jabon-carbon-activado": {
    id: "jabon-carbon-activado",
    name: "Jabón carbón activado",
    price: 6000,
    wholesale: { minimumQuantity: 10, price: 4000 },
    category: "Jabones",
    image: "assets/products/jabon-carbon-activado-catalogo.jpg",
    detail: "Una barra con carbón activado para una limpieza profunda, pensada para pieles con tendencia al acné.",
  },
  "jabon-maqui": {
    id: "jabon-maqui",
    name: "Jabón maqui",
    price: 6000,
    wholesale: { minimumQuantity: 10, price: 4000 },
    category: "Jabones",
    image: "assets/products/jabon-maqui-catalogo.jpg",
    detail: "Con maqui, para aportar hidratación y cuidado antioxidante a tu rutina.",
  },
  "jabon-calendula": {
    id: "jabon-calendula",
    name: "Jabón caléndula",
    price: 6000,
    wholesale: { minimumQuantity: 10, price: 4000 },
    category: "Jabones",
    image: "assets/products/jabon-calendula-catalogo.jpg",
    detail: "La caléndula acompaña este jabón pensado para el cuidado de las pieles irritadas.",
  },
  "jabon-romero": {
    id: "jabon-romero",
    name: "Jabón Romero",
    price: 6000,
    wholesale: { minimumQuantity: 10, price: 4000 },
    category: "Jabones",
    image: "assets/products/jabon-romero-catalogo.jpg",
    detail: "Jabón de romero con propiedades antibacterianas e hidratantes.",
  },
  "jabon-arroz": {
    id: "jabon-arroz",
    name: "Jabón arroz",
    price: 6000,
    category: "Jabones",
    image: "assets/products/jabon-arroz-catalogo.jpg",
    detail: "Elaborado con finos aceites, este jabón natural ayuda a aclarar y dar elasticidad a la piel.",
  },
  "jabon-canelo-cacao": {
    id: "jabon-canelo-cacao",
    name: "Jabón canelo-cacao",
    price: 6000,
    wholesale: { minimumQuantity: 10, price: 4000 },
    category: "Jabones",
    image: "assets/products/jabon-canelo-cacao-catalogo.jpg",
    detail: "Jabón de canelo y cacao con propiedades antioxidantes.",
  },
  "jabon-rosa-mosqueta": {
    id: "jabon-rosa-mosqueta",
    name: "Jabón rosa mosqueta",
    price: 6000,
    wholesale: { minimumQuantity: 10, price: 4000 },
    category: "Jabones",
    image: "assets/products/jabon-rosa-mosqueta-catalogo.jpg",
    detail: "Con rosa mosqueta, para acompañar la regeneración e hidratación de la piel.",
  },
  "jabon-avena-miel": {
    id: "jabon-avena-miel",
    name: "Jabón avena miel",
    price: 6000,
    wholesale: { minimumQuantity: 10, price: 4000 },
    category: "Jabones",
    image: "assets/products/jabon-avena-miel-catalogo.jpg",
    detail: "Elaborado con finos aceites, limpia en profundidad y ayuda a dar elasticidad a la piel.",
  },
  "aceite-maqui": {
    id: "aceite-maqui",
    name: "Aceite de maqui",
    price: 8000,
    wholesale: { minimumQuantity: 6, price: 7000 },
    category: "Botánica",
    image: "assets/products/aceite-maqui-catalogo.jpg",
    detail: "Aceite de maqui, apreciado por su perfil antioxidante y pensado especialmente para pieles maduras.",
  },
  "aceite-oregano": {
    id: "aceite-oregano",
    name: "Aceite de orégano",
    price: 9000,
    category: "Botánica",
    image: "assets/products/aceite-oregano-catalogo.jpg",
    detail: "Aceite botánico de orégano para sumar a tu rutina de cuidado de la piel. Envase de 30 ml.",
  },
  "agua-rosas": {
    id: "agua-rosas",
    name: "Agua de rosas",
    price: 6000,
    wholesale: { minimumQuantity: 6, price: 4500 },
    category: "Rostro",
    image: "assets/products/agua-rosas-catalogo.jpg",
    detail: "Agua de rosas para limpiar y refrescar la piel como parte de tu rutina diaria.",
  },
  "aceite-calmar-irritaciones": {
    id: "aceite-calmar-irritaciones",
    name: "Aceite para calmar irritaciones",
    price: 9500,
    category: "Rostro",
    image: "assets/products/aceite-calmar-irritaciones-catalogo.jpg",
    detail: "Con aceite de caléndula y aceite esencial de manzanilla, para un cuidado botánico diario del rostro. Envase de 30 ml.",
  },
  "macerado-calendula": {
    id: "macerado-calendula",
    name: "Macerado de caléndula",
    price: 9000,
    wholesale: { minimumQuantity: 6, price: 8000 },
    category: "Rostro",
    image: "assets/products/macerado-calendula-catalogo.jpg",
    detail: "Caléndula macerada en aceite vegetal para acompañar el cuidado de la piel irritada.",
  },
  "aceite-almendras": {
    id: "aceite-almendras",
    name: "Aceite de almendras",
    price: 9000,
    wholesale: { minimumQuantity: 6, price: 7000 },
    category: "Rostro",
    image: "assets/products/aceite-almendras-catalogo.jpg",
    detail: "Aceite de almendras, rico en vitamina E, una opción sencilla para sumar a tu rutina de cuidado.",
  },
  "aceite-rosa-mosqueta": {
    id: "aceite-rosa-mosqueta",
    name: "Aceite de rosa mosqueta",
    price: 9000,
    wholesale: { minimumQuantity: 6, price: 8000 },
    category: "Rostro",
    image: "assets/products/aceite-rosa-mosqueta-catalogo.jpg",
    detail: "Prensado en frío, con rosa mosqueta para acompañar la hidratación y ayudar a cuidar la apariencia de las manchas. Envase de 30 ml.",
  },
  "shampoo-seco": {
    id: "shampoo-seco",
    name: "Shampoo sólido · cabello seco",
    price: 7000,
    wholesale: { minimumQuantity: 6, price: 6000 },
    category: "Cabello",
    image: "assets/instagram/shampoo-cabello-seco-romero-ortiga.webp",
    detail: "Una barra sólida con romero y ortiga, creada para acompañar el cuidado del cabello seco. Formato de 60 g.",
  },
  "shampoo-normal": {
    id: "shampoo-normal",
    name: "Shampoo sólido · cabello normal",
    price: 7000,
    wholesale: { minimumQuantity: 6, price: 6000 },
    category: "Cabello",
    image: "assets/instagram/shampoo-02.webp",
    detail: "Una barra sólida de Amankay pensada para sumar sencillez a la rutina del cabello normal. Formato de 60 g.",
  },
  "shampoo-hidratante": {
    id: "shampoo-hidratante",
    name: "Shampoo hidratante",
    price: 7000,
    wholesale: { minimumQuantity: 6, price: 6000 },
    category: "Cabello",
    image: "assets/instagram/shampoo-03.webp",
    detail: "Una fórmula sólida con caléndula y jojoba para acompañar una rutina capilar hidratante. Formato de 60 g.",
  },
  "shampoo-ortiga": {
    id: "shampoo-ortiga",
    name: "Shampoo ortiga",
    price: 7000,
    wholesale: { minimumQuantity: 6, price: 6000 },
    category: "Cabello",
    image: "assets/products/shampoo-ortiga-catalogo.jpg",
    detail: "Shampoo anticaída elaborado con derivado del aceite de coco y polvo de ortiga. Peso aproximado: 60 g.",
  },
  "pack-shampoo-acondicionador": {
    id: "pack-shampoo-acondicionador",
    name: "Pack shampoo de maqui y acondicionador",
    price: 13000,
    wholesale: { minimumQuantity: 6, price: 11000 },
    category: "Cabello",
    image: "assets/products/pack-shampoo-acondicionador-catalogo.jpg",
    detail: "Un dúo para tu rutina capilar: shampoo de maqui y acondicionador de aceite de coco.",
  },
  "pack-shampoo-rosa-mosqueta-acondicionador": {
    id: "pack-shampoo-rosa-mosqueta-acondicionador",
    name: "Pack shampoo y acondicionador",
    price: 13000,
    wholesale: { minimumQuantity: 6, price: 11000 },
    category: "Cabello",
    image: "assets/products/pack-shampoo-rosa-mosqueta-acondicionador-catalogo.jpg",
    detail: "Pack shampoo rosa mosqueta y acondicionador aceite de coco.",
  },
  "shampoo-romero": {
    id: "shampoo-romero",
    name: "Shampoo romero",
    price: 7000,
    wholesale: { minimumQuantity: 6, price: 6000 },
    category: "Cabello",
    image: "assets/products/shampoo-romero-catalogo.jpg",
    detail: "Shampoo sólido de romero que ayuda a reparar el cabello dañado y a devolverle su brillo. Peso aproximado: 50 g.",
  },
  "pack-shampoo-ortiga-acondicionador": {
    id: "pack-shampoo-ortiga-acondicionador",
    name: "Pack shampoo de ortiga y acondicionador",
    price: 13000,
    wholesale: { minimumQuantity: 6, price: 11000 },
    category: "Cabello",
    image: "assets/products/pack-shampoo-ortiga-acondicionador-catalogo.png",
    detail: "Un dúo para tu rutina capilar: shampoo de ortiga y acondicionador de aceite de coco.",
  },
  "shampoo-rosa-mosqueta": {
    id: "shampoo-rosa-mosqueta",
    name: "Shampoo rosa mosqueta",
    price: 7000,
    wholesale: { minimumQuantity: 6, price: 6000 },
    category: "Cabello",
    image: "assets/products/shampoo-rosa-mosqueta-catalogo.png",
    detail: "Shampoo sólido de rosa mosqueta que hidrata y ayuda a reparar el cabello dañado. Peso aproximado: 60 g.",
  },
  "shampoo-manzanilla": {
    id: "shampoo-manzanilla",
    name: "Shampoo manzanilla",
    price: 7000,
    wholesale: { minimumQuantity: 6, price: 6000 },
    category: "Cabello",
    image: "assets/products/shampoo-manzanilla-catalogo.jpg",
    detail: "Shampoo sólido de manzanilla que da brillo y ayuda a reparar el cabello dañado.",
  },
  "pack-shampoo-manzanilla-acondicionador": {
    id: "pack-shampoo-manzanilla-acondicionador",
    name: "Pack shampoo de manzanilla y acondicionador",
    price: 13000,
    wholesale: { minimumQuantity: 6, price: 11000 },
    category: "Cabello",
    image: "assets/products/pack-shampoo-manzanilla-acondicionador-catalogo.jpg",
    detail: "Un dúo para tu rutina capilar: shampoo de manzanilla y acondicionador de aceite de coco.",
  },
  "pomada-calendula": {
    id: "pomada-calendula",
    name: "Pomada de caléndula",
    price: 7000,
    wholesale: { minimumQuantity: 6, price: 4500 },
    category: "Cuerpo",
    image: "assets/products/pomada-calendula-catalogo.jpg",
    detail: "Un cuidado reconfortante con caléndula para acompañar la hidratación de la piel reseca y el cuidado de las irritaciones.",
  },
  "aceite-contracturas": {
    id: "aceite-contracturas",
    name: "Aceite para contracturas",
    price: 9500,
    category: "Cuerpo",
    image: "assets/products/aceite-contracturas-catalogo.jpg",
    detail: "Masajea la zona con una mezcla de jojoba, caléndula y aceites esenciales de canela, manzanilla y lavanda. Envase de 30 ml.",
  },
  "aceite-masaje-muscular": {
    id: "aceite-masaje-muscular",
    name: "Aceite masaje muscular",
    price: 9500,
    category: "Cuerpo",
    image: "assets/products/aceite-masaje-muscular-catalogo.jpg",
    detail: "Aceite de almendras con lavanda, manzanilla y romero para acompañar el masaje muscular. Envase de 30 ml.",
  },
  "unguento-masaje": {
    id: "unguento-masaje",
    name: "Ungüento para masaje",
    price: 5000,
    category: "Cuerpo",
    image: "assets/products/unguento-masaje-catalogo.jpg",
    detail: "Bálsamo de masaje con aceite de coco, cera vegetal y aceites esenciales de manzanilla, lavanda y melisa. Envase de 20 g.",
  },
  "roll-on-antiestres": {
    id: "roll-on-antiestres",
    name: "Roll on antiestrés",
    price: 8000,
    wholesale: { minimumQuantity: 6, price: 7000 },
    category: "Aromaterapia",
    image: "assets/products/roll-on-antiestres-catalogo.jpg",
    detail: "Lavanda, melisa y menta se encuentran en esta mezcla aromática para acompañar tus pausas.",
  },
  "roll-on-eucalipto": {
    id: "roll-on-eucalipto",
    name: "Roll on de eucalipto",
    price: 7500,
    wholesale: { minimumQuantity: 6, price: 6500 },
    category: "Aromaterapia",
    image: "assets/products/roll-on-eucalipto-catalogo.jpg",
    detail: "Una mezcla aromática de eucalipto con notas frescas y estimulantes para acompañar tu día.",
  },
  "roll-on-romero": {
    id: "roll-on-romero",
    name: "Roll on de romero",
    price: 8000,
    wholesale: { minimumQuantity: 6, price: 6000 },
    category: "Aromaterapia",
    image: "assets/products/roll-on-romero-catalogo.jpg",
    detail: "Una nota herbal de romero para acompañar tus momentos de enfoque y concentración.",
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
  rostro: {
    title: "Rostro",
    description: "Fórmulas botánicas para acompañar tu rutina facial, de día y de noche.",
  },
  cuerpo: {
    title: "Cuerpo",
    description: "Pequeños rituales de cuidado, masaje y bienestar corporal.",
  },
  aromaterapia: {
    title: "Aromaterapia",
    description: "Mezclas aromáticas para acompañar distintos momentos de tu día.",
  },
  jabones: {
    title: "Jabones artesanales",
    description: "La mayoría de las variedades cuesta $6.000; revisa cada ficha para conocer su precio mayorista.",
  },
  cabello: {
    title: "Cabello",
    description: "Opciones sólidas y botánicas para sumar a tu rutina capilar.",
  },
  botanica: {
    title: "Botánica",
    description: "Aceites y preparados botánicos inspirados en la naturaleza del sur.",
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
  productDialogImage.src = product.image;
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
          `Comuna o ciudad: ${customer.city}`,
          ...(customer.address ? [`Dirección: ${customer.address}`] : []),
          "",
        ]
      : []),
    ...lines,
    "",
    hasUnpricedItems
      ? "El valor final y la entrega quedan por confirmar."
      : `Subtotal referencial: ${formatPrice(subtotal)}. Envío por confirmar.`,
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
  });
});

document.querySelector("#product-search").addEventListener("input", filterProducts);

loadMoreProducts.addEventListener("click", () => {
  visibleProductLimit += 6;
  filterProducts(false);
});

function filterProducts(resetVisibleLimit = true) {
  const selectedCategory =
    document.querySelector(".filter-button.is-active").dataset.filter;
  const searchValue = document.querySelector("#product-search").value.trim();
  const query = normalizeSearch(searchValue);
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
    group.hidden = ![...group.querySelectorAll(".product-card")].some((card) => !card.hidden);
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

productCards.forEach((card) => {
  const product = products[card.dataset.product];
  if (product) renderCardWholesale(card, product);
});
filterProducts();
updateCart();

window.amankayProducts = Object.values(products);
window.amankayProductDescriptionSync = {
  revision: "20261002-1",
  productIds: [
    "maqui",
    "crema-leche-avena",
    "crema-rosa-mosqueta",
    "serum",
    "cafe",
    "jabon-cafe",
    "jabon-carbon-activado",
    "jabon-maqui",
    "jabon-calendula",
    "jabon-romero",
    "jabon-arroz",
    "jabon-canelo-cacao",
    "jabon-rosa-mosqueta",
    "jabon-avena-miel",
    "aceite-maqui",
    "aceite-oregano",
    "agua-rosas",
    "aceite-calmar-irritaciones",
    "macerado-calendula",
    "aceite-almendras",
    "aceite-rosa-mosqueta",
    "shampoo-seco",
    "shampoo-normal",
    "shampoo-hidratante",
    "pomada-calendula",
    "aceite-contracturas",
    "aceite-masaje-muscular",
    "unguento-masaje",
    "roll-on-antiestres",
    "roll-on-eucalipto",
    "roll-on-romero",
    "pack-shampoo-acondicionador",
    "pack-shampoo-rosa-mosqueta-acondicionador",
    "shampoo-romero",
    "pack-shampoo-ortiga-acondicionador",
    "shampoo-rosa-mosqueta",
    "shampoo-manzanilla",
    "pack-shampoo-manzanilla-acondicionador",
  ],
};
// Fotos del catálogo que pasaron de PNG a JPG: los registros guardados en Firebase pueden apuntar aún al PNG.
const optimizedImages = new Set(Object.values(products).map((product) => product.image));
window.amankayApplyCatalogUpdate = (record) => {
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
    format: record.format || "",
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
  image.alt = product.name;
  card.querySelector(".product-meta > span").textContent =
    `${product.category.toLocaleUpperCase("es")}${product.format ? ` · ${product.format}` : ""}`;
  card.querySelector(".product-title-trigger").textContent = product.name;
  const titleRow = card.querySelector(".product-title-row");
  titleRow.querySelector(".product-price").textContent =
    product.price === null ? "Precio por confirmar" : formatPrice(product.price);
  renderCardWholesale(card, product);
  card.querySelector(".product-description").textContent = product.detail;
  filterProducts();
  updateCart();
};
window.dispatchEvent(new Event("amankay-products-ready"));
