import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
dotenv.config();

import path from "path";

import http from "http";
import { Server } from "socket.io";
import itemRouter from "./routes/item.routes.js";
import orderRouter from "./routes/order.routes.js";
import shopRouter from "./routes/shop.routes.js";
import { socketHandler } from "./socket.js";

import fs from "fs";
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public")
}

const __dirname = path.resolve();

const app = express();
const server = http.createServer(app);

const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";

const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    credentials: true,
  },
});

app.set("io", io);

const port = process.env.PORT || 5000;
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);

if (process.env.NODE_ENV === "production")
  (app.use(express.static(path.join(__dirname, "../frontend/dist"))),
    app.get("{*path}", (req, res) =>
      res.sendFile(
        path.resolve(__dirname, "../frontend", "dist", "index.html"),
      ),
    ));

socketHandler(io);

server.listen(port, () => {
  connectDb();
  console.log(`server started at ${port}`);
});
