const InventoryController = require('../controllers/inventory.controller')

module.exports = (app) => {
    app.get('/api/allItems', InventoryController.findAllItems)
    app.get('/api/findOneItem/:id', InventoryController.findOneItem)
    app.post('/api/createItem', InventoryController.createItem)
    app.put('/api/updateItem/:id', InventoryController.updateItem)
    app.delete('/api/deleteItem/:id', InventoryController.deleteItem)
}