import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { request } from "express";
import { Event } from "../model/Event.model.js";
import mongoose from "mongoose";

const GetAllEvent = asyncHandler(async(req,res)=>{
    const getAllEvent = await Event.find();
    
    if(getAllEvent == null){
        throw new ApiError(404,"Event not found");
    }
    return res.status(200).json(
        new ApiResponse(200, getAllEvent, "Get All Event")
    );
});

export {GetAllEvent};