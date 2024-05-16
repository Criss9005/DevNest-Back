const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/api/authRoutes");
const productRoutes = require("./routes/api/productRoutes");
require("dotenv").config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
