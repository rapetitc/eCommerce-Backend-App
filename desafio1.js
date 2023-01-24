class ProductManager {
  constructor() {
    this.products = []
  }

  addProduct(product) {
    for (const key in product) {
      //console.log(`Chequeando ${key}`);
      if (!product[key]) {
        return console.log(`Al parecer ${key} esta vacio, completa los datos correctamente`);
      }
      if (key === 'title' && product[key].length < 5) {
        return console.log(`El titulo es muy corto para ser un titulo, al menos 5 o mas caracteres`);
      }
      if (key === 'description' && product[key].length < 10) {
        return console.log(`La descripcion es muy corto para ser una buena descripcion titulo, al menos 10 o mas caracteres`);
      }
      if (key === 'price' && product[key] < 10) {
        return console.log(`El precio es muy bajo para ser vendido, al menos $10 o mayor`);
      }
      if (key === 'code' && product[key] === prod.getProductByCode(product[key]).code) {
        return console.log(`Codigo repetido, intenta registrar tu producto con otro codigo`);
      }
      if (key === 'stock' && product[key] < 5) {
        return console.log(`Al parecer no hay suficiente stock para registrar, al menos 5 item o mayor`);
      }
    }
    const id = this.products.length + 1
    let itemToAdd = { id: id, ...product }
    this.products.push(itemToAdd)
    return console.log(`Se ha registrado tu producto '${product.title}' con el id: ${id}`);
  }

  getProducts() {
    return this.products
  }

  getProductById(id) {
    const result = this.products.find((product) => {
      return product.id === id
    })
    if (result) {
      return result
    }
    return 'Not Found'
  }
  getProductByCode(code) {
    const result = this.products.find((product) => {
      return product.code === code
    })
    if (result) {
      return result
    }
    return 'Not Found'
  }
}

console.log('\n\t\tDesafio Entregable 1 - Ruben Petit\n');

/* ************************
*** TEST YOUR CODE HERE ***
************************ */
const productTemplate1 = {
  title: "Samsung A71",
  description: "Telefono Inteligente con suficiente capacidades",
  price: 800,
  thumbnail: "https://www.aquillamas.com/wp-content/uploads/2020/07/samsung_a71_1-2.jpg",
  code: '#1d5aewq3a3sd',
  stock: 35,
}
const productTemplate2 = {
  title: "Samsung A72", // >>>>> Try changing the value less than 5 characters
  description: "Telefono Inteligente con suficiente capacidades", // >>>>> Try changing the value less than 10 characters
  price: 850, // >>>>> Try changing its value less than $10.
  thumbnail: "https://www.aquillamas.com/wp-content/uploads/2020/07/samsung_a71_1-2.jpg",
  code: '#awdaewq3a3sd', // >>>>> Try changing the code with the same above to test
  stock: 10, // >>>>> Try changing its value less than 5
}

const prod = new ProductManager

// >>>>> Adding new products
prod.addProduct(productTemplate1)
prod.addProduct(productTemplate2)

// >>>>> Showing all the items storage on products array
console.log('\n\tMostrando base de datos: productos . . .');
console.log(prod.getProducts());

// >>>>> Searching an item by its CODE
const idToSearch = 1
console.log(`\n\tBuscando producto por ID: ${idToSearch}  . . .`);
console.log(prod.getProductById(idToSearch));