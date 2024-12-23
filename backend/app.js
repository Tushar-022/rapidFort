import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/routes.js";
import path from "path";

dotenv.config(); // Load environment variables

const app = express();

const corsOptions = {
  origin: '*', // Allow all origins
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));


// Middleware for parsing JSON and URL-encoded data
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Serve static files
app.use(express.static(path.join(process.cwd(), "public")));

// Route handling
app.use("/", routes);

// Handle 404 - Route Not Found
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack || err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;


