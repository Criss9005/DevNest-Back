
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/api/authRoutes");
const productRoutes = require("./routes/api/productRoutes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

//const mongoose = require("mongoose");
//const app = require("./app");




app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
