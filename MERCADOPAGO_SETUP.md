# Activar pagos en línea de Amankay

La tienda sigue registrando pedidos sin cobrar mientras `paymentEndpoint` esté vacío. **No actives el endpoint hasta terminar y probar todos los pasos.** El regreso del comprador desde Mercado Pago solo muestra que se está verificando el pago; el webhook es quien lo confirma en Firestore.

## 1. Cuenta e integración

Usa la cuenta de Mercado Pago de la empresa. Crea una integración **Checkout Pro** y guarda el Access Token de producción como secreto `MP_ACCESS_TOKEN` del Cloudflare Worker. No guardes credenciales en el repositorio, en `firebase-config.js` ni en el navegador.

## 2. Acceso del Worker a Firestore

En Google Cloud crea una **cuenta de servicio dedicada** para el Worker con acceso mínimo a Firestore (lectura de catálogo y pedidos; actualización del estado de pago de pedidos). Genera una clave JSON y guárdala completa como secreto `FIREBASE_SERVICE_ACCOUNT_JSON` del Worker. No uses la clave de una cuenta de servicio con permisos de propietario del proyecto. Restringe quién puede administrar el Worker y rota la clave si se expone.

El Worker busca el documento `orders/{folio}`. La tienda ahora guarda los pedidos web con ese ID. Los pedidos web antiguos, guardados con ID aleatorio, deben cobrarse por el flujo manual.

## 3. Webhook

Configura en Mercado Pago el evento **Pagos** hacia `https://TU-WORKER.workers.dev/webhook`. Guarda la clave secreta de la firma como secreto `MP_WEBHOOK_SECRET` del Worker. El Worker valida la firma, consulta el pago en la API de Mercado Pago y compara folio, moneda y monto con el pedido antes de marcarlo `paid: true`. Configura y prueba la URL de pruebas por separado de la de producción.

## 4. Conectar la tienda

Publica el Worker y define en `firebase-config.js`:

```js
export const paymentEndpoint = "https://TU-WORKER.workers.dev";
```

El Worker acepta los dominios de producción y el servidor local en puerto 8000. Si cambia el dominio, actualiza `ORIGINS` en `mercadopago/worker.js`.

## 5. Comprobación antes de producción

Prueba al menos: pago aprobado, pendiente, rechazado, notificación repetida, folio inexistente, monto alterado y producto cuyo precio cambió tras registrar el pedido. Comprueba en el panel que **solo el webhook de un pago aprobado** cambie `paid` a `true`. El envío se coordina y cobra por separado, tal como se informa en el checkout.

## Boleta

Confirma con el contador cómo documentar las ventas cobradas por Mercado Pago y las transferencias, y cómo se reflejan en el Registro de Compras y Ventas del SII. La integración de pagos no emite por sí misma una boleta desde Amankay.
