import express from "express"

import cartRouter from "./routes/cartRouter.js"
import prodsRouter from "./routes/prodsRouter.js"

//Configuration
const app = express()
const PORT = 8080

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Static
app.use(express.static('public'));

//Routes
app.use('/api/carts', cartRouter)
app.use('/api/products', prodsRouter)

//Server
app.listen(PORT, () => {
  console.log(`Servidor encendido. Visita http://localhost:${PORT} para realizar tus pruebas de manera mas facil.`);
})