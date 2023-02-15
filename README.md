# eCommerce BackEnd Project.

## Bienvenidos a mi 5to Desafio de [Coderhouse](http://www.coderhouse.com) en el curso de BackEnd

### Uso

1. Una vez descargado el codigo, instala las dependencias requeridas para el projecto con **npm install**.
2. Luego de ello, solo ejecutas **npm run dev** para dar inicio a la ejecucion del programa.

### Sitio Web

- http://localhost:8080/
  - Pagina principal manejada por Handlebars donde se muestran todos los productos disponibles.
- http://localhost:8080/realtimeproducts
  - Segunda pagina manejada por Handlebars y Sockets. Este es capaz de manejar la informacion en tiempo real.

### API REST

Los siguientes enlaces corresponde a mi REST API donde podras hacer consultas a cada producto y carrito con un especifico metodo:

- http://localhost:8080/api/product
  - **[GET]** Ver detalles de todos los productos almacenados.
  - **[POST]** Agregar un producto a la base de datos mediante JSON. Puedes conseguir un **_Template_** al final.
- http://localhost:8080/api/products/[product id]
  - **[GET]** Obtener detalles de un producto en especifico.
  - **[PUT]** Actualizar detalles de un producto en especifico.
  - **[DELETE]** Eliminar detalles de un producto en especifico.
- http://localhost:8080/api/carts
  - **[POST]** Para crear un nuevo carrito.
- http://localhost:8080/api/carts/[cart id]
  - **[GET]** Para ver los productos agregados al carrito.
- http://localhost:8080/api/carts/[cart id]/product/[product id]
  - **[POST]** Para agregar un producto al carrito.

## JSON Template

{
"title": "iPhone 14",
"description": "Telefono inteligente de gama alta",
"code": "as3aw7as3aw5",
"price": 1100,
"stock": 30,
"category": "Celulares",
"thumbnails": [
"url1"
]
}

**_Nota: Si no agregas el campo de "code" o si lo agregas y este esta vacio, este generara un codigo automaticamente por ti en el servidor._**
