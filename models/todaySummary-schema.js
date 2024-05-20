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
      type: String,
      required: [true, "date is required."],
    },
  },
  { collection: "todaySumary" }
);

const todaySummary = mongoose.model("TodaySummary", todaySummarySchema);
module.exports = todaySummary;
