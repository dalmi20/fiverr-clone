import express from "express"
import {createReview,getReview,deleteReview} from "../controllers/review.controller.js"
import { verifyToken } from "../middleware/jwt.js";
const router =express.Router()

router.post("/add",verifyToken,createReview)
router.get("/get/:id",getReview)
router.delete("/delete/:id",deleteReview)


 

export default router;