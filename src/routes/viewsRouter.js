const { Router } = require('express')
const ViewsManager = require('../controller/ViewsManager.js')

const viewsRouter = Router()
const vm = new ViewsManager

viewsRouter.get('/', vm.renderHome)
viewsRouter.get('/realtimeproducts', vm.renderProds)

module.exports = viewsRouter 