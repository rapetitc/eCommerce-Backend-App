const path = require('path')
const express = require('express')
const io = require('socket.io')
const { engine } = require('express-handlebars')

const ProductManager = require('./controller/ProductManager.js')
const prodManager = new ProductManager

const viewsRouter = require('./routes/viewsRouter.js')
const cartRouter = require('./routes/cartRouter.js')
const prodsRouter = require('./routes/prodsRouter.js')

//Configuration
const PORT = 8080

//Server
const app = express()
const server = app.listen(PORT, () => {
  console.log(`\n\tServidor encendido y escuchando en el puerto ${PORT}.\n\tLee el archivo README.md para realizar las pruebas.`);
})
const socket = io(server)

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//View Engine Settings
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname + '/views'));

//Socket Connections
socket.on('connection', (e) => {
  e.on('getProListUpdated', async () => {
    const prods = await prodManager.getProducts()
    e.emit('proListUpdated', JSON.stringify(prods))
  })
  e.on('addProd', async (data) => {
    try {
      await prodManager.addProduct(JSON.parse(data))
      const prods = await prodManager.getProducts()
      e.emit('proListUpdated', JSON.stringify(prods))
      e.emit('addProdRes', JSON.stringify({ isOk: true, msg: `Producto agregado satisfactoriamente.` }))
    } catch (error) {
      e.emit('addProdFRes', JSON.stringify({ isOk: false, msg: `Hubo un error al agregar un producto.`, valid: [] }))
    }
  })
  e.on('rmProd', async (id) => {
    try {
      await prodManager.deleteProduct(id)
      const prods = await prodManager.getProducts()
      e.emit('proListUpdated', JSON.stringify(prods))
      e.emit('rmProdError', JSON.stringify({ isOk: true, msg: `Producto eliminado satisfactoriamente.` }))
    } catch (error) {
      e.emit('rmProdError', JSON.stringify({ isOk: false, msg: `Hubo un error al agregar un producto.` }))
    }
  })
  return e
})

//Routes
app.use('/static', express.static(path.join(__dirname + '/public'))) //Static
app.use('/', viewsRouter) //Views
app.use('/api/carts', cartRouter) //API
app.use('/api/products', prodsRouter) //API