
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import employeeRoute from "./routes/employee.js";
import authRoute from "./routes/auth.js";
import { authenticate } from "./middleware/authMiddleware.js";

// emulate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
const PORT = 3000;

// CORS
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoute); // public
app.use("/api/employee", authenticate, employeeRoute); // protected

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Not found!" });
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
