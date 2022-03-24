const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
    name : {
        type : String
    },
    description : {
        type : String
    },
    quantity : {
        type : Number
    },
    price : {
        type : Number
    }
})

module.exports = Product = mongoose.model('products', productSchema);