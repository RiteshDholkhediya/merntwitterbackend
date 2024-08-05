import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRouter.js";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";

dotenv.config({
  path: ".env",
});
databaseConnection();
const app = express();

//middleware

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: process.env.API_ORIGIN,
  credentials: true,
};

const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tweet", tweetRoute);

app.get("/home", (req, res) => {
  res.status(200).json({
    message: "Response coming from backend",
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
