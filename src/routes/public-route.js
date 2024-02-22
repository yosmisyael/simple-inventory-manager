const express = require('express')
const controller = require('../controllers/controller')

const publicRouter = new express.Router()

publicRouter.get('/', controller.index)
publicRouter.get('/add', controller.create)
publicRouter.post('/', controller.store)
publicRouter.get('/:id/edit', controller.edit)
publicRouter.put('/:id', controller.update)
publicRouter.delete('/:id', controller.destroy)

module.exports = publicRouter