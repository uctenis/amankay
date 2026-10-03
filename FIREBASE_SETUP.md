# Configuración de Firebase

El administrador utiliza Firebase Authentication con Google y Cloud Firestore. La cuenta propietaria inicial es `dsilvaroco@gmail.com`; solo ella puede invitar y quitar otros perfiles administradores.

1. En Firebase Console, abre **Authentication → Proveedores de acceso** y habilita **Google**. Elige un correo de soporte y guarda.
2. En **Firestore Database**, crea la base de datos.
3. En **Firestore → Reglas**, pega el contenido de `firestore.rules` y publícalo. Las reglas permiten leer el catálogo público y limitan pedidos, inventario, gastos y perfiles a la propietaria y administradores invitados autorizados.
4. En **Authentication → Configuración → Dominios autorizados**, añade `localhost` y `127.0.0.1` para probar en el equipo local. Añade el dominio de producción antes de publicar la tienda.
5. Abre la tienda local y selecciona **Administración → Continuar con Google**. Elige `dsilvaroco@gmail.com` y autoriza el inicio de sesión. La primera conexión prepara los documentos de catálogo e inventario que aún no existan; las cantidades de stock se dejan como «Sin registrar».
6. Para conceder acceso a otra persona, entra en **Perfiles administradores**, escribe su nombre y el correo de la cuenta Google, y pulsa **Invitar administrador**. La persona invitada podrá entrar desde el mismo botón de Google. La propietaria puede quitar el acceso desde esa lista.
7. Antes de confirmar pedidos, registra las existencias reales en **Inventario** y configura los costos unitarios en las fichas de productos.

La configuración del SDK web, incluido `apiKey`, identifica la aplicación y es visible en el navegador; no es una clave de cuenta de servicio. Nunca publiques contraseñas, claves privadas o archivos JSON de cuentas de servicio en el sitio.

Restringe la clave web por referente HTTP en Google Cloud Console cuando hayas decidido el dominio definitivo. No es necesario habilitar Firebase Analytics, Hosting ni Storage para probar el administrador.

Los pedidos iniciados en la tienda siguen coordinándose por WhatsApp. Registra la venta en el panel cuando el cliente confirme. Al cambiar un pedido a «Confirmado», el stock de sus productos se descuenta en una transacción; al anular un pedido ya descontado, se repone.
