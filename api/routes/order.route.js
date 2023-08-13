import express from "express"
import {verifyToken} from "../middleware/jwt.js"
import {getOrders,intent,confirm } from "../controllers/order.controller.js"
const router =express.Router()

//router.post("/add/:gigId", verifyToken,createOrder)
router.get("/get",verifyToken,getOrders)
router.post("/create-payment-intent/:id",verifyToken,intent)
router.put("/confirm", verifyToken, confirm);


export default router;