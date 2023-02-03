import { Router } from "express";
import CartManager from "../controller/CartManager.js";

const cartRouter = Router()
const cartManager = new CartManager

cartRouter.route('/')
  .post(async (req, res) => {
    try {
      await cartManager.createCart()
      res.send('Carro creado satisfactoriamente')
    } catch (error) {
      res.send('Ha ocurrido un error, proceso de creacion de carro ha sido cancelada.' + error)
    }
  })

cartRouter.route('/:cid')
  .get(async (req, res) => {
    const cart = await cartManager.getCartByID(parseInt(req.params.cid))
    res.send(cart.products ?? [])
  })

cartRouter.route('/:cid/product/:pid')
  .post(async (req, res) => {
    const params = req.params
    try {
      await cartManager.addItemToCart(parseInt(params.cid), parseInt(params.pid), 1)
      res.send('Producto agregado satisfactoriamente')
    } catch (error) {
      res.send('Ha ocurrido un error, proceso de agregacion de un item al carrito fue cancelada. ' + error)
    }
  })

export default cartRouter