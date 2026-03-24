import express from "express";
import dotenv from "dotenv";

import HttpsError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import router from "./routes/userRoutes.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

app.use("/user", router);

app.get("/", (req, res) => {
  res.status(200).json("Hello From Server");
});

// undefined routes

app.use((req, res, next) => {
  next(new HttpsError("requested routes not found") || 404);
});

// centralized error handling

app.use((error, req, res, next) => {
  if (res.headerSent) {
    next(error);
  }
  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`server listing on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer();

export default app;
