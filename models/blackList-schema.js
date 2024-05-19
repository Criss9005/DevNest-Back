const mongoose = require('mongoose')
const { Schema } = mongoose;

const blackListSchema = new Schema({
       
  token: {
    type: String,
  },
  sid: {
    type: String,
  },
   
  
}, { collection: 'blackList' });

const blackList = mongoose.model("blackList", blackListSchema);

module.exports = blackList