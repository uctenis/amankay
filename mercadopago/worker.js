// Cloudflare Worker de Amankay: crea el enlace de pago de Mercado Pago para un pedido de la tienda.
// El Access Token de Mercado Pago vive aquí como secreto (MP_ACCESS_TOKEN) y nunca llega al navegador.
// Los precios no se aceptan del navegador: se leen del catálogo publicado en Firestore.

const ALLOWED_ORIGINS = [
  "https://amankayorganic.cl",
  "https://www.amankayorganic.cl",
  "https://uctenis.github.io",
  "http://localhost:8000",
];
const CATALOG_URL =
  "https://firestore.googleapis.com/v1/projects/amankay-36670/databases/(default)/documents/catalog?pageSize=300";

function reply(body, status, origin) {
  return new Response(body === null ? null : JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    },
  });
}

function numberField(field) {
  return Number(field?.integerValue ?? field?.doubleValue ?? NaN);
}

async function loadCatalog() {
  const response = await fetch(CATALOG_URL);
  if (!response.ok) throw new Error("No se pudo leer el catálogo.");
  const { documents = [] } = await response.json();
  return new Map(documents.map((document) => [document.name.split("/").pop(), {
    name: document.fields?.name?.stringValue || "Producto Amankay",
    price: numberField(document.fields?.price),
    wholesaleMinimum: numberField(document.fields?.wholesaleMinimum) || 0,
    wholesalePrice: numberField(document.fields?.wholesalePrice) || 0,
    published: document.fields?.published?.booleanValue !== false,
  }]));
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (!ALLOWED_ORIGINS.includes(origin)) return reply({ error: "Origen no permitido." }, 403, "null");
    if (request.method === "OPTIONS") return reply(null, 204, origin);
    if (request.method !== "POST") return reply({ error: "Método no permitido." }, 405, origin);

    let order;
    try {
      order = await request.json();
    } catch {
      return reply({ error: "Solicitud inválida." }, 400, origin);
    }
    const number = String(order?.number || "");
    const items = Array.isArray(order?.items) ? order.items : [];
    let returnUrl;
    try {
      returnUrl = new URL(order.returnUrl);
    } catch {
      returnUrl = null;
    }
    const validItems = items.length > 0 && items.length <= 80 && items.every((item) =>
      /^[a-z0-9-]{1,48}$/.test(String(item?.id)) && Number.isInteger(item?.quantity) && item.quantity > 0 && item.quantity <= 999);
    if (!/^AM-\d{8}-[A-Z0-9]{4}$/.test(number) || !validItems || returnUrl?.origin !== origin) {
      return reply({ error: "Pedido inválido." }, 400, origin);
    }

    try {
      const catalog = await loadCatalog();
      const preferenceItems = items.map(({ id, quantity }) => {
        const product = catalog.get(id);
        if (!product || !product.published || !Number.isInteger(product.price) || product.price <= 0) {
          throw new Error(`Producto no disponible: ${id}`);
        }
        const wholesale = product.wholesaleMinimum > 0 && quantity >= product.wholesaleMinimum && product.wholesalePrice > 0;
        return {
          id,
          title: product.name,
          quantity,
          unit_price: wholesale ? product.wholesalePrice : product.price,
          currency_id: "CLP",
        };
      });
      const back = (status) => `${returnUrl.origin}${returnUrl.pathname}?pago=${status}&folio=${number}`;
      const payment = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.MP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
          "X-Idempotency-Key": number,
        },
        body: JSON.stringify({
          items: preferenceItems,
          // El folio aparece en el aviso de pago de Mercado Pago: con él se ubica el pedido en el panel.
          external_reference: number,
          payer: {
            name: String(order.payer?.name || "").slice(0, 100),
            email: String(order.payer?.email || "").slice(0, 254),
          },
          back_urls: { success: back("aprobado"), pending: back("pendiente"), failure: back("rechazado") },
          auto_return: "approved",
          statement_descriptor: "AMANKAY",
        }),
      });
      const preference = await payment.json();
      if (!payment.ok || !preference.init_point) {
        console.error("Mercado Pago rechazó la preferencia.", payment.status, JSON.stringify(preference));
        return reply({ error: "Mercado Pago no pudo crear el pago." }, 502, origin);
      }
      return reply({ url: preference.init_point }, 200, origin);
    } catch (error) {
      console.error("No se pudo crear el pago.", error);
      return reply({ error: "No se pudo crear el pago." }, 500, origin);
    }
  },
};
