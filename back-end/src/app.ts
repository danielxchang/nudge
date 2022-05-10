import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import habitRoutes from "./routes/habits";
import authRoutes from "./routes/auth";
import utilRoutes from "./routes/utility";
import { errorHandler } from "./controllers/error";
import { MONGODB_URI } from "./util/constants";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("api/habits", habitRoutes);
app.use("api/auth", authRoutes);
app.use("api/util", utilRoutes);

app.use(errorHandler);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("CONNECTED!!!");
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));
