const products = {
  maqui: {
    id: "maqui",
    name: "Crema facial de maqui",
    price: 5000,
    category: "Rostro",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=240&q=70",
  },
  serum: {
    id: "serum",
    name: "Sérum facial",
    price: 6000,
    category: "Rostro",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=240&q=70",
  },
  cafe: {
    id: "cafe",
    name: "Exfoliante de café",
    price: 5000,
    category: "Cuerpo",
    image: "https://images.unsplash.com/photo-1600428853876-fb5a850b444f?auto=format&fit=crop&w=240&q=70",
  },
  jabones: {
    id: "jabones",
    name: "Jabones orgánicos",
    price: 3500,
    category: "Jabones",
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=240&q=70",
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
    (sum, item) => sum + products[item.id].price * item.quantity,
    0,
  );
  document.querySelector(".cart-count").textContent = itemCount;
  document.querySelector(".drawer-count").textContent = `(${itemCount})`;
  document.querySelector(".cart-subtotal").textContent = formatPrice(subtotal);
  emptyCart.hidden = cart.length > 0;
  drawerFooter.hidden = cart.length === 0;
  cartItems.replaceChildren();

  for (const item of cart) {
    const product = products[item.id];
    const row = document.createElement("article");
    row.className = "cart-line";
    row.innerHTML = `
      <img class="cart-thumb" src="${product.image}" alt="" loading="lazy">
      <div class="cart-line-details">
        <h3>${product.name}</h3>
        <span>${formatPrice(product.price)}</span>
        <div class="quantity-control" aria-label="Cantidad de ${product.name}">
          <button type="button" data-quantity="-1" data-id="${product.id}" aria-label="Quitar una unidad">−</button>
          <span>${item.quantity}</span>
          <button type="button" data-quantity="1" data-id="${product.id}" aria-label="Agregar una unidad">+</button>
        </div>
      </div>
      <div class="cart-line-end">
        <span class="cart-line-price">${formatPrice(product.price * item.quantity)}</span>
        <button class="remove-item" type="button" data-remove="${product.id}">Quitar</button>
      </div>`;
    cartItems.append(row);
  }
}

function openDrawer() {
  backdrop.hidden = false;
  drawer.inert = false;
  drawer.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => {
    backdrop.classList.add("is-visible");
    drawer.classList.add("is-open");
    drawer.querySelector(".close-drawer").focus();
  });
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
    return `• ${product.name} x${quantity}: ${formatPrice(product.price * quantity)}`;
  });
  const subtotal = cart.reduce(
    (sum, item) => sum + products[item.id].price * item.quantity,
    0,
  );
  const message = [
    "Hola, Amankay. Quiero consultar por este pedido:",
    "",
    ...lines,
    "",
    `Subtotal referencial: ${formatPrice(subtotal)}`,
    "Entiendo que el valor final y la entrega se confirman por este medio.",
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
