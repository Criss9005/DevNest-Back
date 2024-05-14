const mongoose = require('mongoose')
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2')

const productSchema = new Schema({
    
    calorias: {
        type: Number,

    },
    categoria: {
        type: String,
    },
    peso: {
        type: Number,
    },
    titulo: {
        type: String,
        
    }
}, { collection: 'products' });

productSchema.plugin(mongoosePaginate)
const products = mongoose.model("products", productSchema);
module.exports = products