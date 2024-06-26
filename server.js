const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/api/authRoutes");
const productRoutes = require("./routes/api/productRoutes");
const todaySummaryRoutes = require("./routes/api/todaySummaryRoutes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const app = express();

// CORS crossdomain tool
app.use(cors());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Calories API",
      version: "1.0.0",
      description: "API Documentation for the App",
      contact: {
        name: "API Support",
        url: "http://www.myapp.com",
        email: "support@myapp.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/api/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/todaySummary", todaySummaryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
