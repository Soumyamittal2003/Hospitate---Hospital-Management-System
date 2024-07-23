import express from "express";
import { sendMessage } from "../controller/messagecontroller.js";

const router =express.Router();

router.post("/send",sendMessage)

export default router;