const products = {
  maqui: {
    id: "maqui",
    name: "Crema facial de maqui",
    price: 5000,
    category: "Rostro",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=240&q=70",
    detail: "Crema facial con maqui, manteca de karité y aceite de maqui. Una fórmula pensada para hidratar y acompañar la reparación de la piel.",
  },
  serum: {
    id: "serum",
    name: "Sérum facial",
    price: 6000,
    category: "Rostro",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=240&q=70",
    detail: "Sérum facial con proteína de seda que ayuda a hidratar y nutrir la piel, ideal para sumar a tu rutina diaria de cuidado.",
  },
  cafe: {
    id: "cafe",
    name: "Exfoliante de café",
    price: 5000,
    category: "Cuerpo",
    image: "https://images.unsplash.com/photo-1600428853876-fb5a850b444f?auto=format&fit=crop&w=240&q=70",
    detail: "Exfoliante para rostro y cuerpo elaborado con aceites de coco, almendras y zanahoria. Un momento de cuidado para renovar tu rutina.",
  },
  jabones: {
    id: "jabones",
    name: "Jabones orgánicos",
    price: 3500,
    category: "Jabones",
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=240&q=70",
    detail: "Jabones orgánicos artesanales, naturales e hidratantes. Puedes elegir la variedad que prefieras al preparar tu pedido.",
  },
  "aceite-maqui": {
    id: "aceite-maqui",
    name: "Aceite de maqui",
    price: null,
    category: "Botánica",
    image: "assets/products/aceite-maqui-catalogo.jpg",
    detail: "Aceite natural de maqui prensado en frío, elaborado en la Araucanía. Un cuidado botánico de origen sureño para integrar a tu ritual.",
  },
  "agua-rosas": {
    id: "agua-rosas",
    name: "Agua de rosas",
    price: null,
    category: "Rostro",
    image: "assets/products/agua-rosas-catalogo.jpg",
    detail: "Agua de rosas de 60 ml. Amankay la presenta como hidratante, refrescante y purificante para la piel.",
  },
  "shampoo-seco": {
    id: "shampoo-seco",
    name: "Shampoo sólido · cabello seco",
    price: null,
    category: "Cabello",
    image: "assets/instagram/shampoo-cabello-seco-romero-ortiga.webp",
    detail: "Shampoo sólido para cabello seco, con romero y ortiga. Formato de 60 g.",
  },
  "shampoo-normal": {
    id: "shampoo-normal",
    name: "Shampoo sólido · cabello normal",
    price: null,
    category: "Cabello",
    image: "assets/instagram/shampoo-02.webp",
    detail: "Una alternativa sólida de la línea capilar Amankay para cabello normal. Formato de 60 g.",
  },
  "shampoo-hidratante": {
    id: "shampoo-hidratante",
    name: "Shampoo hidratante",
    price: null,
    category: "Cabello",
    image: "assets/instagram/shampoo-03.webp",
    detail: "Shampoo sólido hidratante con caléndula y jojoba. Formato de 60 g.",
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
const productDialogDescription = productDialog.querySelector(".product-dialog-description");
const productDialogAdd = productDialog.querySelector(".product-dialog-add");
let productDialogTrigger = null;
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

function updateCart() {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + (products[item.id].price || 0) * item.quantity,
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
    const unitPrice = product.price === null
      ? "Precio por confirmar"
      : formatPrice(product.price);
    const linePrice = product.price === null
      ? "Por confirmar"
      : formatPrice(product.price * item.quantity);
    const row = document.createElement("article");
    row.className = "cart-line";
    row.innerHTML = `
      <img class="cart-thumb" src="${product.image}" alt="" loading="lazy">
      <div class="cart-line-details">
        <h3>${product.name}</h3>
        <span>${unitPrice}</span>
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

function addToCart(id) {
  const existing = cart.find((item) => item.id === id);
  if (existing) existing.quantity += 1;
  else cart.push({ id, quantity: 1 });
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
  productDialogImage.src = image.src;
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
  productDialogDescription.textContent = product.detail;
  productDialogAdd.dataset.add = id;
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
productDialog.addEventListener("click", (event) => {
  if (event.target === productDialog) productDialog.close();
});
productDialog.addEventListener("close", () => {
  productDialogTrigger?.focus();
  productDialogTrigger = null;
});
productDialogAdd.addEventListener("click", () => {
  addToCart(productDialogAdd.dataset.add);
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
  if (event.key === "Escape" && drawer.classList.contains("is-open")) closeDrawer();
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
    const linePrice = product.price === null
      ? "valor por confirmar"
      : formatPrice(product.price * quantity);
    return `• ${product.name} x${quantity}: ${linePrice}`;
  });
  const hasUnpricedItems = cart.some((item) => products[item.id].price === null);
  const subtotal = cart.reduce(
    (sum, item) => sum + (products[item.id].price || 0) * item.quantity,
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
