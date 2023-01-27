import path from "path"
import { fileURLToPath } from 'url';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename)

const isFileCreated = (path) => {
  if (!fs.existsSync(path)) fs.writeFileSync(path, '[]')
}

class ProductManager {
  constructor() {
    this.dbname = "products"
    this.pathdb = path.join(__dirname + '/' + this.dbname + '.json')
  }
  getProducts() {
    isFileCreated(this.pathdb)
    const dbprod = JSON.parse(fs.readFileSync(this.pathdb).toString())
    return dbprod
  }
  getProductById(id) {
    isFileCreated(this.pathdb)
    const dbprod = JSON.parse(fs.readFileSync(this.pathdb).toString())
    const prodFound = dbprod.find((item) => { return item.id === id })
    return prodFound
  }
  // El siguiente codigo sera actualizado proximamente
  /*
    addProduct({ title, description, price, thumbnail, code, stock }) {
      if (!fs.existsSync(this.pathdb)) writeFileSync(this.pathdb, '[]')
      const dbprod = JSON.parse(readFileSync(this.pathdb).toString())
  
      const id = dbprod.length > 0 ? dbprod[dbprod.length - 1].id + 1 : 1
  
  
      //if (title.length < 5) return console.log(`El titulo es muy corto para ser un titulo, al menos 5 o mas caracteres`);
      //if (description.length < 10) return console.log(`La descripcion es muy corto para ser una buena descripcion titulo, al menos 10 o mas caracteres`);
      //if (price < 1) return console.log(`El precio es muy bajo para ser vendido, al menos $1 o mayor`);
      //if (thumbnail !== 'url') return console.log(`URL incompatible, intenta registrar tu producto con otra URL`);
      //if (code === '123456789') return console.log(`Codigo repetido, intenta registrar tu producto con otro codigo`);
      //if (stock < 10) return console.log(`Al parecer no hay suficiente stock para registrar, al menos 5 item o mayor`);
  
      dbprod.push({ id, title, description, price, thumbnail, code, stock })
  
      writeFileSync(this.pathdb, JSON.stringify(dbprod))
      console.log("\n*** Producto agregado satisfactoriamente\n");
    }
    updateProduct(id, { title, description, price, thumbnail, code, stock }) {
      if (!fs.existsSync(this.pathdb)) writeFileSync(this.pathdb, '[]')
      const dbprod = JSON.parse(readFileSync(this.pathdb).toString())
  
      dbprod.forEach(item => {
        if (item.id === id) {
          item.title = title ?? item.title
          item.description = description ?? item.description
          item.price = price ?? item.price
          item.thumbnail = thumbnail ?? item.thumbnail
          item.code = code ?? item.code
          item.stock = stock ?? item.stock
        }
      });
  
      writeFileSync(this.pathdb, JSON.stringify(dbprod))
      console.log(`*** Producto con el ID: ${id} fue actualizado satisfactoriamente\n`);
    }
    deleteProduct(id) {
      if (!fs.existsSync(this.pathdb)) writeFileSync(this.pathdb, '[]')
      const dbprod = JSON.parse(readFileSync(this.pathdb).toString())
  
      const newData = dbprod.filter((item) => { return item.id !== id })
  
      writeFileSync(this.pathdb, JSON.stringify(newData))
      console.log(`\n*** Producto con el ID: ${id} fue removido satisfactoriamente\n`);
    }
  */
}

export default ProductManager