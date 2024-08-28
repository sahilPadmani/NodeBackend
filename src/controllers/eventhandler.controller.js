import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { EventHandler } from "../model/EventHandler.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Student } from "../model/Student.model.js";

const GetEventHandlerByGmail = asyncHandler(async(req,res)=>{
    const {GmailId} = req.body;

    if(GmailId?.trim()===""){
        throw new ApiError(400 , "Gmail not Present");
    }

    const Data = await EventHandler.findOne({
        GmailId
    });

    if(!Data){
        throw new ApiError(404,"Gmail Id is Invaild");
    }

    return res.status(200).json(new ApiResponse(200,Data,"Gmail Find"));
});

const SaveEventHandler = asyncHandler(async(req,res)=>{
    const {Name,GmailId,Password,Location} = req.body ;

    if([Name,GmailId,Password,Location].some((element)=>element?.trim()==="")){
        throw new ApiError(400 , "Data not Present");
    }

    const existedData = await EventHandler.findOne({
        GmailId:GmailId
    });

    if(existedData){
        throw new ApiError(409,"Gmail already exists");
    }

    const existedInStudent = await Student.findOne({
        GmailId:GmailId
    });

    if(existedInStudent){
        throw new ApiError(409,"Gmail already exists in Studnet");
    }

    const Data = await EventHandler.create({
        Name : Name ,
        GmailId : GmailId ,
        Password :Password,
        Location : Location
    });

    const UpdateInDB = await EventHandler.findById(Data._id);

    if(!UpdateInDB){
        throw new ApiError(500,"Something went wrong while register Event Handler");
    }

    return res.status(200).json(new ApiResponse(200,UpdateInDB,"Successfuly Register"));
});

export {
    GetEventHandlerByGmail,
    SaveEventHandler
}