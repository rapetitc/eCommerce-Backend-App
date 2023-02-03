import fs from 'fs'
const fsp = fs.promises
import ProductManager from "../controller/ProductManager.js";

const prodManager = new ProductManager

const isFileCreated = async (path) => {
  if (!fs.existsSync(path)) await fsp.writeFile(path, '[]')
}

class CartManager {
  constructor() {
    this.dbname = "carts"
    this.pathdb = './src/models/' + this.dbname + '.json'
  }
  createCart = async () => {
    await isFileCreated(this.pathdb)
    const cartDB = JSON.parse(await fsp.readFile(this.pathdb))

    const id = cartDB.length > 0 ? cartDB[cartDB.length - 1].id + 1 : 1
    cartDB.push({ id: id, products: [] })
    await fsp.writeFile(this.pathdb, JSON.stringify(cartDB))
  }
  getCartByID = async (id) => {
    await isFileCreated(this.pathdb)
    const cartDB = JSON.parse(await fsp.readFile(this.pathdb))

    const cartFound = cartDB.find((item) => item.id === id)
    return cartFound ?? []
  }
  addItemToCart = async (cid, pid, quantity) => {
    await isFileCreated(this.pathdb)
    const cartDB = JSON.parse(await fsp.readFile(this.pathdb))
    const cart = cartDB.find(cart => { return cart.id === cid });
    const prod = await prodManager.getProductById(pid)

    if (Object.keys(prod).length > 0 && cart) {
      const item = cart.products.find(prod => { return prod.id == pid })

      item ? item.quantity++ : cart.products.push({ id: prod.id, quantity: 1 })

      await fsp.writeFile(this.pathdb, JSON.stringify(cartDB))
    } else {
      throw 'Carro o producto no existe'
    }
  }
}

export default CartManager