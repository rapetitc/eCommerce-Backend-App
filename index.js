import ProductManager, { __dirname } from "./ProductManager.js"

/* ***     TEST CODE HERE     *** */
const manageProd = new ProductManager

const data1 = { title: "Samsung A71", description: "Telefono Inteligente de media gama", price: 600, thumbnail: "url", code: "Samsung", stock: 10 }
const data2 = { title: "iPhone 14", description: "Telefono Inteligente de alta gama", price: 1100, thumbnail: "url", code: "iPohne", stock: 13 }
const data3 = { title: "Nokia 365N", description: "Telefono Basico de baja gama", price: 100, thumbnail: "url", code: "Nokia", stock: 17 }
//manageProd.addProduct(data1)
//manageProd.addProduct(data2)
//manageProd.addProduct(data3)

const prodIDToSearch = 1
//manageProd.getProductById(prodIDToSearch)

const prodIDToUpdate = 3
const prodDataToChange = { title: "Titulo cambiado" }
//manageProd.updateProduct(prodIDToUpdate, prodDataToChange)

const prodIDToRemove = 3
//manageProd.deleteProduct(prodIDToRemove)

//manageProd.getProducts()