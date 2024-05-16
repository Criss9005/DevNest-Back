const mongoose = require("mongoose");
const { Schema } = mongoose;

const todaySummarySchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "product name is required."],
    },
    grams: {
      type: Number,
      required: [true, "grams is required."],
    },
    idUser: {
      type: String,
      required: [true, "idUser is required."],
    },
    date: {
      type: Date,
      required: [true, "date is required."],
    },
  },
  { collection: "todaySumary" }
);

// todaySummarySchema.plugin(mongoosePaginate);
const todaySummary = mongoose.model("todaySummary", todaySummarySchema);
module.exports = todaySummary;
