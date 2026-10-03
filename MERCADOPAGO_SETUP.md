# Activar el pago con Mercado Pago

La tienda ya tiene el recorrido completo: registra el pedido, muestra el botón **Pagar con Mercado Pago** y recibe a la clienta cuando vuelve del pago. Solo falta conectar tu cuenta. Mientras no lo hagas, la tienda registra el pedido y avisa que la contactarás para coordinar el pago.

Mercado Pago exige que el cobro se cree desde un servidor, porque usa una clave secreta que no puede estar en la página. Ese servidor es un Cloudflare Worker gratuito, y su código ya está en [mercadopago/worker.js](mercadopago/worker.js).

## 1. Obtener la clave de Mercado Pago

1. Entra a <https://www.mercadopago.cl/developers/panel/app> con la cuenta de Mercado Pago de Amankay.
2. Pulsa **Crear aplicación**. Nombre: `Amankay tienda`. Tipo de pago: **Pagos online**. Producto: **Checkout Pro**.
3. Dentro de la aplicación, abre **Credenciales de producción** y copia el **Access Token** (empieza con `APP_USR-`).

El Access Token es como la clave del banco: no lo pegues en el código, en un chat ni en un correo. Solo va en el paso 2.

## 2. Crear el Worker en Cloudflare

1. En <https://dash.cloudflare.com/> ve a **Compute (Workers) → Workers & Pages → Crear → Worker**.
2. Nombre: `amankay-pagos`. Pulsa **Implementar**.
3. Pulsa **Editar código**, borra el ejemplo, pega todo el contenido de `mercadopago/worker.js` y pulsa **Implementar**.
4. Ve a **Configuración → Variables y secretos → Agregar**:
   - Tipo: **Secreto**
   - Nombre: `MP_ACCESS_TOKEN`
   - Valor: el Access Token del paso 1
5. Copia la dirección del Worker. Tiene esta forma: `https://amankay-pagos.TU-CUENTA.workers.dev`.

## 3. Conectar la tienda

En [firebase-config.js](firebase-config.js), pega la dirección del Worker:

```js
export const paymentEndpoint = "https://amankay-pagos.TU-CUENTA.workers.dev";
```

Publica el cambio. Desde ese momento el botón del checkout dice **Continuar al pago** y aparece **Pagar con Mercado Pago** al registrar el pedido.

## 4. Probar antes de anunciarlo

Haz una compra real de un producto barato con otra cuenta de Mercado Pago (no se puede pagar a uno mismo) y revisa que:

- llegas a Mercado Pago con el producto y el monto correctos;
- al pagar vuelves a la tienda y ves **¡Pago recibido!** con el folio;
- Mercado Pago te avisa del pago (correo y aplicación) con el folio como referencia;
- el pedido está en el panel, en **Pedidos**.

Después puedes devolver el dinero desde Mercado Pago.

## Cómo funciona el día a día

1. La clienta paga. Mercado Pago te avisa con el **folio** del pedido (por ejemplo `AM-20261003-JKOO`).
2. En el panel, busca ese folio en **Pedidos**, pulsa **Marcar pagado** y luego **Confirmado**.

El pedido no se marca como pagado automáticamente: lo marcas tú al recibir el aviso. El envío no se cobra en línea; sigue siendo por pagar al recibir.

## Seguridad

- Los precios se leen del catálogo publicado, no de lo que envía el navegador: nadie puede pagar menos manipulando la página.
- El Worker solo acepta pedidos desde `amankayorganic.cl`, `uctenis.github.io` y `localhost:8000`. Si cambias de dominio, actualiza la lista `ALLOWED_ORIGINS` al inicio de `worker.js`.
