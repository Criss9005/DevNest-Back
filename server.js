const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

app.listen(process.env.PORT, async () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("Database connection successful"))
    .catch((err) => {
      console.log(err);
    });
  console.log(`Server running. Use our API on port: ${process.env.PORT}`);
});
