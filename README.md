## Mercado Libre  Challenge - Valentin Menvielle Candia

![Meli Logo](client/public/favicon_logo.png) 



## Herramientas utilizadas
- <b>Frontend:</b> React, Axios, Sass, Vitest, React testing library
- <b>Backend:</b> Node, Express, Redis, Axios

## Pasos para iniciar proyecto localmente


#### Clonar proyecto:
```
git clone https://github.com/MenvielleValen/mercadolibre-challenge.git
```

#### Configurar archivos .env:
- Crear archivo ```.env``` en el root del directorio [`client`](./client) (el respositorio cuenta con uno de ejemplo .env).

```
VITE_APP_API_URL=http://localhost:8000/api
```
#### Configurar archivo .env:
- Crear archivo ```.env``` en el root del directorio [`api`](./api) (el respositorio cuenta con uno de ejemplo .env.example).
```
PORT=8000
API_MELI_BASE_URL=https://api.mercadolibre.com

# Si su valor es true no consulta respuestas en caché, si es false utiliza redis para el caché (opcional a fines de prueba)
DISABLED_REDIS_CACHE=true

# Conexion a redis para el caché (para probar con redis colocar false en DISABLED_REDIS_CACHE)
REDIS_CONNECTION_HOST=
REDIS_CONNECTION_PORT=
REDIS_CONNECTION_PASSWORD=
```
##
### Iniciar Frontend
```
//Moverse al directiorio del frontend
cd client

//Instalar dependencias
npm install

//Ejecutar servidor de desarrollo
npm run dev
```
  
### Iniciar Backend
```
//Moverse al directiorio del backend
cd api

//Instalar dependencias
npm install

//Ejecutar backend
npm start
```
##
### Ejecutar tests en frontend
```
//Moverse al directiorio del backend
cd client

//Ejectuar tests
npm run test

```
## Capturas de pantalla

Para una vista previa de la aplicación y sus características, se agregaron capturas de pantalla en el repositorio: [`_screenshots`](./_screenshots).

## Solución

### Features:
- Buscador de productos.
- Página de detalle de producto.
- Responsive.
- SEO con Helmet.
- Page 404.
- Registro de logs en archivo mediante un sistema de logging implementado en el backend.
- Caché (Redis).

### Detalle:

<b>Descripción técnica:</b> Se ha hecho énfasis en la escalabilidad y rendimiento tanto en el backend como en el frontend. Aunque la prueba inicialmente requería devolver solo unos pocos productos, se diseñó la solución teniendo en cuenta una mayor cantidad de datos.

En el backend, se implementó un sistema de caché con Redis para mejorar la velocidad de respuesta y minimizar las consultas a la API de MercadoLibre. El tiempo de expiración del caché se estableció en 60 minutos como una medida de prueba, asegurando así una obtención más rápida de los datos si se realizan las mismas consultas. Se han configurado timeouts tanto en el backend como en el frontend para garantizar una gestión eficiente de los recursos y prevenir tiempos de espera prolongados.

Tambíen, se ha incorporado un sistema de registro de errores que captura y registra en ```api/src/logs/app.log``` cualquier problema que ocurra en el servidor, permitiendo un seguimiento detallado.

Por otro lado, en el cliente se han creado componentes reutilizables y hooks personalizados para mejorar la modularidad y el mantenimiento del código. Se ha integrado la librería Helmet para optimizar el SEO. Además, se ha trabajado en asegurar la responsividad del sitio.

<small><b>Nota:</b> Para facilitar la prueba, si desea no tener que configurar Redis para el caché, puede modificar en ```.env``` del backend la variable DISABLED_REDIS_CACHE=true.</small>

#### Rutas frontend:
- <b>/</b> ---> Página de inicio.
- <b>/items?search={query}</b> ---> Búsqueda de productos.
- <b>/items/:id</b> ---> Detalle de producto.

#### Rutas backend:
- <b>/</b> ---> Página inicio.
- <b>/doc</b> ---> Documentación de api.
- <b>/api/items?q={query}</b> ---> Devuelve array de productos (limit 4).
- <b>/api/items/:ids</b> ---> Devuelve producto por id.

<b>(*) Para probar la api con un cliente REST como por ejemplo postman, es necesario incluir el encabezado author.</b>
```
curl --location 'http://localhost:8000/api/items?q=ihpone' \
--header 'author: {"name":"Valentin","lastname":"Menvielle Candia"}'
```

#

<b>Descripción funcional:</b> Permite a los usuarios realizar búsquedas de productos. Cuando realizan una búsqueda, se les presentan cuatro productos relevantes. Al hacer clic en uno de ellos, son redirigidos a la vista detallada del producto seleccionado.

<small><b>Nota:</b> La respuesta del endpoint ```api.mercadolibre.com/items/:id``` no incluye el campo ```sold_quantity```. Según la <a href="https://developers.mercadolibre.com.ar/en_us/list-products" title="Documentación Mercado Libre Api en_us">Documentación</a> necesito un token de propietario. Sin embargo, para cumplir con los requisitos del ejercicio, se ha agregado este campo en la respuesta.</small>
