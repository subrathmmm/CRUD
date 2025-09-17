// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import employeeRoute from "./routes/employee.js";
// import authRoute from "./routes/auth.js"; 


// dotenv.config({ path: path.resolve("Backend/.env") });

// console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

// const app = express();
// const PORT = 3000;

// const corsOptions = {
//     origin: "*",
// };

// app.use(cors(corsOptions));
// app.use(bodyParser.json());

// app.use("/api/auth", authRoute);


// app.use("/api/employee", employeeRoute);

// app.use(function (req, res){
//     res.status(404).json({error: "Not found!"});
// });

// app.use((err, req, res, next) =>{
//     const statusCode = err.statusCode || 500;
//     const message = err.message || "Internal server error";
//     return res.status(statusCode).json({error: message});
// })

// app.listen(PORT, () =>{
//     console.log(`Listening on port ${PORT}`);
// });



// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";   // ✅ add this
// import { fileURLToPath } from "url"; // ✅ for __dirname in ES modules
// import { dirname } from "path";

// import employeeRoute from "./routes/employee.js";
// import authRoute from "./routes/auth.js"; 

// // emulate __dirname (since ES modules don’t have it)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // ✅ tell dotenv exactly where .env is
// dotenv.config({ path: path.resolve(__dirname, ".env") });

// console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

// const app = express();
// const PORT = 3000;

// const corsOptions = {
//     origin: "*",
// };

// app.use(cors(corsOptions));
// app.use(bodyParser.json());

// app.use("/api/auth", authRoute);
// app.use("/api/employee", employeeRoute);

// app.use(function (req, res){
//     res.status(404).json({error: "Not found!"});
// });

// app.use((err, req, res, next) =>{
//     const statusCode = err.statusCode || 500;
//     const message = err.message || "Internal server error";
//     return res.status(statusCode).json({error: message});
// });

// app.listen(PORT, () =>{
//     console.log(`Listening on port ${PORT}`);
// });




// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// import employeeRoute from "./routes/employee.js";
// import authRoute from "./routes/auth.js";
// import { authenticate } from "./middleware/authMiddleware.js";

// // emulate __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // ✅ load .env explicitly
// dotenv.config({ path: path.resolve(__dirname, ".env") });

// console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

// const app = express();
// const PORT = 3000;

// // CORS
// const corsOptions = {
//   origin: "*",
// };
// app.use(cors(corsOptions));
// app.use(bodyParser.json());

// // Routes
// app.use("/api/auth", authRoute);
// app.use("/api/employee", authenticate, employeeRoute); // ✅ protected

// // 404
// app.use((req, res) => {
//   res.status(404).json({ error: "Not found!" });
// });

// // Error handler
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal server error";
//   return res.status(statusCode).json({ error: message });
// });

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });



// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// import employeeRoute from "./routes/employee.js";
// import authRoute from "./routes/auth.js";
// import { authenticate } from "./middleware/authMiddleware.js";

// // emulate __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // load .env
// dotenv.config({ path: path.resolve(__dirname, ".env") });

// console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

// const app = express();
// const PORT = 3000;

// // CORS setup
// app.use(cors({ origin: "*" }));
// app.use(bodyParser.json());

// // Routes
// app.use("/api/auth", authRoute); // login + refresh
// app.use("/api/employee", authenticate, employeeRoute); // protected routes

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ error: "Not found!" });
// });

// // Error handler
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal server error";
//   return res.status(statusCode).json({ error: message });
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });



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
