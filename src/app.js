import express from "express";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";
import paymentRoutes from "../src/routes/payment.routes.js";
import contactRoutes from "../src/routes/contact.routes.js";

dotenv.config();

const app = express();
connectDB();

// Increase payload size limit
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

const allowedOrigins = ["*", "http://localhost:5173", "http://localhost:5174", "https://mathurakannan.netlify.app/"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`CORS error: Origin ${origin} not allowed`);
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 204,
  })
);

// 📌 Routes
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/contact", contactRoutes);

export default app;
