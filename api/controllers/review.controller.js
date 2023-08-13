import Review from "../models/review.model.js"
import Gig from "../models/gig.model.js"
import createError from "../utils/createError.js"

export const createReview = async (req,res,next)=>{
    if(req.isSeller)
    return next(createError(403,"Sellers cant't creatz review!"))
    const newReview = new Review({
        userId:req.userId,
        gigId:req.body.gigId,
        desc:req.body.desc,
        star:req.body.star,
    })
    try {
       
        const review = await Review.findOne({
            gigId:req.body.gigId,
            userId:req.userId
        })
        if (review)
        return next(createError(403,"You have already created a review for this gig !"))
        const savedReview=await newReview.save()
        res.status(201).send(savedReview)
        await Gig.findByIdAndUpdate(req.body.gigId,{$inc:{totalStars:req.body.star,starNumber:1}})
    } catch (error) {
        next(error)
        
    }   
}
export const getReview = async (req,res,next)=>{
    try {
        const reviews = await Review.find({ gigId: req.params.id });
        res.status(200).send(reviews);

    } catch (error) {
        next(error)
        
    }
}
export const deleteReview = async (req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
        
    }
}