import { Router } from "express"
import ProductManager from "../controller/ProductManager.js"

const prodsRouter = Router()
const prod = new ProductManager

prodsRouter.route('/')
  .get(async (req, res) => {
    const limit = parseInt(req.query.limit)
    // A esta condicion podria ser agregada la siguiente declaracion para bloquear el limite a un numero determinado => || limit > 10
    if (isNaN(limit)) return res.redirect('/api/products?limit=100')
    let result = JSON.parse(await prod.getProducts())
    res.send(result.slice(0, limit))
  })
  .post(async (req, res) => {
    const proToAdd = { ...req.body, status: true }
    try {
      await prod.addProduct(proToAdd)
      res.send('Producto agregado exitosamente');
    } catch (error) {
      res.status(406).send(`Ha ocurrido un error al intentar agregar un producto.<br>${error}`);
    }
  })

prodsRouter.route('/:pid')
  .get(async (req, res) => {
    const result = await prod.getProductById(parseInt(req.params.pid))
    res.send(result)
  })
  .put(async (req, res) => {
    try {
      await prod.updateProduct(parseInt(req.params.pid), req.body)
      res.send('Producto actualizado exitosamente')
    } catch (error) {
      res.send('Ha ocurrido un error, proceso de actualizacion cancelada. ' + error)
    }
  })
  .delete(async (req, res) => {
    try {
      prod.deleteProduct(parseInt(req.params.pid))
      res.send('Producto eliminado exitosamente')
    } catch (error) {
      res.send('Ha ocurrido un error, proceso de eliminacion cancelada. ' + error)
    }
  })

export default prodsRouter