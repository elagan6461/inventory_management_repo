const Inventory = require('../models/inventory.model')

module.exports = {
    findAllItems: (req, res) => {
        Inventory.find()
            .then((allItems) => {
                res.status(200).json(allItems)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    findOneItem: (req, res) => {
        Inventory.findOne({_id: req.params.id})
            .then((oneItem) => {
                res.status(200).json(oneItem)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    findByKeyword: (req, res) => {
        // Inventory.find({title:req.params.keyword})
        // Inventory.find({ 'title': { $regex: '^' + req.params.keyword, $options: 'i' } })//case insensitive
        Inventory.find({title: {$regex: '^.*'+req.params.keyword+'.*?$', $options:'i'}}) //keyword anywhere in title, case insensitive
                .then((itemList) => {
                    res.status(200).json(itemList)
                })
                .catch((err) => {res.status(500).json(err)})
    },
    findByDescription: (req, res) => {
        // Inventory.find({title:req.params.keyword})
        // Inventory.find({ 'title': { $regex: '^' + req.params.keyword, $options: 'i' } })//case insensitive
        Inventory.find({description: {$regex: '^.*'+req.params.keyword+'.*?$', $options:'i'}}) //keyword anywhere in title, case insensitive
                .then((itemList) => {
                    res.status(200).json(itemList)
                })
                .catch((err) => {res.status(500).json(err)})
    },
    getLowInventory: (req, res) => {
            Inventory.find({quantity:{$lte:19}})
                    .then(lowInventory => res.status(200).json(lowInventory))
                    .catch(err => res.status(500).json(err))
    },
    createItem: (req, res) => {
        Inventory.create(req.body)
            .then((newItem) => {
                res.status(201).json(newItem)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }, 
    updateItem: (req, res) => {
        Inventory.findOneAndUpdate({ _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
            )
            .then((updatedItem) => {
                res.status(201).json(updatedItem)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    deleteItem: (req, res) => {
        Inventory.deleteOne({_id: req.params.id})
            .then((result) => {
                res.status(201).json(result)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
}