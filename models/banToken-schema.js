const mongoose = require('mongoose')
const { Schema } = mongoose;

const banTokenSchema = new Schema({
       
  token: {
    type: String,
  },
   
  
}, { collection: 'banTokens' });

const banToken = mongoose.model("banTokens", banTokenSchema);

module.exports = banToken