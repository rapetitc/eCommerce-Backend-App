import fs from 'fs'
import fsp from 'fs/promises'
import check from '../utils/checkers.js'

class ProductManager {
  constructor() {
    this.dbname = "products"
    this.pathdb = './src/models/' + this.dbname + '.json'
  }
  // Funciones extras para el funcionamiento de la app
  generateUniqueCode(length) {
    let result = '';
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  async getDataBase() {
    if (!fs.existsSync(this.pathdb)) await fsp.writeFile(this.pathdb, '[]')
    return JSON.parse(await fsp.readFile(this.pathdb))
  }
  async validCode(code) {
    if (code) {
      if (code.length !== 12) throw 'El codigo del producto no cumple con los requisitos. Este campo requiere de 12 caracteres.'
      const dbprod = await this.getDataBase()
      const codeFound = dbprod.some((prod) => prod.code == code)
      if (codeFound) throw 'El codigo esta repetido en otro producto.'
    } else {
      code = this.generateUniqueCode(12)
    }
    return code
  }
  // Funciones para las consultas
  async getProducts() {
    const dbprod = await this.getDataBase()
    return dbprod
  }
  async getProductById(pid) {
    const id = check.id(pid)
    const dbprod = await this.getDataBase()
    const prodFound = dbprod.find((item) => { return item.id === id })
    return prodFound ?? {}
  }
  async addProduct({ title, description, code, price, status, stock, category, thumbnails }) {
    const data = { title: check.title(title), description: check.description(description), code: await this.validCode(code), price: check.price(price), status: check.status(status), stock: check.stock(stock), category: check.category(category), thumbnails: check.thumbnails(thumbnails) }
    const dbprod = await this.getDataBase()
    const id = dbprod.length > 0 ? dbprod[dbprod.length - 1].id + 1 : 1
    dbprod.push({ id, ...data })
    await fsp.writeFile(this.pathdb, JSON.stringify(dbprod))
  }
  async updateProduct(pid, { title, description, code, price, status, stock, category, thumbnails }) {
    const dbprod = await this.getDataBase()
    dbprod.forEach(item => {
      if (item.id === pid) {
        if (title) item.title = check.title(title)
        if (description) item.description = check.description(description)
        if (code) item.code = check.code(code)
        if (price) item.price = check.price(price)
        if (status) item.status = check.status(status)
        if (stock) item.stock = check.stock(stock)
        if (category) item.category = check.category(category)
        if (thumbnails) item.thumbnails = check.thumbnails(thumbnails)
      }
    });
    await fsp.writeFile(this.pathdb, JSON.stringify(dbprod))
  }
  async deleteProduct(pid) {
    const id = check.id(pid)
    const dbprod = await this.getDataBase()
    const newData = dbprod.filter((item) => { return item.id !== id })
    await fsp.writeFile(this.pathdb, JSON.stringify(newData))
  }
}

export default ProductManager