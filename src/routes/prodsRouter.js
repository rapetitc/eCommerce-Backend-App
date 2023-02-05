import { Router } from "express"
import ProductManager from "../controller/ProductManager.js"

const prodsRouter = Router()
const prod = new ProductManager

prodsRouter.route('/')
  .get(async (req, res) => {
    const limit = parseInt(req.query.limit)
    // A esta condicion podria ser agregada la siguiente declaracion para bloquear el limite a un numero determinado => || limit > 10
    if (isNaN(limit)) return res.redirect('/api/products?limit=100')
    let result = await prod.getProducts()
    res.status(200).send(result.slice(0, limit))
  })
  .post(async (req, res) => {
    const proToAdd = { ...req.body, status: true }
    try {
      await prod.addProduct(proToAdd)
      res.status(201).send(`Producto agregado exitosamente`);
    } catch (error) {
      res.status(406).send(`Ha ocurrido un error al intentar agregar un producto. ${error}`);
    }
  })

prodsRouter.route('/:pid')
  .get(async (req, res) => {
    try {
      const result = await prod.getProductById(parseInt(req.params.pid))
      res.status(200).send(result)
    } catch (error) {
      res.status(400).send(`Ha ocurrido un error al intentar consultar un producto. ${error}`)
    }
  })
  .put(async (req, res) => {
    try {
      await prod.updateProduct(parseInt(req.params.pid), req.body)
      res.status(200).send(`Producto actualizado exitosamente`)
    } catch (error) {
      res.status(400).send(`Ha ocurrido un error, proceso de actualizacion cancelada. ${error}`)
    }
  })
  .delete(async (req, res) => {
    try {
      await prod.deleteProduct(parseInt(req.params.pid))
      res.status(200).send('Producto eliminado exitosamente')
    } catch (error) {
      res.status(400).send(`Ha ocurrido un error, proceso de eliminacion cancelada. ${error}`)
    }
  })

export default prodsRouter