import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { request } from "express";
import { Event } from "../model/Event.model.js";
import mongoose from "mongoose";
import { EventHandler } from "../model/EventHandler.model.js";

const GetAllEvent = asyncHandler(async(req,res)=>{
    const getAllEvent = await Event.find();
    
    if(getAllEvent == null){
        throw new ApiError(404,"Event not found");
    }
    return res.status(200).json(
        new ApiResponse(200, getAllEvent, "Get All Event")
    );
});

const SaveEvent = asyncHandler(async(req,res)=>{
    const {GmailId,Name,Location,TimeLimit,Time,Date,NumberOfTeam} = req.body;

    if([GmailId,Name,Location,TimeLimit,Time,Date,NumberOfTeam].some((element) => element?.trim() === "")){
        throw new ApiError(400 , "Data not Present");
    }

    const eventhandlerid = await EventHandler.findOne({GmailId:GmailId});

    if(!eventhandlerid){
        throw new ApiError(404,"Handler Gmail not Found");
    }

    const newevent = await Event.create({
        Name,
        Location,
        Time,
        Date,
        NumberOfTeam,
        TimeLimit,
        EventHandlerId:eventhandlerid._id
    });

    eventhandlerid.AllEvent.push(newevent);

    eventhandlerid.save();

    return res.status(200).json(new ApiResponse(200,newevent,"Create New Event"));
});

export {
    GetAllEvent,
    SaveEvent
};