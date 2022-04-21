import dotenv from "dotenv";
// load config
dotenv.config({ path: "./Config/config.env" });

import express from "express";
import cors from "cors";
import corsOptions from "./Config/corsOptions.js";
import cokkieParser from "cookie-parser";
import connectDB from "./Config/db.js";

// Middlewares
import credentials from "./Middlewares/credentials.js";
import errorHandler from "./Middlewares/error.js";

// Utils
import verifyAccessToken from "./Utils/verifyAccessToken.js";

// Routers
import authRouter from "./Routes/auth.js";

const PORT = process.env.PORT || 5000;

const app = express();

// database connection
await connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// adding cors for frontend react access
app.use(cors(corsOptions));

// adding json parser middleware
app.use(express.json());

//middleware for cookies
app.use(cokkieParser());

// Routes
app.use("/auth", authRouter);

// Protected Route - need access token to acces
app.use(verifyAccessToken);

// Error handler Middleware
app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log("\x1b[36m%s\x1b[0m", `Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
