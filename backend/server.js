
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import fileRoutes from "./routes/fileRoutes.js";
import connectDB from "./config/db.js";



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/api/files", fileRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});