# Steel-server

Proyecto desarrollado como prueba técnica para la empresa `Steel software`. Consta de un servidor web creado bajo `Node.js` y una interfaz construida en `Vue.js`.

## Uso

Para hacer uso del servidor, primero debe tener instalado [`arangodb`](https://arangodb.com) una base de datos `NO-SQL` basada en colecciones muy similar a `mongodb`. Luego de esto, se debe clonar el repositorio, instalar las dependencias y crear las variables de entorno.

### Instalar dependencias

La instalación se realiza teniendo una versión de `Node.js` instalada en la maquina y haciendo uso del siguiente comando:

```bash
npm install
```

Luego de eso se puede proceder a configurar las variables de entorno

### Variables de entorno

Estas configuraciones se realizan mediante el uso de variables de entorno, que se establecen en un archivo `.env` dentro de la raiz del proyecto, con el siguiente contenido:

```env
ARANGO_URL = http://localhost:8529
ARANGO_DATABASE = my_database # Se creará automaticamente si no lo está previamente
ARANGO_USER = root
ARANGO_PASSWORD = my_password # La contraseña se establece cuando se instala arangodb
```

## Desarrollo

Para inicializar el servidor en modo de desarrollo una vez esté las dependencias instaladas y las variables de entorno configuradas, se ejecuta el siguiente comando: `npm run dev` que dará inicio a un servidor de desarrollo y permitirá usar la API o junto con el servidor web, todo el sistema.