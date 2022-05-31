import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import { ErrorHandler } from "./utils/ErrorHandler";
import MainRouter from "./routers/MainRouter";

// load the environment variables from the .env file
dotenv.config({});

// Create express app
const app = express();

//Use helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// parse application/json
app.use(express.json());

// Accept CORS only from React Frontend Client Origin
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// make server app handle any route starting with "/api"
app.use("/api", MainRouter);

// Handle Not Found routes
app.use("*", (_: Request, __: Response, next: NextFunction) => {
  next(new ErrorHandler(404, "NOT_FOUND_ERROR", "Resource not found"));
});

// make server app handle any error
app.use((err: ErrorHandler, _: Request, res: Response, __: NextFunction) => {
  res.status(err.statusCode || 500).json({
    status: "error",
    errorCode: err.errorCode,
    statusCode: err.statusCode,
    message: err.errorMessage,
  });
});

const port = process.env.REST_API_PORT || 8080;
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}...`);
});
