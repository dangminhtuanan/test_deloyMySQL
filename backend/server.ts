import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import swaggerDocs from "./swagger";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import profileRoutes from "./routes/profileRoutes";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/image", express.static("image"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", profileRoutes);

app.get("/", (_req, res) => {
  res.send("API dang chay! Them /docs de mo Swagger");
});

const PORT = Number(process.env.PORT) || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`May chu chay tren port ${PORT}`);
    swaggerDocs(app, PORT);
  });
});
