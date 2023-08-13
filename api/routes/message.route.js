import express from "express";
import {createMessage,getMessages,} from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/add", verifyToken, createMessage);
router.get("/get/:id", verifyToken, getMessages);

export default router;