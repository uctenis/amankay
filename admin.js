import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { ownerEmail, firebaseConfig, paymentEndpoint } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const shopMain = document.querySelector("body > main:not(.admin-app)");
const adminMain = document.querySelector(".admin-app");
const shopHeader = document.querySelector(".site-header");
const shopFooter = document.querySelector(".site-footer");
const announcement = document.querySelector(".announcement");
const loginSection = document.querySelector(".admin-login");
const workspace = document.querySelector(".admin-workspace");
const authNotice = document.querySelector("#admin-auth-notice");
const feedback = document.querySelector("#admin-feedback");
const numberFormat = new Intl.NumberFormat("es-CL");
const moneyFormat = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});
const data = { catalog: [], inventory: [], orders: [], customers: [], expenses: [], stockMovements: [], testimonials: [], adminUsers: [] };
let stopSubscriptions = [];
let currentUser;
let initialSnapshots = new Set();
let seededSession = false;
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

function say(element, message, isError = false) {
  element.textContent = message;
  element.classList.toggle("is-error", isError);
}

function showAdminPage(open) {
  adminMain.hidden = !open;
  shopMain.hidden = open;
  shopHeader.hidden = open;
  shopFooter.hidden = open;
  announcement.hidden = open;
  document.body.classList.toggle("admin-mode", open);
  if (!open && location.hash === "#administracion") {
    history.replaceState(null, "", `${location.pathname}${location.search}`);
    window.scrollTo(0, 0);
  }
}

function showAdminView(viewName) {
  document.querySelectorAll(".admin-tab").forEach((tab) => {
    const active = tab.dataset.adminView === viewName;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-current", active ? "page" : "false");
  });
  document.querySelectorAll(".admin-view").forEach((view) => {
    view.classList.toggle("is-active", view.dataset.adminPanel === viewName);
  });
}

function showAdminFeedback(message, isError = false) {
  say(feedback, message, isError);
  feedback.classList.add("is-visible");
  window.clearTimeout(showAdminFeedback.timer);
  showAdminFeedback.timer = window.setTimeout(() => feedback.classList.remove("is-visible"), 4500);
}

function friendlyError(error) {
  const messages = {
    "auth/email-already-in-use": "Ese correo ya tiene una cuenta. Inicia sesión o recupera tu contraseña.",
    "auth/invalid-credential": "El correo o la contraseña no coinciden.",
    "auth/invalid-email": "Revisa el formato del correo electrónico.",
    "auth/too-many-requests": "Demasiados intentos. Espera un momento y vuelve a probar.",
    "auth/network-request-failed": "No hay conexión con Firebase. Comprueba tu internet.",
    "auth/weak-password": "La contraseña debe tener al menos 8 caracteres.",
    "auth/popup-closed-by-user": "Se cerró la ventana de Google antes de completar el acceso.",
    "auth/popup-blocked": "El navegador bloqueó la ventana de acceso de Google. Permite las ventanas emergentes para este sitio e inténtalo de nuevo.",
    "auth/unauthorized-domain": `El dominio ${location.hostname} no está autorizado. Agrégalo en Firebase Console → Authentication → Configuración → Dominios autorizados.`,
    "permission-denied": "Firebase rechazó esta operación. Publica firestore.rules en la consola y verifica que el correo administrador esté confirmado.",
    "failed-precondition": "Falta configurar Firestore o un índice. Revisa la configuración en Firebase Console.",
    "unavailable": "Firebase no está disponible en este momento. Inténtalo nuevamente.",
  };
  return messages[error.code] || `No se pudo completar la operación (${error.code || "error"}). ${error.message || "Revisa la conexión y las reglas de Firebase."}`;
}

function requireAdminEmail(email) {
  return String(email || "").trim().toLowerCase() === ownerEmail;
}

function money(value) {
  return value === null || value === undefined ? "—" : moneyFormat.format(Number(value) || 0);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function dateForInput(date = new Date()) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function asDate(value) {
  if (value?.toDate) return value.toDate();
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

// Un pedido cuenta como venta desde que se confirma; los nuevos y anulados quedan fuera.
function isSale(order) {
  return order.status !== "Anulado" && order.status !== "Nuevo";
}

function orderCost(order) {
  return (order.items || []).reduce(
    (sum, item) => sum + (Number(item.unitCost) || 0) * (Number(item.quantity) || 0), 0,
  );
}

function inPeriod(value, period) {
  if (period === "all") return true;
  const date = asDate(value);
  const now = new Date();
  if (period === "year") return date.getFullYear() === now.getFullYear();
  const reference = period === "previous" ? new Date(now.getFullYear(), now.getMonth() - 1, 1) : now;
  return date.getFullYear() === reference.getFullYear() && date.getMonth() === reference.getMonth();
}

function whatsappLink(phone) {
  let digits = String(phone || "").replace(/\D/g, "");
  if (!digits) return "";
  // Los celulares chilenos suelen anotarse sin el código de país.
  if (digits.length === 9 && digits.startsWith("9")) digits = `56${digits}`;
  else if (digits.length === 8) digits = `569${digits}`;
  return `https://wa.me/${digits}`;
}

function downloadFile(name, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadCsv(name, rows) {
  // Punto y coma y BOM para que Excel en español abra las columnas y los acentos correctamente.
  const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(";")).join("\r\n");
  downloadFile(name, `﻿${csv}`, "text/csv;charset=utf-8");
}

function productFromStatic(product) {
  const record = {
    id: product.id,
    name: product.name,
    category: product.category,
    format: product.format || "",
    price: product.price,
    wholesaleMinimum: product.wholesale?.minimumQuantity || 0,
    wholesalePrice: product.wholesale?.price || 0,
    detail: product.detail,
    image: product.image,
    published: true,
  };
  const descriptionSync = window.amankayProductDescriptionSync;
  if (descriptionSync?.productIds.includes(product.id)) {
    record.descriptionRevision = descriptionSync.revision;
  }
  return record;
}

function currentCatalogProduct(id) {
  return data.catalog.find((item) => item.id === id);
}

function setSyncMessage(message, isError = false) {
  const syncStatus = document.querySelector("#firebase-sync-status");
  syncStatus.textContent = message;
  syncStatus.classList.toggle("is-error", isError);
}

function clearSubscriptions() {
  stopSubscriptions.forEach((stop) => stop());
  stopSubscriptions = [];
}

function refreshViews() {
  renderDashboard();
  renderOrders();
  renderCustomers();
  renderCatalog();
  renderInventory();
  renderStockMovements();
  renderExpenses();
  renderTestimonials();
  renderReports();
  renderAdminUsers();
  refreshOrderProductOptions();
}

function subscribeToBusinessData() {
  clearSubscriptions();
  initialSnapshots = new Set();
  seededSession = false;
  const collections = ["catalog", "inventory", "orders", "expenses", "stockMovements", "testimonials"];
  if (requireAdminEmail(currentUser.email)) collections.push("adminUsers");
  for (const name of collections) {
    const unsubscribe = onSnapshot(collection(db, name), (snapshot) => {
      data[name] = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
      if (name === "catalog" || name === "inventory") {
        initialSnapshots.add(name);
        if (initialSnapshots.size === 2 && !seededSession) {
          seededSession = true;
          seedBusinessData().catch((error) => {
            console.error("No se pudieron preparar los productos iniciales en Firebase.", error);
            showAdminFeedback(friendlyError(error), true);
          });
        }
      }
      if (name === "catalog") {
        const ids = new Set(data.catalog.map((item) => item.id));
        data.catalog
          .forEach((item) => window.amankayApplyCatalogUpdate({ ...item, _fromCloud: true }));
        window.amankayProducts
          .filter((product) => !ids.has(product.id))
          .forEach((product) => window.amankayApplyCatalogUpdate(productFromStatic(product)));
        const publishedIds = new Set(data.catalog.filter((item) => item.published !== false).map((item) => item.id));
        document.querySelectorAll(".product-card[data-catalog-cloud='true']").forEach((card) => {
          card.hidden = !publishedIds.has(card.dataset.product);
        });
      }
      if (name === "adminUsers") renderAdminUsers();
      setSyncMessage("Sincronizado con Firebase");
      refreshViews();
    }, (error) => {
      console.error(`Error sincronizando ${name} con Firestore.`, error);
      setSyncMessage(friendlyError(error), true);
      if (currentUser) showAdminFeedback(friendlyError(error), true);
    });
    stopSubscriptions.push(unsubscribe);
  }
}

function initializeCatalogSync() {
  const start = () => {
    if (window.catalogSyncInitialized) return;
    window.catalogSyncInitialized = true;
    onSnapshot(collection(db, "catalog"), (snapshot) => {
      const ids = new Set(snapshot.docs.map((item) => item.id));
      snapshot.docs.forEach((item) => window.amankayApplyCatalogUpdate({ id: item.id, ...item.data(), _fromCloud: true }));
      window.amankayProducts.filter((product) => !ids.has(product.id))
        .forEach((product) => window.amankayApplyCatalogUpdate(productFromStatic(product)));
    }, (error) => {
      console.error("No se pudo sincronizar el catálogo público de Firebase.", error);
    });
  };
  if (window.amankayProducts) start();
  else window.addEventListener("amankay-products-ready", start, { once: true });
}

initializeCatalogSync();

onSnapshot(query(collection(db, "testimonials"), where("published", "==", true)), (snapshot) => {
  const list = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))
    .sort((a, b) => asDate(b.createdAt) - asDate(a.createdAt));
  window.amankayTestimonials = list;
  window.amankayRenderTestimonials?.(list);
}, (error) => {
  console.warn("No se pudieron cargar los testimonios de la tienda.", error);
});

window.amankayPaymentEndpoint = paymentEndpoint;

const reviewToken = new URLSearchParams(location.search).get("opinar");
if (reviewToken && /^[0-9a-f-]{36}$/.test(reviewToken)) {
  const dialog = document.querySelector(".review-dialog");
  const form = dialog.querySelector(".review-form");
  const notice = dialog.querySelector(".review-feedback");
  dialog.querySelector(".review-close").addEventListener("click", () => dialog.close());
  getDoc(doc(db, "reviewInvites", reviewToken)).then(async (invite) => {
    if (!invite.exists() || invite.data().expiresAt.toDate() <= new Date()) throw new Error("Este enlace venció o no existe.");
    const product = await getDoc(doc(db, "catalog", invite.data().productId));
    dialog.querySelector(".review-product").textContent = product.exists() ? `Producto: ${product.data().name}` : "Producto Amankay";
    dialog.showModal();
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submit = form.querySelector('[type="submit"]');
      submit.disabled = true;
      try {
        const values = new FormData(form);
        await setDoc(doc(db, "testimonials", reviewToken), {
          name: String(values.get("name") || "").trim(),
          city: String(values.get("city") || "").trim(),
          text: String(values.get("text") || "").trim(),
          productId: invite.data().productId,
          published: false,
          verifiedPurchase: true,
          createdAt: serverTimestamp(),
        });
        form.querySelectorAll("label, button[type=submit]").forEach((element) => { element.hidden = true; });
        notice.textContent = "Gracias. Recibimos tu reseña y la revisaremos antes de publicarla.";
        history.replaceState(null, "", location.pathname + location.hash);
      } catch (error) {
        notice.textContent = error.code === "permission-denied" ? "Este enlace ya fue utilizado o el pedido aún no figura como entregado." : "No pudimos enviar la reseña. Inténtalo nuevamente.";
        submit.disabled = false;
      }
    });
  }).catch((error) => {
    console.warn("No se pudo abrir la invitación de reseña.", error);
    dialog.querySelector(".review-product").textContent = "Este enlace de reseña venció o no existe.";
    form.querySelectorAll("label, button[type=submit]").forEach((element) => { element.hidden = true; });
    dialog.showModal();
  });
}

// Pedidos hechos desde la tienda: llegan al panel como "Nuevo" para confirmarlos.
window.amankaySubmitOrder = (order) => setDoc(doc(db, "orders", order.number), {
  ...order,
  status: "Nuevo",
  channel: "Web",
  paid: false,
  stockDeducted: false,
  createdAt: serverTimestamp(),
});

async function seedBusinessData() {
  const existing = new Set(data.catalog.map((item) => item.id));
  const staticProducts = window.amankayProducts || [];
  const missingProducts = staticProducts.filter((product) => !existing.has(product.id));
  for (const product of missingProducts) {
    await setDoc(doc(db, "catalog", product.id), productFromStatic(product));
  }
  const descriptionSync = window.amankayProductDescriptionSync;
  if (descriptionSync) {
    const syncedProducts = [];
    for (const product of staticProducts) {
      if (!descriptionSync.productIds.includes(product.id)) continue;
      const catalogProduct = data.catalog.find((item) => item.id === product.id);
      if (!catalogProduct || catalogProduct.descriptionRevision === descriptionSync.revision) continue;
      await updateDoc(doc(db, "catalog", product.id), {
        detail: product.detail,
        descriptionRevision: descriptionSync.revision,
        updatedAt: serverTimestamp(),
      });
      syncedProducts.push(product.name);
    }
    if (syncedProducts.length > 0) {
      showAdminFeedback(`Descripciones actualizadas en la tienda (${syncedProducts.length} productos).`);
    }
  }
  const existingInventory = new Set(data.inventory.map((item) => item.id));
  for (const product of staticProducts) {
    if (!existingInventory.has(product.id)) {
      await setDoc(doc(db, "inventory", product.id), {
        productId: product.id,
        quantity: null,
        minimum: 3,
        costPrice: null,
        updatedAt: serverTimestamp(),
      });
    }
  }
}

function startWorkspace(user) {
  currentUser = user;
  loginSection.hidden = true;
  workspace.hidden = false;
  document.querySelector("#admin-user-email").textContent = user.email;
  setSyncMessage("Conectando con Firebase…");
  subscribeToBusinessData();
}

document.querySelectorAll(".admin-open").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showAdminPage(true);
    if (currentUser?.emailVerified) {
      document.querySelector(".owner-only").hidden = !requireAdminEmail(currentUser.email);
      startWorkspace(currentUser);
      return;
    }
    loginSection.hidden = false;
    workspace.hidden = true;
    document.querySelector("#admin-google-sign-in").focus();
  });
});
document.querySelectorAll(".admin-back").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showAdminPage(false);
  });
});
if (location.hash === "#administracion") showAdminPage(true);

document.querySelector("#admin-google-sign-in").addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    say(authNotice, "");
  } catch (error) {
    console.error("No se pudo iniciar sesión con Google.", error);
    say(authNotice, friendlyError(error), true);
  }
});

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    clearSubscriptions();
    currentUser = null;
    workspace.hidden = true;
    loginSection.hidden = false;
    return;
  }
  try {
    const token = await user.getIdTokenResult();
    if (token.signInProvider !== "google.com") {
      await signOut(auth);
      say(authNotice, "Accede con Google para administrar la tienda.", true);
      return;
    }
    if (!user.emailVerified) {
      await signOut(auth);
      say(authNotice, "La cuenta de Google no informó un correo verificado. Usa una cuenta Google con correo confirmado.");
      return;
    }
    const owner = requireAdminEmail(user.email);
    const profile = owner
      ? null
      : await getDoc(doc(db, "adminUsers", user.email.toLowerCase()));
    if (!owner && !profile?.exists()) {
      console.warn("La cuenta Google no tiene un perfil administrador autorizado.");
      await signOut(auth);
      say(authNotice, `La cuenta ${user.email} todavía no está autorizada. Pídele a la propietaria que agregue tu perfil.`, true);
      return;
    }
    if (!owner && profile.data().uid && profile.data().uid !== user.uid) {
      await signOut(auth);
      say(authNotice, "Este perfil está vinculado a otra cuenta Google. Pide a la propietaria que revise el acceso.", true);
      return;
    }
    if (!owner && !profile.data().uid) {
      await updateDoc(doc(db, "adminUsers", user.email.toLowerCase()), { uid: user.uid });
    }
    currentUser = user;
    document.querySelector(".owner-only").hidden = !owner;
    if (!adminMain.hidden) startWorkspace(user);
  } catch (error) {
    console.error("No se pudo validar el perfil administrador en Firestore.", error);
    await signOut(auth);
    say(authNotice, friendlyError(error), true);
  }
});

document.querySelector("#admin-sign-out").addEventListener("click", async () => {
  clearSubscriptions();
  try {
    await signOut(auth);
    workspace.hidden = true;
    loginSection.hidden = false;
    showAdminPage(false);
  } catch (error) {
    console.error("No se pudo cerrar sesión.", error);
    showAdminFeedback(friendlyError(error), true);
  }
});

document.querySelectorAll(".admin-tab").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.adminView === "users" && !requireAdminEmail(currentUser?.email)) return;
    showAdminView(button.dataset.adminView);
  });
});
document.querySelectorAll("[data-open-view]").forEach((button) => {
  button.addEventListener("click", () => showAdminView(button.dataset.openView));
});

function monthOrders() {
  const now = new Date();
  return data.orders.filter((order) => {
    const created = asDate(order.createdAt);
    return created.getFullYear() === now.getFullYear() && created.getMonth() === now.getMonth();
  });
}

function renderDashboard() {
  const hour = new Date().getHours();
  document.querySelector("#admin-greeting").textContent =
    `${hour < 12 ? "Buenos días" : hour < 20 ? "Buenas tardes" : "Buenas noches"}, Amankay.`;
  const sales = monthOrders().filter(isSale);
  const revenue = sales.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
  const withCost = sales.filter((order) => (order.items || []).some((item) => Number(item.unitCost) > 0));
  const webNew = data.orders.filter((order) => order.status === "Nuevo" && order.channel === "Web").length;
  const unpaid = data.orders.filter((order) => order.status !== "Anulado" && order.paid === false)
    .reduce((sum, order) => sum + (Number(order.total) || 0), 0);
  const customers = customerList();
  const topProducts = new Map();
  const channels = new Map();
  sales.forEach((order) => {
    const channel = order.channel || "Sin canal";
    channels.set(channel, (channels.get(channel) || 0) + (Number(order.total) || 0));
    (order.items || []).forEach((item) => {
      const entry = topProducts.get(item.name) || { units: 0, total: 0 };
      entry.units += Number(item.quantity) || 0;
      entry.total += (Number(item.unitPrice) || 0) * (Number(item.quantity) || 0);
      topProducts.set(item.name, entry);
    });
  });
  document.querySelector("#metric-pending-note").textContent = webNew > 0
    ? `${numberFormat.format(webNew)} ${webNew === 1 ? "llegó" : "llegaron"} por la web y ${webNew === 1 ? "espera" : "esperan"} confirmación`
    : "Pedidos nuevos, confirmados o en preparación";
  document.querySelector("#metric-ticket").textContent = money(sales.length ? Math.round(revenue / sales.length) : 0);
  document.querySelector("#metric-margin").textContent =
    money(withCost.reduce((sum, order) => sum + (Number(order.total) || 0) - orderCost(order), 0));
  document.querySelector("#metric-margin-note").textContent = withCost.length < sales.length
    ? `Calculado sobre ${numberFormat.format(withCost.length)} de ${numberFormat.format(sales.length)} pedidos: registra el costo de tus productos`
    : "Ventas menos costo de los productos vendidos";
  document.querySelector("#metric-unpaid").textContent = money(unpaid);
  document.querySelector("#metric-returning").textContent = customers.length
    ? `${Math.round(customers.filter((customer) => customer.orders > 1).length / customers.length * 100)}%`
    : "—";
  document.querySelector("#dashboard-top-products").innerHTML = [...topProducts]
    .sort((a, b) => b[1].units - a[1].units)
    .slice(0, 5)
    .map(([name, entry]) => `<p><span>${escapeHtml(name)}</span><strong>${numberFormat.format(entry.units)} u · ${money(entry.total)}</strong></p>`)
    .join("") || "<p>Aún no hay ventas confirmadas este mes.</p>";
  document.querySelector("#dashboard-channels").innerHTML = [...channels]
    .sort((a, b) => b[1] - a[1])
    .map(([channel, total]) => `<p><span>${escapeHtml(channel)}</span><strong>${money(total)} · ${revenue ? Math.round(total / revenue * 100) : 0}%</strong></p>`)
    .join("") || "<p>Registra el canal de cada pedido para saber dónde vendes más.</p>";
  const expenses = data.expenses.filter((item) => {
    const date = asDate(item.date);
    const now = new Date();
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  });
  const openOrders = data.orders.filter((order) => ["Nuevo", "Confirmado", "Preparando"].includes(order.status));
  const lowStock = data.inventory.filter((item) =>
    item.quantity !== null && item.quantity !== undefined &&
    Number.isFinite(Number(item.quantity)) && Number(item.quantity) <= Number(item.minimum || 0));
  document.querySelector("#metric-sales").textContent = money(revenue);
  document.querySelector("#metric-pending").textContent = numberFormat.format(openOrders.length);
  document.querySelector("#metric-low-stock").textContent = numberFormat.format(lowStock.length);
  document.querySelector("#metric-expenses").textContent =
    money(expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0));
  document.querySelector("#dashboard-orders").innerHTML = [...data.orders]
    .sort((a, b) => asDate(b.createdAt) - asDate(a.createdAt))
    .slice(0, 5)
    .map((order) => `<tr><td>${escapeHtml(order.number || order.id.slice(0, 7))}</td><td>${escapeHtml(order.customer)}</td><td>${money(order.total)}</td><td><span class="admin-badge">${escapeHtml(order.status)}</span></td></tr>`)
    .join("") || '<tr><td colspan="4">Aún no hay pedidos registrados.</td></tr>';
  document.querySelector("#dashboard-low-stock").innerHTML = lowStock.slice(0, 5)
    .map((item) => {
      const product = currentCatalogProduct(item.id);
      return `<p><span>${escapeHtml(product?.name || item.id)}</span><strong>${numberFormat.format(Number(item.quantity))} disponibles</strong></p>`;
    }).join("") || "<p>Sin alertas de reposición por ahora.</p>";
}

function filteredOrders() {
  const query = document.querySelector("#order-search").value.trim().toLocaleLowerCase("es");
  const status = document.querySelector("#order-status-filter").value;
  return [...data.orders].filter((order) => {
    const customer = `${order.customer || ""} ${order.phone || ""} ${order.email || ""} ${order.number || ""}`.toLocaleLowerCase("es");
    return (!query || customer.includes(query)) && (!status || order.status === status);
  }).sort((a, b) => asDate(b.createdAt) - asDate(a.createdAt));
}

function renderOrders() {
  const orders = filteredOrders();
  document.querySelector("#orders-empty").hidden = orders.length > 0;
  document.querySelector("#orders-table").innerHTML = orders.map((order) => {
    const nextStatus = {
      Nuevo: ["Confirmado", "Anulado"],
      Confirmado: ["Preparando", "Anulado"],
      Preparando: ["Entregado", "Anulado"],
      Entregado: [],
      Anulado: ["Confirmado"],
    }[order.status] || [];
    const items = Array.isArray(order.items) ? order.items : [];
    const whatsapp = whatsappLink(order.phone);
    const delivery = [order.region === "retiro" ? "Retiro en Villarrica" : order.region, order.city, order.address]
      .filter(Boolean).join(", ");
    const sale = [order.channel, order.paymentMethod].filter(Boolean).join(" · ");
    const removable = (order.status === "Nuevo" || order.status === "Anulado") && order.stockDeducted !== true;
    const orderId = escapeHtml(order.id);
    return `<tr><td>${escapeHtml(asDate(order.createdAt).toLocaleDateString("es-CL"))}<small>${escapeHtml(order.number || order.id.slice(0, 7))}</small>${sale ? `<small>${escapeHtml(sale)}</small>` : ""}</td><td>${escapeHtml(order.customer)}<small>${escapeHtml(order.phone)}</small>${order.email ? `<small>${escapeHtml(order.email)}</small>` : ""}${delivery ? `<small>${escapeHtml(delivery)}</small>` : ""}</td><td>${items.map((item) => `${escapeHtml(item.name)} × ${numberFormat.format(item.quantity)}`).join("<br>") || "—"}${order.discount ? `<small>Descuento ${money(order.discount)}</small>` : ""}${order.notes ? `<small>${escapeHtml(order.notes)}</small>` : ""}</td><td>${money(order.total)}</td><td><span class="admin-badge">${escapeHtml(order.status)}</span>${order.status === "Anulado" || order.paid === undefined ? "" : `<br><span class="admin-badge ${order.paid ? "is-paid" : "is-warning"}">${order.paid ? "Pagado" : "Por cobrar"}</span>`}</td><td><div class="admin-row-actions">${whatsapp ? `<a href="${whatsapp}" target="_blank" rel="noreferrer">WhatsApp</a>` : ""}${nextStatus.map((status) => `<button type="button" data-order-status="${escapeHtml(status)}" data-order-id="${orderId}">${escapeHtml(status)}</button>`).join("")}${order.status === "Anulado" ? "" : `<button type="button" data-order-paid="${orderId}">${order.paid ? "Quitar pago" : "Marcar pagado"}</button>`}${removable ? `<button type="button" data-order-delete="${orderId}">Eliminar</button>` : ""}</div></td></tr>`;
  }).join("");
  document.querySelectorAll("#orders-table tr").forEach((row, index) => {
    const order = orders[index];
    if (order.status !== "Entregado" || !order.items?.some((item) => item.productId)) return;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Pedir reseña";
    button.dataset.orderReview = order.id;
    row.querySelector(".admin-row-actions").append(button);
  });
}

function customerList() {
  const customers = new Map();
  data.orders.filter(isSale).forEach((order) => {
    const phone = String(order.phone || "").trim();
    const name = String(order.customer || "").trim();
    const key = phone.replace(/\D/g, "").slice(-8) || name.toLocaleLowerCase("es");
    if (!key) return;
    const customer = customers.get(key) || { name, phone, email: "", city: "", orders: 0, total: 0, lastOrder: null };
    customer.orders += 1;
    customer.total += Number(order.total) || 0;
    customer.email ||= order.email || "";
    customer.city ||= order.city || "";
    const created = asDate(order.createdAt);
    if (!customer.lastOrder || created > customer.lastOrder) customer.lastOrder = created;
    customers.set(key, customer);
  });
  return [...customers.values()].sort((a, b) => b.total - a.total);
}

function renderCustomers() {
  const reactivateBefore = Date.now() - 60 * 24 * 60 * 60 * 1000;
  document.querySelector("#customers-table").innerHTML = customerList().map((customer) => {
    const whatsapp = whatsappLink(customer.phone);
    const contact = [customer.email, customer.city].filter(Boolean).join(" · ");
    return `<tr><td><strong>${escapeHtml(customer.name)}</strong>${contact ? `<small>${escapeHtml(contact)}</small>` : ""}</td><td>${whatsapp ? `<a href="${whatsapp}" target="_blank" rel="noreferrer">${escapeHtml(customer.phone)}</a>` : "—"}</td><td>${numberFormat.format(customer.orders)}</td><td>${money(customer.total)}</td><td>${escapeHtml(customer.lastOrder.toLocaleDateString("es-CL"))}${customer.lastOrder.getTime() < reactivateBefore ? ' <span class="admin-badge is-warning">Reactivar</span>' : ""}</td></tr>`;
  }).join("") || '<tr><td colspan="5">Los clientes aparecerán aquí al confirmar los primeros pedidos.</td></tr>';
}

function renderAdminUsers() {
  const tbody = document.querySelector("#admin-users-table");
  if (!tbody || !requireAdminEmail(currentUser?.email)) return;
  const profiles = [{
    email: ownerEmail,
    name: "Propietaria",
    role: "Propietaria",
    protected: true,
  }, ...data.adminUsers
    .filter((profile) => profile.email?.toLowerCase() !== ownerEmail)
    .map((profile) => ({ ...profile, role: "Administradora" }))]
    .sort((a, b) => a.role.localeCompare(b.role, "es") || a.name.localeCompare(b.name, "es"));
  tbody.innerHTML = profiles.map((profile) => `<tr>
    <td><strong>${escapeHtml(profile.name || "Administradora")}</strong></td>
    <td>${escapeHtml(profile.email)}</td>
    <td><span class="admin-badge">${escapeHtml(profile.role)}</span></td>
    <td>${profile.protected
      ? '<span class="admin-protected-profile">Acceso principal</span>'
      : `<button class="admin-text-button" type="button" data-remove-admin="${escapeHtml(profile.email)}">Quitar acceso</button>`}</td>
  </tr>`).join("");
}

document.querySelector("#admin-invite-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!requireAdminEmail(currentUser?.email)) {
    showAdminFeedback("Solo la propietaria puede administrar los perfiles.", true);
    return;
  }
  // Se guarda el formulario antes del await: después event.currentTarget ya no existe.
  const form = event.currentTarget;
  const values = new FormData(form);
  const name = String(values.get("name") || "").trim();
  const email = String(values.get("email") || "").trim().toLowerCase();
  if (!name || !/^[^\s@/]+@[^\s@/]+\.[^\s@/]+$/.test(email)) {
    showAdminFeedback("Ingresa un nombre y un correo válido de Google.", true);
    return;
  }
  if (email === ownerEmail) {
    showAdminFeedback("La cuenta propietaria ya tiene acceso completo.", true);
    return;
  }
  try {
    await setDoc(doc(db, "adminUsers", email), {
      email,
      name,
      role: "admin",
      createdAt: serverTimestamp(),
      createdBy: currentUser.uid,
    });
    form.reset();
    showAdminFeedback(`Perfil de ${name} autorizado. Ya puede entrar con “Continuar con Google”.`);
  } catch (error) {
    console.error("No se pudo autorizar el perfil administrador.", error);
    showAdminFeedback(friendlyError(error), true);
  }
});

document.querySelector("#admin-users-table").addEventListener("click", async (event) => {
  const button = event.target.closest("[data-remove-admin]");
  if (!button || !requireAdminEmail(currentUser?.email)) return;
  const email = button.dataset.removeAdmin;
  if (!window.confirm(`¿Quitar a ${email} el acceso al administrador de Amankay?`)) return;
  try {
    await deleteDoc(doc(db, "adminUsers", email));
    showAdminFeedback(`Se quitó el acceso de ${email}.`);
  } catch (error) {
    console.error("No se pudo quitar el perfil administrador.", error);
    showAdminFeedback(friendlyError(error), true);
  }
});

function renderCatalog() {
  const inventory = new Map(data.inventory.map((item) => [item.id, item]));
  const search = document.querySelector("#product-admin-search").value.trim().toLocaleLowerCase("es");
  document.querySelector("#products-table").innerHTML = [...data.catalog]
    .filter((product) => !search || `${product.name} ${product.category}`.toLocaleLowerCase("es").includes(search))
    .sort((a, b) => a.name.localeCompare(b.name, "es"))
    .map((product) => {
      const cost = inventory.get(product.id)?.costPrice;
      const hasCost = Number.isSafeInteger(cost);
      const margin = hasCost && product.price > 0 ? Math.round((product.price - cost) / product.price * 100) : null;
      return `<tr class="${product.published === false ? "is-unpublished" : ""}">
      <td><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(product.id)} · ${escapeHtml(product.category)}</small></td>
      <td>${money(product.price)}</td><td>${product.wholesaleMinimum ? `${numberFormat.format(product.wholesaleMinimum)} unidades` : "—"}</td><td>${product.wholesalePrice ? money(product.wholesalePrice) : "—"}</td>
      <td>${hasCost ? money(cost) : "Sin registrar"}</td>
      <td>${margin === null ? "—" : `<span class="admin-badge ${margin < 40 ? "is-warning" : ""}">${margin}%</span>`}</td>
      <td class="admin-product-description">${escapeHtml(product.detail)}</td>
      <td><div class="admin-row-actions"><button type="button" data-edit-product="${escapeHtml(product.id)}">Editar</button><button type="button" data-publish-product="${escapeHtml(product.id)}">${product.published === false ? "Publicar" : "Ocultar"}</button></div></td>
    </tr>`;
    }).join("");
}

function renderStockMovements() {
  document.querySelector("#stock-movements-table").innerHTML = [...data.stockMovements]
    .sort((a, b) => asDate(b.createdAt) - asDate(a.createdAt))
    .slice(0, 20)
    .map((movement) => `<tr><td>${escapeHtml(asDate(movement.createdAt).toLocaleDateString("es-CL"))}</td><td>${escapeHtml(movement.productName || currentCatalogProduct(movement.productId)?.name || movement.productId)}</td><td>${Number(movement.quantityChange) > 0 ? "+" : ""}${numberFormat.format(Number(movement.quantityChange) || 0)}</td><td>${escapeHtml(movement.reason || "Ajuste")}</td></tr>`)
    .join("") || '<tr><td colspan="4">Los movimientos de stock aparecerán aquí.</td></tr>';
}

function renderInventory() {
  const stockById = new Map(data.inventory.map((item) => [item.id, item]));
  document.querySelector("#inventory-table").innerHTML = [...data.catalog]
    .filter((product) => product.published !== false)
    .sort((a, b) => a.name.localeCompare(b.name, "es"))
    .map((product) => {
      const item = stockById.get(product.id) || {};
      const quantity = item.quantity !== null && item.quantity !== undefined &&
        Number.isFinite(Number(item.quantity)) ? Number(item.quantity) : null;
      const minimum = Number.isInteger(item.minimum) ? item.minimum : 3;
      const low = quantity !== null && quantity <= minimum;
      return `<tr data-inventory-row="${escapeHtml(product.id)}"><td><strong>${escapeHtml(product.name)}</strong></td><td>${quantity === null ? "Sin registrar" : numberFormat.format(quantity)}</td><td>${numberFormat.format(minimum)}</td><td><span class="admin-badge ${low ? "is-warning" : ""}">${quantity === null ? "Pendiente" : low ? "Reponer" : "Disponible"}</span></td><td><form class="admin-stock-form" data-stock-product="${escapeHtml(product.id)}"><label class="sr-only" for="stock-${escapeHtml(product.id)}">Unidades disponibles</label><input id="stock-${escapeHtml(product.id)}" name="quantity" type="number" min="0" step="1" placeholder="Unidades" required><label class="sr-only" for="minimum-${escapeHtml(product.id)}">Stock mínimo</label><input id="minimum-${escapeHtml(product.id)}" name="minimum" type="number" min="0" step="1" value="${minimum}" aria-label="Mínimo"><button type="submit">Guardar</button></form></td></tr>`;
    }).join("");
}

function renderExpenses() {
  document.querySelector("#expenses-table").innerHTML = [...data.expenses]
    .sort((a, b) => asDate(b.date) - asDate(a.date))
    .map((item) => `<tr><td>${escapeHtml(asDate(item.date).toLocaleDateString("es-CL"))}</td><td><strong>${escapeHtml(item.description)}</strong><small>${escapeHtml(item.supplier || item.notes || "")}</small></td><td>${escapeHtml(item.category)}</td><td>${money(item.amount)}</td><td><button class="admin-text-button" type="button" data-delete-expense="${escapeHtml(item.id)}">Eliminar</button></td></tr>`)
    .join("") || '<tr><td colspan="5">Aún no hay gastos registrados.</td></tr>';
}

function renderReports() {
  const period = document.querySelector("#report-period").value;
  const orders = data.orders.filter((order) => isSale(order) && inPeriod(order.createdAt, period));
  const sales = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const expenses = data.expenses.filter((item) => inPeriod(item.date, period))
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const costOfGoods = orders.reduce((sum, order) => sum + orderCost(order), 0);
  document.querySelector("#report-sales").textContent = money(sales);
  document.querySelector("#report-expenses").textContent = money(expenses);
  document.querySelector("#report-margin").textContent = money(sales - costOfGoods - expenses);
  document.querySelector("#report-orders").textContent = numberFormat.format(orders.length);
}
document.querySelector("#report-period").addEventListener("change", renderReports);
document.querySelector("#product-admin-search").addEventListener("input", renderCatalog);

function refreshOrderProductOptions() {
  const select = document.querySelector("#order-product");
  const selected = select.value;
  select.innerHTML = data.catalog.filter((product) => product.published !== false)
    .map((product) => `<option value="${escapeHtml(product.id)}">${escapeHtml(product.name)} — ${money(product.price)}</option>`)
    .join("");
  if (data.catalog.some((product) => product.id === selected)) select.value = selected;
}

const orderDialog = document.querySelector("#admin-order-dialog");
const orderForm = document.querySelector("#admin-order-form");

const orderQuantity = document.querySelector("#order-quantity");
let orderLines = [];

function lineUnitPrice(product, quantity) {
  return product.wholesaleMinimum > 0 && quantity >= product.wholesaleMinimum ? product.wholesalePrice : product.price;
}

function orderLinesTotal() {
  return orderLines.reduce((sum, line) => {
    const product = currentCatalogProduct(line.productId);
    return sum + (product ? Number(lineUnitPrice(product, line.quantity)) || 0 : 0) * line.quantity;
  }, 0);
}

function renderOrderLines() {
  document.querySelector("#order-lines").innerHTML = orderLines.map((line, index) => {
    const product = currentCatalogProduct(line.productId);
    const unitPrice = product ? Number(lineUnitPrice(product, line.quantity)) || 0 : 0;
    return `<li><span>${escapeHtml(product?.name || line.productId)} × ${numberFormat.format(line.quantity)}</span><span>${money(unitPrice * line.quantity)}</span><button type="button" data-remove-line="${index}" aria-label="Quitar producto">×</button></li>`;
  }).join("") || "<li>Elige un producto y pulsa “Agregar”.</li>";
  const discount = Math.max(0, Number(orderForm.elements.discount.value) || 0);
  document.querySelector("#order-total").textContent = money(Math.max(0, orderLinesTotal() - discount));
}

function addOrderLine() {
  const product = currentCatalogProduct(document.querySelector("#order-product").value);
  const quantity = Number(orderQuantity.value);
  if (!product || !Number.isInteger(quantity) || quantity <= 0) {
    showAdminFeedback("Elige un producto y una cantidad válida.", true);
    return false;
  }
  if (!Number.isFinite(Number(lineUnitPrice(product, quantity)))) {
    showAdminFeedback("Completa el precio del producto antes de registrar el pedido.", true);
    return false;
  }
  const existing = orderLines.find((line) => line.productId === product.id);
  if (existing) existing.quantity += quantity;
  else orderLines.push({ productId: product.id, quantity });
  orderQuantity.value = "1";
  renderOrderLines();
  return true;
}

document.querySelector("#order-add-line").addEventListener("click", addOrderLine);
document.querySelector("#order-lines").addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-line]");
  if (!button) return;
  orderLines.splice(Number(button.dataset.removeLine), 1);
  renderOrderLines();
});
orderForm.elements.discount.addEventListener("input", renderOrderLines);

function openNewOrderDialog() {
  orderForm.reset();
  refreshOrderProductOptions();
  orderLines = [];
  orderQuantity.value = "1";
  renderOrderLines();
  orderDialog.showModal();
}

document.querySelectorAll("#admin-new-order, #admin-new-order-list")
  .forEach((button) => button.addEventListener("click", openNewOrderDialog));
document.querySelectorAll(".admin-dialog-close").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});

orderForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  // Si solo se eligió un producto sin pulsar "Agregar", se toma esa selección.
  if (orderLines.length === 0 && !addOrderLine()) return;
  const values = new FormData(orderForm);
  const subtotal = orderLinesTotal();
  const discount = Number(values.get("discount")) || 0;
  if (!Number.isSafeInteger(discount) || discount < 0 || discount > subtotal) {
    showAdminFeedback("El descuento debe ser un monto entero que no supere el total.", true);
    return;
  }
  const now = new Date();
  const dateCode = dateForInput(now).replace(/-/g, "");
  const order = {
    number: `AM-${dateCode}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    customer: String(values.get("customer")).trim(),
    phone: String(values.get("phone")).trim(),
    channel: String(values.get("channel")),
    paymentMethod: String(values.get("paymentMethod") || ""),
    paid: values.get("paid") === "on",
    items: orderLines.map((line) => {
      const product = currentCatalogProduct(line.productId);
      const cost = data.inventory.find((item) => item.id === line.productId)?.costPrice;
      return {
        productId: line.productId,
        name: product.name,
        quantity: line.quantity,
        unitPrice: Number(lineUnitPrice(product, line.quantity)),
        unitCost: Number.isSafeInteger(cost) ? cost : null,
      };
    }),
    discount,
    total: subtotal - discount,
    status: "Nuevo",
    notes: String(values.get("notes") || "").trim(),
    stockDeducted: false,
    createdAt: serverTimestamp(),
    createdBy: currentUser.uid,
  };
  try {
    await addDoc(collection(db, "orders"), order);
    orderDialog.close();
    showAdminFeedback(`Pedido ${order.number} registrado.`);
  } catch (error) {
    console.error("No se pudo registrar el pedido.", error);
    showAdminFeedback(friendlyError(error), true);
  }
});

async function changeOrderStatus(orderId, status) {
  const orderRef = doc(db, "orders", orderId);
  try {
    await runTransaction(db, async (transaction) => {
      const orderSnapshot = await transaction.get(orderRef);
      if (!orderSnapshot.exists()) throw new Error("No encontramos el pedido seleccionado.");
      const order = orderSnapshot.data();
      const wasDeducted = order.stockDeducted === true;
      const shouldDeduct = status === "Confirmado" && !wasDeducted;
      const shouldRestore = status === "Anulado" && wasDeducted;
      const items = Array.isArray(order.items) ? order.items : [];
      const inventoryReads = [];
      if (shouldDeduct || shouldRestore) {
        for (const item of items) {
          inventoryReads.push({
            item,
            ref: doc(db, "inventory", item.productId),
            movementRef: doc(collection(db, "stockMovements")),
          });
        }
      }
      const snapshots = [];
      for (const entry of inventoryReads) snapshots.push(await transaction.get(entry.ref));
      // Los productos sin existencias registradas no llevan control de stock: no bloquean ni se descuentan.
      const tracked = snapshots.map((snapshot) => Number.isInteger(snapshot.data()?.quantity));
      if (shouldDeduct) {
        snapshots.forEach((snapshot, index) => {
          const entry = inventoryReads[index];
          if (tracked[index] && snapshot.data().quantity < entry.item.quantity) {
            throw new Error(`Stock insuficiente de ${entry.item.name}. Actualiza el inventario antes de confirmar.`);
          }
        });
      }
      const movementIds = [];
      if (shouldDeduct || shouldRestore) {
        inventoryReads.forEach((entry, index) => {
          if (!tracked[index]) return;
          const previousQuantity = Number(snapshots[index].data()?.quantity) || 0;
          const quantityChange = shouldDeduct ? -entry.item.quantity : entry.item.quantity;
          transaction.set(entry.ref, {
            productId: entry.item.productId,
            quantity: previousQuantity + quantityChange,
            minimum: Number(snapshots[index].data()?.minimum) || 3,
            updatedAt: serverTimestamp(),
          }, { merge: true });
          transaction.set(entry.movementRef, {
            productId: entry.item.productId,
            productName: entry.item.name,
            orderId,
            orderNumber: order.number || orderId.slice(0, 7),
            quantityChange,
            reason: shouldDeduct ? "Pedido confirmado" : "Pedido anulado; stock repuesto",
            createdAt: serverTimestamp(),
            createdBy: currentUser.uid,
          });
          movementIds.push(entry.movementRef.id);
        });
      }
      transaction.update(orderRef, {
        status,
        // Los pedidos de la web llegan sin costo: se toma el vigente al confirmar para calcular el margen.
        ...(shouldDeduct ? {
          items: items.map((item, index) => {
            const cost = snapshots[index].data()?.costPrice;
            return item.unitCost == null && Number.isSafeInteger(cost) ? { ...item, unitCost: cost } : item;
          }),
        } : {}),
        stockDeducted: shouldDeduct ? true : shouldRestore ? false : wasDeducted,
        stockMovementIds: movementIds.length ? movementIds : order.stockMovementIds || [],
        updatedAt: serverTimestamp(),
      });
    });
    showAdminFeedback(status === "Confirmado"
      ? "Pedido confirmado; se actualizó el inventario."
      : status === "Anulado" ? "Pedido anulado; el stock se repuso si correspondía." : `Pedido actualizado: ${status}.`);
  } catch (error) {
    console.error("No se pudo cambiar el estado del pedido.", error);
    showAdminFeedback(error.message || friendlyError(error), true);
  }
}

document.querySelector("#orders-table").addEventListener("click", async (event) => {
  const button = event.target.closest("[data-order-status]");
  const paidButton = event.target.closest("[data-order-paid]");
  const deleteButton = event.target.closest("[data-order-delete]");
  const reviewButton = event.target.closest("[data-order-review]");
  if (button) changeOrderStatus(button.dataset.orderId, button.dataset.orderStatus);
  try {
    if (reviewButton) {
      const order = data.orders.find((item) => item.id === reviewButton.dataset.orderReview);
      if (order?.status !== "Entregado") return;
      const products = order.items.filter((item) => item.productId);
      const selection = products.length === 1 ? "1" : window.prompt(`¿Sobre qué producto pedir la reseña?\n${products.map((item, index) => `${index + 1}. ${item.name}`).join("\n")}`);
      if (selection === null) return;
      const product = products[Number(selection) - 1];
      if (!product) { showAdminFeedback("Selecciona un producto de la lista.", true); return; }
      const token = crypto.randomUUID();
      await setDoc(doc(db, "reviewInvites", token), {
        orderId: order.id,
        productId: product.productId,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdAt: serverTimestamp(),
        createdBy: currentUser.uid,
      });
      const link = `${location.origin}${location.pathname}?opinar=${token}`;
      try { await navigator.clipboard.writeText(link); showAdminFeedback("Enlace de reseña copiado. Envíalo a la clienta; vence en 30 días."); }
      catch { window.prompt("Copia el enlace y envíalo a la clienta:", link); }
    } else if (paidButton) {
      const order = data.orders.find((item) => item.id === paidButton.dataset.orderPaid);
      if (!order) return;
      await updateDoc(doc(db, "orders", order.id), { paid: !order.paid, updatedAt: serverTimestamp() });
      showAdminFeedback(order.paid ? "Pago quitado del pedido." : "Pago registrado.");
    } else if (deleteButton && window.confirm("¿Eliminar este pedido? Esta acción no se puede deshacer.")) {
      await deleteDoc(doc(db, "orders", deleteButton.dataset.orderDelete));
      showAdminFeedback("Pedido eliminado.");
    }
  } catch (error) {
    console.error("No se pudo actualizar el pedido.", error);
    showAdminFeedback(friendlyError(error), true);
  }
});
document.querySelector("#admin-export-orders").addEventListener("click", () => {
  downloadCsv(`amankay-pedidos-${dateForInput()}.csv`, [
    ["Fecha", "Folio", "Cliente", "Teléfono", "Correo", "Ciudad", "Canal", "Estado", "Pago", "Forma de pago", "Productos", "Total"],
    ...filteredOrders().map((order) => [
      asDate(order.createdAt).toLocaleDateString("es-CL"), order.number || order.id.slice(0, 7), order.customer,
      order.phone, order.email, order.city, order.channel, order.status,
      order.paid === undefined ? "" : order.paid ? "Pagado" : "Por cobrar", order.paymentMethod,
      (order.items || []).map((item) => `${item.name} x${item.quantity}`).join(", "), Number(order.total) || 0,
    ]),
  ]);
});
document.querySelector("#admin-export-customers").addEventListener("click", () => {
  downloadCsv(`amankay-clientes-${dateForInput()}.csv`, [
    ["Cliente", "Teléfono", "Correo", "Ciudad", "Pedidos", "Total comprado", "Último pedido"],
    ...customerList().map((customer) => [
      customer.name, customer.phone, customer.email, customer.city, customer.orders, customer.total,
      customer.lastOrder.toLocaleDateString("es-CL"),
    ]),
  ]);
});
document.querySelector("#order-search").addEventListener("input", renderOrders);
document.querySelector("#order-status-filter").addEventListener("change", renderOrders);

const productDialog = document.querySelector("#admin-product-dialog");
const productForm = document.querySelector("#admin-product-form");

function openProductForm(product) {
  productForm.reset();
  document.querySelector("#admin-product-dialog-title").textContent = product ? "Editar producto" : "Nuevo producto";
  productForm.elements.id.readOnly = Boolean(product);
  if (product) {
    productForm.elements.id.value = product.id;
    productForm.elements.name.value = product.name;
    productForm.elements.category.value = product.category;
    productForm.elements.format.value = product.format || "";
    productForm.elements.price.value = product.price ?? "";
    productForm.elements.costPrice.value = data.inventory.find((item) => item.id === product.id)?.costPrice ?? "";
    productForm.elements.wholesaleMinimum.value = product.wholesaleMinimum || 0;
    productForm.elements.wholesalePrice.value = product.wholesalePrice || 0;
    productForm.elements.image.value = product.image || "";
    productForm.elements.detail.value = product.detail || "";
  } else {
    productForm.elements.wholesaleMinimum.value = "0";
    productForm.elements.wholesalePrice.value = "0";
    productForm.elements.costPrice.value = "";
  }
  productDialog.showModal();
}

document.querySelector("#admin-add-product").addEventListener("click", () => openProductForm(null));
document.querySelector("#products-table").addEventListener("click", async (event) => {
  const editButton = event.target.closest("[data-edit-product]");
  const publishButton = event.target.closest("[data-publish-product]");
  if (editButton) openProductForm(currentCatalogProduct(editButton.dataset.editProduct));
  if (publishButton) {
    const product = currentCatalogProduct(publishButton.dataset.publishProduct);
    if (!product) return;
    try {
      await updateDoc(doc(db, "catalog", product.id), {
        published: product.published === false,
        updatedAt: serverTimestamp(),
      });
      showAdminFeedback(product.published === false ? "Producto publicado en la tienda." : "Producto oculto de la tienda.");
    } catch (error) {
      console.error("No se pudo cambiar la publicación del producto.", error);
      showAdminFeedback(friendlyError(error), true);
    }
  }
});

productForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const values = new FormData(productForm);
  const id = String(values.get("id")).trim();
  if (!/^[a-z0-9-]{1,48}$/.test(id)) {
    showAdminFeedback("Usa un identificador único con minúsculas, números y guiones.", true);
    return;
  }
  const image = String(values.get("image") || "").trim();
  if (image && /^(?!https?:\/\/)(?:\/|[a-z]+:)/i.test(image)) {
    showAdminFeedback("La foto debe ser una ruta dentro de la web o una dirección HTTPS.", true);
    return;
  }
  const wholesaleMinimum = Number(values.get("wholesaleMinimum")) || 0;
  const wholesalePrice = Number(values.get("wholesalePrice")) || 0;
  const costInput = String(values.get("costPrice") || "").trim();
  const costPrice = costInput ? Number(costInput) : null;
  if ((wholesaleMinimum === 0) !== (wholesalePrice === 0)) {
    showAdminFeedback("Completa tanto el mínimo como el precio mayorista, o deja ambos en cero.", true);
    return;
  }
  const existing = currentCatalogProduct(id);
  const product = {
    id,
    name: String(values.get("name")).trim(),
    category: String(values.get("category")),
    format: String(values.get("format") || "").trim(),
    price: Number(values.get("price")),
    wholesaleMinimum,
    wholesalePrice,
    detail: String(values.get("detail")).trim(),
    image: image || "assets/branding/amankay-social-preview.jpg",
    published: existing?.published !== false,
    updatedAt: serverTimestamp(),
    updatedBy: currentUser.uid,
  };
  if (!Number.isSafeInteger(product.price) || !Number.isSafeInteger(product.wholesalePrice) ||
      (product.wholesaleMinimum && !Number.isSafeInteger(product.wholesaleMinimum)) ||
      (costPrice !== null && (!Number.isSafeInteger(costPrice) || costPrice < 0))) {
    showAdminFeedback("Los precios y las cantidades deben ser números enteros.", true);
    return;
  }
  try {
    const inventoryRef = doc(db, "inventory", id);
    await runTransaction(db, async (transaction) => {
      const inventorySnapshot = await transaction.get(inventoryRef);
      transaction.set(doc(db, "catalog", id), product, { merge: true });
      transaction.set(inventoryRef, {
        productId: id,
        costPrice,
        ...(!inventorySnapshot.exists() ? { quantity: null, minimum: 3 } : {}),
        updatedAt: serverTimestamp(),
        updatedBy: currentUser.uid,
      }, { merge: true });
    });
    productDialog.close();
    showAdminFeedback("Producto guardado y sincronizado con la tienda.");
  } catch (error) {
    console.error("No se pudo guardar el producto.", error);
    showAdminFeedback(friendlyError(error), true);
  }
});

document.querySelector("#inventory-table").addEventListener("submit", async (event) => {
  const form = event.target.closest(".admin-stock-form");
  if (!form) return;
  event.preventDefault();
  const productId = form.dataset.stockProduct;
  const quantity = Number(form.elements.quantity.value);
  const minimum = Number(form.elements.minimum.value);
  if (!Number.isInteger(quantity) || quantity < 0 || !Number.isInteger(minimum) || minimum < 0) {
    showAdminFeedback("Las existencias y el mínimo deben ser números enteros iguales o mayores que cero.", true);
    return;
  }
  try {
    const inventoryRef = doc(db, "inventory", productId);
    const movementRef = doc(collection(db, "stockMovements"));
    await runTransaction(db, async (transaction) => {
      const snapshot = await transaction.get(inventoryRef);
      const previous = snapshot.exists() ? snapshot.data() : {};
      transaction.set(inventoryRef, {
        productId,
        quantity,
        minimum,
        costPrice: previous.costPrice ?? null,
        updatedAt: serverTimestamp(),
        updatedBy: currentUser.uid,
      }, { merge: true });
      transaction.set(movementRef, {
        productId,
        productName: currentCatalogProduct(productId)?.name || productId,
        quantityChange: quantity - (Number(previous.quantity) || 0),
        reason: previous.quantity === undefined || previous.quantity === null ? "Inventario inicial" : "Ajuste manual de inventario",
        createdAt: serverTimestamp(),
        createdBy: currentUser.uid,
      });
    });
    showAdminFeedback("Inventario actualizado.");
  } catch (error) {
    console.error("No se pudo actualizar el inventario.", error);
    showAdminFeedback(friendlyError(error), true);
  }
});

const expenseForm = document.querySelector("#expense-form");
expenseForm.elements.date.value = dateForInput();
expenseForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const values = new FormData(expenseForm);
  const amount = Number(values.get("amount"));
  if (!Number.isSafeInteger(amount) || amount < 1) {
    showAdminFeedback("El gasto debe ser un monto entero mayor que cero.", true);
    return;
  }
  try {
    await addDoc(collection(db, "expenses"), {
      description: String(values.get("description")).trim(),
      category: String(values.get("category")),
      supplier: String(values.get("supplier") || "").trim(),
      amount,
      date: String(values.get("date")),
      notes: String(values.get("notes") || "").trim(),
      createdAt: serverTimestamp(),
      createdBy: currentUser.uid,
    });
    expenseForm.reset();
    expenseForm.elements.date.value = dateForInput();
    showAdminFeedback("Gasto registrado.");
  } catch (error) {
    console.error("No se pudo registrar el gasto.", error);
    showAdminFeedback(friendlyError(error), true);
  }
});

document.querySelector("#expenses-table").addEventListener("click", async (event) => {
  const button = event.target.closest("[data-delete-expense]");
  if (!button || !window.confirm("¿Eliminar este gasto registrado?")) return;
  try {
    await deleteDoc(doc(db, "expenses", button.dataset.deleteExpense));
    showAdminFeedback("Gasto eliminado.");
  } catch (error) {
    console.error("No se pudo eliminar el gasto.", error);
    showAdminFeedback(friendlyError(error), true);
  }
});

const testimonialForm = document.querySelector("#testimonial-form");

function renderTestimonials() {
  const productSelect = testimonialForm.elements.productId;
  if (productSelect.options.length === 1) {
    [...(window.amankayProducts || [])]
      .sort((a, b) => a.name.localeCompare(b.name, "es"))
      .forEach((product) => productSelect.add(new Option(product.name, product.id)));
  }
  const productName = (id) => (window.amankayProducts || []).find((product) => product.id === id)?.name || "General";
  document.querySelector("#testimonials-table").innerHTML = [...data.testimonials]
    .sort((a, b) => asDate(b.createdAt) - asDate(a.createdAt))
    .map((item) => `<tr><td>${escapeHtml(asDate(item.createdAt).toLocaleDateString("es-CL"))}</td><td><strong>${escapeHtml([item.name, item.city].filter(Boolean).join(" · "))}</strong><small>${escapeHtml(item.text)}</small></td><td>${escapeHtml(productName(item.productId))}</td><td>${item.published ? "Publicado" : "Oculto"}</td><td><button class="admin-text-button" type="button" data-toggle-testimonial="${escapeHtml(item.id)}">${item.published ? "Ocultar" : "Publicar"}</button> <button class="admin-text-button" type="button" data-delete-testimonial="${escapeHtml(item.id)}">Eliminar</button></td></tr>`)
    .join("") || '<tr><td colspan="5">Aún no hay testimonios. Agrega el primero para que aparezca la sección en la tienda.</td></tr>';
}

testimonialForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const values = new FormData(testimonialForm);
  const text = String(values.get("text")).trim();
  const name = String(values.get("name")).trim();
  if (!text || !name) {
    showAdminFeedback("El testimonio necesita un nombre y un texto.", true);
    return;
  }
  try {
    await addDoc(collection(db, "testimonials"), {
      name,
      city: String(values.get("city") || "").trim(),
      productId: String(values.get("productId") || ""),
      text,
      published: values.get("published") === "on",
      createdAt: serverTimestamp(),
      createdBy: currentUser.uid,
    });
    testimonialForm.reset();
    showAdminFeedback("Testimonio guardado.");
  } catch (error) {
    console.error("No se pudo guardar el testimonio.", error);
    showAdminFeedback(friendlyError(error), true);
  }
});

document.querySelector("#testimonials-table").addEventListener("click", async (event) => {
  const toggleButton = event.target.closest("[data-toggle-testimonial]");
  const deleteButton = event.target.closest("[data-delete-testimonial]");
  try {
    if (toggleButton) {
      const item = data.testimonials.find((entry) => entry.id === toggleButton.dataset.toggleTestimonial);
      if (!item) return;
      await updateDoc(doc(db, "testimonials", item.id), { published: !item.published, updatedAt: serverTimestamp() });
      showAdminFeedback(item.published ? "Testimonio oculto en la tienda." : "Testimonio publicado en la tienda.");
    } else if (deleteButton && window.confirm("¿Eliminar este testimonio?")) {
      await deleteDoc(doc(db, "testimonials", deleteButton.dataset.deleteTestimonial));
      showAdminFeedback("Testimonio eliminado.");
    }
  } catch (error) {
    console.error("No se pudo actualizar el testimonio.", error);
    showAdminFeedback(friendlyError(error), true);
  }
});

document.querySelector("#admin-export-data").addEventListener("click", () => {
  const exportData = {
    exportedAt: new Date().toISOString(),
    projectId: firebaseConfig.projectId,
    catalog: data.catalog,
    inventory: data.inventory,
    orders: data.orders,
    expenses: data.expenses,
    testimonials: data.testimonials,
  };
  downloadFile(`amankay-respaldo-${dateForInput()}.json`, JSON.stringify(exportData, null, 2), "application/json");
  showAdminFeedback("Respaldo del negocio descargado.");
});

window.addEventListener("beforeunload", clearSubscriptions);
