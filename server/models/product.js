const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    guarantee: {type: Number, default: 2},
    productType: {type: String, required: true},
    imgUrl: {type: String, default: 'https://lgmobilerepair.com/static/images/img-dummy-product.jpg'}
})

module.exports = mongoose.model('Product', productSchema);