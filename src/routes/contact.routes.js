import express from "express";
import { createContact } from "../controllers/contact.controller.js";

const router = express.Router();

// 🚀 Contact routes
router.post("/create", createContact);

export default router;
