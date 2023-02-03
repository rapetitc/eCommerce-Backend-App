const check = {
  title: (title) => {
    if (!title || title.length < 3) throw 'Titulo del producto inexistente o muy corto para agregar.'
    return title
  },
  description: (description) => {
    if (!description || description.length < 10) throw 'Descripcion del producto inexistente o muy corto para agregar.'
    return description
  },
  code: (code) => {
    if (!code || code.length !== 6) throw 'Codigo del producto inexistente o duplicado.'
    return code
  },
  price: (price) => {
    if (!price || isNaN(parseInt(price)) || price < 1) throw 'Precio del producto inexistente, muy bajo para agregar o dato enviado incorrectamente.'
    return parseInt(price)
  },
  status: (status) => {
    if (!status || status !== true && status !== false) throw 'Estado del producto inexistente para agregar.'
    return status
  },
  stock: (stock) => {
    if (stock && stock < 1 || isNaN(parseInt(stock))) throw 'Stock inexistente, muy bajo para agregar o dato enviado incorrectamente.'
    return parseInt(stock)
  },
  category: (category) => {
    if (!category) throw 'Categoria del producto inexistente para agregar.'
    return category
  },
  thumbnails: (thumbnails) => {
    if (!thumbnails || thumbnails.length < 1) throw 'Thumbnails del producto inexistente o muy bajo para agregar.'
    return thumbnails
  }
}
export default check