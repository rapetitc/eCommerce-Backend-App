import express from "express"
import ProductManager from "./ProductManager.js"

const app = express()
const PORT = 9900

const prod = new ProductManager

app.get('/', (req, res) => {
  res.send("Bienvenidos a mi proyecto, Desafio 3 de Coderhouse")
})

app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit)

  const result = limit ? prod.getProducts().slice(0, limit) : prod.getProducts()

  let div = ""
  result.forEach((item) => { div += `ID: ${item.id} | Nombre: ${item.title}<br>` })

  const send = result.length > 0 ? `Se encontraron los siguientes productos: <br> <br> ${div}` : `No se han encontrado productos en la base de datos`
  res.send(send)
})

app.get('/product/:pid', (req, res) => {
  const id = parseInt(req.params.pid)
  const result = prod.getProductById(id)

  const send = result ? `Se ha encontrado el producto "${result.title}" asociado con el ID: ${result.id}` : `No se pudo encontrar un producto`
  res.send(send)
})

app.listen(PORT, () => {
  const msg = `  Servidor encendido y escuchando en el puerto: ${PORT}.
  Puedes navegar hacia los siguientes links y realizar tus pruebas:

    http://localhost:${PORT}
    http://localhost:${PORT}/products
    http://localhost:${PORT}/products?limit=5
    http://localhost:${PORT}/product/1`
  console.log(msg);
})