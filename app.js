const products = {
  maqui: {
    id: "maqui",
    name: "Crema facial de maqui",
    price: 5000,
    category: "Rostro",
    image: "assets/products/crema-maqui-catalogo.jpg",
    detail: "Un cuidado facial inspirado en los frutos del sur. Su fórmula reúne maqui, manteca de karité y aceite de maqui para hidratar y acompañar la reparación de la piel.",
  },
  serum: {
    id: "serum",
    name: "Sérum facial",
    price: 6000,
    category: "Rostro",
    image: "assets/products/serum-facial-catalogo.jpg",
    detail: "Un gesto ligero para tu rutina diaria. La proteína de seda ayuda a hidratar y nutrir la piel.",
  },
  cafe: {
    id: "cafe",
    name: "Exfoliante de café",
    price: 5000,
    category: "Cuerpo",
    image: "assets/products/exfoliante-cafe-catalogo.jpg",
    detail: "Una pausa exfoliante para rostro y cuerpo, elaborada con aceites de coco, almendras y zanahoria.",
  },
  jabones: {
    id: "jabones",
    name: "Jabones orgánicos",
    price: 3500,
    category: "Jabones",
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=240&q=70",
    detail: "Jabones orgánicos y artesanales, naturales e hidratantes. Elige la variedad que acompañará tu ritual cotidiano al preparar tu pedido.",
  },
  "aceite-maqui": {
    id: "aceite-maqui",
    name: "Aceite de maqui",
    price: 8000,
    wholesale: { minimumQuantity: 6, price: 7000 },
    category: "Botánica",
    image: "assets/products/aceite-maqui-catalogo.jpg",
    detail: "Aceite de maqui, potente antioxidante especialmente pensado para pieles maduras.",
  },
  "aceite-oregano": {
    id: "aceite-oregano",
    name: "Aceite de orégano",
    price: 9000,
    category: "Botánica",
    image: "assets/products/aceite-oregano-catalogo.jpg",
    detail: "Un aceite botánico para el cuidado de la piel, apreciado por sus propiedades terapéuticas. Envase de 30 ml.",
  },
  "agua-rosas": {
    id: "agua-rosas",
    name: "Agua de rosas",
    price: null,
    category: "Rostro",
    image: "assets/products/agua-rosas-catalogo.jpg",
    detail: "Rosas en un gesto de frescura para tu rutina facial: hidratante, refrescante y purificante. Envase de 60 ml.",
  },
  "aceite-calmar-irritaciones": {
    id: "aceite-calmar-irritaciones",
    name: "Aceite para calmar irritaciones",
    price: 9500,
    category: "Rostro",
    image: "assets/products/aceite-calmar-irritaciones-catalogo.jpg",
    detail: "Caléndula y aceite esencial de manzanilla se unen en un cuidado para el rostro. Aplicar a diario. Envase de 30 ml.",
  },
  "macerado-calendula": {
    id: "macerado-calendula",
    name: "Macerado de caléndula",
    price: 9000,
    wholesale: { minimumQuantity: 6, price: 8000 },
    category: "Rostro",
    image: "assets/products/macerado-calendula-catalogo.jpg",
    detail: "Caléndula macerada en aceite vegetal, pensada para ayudar a calmar las irritaciones de la piel.",
  },
  "aceite-almendras": {
    id: "aceite-almendras",
    name: "Aceite de almendras",
    price: 9000,
    wholesale: { minimumQuantity: 6, price: 7000 },
    category: "Rostro",
    image: "assets/products/aceite-almendras-catalogo.jpg",
    detail: "Un aceite 100% natural, rico en vitamina E y adecuado para todo tipo de pieles.",
  },
  "aceite-rosa-mosqueta": {
    id: "aceite-rosa-mosqueta",
    name: "Aceite de rosa mosqueta",
    price: 9000,
    wholesale: { minimumQuantity: 6, price: 8000 },
    category: "Rostro",
    image: "assets/products/aceite-rosa-mosqueta-catalogo.jpg",
    detail: "Un cuidado botánico 100% natural y prensado en frío. Ayuda a regenerar y atenuar las manchas de la piel. Envase de 30 ml.",
  },
  "shampoo-seco": {
    id: "shampoo-seco",
    name: "Shampoo sólido · cabello seco",
    price: null,
    category: "Cabello",
    image: "assets/instagram/shampoo-cabello-seco-romero-ortiga.webp",
    detail: "Romero y ortiga en un shampoo sólido para cabello seco, inspirado en la botánica del sur. Formato de 60 g.",
  },
  "shampoo-normal": {
    id: "shampoo-normal",
    name: "Shampoo sólido · cabello normal",
    price: null,
    category: "Cabello",
    image: "assets/instagram/shampoo-02.webp",
    detail: "Una alternativa sólida de Amankay para acompañar el cuidado del cabello normal. Formato de 60 g.",
  },
  "shampoo-hidratante": {
    id: "shampoo-hidratante",
    name: "Shampoo hidratante",
    price: null,
    category: "Cabello",
    image: "assets/instagram/shampoo-03.webp",
    detail: "Caléndula y jojoba en un shampoo sólido hidratante para sumar a tu rutina capilar. Formato de 60 g.",
  },
  "pomada-calendula": {
    id: "pomada-calendula",
    name: "Pomada de caléndula",
    price: 7000,
    wholesale: { minimumQuantity: 6, price: 4500 },
    category: "Cuerpo",
    image: "assets/products/pomada-calendula-catalogo.jpg",
    detail: "Un cuidado reconfortante con caléndula, pensado para calmar irritaciones e hidratar las pieles resecas.",
  },
  "aceite-contracturas": {
    id: "aceite-contracturas",
    name: "Aceite para contracturas",
    price: 9500,
    category: "Cuerpo",
    image: "assets/products/aceite-contracturas-catalogo.jpg",
    detail: "Un masaje de cuidado con jojoba, caléndula y aceites esenciales de canela, manzanilla y lavanda. Frotar en la zona una o dos veces por semana. Envase de 30 ml.",
  },
  "aceite-masaje-muscular": {
    id: "aceite-masaje-muscular",
    name: "Aceite masaje muscular",
    price: 9500,
    category: "Cuerpo",
    image: "assets/products/aceite-masaje-muscular-catalogo.jpg",
    detail: "Aceite de almendras con aceites esenciales de lavanda, manzanilla y romero, pensado para acompañar el masaje muscular. Aplicar en la zona hasta producir calor. Envase de 30 ml.",
  },
  "unguento-masaje": {
    id: "unguento-masaje",
    name: "Ungüento para masaje",
    price: 5000,
    category: "Cuerpo",
    image: "assets/products/unguento-masaje-catalogo.jpg",
    detail: "Un bálsamo para el masaje con aceite de coco, cera vegetal y aceites esenciales de manzanilla, lavanda y melisa. Frotar en la zona deseada. Envase de 20 g.",
  },
  "roll-on-antiestres": {
    id: "roll-on-antiestres",
    name: "Roll on antiestrés",
    price: 8000,
    wholesale: { minimumQuantity: 6, price: 7000 },
    category: "Aromaterapia",
    image: "assets/products/roll-on-antiestres-catalogo.jpg",
    detail: "Una pausa aromática para acompañar momentos de estrés, con aceites esenciales de lavanda, melisa y menta.",
  },
  "roll-on-eucalipto": {
    id: "roll-on-eucalipto",
    name: "Roll on de eucalipto",
    price: 7500,
    wholesale: { minimumQuantity: 6, price: 6500 },
    category: "Aromaterapia",
    image: "assets/products/roll-on-eucalipto-catalogo.jpg",
    detail: "Una nota fresca, penetrante y estimulante de eucalipto, para acompañar tu día y ayudar a despejar las vías respiratorias.",
  },
  "roll-on-romero": {
    id: "roll-on-romero",
    name: "Roll on de romero",
    price: 8000,
    wholesale: { minimumQuantity: 6, price: 6000 },
    category: "Aromaterapia",
    image: "assets/products/roll-on-romero-catalogo.jpg",
    detail: "El aroma herbal del romero acompaña la memoria, la concentración y el estado de alerta.",
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
const productDialogImage = productDialog.querySelector(".product-dialog-image img");
const productDialogCategory = productDialog.querySelector(".product-dialog-category");
const productDialogTitle = productDialog.querySelector("#product-dialog-title");
const productDialogPrice = productDialog.querySelector(".product-dialog-price");
const productDialogWholesale = productDialog.querySelector(".product-dialog-wholesale");
const productDialogFormat = productDialog.querySelector(".product-dialog-format strong");
const productDialogLongDescription = productDialog.querySelector(".product-dialog-long-description");
const productDialogAdd = productDialog.querySelector(".product-dialog-add");
const productDialogQuantity = productDialog.querySelector(".product-quantity");
let productDialogTrigger = null;
let selectedProductQuantity = 1;
let cart = loadCart();
let toastTimer;

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
  if (quantity >= product.wholesale.minimumQuantity) {
    return `Precio mayorista aplicado: ${formatPrice(product.wholesale.price)} c/u.`;
  }
  return `Mayorista desde ${product.wholesale.minimumQuantity}: ${formatPrice(product.wholesale.price)} c/u.`;
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
        ${wholesaleNote ? `<small class="cart-wholesale-note">${wholesaleNote}</small>` : ""}
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
  productDialogWholesale.textContent = getWholesaleNote(product, 1);
  productDialogWholesale.hidden = !product.wholesale;
  productDialogLongDescription.textContent = product.detail;
  productDialogFormat.textContent = card.querySelector(".product-meta > span").textContent
    .replace(" · ", " / ");
  productDialogAdd.dataset.add = id;
  selectedProductQuantity = 1;
  productDialogQuantity.value = "1";
  productDialog.querySelector('[data-step="-1"]').disabled = true;
  const accordions = productDialog.querySelectorAll(".product-detail-accordions details");
  accordions[0].open = true;
  accordions[1].open = false;
  productDialogTrigger = trigger;
  productDialog.showModal();
  productDialog.querySelector(".product-dialog-close").focus();
}

document.querySelectorAll("[data-detail]").forEach((button) => {
  button.addEventListener("click", () => {
    openProductDialog(button.dataset.detail, button);
  });
});

productDialog.querySelector(".product-dialog-close").addEventListener("click", () => {
  productDialog.close();
});
productDialog.querySelectorAll(".product-quantity-change").forEach((button) => {
  button.addEventListener("click", () => {
    selectedProductQuantity = Math.max(
      1,
      selectedProductQuantity + Number(button.dataset.step),
    );
    productDialogQuantity.value = String(selectedProductQuantity);
    productDialog.querySelector('[data-step="-1"]').disabled = selectedProductQuantity === 1;
    const product = products[productDialogAdd.dataset.add];
    productDialogWholesale.textContent = getWholesaleNote(product, selectedProductQuantity);
  });
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

document.querySelectorAll("[data-add]").forEach((button) => {
  button.addEventListener("click", () => addToCart(button.dataset.add));
});

document.querySelectorAll(".cart-trigger").forEach((button) => {
  button.addEventListener("click", openDrawer);
});

document.querySelector(".close-drawer").addEventListener("click", closeDrawer);
document.querySelector(".continue-shopping").addEventListener("click", closeDrawer);
backdrop.addEventListener("click", closeDrawer);
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (productDialog.open) {
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

document.querySelector(".checkout-button").addEventListener("click", () => {
  if (cart.length === 0) return;
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
    ...lines,
    "",
    hasUnpricedItems
      ? "El valor final y la entrega quedan por confirmar."
      : `Subtotal referencial: ${formatPrice(subtotal)}`,
  ].join("\n");
  window.open(
    `https://wa.me/56953750504?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
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

function filterProducts() {
  const selectedCategory =
    document.querySelector(".filter-button.is-active").dataset.filter;
  const query = document.querySelector("#product-search").value
    .trim()
    .toLocaleLowerCase("es");
  let visibleCount = 0;

  document.querySelectorAll(".product-card").forEach((card) => {
    const categoryMatches =
      selectedCategory === "todos" || card.dataset.category === selectedCategory;
    const nameMatches = card.dataset.name.toLocaleLowerCase("es").includes(query);
    const visible = categoryMatches && nameMatches;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  document.querySelector(".empty-search").hidden = visibleCount > 0;
}

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

updateCart();
