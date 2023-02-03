import fs from 'fs'
const fsp = fs.promises

import check from '../utils/checkers.js'

const isFileCreated = async (path) => {
  if (!fs.existsSync(path)) await fsp.writeFile(path, '[]')
}

class ProductManager {
  constructor() {
    this.dbname = "products"
    this.pathdb = './src/models/' + this.dbname + '.json'
  }
  async getProducts() {
    await isFileCreated(this.pathdb)
    const dbprod = await fsp.readFile(this.pathdb)
    return dbprod
  }
  async getProductById(id) {
    await isFileCreated(this.pathdb)
    const dbprod = JSON.parse(await fsp.readFile(this.pathdb))
    const prodFound = dbprod.find((item) => { return item.id === id })
    return prodFound ?? {}
  }
  async addProduct({ title, description, code, price, status, stock, category, thumbnails }) {
    await isFileCreated(this.pathdb)
    const dbprod = JSON.parse(await fsp.readFile(this.pathdb))
    const id = dbprod.length > 0 ? dbprod[dbprod.length - 1].id + 1 : 1
    dbprod.push({ id, ...{ title: check.title(title), description: check.description(description), code: check.code(code), price: check.price(price), status: check.status(status), stock: check.stock(stock), category: check.category(category), thumbnails: check.thumbnails(thumbnails) } })
    await fsp.writeFile(this.pathdb, JSON.stringify(dbprod))
  }
  async updateProduct(id, { title, description, code, price, status, stock, category, thumbnails }) {
    await isFileCreated(this.pathdb)
    let dbprod = JSON.parse(await fsp.readFile(this.pathdb))

    dbprod.forEach(item => {
      if (item.id === id) {
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
  async deleteProduct(id) {
    await isFileCreated(this.pathdb)
    const dbprod = JSON.parse(await fsp.readFile(this.pathdb))
    const newData = dbprod.filter((item) => { return item.id !== id })
    await fsp.writeFile(this.pathdb, JSON.stringify(newData))
  }
}

export default ProductManager