import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Student } from "../model/Student.model.js";
import { EventHandler } from "../model/EventHandler.model.js";

const GetAllStudent = asyncHandler(async(req,res)=>{
    const AllStudent = await Student.find();
    if(!AllStudent){
        throw new ApiError(500,"Internal Server Error");
    }

    return res.status(200).json(new ApiResponse(200,AllStudent));
});

const SaveStudent = asyncHandler(async(req,res)=>{
    const {Name,GmailId,Password} = req.body;

    if([Name,GmailId,Password].some((element)=>element?.trim()==="")){
        throw new ApiError(400 , "Data not Present");
    }

    const existedData = await Student.findOne({
        GmailId:GmailId
    });

    if(existedData){
        throw new ApiError(409,"Gmail already exists");
    }

    const existedInEventHandler = await EventHandler.findOne({
        GmailId:GmailId
    });

    if(existedInEventHandler){
        throw new ApiError(409,"Gmail already exists in Event Handler");
    }

    const Data = await Student.create({
        Name : Name ,
        GmailId : GmailId ,
        Password :Password
    });

    // const UpdateInDB = await Student.findById(Data._id);
    // if(!UpdateInDB){
    //     throw new ApiError(500,"Something went wrong while register Student");
    // }

    return res.status(200).json(new ApiResponse(200,Data,"Successfuly Register"));
});

export {
    GetAllStudent,
    SaveStudent
};