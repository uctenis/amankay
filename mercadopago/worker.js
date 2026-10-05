// Secrets: MP_ACCESS_TOKEN, MP_WEBHOOK_SECRET, FIREBASE_SERVICE_ACCOUNT_JSON.
const ORIGINS = ["https://amankayorganic.cl", "https://www.amankayorganic.cl", "https://uctenis.github.io", "http://localhost:8000", "http://127.0.0.1:8000"];
const DB = "https://firestore.googleapis.com/v1/projects/amankay-36670/databases/(default)/documents";
const bytes = (s) => new TextEncoder().encode(s);
const b64 = (b) => btoa(String.fromCharCode(...b)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const val = (f) => f?.stringValue ?? f?.integerValue ?? f?.booleanValue ?? null;
const num = (f) => Number(f?.integerValue ?? f?.doubleValue ?? NaN);
function result(body, status = 200, origin = "") {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...(origin ? { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", Vary: "Origin" } : {}) } });
}
async function googleToken(env) {
  const a = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT_JSON);
  const now = Math.floor(Date.now() / 1000);
  const head = b64(bytes(JSON.stringify({ alg: "RS256", typ: "JWT" })));
  const data = b64(bytes(JSON.stringify({ iss: a.client_email, scope: "https://www.googleapis.com/auth/datastore", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 })));
  const pem = a.private_key.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g, "");
  const key = await crypto.subtle.importKey("pkcs8", Uint8Array.from(atob(pem), (c) => c.charCodeAt(0)), { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const sig = b64(new Uint8Array(await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, bytes(`${head}.${data}`))));
  const response = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${head}.${data}.${sig}` }) });
  if (!response.ok) throw new Error(`OAuth ${response.status}`);
  return (await response.json()).access_token;
}
async function database(path, token, options = {}) {
  const response = await fetch(`${DB}/${path}`, { ...options, headers: { Authorization: `Bearer ${token}`, ...(options.body ? { "Content-Type": "application/json" } : {}) } });
  if (!response.ok) throw new Error(`Firestore ${response.status}: ${path}`);
  return response.json();
}
async function catalog(token) {
  const products = new Map();
  let next = "";
  do {
    const page = await database(`catalog?pageSize=300${next ? `&pageToken=${encodeURIComponent(next)}` : ""}`, token);
    for (const doc of page.documents || []) products.set(doc.name.split("/").pop(), doc.fields);
    next = page.nextPageToken || "";
  } while (next);
  return products;
}
async function createPayment(request, env, origin) {
  let input;
  try { input = await request.json(); } catch { return result({ error: "Solicitud inválida." }, 400, origin); }
  const number = String(input?.number || "");
  let returnUrl;
  try { returnUrl = new URL(input.returnUrl); } catch { returnUrl = null; }
  if (!/^AM-\d{8}-[A-Z0-9]{4}$/.test(number) || returnUrl?.origin !== origin) return result({ error: "Pedido inválido." }, 400, origin);
  try {
    const token = await googleToken(env);
    const order = await database(`orders/${number}`, token);
    if (val(order.fields?.number) !== number || val(order.fields?.channel) !== "Web" || val(order.fields?.status) === "Anulado" || val(order.fields?.paid) !== false) return result({ error: "El pedido no está disponible para pagar." }, 409, origin);
    const items = (order.fields?.items?.arrayValue?.values || []).map((v) => ({ id: val(v.mapValue?.fields?.productId), quantity: num(v.mapValue?.fields?.quantity), unitPrice: num(v.mapValue?.fields?.unitPrice) }));
    if (!items.length || items.length > 80 || items.some((i) => !/^[a-z0-9-]{1,48}$/.test(i.id) || !Number.isInteger(i.quantity) || i.quantity < 1 || i.quantity > 999)) return result({ error: "Productos inválidos." }, 409, origin);
    const products = await catalog(token);
    const checkoutItems = items.map((i) => {
      const p = products.get(i.id);
      const price = num(p?.price), minimum = num(p?.wholesaleMinimum), wholesale = num(p?.wholesalePrice);
      const unit = minimum > 0 && i.quantity >= minimum && wholesale > 0 ? wholesale : price;
      if (!p || val(p.published) === false || (val(p.saleMode) ?? "online") !== "online" ||!Number.isInteger(unit) || unit <= 0 || unit !== i.unitPrice) throw new Error("Precio o disponibilidad cambió.");
      return { id: i.id, title: val(p.name) || "Producto Amankay", quantity: i.quantity, unit_price: unit, currency_id: "CLP" };
    });
    if (checkoutItems.reduce((sum, i) => sum + i.quantity * i.unit_price, 0) !== num(order.fields?.total)) return result({ error: "El total no coincide." }, 409, origin);
    const back = (s) => `${returnUrl.origin}${returnUrl.pathname}?pago=${s}&folio=${number}`;
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", { method: "POST", headers: { Authorization: `Bearer ${env.MP_ACCESS_TOKEN}`, "Content-Type": "application/json", "X-Idempotency-Key": number }, body: JSON.stringify({ items: checkoutItems, external_reference: number, payer: { name: String(val(order.fields?.customer) || "").slice(0, 100), email: String(val(order.fields?.email) || "").slice(0, 254) }, back_urls: { success: back("aprobado"), pending: back("pendiente"), failure: back("rechazado") }, auto_return: "approved", statement_descriptor: "AMANKAY" }) });
    const preference = await response.json();
    if (!response.ok || !preference.init_point) throw new Error(`Mercado Pago ${response.status}`);
    return result({ url: preference.init_point }, 200, origin);
  } catch (error) {
    console.error("No se pudo crear el cobro.", error);
    return result({ error: "No se pudo abrir el pago. Contacta a Amankay." }, 502, origin);
  }
}
async function validSignature(request, secret, id) {
  const parts = Object.fromEntries((request.headers.get("x-signature") || "").split(",").map((p) => p.trim().split("=")));
  const requestId = request.headers.get("x-request-id") || "";
  const signedTime = Number(parts.ts);
  const seconds = signedTime > 1e11 ? signedTime / 1000 : signedTime;
  if (!parts.ts || !parts.v1 || !requestId || !Number.isFinite(seconds) || Math.abs(Date.now() / 1000 - seconds) > 600) return false;
  const manifest = `id:${id.toLowerCase()};request-id:${requestId};ts:${parts.ts};`;
  const key = await crypto.subtle.importKey("raw", bytes(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const expected = [...new Uint8Array(await crypto.subtle.sign("HMAC", key, bytes(manifest)))].map((b) => b.toString(16).padStart(2, "0")).join("");
  const received = parts.v1.toLowerCase();
  return received.length === expected.length && [...received].reduce((n, c, i) => n | (c.charCodeAt(0) ^ expected.charCodeAt(i)), 0) === 0;
}
async function webhook(request, env) {
  const url = new URL(request.url);
  const id = url.searchParams.get("data.id") || url.searchParams.get("id") || "";
  if (!/^\d+$/.test(id) || !env.MP_WEBHOOK_SECRET || !(await validSignature(request, env.MP_WEBHOOK_SECRET, id))) return result({ error: "Notificación no autorizada." }, 401);
  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, { headers: { Authorization: `Bearer ${env.MP_ACCESS_TOKEN}` } });
    if (!response.ok) throw new Error(`Consulta de pago ${response.status}`);
    const payment = await response.json();
    if (payment.status !== "approved") return result({ ok: true });
    const number = String(payment.external_reference || "");
    if (!/^AM-\d{8}-[A-Z0-9]{4}$/.test(number)) return result({ error: "Referencia inválida." }, 409);
    const token = await googleToken(env);
    const order = await database(`orders/${number}`, token);
    if (val(order.fields?.number) !== number || val(order.fields?.channel) !== "Web" || val(order.fields?.status) === "Anulado" || num(order.fields?.total) !== Number(payment.transaction_amount) || payment.currency_id !== "CLP") return result({ error: "El pago no coincide con el pedido." }, 409);
    if (val(order.fields?.paid) === true) return result({ ok: true });
    const mask = "updateMask.fieldPaths=paid&updateMask.fieldPaths=paymentMethod&updateMask.fieldPaths=paymentId&updateMask.fieldPaths=paidAt";
    await database(`orders/${number}?${mask}`, token, { method: "PATCH", body: JSON.stringify({ fields: { paid: { booleanValue: true }, paymentMethod: { stringValue: "Mercado Pago" }, paymentId: { stringValue: String(payment.id) }, paidAt: { timestampValue: new Date().toISOString() } } }) });
    return result({ ok: true });
  } catch (error) {
    console.error("No se pudo confirmar el pago.", error);
    return result({ error: "Se reintentará la notificación." }, 503);
  }
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/webhook" && request.method === "POST") return webhook(request, env);
    const origin = request.headers.get("Origin") || "";
    if (!ORIGINS.includes(origin)) return result({ error: "Origen no permitido." }, 403);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
    if (url.pathname !== "/" || request.method !== "POST") return result({ error: "Método no permitido." }, 405, origin);
    return createPayment(request, env, origin);
  },
};
