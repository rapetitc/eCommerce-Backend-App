import path from 'path'
import { fileURLToPath } from 'url';
import express from 'express'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename)

import ProductManager from './controller/ProductManager.js'
const prodManager = new ProductManager

import viewsRouter from './routes/viewsRouter.js'
import cartRouter from './routes/cartRouter.js'
import prodsRouter from './routes/prodsRouter.js'

//Server Configuration
const PORT = process.env.PORT || 8080
const app = express()
const appServer = app.listen(PORT, () => {
  console.log(`\n\tServidor encendido y escuchando en el puerto ${PORT}.\n\tLee el archivo README.md para realizar las pruebas.`);
})
const socket = new Server(appServer)

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//View Engine Settings
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

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
app.use('/static', express.static('./public')) //Static
app.use('/', viewsRouter) //Views
app.use('/api/carts', cartRouter) //API
app.use('/api/products', prodsRouter) //API