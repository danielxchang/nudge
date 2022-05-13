import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import habitRoutes from "./routes/habits";
import authRoutes from "./routes/auth";
import { errorHandler } from "./controllers/error";
import isAuth from "./middleware/is-auth";

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/habits", isAuth, habitRoutes);

app.use(errorHandler);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.yfvfw.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`
  )
  .then((result) => {
    console.log("CONNECTED");
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));
