import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import gigRoute from "./routes/gig.route.js"
import messageRoute from "./routes/message.route.js"
import conversationRoute from "./routes/conversation.route.js"
import orderRoute from "./routes/order.route.js"
import reviewRoute from "./routes/review.route.js"
import cookieParser from "cookie-parser"
const app =express()
mongoose.set('strictQuery',true)
const connect = async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/fiverr')
        console.log(" Connected to mongoDB!")
}catch(error){
    console.log(error)
}
}
dotenv.config()
app.use(cors({ origin: "http://localhost:5173", credentials: true }))// using this because we are passing cookies from backend to front
app.use(express.json()); // hadi besh n9olo l app ta3na jib data mn req
app.use(cookieParser())
app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/gigs",gigRoute)
app.use("/api/message",messageRoute)
app.use("/api/conversation",conversationRoute)
app.use("/api/order",orderRoute)
app.use("/api/review",reviewRoute)
app.use((err,req,res,next)=>{// 5dmna middleware 7ssab error ta3na thandli reponse error
    const errorStatus=err.status || 500
    const errorMessage =err.message || "Somenthing went wrong!"
    return res.status(errorStatus).send(errorMessage)
})
app.listen(8800,()=>{
    connect()
    console.log("backend server is running !")
})
