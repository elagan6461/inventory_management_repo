const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [1, "Title must be at least 1 characters long"],
        maxlength: [100, "Title must be no more than 40 characters long"]

    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [1, "Description must be at least 1 characters long"],
        maxlength: [255, "Description must not exceed 255 characters long"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 0"],
        max: [15000, "Quantity must not exceed 15000"]
    }

}, {timestamps:true})

module.exports = mongoose.model('Inventory', InventorySchema)