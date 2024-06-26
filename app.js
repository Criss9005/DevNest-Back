const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const productsRouter = require("./routes/api/products");
const authRouter = require("./routes/api/auth");
const todaySummaryRouter = require("./routes/api/todaySummary");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

//app.use("/api/products", productsRouter);
//app.use("/api/auth", authRouter);
app.use("/api/todaySummary", todaySummaryRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
