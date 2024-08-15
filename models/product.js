const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name is mandatory']
    },
    price: {
        type: Number,
        required: [true, 'product price must be provided']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt : {
        type: Date, 
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'marcos', 'caressa', 'liddy'],
            message: '{VALUE} is not supported'
        }
    },
})

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;