import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRouter from "./routes/auth.js";
import globalErroHandler from "./controllers/errorController.js";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

app.use("/api/v1/auth", authRouter);
app.use(globalErroHandler);
