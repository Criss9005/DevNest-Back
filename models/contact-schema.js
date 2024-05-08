const mongoose = require('mongoose')
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2')

const contactSchema = new Schema({
    
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
}, { collection: 'Contacts' });

contactSchema.plugin(mongoosePaginate)
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact